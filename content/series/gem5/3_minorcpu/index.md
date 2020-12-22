---
title: gem5 Deep Dive – MinorCPU (Part 3)
author: ppeetteerrsx
type: post
date: 2020-10-13T15:44:58+00:00
excerpt: In this blog post I will be going through the gem5 MinorCPU
url: /ce/gem5-deep-dive-minorcpu-part-3/
views:
  - 15
categories:
  - Computer Architecture
  - Computer Engineering
tags:
  - computer architecture
  - gem5
  - huawei
  - riscv
series:
  - gem5 Deep Dive
---

# 1 Concepts

Recall from the ISA Parser post that the gem5 ISA Parser generates C++ code based on templates defined in&nbsp;`*.isa`&nbsp;files. These generated code consist of two parts:&nbsp;`decode`&nbsp;and&nbsp;`execute`.

<div class="wp-block-jetpack-markdown">
  <p>
    The decode section exposes a <code>TheISA::Decoder</code> object which provides two important functions: <code>moreBytes(pc, inst)</code> and <code>decode(nextPC)</code>. <code>moreBytes</code> copies the instruction into the decoder’s class member (called <code>emi</code> for Extended Machine Instruction in RISCV). Then, decode is called, invoking the <code>decodeInst(machInst)</code> method in <code>build/RISCV/arch/riscv/generated/decode-method.cc.inc</code>. <code>decodeInst</code> maps the <code>uint64_t</code> instruction into a <code>StaticInst</code> object (there are some gem5-specific software caching involved to improve speed but are not important).
  </p>
</div>

<div class="wp-block-jetpack-markdown">
  <p>
    After the <code>StaticInst</code> object is created, it exposes the methods <code>execute</code>, <code>initiateAcc</code>, <code>completeAcc</code> and <code>advancePC</code>. These methods make use of the standard API provided by the CPU-specific <code>ExecContext</code> object. The CPU, based on its pipeline implementation, calls these methods at the suitable pipeline stage.
  </p>
</div>

In this post, we will be looking into the software implementation of the MinorCPU in gem5.

# 2 Pipeline

<div class="wp-block-jetpack-markdown">
  <p>
    The MinorCPU pipeline consists of four stages: <code>fetch1</code>, <code>fetch2</code>, <code>decode</code> and <code>execute</code>. <code>fetch1</code> is responsible for ITLB access and fetching the instruction from main memory. <code>fetch2</code> is responsible for decoding the instruction. <code>decode</code> is mainly just book-keeping and handling micro-ops (not really useful). <code>execute</code> is responsible for issuing and executing instructions, as well as writeback and commit.
  </p>
</div>

<div class="wp-block-jetpack-markdown">
  <p>
    The MinorCPU <code>Pipeline</code> object is a <code>Ticked</code> object. A <code>Ticked</code> object calls the <code>evaluate</code> function every clock cycle. The <code>Pipeline</code> object is hence defined as follows:
  </p>
</div>

<pre class="wp-block-code"><code>class Pipeline : public Ticked {
  /* Latches to connect the stages */
  Latch&lt;ForwardLineData> f1ToF2;
  Latch&lt;BranchData> f2ToF1;
  Latch&lt;ForwardInstData> f2ToD;
  Latch&lt;ForwardInstData> dToE;
  Latch&lt;BranchData> eToF1;

  /* Pipeline Stages */
  Execute execute;
  Decode decode;
  Fetch2 fetch2;
  Fetch1 fetch1;

  /* Action to be performed at each cycle (tick) */
  void evaluate() {
    execute.evaluate();
    decode.evaluate();
    fetch2.evaluate();
    fetch1.evaluate();

    /* Update the time buffers after the stages */
    f1ToF2.evaluate();
    f2ToF1.evaluate();
    f2ToD.evaluate();
    dToE.evaluate();
    eToF1.evaluate();
  }
}</code></pre>

## 2.1 Pipeline Execution

<div class="wp-block-jetpack-markdown">
  <p>
    Notice that the pipeline starts with the <code>execute</code> stage and is evaluated in the reverse order. The reason behind the reverse execution is purely software (unless the backwards branch data are utilized without latency, i.e. wired directly to some combinatorics). By performing reverse execution, output latch data can be consumed by a later stage before new input data is being pushed by the current stage. This greatly simplifies the software implementation of the pipeline.
  </p>
</div>

# 3 Data Structures

## 3.1 Latch

<div class="wp-block-jetpack-markdown">
  <p>
    A <code>Latch</code> in MinorCPU is just a data buffer (i.e., register) with a delay of 1 cycle. A <code>Latch</code> has a child classes <code>Input</code> and <code>Output</code>, which contains an <code>inputWire</code> and <code>outputWire</code> respectively. The <code>inputWire</code> and <code>outputWire</code> are <code>wire</code> objects that essentially accesses a single buffered data item (de-referencing or <code>-&gt;</code> are passed to the buffered item). The code of the <code>Latch</code> class is shown below.
  </p>
</div>

<pre class="wp-block-code"><code>template &lt;typename Data>
class Latch {
 public:
  typedef MinorBuffer&lt;Data> Buffer;

 protected:
  Cycles delay;

  Buffer buffer;

 public:
  Latch(const std::string &name,
        const std::string &data_name,
        Cycles delay_ = Cycles(1),
        bool report_backwards = false) : delay(delay_),
                                         buffer(name, data_name, delay_, 0, (report_backwards ? -delay_ : 0),
                                                (report_backwards ? 0 : -delay_)) {}

