---
title: Robotics and Automation – Inverse Kinematics (Part 3)
date: 2020-10-24T04:51:42+00:00
showToc: true
TocOpen: false
draft: false
hidemeta: false
disableShare: false
categories:
  - Courses
  - Electrical Engineering
tags:
  - courses
  - ee4268
  - ntu
  - robotics
series:
  - Robotics and Automation
---

# 1 The Inverse Kinematics Problem

<div class="wp-block-image">
  <figure class="aligncenter size-large"><a href="https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/12-2.png?ssl=1"><img loading="lazy" width="452" height="239" src="https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/12-2.png?resize=452%2C239&#038;ssl=1" alt="" class="wp-image-1300" srcset="https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/12-2.png?w=452&ssl=1 452w, https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/12-2.png?resize=300%2C159&ssl=1 300w, https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/12-2.png?resize=320%2C169&ssl=1 320w" sizes="(max-width: 452px) 100vw, 452px" data-recalc-dims="1" /></a><figcaption>Inverse kinematics problem</figcaption></figure>
</div>

Given a desired position $p$ and orientation $R$ of the tool, find the values for the join variables $q$ which satisfy the arm equation $T_{base}^tool(q)$.

# 2 General Properties of Solutions

<div class="wp-block-katex-display-block katex-eq" data-katex-display="true">
  <pre>T_{base}^{tool}(q) = \begin{bmatrix} R_{11} & R_{12} & R_{13} & p_1 \\ R_{21} & R_{22} & R_{23} & p_2 \\ R_{31} & R_{32} & R_{33} & p_3 \\ 0 & 0 & 0 & 1\end{bmatrix}</pre>
</div>

- Existence of Solutions
  - desired position outside work envelope
    - no solution
  - desired position within work envelope
    - some solutions might violate one or more joint variable limits
    - equations and unknowns
      - arm equation constitutes a system of 12 simultaneous nonlinear algebraic equations in the n unknown components of q ($R\_{11}$ to $R\_{33}$)
      - but given 6 constraints: 3 pairs of orthogonality ($r\_i \cdot r\_j=0$), 3 unit vectors ($||r_j||=1$)
      - hence, overall 6 nonlinear equations for n unknowns. To achieve general manipulation, $n \ge 6$
      - but still, no guarantee that a closed-form expression exist
    - lower bound on number of axes n necessary but not sufficient condition for existence of solution
- Uniqueness of solution
  - there can be unique solutions even if the robot is not kinematically redundant

# 3 Tool Configuration

- we only need 6 variables to represent 6 d.o.f.
- Tool Configuration Vector:
  - Tooltip position: translation vector $p$
  - Using approach vector (last row of $R$), we can specify tool yaw and pitch angle (except from roll)
  - Encode tool roll information ($q_n$) by scaling approach vector (since approach vector is unit vector)
    - $f(q\_n)=e^{q\_n/\pi}$
- $w=\begin{pmatrix} w^1 \\ w^2 \end{pmatrix}=\begin{pmatrix} p \\ exp(q_n/\pi)*r^3 \end{pmatrix} \in \real^6$

# 4 Examples

## 4.1 Five-Axis Articulated Robot

<div class="wp-block-image">
  <figure class="aligncenter size-large"><img loading="lazy" width="371" height="191" src="https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-8.png?resize=371%2C191&#038;ssl=1" alt="" class="wp-image-1303" srcset="https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-8.png?w=371&ssl=1 371w, https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-8.png?resize=300%2C154&ssl=1 300w, https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-8.png?resize=320%2C165&ssl=1 320w" sizes="(max-width: 371px) 100vw, 371px" data-recalc-dims="1" /><figcaption>Five-axis articulated robot</figcaption></figure>
</div>

- Tool configuration
  - $R\_{13}p\_2=R\_{23}p\_1$
  - $w= \begin{bmatrix} w\_1 \\ w\_2 \\ w\_3 \\ \beta w\_1 \\ \beta w\_2 \\ w\_6 \end{bmatrix}$

## 4.2 Four-Axis SCARA Robot

<div class="wp-block-image">
  <figure class="aligncenter size-large"><img loading="lazy" width="272" height="143" src="https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/3-5.png?resize=272%2C143&#038;ssl=1" alt="" class="wp-image-1304" data-recalc-dims="1" /><figcaption>Four-axis SCARA robot</figcaption></figure>
