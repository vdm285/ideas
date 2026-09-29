# AGENTS.md — Tabla Viva / interactive science (DRAFT, read this first)

> **DRAFT, 2026-09-25.** Written by Claude (senior) before Victor's alignment interview. Nothing here
> is decided until Victor answers the questions in `DOSSIER.md`. When the project gets its own repo,
> copy this file there, remove this note, and add a one-line `CLAUDE.md` that imports it.

Vendor-neutral briefing for any AI agent working on this project (Claude, ChatGPT/Codex, Gemini,
Grok, or a local model). Whoever changes direction or architecture updates this file.

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

Personal context: in Claude's per-project memory, outside git.

## Mission
Interactive science for **big touch screens and phones**, starting with **Tabla Viva**, a periodic
table where every tap tells a story: what the element is for, where it is found, who discovered
it, how its electrons fill the shells, its isotopes, and a safe mini-experiment. Later forks:
human anatomy (down to the cell), biology, ecology, physics.

Rollout by checkpoints (each one used and trusted before the next):
1. First users from Victor's close circle, on a phone and a tablet/TV (about 20 full element cards).
2. A teacher or classroom and a real touch screen (all 118 cards).
3. Public open-source release; first fork (probably anatomy).

## Design principles (non-negotiable)
1. **Zero-click start:** the table is on screen in the first frame, ready to tap.
2. **Few clear choices:** search, one mode switch (Explore / Reto), a kiosk switch. Everything else
   lives in the element card.
3. **Pay for what you use:** the table and basic data load first; long texts, images and any 3D
   load only when a card or fork is opened.
4. **No accounts, no login, no analytics.** Children use it; collect nothing.
5. **Optionality:** simple default; power features (live AI, extra data views) are opt-in switches.
6. **Zero running cost:** static hosting, no server, no AI at runtime by default.
7. **Spanish first, Mexican context** (names as used in Mexico, local examples, SEP curriculum);
   English when it goes public.
8. **Kid and kiosk ready:** tap targets at least 44 px (never under 24 px), readable type,
   `prefers-reduced-motion` respected, attract mode and idle reset on public screens.
9. **Honest science:** simplified models are labelled as simplified; predicted values say so.

## Current state
- Idea stage. Files: `DOSSIER.md` (research, options, MVP, risks, interview questions),
  `sketch.html` (clickable concept: 118 elements, search, family/state colours, Bohr drawing with a
  fill animation, 6 sample cards, Reto game, attract mode). Sample texts are hand-written and
  labelled as samples.
- Waiting on Victor: the interview questions at the end of `DOSSIER.md`.

## Proposed architecture (to confirm)
- Static web app (PWA), same recipe as ListoLista: `src/` + `data/` built by a script into one fast
  page, service worker for offline, free hosting (GitHub Pages or Cloudflare Pages).
- Data built ahead of time into JSON:
  - numbers from **PubChem** periodic table (public domain);
  - discovery facts, name origins, image credits from **Wikidata** (CC0);
  - Spanish names from the RAE/RSEQ list, with Mexican forms as display names;
  - texts (3 reading levels, uses, quiz) drafted by the local junior, reviewed by a person.
- Drawings in SVG (Bohr model, filling animation). 3D (three.js, glTF) only for the anatomy fork,
  using Z-Anatomy/BodyParts3D models (CC BY-SA: derived models stay share-alike).
- Optional later: on-device AI questions through Chrome's Prompt API on a kiosk PC (desktop only).

## How to work here
- Edit `src/` and `data/`, never the built page directly; run the build script.
- Branch per piece of work; `main` is the live site once there is one.
- Tests before features: pure logic (electron configurations and exceptions, search ranking,
  layout positions, data validation) is tested headless with macOS `jsc` (built in; no Node
  needed). Tests are protected: don't weaken them to make code pass.
- **Content rule:** a text may only contain numbers (dates, masses, percentages) that appear in
  the data files or an approved list. A check script enforces it. AI output is never published
  without that check plus a human read.
- **Experiments rule:** kitchen-safe only, "with an adult" stated, reviewed before publishing.
- Local juniors (via `~/local-ai/scripts/delegate.sh`) get bounded chores with a pass/fail command:
  batches of element texts as JSON (schema + length + numbers-match check), unit tests, data
  converters. Log each run in `~/local-ai/benchmarks/junior-field-log.md`.
- Research lives in `docs/research/` (dated, fact-checked, sources with dates).

## Data and licences
| Source | Use | Licence |
|---|---|---|
| PubChem periodic table | masses, configurations, properties | Public domain |
| Wikidata | discovery, name origin, links | CC0 |
| RAE/RSEQ element names (2016-2017) | Spanish names | Reference list (facts) |
| PhET sims (e.g. Build an Atom) | link out, or bundle with credit | CC BY 4.0 |
| Wikimedia Commons photos | element photos, if used | Per file; credit required |
| Z-Anatomy / BodyParts3D | anatomy fork models | CC BY-SA 4.0 / CC BY-SA 2.1 JP |
| RSC, Ptable, Theodore Gray | inspiration only | Copyrighted: do not copy |

## Decisions so far
- None final. Proposed defaults (see `DOSSIER.md`): Option A (static web app), no live AI in
  checkpoint 1, three reading levels (about 8, 12, 15+), Mexican element names with RAE/RSEQ forms
  searchable, rotated table on phones.