 public:
  class Input {
   public:
    typename Buffer::wire inputWire;

   public:
    Input(typename Buffer::wire input_wire) : inputWire(input_wire) {}
  };

  class Output {
   public:
    typename Buffer::wire outputWire;

   public:
    Output(typename Buffer::wire output_wire) : outputWire(output_wire) {}
  };

  bool empty() const { return buffer.empty(); }

  /** An interface to just the input of the buffer */
  Input input() { return Input(buffer.getWire(0)); }

  /** An interface to just the output of the buffer */
  Output output() { return Output(buffer.getWire(-delay)); }

  void minorTrace() const { buffer.minorTrace(); }

  void evaluate() { buffer.advance(); }
};</code></pre>

## 3.2 ForwardLineData

<pre class="wp-block-code"><code>class ForwardLineData /* : public ReportIF, public BubbleIF */
{
 private:
  /** This line is a bubble.  No other data member is required to be valid if this is true */
  bool bubbleFlag;

 public:
  /** First byte address in the line.  This is allowed to be &lt;= pc.instAddr() */
  Addr lineBaseAddr;

  /** PC of the first requested inst within this line */
  TheISA::PCState pc;

  /** Explicit line width, don't rely on data.size */
  unsigned int lineWidth;

 public:
  /** This line has a fault.  The bubble flag will be false and seqNums  will be valid but no data will */
  Fault fault;

  /** Thread, stream, prediction ... id of this line */
  InstId id;

  /** Line data.  line&#91;0] is the byte at address pc.instAddr().  Data is only valid upto lineWidth - 1. */
  uint8_t *line;

  /** Packet from which the line is taken */
  Packet *packet;

 public:
  ForwardLineData() : bubbleFlag(true),
                      lineBaseAddr(0),
                      lineWidth(0),
                      fault(NoFault),
                      line(NULL),
                      packet(NULL) {
    /* Make lines bubbles by default */
  }

  ~ForwardLineData() { line = NULL; }

 public:
  /** This is a fault, not a line */
  bool isFault() const { return fault != NoFault; }

  /** Set fault and possible clear the bubble flag */
  void setFault(Fault fault_);

  /** In-place initialise a ForwardLineData, freeing and overridding the line */
  void allocateLine(unsigned int width_);

  /** Use the data from a packet as line instead of allocating new  space.  On destruction of this object, the packet will be destroyed */
  void adoptPacketData(Packet *packet);

  /** Free this ForwardLineData line.  Note that these are shared between
     *  line objects and so you must be careful when deallocating them.
     *  Copying of ForwardLineData can, therefore, be done by default copy
     *  constructors/assignment */
  void freeLine();

  /** BubbleIF interface */
  static ForwardLineData bubble() { return ForwardLineData(); }
  bool isBubble() const { return bubbleFlag; }

  /** ReportIF interface */
  void reportData(std::ostream &os) const;
};</code></pre>

## 3.3 BranchData

<pre class="wp-block-code"><code>class BranchData /* : public ReportIF, public BubbleIF */
{
 public:
  enum Reason {
    // Don't branch at all (bubble)
    NoBranch,
    // Don't branch, but here's the details of a correct prediction that was executed
    CorrectlyPredictedBranch,

    // Take an unpredicted branch
    UnpredictedBranch,
    // Take a branch on branch prediction data (from Fetch2)
    BranchPrediction,
    // Prediction of wrong target PC
    BadlyPredictedBranchTarget,
    // Bad branch prediction (didn't actually branch).  Need to branch back to correct stream.  If the target is wrong, use BadlyPredictedBranchTarget
    BadlyPredictedBranch,
    // Suspend fetching for this thread (inst->id.threadId). This will be woken up by another stream changing branch so count it as stream changing itself and expect pc to be the PC of the next instruction
    SuspendThread,
    // Branch from an interrupt (no instruction)
    Interrupt,
    // Stop fetching in anticipation of of draining
    HaltFetch
  };

  // Is a request with this reason actually a request to change the PC rather than a bubble or branch prediction information
  static bool isStreamChange(const BranchData::Reason reason);

  // Is a request with this reason actually a 'real' branch (ignore wakup or halt instructions)
  static bool isBranch(const BranchData::Reason reason);

 public:
  Reason reason;
  ThreadID threadId;

  // Sequence number of new stream/prediction to be adopted
  InstSeqNum newStreamSeqNum;
  InstSeqNum newPredictionSeqNum;

  // Starting PC of that stream
  TheISA::PCState target;

  // Instruction which caused this branch
  MinorDynInstPtr inst;

 public:
  BranchData() : reason(NoBranch), threadId(InvalidThreadID), newStreamSeqNum(0), newPredictionSeqNum(0), target(TheISA::PCState(0)), inst(MinorDynInst::bubble()) {}

  BranchData(
      Reason reason_,
      ThreadID thread_id,
      InstSeqNum new_stream_seq_num,
      InstSeqNum new_prediction_seq_num,
      TheISA::PCState target,
      MinorDynInstPtr inst_) : reason(reason_),
                               threadId(thread_id),
                               newStreamSeqNum(new_stream_seq_num),
                               newPredictionSeqNum(new_prediction_seq_num),
                               target(target),
                               inst(inst_) {}

  static BranchData bubble() { return BranchData(); }
  bool isBubble() const { return reason == NoBranch; }
  bool isStreamChange() const { return isStreamChange(reason); }
  bool isBranch() const { return isBranch(reason); }
  void reportData(std::ostream &os) const;
};</code></pre>

## 3.4 ForwardInstData

