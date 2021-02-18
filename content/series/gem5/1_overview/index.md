---
title: Setup and Installation (Part 1)
date: 2020-09-28
summary: We start by installing the relevant tools and libraries.
categories:
  - Computer Architecture
  - Computer Engineering
tags:
  - computer architecture
  - gem5
  - huawei
  - riscv
type: book
weight: 10
---

# 1 Setup
## 1.1 Ubuntu runtime
Since gem5 only runs on Linux, you will need a Linux machine to get started. Personally, I use Ubuntu and has not faced any issues so far. I would hence recommend against using other Linux distros. There are a few ways to obtain a working Ubuntu instance:
1. **WSL2 (Recommended)**: Install Ubuntu on your windows PC / laptop. You would not need a GUI for gem5 in most cases (aside from inspecting traces and logs). Also note that you can install multiple Ubuntu(s) on your machine (different versions) to avoid dependency conflicts.
2. **Cloud / company server**: Might be troublesome to setup depending on provider. Might run into proxy issues.
3. **Ubuntu on an external drive**: It is easy to install Ubuntu on an external SSD / NVMe stick. Note that you should not format your NVMe directly when you want to remove Ubuntu, it will give you some bootloader error next time you boot Windows. Search online for the correct removal steps.
4. **Ubuntu on external USB / partition your hard disk (DONT)**

## 1.2 IDE
The easiest way to connect into your Ubuntu machine is via **VSCode** remote editing. If its a WSL instace, just install the WSL plugin. If its a remote machine, use SSH remote editing. Use ssh keys (by adding your public key to ~/.ssh/authorized_keys) on the remote machine to avoid keying in the password everytime.

**IMPORTANT:** Disable "Format on Save" for your gem5 workspace. Firstly, when you intend to contribute to gem5, they have their own set of styling rules. Secondly, GDB debugging information are compiled when you **build** gem5 (i.e. when you run `... scons build/... -j...`). If you format your files after the build, good luck with your GDB backtrace :wink:.

# 1.3 Folder Structure
I recommend the following folder structure for gem5 / RISCV development. All the commands provided will assume your working directory to be set up as follows.
```txt
Working directory (e.g. ~/RISCV)
> gem5: gem5 repo
> lib: tools and libraries
  > toolchain: RISC-V GNU Toolchain
  > tools: RISC-V Tools
  > linux: Linux repo
  > busybox: Busybox disk image
```

# 2 Installation
The installation steps outlined here are used and tested by myself on Ubuntu 18.04. Personally, I use conda for simple Python scripting (text parsing / GDB control). Following these steps will allow you to install gem5 correctly when conda is installed.

## 2.1 Shell Setup
Personally, I use either zsh or bash (personal vs work). Both can be easily configured using the `~/.zshrv` or `~/.bashrc` file.

**`~/.(bash or zsh)rc`**
```bash
# add these lines
export SHELL_RC="<~/.bashrc or ~/.zshrc>"
export RISCV="<your RISC-V working directory>"

export RISCV_G5=$RISCV/gem5
export RISCV_LIB=$RISCV/lib
export RISCV_BUILD=$RISCV/build

export PATH=$RISCV_BUILD/bin:$PATH
alias rconfig="./configure --prefix=$RISCV_BUILD"

alias build_g5="cd $G5_HOME && export PATH=/usr/bin:$PATH && /usr/bin/env python3 $(which scons) build/RISCV/gem5.debug -j$(nproc) && source $SHELL_RC"
```

## 2.1 gem5

**`~/.(bash or zsh)rc`**
```sh
sudo apt-get update && sudo apt-get upgrade -y
sudo apt install -y build-essential git m4 scons zlib1g zlib1g-dev libprotobuf-dev protobuf-compiler libprotoc-dev libgoogle-perftools-dev python3-dev libpng-dev python3 python-six
cd $RISCV && git clone https://github.com/gem5/gem5.git gem5
cd $G5_HOME && export PATH=/usr/bin:$PATH && /usr/bin/env python3 $(which scons) build/RISCV/gem5.debug -j$(nproc) && source $SHELL_RC
```
# 2.2 Installing RISCV GNU Toolchain
```sh
sudo apt-get install -y autoconf automake autotools-dev curl python3 libmpc-dev libmpfr-dev libgmp-dev gawk build-essential bison flex texinfo gperf libtool patchutils bc zlib1g-dev libexpat-dev
cd $RISCV_LIB && git clone https://github.com/riscv/riscv-gnu-toolchain toolchain
cd toolchain && ./configure --prefix=$RISCV
make linux -j$(nproc)
```

# 2.2 Installing RISCV PK
```sh
cd $RISCV_LIB && git clone https://github.com/riscv/riscv-pk.git pk
cd pk && mkdir build && cd build
../configure --prefix=$RISCV --host=riscv64-unknown-linux-gnu
make && make install
```

# 2.2 Installing QEMU
```sh
sudo apt-get install -y git libglib2.0-dev libfdt-dev libpixman-1-dev zlib1g-dev ninja-build
cd $RISCV_LIB && git clone https://github.com/qemu/qemu.git qemu
cd qemu && mkdir build && cd build
../configure --target-list=riscv64-softmmu --prefix=$RISCV
make -j$(nproc) && make install
```

# Building Linux Kernel
```sh
cd $RISCV_LIB && git clone https://github.com/torvalds/linux.git linux
cd linux && git checkout v5.4
make ARCH=riscv CROSS_COMPILE=riscv64-unknown-linux-gnu- defconfig
make ARCH=riscv CROSS_COMPILE=riscv64-unknown-linux-gnu- -j $(nproc)
```

## 1.2 Helpful Resources

<div class="wp-block-file">
  <a href="https://ppeetteerrsx.com/wp-content/uploads/2020/10/roelke-risc5-carrv2017.pdf">(Paper) RISC5: RISCV Implementation on gem5</a><a href="https://ppeetteerrsx.com/wp-content/uploads/2020/10/roelke-risc5-carrv2017.pdf" class="wp-block-file__button" download>Download</a>
</div>

<div class="wp-block-file">
  <a href="https://ppeetteerrsx.com/wp-content/uploads/2020/10/gem5_tutorial.pdf"> (Slides) Introduction to gem5 [some content might be a bit dated but overall its clearly than official tutorial]</a><a href="https://ppeetteerrsx.com/wp-content/uploads/2020/10/gem5_tutorial.pdf" class="wp-block-file__button" download>Download</a>
</div>

<div class="wp-block-file">
  <a href="https://ppeetteerrsx.com/wp-content/uploads/2020/10/riscv-simulation-on-gem5.pdf">(Report) A report on simulating RISCV on gem5</a><a href="https://ppeetteerrsx.com/wp-content/uploads/2020/10/riscv-simulation-on-gem5.pdf" class="wp-block-file__button" download>Download</a>
</div>
