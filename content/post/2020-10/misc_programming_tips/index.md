---
title: Miscellaneous Programming Tips
date: 2020-10-02
summary: A list of useful tips and tricks that I have encountered.
categories:
  - Miscellaneous
tags:
  - arduino
  - cpp
  - misc
  - vscode
  - guide
type: post
---
<div class="gutentoc tocactive ullist">
  <div class="gutentoc-toc-wrap">
    <div class="gutentoc-toc-title-wrap">
      <div class="gutentoc-toc-title">
        Table Of Contents
      </div>
      
      <div id="close" class="text_open">
        show
      </div>
    </div>
    
    <div id="toclistclose">
      <div class="gutentoc-toc__list-wrap">
        <ul class="gutentoc-toc__list">
          <li>
            <a href="#vs_code">VS Code</a>
          </li>
          <ul class="gutentoc-toc__list">
            <li>
              <a href="#creating_file_associations">Creating File Associations</a>
            </li>
          </ul>
          
          <li>
            <a href="#embedded_systems">Embedded Systems</a>
          </li>
          <ul class="gutentoc-toc__list">
            <li>
              <a href="#bit_manipulations">Bit Manipulations</a>
            </li>
          </ul>
        </ul>
      </div>
    </div>
  </div>
</div>

## VS Code {#vs_code}

### Creating File Associations {#creating_file_associations}

<div class="wp-block-jetpack-markdown">
  <p>
    Sometimes, code developers get a bit drunk when they write their libraries, so they decide to give their source codes weird file extensions. There are also times when the developers (like those who wrote the gem5 library...) are worried that innocent souls like myself are too bored and decide to dig deep into the automatically generated C++ codes. So they decided to call their auto-generated C++ files `xxx.cc.inc` (yet they are too lazy to write a proper documentation, so what choice am I left with but to ready these disgusting files). ORRR, there are also times when OpenCV does not have a certain CUDA library and so you have to implement it yourself by writing `xxx.cu` files.
  </p>
</div>

<div class="wp-block-jetpack-markdown">
  <p>
    The problem is, while we all know that these files are all essential C++ source code, VS Code can't figure it out. And so not only do we not get Intellisense, we miss out on fabulous features like Autoformat, Syntax Highlighting and Linting etc.
  </p>
</div>

<div class="wp-block-jetpack-markdown">
  <p>
    The solution to this whole grandma story and personal whine is actually super simple, just go to Settings and search for File Associations. Afterwards, add a wildcard to select the relevant files and associate to the appropriate programming language, e.g. `cpp`.
  </p>
</div><figure class="wp-block-image size-large is-style-default">

<img loading="lazy" width="720" height="280" src="https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/image.png?resize=720%2C280&#038;ssl=1" alt="" class="wp-image-806" srcset="https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/image.png?w=809&ssl=1 809w, https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/image.png?resize=300%2C117&ssl=1 300w, https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/image.png?resize=768%2C299&ssl=1 768w, https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/image.png?resize=720%2C280&ssl=1 720w, https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/image.png?resize=580%2C226&ssl=1 580w, https://i0.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/image.png?resize=320%2C125&ssl=1 320w" sizes="(max-width: 720px) 100vw, 720px" data-recalc-dims="1" /> <figcaption>Setting up file association in VS Code</figcaption></figure> 

## Embedded Systems {#embedded_systems}

### Bit Manipulations {#bit_manipulations}

One of the most common things that we do when programming embedded systems (or I guess its almost the ONLY thing that embedded system programmers do), is to stare at some boring datasheet, figure out which register address to write to, and write the enable / disable the appropriate bits.

<div class="wp-block-jetpack-markdown">
  <p>
    By convention, or common sense actually, when we write to an 8-bit register, we need a bit mask and an 8-bit `uint8_t` value. The bit mask needs to be applied to prevent us from changing the irrelevant bits. However, people like me always forget how to apply the bitmask and update the bit values in an elegant manner. That's why I am going to write it down here and never derive the formula again in my whole life.
  </p>
</div>

<pre class="wp-block-code"><code>// Since I am a 3 year old, I will use Arduino registers as an example :)

// Setting Bits
uint8_t MASK = 0b00111111;
uint8_t VAL= 0b00111101;
// Resetting the non-masked bits and setting them to the bit values in VAL
DDRB = (DDRB & MASK) | VAL; 

// Flipping the HIGH Bits
PORTB ^= 0b00110000;</code></pre>