<pre class="wp-block-code"><code>class ForwardInstData {
 public:
  /** Array of carried insts, ref counted */
  MinorDynInstPtr insts&#91;MAX_FORWARD_INSTS];

  /** The number of insts slots that can be expected to be valid insts */
  unsigned int numInsts;

  /** Thread associated with these instructions */
  ThreadID threadId;

 public:
  explicit ForwardInstData(unsigned int width = 0,
                           ThreadID tid = InvalidThreadID);

  ForwardInstData(const ForwardInstData &src);

 public:
  /** Number of instructions carried by this object */
  unsigned int width() const { return numInsts; }

  /** Copy the inst array only as far as numInsts */
  ForwardInstData &operator=(const ForwardInstData &src);

  /** Resize a bubble/empty ForwardInstData and fill with bubbles */
  void resize(unsigned int width);

  /** Fill with bubbles from 0 to width() - 1 */
  void bubbleFill();

  /** BubbleIF interface */
  bool isBubble() const;

  /** ReportIF interface */
  void reportData(std::ostream &os) const;
};</code></pre>

## 3.5 InputBuffer

<div class="wp-block-jetpack-markdown">
  <p>
    An <code>InputBuffer</code> is just an implementation of a <code>Queue</code> interface with an additional <code>elementPtr</code> attribute in front of the queue. It is just a data item that lies in front of the queue and uses pointer instead of value (claimed to improve efficiency zzzzz). Other than that, the <code>InputBuffer</code> behaves exactly like a queue.
  </p>
</div>

<pre class="wp-block-code"><code>template &lt;typename ElemType,
          typename ReportTraits = ReportTraitsAdaptor&lt;ElemType>,
          typename BubbleTraits = BubbleTraitsAdaptor&lt;ElemType> >
class InputBuffer : public Reservable {
 protected:
  mutable Queue&lt;ElemType, ReportTraits, BubbleTraits> queue;
  mutable ElemType *elementPtr;

 public:
  InputBuffer(const std::string &name, const std::string &data_name,
              unsigned int capacity_) : queue(name, data_name, capacity_),
                                        elementPtr(NULL) {}

 public:
  void
  setTail(ElemType &new_element) {
    assert(!elementPtr);
    if (!BubbleTraits::isBubble(new_element)) {
      if (queue.empty())
        elementPtr = &new_element;
      else
        queue.push(new_element);
    }
  }

  bool empty() const { return !elementPtr && queue.empty(); }

  const ElemType &front() const { return (elementPtr ? *elementPtr : queue.front()); }

  ElemType &front() { return (elementPtr ? *elementPtr : queue.front()); }

  void
  pop() {
    if (elementPtr) {
      elementPtr = NULL;
      queue.freeReservation();
    } else {
      queue.pop();
    }
  }

  void
  pushTail() const {
    if (elementPtr)
      queue.push(*elementPtr);
    elementPtr = NULL;
  }

  /** Report elements */
  void
  minorTrace() const {
    pushTail();
    queue.minorTrace();
  }

  bool canReserve() const { return queue.canReserve(); }
  void reserve() { queue.reserve(); }
  void freeReservation() { queue.freeReservation(); }

  unsigned int
  unreservedRemainingSpace() {
    pushTail();
    return queue.unreservedRemainingSpace();
  }
};</code></pre>

## 3.6 ThreadInfo

# 4 Fetch1 Stage

## 4.1 Fetch1ThreadInfo

<div class="wp-block-jetpack-markdown">
  <p>
    In MinorCPU, every stage has its own custom <code>ThreadInfo</code> to store relevant data. The one for fetch1 is shown below.
  </p>
</div>

<pre class="wp-block-code"><code>struct Fetch1ThreadInfo {
  /** Consturctor to initialize all fields. */
  Fetch1ThreadInfo() : state(FetchWaitingForPC),
             pc(TheISA::PCState(0)),
             streamSeqNum(InstId::firstStreamSeqNum),
             predictionSeqNum(InstId::firstPredictionSeqNum),
             blocked(false),
             wakeupGuard(false) {}

  Fetch1ThreadInfo(const Fetch1ThreadInfo& other) : state(other.state),
                            pc(other.pc),
                            streamSeqNum(other.streamSeqNum),
                            predictionSeqNum(other.predictionSeqNum),
                            blocked(other.blocked) {}

  FetchState state;

  /** Fetch PC value. This is updated by branches from Execute, branch
         *  prediction targets from Fetch2 and by incrementing it as we fetch
         *  lines subsequent to those two sources. */
  TheISA::PCState pc;

  /** Stream sequence number.  This changes on request from Execute and is
         *  used to tag instructions by the fetch stream to which they belong.
         *  Execute originates new prediction sequence numbers. */
  InstSeqNum streamSeqNum;

  /** Prediction sequence number.  This changes when requests from Execute
         *  or Fetch2 ask for a change of fetch address and is used to tag lines
         *  by the prediction to which they belong.  Fetch2 originates
         *  prediction sequence numbers. */
  InstSeqNum predictionSeqNum;

  /** Blocked indication for report */
  bool blocked;

  /** Signal to guard against sleeping first cycle of wakeup */
  bool wakeupGuard;
};</code></pre>

<div class="wp-block-jetpack-markdown">
  <p>
    Interestingly, the most useful queues in fetch1 are not defined under <code>Fetch1ThreadInfo</code> but directly under <code>Fetch1</code>.
  </p>
</div>

