---
title: Computer Architecture – Memory Hierarchy Design (Part 1)
author: ppeetteerrsx
type: post
date: 2020-10-01T04:06:13+00:00
excerpt: This is an excerpt.
url: /ce/computer-organization-and-design-performance-part-1/
views:
  - 14
categories:
  - Computer Architecture
  - Computer Engineering
tags:
  - computer architecture
  - huawei
  - riscv
series:
  - Computer Architecture
---

# 1 Preface

This is a series of notes that I made while reading the book "Computer Architecture: A Quantitative Approach". It is recommended that students read the book "Computer Organization and Design" to gain a high-level overview of the concepts before studying "Computer Architecture". This series of notes (and textbooks) will be based around the RISCV instruction set. However, the concepts should be universal.

<div class="wp-block-file">
  <a href="https://ppeetteerrsx.com/wp-content/uploads/2020/10/Computer-Organization-and-Design-The-Hardware-Software-Interface-RISC-V-Edition.pdf">Computer Organization and Design</a><a href="https://ppeetteerrsx.com/wp-content/uploads/2020/10/Computer-Organization-and-Design-The-Hardware-Software-Interface-RISC-V-Edition.pdf" class="wp-block-file__button" download>Download</a>
</div>

# 2 Basics of Memory Hierarchy

A memory hierarchy **takes advantage of the principle of locality and trade-offs in the cost-performance of memory technologies**. An ideal memory hierarchy will have a cost per byte almost as low as the cheapest level of memory and a speed almost as fast as the fastest level.

The importance of memory hierarchy grows with advances in performance of processors. The slow performance growth of memory technologies have limited the growth of processor performance due to limited bandwidth and long access time. While caches can greatly improve memory access times, power budget comes into place, limiting the size of the caches that can be used.

When a word is not found in the cache, the word must be fetched from a lower level in the hierarchy and placed in the cache. Multiple words (called a **block** or line) are moved for efficiency reasons as they are likely to be needed due to spatial locality. Each cache block includes a tag to indicate which memory address it corresponds to.

A key design decision is now the placement of blocks in the cache, as the cache has limited size and a decision has to be made on which block to replace. The most popular scheme is set associative where the cache is split into **sets** (group of blocks). Each block is mapped to a set by (Block address) % (Number of sets). The placement is called **n-way set associative** if there are n blocks in a set (**direct-mapped**: one block per set, **fully associative**: only 1 set). Finding a block consists of mapping the block address to the set then searching the set (usually in parallel), to find the block.

Another difficulty lies in maintaining consistency between memory and the cache. There are two main strategies. A **write-through** cache updates the item in the cache and writes through to update the main memory. **write-back** cache only updates the copy in the cache and copy the content to memory only when it is about to be replaced. Both strategies can use a **write buffer** to allow the cache to proceed as soon as the data are placed in the buffer (rather than waiting the full latency).

One way to measure the benefits of different cache organizations is miss rate, which is the fraction of cache accesses that result in a miss. Misses can be sorted based on the 3-Cs model.

- **Compulsory** &#8211; Very first access to a block cannot be in the cache. These misses occurs even if you have an infinite-sized cache.
- **Capacity** &#8211; Occurs because of blocks being discarded and later retrieved (when cache cannot contain all the blocks).
- **Conflict** &#8211; Occurs because a block may be discarded and later retrieved if multiple blocks map to its set and accesses to the different blocks are intermingled.
- **Coherency** &#8211; cache flushes to keep multiple caches coherent in a multiprocessor.

It is usually prefered to measure **misses per instruction** rather than misses per memory reference (miss rate).

$$\frac{\text{Misses}}{\text{Instruction}} = \text{Miss rate} \times \frac{\text{Memory acceses}}{\text{Instruction}}$$

A better measure that factors in the cost of a miss is the **average memory access time**.

$$\text{Average memory access time} = \text{Hit time} + \text{Miss rate} \times \text{Miss penalty}$$