</div>

<div class="wp-block-image">
  <figure class="aligncenter size-large"><img loading="lazy" width="418" height="375" src="https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/2-5.png?resize=418%2C375&#038;ssl=1" alt="" class="wp-image-1305" srcset="https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/2-5.png?w=418&ssl=1 418w, https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/2-5.png?resize=300%2C269&ssl=1 300w, https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/2-5.png?resize=320%2C287&ssl=1 320w" sizes="(max-width: 418px) 100vw, 418px" data-recalc-dims="1" /><figcaption>Link coordinates</figcaption></figure>
</div>

- Tool Configuration

  - $r\_3 = -i\_3$
  - $w=\begin{bmatrix} p\_1 \\ p\_2 \\ p\_3 \\ 0 \\ 0 \\ -e^{\frac{q\_4}{\pi}} \end{bmatrix} = \begin{bmatrix} a\_1C\_1 + a\_2C\_{1-2} \\ a\_1S\_1 + a\_2S\_{1-2} \\ d\_1-q\_3-d\_4 \\ 0 \\ 0 \\ -e^{\frac{q\_4}{\pi}} \end{bmatrix}$

- Inverse Kinematics
  - $q\_2=\pm arccos \frac{w\_1^2 + w\_2^2 &#8211; a\_1^2 &#8211; a\_2^2}{2a\_1a_2}$
    - left-handed vs right-handed solutions
  - $q\_1=atan2[a\_sS\_2w\_1 + (a\_1 + a\_2C\_2)w\_2, (a\_1+a\_2C\_2)w\_1-a\_2S\_2w_1]$
  - $q\_3=d\_1-d\_4-w\_3$
  - $q\_4=\pi \ln |w\_6|$

<div class="wp-block-image">
  <figure class="aligncenter size-large"><img loading="lazy" width="601" height="164" src="https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/4-4.png?resize=601%2C164&#038;ssl=1" alt="" class="wp-image-1306" srcset="https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/4-4.png?w=601&ssl=1 601w, https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/4-4.png?resize=300%2C82&ssl=1 300w, https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/4-4.png?resize=580%2C158&ssl=1 580w, https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/4-4.png?resize=320%2C87&ssl=1 320w" sizes="(max-width: 601px) 100vw, 601px" data-recalc-dims="1" /><figcaption>Arctan function</figcaption></figure>
</div>

# 5 Robot Work Cell

Transformation matrix can also be applied more generally to coordinate transformation between various stations in robotic cell (e.g. from camera coordinates to base coordinates)

## 5.1 Example

<div class="wp-block-image">
  <figure class="aligncenter size-large"><img loading="lazy" width="324" height="205" src="https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/5-3.png?resize=324%2C205&#038;ssl=1" alt="" class="wp-image-1307" srcset="https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/5-3.png?w=324&ssl=1 324w, https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/5-3.png?resize=300%2C190&ssl=1 300w, https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/5-3.png?resize=320%2C202&ssl=1 320w" sizes="(max-width: 324px) 100vw, 324px" data-recalc-dims="1" /><figcaption>Robot work cell</figcaption></figure>
</div>

- $T_{camera}^{part}= \begin{bmatrix} 0 & -1 & 0 & 0 \\ -1 & 0 & 0 & -5 \\ 0 & 0 & -1 & 19 \\ 0 & 0 & 0 & 1 \end{bmatrix}$
- $T_{camera}^{base} = \begin{bmatrix} 0 & -1 & 0 & 15 \\ -1 & 0 & 0 & 25 \\ 0 & 0 & -1 & 20 \\ 0 & 0 & 0 & 1 \end{bmatrix}$
- $T\_{base}^{part}=T\_{base}^{camera}T_{camera}^{part}=\begin{bmatrix} 1 & 0 & 0 & 30 \\ 0 & 1 & 0 & 15 \\ 0 & 0 & 1 & 1 \\ 0 & 0 & 0 & 1 \end{bmatrix}$
- $T_{base}^{grasp}=\begin{bmatrix} 1 & 0 & 0 & 30 \\ 0 & -1 & 0 & 15 \\ 0 & 0 & -1 & 1 \\ 0 & 0 & 0 & 1 \end{bmatrix}$
