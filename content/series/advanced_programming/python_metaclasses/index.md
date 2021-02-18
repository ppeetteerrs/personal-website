---
title: Python Metaclasses
date: 2021-01-24
categories:
  - Programming
tags:
  - programming
  - python
type: book
weight: 10
---

# 1 What is a programming language?

**Purpose of Language**

> The existence of a language comes from the need to share certain information.

The idea of language has always been to allow for the **sharing** of information. For example, we don't need a language in order to remember what we did in the previous day. However, we need a spoken language to share it with another human being.

As such, a language is an **interface** between multiple entities that allows for the sharing of information.

**Design of a language**

> Different languages are optimized for different use cases.

After understanding the purpose of language, it is natural to ask the question: **why is there not a universal language for everything?**

There are only 2 main reasons that I can think of:
1. **Impossibility:** sometimes there are very good reasons why a single language should be used. However, it might be impossible to do so. E.g. different coutries would not combine their languages unless a war happens
2. **Optimization:** different languages are optimized for different use cases. This optimization happens in a trade-off matrix of two dimensions: **efficiency** vs **flexibilty**.

It is important to realize that the design of a language defines its flexibilty (i.e. what it can describe). English, for example, can describe almost anything under the sun (and beyond...). However, it is a terrible choice for describing things like logic. See the following example of the principle of mathematical induction:

In english (extended with symbols like P(n) which are undefined in the dictionary), 
> "If a statement P(n), where n is a natural number, is true for n=1. And we can prove that P(n+1) is true if P(n) is true, then P(n) is true for all natural numbers n."

In second-order logic,
> $$\forall{P}(P(0)\wedge\forall{k}(P(k)\rightarrow P(k+1))\rightarrow \forall{n}(P(n)))$$

It is also worth noting that some languages have built-in support for more than 2 genders while other languages require additional wording to describe the equivalent :wink:.

**Programming languages**

> The ultimate purpose of programming languages is to convey a logic to the computer hardware.

Programming languages are no different from spoken languages. However, they are designed to allow programmers to communicate their logic to the computer hardware. In order to truly understand programming languages, we need to understand things from the silicon level up.

The lowest level of abstraction in a computer is the CPU chip (below which is governed by the laws of nature). The CPU chip speaks a language defined by a certain instruction set specification (ISA). The instruction set defines the types of operations that can be understood by the CPU.

An ISA specification takes the following into consideration:
**Hardware complexity:** 
Every instruction defined in the ISA **must** be supported by the CPU. I can certainly propose an ISA that understand English, but no manufacturers would be able to use it. Being able to perform an operation based on an arbitrary English sentence would probably require a decoder the size of the planet...

It is not just the feasibility that matters. A well-designed ISA allows for a simple decoder logic, which would allow for higher CPU clock speed and hence a faster CPU.

**Code compactness**
Intuitively, an ISA which specifies only a very small number of 


**Other examples of languages**
- Hardware protocols:
  - Instruction sets:
    - ARM, x86, RISC-V, Sparc, MIPS, Alpha
  - Bus interfaces:
    - AXI, AHPB, AMBA
  - Peripheral protocols:
    - USB, PCIe, DDR, I2C, SPI, UART
- Mixed protocols:
  - TCP/IP stack (can be hardware / software)
- Software protocols:
  - Kernel syscalls (also called ABI for application binary interface)
  - GraphQL, RESTful API, SQL
  - Library-sepcific APIs

# 1 Python is an interpreted language
> Programs written in compiled language are translated directly to machine code (i.e. the language that the hardware speaks). 


> Programs written in interpreted language are translated to bytecode (i.e. the language that the interpreter program speaks).
> 

Most people, especially beginners to programming, learn to code by first familiarizing with the **syntax** of a language. A programming language is

The syntax of a programming language defines the grammar of 

In particular, Python has a very loose and intuitive syntax at the cost of horrible performance.

However, programmers who come from a C++ (or some other low-level language) background would be able to differentiate between a compiled and interpreted language. 
