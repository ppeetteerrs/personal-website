---
title: Robotics and Automation – Workspace Analysis and Trajectory Planning (Part 4)
date: 2020-10-24T05:01:23+00:00
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

# 1 Joint-Space Work Envelop

- Let $q^{min}$ and $q^{max}$ be vectors in $\real^m$ denoting joint limits and let $C$ be an $m \times n$ joint coupling matrix. Then the set of all values that the joint variables $q$ can assume is called the join-space work envelope
- $Q = \{q \in \real^n : q^{min} \le Cq \le q^{max}\}$
- total work envelope $Y$: reachable in at least one tool orientation
  - $Y=\{p(q) \in \real^3: q\in Q\}$
  - Can also generate a family of work envelope $\{Y(w^2)\}$ for each tool orientation, such that once orientation is decided, we know the work envelop
- dexterous work envelope $Y_d$: reachable in any arbitrary orientation

## 1.1 Four-Axis SCARA Robot

<div class="wp-block-image">
  <figure class="aligncenter size-large"><img loading="lazy" width="356" height="303" src="https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-9.png?resize=356%2C303&#038;ssl=1" alt="" class="wp-image-1315" srcset="https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-9.png?w=356&ssl=1 356w, https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-9.png?resize=300%2C255&ssl=1 300w, https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-9.png?resize=320%2C272&ssl=1 320w" sizes="(max-width: 356px) 100vw, 356px" data-recalc-dims="1" /><figcaption>Link coordinates</figcaption></figure>
</div>

<div class="wp-block-columns">
  <div class="wp-block-column">
    <div class="wp-block-image">
      <figure class="aligncenter size-large"><img loading="lazy" width="327" height="179" src="https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/3-6.png?resize=327%2C179&#038;ssl=1" alt="" class="wp-image-1316" srcset="https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/3-6.png?w=327&ssl=1 327w, https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/3-6.png?resize=300%2C164&ssl=1 300w, https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/3-6.png?resize=320%2C175&ssl=1 320w" sizes="(max-width: 327px) 100vw, 327px" data-recalc-dims="1" /><figcaption>Work envelop</figcaption></figure>
    </div>
  </div>
  
  <div class="wp-block-column">
    <div class="wp-block-image">
      <figure class="aligncenter size-large"><img loading="lazy" width="276" height="223" src="https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/5-4.png?resize=276%2C223&#038;ssl=1" alt="" class="wp-image-1317" data-recalc-dims="1" /><figcaption>Actual work envelop</figcaption></figure>
    </div>
  </div>
</div>

- Work envelope
  - $w(q) = \begin{bmatrix} a\_1C\_1 + a\_2C\_{1-2} \\ a\_1S\_1 + a\_2S\_{1-2} \\ d\_1 &#8211; q\_3 &#8211; d\_4 \\ 0 \\ 0 \\ -exp(\frac{q\_4}{\pi}) \end{bmatrix}$
  - $\begin{bmatrix} -\pi \\-\pi + \beta \\ h \\ -\pi \end{bmatrix} \le \begin{bmatrix} 1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}q \le \begin{bmatrix} \pi \\ \pi &#8211; \beta \\ H \\ \pi \end{bmatrix}$
    - Maximum horizontal reach: $r\_{max} = a\_1 + a_2$
    - Minimum horizontal reach: $r\_{min}^2=a\_1^2 + a\_2^2 &#8211; 2a\_1a_2\cos\beta$
    - Maximum vertical reach: $d\_1 &#8211; d\_4 &#8211; h$
    - Minimum vertical reach: $d\_1 &#8211; d\_4 &#8211; H$

# 2 Workspace Fixtures

e.g. part feeders to present parts to the robot, transport devices to move parts from one robotic work cell to another, part-holding devices used in robotic assembly tasks\

## 2.1 Four-Axis SCARA Robot

<div class="wp-block-image">
  <figure class="aligncenter size-large"><img loading="lazy" width="677" height="176" src="https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-10.png?resize=677%2C176&#038;ssl=1" alt="" class="wp-image-1319" srcset="https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-10.png?w=677&ssl=1 677w, https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-10.png?resize=300%2C78&ssl=1 300w, https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-10.png?resize=580%2C151&ssl=1 580w, https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-10.png?resize=320%2C83&ssl=1 320w" sizes="(max-width: 677px) 100vw, 677px" data-recalc-dims="1" /><figcaption>Illustration</figcaption></figure>
</div>

- To overcome gravity
  - $\beta > atan2(\mu , 1)$
- Orientation matrix
  - $r^3=[S\_\beta, 0, -C\_\beta]^T$
  - $r^2=\pm i^2$
  - $R=(r^1,r^2,r^3) = \begin{bmatrix} C\_\beta & 0 & S\_\beta \\ 0 & -1 & 0 \\ S\_\beta & 0 & -C\_\beta\end{bmatrix}$

