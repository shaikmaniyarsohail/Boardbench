# BoardBench

**A field guide to the tiny computers that power makers — from the classic Arduino Uno to the mighty Raspberry Pi.**

BoardBench is a zero-dependency, single-page website for exploring and comparing development boards. Hand-written HTML, CSS and vanilla JavaScript — no frameworks, no build step, no bundler. Open `index.html` and it just works.

> Designed with a printed-circuit-board aesthetic: solder-mask green, copper traces, silkscreen typography and a power LED that actually blinks. The palette is authored in **OKLCH** so every surface step is perceptually even.

---

## ✨ Features

- **17 documented boards** across 5 classes — microcontrollers, single-board computers, IoT, AI/edge and education
- **Interactive filtering** — narrow the grid by board class with one tap
- **Board detail modal** — full spec sheet per board (CPU, memory, I/O, wireless, size, price), closable via `Esc`, backdrop or ✕
- **Head-to-head comparison** — pick any two boards and compare 7 spec rows, with cheaper prices highlighted
- **Starter kits & Pinout 101** — what to buy for your first build, and the three rules that save magic-smoke moments
- **Animated hero** — flowing PCB traces, pulsing vias and staggered reveals, all pure CSS
- **Fully responsive** — desktop down to mobile
- **Accessible** — keyboard-operable cards (`Enter`/`Space`), visible focus states, ARIA-labelled dialog

## 🛠 Tech stack

