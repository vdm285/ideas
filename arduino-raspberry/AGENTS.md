# AGENTS.md — Arduino + Raspberry Pi creative lab (read this first)

> **DRAFT, not in force.** Written 2026-09-25 by Claude (senior) from `DOSSIER.md`, before Victor's
> interview. Items marked **(TBD)** wait for his answers. When the project starts, this file moves to
> the project's own repo (working name: TBD) and `CLAUDE.md` there just imports it.

Vendor-neutral briefing for any AI agent working on this project (Claude, ChatGPT/Codex, Gemini, Grok,
or a local model). Whoever changes direction, hardware or safety rules updates this file.

## Owner and working rules (from Victor's HQ, 2026-09-29)
Owner: Victor (github.com/vdm285). Stage: learning, portfolio and open source; not commercial.
- **Replies:** checklist first (what's done, what needs Victor), then short details, in plain language.
- **Language:** English with AIs; products for Victor's close circle start in Spanish.
- **Who decides:** technical calls (tools, code, tests, free installs, pushes, `main` included) are the
  agent's; tell Victor after. Design, direction and business: discuss first, Victor decides. A suggested
  default may apply after 7 days of silence for technical choices only. Always ask first: force pushes,
  deleting his data, anything posted or sent in his name, logins and passwords.
- **Pushback:** on logic or design flaws and untested claims (not caution or licence caveats).
- **Test it ourselves:** when a claim is thin or contested, run a small test: pass mark first, plus a
  control that can fail.
- **Brief card:** before any unattended agent run, Victor approves a one-screen card (goal, will / won't
  do, what he will see, budget and stop rule).
- **Checkpoints:** show what works, a live preview and "how to try it on your phone"; numbered steps
  whenever his hands are needed.
- **Locked prototype skeleton:** a `prototype` branch, locked on GitHub, holds only the data the app
  keeps and the rules it enforces.
- **Look:** plain by default (bare wireframe first); polish is an opt-in layer where the visuals are
  the product.
- **To-dos:** one dated list per project, in its `ROADMAP.md`.
- **Here:** explain a concept just in time (2-3 sentences) and only when it matters for the next step.

Personal context: in Claude's per-project memory, outside git.

## Mission
Turn Victor's Arduino (model identified at checkpoint 0) and, later, possibly a
Raspberry Pi into **creative objects he directs and AI builds**: things that blink, sound, measure and
write. The agent writes, compiles, uploads and reads back; Victor's hands only plug in, photograph, wire
from a numbered table and watch.

Rollout by checkpoints (each one used and enjoyed before the next):
0. Know the hardware (board + kit identified from photos).
1. The "hola" loop (MVP): the LED spells Victor's word in Morse; the agent reads the board's reply.
2. First wired creation (suggested: Game of Life or Morse poems).
3. The Mac mini as the brain: USB bridge to the local model, or data into JupyterLab.
4. Untethered devices or a Raspberry Pi, only if Victor wants them. **(TBD)**

## Design principles (non-negotiable)
1. **Zero-click start:** plugging in and saying what he wants is enough. One command per step; no IDE
   to open, no menus to pick a board from.
2. **Few clear choices:** one board family, one tool (`arduino-cli`), one wiring-table format.
3. **Pay for what you use:** install board support only for the board in use; add libraries only when
   a part needs one. Storage on the Mac is tight: remove what is unused.
4. **No accounts, no login walls:** no Arduino Cloud, no required Wokwi login, no API keys.
5. **Optionality:** plain default (USB to the Mac mini); Wi-Fi boards, Pi, simulation are opt-in.
6. **Zero running cost:** open-source tools, the local model and the AI tools already in use.
7. **Spanish first** for anything the devices say or show; docs for agents in English, plain language.
8. **Safety before cleverness** (hardware can hurt boards, the Mac or people): see "Safety rules".
9. **Windows-Notepad benchmark:** each device does one thing instantly and plainly.

## Hardware (facts; fill in at checkpoint 0)
- Board: **(TBD)** model, FQBN, USB port name, genuine or clone (USB chip). Record in `board.md`.
- Kit parts: **(TBD)** inventory from one photo. Record in `parts.md` (part, quantity, used by).
- Host: Mac mini M6, 32 GB, macOS 27; local model server at `http://127.0.0.1:8080`
  (`qwen3.6-35b-a3b`; send `"chat_template_kwargs": {"enable_thinking": false}` for short answers).
  Details: `~/local-ai/AGENTS.md`.

## Current state
- Idea stage. Dossier and this draft written 2026-09-25. Nothing installed yet.
- Waiting on Victor: interview (10 questions in `DOSSIER.md`), photos of board and kit, OK to run
  `brew install arduino-cli`.

## Decisions so far (proposed, not yet approved)
- Toolchain: `arduino-cli` (open source, via Homebrew). PlatformIO only if a second board family arrives.
  No MCP server or third-party plugin: the recipe below is enough and works for every vendor.
- Architecture: the board is plugged into the Mac mini by USB; Python helpers on the Mac read and talk to
  it (`tools/listen.py`, later `tools/bridge.py`). The model server stays bound to 127.0.0.1.
- Raspberry Pi: not now (2026 prices; cannot run the 35B). Pico 2 W ($7) first if Wi-Fi is needed.
- Simulation (Wokwi in the browser): optional, for multi-part circuits.

## How to work here
### The recipe (any agent with a shell)
```
arduino-cli core update-index
arduino-cli board list                                   # port + board (clones show "Unknown")
arduino-cli core install arduino:avr                      # UNO R3 / Nano / Mega / most clones
# or: arduino-cli core install arduino:renesas_uno        # UNO R4 Minima / WiFi
arduino-cli compile --fqbn <FQBN> projects/NN-name/<sketch>
arduino-cli upload  -p <PORT> --fqbn <FQBN> projects/NN-name/<sketch>
uv run tools/listen.py --port <PORT> --baud 115200 --seconds 10   # save what the board says to logs/
arduino-cli lib search <word> ; arduino-cli lib install "<library name>"
```
- A sketch folder must have the same name as its main `.ino` file.
- Close any serial listener before uploading (the port is single-user).
- Every run leaves evidence: compile output and the board's messages go to `projects/NN-name/logs/`.
  "It works" means Victor saw it, or the log shows it.

### The loop for every project
1. Victor picks the project and describes the feel (what it says, how it blinks, which words).
2. Agent writes: the sketch, `WIRING.md` (numbered table: step, from pin, to breadboard row/part leg,
   wire colour, check), a "before power" checklist, and a Spanish one-paragraph `README.md`.
3. Victor wires **with USB unplugged**, then sends a photo. Agent checks it against the table.
4. Upload, Victor watches, agent reads the logs, adjusts. Every session ends at a clear
   "done" point.

### Safety rules (agents must follow and repeat the relevant ones)
- Never design anything connected to wall power (127 V in Mexico). The relay module is for low-voltage
  loads only.
- Max 20 mA per pin; every LED with a 220 Ω–1 kΩ resistor. Motors, pumps, more than one micro-servo:
  separate supply + driver or transistor, grounds joined.
- Check 5 V vs 3.3 V before connecting a part to a new board.
- All wiring changes with USB unplugged; say so every time.
- New circuit: photo check before first power-on. Tell Victor what "wrong" looks like (heat, smell, a
  Mac USB-power warning) and to unplug at once.
- No LiPo batteries and no water near the board without an explicit decision by Victor.
- Anything needing Victor's admin password (e.g. a CH340 clone driver): explain why in 1-2 sentences and
  give numbered steps; never work around it.

### Local juniors
- The local 35B can write small sketches from a brief (`~/local-ai/docs/delegation.md`), with
  `verify: arduino-cli compile --fqbn <FQBN> <sketch>`. **Prerequisite (TBD, needs Victor's OK):** a
  read-only exception for `~/Library/Arduino15` in `~/local-ai/configs/junior.sb`, since the sandbox
  blocks the home folder. The junior never uploads (no USB in the sandbox, on purpose).
- At runtime the local model is the devices' creative brain through `tools/bridge.py` (poems, oracle
  answers, plant diary), offline and free. Keep its answers short and in Spanish; don't trust its
  arithmetic.
- Log natural chores in `~/local-ai/benchmarks/junior-field-log.md`.

## Where things live (proposed layout)
- `AGENTS.md` (this file), `CLAUDE.md` (imports it), `ROADMAP.md` (checkpoints, decisions, log).
- `board.md`, `parts.md`: hardware facts from checkpoint 0.
- `projects/NN-name/`: sketch folder, `WIRING.md`, `README.md` (Spanish), `logs/`, optional
  `diagram.json` (Wokwi) and a notebook for data projects.
- `tools/`: `listen.py` (read serial for N seconds), `bridge.py` (serial ↔ local model / CSV).
- `docs/research/`: dated research (starts with `DOSSIER.md` from the ideas repo).
- Git: one branch per piece of work; commit photos only if small (resize first). Public on GitHub only
  when Victor says so. **(TBD)**
