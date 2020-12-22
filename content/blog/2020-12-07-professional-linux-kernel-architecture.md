---
title: Professional Linux Kernel Architecture
author: ppeetteerrsx
type: post
date: 2020-12-07T02:35:40+00:00
excerpt: Introduction to the Linux Kernel
url: /programming/professional-linux-kernel-architecture/
views:
  - 3
categories:
  - Books
  - Computer Architecture
  - Programming
tags:
  - computer architecture
  - programming
series:
  - Professional Linux Kernel Architecture

---
# 1 Introduction {#1_introduction}

## 1.1 Tasks of the Kernel {#11_tasks_of_the_kernel}

  * **Enhanced machine:** kernel abstracts the computer on a high level such that applications have no contact with the hardware itself
  * **Resource manager:** kernel is an instance that shares available resources between various system processes while ensuring system integrity
  * **Library:** provides a range of system-oriented commands (i.e. system calls), which appear to application programs as normal functions through the C standard library

## 1.2 Implementation Strategies {#12_implementation_strategies}

  1. **Microkernels:** only the most elementary functions are implemented directly in a central kernel. All other functions are delegated to autonomous processes that communicate with the central kernel via clearly defined communication interfaces. Theoretically elegant but requires additional CPU time to support complex communication
  2. **Monolithic Kernels:** entire code of the kernel, including all its subsystems such as memory management, filesystems or device drivers, is packed into a single file. Each function has access to all other parts of the kernel

Linux kernel is monolithic kernel but the concept of modules, which allow code to be inserted or removed while the system is up-and-running support mitigates some disadvantages of monolithic kernels.

## 1.3 Elements of the Kernel {#13_elements_of_the_kernel}

<div class="wp-block-image">
  <figure class="aligncenter size-large"><a href="https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image.png?ssl=1"><img loading="lazy" width="720" height="291" src="https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image.png?resize=720%2C291&#038;ssl=1" alt="" class="wp-image-1761" srcset="https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image.png?w=743&ssl=1 743w, https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image.png?resize=300%2C121&ssl=1 300w, https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image.png?resize=720%2C291&ssl=1 720w, https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image.png?resize=580%2C234&ssl=1 580w, https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image.png?resize=320%2C129&ssl=1 320w" sizes="(max-width: 720px) 100vw, 720px" data-recalc-dims="1" /></a><figcaption>High-level overview of the Linux kernel structure</figcaption></figure>
</div>

### 1.3.1 Processes, Task Switch and Scheduling {#131_processes_task_switch_and_scheduling}

Programs running under UNIX are referred to as **processes**. Each process is assigned an address space in the **virtual memory**. Address spaces of different processes are totally independent so that processes has the impression of being the only process in the system. Kernel switches allow processes to have the impression of simultaneous processing. Two problem areas are:

  * **Task Switching:** process state has to be saved and restored between switches
  * **Scheduling:** decision of which process runs for how long

### 1.3.2 UNIX Processes {#132_unix_processes}

<div class="wp-block-jetpack-markdown">
  <p>
    Linux employs a hierarchical scheme in which each process depends on a parent process. The kernel starts the <code>init</code> program as the first process. <code>pstree</code> can show the process tree.
  </p>
</div>

<div class="wp-block-image">
  <figure class="aligncenter size-large is-resized"><a href="https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-1.png?ssl=1"><img loading="lazy" src="https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-2.png?resize=363%2C570&#038;ssl=1" alt="" class="wp-image-1764" width="363" height="570" srcset="https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-2.png?w=484&ssl=1 484w, https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-2.png?resize=191%2C300&ssl=1 191w, https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-2.png?resize=320%2C502&ssl=1 320w" sizes="(max-width: 363px) 100vw, 363px" data-recalc-dims="1" /></a><figcaption>Example of process tree</figcaption></figure>
</div>

New process are generated through two mechanisms:

<div class="wp-block-jetpack-markdown">
  <ol>
    <li>
      <code>fork</code>: generates an exact copy of the current process that differs from the parent process only in its PID. After execution of the syscall, there are two processes in the system both performing the same actions. The memory contents of the initial process are duplicated at least in the view of the program. <code>Copy on write</code> allows it to make the operation much more efficient by deferring the copy operations until either the parent or child writes to a page.
    </li>
    <li>
      <code>exec</code>: loads a new program into the existing content and then executes it. The memory pages reserved by the old program are flushed and their contents are replaced with the new data. The new program then starts executing.
    </li>
  </ol>
