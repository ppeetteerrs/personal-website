---
title: Martingale Theory (Part 5)
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

The content of this part is based on [Martingale Theory Notes](https://people.maths.bris.ac.uk/~mb13434/mart_thy_notes.pdf).

# 2 Conditional Expectation
{{<aside title="Definition of Conditional Expectation" type="blue">}}
Let $ X \in L^1 $ be r.v. and $ \mathcal{G} $ be sub σ-algebra, there exists r.v. $ V $ such that:
1. $ V $ is $ \mathcal{G} $-measurable
2. $ V \in L^1 $
3. $ \mathbb{E}(V;G) = \mathbb{E}(X;G) \\; \forall \\; G \in \mathcal{G} $

Such a $ V $ is called a version of the conditional expectation $ \mathbb{E}(X|\mathcal{G}) $. Different $ V $ agree almost everywhere.
{{</aside>}}

Basically, the third condition is saying that for each event in $ \mathcal{G} $, $ V $ gives the same integral (expected) as $ X $, which is $ \int_G V dP = \int_G X dP $. 

However, at the same time, $ V $ has a pre-image in $ \mathcal{G} $ and hence must differ (in mapping) from $ X $ (which has pre-image from real on $ \Omega \supset \mathcal{G} $).

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

# 4 Martingales and Stopping Times