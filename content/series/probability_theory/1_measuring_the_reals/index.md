---
title: Measuring the Reals (Part 1)
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

Probability Theory is built upon the results of Measure Theory. Before we learn about Probability Theory, it is important to review the important results from Measure Theory. The proves of the results are not of our concern but it is helpful to understand the process from which the foundations are built.

Please read **Terence Tao Analysis II Chapter 7** for examples and proves.

# 2 The Measure Problem

> If we don't drop the Axiom of Choice, no "well-behaved" (i.e. countably additive) measure can be defined on the power set of the reals.

Measure Theory was developed to solve the measure problem, which is to measure the "size" of every general (even pathological) subset of $\mathbb{R}^d$.

Before the search for the correct definition of this "measure", we begin with our intuitive understanding of what a measure on the reals should be:

{{<aside title="Desired Properties of a Measure for $\mathbb{R}^d$" type="blue">}}

- **Positivity**: $0 \leq \mu(E) \leq +\infty \\; \forall \\; E \in \mathbb{R}^d$
- **Null empty set**: $\mu(\emptyset) = 0$
- **Countable additivity**: $\mu(\bigcup \limits_{i=1}^{\infty} E_i) = \sum \limits_{i=1}^{\infty} \mu(E_i)$ for pairwise disjoint sets
- **Normalization**: $\mu([0,1]^d) = 1$
- **Translation Invariance**: $\mu(E+x) = \mu(E)$ where $x+E := \\{ x+y : y \in E \\}, x \in \mathbb{R}^d$

{{</aside>}}

Given these desired properties, it is possible to prove that (given the Axiom of Choice) there is **no such measure defined for $2^{\mathbb{R}^d}$**. Since mainstream mathematicians have decided not to ditch the Axiom of Choice, there is a need to find a measure on the reals that satisfies the above properties and subsequently **restrict our analysis to sets "measurable" by this measure**.

# 3 Pre-measure and Outer Measure

Certainly, it is difficult for the weak human mind to directly come up with a definition of measure for every set not constructed through the Axiom of Choice. However, we certainly can start with something that we know: measuring the volume of an n-dimensional box.

## 3.1 Elementary Measure
{{<aside title="Volume of an Open Box" type="grey">}}
- **Open box**: $B = \prod  \limits_{i=1}^{n} (a_i, b_i) := \\{ (x_1, ..., x_n ) \in \mathbb{R}^n : x_i \in (a_i, b_i)\\; \forall \\; 1 \leq i \leq n\\}$ where $b_i \geq a_i$
- **Volume**: $vol(B) := \prod \limits_{i=1}^{n} (b_i - a_i)$
{{</aside>}}

{{<aside title="Elementary Measure" type="grey">}}
- **Elementary Set**: can be expressed as finite union of disjoint boxes
- **Elementary Measure**: $\mu_0(E) := vol(B_1) + .... + vol(B_k)$. (Note that the measure is independent of the partition)
{{</aside>}}

In the next post, we will understand that the elementary measure is a pre-measure (finitely additive) defined on a (Boolean) algebra.

## 3.2 Lebesgue Outer Measure
Given the elementary measure, we can approximate the volume of an arbitrary set by covering it with countably many elementary boxes.
{{<aside title="Lebesgue Outer Measure" type="blue">}}
$$\mu^*(E) := \inf \\{ \sum \limits_{j \in J} \mu_0(B_j) : (B_j)_{j \in J} \text{ covers } E \text{; J at most countable} \\} $$
{{</aside>}}

*Note that the Lebesgue outer measure can be infinity because the sum of countable finite numbers can be infinity.*

The outer measure is close to our desired measure, but it is unfortunately not additive (see Book Chapter 7.3).

{{<aside title="Properties of Lebesgue Outer Measure (who cares)" type="grey">}}
- **Positivity**: $0 \leq \mu^*(E) \leq +\infty \\; \forall \\; E \in \mathbb{R}^d$
- **Null empty set**: $\mu^*(\emptyset) = 0$
- **Monotonicity**: $A \subset B \subset \mathbb{R}^n \Rightarrow m*(A) \leq m*(B)$
- **Countable sub-additivity**: $\mu^*(\bigcup \limits_{i=1}^{\infty} E_i) \leq \sum \limits_{i=1}^{\infty} \mu^*(E_i)$
- **Normalization**: $\mu^*([0,1]^d) = 1$
- **Translation Invariance**: $\mu^* (E+x) = \mu^* (E)$ where $x+E := \\{ x+y : y \in E \\}, x \in \mathbb{R}^d$

{{</aside>}}

# 4 Measurability
So far, we have come close to defining our desired measure. We have defined a (outer) measure for all subsets of the reals which satisfies all but one desired properties of a measure: **countable additivity**. As such, all we need to do is to focus our attention on sets whose outer measure "happen" to fulfill countable additivity (i.e. exclude pathological sets).

Given the monotonicity and countable sub-additivity of the outer measure, we just need to assert **finite additivity** on our "measurable" sets to get **countable additivity** (refer to Book Chapter 7.4 for proof).

{{<aside title="Lebesgue Measurability" type="blue">}}
E is **Lebesgue measurable** iff
$$\mu^* (A) = \mu^* (A \cap E) + \mu^* (A \setminus E) \\; \forall \\; A \in 2^{\mathbb{R}^n} $$

If E is measurable, we define the **Lebesgue measure** of E to be $\mu(E) = \mu^* (E)$
{{</aside>}}