</div>

**Threads**

<div class="wp-block-jetpack-markdown">
  <p>
    Traditional UNIX process are <strong>heavy-weight processes</strong>. A thread is a <strong>light-weight process</strong>. A process may consist of several threads that all share the same data and resources but take different paths through the program (e.g. in Java process is the executing program and threads are routines inside the program). No communication effort is needed between the threads and the main program as they share the same address space and data received automatically reside in the main program. Only issue is to prevent threads from accessing identical memory locations. Linux provides the <code>clone</code> method to generate threads. This works similarly to <code>fork</code> but enables a precise check to be made of which resources are shared with the parent process and which are generated independently for the thread.
  </p>
</div>

**Namespaces**

<div class="wp-block-jetpack-markdown">
  <p>
    Traditionally, Linux use numerous global quantities such as PID. With namespaces, formerly global resources are grouped differently. Every namespace can contain a specific set of PIDs or can provide different views of the filesystem. This is similar to full virtualization such as KVM but only a single kernel needs to run on the machine and manages all the containers.
  </p>
</div>

### 1.3.3 Address Spaces and Privilege Levels {#133_address_spaces_and_privilege_levels}

<div class="wp-block-image">
  <figure class="aligncenter size-large"><img loading="lazy" width="305" height="292" src="https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-4.png?resize=305%2C292&#038;ssl=1" alt="" class="wp-image-1768" srcset="https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-4.png?w=305&ssl=1 305w, https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-4.png?resize=300%2C287&ssl=1 300w" sizes="(max-width: 305px) 100vw, 305px" data-recalc-dims="1" /><figcaption>Division of virtual address space</figcaption></figure>
</div>

<div class="wp-block-jetpack-markdown">
  <p>
    Linux divides its virtual address space into two parts known as <strong>kernel space</strong> and <strong>userspace</strong>. Every user process in the system ahs its own virtual address range that extends from 0 to <code>TASK_SIZE</code>. The area above is reserved exclusively for the kernel. <code>TASK_SIZE</code> is an architecture-specific constant that divides the address space in a given ratio.
  </p>
</div>

**Privilege Levels**

<div class="wp-block-jetpack-markdown">
  <p>
    All modern CPUs offer several privilege levels in which processes can reside. There are various prohibitions in each level including execution of certain assembly language instructions or access to specific parts of virtual address space.
  </p>
</div><figure class="wp-block-image size-large">

[<img loading="lazy" width="720" height="287" src="https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-5.png?resize=720%2C287&#038;ssl=1" alt="" class="wp-image-1770" srcset="https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-5.png?w=810&ssl=1 810w, https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-5.png?resize=300%2C120&ssl=1 300w, https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-5.png?resize=768%2C306&ssl=1 768w, https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-5.png?resize=720%2C287&ssl=1 720w, https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-5.png?resize=580%2C231&ssl=1 580w, https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-5.png?resize=320%2C128&ssl=1 320w" sizes="(max-width: 720px) 100vw, 720px" data-recalc-dims="1" />][1]<figcaption>Privilege levels</figcaption></figure> 

The switch from user to kernel mode is made by means of system calls. These are executed differently depending on the system. If a normal process wants to carry out any kind of action affecting the entire system (e.g. manipulating I/O devices), it can do so by issuing a request to the kernel with the help of a system call. The kernel first checks whether the process is permitted to perform the desired action and then performs the action on its behalf. A return is then made to user mode.

<div class="wp-block-image">
  <figure class="aligncenter size-large"><a href="https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-9.png?ssl=1"><img loading="lazy" width="720" height="212" src="https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-9.png?resize=720%2C212&#038;ssl=1" alt="" class="wp-image-1774" srcset="https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-9.png?w=773&ssl=1 773w, https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-9.png?resize=300%2C88&ssl=1 300w, https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-9.png?resize=768%2C227&ssl=1 768w, https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-9.png?resize=720%2C212&ssl=1 720w, https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-9.png?resize=580%2C171&ssl=1 580w, https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-9.png?resize=320%2C94&ssl=1 320w" sizes="(max-width: 720px) 100vw, 720px" data-recalc-dims="1" /></a><figcaption>Address space limitations</figcaption></figure>