| Layer | Choice |
|---|---|
| Markup | Semantic HTML5 |
| Styling | Modern CSS (custom properties, grid, clamp(), animations) |
| Logic | Vanilla ES6+ JavaScript (no dependencies) |
| Fonts | [Chakra Petch](https://fonts.google.com/specimen/Chakra+Petch) + [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) (Google Fonts) |

## 🎨 Colour system

All tokens in `css/style.css` are derived from **OKLCH**, a perceptually uniform colour
space: equal `L` steps look like equal steps to the eye, which hex and HSL cannot
guarantee. The hues are unchanged from the original design — only lightness and chroma
were rebalanced.

**Green surface ramp** — evenly stepped in ~6L increments, so each layer reads as its own
plane instead of smearing into the next. Every surface stays below `C=0.07`, keeping the
greens as the composition's neutral baseline.

| Token | Hex | OKLCH | Role |
|---|---|---|---|
| `--pcb-deep` | `#04140c` | `oklch(17.5% 0.030 159)` | Page background |
| `--pcb-dark` | `#0d2317` | `oklch(23.5% 0.038 158)` | Footer, alt bands |
| `--card` | `#173323` | `oklch(29.5% 0.046 157)` | Cards, panels |
| `--pcb` | `#224631` | `oklch(36.0% 0.055 157)` | Raised surfaces |
| `--card-line` | `#345d44` | `oklch(44.0% 0.062 156)` | Hairlines, borders |
| `--trace` | `#417655` | `oklch(52.0% 0.078 155)` | Traces, corner brackets |

**Silkscreen text ramp** — same hue family at near-zero chroma: `--silk` `#edf6ef`,
`--silk-dim` `#aabcb0`, `--silk-mute` `#8da094` for tertiary copy.

**Accents** — a warm/cool pair that carries all the saturation. Because the greens are
chroma-limited, these read as deliberate marks rather than decoration: `--copper`
`#dda43a` (gold, H=79°), `--copper-deep` `#b58023`, `--led` `#5efb92` (signal green,
H=151°), `--led-dim` `#51c67c` for quiet/secondary signal, and `--warn` `#fd5f55` for
alarms. `--led-dim` exists so the neon green is reserved for genuine signals — active
filters, focus rings and primary actions — instead of being spent on every border.

## 📁 Project structure

```
boardbench/
├── index.html          # Page structure: hero, boards, compare, kits, pinout
├── css/
│   └── style.css       # Design system, layout, animations, responsive rules
├── js/
│   ├── boards-data.js  # Board dataset (specs for all 17 boards)
│   └── main.js         # Rendering, filtering, modal, comparison logic
├── microcontroller_boards_features.md  # Full MCU board features reference
└── README.md
```

## 🚀 Getting started

No build step required. Any of these works:

**Option 1 — open directly**

```bash
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows
```

**Option 2 — serve locally (recommended, matches production)**

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

### Adding a new board

Append one object to `BOARDS` in `js/boards-data.js`:

```js
{
  id: "my-board",
  name: "My Board",
  maker: "Maker Co.",
  cls: "microcontroller",        // microcontroller | sbc | iot | education | ai
  tag: "short badge",
  short: "One-line elevator pitch.",
  desc: "Longer description shown in the detail modal.",
  specs: {
    "Processor": "…", "Flash / RAM": "…", "Voltage": "…",
    "Digital / Analog": "…", "Connectivity": "…", "Wireless": "…",
    "Size": "…", "Price": "…"
  },
  quick: { clock: "…", io: "…", net: "…" }
}
```

The grid, filter chips, comparison dropdowns and hero counters all update automatically.

## 📚 Microcontroller board features

The site is backed by a deeper reference guide: **[microcontroller_boards_features.md](./microcontroller_boards_features.md)** — a spec sheet for eight popular microcontroller boards, all eight of which are also in the site's grid (classes: microcontrollers, IoT / wireless). Condensed view:

| Board | Core @ Clock | Memory (Flash / SRAM) | Logic | Best for |
|---|---|---|---|---|
| Arduino Uno R4 Minima / WiFi | Cortex-M4 (RA4M1) @ 48 MHz | 256 KB / 32 KB | 5 V | Beginners, education, 5 V shield compatibility |
| Arduino Nano Every | ATmega4809 @ 20 MHz | 48 KB / 6 KB | 5 V | Compact breadboard projects needing 5 V logic |
| ESP32-WROOM-32E (Generic DevKitC) | Dual Xtensa LX6 @ 240 MHz | 4–8 MB / 520 KB | 3.3 V | IoT, smart home, sensor logging, web servers |
| ESP32-S3 DevKit | Dual Xtensa LX7 @ 240 MHz (AI vectors) | up to 16 MB / 512 KB (+PSRAM) | 3.3 V | TinyML at the edge, camera and HMI projects |
| Raspberry Pi Pico 2 / Pico 2W | RP2350, dual Cortex-M33 / Hazard3 RISC-V @ 150 MHz | 4 MB / 520 KB | 3.3 V | PIO hardware state machines, budget computing |
| Teensy 4.1 | Cortex-M7 (i.MXRT1062) @ 600 MHz | 8 MB / 7.9 MB | 3.3 V | Audio synthesis, DSP, real-time control |
| Seeed Studio XIAO ESP32C3 | RISC-V single-core @ 160 MHz | 4 MB / 400 KB | 3.3 V | Miniature wearables, hidden low-power IoT nodes |
| Adafruit QT Py RP2040 | RP2040, dual Cortex-M0+ @ 133 MHz | 8 MB / 264 KB | 3.3 V | Tiny plug-and-play Stemma QT / Qwiic sensor rigs |

> ⚡ Voltage rule of thumb: if a board says **3.3 V**, never feed it 5 V signals directly — see *Pinout 101* on the site.

## ✅ Verification

The project was verified with:

- `node --check` on both JavaScript files (syntax)
- Data integrity check: unique IDs, all 8 required spec fields plus `quick` values present on every board, all 8 reference-guide boards in the dataset
- Headless Chrome render test — 17 board cards and both comparison dropdowns present in the live DOM, zero JS errors
- Headless Chrome interaction suite (**21 assertions, all passing**): per-class filtering counts, modal open via click and `Enter`/`Space`, close via `Esc`, backdrop and ✕, full 8-row spec sheet, comparison table update and cheaper-price highlight
- HTTP probe: all assets return `200`

### Palette verification

The colour rework was verified numerically rather than by eye:

- **OKLCH contrast gate** — 22 automated WCAG checks across every text/surface and
  border/surface pairing; all pass (body text is 4.95:1 to 17.14:1, borders ≥ 1.82:1)
- **Hue preservation check** — accent hues were diffed against the original palette and
  confirmed unchanged (gold off by 1°, signal green and alarm red by 0°, surfaces ≤ 3°)
- **Rendered-pixel audit** — the headless screenshot at 1440×2600 was decoded and its
  histogram checked against the tokens: page background `#04140c` covers 26.9% of the
  canvas and card surfaces `#173323` cover 27.7%, with the measured card-vs-page
  separation (1.38:1) matching the value predicted from the OKLCH lightness step
- **Gradient headline check** — pixel positions of green- and gold-hued glyphs confirm the
  `background-clip:text` gradient runs left-to-right as intended, rather than failing to a
  transparent colour
- **Computed-style audit** — every token resolves in a real browser, and the stylesheet
  parses and applies in full

## ⚠️ Disclaimer

Specifications and prices are indicative and assembled from public sources. Always confirm against the official datasheet and product page before designing hardware around a board.

## 📄 License

Free to use, adapt and share for personal or commercial projects. Attribution appreciated but not required.
