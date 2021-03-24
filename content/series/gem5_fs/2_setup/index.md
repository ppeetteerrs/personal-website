---
title: Setup and Installation (Part 2)
date: 2021-03-24
summary: Some background knowledge.
categories:
  - Computer Architecture
  - Computer Engineering
tags:
  - computer architecture
  - gem5
  - huawei
  - riscv
  - linux
type: book
weight: 20
---

# 1 Overview
There are a few components to this project:
1. **gem5 Library**: simulator for RISC-V system (aka. hardware)
2. **RISC-V GNU Toolchain**: cross-compiling RISC-V binaries on host machine
3. **Linux**
   - **Berkeley Bootloader (bbl)**: bootloader (machine mode)
   - **Linux Kernel:** RISC-V linux kernel (supervisor mode)
   - **Busybox (UCanLinux) Disk Image**: file system and user scripts (user mode)

# 2 Host Machine
In order to run gem5, a Linux (Ubuntu 20.04 is most recommended) machine is a must. There are a few ways to get a working Linux environment:
1. **WSL2**: install a new Ubuntu 18.04 or 20.04 on your Windows PC / laptop
2. **Dedicated Ubuntu machine**
3. **Dual booting**: install an Ubuntu system on a hard drive and boot from it (aka press F2/8/10/12 before start screen)

*Note: I highly discourage dual booting on a hard drive partition / slow flash drive.*

## 2.1 IDE
VSCode is a nice IDE to use for a few reasons:
1. **Integrated SSH / WSL Remote IDE**
2. **C++ GDB Debugging**: you can look inside the contents of the objects instead of doing stuff like `p /x obj->getAttr()`
3. **Built-in C++ and Python Language Features**

**Please disable Format on Save when using gem5. The consequences are bad :wink:.**

# 2.2 Folder Structure
Personally, I organize my gem5 machine as follows:
```txt
~/Desktop:
> gem5: gem5 repository 
> riscv: RISC-V related
  > bin: RISC-V tool binaries (e.g. GNU-toolchain, QEMU etc.)
  > logs: gem5 simulation logs
  > out: kernel / bootloader / devicetree build outputs
  > src: RISC-V tool repositories
    > linux: linux kernel
    > pk: RISC-v proxy kernel (bbl)
    > qemu: QEMU emulator
    > resources: gem5 resources (optional)
    > toolchain: RISC-V GNU toolchain
    > ucanlinux: UCanLinux repository
> benchmarks: benchmark repositories
```

# 2.3 Shell Setup
`~/.bashrc` environment variables:
```bash
...
export RISCV=$HOME/Desktop/riscv
export PATH=$RISCV/src/pk/build:$RISCV/bin:$PATH
export G5=$HOME/Desktop/gem5
export OUT=$RISCV/out
export SRC=$RISCV/src
```
`$RISCV/bin/bg5` (build gem5 script):
```bash
#! /bin/bash

TYPE="debug"

POSITIONAL=()
while [[ $# -gt 0 ]]
do
key="$1"

case $key in
    -o)
    TYPE="opt"
    shift
    ;;
    -d)
    TYPE="debug"
    shift
    ;;
    *)
    POSITIONAL+=("$1")
    shift
    ;;
esac
done

cd $G5

# Use stock Python in case you installed anaconda
export PATH=/usr/bin:$PATH && scons build/RISCV/gem5.$TYPE -j8
``` 
`$RISCV/bin/rg5` (run gem5 script):
```bash
#! /bin/bash

TYPE="debug"
CPU="AtomicSimpleCPU"
FLAGS=""
START=""

POSITIONAL=()
while [[ $# -gt 0 ]]
do
key="$1"

case $key in
    -o)
    TYPE="opt"
    shift
    ;;
    -d)
    TYPE="debug"
    shift
    ;;
    -A)
    CPU="AtomicSimpleCPU"
    shift
    ;;
    -T)
    CPU="TimingSimpleCPU"
    shift
    ;;
    -M)
    CPU="MinorCPU"
    shift
    ;;
    -O)
    CPU="DerivO3CPU"
    shift
    ;;
    -f)
    FLAGS="--debug-flags=$2"
    shift
    shift
    ;;
    -s)
    START="--debug-start=$2"
    shift
    shift
    ;;
    *)
    POSITIONAL+=("$1")
    shift
    ;;
esac
done

cd $G5

build/RISCV/gem5.$TYPE $FLAGS $START -d $RISCV/logs -re configs/example/riscv/fs_linux.py --kernel=$OUT/bbl --caches --mem-size=128MB --mem-type=DDR4_2400_8x8 --cpu-type=$CPU --disk-image=$OUT/riscv_disk ${POSITIONAL[@]}
``` 

