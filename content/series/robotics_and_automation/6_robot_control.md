---
title: Robotics and Automation – Robot Control (Part 6)
date: 2020-10-24T07:39:21+00:00
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

# 1 Overview

When it comes to robotics, the ultimate goal of building direct and inverse kinematic models is to be able to control the motion of the robot as precisely as possible. In an ideal world where the direct kinematic model is 100% accurate and the inverse kinematic model can be solved analytically, an open system can control the robot arm perfectly.

## 1.1 Feedback Control System

However, in real life, the kinematic model (and transfer functions from motor input to joint position outputs) are just approximations. Hence, **feedback**, or measurements of the actual output, is necessary for us to achieve the desired output. A typical robotic feedback control system takes the following form:

<div class="wp-block-image">
  <figure class="aligncenter size-large"><img loading="lazy" width="572" height="216" src="https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-16.png?resize=572%2C216&#038;ssl=1" alt="" class="wp-image-1347" srcset="https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-16.png?w=572&ssl=1 572w, https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-16.png?resize=300%2C113&ssl=1 300w, https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-16.png?resize=320%2C121&ssl=1 320w" sizes="(max-width: 572px) 100vw, 572px" data-recalc-dims="1" /><figcaption>Feedback control system</figcaption></figure>
</div>

The system takes the desired robot position and velocity as input and translates them into joint coordinates. A control system then takes the joint coordinates (and their derivatives), together with the measured output, as an input and output the corresponding inputs to the robot (i.e. motors) to achieve the desired joint coordinate values.

Since errors come from both the models and external disturbances, a good controller must be able to reject disturbances.

## 1.2 Motion Control Schemes

Classical control theory has always been focused on linear systems. They control each joint independently and decouple the analysis of closed-loop systems using single input / single output transfer function blocks. Non-linear control schemes exist but are usually much more complicated.

# 2 Transfer Function Model of Single Joint

## 2.1 Motor

<div class="wp-block-image">
  <figure class="aligncenter size-large"><img loading="lazy" width="272" height="110" src="https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-17.png?resize=272%2C110&#038;ssl=1" alt="" class="wp-image-1349" data-recalc-dims="1" /><figcaption>Motor</figcaption></figure>
</div>

We will start the analysis using the model for a typical servo motor. The system consists of a motor and a gear train. The **input** to the system is the total torque produced by the motor $\tau(t)$ (since it is proportional to the current supplied) and the **output** is the angular displacement of the load shaft $\theta_L$.

### 2.1.1 Gear Train

The transfer function of the gear train is just a simple matter of gear ration:

<div class="wp-block-katex-display-block katex-eq" data-katex-display="true">
  <pre>\theta_L(t) = n \theta_m(t)</pre>
</div>

### 2.1.2 Torque

The total torque output is the sum of torque on the motor and torque on the load $\tau(t) = \tau\_m(t) + n\tau\_L(t)$.

**Load Torque:** $\tau\_L(t) = J\_L\ddot{\theta}\_L(t) + f\_L\dot{\theta}_L(t)$

**Motor Torque:** $\tau\_m(t) = J\_m\ddot{\theta}\_m(t) + f\_m\dot{\theta}_m(t)$

where $J$ is the moment of inertia and $f$ is the vicious friction coefficient.

**Total Torque**

<div class="wp-block-katex-display-block katex-eq" data-katex-display="true">
  <pre>\tau(t) = J_{eff}\ddot{\theta}_m(t) + f_{eff}\dot{\theta}_m(t)</pre>
</div>

<div class="wp-block-katex-display-block katex-eq" data-katex-display="true">
  <pre>T(s)=s^2J_{eff}\theta_m(s)+sf_{eff}\theta(s)</pre>
</div>

## 2.2 Circuit

After looking at the motor&#8217;s transfer functions, we then need to look at the motor&#8217;s control circuit:

