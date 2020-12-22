---
title: Robotics and Automation – Introduction (Part 1)
date: 2020-10-23T18:56:01+00:00
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

## 1.1 What is a Robot?

A robot is usually a system modelled as a **chain of rigid links interconnected by flexible joints.** Robots usually have an end-effector at the end such as a gripper or a tool tip. **Hard automation** refers to hardware specific to a certain task and **soft automation** is flexible and can be reprogrammed through software.

## 1.2 Robot Drive Technologies

Robots can be driven by **electricity** or by **hydraulics**. Electrical motors such as DC servos and stepper motors can drive a robot. Robots driven hydraulically have higher load and speed but cannot be used in environments that require certain level of cleanliness.

## 1.3 Robot Joints

![Robot joints](/img/robotics_and_automation/1-1.png)

## 1.4 Work Envelop

### 1.4.1 Geometry

- **Major Axes:** First 3 joints of the robot (determines XYZ position of the wrist)
- **Minor Axes:** Remaining joint axes (determines orientation of tool, e.g. roll pitch yaw)
- **Gross Work Envelop:** Locus of points in 3D space that can be reached by the wrist

### 1.4.2 Types

<div class="wp-block-image">
  <figure class="aligncenter size-large"><img loading="lazy" width="653" height="218" src="https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/2-4.png?resize=653%2C218&#038;ssl=1" alt="" class="wp-image-1262" srcset="https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/2-4.png?w=653&ssl=1 653w, https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/2-4.png?resize=300%2C100&ssl=1 300w, https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/2-4.png?resize=580%2C194&ssl=1 580w, https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/2-4.png?resize=320%2C107&ssl=1 320w" sizes="(max-width: 653px) 100vw, 653px" data-recalc-dims="1" /><figcaption>Robot work envelop types</figcaption></figure>
</div><figure class="wp-block-table">

<table>
  <tr>
    <th class="has-text-align-center" data-align="center">
      Type
    </th>
    
    <th class="has-text-align-center" data-align="center">
      Robot
    </th>
    
    <th class="has-text-align-center" data-align="center">
      Work Envelop
    </th>
  </tr>
  
  <tr>
    <td class="has-text-align-center" data-align="center">
      <strong>Cartesian</strong>
    </td>
    
    <td class="has-text-align-center" data-align="center">
      <img loading="lazy" width="140" height="171" class="wp-image-1263" style="width: 140px;" src="https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/3-4.png?resize=140%2C171&#038;ssl=1" alt="" data-recalc-dims="1" />
    </td>
    
    <td class="has-text-align-center" data-align="center">
      <img loading="lazy" width="118" height="80" class="wp-image-1264" style="width: 118px;" src="https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/4-3.png?resize=118%2C80&#038;ssl=1" alt="" data-recalc-dims="1" />
    </td>
  </tr>
  
  <tr>
    <td class="has-text-align-center" data-align="center">
      <strong>Cylindrical</strong>
    </td>
    
    <td class="has-text-align-center" data-align="center">
      <img loading="lazy" width="153" height="141" class="wp-image-1265" style="width: 150px;" src="https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/5-2.png?resize=153%2C141&#038;ssl=1" alt="" data-recalc-dims="1" />
    </td>
    
    <td class="has-text-align-center" data-align="center">
      <img loading="lazy" width="108" height="85" class="wp-image-1266" style="width: 108px;" src="https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/6-2.png?resize=108%2C85&#038;ssl=1" alt="" data-recalc-dims="1" />
    </td>
  </tr>
  
  <tr>
    <td class="has-text-align-center" data-align="center">
      <strong>Spherical</strong>
    </td>
    
    <td class="has-text-align-center" data-align="center">
      <img loading="lazy" width="168" height="167" class="wp-image-1267" style="width: 150px;" src="https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/7-2.png?resize=168%2C167&#038;ssl=1" alt="" srcset="https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/7-2.png?w=168&ssl=1 168w, https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/7-2.png?resize=150%2C150&ssl=1 150w" sizes="(max-width: 168px) 100vw, 168px" data-recalc-dims="1" />
    </td>
    
    <td class="has-text-align-center" data-align="center">
      <img loading="lazy" width="112" height="88" class="wp-image-1268" style="width: 112px;" src="https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/8-1.png?resize=112%2C88&#038;ssl=1" alt="" data-recalc-dims="1" />
    </td>
  </tr>
  
  <tr>
    <td class="has-text-align-center" data-align="center">
      <strong>SCARA</strong>
    </td>
    
    <td class="has-text-align-center" data-align="center">
      <img loading="lazy" width="121" height="139" class="wp-image-1269" style="width: 121px;" src="https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/9-1.png?resize=121%2C139&#038;ssl=1" alt="" data-recalc-dims="1" />
    </td>
    
    <td class="has-text-align-center" data-align="center">
      <img loading="lazy" width="55" height="58" class="wp-image-1270" style="width: 55px;" src="https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/10-1.png?resize=55%2C58&#038;ssl=1" alt="" data-recalc-dims="1" />
    </td>
  </tr>
  
  <tr>
    <td class="has-text-align-center" data-align="center">
      <strong>Articulated</strong>
    </td>
    
    <td class="has-text-align-center" data-align="center">
      <img loading="lazy" width="140" height="206" class="wp-image-1271" style="width: 140px;" src="https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/11-1.png?resize=140%2C206&#038;ssl=1" alt="" data-recalc-dims="1" />
    </td>
    
    <td class="has-text-align-center" data-align="center">
      <img loading="lazy" width="105" height="81" class="wp-image-1272" style="width: 105px;" src="https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/12.png?resize=105%2C81&#038;ssl=1" alt="" data-recalc-dims="1" />
    </td>
  </tr>
