---
title: Lebesgue Integration (Part 3)
date: 2021-03-04
categories:
  - Maths
tags:
  - maths
  - probability
  - statistics
  - probability theory
  - measure theory
type: book
weight: 30
---

# 1 Introduction

The content of this part is based on **Terence Tao - Analysis II (Chapter 7.5 - 8)** and **The Bright Side of Mathematics**.

# 2 (Abstract) Measurable Functions

> Most functions from one measurable space to another are measurable without the Axiom of Choice.

By now, we have defined the Lebesgue measure, which can measure all sets constructed without the axiom of choice. As such, it is time to replace the Riemann integral to cover a much larger range of functions - (absolutely integrable) measurable functions.

{{<aside title="Measurable Function (usually true)" type="grey">}}
Let $(X_1, \Sigma_1), (X_2, \Sigma_2)$ be measurable spaces and $f : X_1 \rightarrow X_2 $.
$f$ is measurable iff $f^{-1}(V) \in \Sigma_1 $ for every $V \in \Sigma_2 $.

In other words, pre-image of measurable set is also measurable.
{{</aside>}}

When $ (X_2, \Sigma_2) = (\mathbb{R}, \mathcal{B}(\mathbb{R})) $, the following holds:
{{<aside title="What Functions are Measurable?" type="blue">}}
- continuous functions
- continuous function applied to measurable function
- absolute / max(f,0) / min(f,0) are measurable
- $ f+g $ / $ f-g $ / $ fg $ / $ max(f,g) $ / $ min(f,g) $ / $f \div g, \\; g(x) \neq 0$
- $\sup_{n \geq 1}f_n$, $\inf_{n \geq 1}f_n$, $\limsup_{n \rightarrow \infty}f_n$, $\liminf_{n \rightarrow \infty}f_n$
- pointwise convergence of $f_n$

**Note**: composition of two measurable functions are not automatically measurable
{{</aside>}}

## 2.1 Convergence of Functions
> Pointwise convergence take limit at each point. Uniform convergence take limit and compares the entire function.

Let's revisit / introduce the basic concepts of convergence for functions:

{{<aside title="Pointwise Convergence" type="blue">}}
$ f_n $ converges to $ f $ pointwise if $ \\; \forall \\; x \in X, f_n(x)$ converges to $f(x) $. (i.e. we choose arbitrary x, then look at the sequence of $ f_ n(x) $ to see if it converges to $ f(x) $)
{{</aside>}}

{{<aside title="Uniform Convergence" type="blue">}}
$ f_n $ converges to $ f $ uniformly if $ \\; \forall \\; \varepsilon > 0, \\;  \exists \\; N $ such that $ |f_n(x) - f(x)| \leq \varepsilon \\; \forall \\; n \geq N$, $x \in X $

Note that in uniform convergence, our choice of $ N $ only depends on $ \varepsilon $. So we decrement $ \varepsilon $ and at each value, there must be an $ N $ above which every $ f_n $ converges at every $ x $

{{</aside>}}


# 3 Lebesgue Integral
> Lebesgue integral extends the Riemann integral to a wider class of functions using a similar method of construction.

Similar to our construction of the Lebesgue measure, we construct the Lebesgue Integral from a simple starting point. We will then expand it to cover more functions using those dubious techniques of supremums, infimums, limits and convergence.

From now on, functions refer to $ f : \Omega \rightarrow [0, +\infty] $, mapping from a measurable space to the reals.

## 3.1 Simple Functions
{{<aside title="Simple Functions (obvious)" type="grey">}}
Let $ \Omega $ be measurable subset of $ \mathbb{R}^n $ and $ f:\Omega \rightarrow \mathbb{R} $ be a measurable function:

$ f $ is a simple function if the image $ f(\Omega) $ is finite, i.e.:

$$ \\;  \exists \\; c_1,...,c_N \text{ such that } \\; \forall \\; x \in \Omega \\; f(x)=c_j, 1 \leq j \leq N $$

{{</aside>}}

