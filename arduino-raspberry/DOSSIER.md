# Idea dossier: Arduino + Raspberry Pi creative lab ("Victor directs, Claude builds")

Date: 2026-09-25. Author: Claude (senior), for Victor. Status: **idea, not started; interview pending.**
Stage: learning / portfolio / open source (not commercial). No sketch for this idea.

## Summary (five lines)
- Victor gives creative direction; Claude Code writes, compiles and uploads the Arduino code from the
  Mac mini's terminal with the free, open-source `arduino-cli`. Victor's hands do only what an AI cannot:
  plug in, photograph, wire from a numbered table, and watch what happens.
- This already works in practice (Adafruit did it with Claude Code in March 2025). What is new here is the
  packaging: no accounts, zero running cost, 20-minute evening sessions, Spanish device text, and the
  Mac mini's local 35B model as the "brain" for creative content (poems, oracle answers) at $0.
- MVP: plug the Arduino in and, in under 20 minutes, Claude identifies it, makes its LED spell a word of
  Victor's choice in Morse code and reads back a "hola" message. Victor types no code.
- Then a ladder of 10 projects, from a blinking LED to a pendulum that measures gravity and a physical
  ListoLista button.
- Raspberry Pi: wait. 2026 memory prices doubled the Pi 5 (16 GB is now $305), and a Pi cannot run the
  35B junior; the Mac mini is already the better brain.

---

## The idea in Victor's words
(Paraphrased from Victor, 2026-09-25; not a verbatim quote.)
- He owns an Arduino, a birthday gift from his wife; he does not know the exact model.
- He is interested in Raspberry Pi too.
- He wants to build creative projects with Claude Code doing the programming while he gives the
  creative direction.
- He is too tired after work for old-school learning (courses, reading datasheets, typing code).

---

## What already exists (prior art)

| What | Date | What it shows | What we would do differently |
|---|---|---|---|
| Adafruit: Claude Code driving Arduino development (Metro Mini board + colour sensor) | 2025-03-09 | Claude Code with shell access compiles, uploads, reads the board's output and fixes errors in a loop. Adafruit called it semi-automated; a human still decides the design. | Same core loop, but tuned for a non-engineer: photo-based board ID, numbered wiring tables, safety checklist, short sessions. |
| Claude Code plugins/skills for `arduino-cli` (e.g. `lookfwd/arduino-cli-claude-plugin`: 5 slash commands; an ESP32 skill by EricSun787) | accessed 2026-09-25 (undated, 1-commit repos) | People package the same commands as reusable skills. | Don't install a third-party plugin at first; a 1-page recipe in the project's `AGENTS.md` does the same, stays vendor-neutral (works for Codex, Gemini, the local junior). Revisit if the recipe grows. |
| Arduino MCP servers (`hardware-mcp/arduino-mcp-server`, `Oliver0804/arduino-cli-mcp`, `amahpour/arduino-mcp-server-simple`, `mixelpixx/Arduino-Agent`) | accessed 2026-09-25 | Wrap `arduino-cli` so any AI app can list boards, compile, upload, read serial. | Not needed: Claude Code already has a shell. MCP adds an install and a dependency for no new ability. Useful only if Victor later wants to drive the board from a chat app. |
| Arduino's own AI Assistant (Cloud Editor, powered by Claude) | 2025-04-17 (launch), 2025-06-26 (why Claude) | Official, hardware-aware help. Free tier: 30 AI chats/month, 25 compilations/day. | Requires an Arduino account (against Victor's no-login-wall rule), runs in their cloud, and the free tier is small. We use the Claude Code he already pays for. |
| Arduino App Lab 0.10 "Agentic Mode" (for the UNO Q board) | 2026-08-12 | An agent that creates files, runs the app and reads errors, via MCP. | Bring-your-own API key, so it is paid per use (breaks "zero running cost"), and it targets the UNO Q, not a classic Arduino. Watch list only. |
| Wokwi simulator (browser; CLI with experimental MCP for AI agents) | docs built 2026-09-16 | Simulate Arduino + parts before touching wires; the circuit file (`diagram.json`) doubles as a wiring picture. Browser use works without an account; CI is 50 free minutes/month. | Optional add-on (Option C), never required. The CLI needs an account token. |
| Starter kits: official Arduino Starter Kit R4 (UNO R4 WiFi, 13 projects, $95) and the popular ELEGOO UNO R3 Super Starter Kit (UNO R3-compatible board, LCD, servo, ultrasonic sensor, DHT11, buzzers, buttons, relay…) | 2025-11-18 (R4 kit); ELEGOO list accessed 2026-09-25 | Most gifts are one of these. The kit's parts decide which projects cost $0. | Inventory the kit from one photo (checkpoint 0) and pick projects that use what Victor already owns. |
| Pendulum measures gravity with an Arduino + ultrasonic sensor (published physics-education work) | 2019 | g measured as 9.806 ± 0.025 m/s² with cheap parts. | Project 6: same idea, with the analysis done in Victor's existing JupyterLab. |

