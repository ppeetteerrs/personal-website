---
title: Linux Kernel – The First Second (Part 1)
author: ppeetteerrsx
type: post
date: 2020-11-13T07:46:58+00:00
excerpt: "An overview of what happens from the computer's power up to the linux kernel being loaded."
url: /programming/linux-kernel-the-first-second-part-1/
views:
  - 8
categories:
  - Computer Engineering
  - Electrical Engineering
  - Programming
tags:
  - bootloader
  - computer engineering
  - linux
series:
  - Linux Kernel
draft: true
---

# 1 Overview

Regardless of the computer or operating system, standard desktop PCs and laptops all power on and start up using one of two ways: the traditional BIOS-MBR method and the newer UEFI-GPT method. We will be summarizing the boot process but will not go in-depth on the BIOS and MBR (cuz they are outdated).

# 2 BIOS

The BIOS is the lowest level of software that interfaces with the hardware. When the PC is first powered up, it loads the BIOS from a fixed physical memory address (configurable), usually in an EEPROM / Flash memory. It cannot be stored in hard disks because it manages those devices.

## 2.1 POST

The BIOS contains code that performs the POST (Power-On Self Test). It basically detects and sets up all the device peripherals, identifying and mapping access to connected devices and hard disks. The main responsibilities of the BIOS during POST are listed below:

1. Verify CPU registers.
2. Verify the integrity of the BIOS code itself.
3. Verify some basic components like DMA, timer, interrupt controller.
4. Find, size, and verify system main memory.
5. Initialize BIOS
6. Identify, organize, and select which devices are available for booting.

## 2.2 BIOS Boot Handoff

This is the point at which you'll normally be presented with an option to quickly hit a key to enter the BIOS setup. After running the POST, the BIOS will have a list of available devices and it will select the **first boot device (hard drive or USB stick)** and return the control to the CPU.

# 3 Master Boot Record (MBR)

<div class="wp-block-image">
  <figure class="aligncenter size-large"><img loading="lazy" width="720" height="293" src="https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/11/2.png?resize=720%2C293&#038;ssl=1" alt="" class="wp-image-1574" srcset="https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/11/2.png?w=1024&ssl=1 1024w, https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/11/2.png?resize=300%2C122&ssl=1 300w, https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/11/2.png?resize=768%2C312&ssl=1 768w, https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/11/2.png?resize=720%2C293&ssl=1 720w, https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/11/2.png?resize=580%2C236&ssl=1 580w, https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/11/2.png?resize=320%2C130&ssl=1 320w" sizes="(max-width: 720px) 100vw, 720px" data-recalc-dims="1" /><figcaption>Master Boot Record</figcaption></figure>
</div>

Once the boot device has been identified, the BIOS passes control back to the CPU. The CPU will then read the **first 512 bytes of the boot device** to obtain the MBR. The MBR consists of:

1. Primary boot loader code / Stage 1 Boot Loader (446 Bytes)
2. Partition Table (64 Bytes)
3. Magic Number (2 Bytes)

## 3.1 Stage 1 Boot Loader

Due to the limited size of the stage 1 boot loader, its primary purpose is to look up for the actual bootloader. It contains both execution code and error message texts. On Windows, the stage 1 bootloader searches the partition table of the MBR for a partition marked as &#8220;active&#8221; (i.e. &#8220;bootable&#8221; in MBR language). This indicates that the start of the partition contains the next portion of the boot code in its starting sectors (or &#8220;bootsector&#8221;). On a correctly-created MBR disk, only **one partition can be marked as active at a time**.

## 3.2 Partition Table

The partition table is an index of up to four partitions that exist on the same disk. It includes information such as start and end of partition and type of partition. Each partition needs 16 Bytes to represent.

## 3.3 Magic Number

The final two bytes of the 512-byte MBR are called the boot signature and are used by the BIOS to determine if the selected boot drive is actually bootable or not. It should always be 0x55 0xAA if MBR is not corrupted.

