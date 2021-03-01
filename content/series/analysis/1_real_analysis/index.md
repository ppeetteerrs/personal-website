---
title: The Natural Numbers (Part 1)
date: 2020-10-24
categories:
  - Maths
tags:
  - maths
  - real analysis
  - natural numbers
type: book
weight: 10
---

# 1 Preface

This series is a collection of my own understanding of the important concepts and topics in mathematical analysis. Since I am not pursuing a mathematics major, I do not intend to be 100% rigorous in proving and deducing theorems. The focus of this series will be on my personal understanding and intuition behind such concepts.

# 2 Natural Numbers

To begin our journey into the world of mathematics, we first have to learn how to count. To learn how to count, we first need to construct a set of abstract objects called the natural numbers. There are more than one way to define the natural numbers, but they all serve to introduce the same logical (or mathematical) properties to these objects. We will be defining the natural numbers using the **Peano Axioms**.

## 2.1 Peano Axioms

### 2.1.1 0 is a natural number

The number \***\*, together with the increment operation **++**, are the two fundamental concepts we will use to define the natural numbers. So, the first axiom states the fact that an abstract symbol \*\***, is part of the set of natural numbers. The form or shape of the symbol itself does not matter at all, but it has to be assigned to every definition of natural number. As it will later turn out, this symbol \*\*\*\* will be the &#8220;smallest&#8221; natural number (which naturally serves as a start point to construct the set).

### 2.1.2 If n is a natural number, then n++ is also a natural number (i.e. closed under ++)

Next, we make use of the increment operation **++** to construct the other natural numbers. We introduce an operation **++**, which, when applied to a natural number, gives another natural number. So far, the definition of the natural numbers seem pretty intuitive. We start from an arbitrary symbol \***\*, and increment it to get another symbol which belongs to the natural numbers. However, we have to ask ourselves, are these two rules sufficient to fulfil our purpose of counting? **No!** There are two obvious issues here. Notice that we never explicitly define how the **++\*\* operation actually behaves. As such, it either go in a loop (i.e. $\exists n \in \mathbb{N} \ni \text{n++ is 0}$), or stop incrementing (i.e. $\exists n \in \mathbb{N} \ni \text{n++ is n}$). This leads us to the following 2 axioms.

### 2.1.3 0 is not the successor of any natural number

### 2.1.4 Different natural numbers must have different successors (i.e. ++ is injective)

The &#8220;mathematician's&#8221; way of defining the two axioms in symbols is easy, so I will not include them here. So far, we have ensured from the first four axioms that we can construct a set of distinct symbols called the natural numbers using only the symbol \***\* and the operation **++**. However, there is still a problem: how do we avoid &#8220;rogue&#8221; elements, or any alien symbols from being part of the natural number set? (You have to realise that elements in the natural number set do not necessarily have to be &#8220;constructed&#8221; from scratch using the symbol \*\*** and adding in elements one by one). E.g. the natural numbers can be the set (where we use the conventional symbols 2=1++=(0++)++ etc.):

$$ \mathbb{N} :=\{\star, 0, 1, 2, 3, 4, 5, 6, ...\}$$

This set will satisfy all the first four axioms, just that it has a star that is inside the set that popped up from nowhere. The next axiom introduces a clever way to avoid this issue.

### 2.1.5 Principle of mathematical induction

**Principle of mathematical induction:** Let P (n) be any property pertaining to a natural number n. Suppose that P(0) is true, and suppose that whenever P (n) is true, P (n++) is also true. Then P (n) is true for every natural number n.

$$ P(0) \land (\forall n \;P(n) \implies P(n++)) \implies \forall n \; P(n)$$

This axiom is actually an axiom schema that gives rise to an infinite number of axioms. By being ambiguous with what &#8220;property&#8221; means, this axiom essentially avoids the situation mentioned in the previous paragraph.

Think back to the time when you formed cliches in school and bullied other students. You (who is the symbol \***\*) first form a cliche with your close friends (i.e., the symbols created by incrementing \*\***) and called yourselves the TFBoys. Then, in order to prevent other unworthy beings from entering the group, you use the principle of mathematical induction and introduce this &#8220;property&#8221;: any new members of TFBoys have to be existing members when TFBoys was first formed (i.e., constructed using \***\*). This seemingly stupid property essentially prevents any new symbols, other than those constructed using **0** and **++\*\* to be part of the natural numbers (or TFBoys).

### 2.1.6 Other Axioms

There are also four axioms describing the equality relation but usually not considered to be part of the &#8220;Peano Axioms&#8221;. They are logically valid in first-order logic with equality, and hence should instead be part of mathematical logic (i.e. definition of what the word &#8220;equal&#8221; or the symbol **=** means).

<ul start="2">
  <li>
    Equality is reflexive
  </li>
  <li>
    Equality is symmetric
  </li>
  <li>
    Equality is transitive
  </li>
  <li>
    Natural numbers are closed under equality
  </li>
</ul>

## 2.2 Arithmetics

We now move on to properly definition of different arithmetic operations on the natural numbers. Keep in mind that all these fancy symbols (**+, - , ×, ÷** etc.) do not introduce anything new by definitions. They are just symbols which represent the result / relationships resulted from a sequence of increment operations. Also, all the properties of these operations are mere logical derivations using the axioms defined above. I am not going to go through the proves and derivation of the properties of these simple operations as they are simple and familiar to everyone.

### 2.2.1 Addition

**Addition:** Let $m$ be a natural number. To add zero to $m$, we define $0+m:= m$. Now suppose inductively that we have defined how to add $n$ to $m$. Then we can add $n++$ to $m$ by defining $(n++)+m:=(n+m)++$.

Using the addition operation, we can also order the natural numbers:

**Ordering of the natural numbers:** Let $n$ and $m$ be natural numbers. We say that $n$ is greater than or equal to $m$, and write $n ≥ m$ or $m ≤ n$, iff we have $n = m + a$ for some natural number $a$. We say that $n$ is strictly greater than $m$, and write $n > m$ or $m < n$, iff $n ≥ m$ and $n = m$.

With the ordering in mind, we can also obtain a stronger version of the principle of induction:

**Strong principle of induction:**. Let $m\_0$ be a natural number, and let $P (m)$ be a property pertaining to an arbitrary natural number $m$. Suppose that for each $m ≥ m\_0$, we have the following implication: if $P(m)$ is true for all natural numbers $m\_0 ≤ m < m$, then $P(m)$ is also true. Then we can conclude that $P(m)$ is true for all natural numbers $m ≥ m\_0$

### 2.2.2 Multiplication

**Multiplication of natural numbers:** Let m be a natural number. To multiply zero to $m$, we define $0 \times m := 0$. Now suppose inductively that we have defined how to multiply $n$ to $m$. Then we can multiply $n++$ to $m$ by defining $(n++) \times m := (n \times m) + m$.

With multiplication defined, we can then move on to exponentiation.

**Exponentiation for natural numbers:** Let $m$ be a natural number. To raise $m$ to the power 0, we define $m^0 := 1$; in particular, we define $0^0 := 1$. Now suppose recursively that $m^n$ has been defined for some natural number $n$, then we define $m^n++ := m^n \times m$.
