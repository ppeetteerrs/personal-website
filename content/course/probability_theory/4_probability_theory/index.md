---
title: Part 4 - Basic Probability Theory
date: 2021-03-08
categories:
  - Maths
tags:
  - maths
  - probability
  - statistics
  - probability theory
  - measure theory
type: book
weight: 40
---

# 1 Introduction

Having understood some measure theory background, we can easily build the foundations of probability theory. The content of this part is based on [Martingale Theory Notes](https://people.maths.bris.ac.uk/~mb13434/mart_thy_notes.pdf) and **Rick Durrett - Probability: Theory and Example**.

# 2 Probability Space

> Probability space is a measurable space. The event space naturally forms a σ-algebra.

Recall that a measurable space is a triplet $ (\Omega, \mathcal{F}, P) $. The space is called a **probability space** if $ P(\Omega) = 1 $ and $ P $ is a probability measure.

In the probability sense, $ \Omega $ is called the **sample space**, $ \mathcal{F} $ is the **event space**, which consists of sets of outcomes closed under complement and countable union (intuitive, right).

A discrete probability space has a finite sample space and (usually) a counting measure. A continuous probability space is more difficult to visualize. However, there is no need to differentiate between the two once we introduce the concept of random variable.

# 3 Random Variable

> We can perform calculations on random variables, leaving the probability space abstract (although some theorems require two r.v. to share the same probability space).

## 3.1 Pushforward Measure

It is **super important** to notice that a probability space is just an abstract representation of our understanding of probability, which satisfies the two conditions:

1. Event space is an σ-algebra (obviously)
2. Probability of whole sample space is 1 (obviously)

For all purposes (other than conceptual clarity), there is **no need** (and no point) **to work in the abstract probability space**, unless you are completing your primary school homework on combinatorics.

A random variable in probability theory is a **measurable function** $ X:\Omega \rightarrow \mathbb{R}$. Based on what we learnt from previous chapters, given measurable map $ X :\Omega \rightarrow \mathbb{R}$  and a measure $ \mu $ on $ \mathcal{B}[\mathbb{R}] $, we can define a pushforward measure on the probability space:

$$ P(A) := \mu(X(A)) \\; \forall \\; A \in \mathcal{F} $$

## 3.2 Lebesgue-Stieltjes Measure

The lesson from the previous section is that we can pushforward an arbitrary (in non-rigourous sense) probability measure by defining a corresponding random variable and measure on the real line. Recall from Part 2 that we can construct a measure on the real line using the Lebesgue-Stieltjes method by defining monotone non-decreasing, right-continuous function $ F(x) $.

In order for $ F(x) $ to pushforward a probability measure, $F(-\infty) = 0$ and $ F(+\infty) = 1 $. Functions that satisfy these requirements are called **distribution functions**.

$$ P(\\{\omega : X(\omega) \leq x\\}) = F(x) = P(X^-1(-\infty,x])$$

In particular, some distribution functions can be written as $F(x) = \int_{-\infty}^{x} f(y) dy$.

$f(x)$ is called the **density function**. Recall the Radon–Nikodym Theorem from Part 3, we can immediately realize that distribution functions with a density are absolutely continuous w.r.t. the Lebesgue measure (surprise!). This property allows us to perform a change of variable on r.v. with density functions:

$$ Y = r(X), \\; f_Y(y) = F_Y'(y) $$
$$ F_Y(y) = P(r(X) \leq y) = \int_{r(x) \leq y} f_X(x) dx $$

# 4 Expectation
Since random variables are measurable functions, they (absolutely integrable), can be represented as a sequence of simple r.v. $ \\{ X_n \\}  $ such that $ |X_n| \leq |X| \\; \forall \\; n $ and $ X_n(\omega) \rightarrow X(\omega) $ as $ n \rightarrow \infty \\; \forall \\; \omega \in \Omega $.

{{<admonition title="Simple Random Variable" type="grey">}}
$ X(\omega) $ is a simple r.v. if:
$$ X(\omega) = \sum \limits_{k=1}^{n} x_k \cdot 1_{A_k}(\omega) $$

where $ 1_A(\omega) $ is the indicator function:

$$1_A(\omega) = \begin{cases}
  1, \omega \in A \\\\
  0, \omega \notin A
\end{cases}
$$
{{</admonition>}}

As such, the integral of an arbitrary r.v. can be constructed in the Lebesgue manner, and it is called the expectation:

$$ \mathbb{E}X := \int X dP = \int_{-\infty}^{\infty} xf_X(x)dx $$

**Note that $ \mathbb{E}X $ exists only if $ \mathbb{E}|X| < \infty $.**

**Notation: $ X \in L^p \Leftrightarrow (\mathbb{E}|X|^p)^{1/p} = ||X||_p < \infty $.**

## 4.1 Inequalities

These results are general to measurable functions, but are more relevant when framed in the probability context.

{{<admonition title="Jensen's Inequality" type="blue">}}
If $ \phi $ is convex,
$$ \mathbb{E} \phi(X) \geq \phi(\mathbb{E} X) $$

Two special cases are: $ |\mathbb{E}X| \leq \mathbb{E}|X| $ and $ (\mathbb{E}X)^2 \leq \mathbb{E}(X^2) $

{{</admonition>}}

{{<admonition title="Ljapunov's Inequality" type="blue">}}
If $ 0 < p < q $,
$$ ||X||_p \leq ||X||_q $$

{{</admonition>}}

{{<admonition title="Hölder’s Inequality" type="blue">}}
If $ p,q \in [1,\infty] $ and $ 1/p + 1/q = 1 $,
$$ \mathbb{E}|XY| \leq ||X||_p ||Y||_q $$

{{</admonition>}}

{{<admonition title="Chebyshev's Inequality" type="blue">}}
With $ \mathbb{E}(X;A) = \int_A X dP $.

Suppose $ \phi: \mathbb{R} \rightarrow \mathbb{R}, \phi \geq 0 $, let $ A \in \mathbb{R} $ and $ i_A = \inf \\{ \phi(y): y \in A \\}  $

$$ i_AP(X \in A) \leq \mathbb{E}(\phi(X); X \in A) \leq \mathbb{E}\phi(X) $$

{{</admonition>}}

## 4.2 Integration to the Limit

Note that expectation is also conserved under $ \inf, \sup, \limsup, \liminf $.

{{<admonition title="Fatou's Lemma" type="blue">}}
If $ X_n \geq 0 $,
$$ \liminf \limits_{n \rightarrow \infty} \mathbb{E}X_n \geq \mathbb{E}(\liminf \limits_{n \rightarrow \infty} X_n) $$
{{</admonition>}}

{{<admonition title="Monotone Convergence Theorem" type="blue">}}
If $ 0 \leq X_n \uparrow X$,
$$ \mathbb{E}X_n \uparrow \mathbb{E}X $$
{{</admonition>}}

{{<admonition title="Dominated Convergence Theorem" type="blue">}}
If $ X_n \rightarrow X \\; a.s.$ and $ |X_n| \leq Y \\; \forall \\; n $ and $ \mathbb{E}Y \leq \infty $,
$$ \mathbb{E}X_n \rightarrow \mathbb{E}X $$
{{</admonition>}}

# 5 Convergence of Random Variables

## 5.1 Mode of Convergence
{{<admonition title="Convergence in Distribution" type="blue">}}
$ X_n \xrightarrow{d} X$ if either:
1. $ \mathbb{E}f(X_n) \rightarrow \mathbb{E}f(X) $ for every bounded and continuous $ f : \mathbb{R} \rightarrow \mathbb{R} $
2. $ F_{X_n}(x) \rightarrow F_X)x $ at every $ x $ where $ F_X $ is continuous