**Verdict:** the technical loop is proven and free. Nobody has packaged it for "creative director with no
time to learn": that packaging (and the Mac mini as a free local brain) is the contribution, and the
write-ups are good open-source portfolio material.

Context worth knowing (2025-10-07 to 2025-11-21): Qualcomm announced it would buy Arduino; new website
terms caused a backlash; Arduino replied "Anything that was open, stays open" (blog, 2025-11-21).
`arduino-cli` is open source (GitHub, latest release v1.5.1, 2026-06-05), so our route does not depend on
Arduino's cloud or terms.

---

## How it could work

### Who does what
| Role | Does | Does not |
|---|---|---|
| **Victor** (creative director, hands) | Picks projects and the "feel" (what it says, how it blinks, Spanish wording). Plugs in, photographs board/kit/wiring, wires from a numbered table, reports what he sees, approves installs. | Type code, read datasheets, debug compiler errors. |
| **Claude** (senior, Claude Code on the Mac mini) | Identifies the board, installs board support, writes the sketch, compiles, uploads, reads the board's messages, writes the wiring table and "before power" checklist, checks wiring photos, explains in 2-3 sentences when a concept matters (just-in-time learning). | Touch hardware; see physical results except through serial messages or Victor's photos. |
| **Local junior** (Qwen3.6-35B on the Mac mini) | (1) Writes small sketches from a brief, with `arduino-cli compile` as the pass/fail check. (2) At runtime, is the device's creative brain: poems, oracle answers, a plant's "diary" line, over USB, offline, $0. (3) Answers "what does this line do?" in Open WebUI. | Upload to the board (the sandbox has no USB access, on purpose). |
| **Other cloud AIs** (ChatGPT, Gemini) | Second opinion on a wiring/safety question; brainstorming project ideas (Copilot role). | Nothing here depends on them. |

### Option A (recommended): `arduino-cli` + Claude Code in the terminal
- Install: `brew install arduino-cli` (Homebrew already set up; no password normally), then board support
  for the one board family Victor owns: `arduino-cli core install arduino:avr` (UNO R3, Nano, Mega and
  most clones) or `arduino:renesas_uno` (UNO R4).
