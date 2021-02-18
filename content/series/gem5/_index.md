---
title: RISC-V ISA + gem5 Deep Dive
linktitle: Course

summary: A series of blog posts and tutorials on the RISC-V ISA and the gem5 simulator.

date: 2020-09-30

type: book

weight: 1

toc: false

order_by: weight
---

During my internship at Huawei, I worked on supporting **RISC-V full system Linux** on gem5. Being able to boot a Linux kernel in a simulator is essential for computer architecture research. 

*RISC-V*
RISC-V is gaining popularity in recent years. Aside from its open-source nature, RISC-V is attractive because of its meticulous design. Being a reduced instruction set, RISC-V is simple to understand and implement. To compete with traditional instruction sets like x86 and ARM, RISC-V learnt from previous mistakes and was designed in a hardware-friendly manner. There are plenty of small details in the RISC-V ISA specification that hardware designers will learn to appreciate. This allows for the design of low-power, low-cost yet efficient SoCs.

*gem5*

While gem5 is powerful and useful, it is definitely not easy to get familiar with. Thanks to its open-source nature and considerable age (and the fact that it is the child of two other open-source projects), its source code is sort of **fragmented and messy** in some sense. There is also **no organized / complete documentation** out there. Hence, I hope that my blog posts will help others **understand the gist of the gem5 simulator** in an easier manner.

{{< list_children >}}
