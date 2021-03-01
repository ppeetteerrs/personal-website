---
title: Measure Theory - Constructing the Lebesgue Measure (Part 1)
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

# 2 The Measure Problem

> No intuitive (aka. well-behaved) measure can be defined on the power set of reals.

Measure Theory was developed to solve the measure problem, which is to measure the "size" of every general (even pathological) subset of $\mathbb{R}^d$.

Before the search for the correct definition of this "measure", we begin with our intuitive understanding of what a measure is (or how it should behave):

{{<aside title="Desired Properties of a Measure for $\mathbb{R}^d$" type="blue">}}

- **Non-negativity**: $\mu(E) \geq 0 \quad \forall E \in \mathbb{R}^d$
- **Null empty set**: $\mu(\emptyset) = 0$
- **Countable additivity**: $\mu(\bigcup \limits_{i=1}^{\infty} E_i) = \sum \limits_{i=1}^{\infty} \mu(E_i)$ for pairwise disjoint sets
- **Normalization**: $\mu([0,1]^d) = 1$
- **Translation Invariance**: $\mu(E+x) = \mu(E)$ where $x+E := \set{x+y : y \in E}, x \in \mathbb{R}^d$

{{</aside>}}

Given these desired properties, it is possible to prove that (given the Axiom of Choice) there is no such measure defined for $2^{\mathbb{R}}$.

_Note: The Jordan measure only satisfies finite additivity, and hence is only defined for sets constructed via finite unions._

# 2.1 Outer Measures