</table><figcaption>Robot types</figcaption></figure>

# 2 Motion Control Methods

They are various ways to control a robot&#8217;s motion. They are split into two main categories:

- **Point-to-Point:** Tool move to sequence of discrete points (path not specified)
  - e.g. spot welding / pick-and-place / loading unloading
- **Continuous / Controlled Path Motion:** Tool follows prescribed path in 3D space (may have varying speed)
  - e.g. spray painting / arc welding / gluing

### 3 Robot Specifications

- Number of axes
- Load carrying capacity (kg)
- Maxspeed, cycle time: time to perform certain action (mm / sec)
- Reach (max radial distance), stroke (actual readial distance covered by wrist, not start from center) (mm)
- Tool orientation (deg)
- Repeatability (mm)
- Precision and acuuracy (mm)
- Operating environment

# 4 Tool Orientation

<div class="wp-block-image">
  <figure class="aligncenter size-large"><img loading="lazy" width="379" height="264" src="https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/12-1.png?resize=379%2C264&#038;ssl=1" alt="" class="wp-image-1274" srcset="https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/12-1.png?w=379&ssl=1 379w, https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/12-1.png?resize=300%2C209&ssl=1 300w, https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/12-1.png?resize=320%2C223&ssl=1 320w" sizes="(max-width: 379px) 100vw, 379px" data-recalc-dims="1" /><figcaption>Yaw pitch roll</figcaption></figure>
</div>

- Yaw (left-right)
- Pitch (head up / down)
- Roll (roll about body axis)

## 5 Repeatability, Precision, Accuracy

<div class="wp-block-image">
  <figure class="aligncenter size-large"><a href="https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-6.png?ssl=1"><img loading="lazy" width="573" height="384" src="https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-6.png?resize=573%2C384&#038;ssl=1" alt="" class="wp-image-1275" srcset="https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-6.png?w=573&ssl=1 573w, https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-6.png?resize=300%2C201&ssl=1 300w, https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/1-6.png?resize=320%2C214&ssl=1 320w" sizes="(max-width: 573px) 100vw, 573px" data-recalc-dims="1" /></a><figcaption>Precision vs distance</figcaption></figure>
</div>

- **Repeatability:** Measure of ability of robot to position tool tip in same place repeatedly
- **Precision:** Measure of spatial resolution with which the tool can be positioned within work envelope
- **Accuracy:** Ability of robot to place tool tip at arbitrary prescribed location in work envelop (error > precision / 2)
