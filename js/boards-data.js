/* BoardBench — board dataset (specs are indicative) */
const BOARDS = [
  {
    id: "arduino-uno",
    name: "Arduino Uno R3",
    maker: "Arduino",
    cls: "microcontroller",
    tag: "the classic",
    short: "The board that taught a generation to blink.",
    desc: "If you are brand new to electronics, start here. Huge library support, 5 V logic, and a gazillion tutorials. The ATmega328P is modest, but for LEDs, sensors and servos it is more than enough.",
    specs: {
      "Processor": "ATmega328P @ 16 MHz",
      "Flash / RAM": "32 KB / 2 KB",
      "Voltage": "5 V logic",
      "Digital / Analog": "14 DIO / 6 ADC",
      "Connectivity": "USB-B, UART, I²C, SPI",
      "Wireless": "—",
      "Size": "68.6 × 53.4 mm",
      "Price": "~$28"
    },
    quick: { clock: "16 MHz", io: "14 DIO / 6 ADC", net: "—" }
  },
  {
    id: "raspberry-pi-5",
    name: "Raspberry Pi 5",
    maker: "Raspberry Pi Foundation",
    cls: "sbc",
    tag: "full computer",
    short: "A desktop-class Linux box that fits in your palm.",
    desc: "Quad-core 64-bit CPU, dual 4K display output, PCIe, and NVMe support. Runs a full desktop OS, media centers, home servers, retro consoles — anything a small PC can do.",
    specs: {
      "Processor": "Broadcom BCM2712, 4× Cortex-A76 @ 2.4 GHz",
      "Flash / RAM": "microSD / NVMe, 4–8 GB LPDDR4X",
      "Voltage": "5 V 5 A USB-C PD",
      "Digital / Analog": "40-pin GPIO header",
      "Connectivity": "2× USB 3, 2× USB 2, GbE, 2× micro-HDMI",
      "Wireless": "Wi-Fi 5, Bluetooth 5.0",
      "Size": "85 × 56 mm",
      "Price": "~$60 (4 GB)"
    },
    quick: { clock: "2.4 GHz ×4", io: "40 GPIO", net: "Wi-Fi + BT + GbE" }
  },
  {
    id: "esp32",
    name: "ESP32 DevKit",
    maker: "Espressif",
    cls: "iot",
    tag: "wifi workhorse",
    short: "Dual-core, WiFi and Bluetooth for pocket change.",
    desc: "The go-to chip for connected projects. Two cores, plenty of RAM, and built-in Wi-Fi + BLE — perfect for weather stations, smart-home gadgets and remote sensors.",
    specs: {
      "Processor": "Xtensa LX6, 2× @ 240 MHz",
      "Flash / RAM": "4 MB flash / 520 KB SRAM",
      "Voltage": "3.3 V logic",
      "Digital / Analog": "34 GPIO / 18 ADC (12-bit)",
      "Connectivity": "UART, I²C, SPI, DAC, touch",
      "Wireless": "Wi-Fi 802.11 b/g/n, BLE 4.2",
      "Size": "~55 × 25 mm",
      "Price": "~$5"
    },
    quick: { clock: "240 MHz ×2", io: "34 GPIO / 18 ADC", net: "Wi-Fi + BLE" }
  },
  {
    id: "raspberry-pi-pico",
    name: "Raspberry Pi Pico",
    maker: "Raspberry Pi Foundation",
    cls: "microcontroller",
    tag: "pocket MCU",
    short: "RP2040 magic at the price of a coffee.",
    desc: "Raspberry Pi's microcontroller debut: dual-core M0+, 264 KB RAM, and that clever programmable I/O (PIO). Program it in C/C++ or MicroPython.",
    specs: {
      "Processor": "RP2040, 2× Cortex-M0+ @ 133 MHz",
      "Flash / RAM": "2 MB flash / 264 KB SRAM",
      "Voltage": "3.3 V logic",
      "Digital / Analog": "26 GPIO / 3 ADC (12-bit)",
      "Connectivity": "UART, I²C, SPI, PIO, USB",
      "Wireless": "— (see Pico W)",
      "Size": "51 × 21 mm",
      "Price": "~$4"
    },
    quick: { clock: "133 MHz ×2", io: "26 GPIO / 3 ADC", net: "USB only" }
  },
  {
    id: "arduino-nano",
    name: "Arduino Nano",
    maker: "Arduino",
    cls: "microcontroller",
    tag: "breadboard buddy",
    short: "Full Uno power in a stick you can plug straight in.",
    desc: "Same ATmega328P brain as the Uno but in a compact DIP-style form that straddles a breadboard — ideal for permanent-ish prototypes and small robots.",
    specs: {
      "Processor": "ATmega328P @ 16 MHz",
      "Flash / RAM": "32 KB / 2 KB",
      "Voltage": "5 V logic",
      "Digital / Analog": "22 DIO / 8 ADC",
      "Connectivity": "Mini/micro-USB, UART, I²C, SPI",
      "Wireless": "—",
      "Size": "45 × 18 mm",
      "Price": "~$22"
    },
    quick: { clock: "16 MHz", io: "22 DIO / 8 ADC", net: "—" }
  },
  {
    id: "jetson-orin-nano",
    name: "Jetson Orin Nano",
    maker: "NVIDIA",
    cls: "ai",
    tag: "AI brain",
    short: "Desktop-class AI compute on a credit card.",
    desc: "NVIDIA's entry-level edge AI board. Runs modern neural networks for vision, speech and robots — pair it with a camera and you have got a self-driving cup holder.",
    specs: {
      "Processor": "6× Cortex-A78AE + 1024-core Ampere GPU",
      "Flash / RAM": "NVMe / 8 GB LPDDR5",
      "Voltage": "5 V (DC jack)",
      "Digital / Analog": "40-pin GPIO, CSI camera, PCIe",
      "Connectivity": "GbE, 4× USB 3.2, HDMI, M.2",
      "Wireless": "Optional module",
      "Size": "100 × 79 mm",
      "Price": "~$249"
    },
    quick: { clock: "A78 + Ampere GPU", io: "40 GPIO + CSI", net: "GbE, USB 3.2" }
  },
  {
    id: "microbit-v2",
    name: "micro:bit V2",
    maker: "BBC / Micro:bit Foundation",
    cls: "education",
    tag: "classroom hero",
    short: "5×5 LED grid, sensors and buttons — CS made friendly.",
    desc: "Built for classrooms: snap the alligator clips on, code in MakeCode or Python in the browser, and watch the LEDs light up. mic + speaker + accelerometer on board.",
    specs: {
      "Processor": "Nordic nRF52833, Cortex-M4 @ 64 MHz",
      "Flash / RAM": "512 KB / 128 KB",
      "Voltage": "3.3 V logic",
      "Digital / Analog": "25 GPIO (edge connector) / 6 ADC",
      "Connectivity": "UART, I²C, SPI, USB",
      "Wireless": "BLE + 2.4 GHz radio",
      "Size": "52 × 42 mm",
      "Price": "~$15"
    },
    quick: { clock: "64 MHz", io: "25 GPIO / 6 ADC", net: "BLE + radio" }
  },
  {
    id: "beaglebone-black",
    name: "BeagleBone Black",
    maker: "BeagleBoard.org",
    cls: "sbc",
    tag: "industrial tinkerer",
    short: "Two real-time PRU cores hiding under the hood.",
    desc: "A Linux SBC with two programmable real-time units — great for robotics and motor control where timing must be exact. Runs headless over USB with no monitor needed.",
    specs: {
      "Processor": "TI AM3358, Cortex-A8 @ 1 GHz",
      "Flash / RAM": "4 GB eMMC / 512 MB DDR3",
      "Voltage": "5 V",
      "Digital / Analog": "2× 46-pin headers, 2 PRU cores",
      "Connectivity": "GbE, 2× USB, HDMI, SPI, I²C, UART",
      "Wireless": "— (USB adapters ok)",
      "Size": "86 × 54 mm",
      "Price": "~$55"
    },
    quick: { clock: "1 GHz A8", io: "92 pins + 2 PRU", net: "GbE" }
  },
  {
    id: "stm32-blue-pill",
    name: "STM32 Blue Pill",
    maker: "STMicroelectronics",
    cls: "microcontroller",
    tag: "arm upgrade",
    short: "Your gateway from 8-bit to 32-bit ARM.",
    desc: "A dirt-cheap STM32F103 board that introduces 32-bit performance, proper peripherals and HAL/CubeMX tooling — the natural next step after Arduino.",
    specs: {
      "Processor": "STM32F103C8T6, Cortex-M3 @ 72 MHz",
      "Flash / RAM": "64 KB / 20 KB",
      "Voltage": "3.3 V logic",
      "Digital / Analog": "34 GPIO / 12 ADC (12-bit)",
      "Connectivity": "UART×3, I²C×2, SPI×2, USB",
      "Wireless": "—",
      "Size": "53 × 23 mm",
      "Price": "~$3"
    },
    quick: { clock: "72 MHz", io: "34 GPIO / 12 ADC", net: "USB" }
  },
  {
    id: "arduino-uno-r4",
    name: "Arduino Uno R4 Minima / WiFi",
    maker: "Arduino",
    cls: "microcontroller",
    tag: "5V classic, reborn",
    short: "The familiar Uno, now with a 32-bit Cortex-M4 core.",
    desc: "Same shield-friendly Uno footprint and 5 V logic as the R3, but with a Renesas RA4M1 at 48 MHz, a 12×8 LED matrix and a DAC. The WiFi variant adds an ESP32-S3 for Wi-Fi and Bluetooth while keeping the Uno shape.",
    specs: {
      "Processor": "Renesas RA4M1, Cortex-M4 @ 48 MHz",
      "Flash / RAM": "256 KB / 32 KB",
      "Voltage": "5 V logic",
      "Digital / Analog": "14 DIO / 6 ADC (12-bit)",
      "Connectivity": "USB-C, UART, I²C, SPI, CAN",
      "Wireless": "— (WiFi model: ESP32-S3, Wi-Fi + BLE)",
      "Size": "68.6 × 53.4 mm",
      "Price": "~$12 (Minima), ~$20 (WiFi)"
    },
    quick: { clock: "48 MHz", io: "14 DIO / 6 ADC", net: "USB-C (+Wi-Fi on WiFi)" }
  },
  {
    id: "arduino-nano-every",
    name: "Arduino Nano Every",
    maker: "Arduino",
    cls: "microcontroller",
    tag: "tiny 5V",
    short: "The classic Nano body with a modern ATmega4809 brain.",
    desc: "Same breadboard-friendly Nano footprint, but with more flash, more SRAM, more PWM and a newer peripheral set than the ATmega328P — a neat drop-in upgrade for tight 5 V builds.",
    specs: {
      "Processor": "ATmega4809 @ 20 MHz",
      "Flash / RAM": "48 KB / 6 KB",
      "Voltage": "5 V logic",
      "Digital / Analog": "15 DIO / 8 ADC",
      "Connectivity": "Micro-USB, UART, I²C, SPI",
      "Wireless": "—",
      "Size": "45 × 18 mm",
      "Price": "~$15"
    },
    quick: { clock: "20 MHz", io: "15 DIO / 8 ADC", net: "USB" }
  },
  {
    id: "esp32-wroom-32e",
    name: "ESP32-WROOM-32E DevKitC",
    maker: "Espressif",
    cls: "iot",
    tag: "reference devkit",
    short: "Espressif's own dev board — the default Wi-Fi starting point.",
    desc: "The official DevKitC carrier for the WROOM-32E module: dual-core ESP32, USB-UART bridge, Boot/Reset buttons and every usable pin on two headers. If a tutorial says 'grab an ESP32', this is usually the board it means.",
    specs: {
      "Processor": "Xtensa LX6, 2× @ 240 MHz",
      "Flash / RAM": "4–8 MB flash / 520 KB SRAM",
      "Voltage": "3.3 V logic",
      "Digital / Analog": "up to 36 GPIO / 18 ADC (12-bit)",
      "Connectivity": "UART, I²C, SPI, DAC, touch",
      "Wireless": "Wi-Fi 802.11 b/g/n, BT 4.2 + BLE",
      "Size": "≈ 48 × 25 mm",
      "Price": "~$7"
    },
    quick: { clock: "240 MHz ×2", io: "36 GPIO / 18 ADC", net: "Wi-Fi + BT" }
  },
  {
    id: "esp32-s3-devkit",
    name: "ESP32-S3 DevKit",
    maker: "Espressif",
    cls: "iot",
    tag: "tinyml ready",
    short: "Wi-Fi, BLE, camera and vector instructions for edge AI.",
    desc: "The next-generation ESP32: dual cores at 240 MHz with AI vector instructions, native USB, a camera/LCD interface and up to 16 MB flash plus PSRAM. A favourite for TinyML, voice and camera projects.",
    specs: {
      "Processor": "Xtensa LX7, 2× @ 240 MHz (AI vectors)",
      "Flash / RAM": "up to 16 MB / 512 KB (+PSRAM)",
      "Voltage": "3.3 V logic",
      "Digital / Analog": "45 GPIO / 20 ADC (12-bit)",
      "Connectivity": "USB OTG, UART, I²C, SPI, camera, LCD",
      "Wireless": "Wi-Fi 802.11 b/g/n, Bluetooth 5 (LE) + Mesh",
      "Size": "≈ 70 × 28 mm",
      "Price": "~$10"
    },
    quick: { clock: "240 MHz ×2", io: "45 GPIO", net: "Wi-Fi + BLE" }
  },
  {
    id: "raspberry-pi-pico-2",
    name: "Raspberry Pi Pico 2 / Pico 2W",
    maker: "Raspberry Pi Foundation",
    cls: "microcontroller",
    tag: "PIO powerhouse",
    short: "RP2350 with M33 or RISC-V cores and a wireless sibling.",
    desc: "Raspberry Pi's second-generation Pico: RP2350 with dual Cortex-M33 (or Hazard3 RISC-V) cores, 520 KB SRAM, Arm TrustZone and those brilliantly flexible PIO state machines. The Pico 2W adds Wi-Fi and Bluetooth 5.2.",
    specs: {
      "Processor": "RP2350, 2× Cortex-M33 / Hazard3 RISC-V @ 150 MHz",
      "Flash / RAM": "4 MB flash / 520 KB SRAM",
      "Voltage": "3.3 V logic",
      "Digital / Analog": "26 GPIO / 3 ADC (12-bit)",
      "Connectivity": "USB, UART, I²C, SPI, PIO, HSTX",
      "Wireless": "— (Pico 2W: Wi-Fi 4 + Bluetooth 5.2)",
      "Size": "51 × 21 mm",
      "Price": "~$5 (2W ~$8)"
    },
    quick: { clock: "150 MHz ×2", io: "26 GPIO / 3 ADC", net: "Wi-Fi + BT (2W)" }
  },
  {
    id: "teensy-41",
    name: "Teensy 4.1",
    maker: "PJRC",
    cls: "microcontroller",
    tag: "speed demon",
    short: "600 MHz of Cortex-M7 with Ethernet on board.",
    desc: "A blisteringly fast microcontroller with hardware floating point, 8 MB flash, 7.9 MB RAM, built-in 10/100 Ethernet, USB host and a microSD socket. The go-to board for audio, DSP and hard real-time control loops.",
    specs: {
      "Processor": "ARM Cortex-M7 (i.MXRT1062) @ 600 MHz",
      "Flash / RAM": "8 MB flash / 7.9 MB RAM",
      "Voltage": "3.3 V logic (not 5 V tolerant)",
      "Digital / Analog": "55 DIO / 18 ADC (35 PWM)",
      "Connectivity": "USB host, 10/100 Ethernet, microSD, 8× UART, 3× I²C, 3× SPI",
      "Wireless": "—",
      "Size": "61 × 18 mm",
      "Price": "~$40"
    },
    quick: { clock: "600 MHz", io: "55 DIO / 18 ADC", net: "Ethernet" }
  },
  {
    id: "xiao-esp32c3",
    name: "Seeed Studio XIAO ESP32C3",
    maker: "Seeed Studio",
    cls: "iot",
    tag: "fingertip IoT",
    short: "Thumb-sized, castellated, Wi-Fi and BLE on board.",
    desc: "A fingernail-sized RISC-V board with Wi-Fi and BLE, USB-C and every pin broken out to solder castellations. Designed to disappear into battery-powered sensors, wearables and hidden IoT nodes.",
    specs: {
      "Processor": "ESP32-C3, RISC-V @ 160 MHz",
      "Flash / RAM": "4 MB flash / 400 KB SRAM",
      "Voltage": "3.3 V logic",
      "Digital / Analog": "11 GPIO / 11 ADC (all PWM)",
      "Connectivity": "USB-C, UART, I²C, SPI, ADC",
      "Wireless": "Wi-Fi, Bluetooth 5.0 (BLE)",
      "Size": "21 × 17.5 mm",
      "Price": "~$6"
    },
    quick: { clock: "160 MHz", io: "11 GPIO", net: "Wi-Fi + BLE" }
  },
  {
    id: "qt-py-rp2040",
    name: "Adafruit QT Py RP2040",
    maker: "Adafruit",
    cls: "microcontroller",
    tag: "qwiic cutie",
    short: "A 22 mm RP2040 built around one plug-in I²C connector.",
    desc: "Tiny RP2040 board with a Stemma QT / Qwiic port: clip on an OLED, sensor or LED ring with zero soldering. Ships with CircuitPython ready to go, plus a NeoPixel and reset/boot buttons.",
    specs: {
      "Processor": "RP2040, 2× Cortex-M0+ @ 133 MHz",
      "Flash / RAM": "8 MB flash / 264 KB SRAM",
      "Voltage": "3.3 V logic",
      "Digital / Analog": "13 GPIO / 4 ADC (12-bit)",
      "Connectivity": "USB-C, Stemma QT / Qwiic I²C, UART, SPI, PWM",
      "Wireless": "—",
      "Size": "21.8 × 17.8 mm",
      "Price": "~$10"
    },
    quick: { clock: "133 MHz ×2", io: "13 GPIO / 4 ADC", net: "Qwiic I²C" }
  }
];