- The loop Claude runs:
  ```
  arduino-cli board list                                   # which port, which board (or "Unknown")
  arduino-cli compile --fqbn arduino:avr:uno projects/01-hola/hola
  arduino-cli upload  -p /dev/cu.usbmodemXXXX --fqbn arduino:avr:uno projects/01-hola/hola
  arduino-cli lib install "DHT sensor library"             # libraries when a part needs one
  ```
  (`--fqbn` = the board's full name, e.g. `arduino:renesas_uno:unor4wifi` for an UNO R4 WiFi.)
- Reading what the board says: `arduino-cli monitor` exists but is interactive and "very limited" by
  Arduino's own FAQ. Claude writes a 20-line helper (`tools/listen.py`, pyserial via uv) that listens for
  N seconds and saves a log, so every run leaves evidence.
- Why first: official, open source, one small tool, no accounts, no running cost, and every AI vendor
  can drive it (vendor-neutral).

### Option B: PlatformIO Core (command line)
- A Python-based build tool covering many board families (AVR, ESP32, RP2040/Pico, STM32) with
  version-pinned libraries per project and a unit-test runner.
- Better when projects span several boards or need pinned dependencies; heavier (downloads a toolchain
  per platform into the home folder; storage is Victor's tightest resource).
- Verdict: switch only if checkpoint 3+ brings a second board family (e.g. a Pico 2 W or ESP32).

### Option C (add-on, optional): simulate first with Wokwi
- Claude writes the sketch plus a `diagram.json`; Victor opens it on wokwi.com (no account needed to run;
  anonymous projects can be saved only once) and sees the circuit drawn and running before wiring.
- Good for the Lissajous machine or anything with several parts. The command-line/MCP version needs an
  account token: skip unless Victor wants it.

### The Mac mini as the brain (bridge pattern)
- The Arduino stays plugged into the always-on Mac mini by USB. A small Python script on the Mac
  (`tools/bridge.py`) reads lines like `ASK:poema` from the board, asks the local 35B at
  `http://127.0.0.1:8080` (thinking off, one short answer), and sends the text back to the board.
- Nothing is opened to the network: the model server stays bound to 127.0.0.1, exactly as today.
- The same pattern logs sensor data to CSV for JupyterLab (already installed: pandas, matplotlib).
- Untethered devices (in the kitchen, in a plant pot) need Wi-Fi hardware and a decision to let other
  devices reach the Mac: later, only if wanted.

### Identifying the unknown board (checkpoint 0, about 5 minutes)
1. Victor photographs the board (both sides), the USB connector and the box/manual, and sends them to
   Claude. Claude reads the printed names and chip markings.
2. Quick clues:

   | Clue | Most likely |
   |---|---|
   | Square "printer" USB-B socket | UNO R3 or Mega 2560 (official or clone) |
   | USB-C socket | UNO R4 (Minima/WiFi), UNO Q, newer Nanos |
   | Grid of 96 tiny red LEDs (12 x 8) on the board | UNO R4 WiFi (e.g. the Starter Kit R4 from Nov 2025) |
   | Big chip marked ATMEGA328P | UNO R3 (or Nano) |
   | Long board, chip ATMEGA2560 | Mega 2560 |
   | Small chip marked CH340 near the USB socket, or an ELEGOO/other logo | Compatible clone; usually treated as UNO/Nano |
   | "UNO Q" and a Qualcomm chip | UNO Q (a Linux computer + Arduino in one) |

3. `arduino-cli board list` shows the port and the USB maker ID. Arduino's FAQ explains that clones with
   CH340/FTDI chips appear as "Unknown": the computer only sees the USB chip, not the board. Then the
   photo decides the board name; a test upload of "hola" confirms it.

### What Victor must do by hand
- Plug the USB cable in (a **data** cable: some cables only charge).
- Photograph: board, box, the kit's parts spread on a table (Claude makes the inventory), and each new
  circuit before first power-on.
- Wire on the breadboard from Claude's numbered table (step, from pin, to row, wire colour), **with USB
  unplugged**, one wire per line.
- Place things in the world: sensor in the plant pot, pendulum on a string, pen in the drawing arm.
- Say what he sees ("blinks 3 times", "buzzer silent", "LCD shows squares") and approve installs.

### Safety with power (the short list; Claude repeats the relevant lines every time)
- **Never** connect anything to wall power (127 V in Mexico). The kit's relay module is for low-voltage
  loads only; lamps and appliances are off-limits in this project.
- USB power from the Mac is safe for LEDs, sensors, buzzers, a small display, one micro-servo.
- Each pin: stay at or below 20 mA (40 mA is the damage limit). Every LED gets a resistor
  (220 Ω–1 kΩ). Motors, pumps, several servos: separate supply + driver, grounds joined.
- Check the board's voltage before adding a sensor: UNO R3/R4 boards are 5 V; ESP32, Pico and UNO Q boards work at 3.3 V
  and can be damaged by 5 V signals.
- Unplug USB before changing any wire. If something gets hot, smells, or the Mac warns about USB power:
  unplug at once and send a photo.
- No loose LiPo batteries without a separate decision. Water projects: electronics above and away from
  water.
- Work on a wooden or plastic surface, not on metal or foil; drinks away from the breadboard.

---

## Project ladder (10 first projects, progressively harder)
Every project follows the same loop: Victor picks and describes the feel → Claude writes code, wiring
table and checklist → Victor wires (USB unplugged), photographs → Claude checks the photo → upload →
Victor watches → Claude reads the board's messages and adjusts. Device text is Spanish first.

| # | Project | Extra parts (beyond a typical starter kit) | Hook for a mathematician/philosopher | Sessions |
|---|---|---|---|---|
| 1 | **Latido**: the on-board LED spells a word in Morse | none | Codes as meaning | 1 (the MVP) |
| 2 | **Vida**: Conway's Game of Life on the LED grid | none on an UNO R4 WiFi; otherwise the Mac screen or an 8x8 LED matrix module | Emergence from simple rules; a torus world | 1 |
| 3 | **Poemas en morse**: buzzer + button; plays poems in Morse, decodes what you tap | none (buzzer, button in kit) | Is Morse an efficient code for Spanish? | 1-2 |
| 4 | **¿Existe el azar?**: hardware noise vs pseudo-random numbers | none (optional photoresistor) | Determinism; testing randomness | 1-2 |
| 5 | **Tengo sed**: plant reminder | capacitive soil sensor (a few dollars) | Calibration; thresholds with hysteresis | 1-2 |
| 6 | **El péndulo**: measure g and damping | string, a weight, ruler (sensor usually in kit) | Fit T² vs L; small-angle error; exponential decay | 2-3 |
| 7 | **Estación del clima**: temperature/humidity station with logging | none with DHT11 in kit; BME280 for pressure (a few dollars) | Dew-point formula; daily cycles | 2 |
| 8 | **El oráculo**: press a button, the LCD shows an aphorism from the local 35B | none (LCD + button in kit) | Writing under constraint (32 characters) | 2 |
| 9 | **Botón ListoLista**: kitchen buttons that add staples to the shared list | none (buttons); ListoLista must be live | The "quantum paper" gets a physical input | 3-4 |
| 10 | **Lissajous**: a two-servo arm draws curves with a pen | 2nd micro-servo, cardboard, pen (kit usually has 1 servo + power module) | Parametric curves; 2-link inverse kinematics | 3-4 |

### Project details
**1. Latido (the MVP).** Parts: board + USB cable only. Claude: sketch that blinks a word Victor
chooses (e.g. his wife's name) in Morse and prints "Hola, soy tu Arduino …" over USB; compile, upload,
read back. Victor: plug in, choose the word, watch.

**2. Vida.** Parts: none on an UNO R4 WiFi (its 12 x 8 LED grid); on other boards the board streams
generations to the Mac terminal, or an 8x8 LED matrix module is added later. Claude: Game of Life with
wrap-around edges, a "random soup" restart when the pattern dies or loops (loop detection is a nice
touch). Victor: choose starting patterns ("glider", "his initials"), speed.

**3. Poemas en morse.** Parts: passive buzzer, push button, LED, resistor. Claude: Morse player
(poem text sent from the Mac) and a decoder for what Victor taps (timing thresholds adapt to his
rhythm); with the bridge, the local 35B writes a new short poem on request. Victor: wire 4-6 jumpers,
pick poems/themes, tap messages. Hook: Morse gives common English letters short codes; with Spanish
letter frequencies, compute the expected code length and compare with an optimal (Huffman) code in
Jupyter.

**4. ¿Existe el azar?** Parts: none (an unconnected analog pin) or a photoresistor. Claude: stream bits
from electrical noise and from the Arduino's pseudo-random generator (which repeats the same sequence
after every reset unless seeded); Jupyter notebook with frequency, runs and chi-square tests, and von
Neumann's trick to remove bias. Victor: press reset, compare, argue with the results. Honest note: a
floating pin is a poor, biased random source; that is the lesson.

**5. Tengo sed.** Parts: capacitive soil-moisture sensor (the cheap resistive ones corrode within
weeks), LED or buzzer. Claude: calibration routine (sensor in air = dry, in a glass of water = wet),
threshold with hysteresis so it doesn't flicker, one gentle chirp in the evening; later a daily CSV and a
one-line "plant diary" written by the local 35B. Victor: insert sensor, water the plant, tell Claude
which pot and plant.

**6. El péndulo.** Parts: ultrasonic sensor (HC-SR04, common in kits) or an LED + photoresistor
"light gate", string, a weight, ruler, tape. Claude: time each swing in microseconds, send to the Mac;
notebook that fits period vs length to estimate g, shows the amplitude decay (exponential) and the
large-angle correction to the textbook formula. Victor: build the pendulum from a door frame or table
edge, change lengths, release. One published classroom version reached a standard error of about 0.3 %.

**7. Estación del clima.** Parts: DHT11 (in many kits; coarse) or BME280 (adds air pressure), LCD 16x2.
Claude: readings every minute to the LCD and to a CSV on the Mac; notebook with daily curves, dew
point, and (with BME280) a pressure-trend "forecast arrow". Victor: pick where it lives, choose what the
screen shows.

**8. El oráculo.** Parts: LCD 16x2, button (kit). Claude: button sends `ASK` to the Mac; bridge asks the
local 35B for an aphorism or Socratic question of at most 32 characters, in Spanish; LCD scrolls it.
Victor: choose the oracle's personality (Stoic, Borges-like, Socratic) and the rules. Caveat: this LCD
has no á, é, ñ built in; Claude defines them as custom characters (up to 8) or uses plain letters.

**9. Botón ListoLista.** Parts: 2-4 buttons with labels (huevos, leche, tortillas, café). Claude: board
sends `ADD:huevos`; the bridge on the Mac is a small headless ListoLista client (reusing ListoLista's
tested encryption and merge modules) that adds the item to the shared list through the existing relay;
the list's secret link is stored only on the Mac. Victor: choose items, mount the buttons, test with his
wife's phone. Depends on ListoLista checkpoint 1 going live. Later option: a Wi-Fi board (Pico 2 W,
$7) so the button needs no USB cable (harder: the encryption must run on the tiny board).

**10. Lissajous.** Parts: two micro-servos (kit usually has one), the kit's breadboard power module for
the servos, cardboard, tape, a pen. Claude: inverse kinematics for a two-link arm, curves x = sin(a t + δ),
y = sin(b t), speed limits so the pen doesn't skip; Wokwi preview optional. Victor: build the arm
(cardboard and hot glue are fine), choose ratios a:b. Mechanically the fiddliest project; expect retries.

---

## Raspberry Pi section

### Which Pi, if any (prices in USD as of April 2026)
| Board | Price | What it is | Verdict for Victor |
|---|---|---|---|
| Raspberry Pi 5, 16 GB | $305 (was $120 at launch) | Full Linux computer | No: poor value; the Mac mini is far stronger. |
| Raspberry Pi 5, 4 GB / 8 GB | $110 / $175 | Full Linux computer | Only if a project must live away from the Mac (camera, kitchen screen). 4 GB is enough. |
| Raspberry Pi 5, 2 GB / 1 GB | $65 / $45 | Full Linux computer | Enough for a dashboard or sensor hub. |
| Raspberry Pi Zero 2 W | $15 (not raised as of Apr 2026) | Tiny Linux computer, Wi-Fi | Good for one small always-on gadget. |
| Raspberry Pi Pico 2 W | $7 | Microcontroller (Arduino-like) with Wi-Fi, programmable in MicroPython | Best value for Wi-Fi gadgets (the untethered ListoLista button). Python is closer to what Victor knows. |
| Arduino UNO Q (2 GB) | $59 | Arduino + Linux on one board | Interesting, but its AI agent mode needs a paid API key. Watch list. |

A Pi 5 also needs a power supply, a microSD card and a case (extra cost). Prices rose four times from
Oct 2025 to Apr 2026 because AI data centres drove memory costs up (Raspberry Pi, 2026-02-02;
Electronics Weekly, 2026-04-06).

**Recommendation:** don't buy a Pi now. Finish checkpoints 1-3 with the Arduino and the Mac mini. Buy a
$7 Pico 2 W when a project truly needs Wi-Fi; buy a Pi only for a project that must live elsewhere in the
house with a screen or camera.

### Running a local model on a Pi: realistic or not?
- **Not realistic for the 35B junior.** It needs about 20+ GB of memory and a strong GPU; even a $305
  16 GB Pi would be far too slow.
- **Realistic only for tiny models (1-3 B) as toys.** CNX Software measured on a Pi 5 CPU: ~11.7 tokens/s for Qwen2.5 1.5B
  (a token is about 3/4 of a word) and ~4.8 tokens/s for Llama 3.2 3B (2026-01-20). The Mac mini's
  35B writes ~40 tokens/s and is far smarter.
- **The AI HAT+ 2 ($130, Jan 2026)** was slower than the Pi's own CPU for language models in that
  review; it is good for camera/vision work, not for chat.
- **Better pattern:** Pi or Pico as eyes, ears and hands; the Mac mini as the brain. That requires letting
  household devices reach the Mac's model server (today bound to 127.0.0.1 only, by Victor's choice).
  That is a security decision for later, not a default.