## 2.1 Basic Cache Optimizations

- **Larger block size to reduce miss rate** &#8211; reduces compulsory misses but increase miss penalty. Less number of tags slightly reduces static power. Larger block sizes increase capacity or conflict misses especially in smaller caches.
- **Bigger caches to reduce miss rate** &#8211; but longer hit time and higher cost and power (static and dynamic)
- **Higher associativity to reduce miss rate** &#8211; increased hit time and power consumption
- **Multilevel caches to reduce miss penalty** &#8211; Allows faster hit time (small first level) yet larger blocks, bigger capacity and higher associativity in second level. Multilevel caches are also more pwoer-efficient than single-aggregate cache.

<div class="wp-block-katex-display-block katex-eq" data-katex-display="true">
  <pre>\text{Average memory access time} = \text{Hit time}_{L1} + \text{Miss rate}_{L1} \times (\text{Hit time}_{L2} + \text{Miss rate}_{L2} \times \text{Miss penalty}_{L2})</pre>
</div>

- **Giving priority to read misses over writes to reduce miss penalty** &#8211; A write buffer is a good place to implement this optimization. However, it creates hazards because they hold the updated value of a location needed on a read miss (read-after-write) hazard through memory. One solution is to check the contents of the write buffer on a read miss. If there are no conflicts and the memory system is available, send the read before the writes to reduce the miss penalty. This has little effect on power consumption.
- **Avoiding address translation during indexing of the cache to reduce hit time** &#8211; Caches must cope with the translation of a virtual address from the processor to a physical address to access memory. A common optimization is to use the page offset (part that is identical in both virtual and physical addresses) to index the cache. This adds some system complications on the size and structure of the L1 cache, but advantage of removing translation lookaside buffer (TLB) access from critical path outweigh disadvantages.

# 3 Memory Technology and Optimzations

**Access time**: time between when a read is requested and when the desired word arrives.

**Cycle time**: minimum time between unrelated requests to memory.

## 3.1 SRAM

SRAMs are **static** and **do not need to refresh**, so access time is very close to the cycle time. SRAMs use **six transistors per bit** to prevent information from being disturbed when read. Hence, SRAMS are faster than DRAMs.

SRAMs used to be used for all levels of caches. Today, caches are integrated onto the processor chip and even L3 cache access time is usually at least five times faster than a DRAM access.

SRAMs are normally organized with a width that matches the block size of the cache with tags stored parallelly. This allows entire blocks to be read out or written into a single cycle. The access time to the cache is proportional to the number of blocks in the cache and energy consumption depends both on the number of bits in the cache (static power) and the number of blocks (dynamic power).

## 3.2 DRAM

As early DRAM grew in capacity, the cost of a package with all necessary address lines was an issue, hence the solution was to **multiplex the address lines**. Half of the address is sent during the row access strobe (RAS) and the other half sent during the column access strobe (CAS).

In a DRAM, each bit is stored using a **single transistor**. Reading a bit (capacitor) destroys the information and must be written back. Hence, the cycle time before a new row could be read was large than the time to read a row and access a portion of that row. Also, each bit must be **refreshed periodically**. Every DRAM must access every row within a certain time window (say 64ms).

### 3.2.1 SDRAM

Very **early DRAMs** included a buffer to allow multiple column accesses to a single row without requiring a new row access, but they used an **asynchronous** interface. This means that every column access and transfer involved an **overhead** to synchronize with the controller. In mid-1990s, designers added a **clock signal** to the DRAM interface to avoid the overhead, creating synchronous DRAM (**SDRAM**). In addition to synchronization, SDRAMs also allowed **burst transfer mode** where more than 16-bit transfers can occur without sending any new addresses by placing the DRAM in burst mode. Hence, there is a **significant gap between the bandwidth for a stream of random accesses versus access to a block of data**.