<div class="wp-block-jetpack-markdown">
  <ul>
    <li>
      <code>FetchQueue requests</code>: ITLB requests that are sent (in translation / completed) waiting to be moved to <code>transfers</code> queue (in order).
    </li>
    <li>
      <code>FetchQueue transfers</code>: Completed ITLB requests waiting to be sent to output line.
    </li>
  </ul>
</div>

## 4.2 Evaluation Steps

<div class="wp-block-jetpack-markdown">
  <p>
    In the MinorCPU, the core of each pipeline stage&#8217;s logic lies in its <code>evaluate()</code> method. This method is called every cycle and represents most of the state update logic. The rest of the logic mostly lies in callback functions for memory interfaces.
  </p>
</div>

The fetch1 stage mainly handles instruction fetching from the ITLB. This includes managing stream changes (i.e. branches), invoking ITLB translation and handling ITLB responses.

### 4.2.1 Set Up Variables

<div class="wp-block-jetpack-markdown">
  <p>
    At the beginning of the <code>evaluate()</code> method, input and output variables are set up. Fetch1 receives <code>BranchData</code> input from the execute and fetch2 branches and outputs <code>ForwardLineData</code> to fetch2.
  </p>
</div>

<pre class="wp-block-code"><code>const BranchData &execute_branch = *inp.outputWire;
const BranchData &fetch2_branch = *prediction.outputWire;
ForwardLineData &line_out = *out.inputWire;
</code></pre>

### 4.2.2 Stream Change

