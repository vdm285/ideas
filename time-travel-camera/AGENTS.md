# AGENTS.md — Cámara del tiempo (read this first) — DRAFT

> **DRAFT, 2026-09-25.** Written by Claude (senior) before Victor's alignment interview. Nothing here
> is decided until Victor answers the questions in `DOSSIER.md`. Defaults below are proposals.

Vendor-neutral briefing for any AI agent working on this project (Claude, ChatGPT/Codex, Gemini,
Grok, or a local model). `CLAUDE.md` (when the repo exists) just imports it. Whoever changes direction
or architecture updates this file.

## Owner and working rules (from Victor's HQ, 2026-09-29)
Owner: Victor (github.com/vdm285). Stage: learning, portfolio and open source; not commercial.
- **Replies:** checklist first (what's done, what needs Victor), then short details, in plain language.
- **Language:** English with AIs; products for Victor's close circle start in Spanish.
- **Who decides:** technical calls (tools, code, tests, free installs, pushes, `main` included) are the
  agent's; tell Victor after. Design, direction and business: discuss first, Victor decides. A suggested
  default may apply after 7 days of silence for technical choices only. Always ask first: force pushes,
  deleting his data, anything posted or sent in his name, logins and passwords.
- **Pushback:** on logic or design flaws and untested claims (not caution or licence caveats).
- **Depth:** build quick, ideas deep ("quick" or "deep" from Victor overrides). When our own test
  contradicts a trusted source, show both sides briefly and test both.
- **Code and words:** lean code with a short "why" note (not golfed); short, plain text for users;
  reusable modules. Naming: say if an industry-standard name exists, else propose a few
  analogy-based names.
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
**Point your phone at a place, pick an era, and see that same view back then**, with an honest label
of how sure we are. First place: the Zócalo of Mexico City. The benchmark is **Windows Notepad**: it
opens instantly, straight into the view, nothing else in the way.

Rollout by checkpoints (each one used and trusted before the next):
1. Victor's close circle, on site at the Zócalo ("El Zócalo en cinco épocas").
2. Friends and family; 5-10 spots in the Centro Histórico (feedback).
3. Free public open-source app; others can add spots and eras through reviewed data files.

## Design principles (non-negotiable)
1. **Zero-click start:** open straight into the view of where you are (or the Zócalo if location is
   off). iPhone needs one tap to allow the compass; drag-to-turn works without it.
2. **Few clear choices:** one era slider and the view. Secondary actions in one labelled menu.
3. **Pay for what you use:** load only the picture for the current direction and era; the AI prompt
   helper and any live generation load only when opened.
4. **No accounts, no login screens.** At most "Sign in with Google" for an opt-in feature, and only
   if unavoidable.
5. **Optionality:** curated views by default; "Hazlo con tu IA" and live generation are opt-in.
6. **Zero running cost** for Victor. Anything that could cost money is capped and opt-in.
7. **Honesty is a feature:** every past view carries "Reconstrucción artística", a confidence level
   and dated sources. Deep time is shown as science says it was (the Zócalo ~100 million years ago was
   a shallow sea), and any fantasy mode is labelled as such.
8. Spanish first (English when it goes public). Era names fit the place (Virreinato, Porfiriato, not
   "medieval").

## Current state
- Idea stage. `DOSSIER.md` (research, options, MVP, risks, interview questions) and `sketch.html`
  (clickable storyboard of the Zócalo with sample data) exist in `~/projects/ideas/time-travel-camera/`.
- Waiting on Victor: the interview (10 questions in `DOSSIER.md`), then a go/no-go for checkpoint 1.

## Decisions so far (proposed defaults, not yet confirmed)
- View style: a **window** (full picture of the direction you face, turning with the compass), not a
  tight AR overlay. Reason: browser GPS/compass errors (tens of metres, ~10°); no WebXR AR in iPhone
  Safari (2026).
- Checkpoint 1 content: **curated pictures** (Option A) for 1 spot × 4 directions × 4-5 eras, made by
  Victor with consumer AI image apps (e.g. Gemini, ChatGPT) from his own photos; texts written from sources and
  reviewed.
- Opt-in power feature: "Hazlo con tu IA" (copy a precise prompt, use your own AI app).
- Live generation (Cloudflare Workers AI, free daily allowance, hard cap) only after checkpoint 1.
- No people in past views in checkpoint 1 (architecture and landscape only).
- Never use Thomas Kole's reconstruction (CC BY 4.0, "no AI input") or Mediateca INAH photos
  (CC BY-NC-ND 4.0) as input to an image AI. Showing them with credit is fine.

## How to work here (proposed)
- Plain static web app (HTML/CSS/JS, no framework unless needed); hosting on GitHub Pages or
  Cloudflare Pages. No vendor AR platform.
- Places live as data: one file per spot (`data/places/<spot>.json`: coordinates, directions,
  landmarks with azimuths, eras, texts, confidence, sources with dates, picture credits). A checker
  script validates every file; pictures go in `media/<spot>/<era>-<direction>.webp`.
- Tests before features: pure logic (heading math, nearest spot, landmark in front, data checker) is
  tested headless; UI checked on real phones. Tests are protected: don't weaken them to make code pass.
- Branch per piece of work; `main` is the live site once it exists.
- Local juniors (via ~/local-ai/scripts/delegate.sh) get bounded chores with a pass/fail command:
  draft Spanish texts from given source excerpts, fill/validate data files, write heading-math tests.
  They do not make images.
- Every historical claim in a data file needs a source with a date. Research lives in
  `docs/research/` (dated, fact-checked).