{{<aside title="Lebesgue Integral of Simple Functions (obvious)" type="grey">}}

$$ \int_{\Omega} f := \sum_{\lambda in f(\Omega); \lambda>0} \lambda \mu({x \in \Omega : f(x) = \lambda }) $$

{{</aside>}}

## 3.2 Non-negative Measurable Function
It is proven that there exists a sequence of (non-negative) and increasing simple functions that converges pointwise to every measurable non-negative function. As such, we can define the Lebesgue Integral for non-negative functions:

{{<aside title="Lebesgue Integral for Non-negative Functions (obvious)" type="grey">}}
$$ \int_{\Omega} f := \sup\\{s:s \text{ simple and non-negative and minorizes } f\\} $$
where minorize just means always smaller than.
{{</aside>}}

## 3.3 Absolutely Integrable Functions
Knowing how to integrate non-negative functions, it is trivial to extend the notion to absolutely integrable functions.

{{<aside title="Absolutely Integrable Functions (obvious)" type="grey">}}
$ \int_{\Omega} |f| $ is finite and $ f $ measurable.
{{</aside>}}

{{<aside title="Lebesgue Integral for Absolutely Integrable functions (obvious)" type="grey">}}
$$ \int_{\Omega} := \int_{\Omega} f^+ - \int_{\Omega} f^- $$ where $ f^+ $ is positive part and $ f^- $ is negative part.
{{</aside>}}

## 3.3 Integral Theorems (Important)

> Theorems on exchanging integral operation.

{{<aside title="Lebesgue Montone Convergence Theorem" type="blue">}}
For a countable increasing sequence of non-negative measurable functions $ f_n $, the integrals are increasing (duh...), and
$$ \int_{\Omega} \sup\\limits_{n} f_n = \sup \limits_{n} \int_{\Omega} f_n $$
{{</aside>}}

With the Lebesgue monotone convergence theorem, we can interchange addition and integration (even infinite sums). The proof seems trivial though.

{{<aside title="Fatou's Lemma" type="blue">}}
$$ \int_{\Omega} \liminf \limits_{n \rightarrow \infty} f_n \leq \liminf \limits_{n to \infty} \int_{\Omega} f_n $$
for sequence of non-negative measurable functions.
{{</aside>}}

{{<aside title="Lebesgue Dominated Convergence Theorem" type="blue">}}
Let $ \Omega $ be measurable subset of $ \mathbb{R}^n $ and $ f_1,... $ be sequence of measurable functions from $ \Omega to \mathbb{R}^* $ which converge pointwise. Also, there is absolutely integrable function $ F: \Omega to [0,+\infty] $ such that $ f_n(x) \leq F(x) $ for all $ x \in \Omega $ and all $ n $. Then,
$$ \int_{\Omega} \lim \limits_{n \rightarrow \infty} f_n = \lim \limits_{n \rightarrow \infty} \int_{\Omega} f_n $$
{{</aside>}}

## 3.4 Zero or One
{{<aside title="Borel-Cantelli Lemma (not useful in this abstract form)" type="grey">}}
Let $ \Omega,... $ be measurable subsets of $ \mathbb{R}^n $ such that $ \sum \limits_{n=1}^{\infty} \mu(\Omega_n) $ is finite. Then the set $$ \\{ x \in \mathbb{R}^n : x \in \Omega_n \text{ for infinitely many n }\\} $$ is a set of measure zero.

The significance of this lemma is that some things have probability of either 1 or 0.
{{</aside>}}

# 4 Product Measures

> The important results regarding abstract product measures are: 1. existence, 2. Fubini's Theorem.

Having formalized the concepts of Lebesgue Measure and Integral, we now look at combining multiple measurable spaces. The product σ-algebra of two measurable spaces $ (X1, \mathcal{B}_1) $ and $ (X_2, \mathcal{B}_2) $ is $ \mathcal{B}_1 \times \mathcal{B}_2$, which is the σ-algebra generated by the Cartesian product of $ \mathcal{B}_1 $ and $ \mathcal{B}_2 $.