<div class="wp-block-jetpack-markdown">
  <p>
    fetch1 receives <code>BranchData</code> from both execute and fetch2. The branching logic is very simple. If execute and fetch2 indicates a stream change for the same thread, prioritize the instruction from execute. The reason is very straightforward: execute stage branch data are certain (they are computed after an instruction&#8217;s results are evaluated), and fetch2 branch predictions are only primitive guesses based on the decoded instruction (they are totally be wrong). However, if the stream changes are for different branches, both will be carried out.
  </p>
</div>

**Case: Same Thread**

<pre class="wp-block-code"><code>if (execute_branch.isStreamChange() && thread.state != FetchHalted) {
  changeStream(execute_branch);
} else if (thread.state != FetchHalted && fetch2_branch.isStreamChange()) {
  changeStream(fetch2_branch);
}</code></pre>

**Case: Different Thread**

<pre class="wp-block-code"><code>if (execute_branch.threadId != InvalidThreadID &&
  execute_branch.isStreamChange()) {
  if (fetchInfo&#91;execute_branch.threadId].state != FetchHalted) {
    changeStream(execute_branch);
  }
}

if (fetch2_branch.threadId != InvalidThreadID &&
  fetch2_branch.isStreamChange()) {
  if (fetchInfo&#91;fetch2_branch.threadId].state != FetchHalted && fetch2_branch.newStreamSeqNum == fetchInfo&#91;fetch2_branch.threadId].streamSeqNum) {
    changeStream(fetch2_branch);
  }
}</code></pre>

**What happens during a stream change?**

<div class="wp-block-jetpack-markdown">
  <p>
    The main body of the function <code>changeStream</code> is shown below. It basically updates the thread <code>state</code>, <code>streamSeqNum</code>, <code>predictionSeqNum</code> and <code>pc</code>. <code>streamSeqNum</code> and <code>predictionSeqNum</code> are numbers given by fetch2. They are updated on a thread-level and used to construct the <code>InstId</code> field of the fetched instruction. Later, in fetch2, they will be checked to ensure that obsolete instructions are discarded.
  </p>
</div>

<pre class="wp-block-code"><code>Fetch1ThreadInfo &thread = fetchInfo&#91;branch.threadId];

updateExpectedSeqNums(branch);

/* Start fetching again if we were stopped */
switch (branch.reason) {
case BranchData::SuspendThread: {
  if (thread.wakeupGuard) {
    DPRINTF(Fetch, "Not suspending");
  } else {
    DPRINTF(Fetch, "Suspending fetch");
    thread.state = FetchWaitingForPC;
  }
} break;
case BranchData::HaltFetch:
  DPRINTF(Fetch, "Halting fetch");
  thread.state = FetchHalted;
  break;
default:
  DPRINTF(Fetch, "Changing stream on branch");
  thread.state = FetchRunning;
  break;
}
thread.pc = branch.target;</code></pre>

### 4.2.3 Issue a Fetch

After handling the change of stream, fetch1 proceeds to issue a fetch request for the currently active thread.

<pre class="wp-block-code"><code>if (numInFlightFetches() &lt; fetchLimit) {
  ThreadID fetch_tid = getScheduledThread();

  if (fetch_tid != InvalidThreadID) {
    fetchLine(fetch_tid);
    nextStageReserve&#91;fetch_tid].reserve();
  }
}</code></pre>

**fetchLine**

<div class="wp-block-jetpack-markdown">
  <p>
    The <code>fetchLine</code> method constructs a request object (not requesting a single instruction but however many the lineWidth can accomodate) to send to the ITLB. It involves filling in the line&#8217;s <code>InstId</code> (<code>streamSeqNum</code>, <code>predictionSeqNum</code>, <code>lineSeqNum</code>). Then, the request object is pushed to the <code>requests</code> queue and a slot is reserved from the <code>transfers</code> queue. Afterwards, the <code>translateTiming</code> method of the TLB is invoked. Once a response is received, the <code>recvTimingResp</code> method is called and the <code>request</code> object in the <code>requests</code> queue is marked to <code>FetchRequest::Complete</code>.
  </p>
</div>

<div class="wp-block-ub-tabbed-content wp-block-ub-tabbed-content-holder wp-block-ub-tabbed-content-horizontal-holder-mobile wp-block-ub-tabbed-content-horizontal-holder-tablet" id="ub-tabbed-content-f549c1a8-9f4d-4fb4-91a4-c150fc484254">
  <div role="tablist" class="wp-block-ub-tabbed-content-tab-holder  horizontal-tab-width-mobile horizontal-tab-width-tablet">
    <div class="wp-block-ub-tabbed-content-tabs-title wp-block-ub-tabbed-content-tabs-title-mobile-horizontal-tab wp-block-ub-tabbed-content-tabs-title-tablet-horizontal-tab">
      <div role="tab" id="ub-tabbed-content-f549c1a8-9f4d-4fb4-91a4-c150fc484254-tab-0" aria-controls="ub-tabbed-content-f549c1a8-9f4d-4fb4-91a4-c150fc484254-panel-0" aria-selected="true" class = "wp-block-ub-tabbed-content-tab-title-wrap active"> 
      
      <div class="wp-block-ub-tabbed-content-tab-title">
        fetchLine
      </div>
    </div><div role="tab" id="ub-tabbed-content-f549c1a8-9f4d-4fb4-91a4-c150fc484254-tab-1" aria-controls="ub-tabbed-content-f549c1a8-9f4d-4fb4-91a4-c150fc484254-panel-1" aria-selected="false" class = "wp-block-ub-tabbed-content-tab-title-wrap"> 
    
    <div class="wp-block-ub-tabbed-content-tab-title">
      recvTimingResp
    </div>
  </div>
</div></div>

<div class="wp-block-ub-tabbed-content-tabs-content ">
  <div role="tabpanel" class="wp-block-ub-tabbed-content-tab-content-wrap active"
        id="ub-tabbed-content--panel-0" aria-labelledby="ub-tabbed-content--tab-0">
    <pre class="wp-block-code"><code>void Fetch1::fetchLine(ThreadID tid) {
  /* Reference the currently used thread state. */
  Fetch1ThreadInfo &thread = fetchInfo&#91;tid];

/_ If line_offset != 0, a request is pushed for the remainder of the
_ line. _/
/_ Use a lower, sizeof(MachInst) aligned address for the fetch \*/
Addr aligned_pc = thread.pc.instAddr() & ~((Addr)lineSnap - 1);
unsigned int line_offset = aligned_pc % lineSnap;
unsigned int request_size = maxLineWidth - line_offset;

/_ Fill in the line's id _/
InstId request_id(tid,
thread.streamSeqNum, thread.predictionSeqNum,
lineSeqNum);

FetchRequestPtr request = new FetchRequest(\*this, request_id, thread.pc);

DPRINTF(Fetch,
"Inserting fetch into the fetch queue "
"%s addr: 0x%x pc: %s line_offset: %d request_size: %d\n",
request_id, aligned_pc, thread.pc, line_offset, request_size);

request->request->setContext(cpu.threads&#91;tid]->getTC()->contextId());
request->request->setVirt(
aligned_pc, request_size, Request::INST_FETCH, cpu.instRequestorId(),
/_ I've no idea why we need the PC, but give it _/
thread.pc.instAddr());

DPRINTF(Fetch, "Submitting ITLB request\n");
numFetchesInITLB++;

request->state = FetchRequest::InTranslation;

/_ Reserve space in the queues upstream of requests for results _/
transfers.reserve();
requests.push(request);

/_ Submit the translation request. The response will come
_ through finish/markDelayed on this request as it bears
_ the Translation interface _/
cpu.threads&#91;request->id.threadId]->itb->translateTiming(
request->request,
cpu.getContext(request->id.threadId),
request, BaseTLB::Execute);

lineSeqNum++;

/_ Step the PC for the next line onto the line aligned next address.
_ Note that as instructions can span lines, this PC is only a
_ reliable 'new' PC if the next line has a new stream sequence number. _/
thread.pc.set(aligned_pc + request_size);
}</code></pre>

  </div>
  
  <div role="tabpanel" class="wp-block-ub-tabbed-content-tab-content-wrap ub-hide"
        id="ub-tabbed-content--panel-1" aria-labelledby="ub-tabbed-content--tab-1">
    <pre class="wp-block-code"><code>bool Fetch1::recvTimingResp(PacketPtr response) {
  DPRINTF(Fetch, "recvTimingResp %d\n", numFetchesInMemorySystem);

/_ Only push the response if we didn't change stream? No, all responses
_ should hit the responses queue. It's the job of 'step' to throw them
_ away. _/
FetchRequestPtr fetch_request = safe_cast&lt;FetchRequestPtr>(response->popSenderState());

/_ Fixup packet in fetch_request as this may have changed _/
assert(!fetch_request->packet);
fetch_request->packet = response;

numFetchesInMemorySystem--;
fetch_request->state = FetchRequest::Complete;

if (DTRACE(MinorTrace))
minorTraceResponseLine(name(), fetch_request);

if (response->isError()) {
DPRINTF(Fetch, "Received error response packet: %s\n",
fetch_request->id);
}

/_ We go to idle even if there are more things to do on the queues as
_ it's the job of step to actually step us on to the next transaction \*/

/_ Let's try and wake up the processor for the next cycle to move on
_ queues \*/
cpu.wakeupOnEvent(Pipeline::Fetch1StageId);

/_ Never busy _/
return true;
}</code></pre>

  </div>
</div></div>

### 4.2.4 Move the Queues

<div class="wp-block-jetpack-markdown">
  <p>
    After issuing a new translation request, fetch1 advances the <code>requests</code> and <code>transfers</code> queues, handling completed requests and transfers. The essence here is simply to inspect the front of the request queue for completed request and move it to the transfer queue if possible. The only complication is the validations on whether the request is discardable or still in transfer etc.
  </p>
</div>

<pre class="wp-block-code"><code>stepQueues();</code></pre>

<div class="wp-block-ub-tabbed-content wp-block-ub-tabbed-content-holder wp-block-ub-tabbed-content-horizontal-holder-mobile wp-block-ub-tabbed-content-horizontal-holder-tablet" id="ub-tabbed-content-698d0adb-53ec-431e-bcac-a132821a8477">
  <div role="tablist" class="wp-block-ub-tabbed-content-tab-holder  horizontal-tab-width-mobile horizontal-tab-width-tablet">
    <div class="wp-block-ub-tabbed-content-tabs-title wp-block-ub-tabbed-content-tabs-title-mobile-horizontal-tab wp-block-ub-tabbed-content-tabs-title-tablet-horizontal-tab">
      <div role="tab" id="ub-tabbed-content-698d0adb-53ec-431e-bcac-a132821a8477-tab-0" aria-controls="ub-tabbed-content-698d0adb-53ec-431e-bcac-a132821a8477-panel-0" aria-selected="false" class = "wp-block-ub-tabbed-content-tab-title-wrap"> 
      
      <div class="wp-block-ub-tabbed-content-tab-title">
        stepQueues
      </div>
    </div><div role="tab" id="ub-tabbed-content-698d0adb-53ec-431e-bcac-a132821a8477-tab-1" aria-controls="ub-tabbed-content-698d0adb-53ec-431e-bcac-a132821a8477-panel-1" aria-selected="false" class = "wp-block-ub-tabbed-content-tab-title-wrap"> 
    
    <div class="wp-block-ub-tabbed-content-tab-title">
      tryToSendToTransfers
    </div>
  </div><div role="tab" id="ub-tabbed-content-698d0adb-53ec-431e-bcac-a132821a8477-tab-2" aria-controls="ub-tabbed-content-698d0adb-53ec-431e-bcac-a132821a8477-panel-2" aria-selected="true" class = "wp-block-ub-tabbed-content-tab-title-wrap active"> 
  
  <div class="wp-block-ub-tabbed-content-tab-title">
    moveFromRequestsToTransfers
  </div>
</div></div></div>

<div class="wp-block-ub-tabbed-content-tabs-content ">
  <div role="tabpanel" class="wp-block-ub-tabbed-content-tab-content-wrap ub-hide"
        id="ub-tabbed-content--panel-0" aria-labelledby="ub-tabbed-content--tab-0">
    <pre class="wp-block-code"><code>void Fetch1::stepQueues() {
  IcacheState old_icache_state = icacheState;

switch (icacheState) {
case IcacheRunning:
/_ Move ITLB results on to the memory system _/
if (!requests.empty()) {
tryToSendToTransfers(requests.front());
}
break;
case IcacheNeedsRetry:
break;
}

if (icacheState != old_icache_state) {
DPRINTF(Fetch, "Step in state %s moving to state %s\n",
old_icache_state, icacheState);
}
}</code></pre>

  </div>
  
  <div role="tabpanel" class="wp-block-ub-tabbed-content-tab-content-wrap ub-hide"
        id="ub-tabbed-content--panel-1" aria-labelledby="ub-tabbed-content--tab-1">
    <pre class="wp-block-code"><code>void Fetch1::tryToSendToTransfers(FetchRequestPtr request) {
  if (!requests.empty() && requests.front() != request) {
    DPRINTF(Fetch,
        "Fetch not at front of requests queue, can't"
        " issue to memory\n");
    return;
  }

if (request->state == FetchRequest::InTranslation) {
DPRINTF(Fetch,
"Fetch still in translation, not issuing to"
" memory\n");
return;
}

if (request->isDiscardable() || request->fault != NoFault) {
/_ Discarded and faulting requests carry on through transfers
_ as Complete/packet == NULL \*/

    request->state = FetchRequest::Complete;
    moveFromRequestsToTransfers(request);

    /* Wake up the pipeline next cycle as there will be no event
         *  for this queue->queue transfer */
    cpu.wakeupOnEvent(Pipeline::Fetch1StageId);

} else if (request->state == FetchRequest::Translated) {
if (!request->packet)
request->makePacket();

    /* Ensure that the packet won't delete the request */
    assert(request->packet->needsResponse());

    if (tryToSend(request))
      moveFromRequestsToTransfers(request);

} else {
DPRINTF(Fetch, "Not advancing line fetch\n");
}
}</code></pre>

  </div>
  
  <div role="tabpanel" class="wp-block-ub-tabbed-content-tab-content-wrap active"
        id="ub-tabbed-content--panel-2" aria-labelledby="ub-tabbed-content--tab-2">
    <pre class="wp-block-code"><code>void Fetch1::moveFromRequestsToTransfers(FetchRequestPtr request) {
  assert(!requests.empty() && requests.front() == request);

requests.pop();
transfers.push(request);
}</code></pre>

  </div>
</div></div>

### 4.2.5 Update Line Data

<div class="wp-block-jetpack-markdown">
  <p>
    After inspecting and moving the <code>requests</code> queue, fetch1 then examines the <code>transfers</code> queue and push any valid data onto the output.
  </p>
</div>

<pre class="wp-block-code"><code>if (!transfers.empty() &&
 transfers.front()->isComplete()) {
  Fetch1::FetchRequestPtr response = transfers.front();

  if (response->isDiscardable()) {
    nextStageReserve&#91;response->id.threadId].freeReservation();

    DPRINTF(Fetch,
 "Discarding translated fetch as it's for an old stream\n");

    /* Wake up next cycle just in case there was some other
 action to do */
    cpu.wakeupOnEvent(Pipeline::Fetch1StageId);
  } else {
    DPRINTF(Fetch, "Processing fetched line: %s\n",
 response->id);

    processResponse(response, line_out);
  }

  popAndDiscard(transfers);
}</code></pre>

<div class="wp-block-ub-tabbed-content wp-block-ub-tabbed-content-holder wp-block-ub-tabbed-content-horizontal-holder-mobile wp-block-ub-tabbed-content-horizontal-holder-tablet" id="ub-tabbed-content-fbe528df-c385-4072-9d39-376349aa5ac1">
  <div role="tablist" class="wp-block-ub-tabbed-content-tab-holder  horizontal-tab-width-mobile horizontal-tab-width-tablet">
    <div class="wp-block-ub-tabbed-content-tabs-title wp-block-ub-tabbed-content-tabs-title-mobile-horizontal-tab wp-block-ub-tabbed-content-tabs-title-tablet-horizontal-tab">
      <div role="tab" id="ub-tabbed-content-fbe528df-c385-4072-9d39-376349aa5ac1-tab-0" aria-controls="ub-tabbed-content-fbe528df-c385-4072-9d39-376349aa5ac1-panel-0" aria-selected="true" class = "wp-block-ub-tabbed-content-tab-title-wrap active"> 
      
      <div class="wp-block-ub-tabbed-content-tab-title">
        processResponse
      </div>
    </div><div role="tab" id="ub-tabbed-content-fbe528df-c385-4072-9d39-376349aa5ac1-tab-1" aria-controls="ub-tabbed-content-fbe528df-c385-4072-9d39-376349aa5ac1-panel-1" aria-selected="false" class = "wp-block-ub-tabbed-content-tab-title-wrap"> 
    
    <div class="wp-block-ub-tabbed-content-tab-title">
      popAndDiscard
    </div>
  </div>
</div></div>

<div class="wp-block-ub-tabbed-content-tabs-content ">
  <div role="tabpanel" class="wp-block-ub-tabbed-content-tab-content-wrap active"
        id="ub-tabbed-content--panel-0" aria-labelledby="ub-tabbed-content--tab-0">
    <pre class="wp-block-code"><code>void Fetch1::processResponse(Fetch1::FetchRequestPtr response,
 ForwardLineData &line) {
  Fetch1ThreadInfo &thread = fetchInfo&#91;response->id.threadId];
  PacketPtr packet = response->packet;

/_ Pass the prefetch abort (if any) on to Fetch2 in a ForwardLineData
structure _/
line.setFault(response->fault);
/_ Make sequence numbers valid in return _/
line.id = response->id;
/_ Set PC to virtual address _/
line.pc = response->pc;
/_ Set the lineBase, which is a sizeof(MachInst) aligned address &lt;=
pc.instAddr() _/
line.lineBaseAddr = response->request->getVaddr();

if (response->fault != NoFault) {
/_ Stop fetching if there was a fault _/
/_ Should probably try to flush the queues as well, but we
_ can't be sure that this fault will actually reach Execute, and we
_ can't (currently) selectively remove this stream from the queues _/
DPRINTF(Fetch, "Stopping line fetch because of fault: %s\n",
response->fault->name());
thread.state = Fetch1::FetchWaitingForPC;
} else {
line.adoptPacketData(packet);
/_ Null the response's packet to prevent the response from trying to
_ deallocate the packet \*/
response->packet = NULL;
}
}</code></pre>

  </div>
  
  <div role="tabpanel" class="wp-block-ub-tabbed-content-tab-content-wrap ub-hide"
        id="ub-tabbed-content--panel-1" aria-labelledby="ub-tabbed-content--tab-1">
    <pre class="wp-block-code"><code>void Fetch1::popAndDiscard(FetchQueue &queue) {
  if (!queue.empty()) {
    delete queue.front();
    queue.pop();
  }
}</code></pre>
  </div>
</div></div>

# 5 Fetch2

## 5.1 Fetch2ThreadInfo

<div class="wp-block-jetpack-markdown">
  <p>
    fetch2 is a relatively simple stage. It is mainly responsible for decoding machine instructions into <code>MinorDynInst</code> objects. The complications mainly come from handling instruction alignment and sizes (can be compressed or full, 2-byte or 4-byte aligned). This is because each <code>ForwardLineData</code> object passed from fetch1 can contain 1 or more (and even partial) instructions. The important fields in <code>Fetch2ThreadInfo</code> are:
  </p>
</div>

<div class="wp-block-jetpack-markdown">
  <ul>
    <li>
      <code>PCState pc</code>: remembered PC value <ul>
        <li>
          if havePC is false in previous cycle, set new PC (from forwardlinedata.pc) and reset decoder to align to line start
        </li>
      </ul>
    </li>
    
    <li>
      <code>bool havePC</code>: whether current PC is valid, turned invalid once there is branch predicted, or when branch is received at start of cycle (and line discarded)
    </li>
    <li>
      <code>unsigned int inputIndex</code>: index (relative to based index 0 of inp->front->line), 4 aligned <strong>decoder handles compressed instruction, 2-byte aligned full instr etc.</strong>
    </li>
  </ul>
</div>

<pre class="wp-block-code"><code>struct Fetch2ThreadInfo {
  /** Default constructor */
  Fetch2ThreadInfo() : inputIndex(0),
             pc(TheISA::PCState(0)),
             havePC(false),
             lastStreamSeqNum(InstId::firstStreamSeqNum),
             fetchSeqNum(InstId::firstFetchSeqNum),
             expectedStreamSeqNum(InstId::firstStreamSeqNum),
             predictionSeqNum(InstId::firstPredictionSeqNum),
             blocked(false) {}

  Fetch2ThreadInfo(const Fetch2ThreadInfo& other) : inputIndex(other.inputIndex),
                            pc(other.pc),
                            havePC(other.havePC),
                            lastStreamSeqNum(other.lastStreamSeqNum),
                            expectedStreamSeqNum(other.expectedStreamSeqNum),
                            predictionSeqNum(other.predictionSeqNum),
                            blocked(other.blocked) {}

  /** Index into an incompletely processed input line that instructions
         *  are to be extracted from */
  unsigned int inputIndex;

  /** Remembered program counter value.  Between contiguous lines, this
         *  is just updated with advancePC.  For lines following changes of
         *  stream, a new PC must be loaded and havePC be set.
         *  havePC is needed to accomodate instructions which span across
         *  lines meaning that Fetch2 and the decoder need to remember a PC
         *  value and a partially-offered instruction from the previous line */
  TheISA::PCState pc;

  /** PC is currently valid.  Initially false, gets set to true when a
         *  change-of-stream line is received and false again when lines are
         *  discarded for any reason */
  bool havePC;

  /** Stream sequence number of the last seen line used to identify
         *  changes of instruction stream */
  InstSeqNum lastStreamSeqNum;

  /** Fetch2 is the source of fetch sequence numbers.  These represent the
         *  sequence that instructions were extracted from fetched lines. */
  InstSeqNum fetchSeqNum;

  /** Stream sequence number remembered from last time the
         *  predictionSeqNum changed.  Lines should only be discarded when their
         *  predictionSeqNums disagree with Fetch2::predictionSeqNum *and* they
         *  are from the same stream that bore that prediction number */
  InstSeqNum expectedStreamSeqNum;

  /** Fetch2 is the source of prediction sequence numbers.  These
         *  represent predicted changes of control flow sources from branch
         *  prediction in Fetch2. */
  InstSeqNum predictionSeqNum;

  /** Blocked indication for report */
  bool blocked;
};</code></pre>

## 4.1 Execute

1. Advance LSQ
2. Commit Instructions
   - Do not commit instructions if there is an interrupt or an active branch instruction
3. Issue Instruction
4. Advance FU Pipelines

### 4.1.2 Commit

<div class="wp-block-jetpack-markdown">
  <p>
    <code>commit</code> loops through all instructions in <code>ex_info.inFlightInsts</code> until there is either a branch change or a fault or reached maximum.
  </p>
</div>

- if mem_response (i.e. instruction is in LSQ and has response)
  - handleMemResponse
- else if can issue early

## 4.2 Decode

<pre class="wp-block-code"><code>class Fetch1 {
  Latch&lt;BranchData>::Output inp;
  Latch&lt;ForwardLineData>::Input out;
  Latch&lt;BranchData>::Output prediction;

  FetchQueue requests;
  FetchQueue transfers;

  std::vector&lt;Fetch1ThreadInfo> fetchInfo;

  IcachePort icachePort;
};

struct Fetch1ThreadInfo {
  TheISA::PCState pc;

  InstSeqNum streamSeqNum;

  InstSeqNum predictionSeqNum;
};

class Fetch2 {
  Latch&lt;ForwardLineData>::Output inp;
  Latch&lt;BranchData>::Output branchInp;
  Latch&lt;BranchData>::Input predictionOut;
  Latch&lt;ForwardInstData>::Input out;

  BPredUnit &branchPredictor;

  std::vector&lt;InputBuffer&lt;ForwardLineData>> inputBuffer;

  std::vector&lt;Fetch2ThreadInfo> fetchInfo;
};

struct Fetch2ThreadInfo {
  unsigned int inputIndex;
  bool havePC;

  InstSeqNum lastStreamSeqNum;
  InstSeqNum expectedStreamSeqNum;
  InstSeqNum predictionSeqNum;
};

class Decode {
  Latch&lt;ForwardInstData>::Output inp;
  Latch&lt;ForwardInstData>::Input out;

  std::vector&lt;DecodeThreadInfo> decodeInfo;

  std::vector&lt;InputBuffer&lt;ForwardInstData>> inputBuffer;
};
struct DecodeThreadInfo {
  unsigned int inputIndex;
  bool inMacroop;

  TheISA::PCState microopPC;
  InstSeqNum execSeqNum;
};

class Execute {
  Latch&lt;ForwardInstData>::Output inp;
  Latch&lt;BranchData>::Input out;
  LSQ lsq;
  std::vector&lt;Scoreboard> scoreboard;
  std::vector&lt;FUPipeline *> funcUnits;
  std::vector&lt;ExecuteThreadInfo> executeInfo;
  std::vector&lt;InputBuffer&lt;ForwardInstData>> inputBuffer;
};

struct ExecuteThreadInfo {
  Queue&lt;QueuedInst, ReportTraitsAdaptor&lt;QueuedInst>> *inFlightInsts;
  Queue&lt;QueuedInst, ReportTraitsAdaptor&lt;QueuedInst>> *inFUMemInsts;
  InstSeqNum streamSeqNum;
  InstSeqNum lastPredictionSeqNum;
};</code></pre>