<div class="wp-block-image">
  <figure class="aligncenter size-large"><img loading="lazy" width="278" height="125" src="https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-18.png?resize=278%2C125&#038;ssl=1" alt="" class="wp-image-1354" data-recalc-dims="1" /><figcaption>Motor circuit diagram</figcaption></figure>
</div>

The transfer function of the circuit can easily be derived from the time-domain equation:

<div class="wp-block-katex-display-block katex-eq" data-katex-display="true">
  <pre>V_a(t) + R_ai_a(t) + L_a\frac{di_a(t)}{dt} + e_b(t)</pre>
</div>

Also, note that the back e.m.f. is proportionate to the motor&#8217;s angular velocity:

<div class="wp-block-katex-display-block katex-eq" data-katex-display="true">
  <pre>e_b(t) = K_b \dot{\theta}_m(t)</pre>
</div>

Hence,

<div class="wp-block-katex-display-block katex-eq" data-katex-display="true">
  <pre>I_a(s) = \frac{V_a(s) + sK_b\theta_m(s)}{R_a + sL_a}</pre>
</div>

## 2.3 Overall Open-loop Transfer Function

Combining the circuit and motor models, we obtain the following transfer function (add proportionality to obtain $\theta_L$):

<div class="wp-block-katex-display-block katex-eq" data-katex-display="true">
  <pre>\frac{\theta_m(s)}{V_a(s)} = \frac{K_b}{s[s^2J_{eff}L_a + (L_af_{eff} + R_aJ_{eff})s + R_af_{eff} + K_aK_b]}</pre>
</div>

Note that we made use of the fact that $\tau(t) = K\_ai\_a(t)$.

Since electrical time constant of motor is much smaller than mechanical time constant, armature inductance effect can be neglected and we can reduce the system to second-order:

<div class="wp-block-katex-display-block katex-eq" data-katex-display="true">
  <pre>\frac{\theta_m(s)}{V_a(s)} = \frac{K_b}{s[R_aJ_{eff}s + R_af_{eff} + K_aK_b]} = \frac{K}{s(T_ms+1)}</pre>
</div>

where $K\_m$ is the motor gain constant and $T\_m$ is the motor time constant.

<div class="wp-block-image">
  <figure class="aligncenter size-large"><img loading="lazy" width="496" height="116" src="https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-19.png?resize=496%2C116&#038;ssl=1" alt="" class="wp-image-1356" srcset="https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-19.png?w=496&ssl=1 496w, https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-19.png?resize=300%2C70&ssl=1 300w, https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-19.png?resize=320%2C75&ssl=1 320w" sizes="(max-width: 496px) 100vw, 496px" data-recalc-dims="1" /><figcaption>Overall transfer function</figcaption></figure>
</div>

## 2.4 Closed-loop Transfer Function

<div class="wp-block-image">
  <figure class="aligncenter size-large"><img loading="lazy" width="505" height="118" src="https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-20.png?resize=505%2C118&#038;ssl=1" alt="" class="wp-image-1357" srcset="https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-20.png?w=505&ssl=1 505w, https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-20.png?resize=300%2C70&ssl=1 300w, https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-20.png?resize=320%2C75&ssl=1 320w" sizes="(max-width: 505px) 100vw, 505px" data-recalc-dims="1" /><figcaption>Closed-loop system</figcaption></figure>
</div>

We know form control theory (or simple derivation) that the closed-loop transfer function is of the form:

<div class="wp-block-katex-display-block katex-eq" data-katex-display="true">
  <pre>\frac{\theta_L(s)}{\theta_L^d(s)} = \frac{G_c(s)G_p(s)}{1+G_c(s)G_p(s)} = \frac{G(s)}{1+G(s)}</pre>
</div>

And recall that the some simple linear controls are as follows:

- **Proportional Control:** $G\_c(s) = K\_p$
- **PD Control:** $G\_c(s) = K\_p + sK_v$
- **PID Control:** $G\_c(s) = K\_p + sK\_v + \frac{K\_i}{s}$