Further enhancements in subsequent DDR standards including **wider buses** and **double data rate** (DDR), meaning that the DRAM transfers data on both the rising and falling edge of the memory clock. Finally, SDRAMs introduced **banks** to help with power management , improve access time and allow interleaved and overlapped accesses to different banks (each has its own row buffer).

With the introduction of DDR, memory designers increased focus on bandwidth because improvements in access time were difficult. DRAMs are commonly sold on small boards called dual inline memory modules (**DIMMs**) that contain 4-16 DRAM chips and are normally organized to be 8-byte wide for desktop and server systems. DDR SDRAMs are confusingly labeled by the peak DIMM band-width, therefore the DIMM name PC3200 comes from 200MHz \* 2 \* 8 bytes. Note that it is labeled with the number of bits per second rather than their clock rate, hence a multiple of 2.

### 3.2.2 Power Consumption

Power consumption in dynamic memory chips consists of both dynamic power used in a read or write and static or standby power, both depending on the operating voltage. In the most advanced DDR4 SDRAMs, the operating voltage has dropped to 1.2V, significantly reducing power versus DDR2 and DDR3 SDRAMs. The addition of banks also reduced power because only the row in a single bank is used.<figure class="wp-block-embed is-type-rich is-provider-embed-handler">

<div class="wp-block-embed__wrapper">
</div></figure>

## 3.3 Graphics Data RAM (GDRAM)

GDRAMs or GSDRAMs are a special class of DRAMs based on SDRAM designs but tailored for handling the higher bandwidth demands of graphics processing units. GDDR5 is based on DDR3 with earlier GDDR based on DDR2. Important differences include:

- Wider interfaces: 32-bits vs 4-16 in current designs
- Higher maximum clock rate on data pins: higher transfer rate without incurring signaling problems (connected directly to GPU and attached by soldering, not arranged in expandable array of DIMMs)

## 3.4 Stacked or Embedded DRAMs

The newest innovation in 2017 in DRAMs is a packaging innovation where multiple DRAMs are placed in a stacked or adjacent fashion embedded within the same package as the processor. They are called high bandwidth memory (HBM) by several producers. The DRAMs can be stacked directly on top of the CPU die (3D) or adjacent to it (2.5D). Such special versions of SDRAMs can have up to 8GiB of memory and 1TB/s transfer rate.

## 3.5 Flash Memory

Flash memory is a type of EEPROM which is normally read-only but can be erased. The other key property of Flash memory is that it holds its contents without any power. NAND Flash has a higher density than NOR Flash and is more suitable for large-scale nonvolatile memories. However, it has slower writing and access is sequential.

Flash is usually used as the secondary storage in PMD in the sam emanner that a disk functions in a laptop or server. Important differences between Flash and DRAM includes:

- Reads to Flash are sequential and read an entire page which can be 512 bytes / 2 KiB or 4KiB. NAND Flash has a long delay to access the first byte from random address (around 25µs), but can supply the remainder of a page block at about 40MiB/s. In comparison, a DDR4 SDRAM takes about 40ns to the first byte and can transfer the rest of the row at 4.8GiB/s. The Flash is around 150 times slower than DDR DRAM but 300-500 faster than magnetic disk when accessing a 2KiB read.
- Flash memory must be erased before it is overwritten and it is erased in blocks rather than individual bytes. This means that when writing data to the Flash, an entire block must be assembled either as new data or by merging new data with existing data. Hence, Flash is about 1500 times slower than SDRAM when writing and 8-15 times faster than magnetic disk.
- Flash memory is nonvolatile and draws significantly less power when not reading or writing.
- Flash memory limits the number of time any given block can be written, typically at least 100,000 (maximizing lifetime of Flash memory by uniformly distributing writes).
- High-density NAND Flash is cheaper than SDRAM but more expensive than disks ($2/GiB for Flash, $20-40/GiB for SDRAM, $0.09/GiB
