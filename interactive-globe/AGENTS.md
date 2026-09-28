# AGENTS.md — Globo Curioso (DRAFT, read this first)

> **DRAFT 2026-09-25.** Nothing here is decided yet. Victor has not been interviewed (see
> `DOSSIER.md`, section 7). When the project starts, move it to `~/projects/<name>/`, add
> `CLAUDE.md` containing `@AGENTS.md`, create `ROADMAP.md`, and remove this banner.

Vendor-neutral briefing for any AI agent working on this project (Claude, ChatGPT/Codex, Gemini,
Grok, or a local model). Whoever changes direction or architecture updates this file.

## Owner
Victor (github.com/vdm285): product owner and architect. Mathematician and analytical philosopher,
MBA-style owner role, basic coding; explain in plain language. He checks in at milestones: show
progress, a live preview and "how to try it on your phone" steps, then ask go/no-go. Nothing is
merged to `main` or pushed to GitHub without his OK. Stage: personal learning, portfolio and open
source; not commercial.

## Mission
A world globe for **kids and adults**. You spin it, tap any country (even one you can't name), and
read short layered cards: **Historia · Comida · Cultura · Hoy** (Viajes later). "Hoy" explains the
week's news with a thread to the past ("Uniendo los puntos") and clearly labelled perspectives.
The benchmark is **Windows Notepad**: it opens instantly on a spinning globe, one tap shows a card,
and nothing else gets in the way.

Rollout by checkpoints (each one used and trusted before the next):
0. Sketch (`sketch.html`), Victor only.
1. "Globo de la casa": Victor + family; 20 countries, 3 evergreen layers, Modo niños.
2. Hoy pilot: 5 countries, weekly, 4 weeks.
3. All countries, finer map when zoomed, offline.
4. Public open source (English, contributions).

## Design principles (non-negotiable, inherited from Victor's projects)
1. **Zero-click start:** open straight onto the globe, already spinning, with one country's card
   ready (Mexico by default).
2. **Few clear choices:** four tabs, one "Modo niños" switch; everything else in one menu.
3. **Pay for what you use:** the light 1:110m map and the app load first. Each country's card is a
   small file fetched on tap, and the finer 1:50m map loads only when zoomed in.
4. **No accounts, no login walls.** At most "Sign in with Google" for an optional future feature.
5. **Optionality:** plain school-globe look by default; 3D or satellite views are opt-in switches.
6. **Zero running cost:** static hosting; all AI work happens before publishing, never per visitor.
7. **Spanish first** (Mexican Spanish: jitomate, platicar), English at checkpoint 4.

## Editorial rules (draft, Victor must approve)
- **Transparent balance, not claimed neutrality.** Every opinion is attributed ("Gobierno de X
  dice…"). Each Hoy card has: Qué pasa · Uniendo los puntos (Antes → Hoy) · Distintas miradas ·
  Lo que aún no se sabe · Enlaces · fecha de revisión.
- **Sources:** at least 3 outlets from at least 2 countries per Hoy card, including a local one and a
  foreign one. Loaded words only inside attributed quotes. We summarise and link; we never copy articles.
- **Evergreen texts are generated only from fetched sources** (Spanish Wikipedia, Vikidia, Wikidata),
  and every number must appear in the source. Texts derived from Wikipedia/Vikidia are
  **CC BY-SA** with attribution.
- **Kid mode:** ages 8-12, short sentences, no graphic detail or casualty numbers, a "¿Sabías que…?"
  fact and a "Para platicar en familia" question.
- **Maps:** Natural Earth de facto borders by default. Disputed territories get a neutral note that
  names each side's position.
- **Samples are always labelled as samples.** Never present invented or unreviewed text as fact.

## Current state
- Idea stage. `DOSSIER.md` has prior art, options, MVP, risks, effort and the interview.
- `sketch.html`: one self-contained file. It uses d3 7.9.0 and topojson 3.0.2 from cdnjs, with the
  Natural Earth 1:110m countries inlined (world-atlas 2.0.2, 177 shapes). It has drag/pinch/wheel
  rotation and zoom, tap-to-select with a fly-to, Spanish names via the browser's `Intl.DisplayNames`,
  search, simulated "Casa" (Mexico City), sample texts for Mexico, Japan, Egypt and Brazil, and a
  Modo niños switch. It makes no network calls besides the two scripts and Google Fonts.
- Waiting on Victor: the interview (`DOSSIER.md` §7).

## Decisions so far (proposals until Victor confirms)
- Engine: **d3-geo orthographic + Natural Earth** (option A). globe.gl or MapLibre globe could be a
  later opt-in "vista 3D"; CesiumJS and Google 3D Tiles are parked because of accounts and costs.
- Google Earth: a "Ver en Google Earth" link per country, no embedding.
- Content: build-time pipeline on the Mac. The local junior drafts, scripts check, the senior
  reviews sensitive countries and a 10% sample, and Victor spot-checks.
- News: weekly static digest from GDELT DOC 2.0 (cite + link GDELT) and Wikipedia current events.
- Hosting: GitHub Pages or Cloudflare Pages (free).

## Open ideas from Victor (for the dedicated project session)
- **Disputed places (Victor, 2026-09-28):** today no flag is shown on places the map marks as disputed (neutral default).
  For the **regular (adult) version**, show disputed areas visibly (e.g. a gradient or hatching between the claimants) and
  explain what is disputed, who claims what and why, with diplomatic, neutral, journalistic tact; that is part of the
  app's purpose. The **kids' version** is decided separately.

## How to work here
- Branch per piece of work; `main` is the live site (once there is one).
- Pure logic (country lookup, text checks, balance checks) is tested headless with macOS `jsc` or
  Python; the UI is checked in a browser and on Victor's phone. Tests are protected: don't
  weaken them to make code pass.
- Local juniors (via `~/local-ai/scripts/delegate.sh`) get bounded chores with a pass/fail command,
  for example "draft the kid version of these 20 cards; `python3 tools/check_cards.py` must pass".
- When fetching from Wikimedia, send a User-Agent with contact info and stay far below the 2026 rate limits.
- Research lives in `docs/research/` (dated, fact-checked). Quotes under 15 words.
