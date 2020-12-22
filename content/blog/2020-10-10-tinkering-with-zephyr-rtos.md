---
title: Tinkering with Zephyr RTOS
author: ppeetteerrsx
type: post
date: 2020-10-10T04:21:46+00:00
excerpt: This is a small personal adventure into the hyped Zephyr RTOS. I will go over many tips and caveats of using Zephyr RTOS with Platformio and STM32.
url: /tinkering/tinkering-with-zephyr-rtos/
views:
  - 13
categories:
  - Electrical Engineering
  - Embedded Systems
  - Tinkering
tags:
  - eee
  - rtos
  - stm32
  - tinkering

---
# 1 Why Zephyr RTOS? {#1_why_zephyr_rtos}

The short answer is&#8230; I saw this headline :). So&#8230; apparently tech giants don&#8217;t use Arduino :o, that means I have to learn something new! Recently I have been working on RTOS (mainly FreeRTOS using STM32MXCube) in a CubeSat project in school. So why not get my hands dirty with a more trendy RTOS over the weekend?<figure class="wp-block-embed-wordpress wp-block-embed is-type-wp-embed is-provider-zephyr-project">

<div class="wp-block-embed__wrapper">
  <blockquote class="wp-embedded-content" data-secret="ErgCkfoo47">
    <a href="https://zephyrproject.org/google-and-facebook-select-zephyr-rtos-for-next-generation-products/">Google and Facebook Select Zephyr RTOS for Next Generation Products</a>
  </blockquote>
</div></figure> 

<div class="wp-block-jetpack-markdown">
  <p>
    The benefits of Zephyr RTOS is obvious. It is an RTOS built to be light and power-efficient. On resource-constrained devices, unused functionalities can be turned off via KConfig files (usually just one <code>project.conf</code> file at the project root directory).
  </p>
</div>

Nonetheless, the headaches of using Zephyr RTOS is also obvious. It is a fairly new initiative and the community is no where near that of Arduino. Documentation is at best poor (or is it even existent??), with only API reference for most device drivers. So, get ready for some hair loss if you decide to try it out.

# 2 Project Setup {#2_project_setup}

Below is an image of my breadboard setup (ironically I, as an OCD person, spent quite some time doing up a nice stripboard version and ended up dumping everything because I had to change the pins and change the components etc.). I assumed that things will just work when you connect the pins properly (like when you use Arduino), apparently that is not the case with Zephyr&#8230;<figure class="wp-block-image size-large is-resized is-style-default">

<img loading="lazy" src="https://i1.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/IMG_20201010_161759-1.jpg?resize=512%2C384&#038;ssl=1" alt="" class="wp-image-881" width="512" height="384" srcset="https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/IMG_20201010_161759-1-scaled.jpg?resize=1024%2C768&ssl=1 1024w, https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/IMG_20201010_161759-1-scaled.jpg?resize=300%2C225&ssl=1 300w, https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/IMG_20201010_161759-1-scaled.jpg?resize=768%2C576&ssl=1 768w, https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/IMG_20201010_161759-1-scaled.jpg?resize=1536%2C1152&ssl=1 1536w, https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/IMG_20201010_161759-1-scaled.jpg?resize=2048%2C1536&ssl=1 2048w, https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/IMG_20201010_161759-1-scaled.jpg?resize=1920%2C1440&ssl=1 1920w, https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/IMG_20201010_161759-1-scaled.jpg?resize=720%2C540&ssl=1 720w, https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/IMG_20201010_161759-1-scaled.jpg?resize=580%2C435&ssl=1 580w, https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/IMG_20201010_161759-1-scaled.jpg?resize=320%2C240&ssl=1 320w, https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/IMG_20201010_161759-1-scaled.jpg?w=1440&ssl=1 1440w, https://i2.wp.com/ppeetteerrsx.com/wp-content/uploads/2020/10/IMG_20201010_161759-1-scaled.jpg?w=2160&ssl=1 2160w" sizes="(max-width: 512px) 100vw, 512px" data-recalc-dims="1" /> <figcaption> Project Setup</figcaption></figure> 

