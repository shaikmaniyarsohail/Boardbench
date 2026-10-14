# Guide to Microcontroller Boards and Features

This reference manual covers the most popular, widely available microcontroller boards, their key specifications, and their primary use cases.

---

## 1. Mainstream & Beginner-Friendly Boards

### Arduino Uno R4 Minima / WiFi
* **Processor / Core:** Renesas RA4M1 (ARM Cortex-M4) @ 48 MHz
* **Memory:** 256 KB Flash / 32 KB SRAM
* **Operating Voltage:** 5V
* **I/O Pins:** 14 Digital, 6 Analog
* **Connectivity:** USB-C (WiFi version includes ESP32-S3 for Wi-Fi & Bluetooth)
* **Best For:** Beginners, education, prototyping, 5V legacy shield compatibility.

### Arduino Nano Every
* **Processor / Core:** ATmega4809 @ 20 MHz
* **Memory:** 48 KB Flash / 6 KB SRAM
* **Operating Voltage:** 5V
* **I/O Pins:** 15 Digital, 8 Analog
* **Connectivity:** Micro-USB
* **Best For:** Small-form-factor breadboard projects requiring 5V logic.

---

## 2. Wireless & IoT (Internet of Things) Boards

### ESP32-WROOM-32E (Generic DevKitC)
* **Processor / Core:** Xtensa Dual-Core 32-bit LX6 @ 240 MHz
* **Memory:** 4 MB to 8 MB Flash / 520 KB SRAM
* **Operating Voltage:** 3.3V
* **I/O Pins:** Up to 36 GPIOs (Multiplexed Analog/Digital)
* **Connectivity:** Built-in Wi-Fi 4 (802.11 b/g/n) and Bluetooth 4.2 / BLE
* **Best For:** IoT applications, smart home automation, sensor logging, web servers.

### ESP32-S3 DevKit
* **Processor / Core:** Xtensa Dual-Core 32-bit LX7 @ 240 MHz (with Vector instructions for AI acceleration)
* **Memory:** Up to 16 MB Flash / 512 KB SRAM (Supports external PSRAM)
* **Operating Voltage:** 3.3V
* **I/O Pins:** 45 GPIOs
* **Connectivity:** Wi-Fi 4, Bluetooth 5 (LE), and Mesh networking
* **Best For:** Machine learning on the edge (TinyML), camera projects (ESP32-S3-Eye), HMI displays.

---

## 3. High-Performance & Budget Boards

### Raspberry Pi Pico 2 / Pico 2W
* **Processor / Core:** RP2350 (Dual-core ARM Cortex-M33 / Hazard3 RISC-V selectable) @ 150 MHz
* **Memory:** 4 MB external Flash / 520 KB SRAM
* **Operating Voltage:** 3.3V
* **I/O Pins:** 26 GPIOs (3 Analog inputs)
* **Connectivity:** Micro-USB (Pico 2W includes Wi-Fi 4 and Bluetooth 5.2)
* **Best For:** High-efficiency computing, PIO (Programmable I/O) hardware state machines, budget computing.

### Teensy 4.1
* **Processor / Core:** ARM Cortex-M7 (NXP i.MXRT1062) @ 600 MHz
* **Memory:** 8 MB Flash / 7.9 MB RAM
* **Operating Voltage:** 3.3V (5V tolerant inputs on specific older versions, but 4.1 is strictly 3.3V)
* **I/O Pins:** 55 GPIOs (35 PWM, 18 Analog)
* **Connectivity:** Micro-USB, Onboard Ethernet PHY, USB Host port, MicroSD slot
* **Best For:** Audio synthesis, digital signal processing (DSP), high-speed automation, real-time physics simulation.

---

## 4. Ultra-Compact & Wearable Boards

### Seeed Studio XIAO ESP32C3
* **Processor / Core:** RISC-V 32-bit Single-Core @ 160 MHz
* **Memory:** 4 MB Flash / 400 KB SRAM
* **Operating Voltage:** 3.3V
* **I/O Pins:** 11 GPIOs (all usable as PWM/Analog)
* **Connectivity:** USB-C, Wi-Fi, Bluetooth 5.0 (BLE) with external antenna
* **Best For:** Miniature wearables, hidden IoT nodes, low-power remote sensors.

### Adafruit QT Py RP2040
* **Processor / Core:** Raspberry Pi RP2040 (Dual ARM Cortex-M0+) @ 133 MHz
* **Memory:** 8 MB Flash / 264 KB SRAM
* **Operating Voltage:** 3.3V
* **I/O Pins:** 13 GPIOs
* **Connectivity:** USB-C, Stemma QT / Qwiic I2C connector
* **Best For:** Tiny plug-and-play I2C sensor setups, space-constrained enclosures.