### Good Pi projects (for later)
1. **Kitchen dashboard** (Pi 5 2-4 GB + a small screen or e-ink): today's ListoLista, the weather station's
   readings, a "theorem of the day".
2. **Nature camera** (Pi 5 + camera module; AI HAT+ 2 optional): birds or the plant, time-lapse, with
   object detection on the device.
3. **Sensor hub**: several Pico 2 W gadgets (plant, weather) send readings over Wi-Fi to one Pi or to the Mac.
4. **Offline philosophy toy**: a 1-B model on a Pi Zero-class device answering one-line questions,
   deliberately small, as an exhibit of what tiny models can and cannot do.

---

## MVP / checkpoint 1

**MVP in one line:** plug in the Arduino and, in under 20 minutes, Claude identifies it, makes its LED
spell a word of Victor's choice in Morse and reads back a "hola" message; Victor types no code.

### Checkpoints (each one used and enjoyed before the next)
| # | Checkpoint | Goal | Done when |
|---|---|---|---|
| 0 | Know the hardware | Board and kit identified from photos | `board.md` (model, port, board name) and `parts.md` (inventory) exist |
| 1 | **MVP: the "hola" loop** | Write → compile → upload → blink → read back, all by Claude | Victor sees the LED spell his word; Claude shows the board's message; ≤ 20 min |
| 2 | First wired creation | One project with parts (suggested: 2 Vida or 3 Poemas en morse) | It works on 3 different evenings without Claude's help |
| 3 | Mac mini as the brain | USB bridge to the local 35B (oracle, poems) or data into Jupyter (pendulum, weather) | Poem/answer/plot produced offline at $0 |
| 4 | Untethered or Pi (only if wanted) | Wi-Fi board or Pi for a device that lives elsewhere | Decided in the interview |