Note that the random variables do not have to be defined on the same probability space. Which is super weak.
{{</admonition>}}

{{<admonition title="Convergence in Probability" type="blue">}}
$ X_n \xrightarrow{P} X $ if $ P(|X-X_n| \geq \varepsilon) \rightarrow 0 \\; \forall \\; \varepsilon > 0 $
{{</admonition>}}

{{<admonition title="Converge Almost Surely" type="blue">}}
$ X_n \rightarrow X, a.s. $ if $ P(X_n \rightarrow X) = 1 $
{{</admonition>}}

{{<admonition title="Convergence in $ L^p $" type="blue">}}
$ X_n \xrightarrow{L^p}X $ if $ ||X - X_n||_p \rightarrow 0 $
{{</admonition>}}

## 5.2 Implication
1. $ X_n \rightarrow X, a.s. \Rightarrow X_n \xrightarrow{P} X $
2. $ X_n \xrightarrow{L^p} X \Rightarrow X_n \xrightarrow{P} X $
3. $ X_n \xrightarrow{P} X \Rightarrow X_n \xrightarrow{d} X $

# 6 Product Measures and Independence
Two r.v. $ X $ and $ Y $ are independent if
$$ P(X \in C, Y \in D) = P(X \in C)P(Y \in D) \\; \forall \\; C,D \in \mathbb{R} $$

{{<admonition title="Sufficient Condition for Independence" type="blue">}}
Using the π-λ Theorem, a sufficient condition for r.v. $ \\{ X_n \\}  $ to be independent is:
$$ P(X_1 \leq x_1,...,X_n \leq x_n) = \prod \limits_{i=1}^{n} P(X_i \leq x_i) \\; \forall \\; x_1,...,x_n \in (-\infty, \infty] $$
{{</admonition>}}

