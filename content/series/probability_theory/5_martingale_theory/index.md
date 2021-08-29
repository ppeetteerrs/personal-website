---
title: Part 5 - Martingale Theory
date: 2021-03-09
categories:
  - Maths
tags:
  - maths
  - probability
  - statistics
  - probability theory
  - measure theory
type: book
weight: 50
---

# 1 Introduction

The content of this part is based on [Martingale Theory Notes](https://people.maths.bris.ac.uk/~mb13434/mart_thy_notes.pdf). Personally, I recommend reading until part 7. I have not fully digested the contents from part 8 - 10 (as in the meaning / significance of the theorems).

# 2 Conditional Expectation

From elemental probability classes, for discrete-valued r.v. $ X $ and $ Z $, we know that 
$$ \mathbb{E}(X|Z=z_j) = \sum x_i P(X=x_i | Z=z_j) $$

As such, we can define a random variable $ Y = \mathbb{E}(X|Z) $ such that (informally):
$$ Z(\omega) = z_j \Rightarrow Y(\omega) := \mathbb{E}(X|Z=z_j) = y_j $$
meaning that $ Y(\omega) $ gives the expected value of $ X $ if we observed that $ Z $ takes the value of $ Z(\omega) $.

We notice that $ Y $ takes constant value $ y_j $ on each "atom" $ \\{ Z = z_j \\}  $ of $ Z $. Also,
$$
\begin{align}
  \int_{\\{ Z=z_j \\} } Y dP &= y_jP(Z=z_j) = \sum \limits_{i} x_iP(X=x_i|Z=z_j)P(Z=z_j) \\\\ 
  &= \sum \limits_{i} x_iP(X=x_i;Z=z_j) = \int_{\\{ Z=z_j \\} } X dP
\end{align}
$$
although $ Y $ is constant over constant $ Z $.

As such, we can define conditional expectation in the following way (for discrete and continuous r.v.):

{{<aside title="Definition of Conditional Expectation" type="blue">}}
Let $ X \in L^1 $ be r.v. and $ \mathcal{G} $ be sub σ-algebra, there exists r.v. $ V $ such that:
1. $ V $ is $ \mathcal{G} $-measurable
2. $ V \in L^1 $
3. $ \mathbb{E}(V;G) = \mathbb{E}(X;G) \\; \forall \\; G \in \mathcal{G} $

Such a $ V $ is called a version of the conditional expectation $ \mathbb{E}(X|\mathcal{G}) $. Different $ V $ agree almost everywhere.
{{</aside>}}

{{<aside title="Tower Rule" type="blue">}}
Let $ Z \in L^1 $ be r.v. and $ \mathcal{G} \subseteq \mathcal{H} $ be sub-algebras,
$$ \mathbb{E}(\mathbb{E}(Z|\mathcal{G})|\mathcal{H}) = \mathbb{E}(\mathbb{E}(Z|\mathcal{H})|\mathcal{G}) = \mathbb{E}(Z|\mathcal{G}) $$
{{</aside>}}

# 3 Uniform Integrability
{{<aside title="$ p^{th} $ power uniformly integrable" type="blue">}}
Sequence of r.v. $ X_n $ is $ p^{th} $ power uniformly integrable if
$$ \lim \limits_{c \rightarrow \infty} \sup \limits_{n} \mathbb{E}(|X_n|^p; |X_n| \geq c) = 0 $$

Basically, this definition has some limit on the rate of decay of probability at more extreme values.
{{</aside>}}

Moral of the lesson is that when $ X_n \xrightarrow{P} X $, $ X_n \xrightarrow{L^p} X \Leftrightarrow X_n \\; p^{th}$ power UI 

# 4 Filtrated and Adapted
Before we can understand martingales, we need to introduce the concepts of a filtered space and adapted process.

{{<aside title="Filtered Space" type="blue">}}
A filtered space $ (\Omega, \mathcal{F}, \\{ \mathcal{F}_n, P \\} ) $ has filtration
$$ \\{ \mathcal{F}_n: n \geq 0 \\}  $$ where
$ \mathcal{F}_0 \subseteq \mathcal{F}_1 \subseteq ... \subseteq \mathcal{F} $

Intuitively, at time $ n $, all the information available to us about $ \omega $ are the values of all functions $ Z(\omega) $ which are $ \mathcal{F}_n $ measurable
{{</aside>}}

Usually, $ \\{ \mathcal{F}_n \\}  $ is the **natural filtration** $ \mathcal{F}_n = \sigma(W_0,...,W_n) $ of some **stochastic process** $ W $

{{<aside title="Adapted Process" type="blue">}}
A process (sequence of r.v.) $ X = (X_n : n \geq 0) $ is adapted to filtration $ \\{ \mathcal{F}_n \\}  $ if for each $ n $, $ X_n $ is $ \mathcal{F}_n $ measurable.

Intuitively, if $ X $ is adapted, $ X_n(\omega) $ is known at time $ n $. Usually, $ X_n = f_n(W_0, ..., W_n) $

{{</aside>}}

# 5 Martingales
{{<aside title="Martingale" type="blue">}}
Process $ X $ is a martingale if:
1. $ X $ is adapted
2. $ \mathbb{E}|X_n| < \infty \\; \forall \\; n $
3. $ {\mathbb{E}(X_n | \mathcal{F}\_{n-1})} = X_{n-1} \\; a.s. \quad (n \geq 1)$
{{</aside>}}  

A **supermatingale** has $ {\mathbb{E}(X_n | \mathcal{F}\_{n-1})} \leq X_{n-1} \\; a.s. \quad (n \geq 1)$ (downward drift).

A **submatingale** has $ {\mathbb{E}(X_n | \mathcal{F}\_{n-1})} \geq X_{n-1} \\; a.s. \quad (n \geq 1)$ (upward drift).

**Note**: The (in)equalities generally hold true for any $ n > m $.

# 5.1 Examples of Martingales
1. **Random Walk**: Sum of independent r.v. with mean 0 and in $ L^1 $
2. **Random Product**: Product of independent non-negative r.v. with mean 1
3. **Accumulating Data about r.v.**
4. **Galton Watson Process** (branching process)
5. **Polya's Urn**: At time 0, urn has 1 black and 1 white ball. At each step, a ball is chosen and replaced together with new ball of same colour. Proportion of black ball in the urn is martingale.

# 5.2 Fair Game
In a game, $ X_n - X_{n-1} $ is net winnings per unit stake in game $ n $.

If $ X_n $ is a martingale,
$$ \mathbb{E}(X_n - X_{n-1} | \mathcal{F}_{n-1}) = 0 $$
i.e., the game is fair.

# 6 Previsible Process
We model gambling strategies using previsible / predictable strategy $ C $ where $ C_n $ is $ \mathcal{F}_{n-1} $ measurable (You can only act on the information at time $ n $ by time $ n+1 $).

Imagine $ C_n $ is your stake on game $ n $, your total winnings up to time $ n $ are:
$$ Y_n = \sum \limits_{1 \leq k \leq n} C_k(X_k - X_{k-1}) =: (C \cdot X)_n $$

Note that $(C \cdot X)_0 = 0$ and $ Y_n - Y\_{n-1} = C_n(X\_n - X\_{n-1}) $.

$ C \cdot X $ is called the **martingale transform** of $ X $ by $ C $, which is the discrete analogue of the **stochastic integral** $ \int C dX $.

## 6.1 Can't Beat the System
The following holds true when $ C $ is bounded or when $ C_n, X_n \in L^2 \\; \forall \\;  n $:

If $ C $ is previsible and $ X $ is (super)martingale, then $ (C \cdot X) $ is (super)martingale null at 0.

# 7 Stopping Time
{{<aside title="Stopping Time" type="blue">}}
A map (read r.v.) $ T : \Omega \rightarrow \\{ 0,...,\infty \\}  $ is a stopping time if

$$ \\{ T \leq n \\} = \\{ \omega: T(\omega) \leq n \\} \in \mathcal{F}_n \\; \forall \\; n \leq \infty $$

Intuitively, $ T $ can be decided to be stopping or not stopping at time $ n $ (you cannot look forward to decide / change a stopping decision in the past).
{{</aside>}}

We denote the **stopped process** $ X^T $ as:
$$ X^T_n(\omega) := X_{T(\omega) \wedge n}(\omega) $$
where $ a \wedge b = min(a,b) $ (i.e. value stays constant after stopping).

## 7.1 Stopped Processes
If $ X $ is a (super)martingale and $ T $ is a stopping time, then $ X^T $ is a (super)martingale. In particular for martingale,
$$ \mathbb{E}(X_{T \wedge n}) = \mathbb{E}X_0 \\; \forall \\; n $$

**BUT!!!**, at this point we cannot conclude that $ \mathbb{E}(X_T) = \mathbb{E}X_0 $ without additional conditions (because stopping time might not be well-behaved).

## 7.2 Doob's Optional-Stopping Theorem
{{<aside title="Doob's Optional-Stopping Theorem" type="blue">}}
Let $ T $ be stopping time and $ X $ be martingale. If any of the following holds:

1. $ T $ is bounded
2. $ X $ is bounded and $ T $ is a.s. finite
3. $ \mathbb{E}(T) < \infty $ and for some $ K \in \mathbb{R}^+ $, $ |X_n(\omega) - X_{n-1}(\omega)| \leq K \\; \forall \\; (n,\omega) $

Then,

$ X_T $ is integrable and $ \mathbb{E}(X_T) = \mathbb{E}(X_0) $

(The corresponding conclusion holds for supermartingales)
{{</aside>}}

A **very useful** Corollary states:

If $ M $ is martingale with **bounded increments** and $ C $ is **bounded previsible** process and $ \mathbb{E}(T) < \infty $, then
$$ \mathbb{E}(C \cdot M)_T = 0 $$

## 7.3 Finite Stopping Time
In order to apply the preceding results, we need conditions under which $ \mathbb{E}(T) \leq \infty $:

{{<aside title="Awaiting the Almost Inevitable" type="blue">}}
If for some $ N \in \mathbb{N} $ and $ \varepsilon > 0 $:
$$ P(T \leq n + N | \mathcal{F}_n) > \varepsilon \\; a.s. \\; \forall \\; n \in N $$

Then $ \mathbb{E}(T) \leq \infty $

{{</aside>}}

# 8 Martingale Convergence

{{<aside title="Upcrossing Number till \notin" type="blue">}}
$$ U_N[a,b] := max \\{ k: \\;  \exists \\; 0 \leq s_1 < t_1 < ... < s_k < t_k \leq N \text{ with } X_{s_i} < a, X_{t_i} \\; \forall \\; 1 \leq i \leq k \\} $$

Intuitively, it counts the number of times the process increases from below level $ a $ to above level $ b $ before time $ N $.
{{</aside>}}

{{<aside title="Doob's Upcrossing Lemma" type="blue">}}
If $ X_n $ is a supermartingale,
$$ (b-a)\mathbb{E}U_N[a,b] \leq \mathbb{E}(X_N - a)^- $$

where $ X^- $ equals $ -min(X,0) $
{{</aside>}}

{{<aside title="Doob's Forward Convergence Therorem" type="blue">}}
If $ X_n $ is a supermartingale bounded in $ L^1 $,

$ X_{\infty} := \lim_n X_n $ exists a.s. and is finite

Note that if $ X_n $ is non-negative, $ L^1 $ boundedness is automatic ($ \mathbb{E}|X_n| \leq \mathbb{E}X_0 $).
{{</aside>}}

Sometimes we denote $ \langle X,Y \rangle := \mathbb{E}(XY) $

{{<aside title="$ L^2 $ Convergence" type="blue">}}
An $ L^2 $ martingale $ M_n $ is bounded in $ L^2 $ if and only if $ \sum \limits_{k=1}^{\infty} \mathbb{E}(M_k-M_{k-1})^2 < \infty $. In this case $ M_n \rightarrow M_{\infty} $ a.s. and in $ L^2 $.
{{</aside>}}

# 9 Uniformly Integrable Martingales
If $ M_n $ is uniformly integrable martingale, then $ M_{\infty} $ exists a.s. and in $ L^1 $ and $ M_n = \mathbb{E}(M_{\infty}|\mathcal{F}_n) $ a.s.

{{<aside title="Lévy's Upwards Theorem" type="blue">}}
Let $ \xi \in L^1 $, $ (\mathcal{F}_n)_n $ be a filtration and $ M_n := \mathbb{E}(\xi | \mathcal{F}_n) $,

$ M_n $ is uniformly integrable martingale, $ M_n $ converges a.s. and in $ L^1 $ to a limit $ M_{\infty} $
{{</aside>}}

For independent r.v. where $ \tau_n := \sigma(X_{n+1},...) $, the tail σ-algebra is

$$ \tau := \\bigcap_n \tau_n $$

{{<aside title="Kolmogorov's 0-1 Law" type="blue">}}
The tail σ-algebra of independent r.v. is trivial,

$$ P(F) = 0 \text{ or } 1 \\; \forall \\; F \in \tau $$
{{</aside>}}


{{<aside title="Lévy's Downward Theorem" type="blue">}}
Let $\mathcal{G}\_{-n}, n \geq 1$ be σ-algebras with 
$ \mathcal{G}\_{-n} \subseteq ... \subseteq \mathcal{G}\_{-1} $ and $ \mathcal{G}\_{-\infty} := \bigcap_{n=1}^{\infty} \mathcal{G}\_{-n} $.

Let $ \gamma \in L^1 $ and $ M_{-n} := \mathbb{E}(\gamma|\mathcal{G}_{-n}) $, then

$ M_{-\infty} := \lim_{n \rightarrow \infty} M_{-n} $ exists a.s. and in $ L^1 $ and $ M_{-\infty} = \mathbb{E}(\gamma|\mathcal{G}_{-\infty}) $ a.s.

{{</aside>}}

# 10 Doob's Submartingale Inequality
{{<aside title="Doob's Submartingale Inequality" type="blue">}}
Let $ Z_n \geq 0 $ be a submartingale, then $ \\; \forall \\; c \in \mathbb{R} > 0, n \in \mathbb{Z} > 0 $,

$$ c \cdot P \\{ \sup_{k \leq n} Z_k \geq c \\} \leq \mathbb{E}(Z_n; \sup_{k \leq n} Z_k \geq c) \leq \mathbb{E}Z_n $$
{{</aside>}}