### First-session checklist (≤ 20 minutes, the evening Victor plugs it in)
Before (Claude, 2 min, with Victor's OK): `brew install arduino-cli` and `arduino-cli core update-index`.
- [ ] (1 min) Clear a wooden/plastic table; drink away. Don't plug in yet.
- [ ] (2 min) Photograph the board (top and bottom), its USB socket and the box; send to Claude.
- [ ] (1 min) Plug the board into the Mac mini with the kit's USB cable. A small "ON" light should glow.
- [ ] (2 min) Claude: `arduino-cli board list` → port and board name (or "Unknown" → the photo decides).
- [ ] (3 min) Claude: installs board support for that one family only.
- [ ] (1 min) Victor: choose a short word (e.g. "HOLA" or a name).
- [ ] (3 min) Claude: writes the Latido sketch, compiles, uploads.
- [ ] (1 min) Victor: watch the LED marked "L" spell the word; say "yes" or what you saw.
- [ ] (1 min) Claude: reads the board's "hola" message and shows it.
- [ ] (3 min) Victor: spread the kit's parts on the table, one photo; Claude writes `parts.md`.
- [ ] (1 min) Victor: pick the next project from the ladder; unplug; done.
If the port never appears (typical of clones with a CH340 chip): stop there. Installing the chip maker's
driver needs Victor's admin password and a macOS approval; Claude explains why before asking.

---

## Risks and honest caveats
1. **The AI cannot see or touch.** Wiring errors happen in Victor's hands. Photo checks of breadboards
   are imperfect (small holes, hidden rows). Mitigation: numbered tables with wire colours, one wire per
   step, a test sketch per part, and power-on only after the photo check.
2. **Hardware can break.** A wrong wire can kill a pin or a board (boards are cheap to replace, but it is
   discouraging; the Mac protects its USB ports, but don't test that). No wall power, ever; motors on separate
   power.
3. **Clone drivers.** Official boards need no driver. Clones with a CH340 chip may need the chip maker's
   (WCH) driver on macOS; sources conflict on whether current macOS includes one. Installing it needs the
   admin password and a system-extension approval: Victor's decision, explained first.
4. **Tiredness.** Debugging hardware at night can be frustrating. Every session has a "done" point
   within 20-30 minutes; projects are ordered so early ones need no wiring or very little.
5. **Some learning is unavoidable.** Safe wiring needs a few ideas (breadboard rows, LED direction,
   resistors). Claude teaches them just in time in 2-3 sentences, never as a course.
6. **Spanish on small screens.** The common LCD 16x2 lacks á, é, í, ó, ú, ñ; custom characters (max 8
   at once) or plain letters.
7. **Storage.** Classic Arduino (AVR) support is small. ESP32 support is multi-GB; PlatformIO also
   downloads toolchains. Rule: one board family at a time; remove what is unused (98 GB free on
   2026-09-25).
8. **Junior sandbox.** The local junior's sandbox blocks the home folder, so it cannot read Arduino's
   board-support files (`~/Library/Arduino15`) yet. Letting it compile needs a small read-only
   exception in `configs/junior.sb`: a security-config change for Victor to approve. Uploads stay
   with Claude.
9. **Arduino's direction.** Since Qualcomm's purchase (announced 2025-10-07) Arduino pushes cloud and
   AI features with accounts and paid API keys. Our route uses only the open-source `arduino-cli`, so
   it is insulated; watch it anyway.
10. **Raspberry Pi prices.** Memory prices may keep rising; any Pi purchase should be re-priced on the
    day.
11. **ListoLista coupling.** The ListoLista button depends on ListoLista's relay and encryption; changes
    there can break the bridge. Build it only after ListoLista checkpoint 1 is live and stable.
12. **Serial port is single-user.** Uploads fail while a monitor holds the port; the helper scripts
    must close it first (Claude's job, but a common "why did it fail?" moment).

---

## Effort estimate
| Stage | Victor's time | Claude's time | Money |
|---|---|---|---|
| Interview (this dossier) | 15-20 min | done | $0 |
| Checkpoints 0-1 (identify + MVP) | ≤ 20 min, one evening | ~15 min | $0 |
| Projects 2-4 (little or no wiring) | 20-40 min each | 15-30 min each | $0 |
| Projects 5-8 (sensors, bridge, Jupyter) | 1-2 evenings each | 30-60 min each | $0-10 per sensor if not in kit |
| Project 9 (ListoLista button) | 2-3 evenings | 2-4 h (headless client + tests; junior can take the tests) | $0 |
| Project 10 (Lissajous) | 3-4 evenings (mechanics) | ~1 h | a servo, a few dollars |
| Raspberry Pi (optional) | depends | depends | $7 (Pico 2 W) to $110+ (Pi 5 4 GB + extras) |
Running cost: $0 (Claude Max already paid; local model; no accounts or subscriptions).

---

## Interview questions for Victor
1. **The board and kit:** can you photograph the board (both sides) and the box? Was it a kit with
   parts, or only the board?
2. **What excites you most:** things that blink, sound and move (art), measuring the world (science and
   data), or objects tied to your daily life (plants, ListoLista, the kitchen)? Which 2-3 projects from
   the ladder would you do first?
3. **Where it lives:** happy to keep it plugged into the Mac mini (easiest, $0), or do you want devices
   around the house without cables (needs Wi-Fi boards and, for AI answers, letting home devices reach
   the Mac)?
4. **Parts budget:** $0 (only the kit), up to about $20, or more? Where do you usually buy
   (Mercado Libre, Amazon México, a local electronics shop)?
5. **Raspberry Pi:** what would you want a Pi to do that the Mac mini can't (be elsewhere, a camera, a
   screen)? OK to postpone buying until a project needs it?
6. **How hands-on:** you do the wiring with Claude's tables, or someone at home helps? Do you want the
   2-3 sentence "why" explanations, or pure direction?
7. **Rhythm:** how many minutes on a weekday evening (15, 30, 60)? Weekends?
8. **Safety comfort:** OK with the rules (no wall power, separate power for motors, water projects kept
   apart)? Anyone else, e.g. children, near the workbench?
9. **Open source and portfolio:** publish each project on GitHub (vdm285) with photos and short
   write-ups? In Spanish, English or both? Project name ideas?
10. **Installs and drivers:** OK for Claude to install `arduino-cli` via Homebrew now, and to ask you
    before any driver that needs your admin password?

---

## Sources (dated)
- Adafruit blog, "Fully automating Arduino development – Giving Claude Code access to hardware",
  2025-03-09: https://blog.adafruit.com/2025/03/09/fully-automating-arduino-development-giving-claude-code-access-to-hardware/
  (summary: eeNews Europe, 2025-03-10: https://www.eenewseurope.com/en/claude-code-to-automate-your-arduino-hardware-development/)
- arduino-cli releases (v1.5.1, 2026-06-05; v1.5.0, 2026-05-19): https://github.com/arduino/arduino-cli/releases
- Homebrew formula `arduino-cli` (accessed 2026-09-25): https://formulae.brew.sh/formula/arduino-cli
- Arduino CLI FAQ, "Unknown" boards and the limited monitor (accessed 2026-09-25): https://docs.arduino.cc/arduino-cli/FAQ/
- Claude Code plugin `lookfwd/arduino-cli-claude-plugin` (accessed 2026-09-25): https://github.com/lookfwd/arduino-cli-claude-plugin
- ESP32 Claude Code skill (accessed 2026-09-25): https://github.com/EricSun787/esp32-arduino-development
- Arduino MCP servers (accessed 2026-09-25): https://github.com/hardware-mcp/arduino-mcp-server ,
  https://github.com/oliver0804/arduino-cli-mcp , https://github.com/amahpour/arduino-mcp-server-simple ,
  https://github.com/mixelpixx/Arduino-Agent
- Arduino blog, AI Assistant launch, 2025-04-17: https://blog.arduino.cc/2025/04/17/code-faster-with-the-new-arduino-ai-assistant/ ;
  "Why we chose Claude…", 2025-06-26: https://blog.arduino.cc/2025/06/26/why-we-chose-claude-for-the-arduino-cloud-ai-assistant/
- Arduino blog, "Arduino App Lab 0.10: Meet Agentic Mode", 2026-08-12: https://blog.arduino.cc/2026/08/12/arduino-app-lab-0-10-meet-agentic-mode/
- Arduino US store, UNO Q 2 GB at $59 (accessed 2026-09-25): https://store-usa.arduino.cc/products/uno-q
- Qualcomm press release, "Qualcomm to acquire Arduino", 2025-10-07: https://www.qualcomm.com/news/releases/2025/10/qualcomm-to-acquire-arduino-accelerating-developers--access-to-i
- The Register, "Makers slam Qualcomm…", 2025-11-21: https://www.theregister.com/2025/11/21/adafruit_makers_unhappy_with_arduino ;
  Hackster, "Arduino clarifies terms… anything that was open, stays open" (Arduino post of 2025-11-21):
  https://www.hackster.io/news/arduino-clarifies-terms-and-conditions-following-backlash-anything-that-was-open-stays-open-645e9ee9a51e
- Arduino blog, "Introducing the Arduino Starter Kit R4", 2025-11-18: https://blog.arduino.cc/2025/11/18/your-journey-in-tech-starts-here-introducing-the-arduino-starter-kit-r4/
- ELEGOO UNO R3 Super Starter Kit parts list (accessed 2026-09-25): https://us.elegoo.com/products/elegoo-uno-r3-super-starter-kit
- Wokwi CI docs (built 2026-09-16; 50 free minutes/month; experimental MCP): https://docs.wokwi.com/wokwi-ci/getting-started ;
  anonymous saving limits (Wokwi issue #794, accessed 2026-09-25): https://github.com/wokwi/wokwi-features/issues/794
- PlatformIO, "Arduino IDE vs PlatformIO" (accessed 2026-09-25): https://docs.platformio.org/en/latest/faq/arduino-vs-platformio.html
- SparkFun, "How to install CH340 drivers" (accessed 2026-09-25): https://learn.sparkfun.com/tutorials/how-to-install-ch340-drivers/all
- Pin current limits, Rugged Circuits "10 ways to destroy an Arduino" (accessed 2026-09-25): https://www.rugged-circuits.com/10-ways-to-destroy-an-arduino
- Capacitive vs resistive soil sensors, Last Minute Engineers (accessed 2026-09-25): https://lastminuteengineers.com/capacitive-soil-moisture-sensor-arduino/
- Pendulum and g with HC-SR04 + Arduino, 2019: https://www.researchgate.net/publication/333340732_Measurement_of_the_gravitational_acceleration_using_a_simple_pendulum_apparatus_ultrasonic_sensor_and_Arduino
- Raspberry Pi, "More memory-driven price rises", 2026-02-02: https://www.raspberrypi.com/news/more-memory-driven-price-rises/
- Electronics Weekly, "Raspberry Pi price hikes", 2026-04-06: https://www.electronicsweekly.com/news/products/raspberry-pi-development/raspberrypi-price-hikes-2026-04/
- Raspberry Pi Forums, "Price rise summary" (prices as of 2026-04-12): https://forums.raspberrypi.com/viewtopic.php?t=397523
- CNX Software, "Raspberry Pi AI HAT+ 2 review", 2026-01-20: https://www.cnx-software.com/2026/01/20/raspberry-pi-ai-hat-2-review-a-40-tops-ai-accelerator-tested-with-computer-vision-llm-and-vlm-workloads/
- Raspberry Pi, "Pico 2 W on sale now at $7" (Nov 2024): https://www.raspberrypi.com/news/raspberry-pi-pico-2-w-on-sale-now/ ;
  MicroPython for Pico 2 W (v1.29.0, 2026-08-24): https://micropython.org/download/RPI_PICO2_W/
- Arduino Forum, ESP32 core download size (~1.3 GB pack), 2022: https://forum.arduino.cc/t/huge-1-3-gb-esp32-espressif-pack-file-is-this-normal/961581
- Local facts (Mac mini, local model speeds, sandbox): `~/local-ai/AGENTS.md`, `~/local-ai/docs/delegation.md`,
  `~/local-ai/configs/junior.sb` (read 2026-09-25).