</div>

The kernel can also be activated by asynchronous hardware interrupts and is then said to run in **interrupt context.** The main difference to running in process context is that the userspace portion of the virtual address space must not be accessed. When operating in interrupt context, the kernel must be more cautious than normal, for instance, it must not go to sleep.

Besides normal processes there are also **kernel threads** running on the system .Kernel threads are also not associated with any particular userspace process. Kernel treads behave much like userland applications though they may go to sleep and are tracked by the scheduler. The kernel uses them for various purposes such as data synchronization of RAM and block devices or helping scheduler distribute processes among CPUs.

<div class="wp-block-jetpack-markdown">
  <p>
    Kernel threads can be identified by <code>ps</code> because their names are placed inside brackets.
  </p>
</div>

<div class="wp-block-image">
  <figure class="aligncenter size-large"><a href="https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-7.png?ssl=1"><img loading="lazy" width="490" height="117" src="https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-7.png?resize=490%2C117&#038;ssl=1" alt="" class="wp-image-1772" srcset="https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-7.png?w=490&ssl=1 490w, https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-7.png?resize=300%2C72&ssl=1 300w, https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-7.png?resize=320%2C76&ssl=1 320w" sizes="(max-width: 490px) 100vw, 490px" data-recalc-dims="1" /></a><figcaption>Kernel threads</figcaption></figure>
</div>

**Virtual and Physical Address Spaces**

In most cases, a single virtual address space is bigger than the physical RAM available to the system. The kernel uses page tables to allocate virtual addresses to physical addresses. Virtual address space and physical memory are divided into pages of the same size. A page table tracks the mapping between them. Physical pages are often called **page frames.** The term **page** usually refers to virtual memory.

### 1.3.4 Page Tables {#134_page_tables}

**Note:** TLB is a caching mechanism to speed up address translation (by caching accesses to page tables). It is flushed during context switching.

Data structures known as page tables are used to map virtual address space to physical address space. Since each process needs its own page table, the primitive approach of a simple array is impractical/ To reduce the size of page tables and to allow unneeded areas to be ignored, the architectures split each virtual address into multiple parts. Most architectures offer a three-level page table.

<div class="wp-block-image">
  <figure class="aligncenter size-large"><a href="https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-11.png?ssl=1"><img loading="lazy" width="593" height="237" src="https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-11.png?resize=593%2C237&#038;ssl=1" alt="" class="wp-image-1777" srcset="https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-11.png?w=593&ssl=1 593w, https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-11.png?resize=300%2C120&ssl=1 300w, https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-11.png?resize=580%2C232&ssl=1 580w, https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-11.png?resize=320%2C128&ssl=1 320w" sizes="(max-width: 593px) 100vw, 593px" data-recalc-dims="1" /></a><figcaption>Three-level page table</figcaption></figure>
</div>

First part of the virtual address is referred to as page global directory (PGD). Is is used as an index in an array that exists exactly once for each process. Its entries are pointers to the start of further arrays called page middle directories (PMD). The extends to the page table entry (PTE). Mapping between virtual pages and page frames is achieved here. The last part is known as an offset. It is used to specify a byte position within the page. A particular feature of page tables is that no page middle tables or page tables need to be created for areas of virtual address space that are not needed. This saves a great deal of RAM as compared to single-array method.

Downside of this method is that each time memory is accessed, it is necessary to run through the entire chain to obtain the physical address from the virtual address. CPU speeds this up by

  1. **Memory Management Unit**
  2. **Translation Lookaside buffer:** fast CPU cache that holds addresses that occur most frequently in address translation

**Interaction with the CPU**

IA-32 architecture uses a two-level-only method to map virtual addresses to physical addresses. However, 64-bit systems require three-level or four-level method. The architecture-independent part of the kernel always assumes a four-level page table. The architecture-dependent code must therefore emulate the missing levels by dummy page tables.

**Memory Mappings**

Memory mappings are an important means of abstraction. Mapping is the method by which data from an arbitrary source are transferred into the virtual address space of a process. The address space areas in which mapping takes place can be processed using normal methods in the same way as regular memory. However, any changes made are transferred automatically to the orginal data source. For exaple, the contents of a file or Io peripheral can be mapped into memory.