Also, functions of disjoint collections of independent r.v. are independent. Namely, if $ X_{i,j} $ are independent and $ f_i : \mathbb{R}^{m(i)} \rightarrow \mathbb{R} $ are measurable, then $ f_i(X_{i,1},...,X_{i,m(i)}) $ are independent.

It is also worth noting that the distribution of a vector of independent r.v. forms a product measure space.

{{<admonition title="Independent r.v. and Product Measure" type="blue">}}
If $ \\{ X_n \\}  $ are independent and $ X_i $ has measure $ \mu_i $,
$ (X_1,...,X_n)$ has distribution $\mu_1 \times ... \times \mu_n $.

Hence, according to Fubini's theorem, for i.r.v. $ X $ and $ Y $ with measures $ \mu $ and $ v $,
$$ \mathbb{E}h(X,Y) = \int\int h(x,y) \mu(dx) v(dy) $$
where $ h:\mathbb{R}^2 \rightarrow \mathbb{R} $ is measurable and non-negative or absolutely integrable.

{{</admonition>}}

## 6.1 Uncorrelated
Two r.v. $ X $ and $ Y $ with finite variances are uncorrelated if $ \mathbb{E}XY = \mathbb{E}X \mathbb{E}Y $. Note that independence implies uncorrelated but not the reverse. Take the example of 

$$ (X,Y) = 
\begin{cases} 
(-1,1), &p=0.25 \\\\
(0,0), &p=0.5 \\\\
(1,1), &p=0.25
\end{cases} 
$$

## 6.2 Sum of Independent Random Variables
For i.r.v. $ X $ and $ Y $, $ X+Y $ has density
$$ h(x) = \int f(x-y)g(y)dy$$

As a result for i.r.v.:
1. $ X = gamma(\alpha, \lambda) $, $ Y=gamma(\beta,\lambda) $ then $ X+Y = gamma(\alpha+\beta, \lambda) $
2. $ X = N(\mu,a) $, $ Y=N(v,b) $ then $ X+Y = N(\mu+v, a+b) $

## 6.3 Borel-Cantelli Lemmas

{{<admonition title="Borel-Cantelli Lemmas" type="blue">}}
1. For any events $ A_1,... $ with $ \sum_n P(A_n) \leq \infty $, $ P(\limsup_n A_n) = 0 $
2. For independent events $ A_1,... $ with $ \sum_n P(A_n) = \infty $, $ P(\limsup_n A_n) = 1 $
{{</admonition>}}

# 7 Laws of Large Numbers
{{<admonition title="Uncorrelated Variance" type="blue">}}
$ \\{ X_n \\}  $ uncorrelated,
$$ var(X_1+...+X_n) = var(X_1) + ... + var(X_n) $$
{{</admonition>}}

{{<admonition title="$ L^2 $ Weak Law" type="blue">}}
$ \\{ X_n \\}  $ uncorrelated, $ \mathbb{E}X_i=\mu $ with finite variances,
$ \frac{\sum_n X_i}{n} \rightarrow \mu $ as $ n \rightarrow \infty $ in $ L^2 $ and in probability.
{{</admonition>}}

{{<admonition title="Weak Law of Large Numbers" type="blue">}}
$ \\{ X_n \\}  $ i.i.d., $ \mathbb{E}|X_i| < \infty$,
$ \frac{\sum_n X_i}{n} \rightarrow \mathbb{E}X_1 $ as $ n \rightarrow \infty $ in probability.
{{</admonition>}}

{{<admonition title="Strong Law of Large Numbers" type="blue">}}
$ \\{ X_n \\}  $ pairwise i.i.d., $ \mathbb{E}|X_i| < \infty$,
$ \frac{\sum_n X_i}{n} \rightarrow \mathbb{E}X_i $ as $ n \rightarrow \infty $ in probability.
{{</admonition>}}

The Strong Law of Large Number leads to results such as:
1. Empirical Distribution of i.i.d. variables converge to uniform distribution.
2. Shannon's Theorem: $ -n^{-1}log\pi_n(\omega) \rightarrow H = -\sum \limits_{k=1}^{r} p(k)logp(k) a.s. $ (see Rick Durrett Example 2.4.10) 

# 8 Central Limit Theorem

{{<admonition title="Central Limit Theorem" type="blue">}}
$ \\{ X_n \\}  $ i.i.d., $ \mathbb{E}|X_i| = \mu $ with non-zero and finite variances,
$ \frac{\sum_n X_i - n \mu}{\sigma n^{1/2}} \xrightarrow{d} \chi $ as $ n \rightarrow \infty $ where $ \chi $ is the standard normal distribution.
{{</admonition>}}