<div class="wp-block-jetpack-markdown">
  <ul>
    <li>
      <strong>IDE:</strong> PlatformIO on VSCode
    </li>
    <li>
      <strong>Framework:</strong> Zephyr RTOS
    </li>
    <li>
      <strong>Platform:</strong> STSTM32
    </li>
    <li>
      <strong>MCU:</strong> Chinese STM32 Blue Pill (Minimum Development Board)
    </li>
    <li>
      <strong>Peripherals:</strong> <ul>
        <li>
          <strong>SPI:</strong> 8&#215;8 LED matrix with MAX7219CNG driver IC <ul>
            <li>
              <code>CS</code> <=> <code>A4</code> (NSS1)
            </li>
            <li>
              <code>CLK</code> <=> <code>A5</code> (SCK1)
            </li>
            <li>
              <code>DIN</code> <=> <code>A7</code> (MOSI1)
            </li>
          </ul>
        </li>
        
        <li>
          <strong>I2C:</strong> GY-521 with MPU6050 accelerometer and gyroscope <ul>
            <li>
              <code>SCL</code> <=> <code>B6</code>
            </li>
            <li>
              <code>SDA</code> <=> <code>B7</code>
            </li>
          </ul>
        </li>
        
        <li>
          <strong>PWM:</strong> GY-53 with Vl53l0X laser ToF sensor <ul>
            <li>
              <code>PWM</code> <=> <code>B1</code>
            </li>
          </ul>
        </li>
        
        <li>
          <strong>GPIO:</strong> TTP223B capacitive touch sensor <ul>
            <li>
              <code>GPIO</code> <=> <code>B0</code>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</div>

**Source Code:** <a href="https://github.com/ppeetteerrs/MatrixBoard" data-type="URL" data-id="https://github.com/ppeetteerrs/MatrixBoard">github</a>

# 3 Source Code {#3_source_code}

As you can probably notice, this is a fairly simple project with a sole goal of testing out the Zephyr RTOS functionalities and API. The logic and connections are simple but the debugging and handling of weird Zephyr behaviors costed me a few sleepless nights. Indeed, if I were to stick to my beloved baby framework called Arduino, this is probably a 1 hour project zzzz.

## 3.1 Setting up PlatformIO {#31_setting_up_platformio}

<div class="wp-block-jetpack-markdown">
  <p>
    First off, we have to install PlatformIO on VSCode and create a new project. We can either choose the configurations from the GUI or enter them (like a true programmer) manually into <code>platformio.ini</code>. Throughout this project, I had two PlatformIO projects open in my VSCode workspace: one using Zephyr RTOS and one using Arduino. It is often very helpful to check your logic and connections using the simple Arduino framework before battling with Zephyr.
  </p>
</div>

<pre class="wp-block-code"><code># platform.ini
&#91;env:zephyr]
platform = ststm32
board = bluepill_f103c8
framework = zephyr
upload_protocol = serial
upload_port = COM5
monitor_speed = 115200
monitor_port = COM5</code></pre>

## 3.2 Programming the Bluepill {#32_programming_the_bluepill}

**Ways to Program the Bluepill**

There are three ways to flash the program onto the bluepill: USB to UART, MicroUSB + bootloader and STLink. I will not go over all three methods because there are sufficient tutorials online. Personally, I recommend using USB to UART converter. STLink currently does not work well with PlatformIO. The advantage of STLink has always been its ability to provide runtime debugging, however, this functionality is currently buggy in VSCode PlatformIO (there are ways to get around it but it is unnecessary for such a simple project). What makes it worse is that you need to connect a separate UART input in order to get serial output from the device. So yea, spare the trouble. MicroUSB + bootloader is just simply not elegant so I would recommend it.

**My Recommended Way: USB to UART Converter**

<div class="wp-block-jetpack-markdown">
  <p>
    When using a USB to UART converted to flash your program, connect <code>RX</code> to <code>A9</code> and <code>TX</code> to <code>A10</code>. Next, configure the corresponding options in <code>platform.ini</code> as shown above. Change the <code>BOOT0</code> jumper to <code>1</code> (<code>BOOT1</code> is actually useless in simple projects, do don&#8217;t get confused about when to use <code>BOOT0</code> vs <code>BOOT1</code>). Then, every time before you flash the program, you have to press the <code>RESET</code> button on the board. Remember that if you want the flashed program to persist, change the <code>BOOT0</code> jumper back to <code></code> while the Bluepill is still powered on. That way, pressing the <code>RESET</code> button does not erase the program but restarts it.
  </p>
</div>