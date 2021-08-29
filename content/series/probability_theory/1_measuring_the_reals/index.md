---
title: Part 1 - Measuring the Real Numbers
date: 2021-02-18
categories:
  - Maths
tags:
  - maths
  - probability
  - statistics
  - probability theory
  - measure theory
type: book
weight: 10
---

# 1 Introduction

Probability Theory is built upon the results of Measure Theory, which is the study of assigning sizes to sets. Before we learn about Probability Theory, it is important to review the important results from Measure Theory. For those who are interested in more examples and rigorous proves, refer to **Terence Tao - Analysis II (Chapter 7)**.

# 2 The Measure Problem

> Given the Axiom of Choice, no measure can be defined on the power set (all possible subsets) of the reals.

Measure Theory was developed to solve the measure problem, which is to measure the "size" of every general (even pathological) subset of the reals $\mathbb{R}^d$. It has been proven that, with the Axiom of Choice, it is not possible to define a measure for every possible subset of the reals. As such, mathematicians have decided to restrict their attention to "measurable sets" and study their properties. As such, whenever we talk about Measure Theory, Probability Theory or Statistics, the **Axiom of Choice** is literally **out of the picture**.

Before delving deeper, let's begin by defining what a "measure" is according to our human intuition:

{{<aside title="Desired Properties of a Measure for $\mathbb{R}^d$" type="blue">}}

- **Positivity**: $0 \leq \mu(E) \leq +\infty \\; \forall \\; E \in \mathbb{R}^d$
- **Null empty set**: $\mu(\emptyset) = 0$
- **Countable additivity**: $\mu(\bigcup \limits_{i=1}^{\infty} E_i) = \sum \limits_{i=1}^{\infty} \mu(E_i)$ for pairwise disjoint sets
- **Normalization**: $\mu([0,1]^d) = 1$
- **Translation Invariance**: $\mu(E+x) = \mu(E)$ where $x+E := \\{ x+y : y \in E \\}, x \in \mathbb{R}^d$

{{</aside>}}

Having defined the desired properties of a measure, we now proceed to finding a measure for the reals which can measure as many subsets of the reals as possible.

# 3 Pre-measure and Outer Measure

## 3.1 Elementary Measure

> Start with something that we know for sure. 

A sensible starting point to developing our notion of a general measure of size is to start with something that we know for sure: measuring the size of a n-dimensional box.

{{<aside title="Volume of an Open Box" type="grey">}}
- **Open box**: $B = \prod  \limits_{i=1}^{n} (a_i, b_i) := \\{ (x_1, ..., x_n ) \in \mathbb{R}^n : x_i \in (a_i, b_i)\\; \forall \\; 1 \leq i \leq n\\}$ where $b_i \geq a_i$
- **Volume**: $vol(B) := \prod \limits_{i=1}^{n} (b_i - a_i)$
{{</aside>}}

With the definition for the volume of a box, we can also measure the volume of objects which can be split up into a finite number of disjoint boxes:

{{<aside title="Elementary Measure" type="grey">}}
- **Elementary Set**: can be expressed as finite union of disjoint boxes
- **Elementary Measure**: $\mu_0(E) := vol(B_1) + .... + vol(B_k)$. (Note that the measure is independent of the partition)
{{</aside>}}

In the next posts, we will understand that the elementary measure is a pre-measure (finitely additive) defined on a (Boolean) algebra.

## 3.2 Lebesgue Outer Measure

> We can cover every possible set with elemental sets to get an outer measure.

Given the elementary measure, we can approximate the **"outer" volume of an arbitrary set** by covering it with countably many elementary boxes.

{{<aside title="Lebesgue Outer Measure" type="blue">}}
$$\mu^*(E) := \inf \\{ \sum \limits_{j \in J} \mu_0(B_j) : (B_j)_{j \in J} \text{ covers } E \text{; J at most countable} \\} $$
{{</aside>}}

*Note that the Lebesgue outer measure can be infinity because the sum of countable finite numbers can be infinity.*

The outer measure is close to our desired measure, but it is unfortunately not countably additive yet (see Book Chapter 7.3).

{{<aside title="Note: Properties of Lebesgue Outer Measure" type="grey">}}
- **Positivity**: $0 \leq \mu^*(E) \leq +\infty \\; \forall \\; E \in \mathbb{R}^d$
- **Null empty set**: $\mu^*(\emptyset) = 0$
- **Monotonicity**: $A \subset B \subset \mathbb{R}^n \Rightarrow m*(A) \leq m*(B)$
- **Countable sub-additivity**: $\mu^*(\bigcup \limits_{i=1}^{\infty} E_i) \leq \sum \limits_{i=1}^{\infty} \mu^*(E_i)$
- **Normalization**: $\mu^*([0,1]^d) = 1$
- **Translation Invariance**: $\mu^* (E+x) = \mu^* (E)$ where $x+E := \\{ x+y : y \in E \\}, x \in \mathbb{R}^d$

{{</aside>}}

# 4 Measurability

> Measure is outer measure defined on sets that **happen** to satisfy finite additivity.

So far, we have come close to defining our desired measure. We have defined a (outer) measure for all subsets of the reals which satisfies all but one desired properties of a measure: **countable additivity**. As such, all we need to do is to focus our attention on sets whose outer measure "happen" to fulfill countable additivity (i.e. exclude pathological sets).

Given the monotonicity and countable sub-additivity of the outer measure, we just need to assert **finite additivity** on our "measurable" sets to get **countable additivity** (refer to Book Chapter 7.4 for proof). Of course, since we are asserting a property, we also need to prove that such sets exist (refer to Book for proof).

{{<aside title="Lebesgue Measurability" type="blue">}}
E is **Lebesgue measurable** iff
$$\mu^* (A) = \mu^* (A \cap E) + \mu^* (A \setminus E) \\; \forall \\; A \in 2^{\mathbb{R}^n} $$

If E is measurable, we define the **Lebesgue measure** of E to be $\mu(E) = \mu^* (E)$
{{</aside>}}