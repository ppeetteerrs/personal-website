---
title: Part 2 - Abstract Measure Spaces
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
weight: 20
---

# 1 Introduction

The content of this part is based on **Terence Tao - An Introduction to Measure Theory**. Please refer to the book for proves. There is also a Youtube tutorial series by the **Bright Side of Mathematics** on Measure Theory.

In the previous post, we constructed the Lebesgue measure step-by-step. Obviously, a lot of the logic and concepts can be generalized.
We will now work in a more abstract setting where $\mathbb{R}^d$ is replaced by a general space $X$.

# 2 Abstract Notion of Measure

> In an abstract space, normality and translation invariance are removed from the measure axioms.

In an abstract measure space, normality and translation invariance are irrelevant. As such, the axioms of a measure are defined as:
{{<admonition title="Measure Axioms" type="blue">}}
Let $ \Sigma \subseteq 2^X $
- **Positivity**: $0 \leq \mu(E) \leq +\infty \\; \forall \\; E \in \Sigma $
- **Null empty set**: $\mu(\emptyset) = 0$
- **Countable additivity**: $\mu(\bigcup \limits_{i=1}^{\infty} E_i) = \sum \limits_{i=1}^{\infty} \mu(E_i)$ for pairwise disjoint sets

{{</admonition>}}

However, an abstract list of measure axioms alone is not helpful. We still have no clue on how to define a measure for an arbitrary set $ X $ . This is where extension theorems come in.

# 3 Abstract Notion of Pre-measure and Outer Measure

> Using extension theorem, we can construct a unique measure from pre-measure / outer measure (the same way we did with the Lebesgue measure).

Remember that the theorems of this part are not useful. Just remember that we can define a **unique measure** on a σ-algebra (e.g. **Borel** set of reals) by defining a **pre-measure** on a (Boolean) algebra (e.g. **intervals $ (-\infty, a] $**). 

The usefulness of such construction is obvious in Probability Theory to show the **1-1 correspondence between a C.D.F and a measure on the abstract "probability space"**.

## 3.1 Pre-measure and Algebra
Remember from our construction of the Lebesgue measure that the starting point to constructing a measure is to define a finitely additive pre-measure on a subset of $ X $.

{{<admonition title="Pre-measure" type="blue">}}
- **Null empty set**: $\mu_0(\emptyset) = 0$
- **Finite additivity**: $\mu_0(\bigcup \limits_{i=1}^{n} E_i) = \sum \limits_{i=1}^{n} \mu_0(E_i)$ for pairwise disjoint sets

{{</admonition>}}

Given a pre-measure $ \mu_0 : \Sigma_0 \rightarrow [0, +\infty] $, the set for which the pre-measure is defined will form an (Boolean) algebra.
{{<admonition title="Algebra" type="grey">}}
- $\emptyset \in \Sigma_0 $
- $ E^c \in \Sigma_0 $ (closed under complement)
- $ \bigcup \limits_{i=1}^{n} E_i \in \Sigma_0 $ (closed under finite union)

{{</admonition>}}

## 3.2 Outer Measure and Carathéodory's Extension Theorem
If we have a definition of pre-measure, we can define an outer measure $ \mu^* :2^X \rightarrow [0, +\infty] $ the same way we did for the Lebesgue measure, i.e. $\mu^*(E) := \inf \\{ \sum \limits_{j \in J} \mu_0(B_j) : (B_j)_{j \in J} \text{ covers } E \text{; J at most countable} \\} $.

Of course, outer measures don't necessarily have to be constructed from a pre-measure as long as it satisfies the following properties:

{{<admonition title="Outer Measure Axioms" type="grey">}}
- **Null empty set**: $\mu^*(\emptyset) = 0$
- **Monotonicity**: $A \subset B \subset \mathbb{R}^n \Rightarrow m*(A) \leq m*(B)$
- **Countable sub-additivity**: $\mu^*(\bigcup \limits_{i=1}^{\infty} E_i) \leq \sum \limits_{i=1}^{\infty} \mu^*(E_i)$