## 2.5 Performance and Stability

In control theory classes, we learn that the performance of a closed-loop system can be measured using these common measures:

- Maximum overshoot
- Rise time
- Steady state error
- Settling time

However, in robotics systems, we **cannot have underdamped response** for safety reasons. Also, at steady state, we want to limit the system resonance frequency $\omega\_n < 0.5 \omega\_{res}$. Where $\omega\_{res}$ is the structural resonance frequency. The reason is that $\omega\_n$ is the frequency which has the highest gain in the steady state response (where $s = j\omega$, because all LHP gains have decayed away, there are not supposed to be any RHP components, need clarifications).

### 2.5.1 Second Order System

For a system with transfer function $\frac{N(s)}{D(s)}$ where $D(s)$ is second-order, let $D(s)$ be:

<div class="wp-block-katex-display-block katex-eq" data-katex-display="true">
  <pre>D(s) = s^2 + bs + c = s^2 + 2\zeta\omega_ns + \omega_n^2</pre>
</div>

The conditions for robotic systems become:

- **Not underdamped:** $\zeta \ge 1$
- **Resonance:** $\omega\_n < 0.5 \omega\_{res}$

# 3 Non-linear Control Methods

## 3.1 Piece-wise Modelling

We can control non-linear systems using linear control theories by limiting the operation to a linear region or by developing a control for each piece-wise linear region. For example, the force equation is $m\ddot{x} + b\dot{x} + kx^3 = u$:

<div class="wp-block-image">
  <figure class="aligncenter size-large"><img loading="lazy" width="292" height="120" src="https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-21.png?resize=292%2C120&#038;ssl=1" alt="" class="wp-image-1360" data-recalc-dims="1" /><figcaption>Non-linear system</figcaption></figure>
</div>

<div class="wp-block-image">
  <figure class="aligncenter size-large"><img loading="lazy" width="300" height="107" src="https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/2-8.png?resize=300%2C107&#038;ssl=1" alt="" class="wp-image-1361" data-recalc-dims="1" /><figcaption>Limiting operating region</figcaption></figure>
</div>

## 3.2 Control Law Partitioning

Another way to control non-linear systems is by transforming the input variables to the closed-loop system such that the closed-loop system becomes a linear (even better, unit-mass) system. For example, consider the system:

<div class="wp-block-katex-display-block katex-eq" data-katex-display="true">
  <pre>u = m\ddot{x} + b\dot{x} + kx^3</pre>
</div>

We choose coefficients $\alpha(x)$ and $\beta(x)$ such that if $v$ is taken as a new input, the system appears to be a unit mass:

<div class="wp-block-katex-display-block katex-eq" data-katex-display="true">
  <pre>m\ddot{x} + b\dot{x} + kx^3 = \alpha v + \beta \\
\alpha = m \\
\beta = b\dot{x} + kx^3 \\ 
v = \ddot{x}</pre>
</div>

As such, the resulting system (with $v$ as input) can be easily controlled using linear methods. The resulting system is shown below:

<div class="wp-block-image">
  <figure class="aligncenter size-large"><img loading="lazy" width="535" height="236" src="https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-22.png?resize=535%2C236&#038;ssl=1" alt="" class="wp-image-1362" srcset="https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-22.png?w=535&ssl=1 535w, https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-22.png?resize=300%2C132&ssl=1 300w, https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-22.png?resize=320%2C141&ssl=1 320w" sizes="(max-width: 535px) 100vw, 535px" data-recalc-dims="1" /><figcaption>Partitioned system</figcaption></figure>
</div>

Notice that we have split up the system into the **model-based** portion and the **servo** portion. The **model-based** portion involves system parameters such as $m$, $b$ and $k$ while the **servo** portion $v=\ddot{x}$ determines the control parameters $k\_p$, $k\_v$, $k_i$ independent of the system parameters.
