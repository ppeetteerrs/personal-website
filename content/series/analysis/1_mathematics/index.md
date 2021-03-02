---
title: What is Maths? (Part 1)
date: 2021-02-18
categories:
  - Maths
tags:
  - maths
  - real analysis
type: book
weight: 10
---

# 1 Introduction

## 1.1 Why
Throughout high school / college education, we are mostly taught to **apply** maths theorems to **solve** problems. However, we seldom wonder how these theorems come out, or the nature of the mathematics symbols (e.g. real numbers / complex numbers / probabilities) that we are trained to work with.

For example, we are told that $\int_{-\infty}^{\infty}\delta(t)dt = 1$ without knowing why it is true. Or that $\frac{\partial}{\partial t}u(t) = \delta(t)$ without wondering why is a discontinuous function differentiable.

Although the whole point of mathematics is to prove theorems once such that engineers / applied mathematicians can apply without second thought, having a sense of the though process / assumption behind major mathematical results is helpful for our understanding.

## 1.2 What
Having understood why we should develop a deeper understanding of maths, the question now comes to what is mathematics.

At its root, mathematics is just logic (i.e. true / false statements). Given a number of consistent axioms (things that we agree to be true, and does not contradict each other), we deduce useful results.

As to what constitutes logic (i.e. when does one statement implies that another is true), we have the language of mathematical logic. Primarily, in ascending order of complexity, it consists of propositional logic, predicate logic (first-order logic) and second-order logic. The exact distinction between each tier is irrelevant but the concepts are important. Refer to this link to learn about [logic](https://leanprover.github.io/logic_and_proof/propositional_logic.html).

## 1.3 Abstraction, Foundation of Mathematics
Some people might believe that mathematics is built based on axioms. Usefult theorems are proved by adding structure (aka more axioms) to existing structures. E.g. we start with Topology where there is just an abstract notion of open sets (duhh), to which we add a sense of distance between objects to form a metric space. Subsequently, we define even stronger structures such as normed spaces and vector spaces to derive even more desirable properties. Personally, I find this viewpoint very confusing.

To me, mathematics goes from the bottom up. For example, we start with our notion of real numbers (assumed that we have somehow constructed the reals). Together with the reals, we have our familiar notion of length, distance, open sets and closed sets. In elementary real analysis, we learnt about the boring properties of the real numbers, such as:
- arithmetic rules
- notion of a limit
- convergent sequence
- differentiation
- integration

However, we come to realize that all these properties come from separate (possibly overlapping) sets of assumptions. For example, the notion of distance gives rise to the notion of convergence, continuity and closeness. As such we go up the abstraction ladder to investigate the theorems that can be proved using only a notion of distance (i.e. metric spaces). Which we then further relax to just a set of open sets (i.e. topology).

Similarly, the notion of length allowed for a rigourous derivation of the theorems of calculus (in particular, integration). As such, we abstract the notion of lengths to form the measureable spaces.

By this time you might be wondering, why should we bother abstracting properties away if we are only working with real numbers. While it is true that some abstractions in mathematics find very little / no practical use (e.g. what good does a general topological structure do). However, some abstractions are helpful in a sense that they provide shared properties between different mathematical entities. E.g. you can work with the reals and complex numbers almost identically because they have some shared algebraic structure.

# 2 Ɛ-δ Notion
> "... there is a tradeof between the type of approximation one is willing to bear, and the type of things one can say about the approximation." - An Introduction to Measure Theory Remark 1.2.17 (Terence Tao )
One of the most important concept to grasp when studying analysis is the Ɛ-δ notation. To many students (and the once naive me), the Ɛ-δ analysis is a method to visualize the approaching of a limit (point).

The confusion here is that the Ɛ-δ notation here is **not a way to visualize** the approaching of a limit, it is inside **the definition** of a limit (or other concepts such as measurability). A limit is defined using the Ɛ-δ phrasing to create "an epsilon of room" (in Terence's words).

Now you might be wondering, why do we need this "epsilon of room". Firstly, ask yourself, when do we every need limits, or convergent sequences (aka stuff that contains the concept of approaching and making infinitely more precise approximations, or simply concepts defined using the Ɛ-δ notation).

If we are working with simple, easy-to-define objects such as the natural numbers, we don't need any notion of limits. Limits first come in when we want to introduce real numbers, which is when we want to extend the arithmetic for **countable** rational numbers to **uncountable** real numbers. 

However, how do we construct new objects from a set of existing objects? We do so by infinitely approaching a non-existent (in the intuitive sense) object. Hence, we come up with the Ɛ-δ definition of a limit point and define the real numbers are defined as the set of limit points of sequences of rational numbers (roughly). And TADA! We realize that all our laws of arithmetic are preseved under this definition of limit. e.g. $\lim \limits_{i \rightarrow \infty} (a_i + b_i) = \lim \limits_{i \rightarrow \infty} a_i + \lim \limits_{i \rightarrow \infty} b_i$

Imagine if we defined a limit point without the room of epsilon (room of epsilon, btw means we accept an infinitestimally small but positive error that needs to fo infinitely towards zero). Then the notion of a limit point is useless because every limit point is already contained inside our existing set of objects, and there is no need to extend any theorems or properties.

Other cases where the Ɛ-δ definition is used includes convergence of a functions to stepwise / continuous function, or convergence of measureable spaces to open / closed sets. These convergences (possible thanks to the Ɛ-δ way of definition), allows the extension of theorems from simpler objects to less well-behaved objects.