<div class="wp-block-image">
  <figure class="aligncenter size-large"><img loading="lazy" width="319" height="182" src="https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/2-6.png?resize=319%2C182&#038;ssl=1" alt="" class="wp-image-1320" srcset="https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/2-6.png?w=319&ssl=1 319w, https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/2-6.png?resize=300%2C171&ssl=1 300w" sizes="(max-width: 319px) 100vw, 319px" data-recalc-dims="1" /><figcaption>Position vector</figcaption></figure>
</div>

- $p=[f+\frac{c(C\_\beta &#8211; S\_\beta)}{2}, 0, \frac{c(S\_\beta + C\_\beta)}{2}]^T$

# 3 Fixed Tools

since most robots are one-handed, special work-holding fixtures are needed to secure the subassembly at a workstation (e.g. a bolt holding to screw a nut onto)

## 3.1 Example

<div class="wp-block-image">
  <figure class="aligncenter size-large"><img loading="lazy" width="368" height="282" src="https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-11.png?resize=368%2C282&#038;ssl=1" alt="" class="wp-image-1322" srcset="https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-11.png?w=368&ssl=1 368w, https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-11.png?resize=300%2C230&ssl=1 300w, https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-11.png?resize=320%2C245&ssl=1 320w" sizes="(max-width: 368px) 100vw, 368px" data-recalc-dims="1" /><figcaption>Fixed tool example</figcaption></figure>
</div>

- $r^3=-i^3$
- Supposed it takes time $T$ to roll one complete orientation and the bolt thread is $\rho$ threads per millimeter, in bolt frame $B={x^b, y^b, z^b}$
  - $\phi(t) = \frac{2\pi t}{T}$
  - $\lambda(t)=\frac{t}{\rho T}mm$
  - total threading time $t=b\rho T$ (for b millimeters thread)
  - $T_{bolt}^{thread}(t) = Rot[\phi(t), 3]Tran[\lambda(t)i^3], 0 \le t \le b \rho T$
  - $T_{base}^{bolt} = \begin{bmatrix} 0 & 1 & 0 & r \\ 1 & 0 & 0 & 0 \\ 0 & 0 & -1 & h \\ 0 & 0 & 0 & 1\end{bmatrix}$
  - $T\_{base}^{thread}(t)=T\_{base}^{bolt}T_{bolt}^{thread}(t)$
  - $T\_{base}^{thread}(t)=T\_{base}^{bolt}Rot[\phi(t), 3]Tran[\lambda(t)i^3]$
  - $T\_{base}^{thread}(t)=\begin{bmatrix} S\_{2\pi t/T} & C\_{2\pi t/T} & 0 & r \\ C\_{2\pi t/T} & -S_{2\pi t/T} & 0 & 0 \\ 0 & 0 & -1 & h &#8211; t/ \rho T \\ 0 & 0 & 0 & 1 \end{bmatrix}$

# 5 Pick and Place Operation

**Pick**

<div class="wp-block-image">
  <figure class="aligncenter size-large"><img loading="lazy" width="215" height="172" src="https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-12.png?resize=215%2C172&#038;ssl=1" alt="" class="wp-image-1323" data-recalc-dims="1" /><figcaption>Pick</figcaption></figure>
</div>

$T_{base}^{pick} = \begin{bmatrix} R^{pick} & p^{pick} \\ 0 & 1\end{bmatrix}$

**Lift**

<div class="wp-block-image">
  <figure class="aligncenter size-large"><img loading="lazy" width="353" height="176" src="https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/2-7.png?resize=353%2C176&#038;ssl=1" alt="" class="wp-image-1324" srcset="https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/2-7.png?w=353&ssl=1 353w, https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/2-7.png?resize=300%2C150&ssl=1 300w, https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/2-7.png?resize=320%2C160&ssl=1 320w" sizes="(max-width: 353px) 100vw, 353px" data-recalc-dims="1" /><figcaption>Lift</figcaption></figure>
</div>

$T_{base}^{lift} = \begin{bmatrix} R^{pick} & p^{pick} &#8211; vR^{pick}i^3 \\ 0 & 1\end{bmatrix}$

**Place**

<div class="wp-block-image">
  <figure class="aligncenter size-large"><img loading="lazy" width="332" height="140" src="https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/3-7.png?resize=332%2C140&#038;ssl=1" alt="" class="wp-image-1325" srcset="https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/3-7.png?w=332&ssl=1 332w, https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/3-7.png?resize=300%2C127&ssl=1 300w, https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/3-7.png?resize=320%2C135&ssl=1 320w" sizes="(max-width: 332px) 100vw, 332px" data-recalc-dims="1" /><figcaption>Place</figcaption></figure>
</div>

- $d^{place} = d^{pick}$
- $p^{place}\_3 = p^{pick}\_3$
- If stacking of height $h^{stack}$
  - $p^{place}\_3 = h^{stack} + p^{pick}\_3$
  - $h^{stack} = h^{stack} + 2p^{pick}_3$

**Set-down**

$T_{base}^{set} = \begin{bmatrix} R^{place} & p^{place} &#8211; vR^{place}i^3 \\ 0 & 1\end{bmatrix}$

**Speed Variation**

<div class="wp-block-image">
  <figure class="aligncenter size-large"><img loading="lazy" width="360" height="251" src="https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/4-5.png?resize=360%2C251&#038;ssl=1" alt="" class="wp-image-1326" srcset="https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/4-5.png?w=360&ssl=1 360w, https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/4-5.png?resize=300%2C209&ssl=1 300w, https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/4-5.png?resize=320%2C223&ssl=1 320w" sizes="(max-width: 360px) 100vw, 360px" data-recalc-dims="1" /><figcaption>Speed variation</figcaption></figure>
</div>

# 6 Continuous-path Motion

required in those applications where the tool must follow a specific path between points in the workspace

## 6.1 Tool Trajectory

- Let $\Gamma$ be a curve in tool-configuration space $\real^6$ and let $s(t)$ be a differentiatble speed distribution function mapping $[0,T]$ into $[0,1]$, with $s(0)=0$ and $s(T)=1$ Then the tool trajectory associated with $\{\Gamma,s\}$ is defined
- $\Gamma = \{w(\lambda) \in \real^6 : 0 \le /lambda \le 1\}, 0 \le t \le T$
- $\lambda = s(t)$ (normalised path length parameter)
- $\dot{s}(t)$ is instantaneous speed
- To determine required joint rates, just differentiate closed-form inverse kinematics equations (if available)

## 6.2 Four-Axis SCARA Robot

- $\dot{q\_2} = \mp \frac{2(w\_1\dot{w\_1} + w\_2\dot{w\_2})}{[(2a\_1a\_2)^2-(w\_1^2+w\_2^2-a\_1^2-a_2^2)^2]^\frac{1}{2}}$
- $\dot{q\_1}=\frac{b\_1\dot{b\_2}-b\_2\dot{b\_1}}{b\_1^2+b_2^2}$
- $\dot{q\_3}=-\dot{w\_3}$
- $\dot{q\_4} = \frac{\pi\dot{w\_6}}{w_6}$

## 6.3 Interpolated Motion

In many cases, path might be specified as know points along a path

### 6.3.1 Cubic Polynomial Paths

- In the case of 2 knot points $$\{w^0,w^1\}$$
- $w(t) = at^3 + bt^2 + ct + d$
  - $a=\frac{T(v^1+v^0)-2(w^1-w^0)}{T^3}$
  - $b=\frac{[T(v^1+2v^0)-3(w^1-w^0)]}{T^2}$
  - $c=v^0$
  - $d=w^0$
- two d.o.f. specifies initial positions, other 2 d.o.f specify velocities $v^0, v^1$ (necessary to connect more than 2 knot points)

### 6.3.2 More than 2 Know Points

- **More than 2 Knot Points** #method
  - Cubic polynomial
    - take adjacent cubic polynomial segments and spline them together by requiring that the velocity and acceleration be continuous at the segment boundaries
  - Linear interpolation
    - use piece-wise linear interpolation between knot points
  - Linear interpolation with parabolic blends \*<img src="https://i1.wp.com/firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Fppeetterrs%2FGUdZAr3Boz.png?w=720&#038;ssl=1" data-recalc-dims="1" />
    - $$w(t) = \frac{a(t-T\_1 + \Delta T)^2}{2} + b(t-T\_1+\Delta T) + c$$
      - $$a=\frac{T\_1 \Delta w^2-T\_2 \Delta w^1}{2T\_1T\_2 \Delta T}$$
      - $$b=\frac{w^1-w^0}{T_1}$$
      - $$c=w^1 &#8211; \frac{\Delta T}{T_1}(w^1 &#8211; w^0)$$

<div class="wp-block-image">
  <figure class="aligncenter size-large"><img loading="lazy" width="293" height="196" src="https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-13.png?resize=293%2C196&#038;ssl=1" alt="" class="wp-image-1330" data-recalc-dims="1" /><figcaption>Linear interpolation with parabolic blends</figcaption></figure>
</div>

### 6.3.3 Straight-Line Motion

- In general, if $n<6$, tool tip cannot follow arbitraty straight-line path in $\real^6$
- Bounded deviation
  - select $\epsilon > 0$ and use inverse kinematics to compute $\{q^0,q^1\}$ associated with $\{w^0, w^1\}$
  - compute the joint-space midpoint $q^m = \frac{q^0 + q^1}{2}$
  - use $q^m$ and $w$ to compute the associated tool-configuration space midpoint $w^m = w(q^m)$
  - compute the exact tool-configuration space midpoint $w^M = \frac{w^0+w^1}{2}$
  - if deviation $||w^m &#8211; w^M|| \le \epsilon$, then stop, else, insert $w^M$ as know point between $w^0$ and $w^1$ and recursively apply algorithm