# 3 gem5 Installation
Ubuntu 18.04:
```bash
sudo apt install build-essential git m4 scons zlib1g zlib1g-dev libprotobuf-dev protobuf-compiler libprotoc-dev libgoogle-perftools-dev python-dev python-six python libboost-all-dev pkg-config python3 python3-dev python3-six

git clone https://gem5.googlesource.com/public/gem5 $G5
# If you want to contribute to gem5
cd $G5 && git checkout develop
bg5 -o
```

Ubuntu 20.04:
```bash
sudo apt install -y build-essential git m4 scons zlib1g zlib1g-dev libprotobuf-dev protobuf-compiler libprotoc-dev libgoogle-perftools-dev python3-dev python3-six python-is-python3 libboost-all-dev pkg-config

git clone https://gem5.googlesource.com/public/gem5 $G5
# If you want to contribute to gem5
cd $G5 && git checkout develop
bg5 -o
```

# 4 RISC-V Libraries
## 4.1 RISC-V GNU Toolchain

Common GNU tools:
- **gcc**: C compiler
- **objdump**: dump assembly code from binary
- **objcopy**: copy & edit ELF binary
- **readelf**: read ELF binary

If you are restricted by some firewall / proxy, consider changing `git://sourceware.org/git/newlib-cygwin.git` to `../riscv-newlib` in `.gitmodules`. Else, you will face some interesting errors when you use `riscv-unknown-elf-xxx`.

```bash
sudo apt-get install -y autoconf automake autotools-dev curl python3 libmpc-dev libmpfr-dev libgmp-dev gawk build-essential bison flex texinfo gperf libtool patchutils bc zlib1g-dev libexpat-dev
cd $SRC
git clone https://github.com/riscv/riscv-gnu-toolchain toolchain
cd toolchain
./configure --prefix=$RISCV --enable-multilib
make linux -j$(nproc)
make newlib -j$(nproc)
```
## 4.2 QEMU
QEMU is useful as a verification (for scripts / disk image / kernel etc.) as it is a much faster emulator.
```bash
sudo apt-get install -y git libglib2.0-dev libfdt-dev libpixman-1-dev zlib1g-dev ninja-build
cd $SRC
git clone https://git.qemu.org/git/qemu.git qemu
cd qemu
./configure --target-list=riscv64-softmmu --prefix=$RISCV
make -j$(nproc)
make install
```

# 5 Linux
## 5.1 Disk Image
```bash
cd $SRC
git clone https://github.com/UCanLinux/riscv64-sample.git ucanlinux
cp ucanlinux/riscv_disk $OUT
```

## 5.2 Linux Kernel v5.10
```bash
cd $SRC
git clone https://github.com/torvalds/linux.git linux
cd linux
git checkout v5.10
cp $SRC/ucanlinux/kernel.config .config
make ARCH=riscv CROSS_COMPILE=riscv64-unknown-linux-gnu- olddefconfig
make ARCH=riscv CROSS_COMPILE=riscv64-unknown-linux-gnu- all -j$(nproc)
cp vmlinux $OUT
```

## 5.2 Berkeley Bootloader
```bash
sudo apt-get install -y device-tree-compiler
cd $SRC
git clone https://github.com/riscv/riscv-pk.git pk
mkdir -p pk/build 
cd pk/build
# use --with-dts=$OUT/device.dts if you wish to include your manually crafted devicetree file
../configure --host=riscv64-unknown-linux-gnu --with-payload=$OUT/vmlinux --prefix=$RISCV
CFLAGS="-g" make -j$(nproc)
make install
cp bbl $OUT
```

# 6 Running Simulators
## 6.1 Running gem5
```bash
# Options:
# --num-cpus: number of CPU threads
# --param 'system.cpu[x].wait_for_remote_gdb = True': have thread x wait for remote GDB 
# note that thread 0 will be at port 7000, thread 1 at 7001 etc.

# If you have everything at the default location (from the above setup), use rg5 with the appropriate options
rg5 -o -O -f Clint

# Else, manually type them out
build/RISCV/gem5.opt -d logs -re configs/example/riscv/fs_linux.py --kernel=$OUT/bbl --caches --mem-size=256MB --mem-type=DDR4_2400_8x8 --cpu-type=AtomicSimpleCPU --disk-image=$OUT/riscv_disk
```

To debug gem5 using gdb, add `gdb --args` before the command.

To debug the code running on gem5, run the command, then:
```bash
riscv64-unknown-linux-gnu-gdb $OUT/bbl

# In remote gdb terminal
target remote :7000
# To check registers
info reg # info reg csr for CSR registers
```

## 6.2 Running QEMU
```bash
# Options:
# -s -S: wait for remote GDB

qemu-system-riscv64 -nographic -machine virt -bios none -kernel $OUT/bbl -append 'root=/dev/vda ro console=ttyS0' -drive file=$OUT/riscv_disk,format=raw,id=hd0 -device virtio-blk-device,drive=hd0
```

Note that QEMU remote GDB port is `1234`.