With this definition, it is natural to define $ \mu_1 \times \mu_2 (E \times F) = \mu_1(E) \mu_2(F) $. This product measure only **exists (and is unique)** if we restrict ourselves to σ-finite measure spaces.

{{<aside title="σ-finite (usually true)" type="grey">}}
Measure space $(X,\Sigma,\mu)$ is σ-finite if $ X $ can be expressed as countable union of sets of finite measure.

e.g. Lebesgue measure is σ-finite and counting measure is not.
{{</aside>}}

There is no need for us to extend beyond σ-finite spaces because all probability spaces (and almost all spaces in analysis) are σ-finite.

## 4.1 Fubini's Theorem
In non-rigorous terms, Fubini's Theorem allows us to switch integration order for product measures. We define $ \bar{\Sigma} $ to be the completion of $ \Sigma $, meaning to contain all null sets.

{{<aside title="Fubini's Theorem" type="blue">}}
Let $ f: X \times Y \rightarrow \mathbb{C}$ be absolutely integrable w.r.t. $\overline{\mathcal{B_1} \times \mathcal{B_2}}$, then:
$$ \int_{X \times Y} f(x,y) d\overline{\mu_1 \times \mu_2}(x,y) = \int_{X}(\int_{Y}f(x,y)d\mu_{Y}(y))d\mu_X(x)$$
$$ \int_{X}(\int_{Y}f(x,y)d\mu_{Y}(y))d\mu_X(x) = \int_{Y}(\int_{X}f(x,y)d\mu_{X}(x))d\mu_Y(y)$$
{{</aside>}}

# 5 Changing Measure (Very Important)

> Radon–Nikodym Theorem allows use to integrate w.r.t. measures other than the Lebesgue measure in our familiar fashion (with the absolutely continuous condition).

Aside from double integral, we also need to develop the substitution rule, which means changing measure. We will need a few concepts here:

For a measure space $ (X, \Sigma) $ with measures $ \mu $ and $ \lambda $,

{{<aside title="Absolutely Continuous" type="blue">}}
$ \mu $ is absolutely continous w.r.t. $ \lambda $ if $ \lambda(E) = 0 \Rightarrow \mu(E) = 0 \\; \forall \\; E \in \Sigma $

We denote this as $ \mu << \lambda $
{{</aside>}}

{{<aside title="Singular" type="grey">}}
$ \mu $ is singular w.r.t. $ \lambda $ if $ \\;  \exists \\; E \in \Sigma $ such that $ \lambda(E) = 0 $ and $ \mu(E^c) = 0 $

We denote this as $ \mu \perp \lambda $
{{</aside>}}

{{<aside title="Lebesgue Decomposition Theorem" type="grey">}}
Given σ-finite $ \mu $ and $ \lambda$, we can uniquely decompose $ \mu $ into $ \mu_{ac} $ and $ \mu_s $ with  $ \mu = \mu_{ac} + \mu_s $ where $ \mu_{ac} << \lambda $ and $ \mu_s \perp \lambda $
{{</aside>}}

{{<aside title="Radon–Nikodym Theorem" type="blue">}}
There is a unique measurable map $ h $ such that $ \mu_{ac}(E) = \int_E h d \lambda \\; \forall \\; E \in \Sigma $.

In real space, we call this, TADA!, a density function.
{{</aside>}}

## 5.1 Change of Variables ($ y=h(x) $)

> Pushforward measure is a powerful tool allowing us to measure abstract spaces (probability space) using a more familiar space (extended real line).

Given measurable space $ (X, \Sigma, \mu) $ with a measure and $ (Y, \Omega) $ without a measure. If we have a measurable map $ h: X \rightarrow Y$.

We can measure set $ A \in \Omega $ by the **image / pushforward measure** $ h*\mu(A) = \tilde{\mu}(A) = \mu(h^{-1}(A)) $.

Now, if we have function $ g: Y \rightarrow \mathbb{R} $,
$ \int_Y g d h * \mu  = \int_X g \cdot h d \mu$