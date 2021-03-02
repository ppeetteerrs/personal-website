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

> No intuitive (aka. well-behaved) measure can be defined on the power set of the reals.

Measure Theory was developed to solve the measure problem, which is to measure the "size" of every general (even pathological i.e. weird) subset of $\mathbb{R}^d$.

Before the search for the correct definition of this "measure", we begin with our intuitive understanding of what a measure is (or how it should behave):

{{<aside title="Desired Properties of a Measure for $\mathbb{R}^d$" type="blue">}}

- **Positivity**: $0 \leq \mu(E) \leq +\infty \\; \forall \\; E \in \mathbb{R}^d$
- **Null empty set**: $\mu(\emptyset) = 0$
- **Countable additivity**: $\mu(\bigcup \limits_{i=1}^{\infty} E_i) = \sum \limits_{i=1}^{\infty} \mu(E_i)$ for pairwise disjoint sets
- **Normalization**: $\mu([0,1]^d) = 1$
- **Translation Invariance**: $\mu(E+x) = \mu(E)$ where $x+E := \\{ x+y : y \in E \\}, x \in \mathbb{R}^d$

{{</aside>}}

Given these desired properties, it is possible to prove that (given the Axiom of Choice) there is **no such measure defined for $2^{\mathbb{R}}$**.

_Note: The Jordan measure only satisfies finite additivity, and hence is only defined for sets constructed via finite unions._

Thus, there is a need to find a measure (on the reals) that satisfies the above properties and subsequently **restrict our attention to sets "measurable" by this measure**.

# 3 Outer Measures
A sensible **starting point** for our desired measure is the volume of an n-dimensional open box.

{{<aside title="Volume of an Open Box" type="blue">}}
- **Open box**: $B = \prod  \limits_{i=1}^{n} (a_i, b_i) := \\{ (x_1, ..., x_n ) \in \mathbb{R}^n : x_i \in (a_i, b_i)\\; \forall \\; 1 \leq i \leq n\\}$ where $b_i \geq a_i$
- **Volume**: $vol(B) := \prod \limits_{i=1}^{n} (b_i - a_i)$
{{</aside>}}

The next logical step for a typical mathematician is to extend this simple notion of volume to an arbitrary set by **estimating from inside or outside** (we will do it from the outside to avoid dealing with infinities).

With the notion of volume of boxes, we can define the Lebesgue outer measure by covering any set with countable boxes:
{{<aside title="Lebesgue Outer Measure" type="blue">}}
$$m*(\Omega) := \inf \\{ \sum \limits_{j \in J} vol(B_j) : (B_j)_{j \in J} \text{ covers } \Omega \text{; J at most countable} \\} $$
{{</aside>}}

*Note that the Lebesgue outer measure can be infinity because the sum of countable finite numbers can be infinity.*

The outer measure is close to our desired measure, but it is unfortunately not additive (see Book Chapter 7.3).

{{<aside title="Properties of Lebesgue Outer Measure (who cares)" type="grey">}}
- **Positivity**: $0 \leq \mu(E) \leq +\infty \\; \forall \\; E \in \mathbb{R}^d$
- **Null empty set**: $\mu(\emptyset) = 0$
- **Monotonicity**: $A \subset B \subset \mathbb{R}^n \Rightarrow m*(A) \leq m*(B)$
- **Countable sub-additivity**: $\mu(\bigcup \limits_{i=1}^{\infty} E_i) \leq \sum \limits_{i=1}^{\infty} \mu(E_i)$
- **Normalization**: $\mu([0,1]^d) = 1$
- **Translation Invariance**: $\mu(E+x) = \mu(E)$ where $x+E := \\{ x+y : y \in E \\}, x \in \mathbb{R}^d$
{{</aside>}}

# 4 Measurable Sets
So far, we have come close to defining our desired measure. The outer measure satisfies **almost all desired properties except for additivity**. 

However, sets which do not satisfy the additivity property (under the outer measure) are rather **pathological** (constructed using axiom of choice). 

In order to exclude these weirdo sets, we just need to assert **finite additivity** (again, refer to Book Chapter 7.4 for proof).

{{<aside title="Lebesgue Measurability" type="blue">}}
E is **Lebesgue measurable** iff
$$m*(A) = m*(A \cap E) + m*(A \setminus E) \\; \forall \\; A in \mathbb{R}^n$$

If E is measurable, we define the **Lebesgue measure** of E to be $m(E) = m*(E)$
{{</aside>}}

{{<aside title="Properties of measurable Sets (not important at this point)" type="grey">}}
If E is measurable, the following are also measurable:
- $\mathbb{R}^n \setminus E$
- $x + E$
- Countable union and intersection
- Any E of outer measure zero
{{</aside>}}

# 5 Measurable Functions
By now, we have defined the Lebesgue measure, which can measure all sets constructed without the axiom of choice. As such, it is time to replace the Riemann integral to cover a much larger range of functions - (absolutely integrable) measurable functions.

{{<aside title="Measurable Functions" type="blue">}}
Let $\Omega \in \mathbb{R}^n$ be measurable and $f : \Omega to \mathbb{R}^m$.
A function $f$ is measurable iff $f^{-1}(V)$ is measurable for every open set (equivalently, box) $V \in \mathbb{R}^m$
{{</aside>}}

Having defined measurable functions, it is helpful to understand what functions are measurable
{{<aside title="What Functions are Measurable?" type="blue">}}
- continuous functions
- continuous function applied to measurable function
- absolute / max(f,0) / min(f,0) are measurable
- f+g / f-g / fg / max(f,g) / min(f,g) / f/g (g(x) not zero)
- $\sup_{n \geq 1}f_n$, $\inf_{n \geq 1}f_n$, $\limsup_{n \rightarrow \infty}f_n$, $\liminf_{n \rightarrow \infty}f_n$
- pointwise convergence of $f_n$


**Note**: composition of two measurable functions are not automatically measurable
{{</aside>}}