{{</admonition>}}

Once we have an outer measure (regardless of how it is constructed), Carathéodory's Extension Theorem tells us that the outer measure will constitute a valid measure if we focus only on the set of Carathéodory measurable sets.

{{<admonition title="Carathéodory Measurability" type="blue">}}
$E \subset X$ is Carathéodory measurable w.r.t. $\mu^* $ if $$\mu^* (A) = \mu^* (A \cap E) + \mu^* (A \setminus E) \\; \forall \\; A \subset X $$
{{</admonition>}}

{{<admonition title="Carathéodory's Extension Theorem" type="blue">}}
Given $ \mu^* $ on set $ X $, the restriction of $ \mu^* $ to Carathéodory measurable sets $ \Sigma $ is a measure, and $ \Sigma $ is a σ-algebra.
{{</admonition>}}

Naturally, this implies the useless theorem, included just FYI.
{{<admonition title="Hahn-Kolmogorov Theorem (so deserving...)" type="blue">}}
Every pre-measure on boolean algebra can be extended to a countably additive measure...
{{</admonition>}}

# 4 Measurable Space

> Given a measure, its measurable sets form a σ-algebra (which naturally resembles an event space).

Thus far, we have gone through the method of constructing a measure, where we can start from a pre-measure, outer measure or directly define a measure. Regardless of how a measure is constructed, we can see from the definition of an abstract measure that the space of measurable sets in $ 2^X $ naturally forms a σ-algebra.

{{<admonition title="σ-algebra Properties" type="blue">}}
Let $\Sigma \subset 2^X$ be a σ-algebra:

- $X,\emptyset \in \Sigma$
- $\Sigma$ closed under complement
- $\Sigma$ closed under countable unions (and hence intersection by De Morgan's Theorem)

{{</admonition>}}

As such, the triple $(X, \Sigma, \mu)$ defines a measure space. 

It is important to note that given any collection of measurable set $ C $, there is a **smallest σ-algebra** that contains the collection (aka. the intersection of all σ-algebras containing the collection). This is called the σ-algebra **generated by** $ C $ denoted by $ \sigma(C) $.

## 4.1 Borel Stuff
If we are working in a topological world, we have the notion of open sets. In this case, we can define more special names, cuz why not (self obsessed mathematicians...)?

Basically, in a topological space $ X $, the Borel algebra $ \mathcal{B} $ is the σ-algebra generated by all open sets in $ X $. Elements of a Borel algebra are called Borel measurable (duh..).

Borel sets are often used as an abstract notation with no intent to visualize what they are. **Many properties** of the measure / Borel measurable sets can be **proven by extension from open sets / simpler algebras** (via extension theorems / convergence theorems etc.).

# 5 Lebesgue-Stieltjes Measure
Remember that some genius came to the obvious conclusion that every pre-measure can be extended to a valid measure? With that fact, we can construct a variety of measures on $ \mathbb{R} $.

Let $ F: \mathbb{R} \rightarrow \mathbb{R} $ be a **monotone non-decreasing function** with the left and right limits:

$$ F_{-}(x) := \sup \limits_{y < x} F(y), \quad F_{+}(x) := \inf \limits_{y > x} F(y) $$

Then there exists a **unique Borel measure** $ \mu_F : \mathcal{B}[\mathbb{R}] \rightarrow [0,+\infty]$ such that 

$$ \mu_F((a,b]) = F_+(b) - F_+(a), \quad \mu_F({a}) = F_+(a) - F_-(a) $$

Refer to **Bright Side of Mathematics** for proof.

This looks familiar right? Obviously, if $F(-\infty) = 0$ and $ F(+\infty) = 1 $, it makes an obvious CDF! Also, if F(x) = x, that is exactly the Lebesgue measure.