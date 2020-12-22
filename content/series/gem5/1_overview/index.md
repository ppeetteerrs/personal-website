---
title: gem5 Deep Dive – Overview (Part 1)
author: ppeetteerrsx
type: post
date: 2020-09-28T16:47:31+00:00
excerpt: We start learning gem5 by going over its project structure and some basic concepts.
url: /ce/gem5-deep-dive-overview-part-1/
views:
  - 20
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

# 1 Overview

## 1.1 My Impression on gem5

Before I start ranting about gem5, I have to say that gem5's overall design is very modular and friendly to general users. However, for OCD people like me, it is a pain to work with it on a daily basis. First, the multi-language nature of gem5 makes it impossible to setup code Intellisense (it uses Python, C++ and plenty of custom DSLs). Finding function declarations and definitions can only be done through file search&#8230; Also, its poor documentation is a pain point. A lot of implementation details have to be found out through experimentation and digging through the source code. That is only of the main motivation for me to write this series. I hope that this tutorial series can benefit people who wish to get started in gem5 without going through the painful process of reading unformatted source code.

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