### 1.3.5 Allocation of Physical Memory {#135_allocation_of_physical_memory}

Kernel must keep track of which page have already been allocated and which are still free to prevent conflicts. Since memory allocation and release are very frequent tasks, the kernel must also ensure that they are completed as quickly as possible. the kernel can allocate only whole page frames. Dividing memory into smaller portions is delegated to the standard library in userspace.

**The Buddy System**

<div class="wp-block-image">
  <figure class="aligncenter size-large"><a href="https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-13.png?ssl=1"><img loading="lazy" width="609" height="462" src="https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-13.png?resize=609%2C462&#038;ssl=1" alt="" class="wp-image-1779" srcset="https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-13.png?w=609&ssl=1 609w, https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-13.png?resize=300%2C228&ssl=1 300w, https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-13.png?resize=580%2C440&ssl=1 580w, https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-13.png?resize=320%2C243&ssl=1 320w" sizes="(max-width: 609px) 100vw, 609px" data-recalc-dims="1" /></a><figcaption>The buddy system</figcaption></figure>
</div>

Numerous allocation requests in the kernel must be fulfilled by a continuous range of pages. To quickly detect where in memory such ranges are still available, the kernel employs the buddy system. Free memory blocks in the system are always grouped as two buddies. The buddies can be allocated independently of each other. If, however, both remain unused at the same time, the kernel merges them into a larger pair that serves as a buddy on the next level. All buddies of the same size (1,2,4,8,16,&#8230; pages) are managed by the kernel in a special list.

If the next request requires only 2 contiguous page frames, the block consisting of 8 blocks is split into 2 buddies with 4 each. One of the blocks is put back into the buddy lists while the other is again split into 2 buddies and one is returned while the other is passed to the application.

When systems run for longer periods, **fragmentation** occurs where there are no larger contiguous blocks of page frames. Single reserved pages that sit in the middle of an otherwise large continuous free range can eliminate coalescing of this range very effectively.

**The Slab Cache**

Often the kernel itself needs memory blocks much smaller than a whole page frame. Because it cannot use the functions of the standard library, it must define its own, additional layer of memory management that builds on the buddy system and divides the pages supplied by the buddy system into smaller portions. The method used not only performs allocation but also implements a generic cache for frequently used small objects known as slab cache:

<div class="wp-block-jetpack-markdown">
  <ol>
    <li>
      For frequently used objects, the kernel defined its own cache that contains only instances of the desired type. Each time one of the objects is required, it can be quickly removed from the cache and returned after use. The slab cache automatically takes care of interaction with the buddy system and requests new page frames when the existing caches are full
    </li>
    <li>
      For general allocation of smaller memory blocks, the kernel defined a set of slab caches for various object sizes that it can access using the same functions with which we are familiar from userspace programing, prefix k indicates that these functions are associated with the kernel: <code>kmalloc</code> and <code>kfree</code>
    </li>
  </ol>
</div>

There are some scalability problems with the slab allocator on really large supercomputers and on tiny embedded systems (overhead). The kernel comes with two drop-in replacements for the slab allocator that provides better performance in these sue cases but offer the same interface to the rest of the kernel such that it need not be concerned with which low-level allocator is actually compiled in.

**Swapping and Page Reclaim**

**Swapping** enables available RAM to be enlarged virtually by using disk space as extended memory. Infrequently used pages can be written to hard disk when the kernel requires more RAM. Once the data are actually needed, the kernel swaps them back into memory. The concept of **page faults** is used to make this operation transparent to applications. Swapped-out pages are identified by a special entry in the page table. When a process attempts to access a page of this kind, the CPU initiates a page fault that is intercepted by the kernel. The kernel then has the opportunity to swap the data on disk in RAM. The use process then resumes.

**Page reclaim** is used to synchronize modified mappings with underlying block devices. Once data have been flushed, the page frame can be used by the kernel for other purposes.

### 1.3.6 Timing {#136_timing}

<div class="wp-block-jetpack-markdown">
  <p>
    The kernel must be capable of measuring time and time differences at various points, when scheduling processes, for example. <strong>Jiffies</strong> are one possible time base. A global variable named <code>jiffies_64</code> and its 32-bit counterpart <code>jiffies</code> are incremented periodic ally at constant time intervals. The various timer mechanisms of the underlying architectures are used to perform these updates (usually in the form of timer interrupts).
  </p>
  
  <p>
    Usually, <code>jiffies</code> is incremented between 100 to 1kHz. It is possible to make the periodic tick <strong>dynamic</strong>.When there is little to do and no need for frequent periodic action, it does not make sense to periodically generate timer interrupts that prevent the processor from powering down into deep sleep states.
  </p>
</div>

### 1.3.7 System Calls {#137_system_calls}

**System calls** are the classical method of enabling user processes to interact with the kernel. the POSIX standard defines a number of system calls and their effect as implemented on all POSIX-compliant systems. The categories are:

  * **Process Management:** creating new tasks, querying information, debugging
  * **Signals:** sending signals, timers, handling mechanisms
  * **Files:** creating, opening and closing files, reading from and writing to files, quering information and status
  * **Directories and Filesystem:** creating, deleting and renaming directories, querying information, links, changing directories
  * **Protection Mechanisms:** Reading and changing UIDs / GIDs and namespace handling
  * **Timer Function:** Timer functions and statistical information

### 1.3.8 Device Drivers, Block and Character Devices {#138_device_drivers_block_and_character_devices}

<div class="wp-block-jetpack-markdown">
  <p>
    The role of device drivers is to communicate with I/O devices attached to the system. For example, hard drives, floppies etc. In accordance with the classical UNIX maxim that every is a file, access is performed using device files that usually reside in the <code>/dev</code> directory and can be processed by programs in the same way as regular files. Peripheral devices belong to one of two groups:
  </p>
</div>

  1. **Character Devices:** deliver a continuous stream of data that applications read sequentially.
  2. **Block Devices:** allow applications to address their data randomly and to freely select the position at which they want to read data.

### 1.3.9 Networks {#139_networks}

Network cards are also controlled by device drivers but assume a special status in the kernel because they cannot be addressed using device files. This is because data are packed into various protocol layers during network communications. when data are received, the layers must be disassembled and analyzed by the kernel before the payload data are passed to the application. When data are sent, the kernel must first pack the data into the various protocol layers prior to dispatch. To support work with network connections via the file interface, Linux uses **sockets** from the BSD world.

### 1.3.10 Filesystems {#1310_filesystems}

Linux systems are made up of many files stored on block devices. Hierarchical filesystems are used, allowing stored data to be organized into directory structures and also have the job of linking other meta-information with the actual data. Many different filesystems approaches are supported by Linux, e.g. Ext2, Ext3, ReiserFS, XFS and VFAT etc. Ext2 is based on inodes, that is , it makes a separate management structure known as an inode available on disk for each file. The inode contains not only all meta-information but also pointers to the associated data blocks. Hierarchical structures are set up by representing directories as regular files whose data section includes pointers to the inodes of all files contained in the directory.

The kernel must provide an additional software layer to abstract the special features of the various low-level filesystems from the application layer (and also from the kernel itself). This layer is referred to as the VFS (virtual filesystem).

<div class="wp-block-image">
  <figure class="aligncenter size-large"><a href="https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-15.png?ssl=1"><img loading="lazy" width="462" height="251" src="https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-15.png?resize=462%2C251&#038;ssl=1" alt="" class="wp-image-1783" srcset="https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-15.png?w=462&ssl=1 462w, https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-15.png?resize=300%2C163&ssl=1 300w, https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-15.png?resize=320%2C174&ssl=1 320w" sizes="(max-width: 462px) 100vw, 462px" data-recalc-dims="1" /></a><figcaption>VFS Layer</figcaption></figure>
</div>

### 1.3.11 Modules and Hotplugging {#1311_modules_and_hotplugging}

Modules are used to dynamically add functionality to the kernel at run time &#8211; device drivers, filesystems, network protocols etc. Modules are simply normal programs that execute in the kernel space rather than in userspace. They must also provide certain sections that are executed when the module is initialized (and terminated) in order to register and de-register the module functions with the kernel. Otherwise, module code has the same rights as normal kernel code and can access all the same functions and data as code that is permanently compiled into the kernel. It is obvious why kernels are essential for hotplugging.

A long-standing issue in the kernel community revolves around the support of binary-only modules, that is, modules for which no source code is available. There are good reasons why this is stupid. It is currently possible to load binary-only modules into the kernel, although numerous restrictions apply for them. They also may not access any functions that are explicitly only made available to GPL-licensed code. Loading a binary-only module **taints** the kernel. If something bad happens to a tainted kernel, developers will be very unsupportive in solving the issue that led to the crash.

### 1.3.12 Caching {#1312_caching}

The kernel uses **caches** to improve system performance. Because the kernel implements access to block devices by means of page memory mappings, caches are also organized into pages, thus the name **page cache.** The far less important **buffer cache** is used to cache data that are not organized into pages. On traditional UNIX systems, the buffer cache serves as the main system cache, and the same approach was used by Linux a long, long time ago. By now, the buffer cache has mostly been superseded by the page cache.

### 1.3.13 List Handling {#1313_list_handling}

<div class="wp-block-jetpack-markdown">
  <p>
    A recurring task in C programs is the handling of doubly linked lists. The kernel too is required to handle such lists. Standard lists as provided by the kernel can be used to link data structures of any type with each other (explicitly not type-safe). The data structures to be listed must contain an element of the <code>list_head</code> type which accomodate for the forward and back pointers.
  </p>
</div>

<div class="wp-block-image">
  <figure class="aligncenter size-large"><a href="https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-17.png?ssl=1"><img loading="lazy" width="363" height="95" src="https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-17.png?resize=363%2C95&#038;ssl=1" alt="" class="wp-image-1785" srcset="https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-17.png?w=363&ssl=1 363w, https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-17.png?resize=300%2C79&ssl=1 300w, https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-17.png?resize=320%2C84&ssl=1 320w" sizes="(max-width: 363px) 100vw, 363px" data-recalc-dims="1" /></a><figcaption>list.h</figcaption></figure>
</div>

<div class="wp-block-jetpack-markdown">
  <p>
    The starting point for linked lists is again an instance of <code>list_head</code> (not the custom data structure&#8230;, a <code>list_head</code> containing a <code>list_head</code>) usually declared and initialized by the <code>LIST_HEAD(list_name)</code> macro. In this way, the kernel produces a cyclic list which permits access to the first and last element of a list in $\mathbb{O}(1)$.
  </p>
</div>

<div class="wp-block-image">
  <figure class="aligncenter size-large"><a href="https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-18.png?ssl=1"><img loading="lazy" width="500" height="158" src="https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-18.png?resize=500%2C158&#038;ssl=1" alt="" class="wp-image-1787" srcset="https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-18.png?w=500&ssl=1 500w, https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-18.png?resize=300%2C95&ssl=1 300w, https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-18.png?resize=320%2C101&ssl=1 320w" sizes="(max-width: 500px) 100vw, 500px" data-recalc-dims="1" /></a><figcaption>Doubly linked list</figcaption></figure>
</div>

<div class="wp-block-jetpack-markdown">
  <p>
    There are several standard functions for handling and processing lists (arguments are of data type <code>struct list_head</code>:
  </p>
  
  <ul>
    <li>
      <code>list_add(new, head)</code>: inserts <code>new</code> right after <code>head</code>
    </li>
    <li>
      <code>list_Add_tail(new, head)</code>: inserts <code>new</code> right before the element specified by <code>head</code>
    </li>
    <li>
      <code>list_del(entry)</code>: deletes an entry from a list
    </li>
    <li>
      <code>list_empty(head)</code>: checks if a list is empty
    </li>
    <li>
      <code>list_splice(list, head)</code>: combines two lists by inserting the list in <code>list</code> after the <code>head</code> element of an existing list
    </li>
    <li>
      <code>list_entry(ptr, type, member)</code> must be used to find a list element. <code>ptr</code> is pointer to <code>list_head</code> instance of the data structure, <code>type</code> is its type, <code>member</code> is element name used for the list element (e.g. <code>struct tas_struct - list_entry(ptr, struct task_struct, run_list</code>)
    </li>
    <li>
      <code>list_for_each(pos, head)</code>: iterate through all elements of a list. <code>pos</code> indicates current position in the list.
    </li>
  </ul>
</div>

### 1.3.14 Object Management and Reference Counting {#1314_object_management_and_reference_counting}

 [1]: https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/12/image-5.png?ssl=1