# 4 Partition Boot Sector

<div class="wp-block-image">
  <figure class="aligncenter size-large"><img loading="lazy" width="720" height="280" src="https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/11/1.png?resize=720%2C280&#038;ssl=1" alt="" class="wp-image-1573" srcset="https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/11/1.png?w=914&ssl=1 914w, https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/11/1.png?resize=300%2C117&ssl=1 300w, https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/11/1.png?resize=768%2C298&ssl=1 768w, https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/11/1.png?resize=720%2C280&ssl=1 720w, https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/11/1.png?resize=580%2C225&ssl=1 580w, https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/11/1.png?resize=320%2C124&ssl=1 320w" sizes="(max-width: 720px) 100vw, 720px" data-recalc-dims="1" /><figcaption>Partition Boot Sector</figcaption></figure>
</div>

So far, we have understood that the BIOS is loaded from ROM. The BIOS performs POST and then looks for the first boot device (physical) and loads the MBR from the first 512 bytes. The stage 1 boot loader code in the MBR looks for the first active partition. The MBR then loads a sequence of bytes from the start of the active partition, the partition boot sector. The structure of the partition boot sector usually looks like this:

- A single jump instruction to the beginning of the bootstrap code
- Filesystem header
- Bootstrap code segment (called stage 1.5 in GRUB2)
- An end-of-sector marker similar to 0x55xAA magic number in MBR

Basically, this stage 1.5 boot loader is file-system aware (since its now stored on a partition) and can be used to load the second stage bootloader from the filesystem (second stage bootloader is an actual file) depending on the filesystem used. Also note that in GRUB2, it is possible to skip stage 1.5 and directly load stage 2 boot loader after the MBR if the hardware does not require stage 1.5. If that's the case, it seems like the Stage 2 Boot loader is located 30KB away from the MBR and before the first partition.

# 5 Stage 2 Boot Loader

<div class="wp-block-jetpack-markdown">
  <p>
    Almost all Linux system nowadays use the Grand Unified Boot Loader v2 (GRUB2). It exists in the form of a file usually cored <code>core.img</code> withe a config file normally at <code>/boot/grub.grub.cfg</code>. GRUB2 has knowledge about the Linux file system. It basically displays the available kernel / OS to the user. Once the user selects a kernel, the kernel image is then loaded into memory and control is passed to the kernel. The steps involved are:
  </p>
</div>

- **Initiate filesystem access  
  ** Load and run basic filesystem drivers
- **Load and read configuration file(s)  
  ** Read the list of operating systems from the disk and the the event that there are multiple operating systems specified, prepare it for display.
- **Load and run supporting modules  
  ** Loads any supporting modules or helper programs from the disk.
- **Display the boot menu  
  ** At this point, with all the relevant configuration in hand, the bootloader can display what is commonly known as the boot menu on the screen.
- **Load the OS kernel  
  ** Once the user’s selection has been recorded, the bootloader will load the kernel image from the path specified in the configuration file into the memory. It then instructs the CPU to JMP to a certain location within the newly-loaded kernel and begin executing from there.

# 6 Kernel Decompression

<div class="wp-block-jetpack-markdown">
  <p>
    The kernel is a compressed image known as <code>initramfs</code> stored in <code>/boot</code> along with an initial RAM disk image and device maps of the hard drives. Once the kernel is loaded into the main memory, it begins decompression and the expanded image overwrites the initial image. Once the kernel has extracted itself, it loads <code>systemd</code> and turns control over to it.
  </p>
</div>

# 7 Systemd / Init

<div class="wp-block-jetpack-markdown">
  <p>
    Once loaded, the kernel finds the <code>init</code> function in <code>/sbin/init</code> and executes it. The first thing <code>init</code> does is reading the initialization file <code>/etc/inittab</code>. This instructs <code>init</code> to read an initial config script for the environment. Do note that <code>init</code> is to be replaced by <code>systemd</code> in the future.
  </p>
</div>
