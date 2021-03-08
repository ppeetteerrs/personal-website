---
title: Basic Probability Theory (Part 4)
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

Having understood some measure theory background, we can easily build the foundations of probability theory. The content of this part is based on [Bristol Notes](https://people.maths.bris.ac.uk/~mb13434/mart_thy_notes.pdf).

# 2 Probability Space
Recall that a measurable space is a triplet $ (\Omega, \mathcal{F}, \mathbb{P}) $. The space is called a **probability space** if $ \mathbb{P}(\Omega) = 1 $ and $ \mathbb{P} $ is a probability measure.

In the probability sense, $ \Omega $ is called the sample space, $ \mathcal{F} $ is the event space, which consists of sets of outcomes closed under complement and countable union (intuitive, right).

Recall also that we can construct a (probability) measure from a simpler pre-measure. We call this pre-measure $ F:\mathbb{R} \rightarrow [0,1] $ a cumulative distribution function defined on sets $ (a,b] $ on $ \mathbb{R} $. This naturally extends to the Lebesgue-Stieltjes measure on $ (\mathbb{R}, \mathcal{B}(\mathbb{R})) $ with $ \mathbb{P} = F(b) - F(a)$

## 2.1 Random Variable
A random variable in probability theory is a **measurable function** $ X:\Omega to \mathbb{R}$. Apparently, it inherits all properties of measurable functions:

A simple r.v. is $X(\omega) = \sum \limits_{k=1}^{\infty}x_k \cdot 1_{A_k}(\omega)$ where $ 1_A(\omega) $ is the indicator function.

Since an r.v. is a measurable function, there exists a sequence of simple r.v. that converges to any r.v. X (in a rough sense).

## 2.2 Expected Value