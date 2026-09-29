# Interactive science: idea dossier

Working name: **Tabla Viva** (first app), family name open.
Date: 2026-09-25. Status: idea, not started. Prepared by Claude (senior) for Victor.
Companion files: `sketch.html` (clickable concept sketch), `AGENTS.md` (draft briefing).

---

## The idea in Victor's words

Interactive learning apps for **big touch screens (and phones)**. First, an **interactive periodic
table that goes "to the next level"**: tap an element and see its properties, real-world uses,
discovery history, an electron-configuration animation, isotopes, where it is found, and a
mini-experiment. Later, **forks**: human anatomy down to the cell, biology, ecology, physics.

House rules that apply (from Victor's design philosophy): zero-click start, few clear choices,
pay-for-what-you-use loading, no accounts, optional power features, "Windows Notepad" speed,
zero running cost, Spanish first for Mexican users, learning/portfolio/open-source stage.

---

## What already exists

Short version: **interactive periodic tables are a crowded field, and several are excellent and
free.** None of them is built for a kid at a big touch screen in Mexico, in Spanish, telling one
story per tap. That gap is where we fit. Anatomy is the opposite: the best tools are paid and heavy,
and the open models exist but have no simple web viewer for kids.

### Periodic tables

| Product | What it does well | What it does badly (for us) | Source (date) |
|---|---|---|---|
| **Ptable** (Michael Dayah) | Deepest free data: orbitals in 3D, isotopes "deck of cards", compounds, a "time machine" by discovery year; installable, works offline; many languages incl. Spanish | Built for students and adults, dense; one ad banner; the app is copyrighted (the table itself is public domain) | ptable.com/about (online since 1997-10-01; read 2026-09-25) |
| **RSC Periodic Table** (Royal Society of Chemistry) | Stories: history, alchemy, podcasts, videos, Murray Robertson's artwork; temperature slider (state of matter) | English-first; content and art are not openly licensed | periodic-table.rsc.org (© 2026; read 2026-09-25) |
| **The Elements by Theodore Gray** (iPad) | The "wow" benchmark: 500+ real objects photographed so you can spin them | Paid, Apple-only, large download, dates from the first iPad (2010) | App Store listing (read 2026-09-25) |
| **Zperiod** | 118 elements, 3D atoms, orbital atlas, worksheets, 40 languages incl. Spanish, no sign-up | Aimed at grades 9-12; tool-heavy, not a kiosk or kid experience | zperiod.app, v3.0.0 released 2026-07-21 |
| **Educaplus** (Jesús Peñas Cano, Spain) | Spanish classic: "find the element" game, electron-structure table; teachers know it | Old small-screen design (Flash era) | educaplus.org (read 2026-09-25) |
| **PhET "Build an Atom"** (Univ. of Colorado) | Best simulation for building an atom from protons/neutrons/electrons; HTML5; Spanish; **CC BY 4.0** | A separate sim, not a table; we could link to it or bundle it (licence allows, with credit) | phet.colorado.edu licensing page (read 2026-09-25) |
| **Phone apps** ("Periodic Table 2026", "Atomic") | Many features; "Atomic" already adds an AI chat ("Ask Atomic") | Ads/paywalls typical; phone-only layouts | Google Play listings (read 2026-09-25) |

### Anatomy (for the later fork)

| Product | Good | Bad (for us) | Source (date) |
|---|---|---|---|
| **Complete Anatomy** (3D4Medical/Elsevier) | Professional depth | Subscription (student price listed at USD 74.99/year) | store.3d4medical.com (read 2026-09-25) |
| **Visible Body Suite** | Full library on phone/tablet/computer | Subscription | Google Play listing (read 2026-09-25) |
| **BioDigital Human** | Scales from school biology to medicine; free individual accounts | Login wall; acquired by Anatomage in early 2025 | Doody's review, 2025-06 |
| **Zygote Body** | Free core in the browser, no login, WebGL | Quizzes and pins behind a paid tier; English | zygotebody.com (read 2026-09-25) |
| **Z-Anatomy** (open source) | 5,000+ structures, 3,500+ definitions; **CC BY-SA 4.0** | Blender template + Android app, **no web viewer** | GitHub Z-Anatomy/Models-of-human-anatomy (read 2026-09-25); CG Channel, 2022-05 |
| **BodyParts3D** (DBCLS, Japan) | The open mesh set Z-Anatomy is built on (3,210 meshes in v4.3) | **CC BY-SA 2.1 Japan**: our anatomy content would have to stay share-alike | Zenodo record "BodyParts3D 4.3" (read 2026-09-25) |
| **Open Anatomy Browser** (Harvard SPL) | Open-source web viewer for anatomy atlases (brain, knee, abdomen, head and neck) | Research tool, not for kids | Frontiers in Neuroinformatics, 2017 |

### What we would do differently

1. **Kid and kiosk first.** Huge tap targets, an "attract mode" when idle, one story per tap,
   no login, opens instantly. Every product above is desktop- or student-first.
2. **Spanish first, Mexican context.** Mexico is the world's top silver producer; lithium was
   declared strategic in 2022; the periodic table is taught in 3rd grade of secundaria
   ("Saberes y pensamiento científico", CONALITEG textbook, 2024-2025 cycle). Names as used
   in Mexico (tungsteno, zirconio), with the RAE/RSEQ forms searchable.
3. **Three reading levels per element** (about 8, 12 and 15+ years), written ahead of time by the
   local AI and checked by a person, so there is **no AI cost or child data at runtime**.
4. **Open data, open code.** Numbers from PubChem (public domain) and Wikidata (CC0).
5. **Honest science.** Label simplified models as simplified (see risks).

---

## How it could work

### Option A (recommended): one static web app, content built ahead of time
- **Same recipe as ListoLista**: a small build script turns data files into one fast page plus a
  service worker for offline use. Hosted free (GitHub Pages or Cloudflare Pages). No server.
- **Data**: element numbers from PubChem's periodic table download (public domain; CSV/JSON)
  and Wikidata (CC0) for discovery dates, name origins, images' credits. Spanish names from the
  RAE/RSEQ list (2016 names: nihonio, moscovio, teneso, oganesón).
- **Drawings**: SVG for the Bohr model and the electron-filling animation (the sketch does this
  for all 118 elements from the filling rule plus the ~20 known exceptions). No 3D at first.
- **Kiosk**: installed as an app on an Android tablet/TV or iPad. iPhone/iPad Safari has **no
  Fullscreen API**; iPad kiosks use the installed app plus Guided Access. Screen Wake Lock
  keeps the screen on (all major browsers since 2024; fixed for installed iOS apps in iOS 18.4,
  2025-03-31).
- **Cost**: zero running cost.

### Option B: Option A plus an opt-in "Ask the AI" switch
- Chrome's built-in **Prompt API (Gemini Nano)** runs on the device, accepts Spanish, costs nothing
  per question, and sends nothing to a server. Limits (Chrome docs, updated 2026-08-26):
  **desktop only** (Windows/macOS/Linux/Chromebook Plus), needs **22 GB free disk** and a GPU with
  more than 4 GB or 16 GB RAM; **not on Android or iOS**. So it fits a kiosk PC, not kids' phones.
- Cloud AI (ChatGPT, Gemini, Claude) at runtime is not recommended: it costs money per use, and
  children's data rules apply (US COPPA amendments: compliance date 2026-04-22; Mexico's new
  LFPDPPP, published 2025-03-20, requires parental consent for minors' data).
- Keep it off by default (optionality principle).

### Option C: 3D engine (three.js, or Godot for native)
- Needed for the **anatomy fork**: load one organ's model at a time (pay-for-what-you-use) from
  Z-Anatomy/BodyParts3D meshes converted to glTF. Heavier, slower on cheap tablets, more effort.
- Not needed for the periodic table.

**Recommendation:** A now; B as a later opt-in for a kiosk PC; C only when the anatomy fork starts.

### Who does what (Victor's AI team)

| Role | Work on this project |
|---|---|
| Victor (owner) | Picks audience and screen; tests with real kids; approves each checkpoint |
| Claude (senior, cloud) | Architecture, data pipeline, app code, review of junior output, fact-check sampling |
| Local junior (Qwen3.6-35B on the Mac mini) | Bulk drafting: 3 reading-level texts, uses, quiz questions per element, as JSON. Each batch has a **pass/fail check**: schema valid, length per level, and **every number in a text must match the data file** (so the model cannot invent a date or a mass) |
| Other cloud AIs | Independent fact-check sweep of the finished texts (a second opinion) |

Speed check: the junior writes about 40 tokens/s (`docs/delegation.md`). 118 elements × 3 levels
is about 350 short texts: roughly one 3-4 hour batch, then review.

---

## MVP / checkpoint 1

**"La tabla que se toca":** an offline, installable Spanish periodic table that a 10-14-year-old can
use alone for 10 minutes on a phone or a big touch screen.

Includes:
- All 118 tiles, colour by family (or by state at 25 °C), search by name/symbol/number
  (accents optional), phone layout that rotates the table so tiles stay big enough to tap.
- Tap → card: basic data, animated Bohr drawing with "watch the shells fill", configuration.
- **Full cards for about 20 elements** taught in secundaria (H, He, C, N, O, Na, Mg, Al, Si, P, S,
  Cl, K, Ca, Fe, Cu, Zn, Ag, Au, Hg): 2-3 reading levels, uses, where found (with Mexican examples),
  history, isotopes, one safe mini-experiment, one quiz question.
- "Reto" game (find the element), attract mode for a kiosk, big-text switch.
- No accounts, no server, no AI at runtime, no analytics.

Who uses it: first users from Victor's close circle, on a phone and on a tablet or TV.
Pass test: a kid uses it 10 minutes without help and asks to come back; Victor puts it on a big
screen with one tap. Then checkpoint 2 (a teacher/classroom, all 118 cards), then checkpoint 3
(public, open source, first fork).

Out of checkpoint 1: 3D, live AI, full isotope charts, accounts, anatomy.

---

## Risks and honest caveats

1. **Crowded field.** Ptable, RSC and Zperiod are free and deep. If our angle (kids, kiosk, Spanish,
   Mexico, stories) doesn't feel clearly different when tested, this is a learning/portfolio
   project rather than something people switch to. That is fine at this stage, but say it early.
2. **AI-written facts for children.** Kids trust what the screen says. Mitigation: numbers only
   from data files, the "numbers must match" check, human review, a sources line per card.
3. **The Bohr model is a simplification.** Education research reports that many students keep the
   "electrons orbit like planets" idea (Boston University "Beyond Bohr"; McKagan et al., Phys. Rev.
   ST PER, 2008, argue it is still worth teaching if framed well). The sketch labels it; older
   levels should show orbitals later.
4. **Electron configurations have exceptions** (Cr, Cu, Pd, Au, La, U…). The sketch handles the
   known ones; from element 104 on they are predictions and must say so.
5. **Contested placements.** Where La/Lu and Ac/Lr go, and which elements count as metalloids,
   differ between tables. Pick one convention (ideally the SEP textbook's) and note it.
6. **Mini-experiments are a safety responsibility.** Kitchen-safe only, adult supervision stated,
   reviewed by a teacher before publishing. No fire or chemicals at the youngest level.
7. **Phone layout.** 18 columns don't fit a phone: tiles would be ~20 px wide, under the WCAG 2.2
   minimum of 24×24 px (SC 2.5.8, W3C Recommendation 2023-10-05). The sketch rotates the table on
   narrow screens; this needs testing with kids.
8. **Kiosk platform limits.** No Fullscreen API on iPhone/iPad Safari; Guided Access or an Android
   kiosk launcher instead. Public kiosks should reset after 30-60 s idle (industry practice).
9. **Licences.** Anatomy models are share-alike (our derived models must stay CC BY-SA). RSC and
   Ptable content cannot be copied. Photos: Wikimedia Commons with credit, or our own drawings.
10. **Scope creep.** Each fork (anatomy, biology, ecology, physics) is a whole project. Anatomy is
    the heaviest (3D, performance, licences).
11. **Hardware unknown.** We don't yet know whether Victor has a big touch screen to test on.

---

## Effort estimate

Rough, in the units that matter to Victor:

| Piece | Claude sessions | Junior | Victor |
|---|---|---|---|
| Data pipeline (PubChem + Wikidata → JSON, with checks) | 0.5-1 | small chores | none |
| App: table, search, card, Bohr + fill animation, phone layout, offline/installable | 1.5-2 | tests for pure logic | 20 min review |
| Content for ~20 elements, 2-3 levels, quiz, experiments | 1 (briefs + review) | one 3-4 h batch | 30 min reading |
| Reto game, attract mode, kiosk setup notes | 0.5 | none | none |
| Test with kids on phone + big screen, fixes | 0.5-1 | none | 1-2 h |
| **Checkpoint 1 total** | **about 4-6 sessions** | **about 3-8 h** | **about 3 h** |
| All 118 full cards (checkpoint 2) | +2-3 (mostly review) | +6-12 h | +1 h |
| Anatomy fork (checkpoint 3+) | 3-5× the periodic table | modelling chores | more testing |

---

## Interview questions for Victor

1. **Who is the first real user?** Kids you know (which ages?), a school class, or a public
   screen (museum, library, a business lobby)? This sets the reading level and the layout.
2. **Which screen first?** Phone, tablet, or a big touch TV? Do you have (or can you borrow) a touch
   screen, or would it be a TV plus mouse at first?
3. **Reading levels:** are about 8, 12 and 15+ years the right three? Or two levels to start?
4. **Tie to the SEP curriculum?** Should it follow the 3rd-grade secundaria textbook ("Saberes y
   pensamiento científico"), so a teacher could use it in class?
5. **Element names:** Mexican usage (tungsteno, zirconio, kriptón) or the RAE/RSEQ forms
   (wolframio, circonio, criptón)? The sketch shows the Mexican forms and finds both.
6. **Live AI questions:** never, only on-device (kiosk PC with Chrome), or an opt-in switch? For
   kids, the default in this dossier is "no live AI; texts written ahead and reviewed".
7. **Mini-experiments:** include them (with "with an adult" labels), or leave them out until a
   teacher reviews them?
8. **Which fork comes second:** anatomy (heaviest, 3D), or something lighter such as physics or
   ecology? Does anatomy need to be 3D, or would layered 2D drawings do for kids?
9. **Name, home and licence:** "Tabla Viva" or another name? Stay on vdm285.github.io or get an own
   address? MIT for code and CC BY-SA for content?
10. **What would make you say "worth continuing" after checkpoint 1?**

---

## Sources (all read 2026-09-25 unless a date is given)

- Ptable, About: https://ptable.com/about/ (online since 1997-10-01)
- RSC Periodic Table: https://periodic-table.rsc.org/ (© 2026)
- The Elements by Theodore Gray, App Store: https://apps.apple.com/us/app/the-elements-by-theodore-gray/id364147847
- Zperiod: https://zperiod.app/ (v3.0.0, 2026-07-21)
- Educaplus, Tabla periódica: https://www.educaplus.org/game/tabla-periodica
- PhET Build an Atom: https://phet.colorado.edu/en/simulations/build-an-atom ; licensing: https://phet.colorado.edu/en/licensing/html
- Periodic Table - Atomic (Google Play): https://play.google.com/store/apps/details?id=com.jlindemann.science
- Complete Anatomy pricing: https://store.3d4medical.com/
- Doody's review of BioDigital Human (2025-06): https://dcdm.doody.com/2025/06/a-review-of-the-biodigital-human/
- Zygote Body: https://www.zygotebody.com/
- Z-Anatomy models (CC BY-SA 4.0): https://github.com/Z-Anatomy/Models-of-human-anatomy ; CG Channel (2022-05): https://www.cgchannel.com/2022/05/check-out-amazing-free-3d-anatomy-reference-z-anatomy/
- BodyParts3D 4.3 (CC BY-SA 2.1 JP): https://zenodo.org/records/22727173
- Open Anatomy Browser (2017): https://www.frontiersin.org/articles/10.3389/fninf.2017.00022
- PubChem periodic table data (public domain): https://iupac.github.io/WFChemCookbook/datasources/pubchem_ptable.html ; https://pmc.ncbi.nlm.nih.gov/articles/PMC8276875/ (2021)
- Wikidata licensing (CC0): https://www.wikidata.org/wiki/Wikidata:Licensing
- Periodic-Table-JSON (field ideas; check its licence before reuse): https://github.com/Bowserinator/Periodic-Table-JSON
- Spanish names of elements 113-118 (RSEQ/RAE/Fundéu, 2017): https://rseq.org/mat-didacticos/nombres-y-simbolos-en-espanol-de-los-elementos-aceptados-por-la-iupac-el-28-de-noviembre-de-2016-acordados-por-la-rac-la-rae-la-rseq-y-la-fundeu/
- SEP/CONALITEG, Saberes y pensamiento científico, 3º secundaria (2024-2025): https://libros.conaliteg.gob.mx/2024/S3SAA.htm
- WCAG 2.2 SC 2.5.8 Target Size (Minimum), W3C Recommendation 2023-10-05: https://www.w3.org/TR/WCAG22/#target-size-minimum
- iOS PWA limits (no Fullscreen API): https://firt.dev/notes/pwa-ios/ ; iPad kiosk with Guided Access: https://timmyomahony.com/blog/kiosk-mode-on-ipads-with-pwa/
- Screen Wake Lock in all browsers (2024): https://web.dev/blog/screen-wake-lock-supported-in-all-browsers
- Chrome Prompt API (updated 2026-08-26): https://developer.chrome.com/docs/ai/prompt-api ; Chrome at I/O 2026 (2026-05-19): https://developer.chrome.com/blog/chrome-at-io26
- ChatGPT Study Mode (2025-07-29) and Gemini Guided Learning (2025-08-06): https://techcrunch.com/2025/08/06/google-takes-on-chatgpts-study-mode-with-new-guided-learning-tool-in-gemini/
- COPPA amended rule (effective 2025-06-23, compliance 2026-04-22): https://www.hunton.com/privacy-and-cybersecurity-law-blog/coppa-rule-amendment-compliance-deadline-approaches
- Mexico LFPDPPP 2025 (DOF 2025-03-20), minors: https://adrianaperalta.com/2025/04/29/proteccion-de-datos-personales-de-menores-obligaciones-reforzadas-en-la-nueva-lfpdppp-2025/
- Bohr model teaching: https://www.bu.edu/chemed/resources/beyond-bohr/ ; McKagan et al. 2008: https://link.aps.org/doi/10.1103/PhysRevSTPER.4.010103
- Kiosk attract mode and idle reset practice: https://workinman.com/trade-show-museum-kiosk-design-development/

## Round 1: sketch changelog (2026-09-25)

Changes made to `sketch.html` after the round 1 critique, in the critic's order:

1. **No longer frozen at load.** Added `[hidden]{display:none!important}` (the welcome overlay and the Reto bar used to cover the page). Added the `charset` and `viewport` meta lines, and the page sets `lang="es"`.
2. **The table is on the first screen.** There is now one toolbar row: search, **Reto** and **Más**. Más holds the Familia/Estado switch, Letra grande, Pantalla completa and Modo exhibición. The color chips moved into a folded "¿Qué significan los colores?" section. The row of sample shortcuts left the header. In exhibition mode Más is hidden, and you leave the mode by pressing and holding the logo for 3 s.
3. **Cards open with the story.** New order: name, then the level switch and story, then the Bohr drawing, uses, where it is found, history, the experiment and the quiz. "Datos técnicos" is folded and opens by itself only at the "15 o más" level. The filling animation plays the first time each card opens (skipped when reduced motion is on). When shell 4 starts before shell 3 is full, one line points it out. At 8 años the candle experiment (fire) is replaced by a note. Quiz answers are shuffled.
4. **No more dead ends.** The other 112 elements get a short text for kids, built from the table data: protons and electrons, family, state at 25 °C, weight compared with hydrogen, radioactive (Z = 43, 61 and 84 onwards), the 2 liquids. They also get tappable chips for the rest of the family and "Pronto su historia completa. Mientras, prueba <the nearest full card>".
5. **Reto is a game.** Rounds of 10 with a counter, an end screen and a best score saved in the browser. The Reto bar is sticky. Hints are visual: the first miss marks the target's row, the second its column, the third makes the target blink. A correct answer shows a burst on the tile and a "¿Sabías que…?" fact. The docked panel shows the round status (progress dots). The magnifier shows "?" instead of the name. Levels: Fácil (find the symbol) and Difícil (find by name, with names hidden on the tiles).
6. **Names on tiles** from about 44 px wide. The mass left the tiles. The docked panel is narrower: `clamp(340px,26vw,470px)`.
7. **Phones.** The Back gesture closes the card (`history.pushState`/`popstate`). The card has a sticky bottom bar ("‹ anterior · Cerrar · siguiente ›") and closes with a swipe to the right. A note explains that the table is rotated. The card panel overflowed by 36 px at 390 px wide; fixed with `box-sizing: border-box`.
8. **Copy.** The footer now says honestly that only the fonts come from the internet. "sólo" → "solo", "kiosko" → "kiosco", "Modo vitrina" → "Modo exhibición" (its 45 s note is now in the toast), "Otro" → "Saltar", "Ver cómo se llenan las capas". At the 8 and 12 levels the label reads "Electrón 21 de 26 · capa 3". Letra grande is 125%, with rem floors on the tile text. A search for "oro" finds only Oro; matches in the middle of a name show only when no name starts with the query. The docked panel no longer shows a redundant "Cerrar".

Checked in headless tests at 1366×768 (light and dark) and 390 px: no horizontal scroll, the inline scripts pass `node --check`, and I ran a full Reto round (10/10), the kiosk on/off cycle, the Back button and the level switches.

**Still pending:** on touch screens, the card covers the magnifier as soon as you tap. The tiles on phones (about 35 px) are too narrow for names. Letra grande changes the tiles only a little on wide screens. The Reto end screen is plain text (no confetti or sound). The kid texts for the 112 elements are template sentences, not real stories. There is no keyboard way to leave exhibition mode (by design for a kiosk; to be confirmed).

## Round 2: sketch changelog (2026-09-25, night)

Changes made to `sketch.html` after the round 2 critique, in the critic's order:

1. **Famous elements have a hook.** A new `HOOK` object gives 26 well-known elements one line with no numbers in it, so the table data stays the only source of figures. They include He, N, Ne, Na, Mg, Al, Si, Cl, K, Ca, Cu, Zn, Sn, I, Ti, Ni, W, Pt, Au, Hg, Pb and U. On their cards the hook shows in bold above the auto-built list. The Reto "¿Sabías que…?" fact uses the hook, and the exhibition screen mixes hooks with the general facts (and shows that element in the magnifier).
2. **Full stories are easier to find.** The 7 px dot became a ★ in the tile corner (at least 12 px). The magnifier key and the color legend both explain it ("★ = historia completa"). On load, the 6 story tiles glow one after another, except when reduced motion is on. The tag now reads "★ Historia completa". Story cards end with a "Siguiente historia: X ›" button that cycles through the 6. In the "Pronto…" box the duplicate "Abrir X" button is gone, and the mini symbols are labeled "Historias listas:".
3. **"Escuchar" button.** It reads the name and story at the current level aloud, or the hook and kid lines on the other cards. It uses the device's built-in voices: es-MX first, then any Spanish voice, and it follows `voiceschanged`. Tapping it again stops the reading. Tapping the big tile says the element's name. Speech stops when the card changes, the sheet closes or Reto starts. The button is hidden when there is no Spanish voice.
4. **Search shows its result.** While you type, the best match becomes a button next to the input ("Au · Oro ›", only "Au ›" on phones), with "y N más" beside it when there are several matches. It opens the card. Matching tiles glow (up to 20 matches), and when the input loses focus the best match scrolls into view.
5. **Reto fixes.**
   - The 2 s timer bug is fixed: the timer is stored and cleared in `retoStart` and `retoStop`, with a round id as a second guard. Leaving Reto also hides a lingering toast.
   - A correct answer now shows "¡Correcto! Nombre (Sím)" plus the fact inside the sticky bar instead of a toast. The last fact also stays in the docked panel.
   - The Fácil/Difícil switch only shows before question 1 advances and on the end screen, which slims the phone bar and stops mid-round wipes.
   - Celebration: a victory wave across the 18 columns (60 ms apart) and a WebAudio chime at the end when the score is 5 or more. Two notes play on a correct answer and a soft low note on a miss. A "Sonido: sí/no" switch in Más is remembered in the browser.
6. **Kid and kiosk hygiene.** The gray developer notes left the story cards. The 3-paragraph footer moved into a folded "Acerca de este boceto" inside Más, and a one-line footer label remains. In exhibition mode the badge, footer and notes are hidden. The idle reset now clears `seenFill` (the shells animation plays again), resets the level to 12 años, scrolls to the top, reopens Hierro and stops speech.
7. **Spanish copy.** New phone note: "En el celular la tabla va de lado. Si giras el teléfono, la ves como en tu libro." Reto hints read "Tocaste Hierro (Fe)." "Es un elemento superpesado". Transition metals get a gloss ("la familia más grande de metales, en el centro de la tabla"). The level label reads "Cuéntamelo como para:".
8. **Speed and Letra grande.** The blocking `@import` was replaced with `preconnect` plus a non-blocking stylesheet (`media="print" onload`), and the Mono family was dropped (system monospace instead). With Letra grande on, tile symbols, numbers and names grow on wide screens, and names show from about 40 px.

Checked: the inline scripts pass `node --check`. A headless Chrome smoke test ran search "oro" → button → Oro card with its hook, then H → "Siguiente historia: Litio", then Reto: a correct pick → fact in the bar → a level change during the 2 s window (no carry-over). It also cycled exhibition mode with a hook fact. At about 500 px wide there is no horizontal scroll.

**Still pending:**
- Around 90 elements still get only template sentences.
- The ★ tiles on phones are about 35 px, so the star is small but visible.
- The celebration is a wave plus a chime, with no confetti.
- The "Escuchar" button has not been tried on a real iPhone or Android voice.
- The card still covers the magnifier on touch screens.
- There is still no keyboard way to leave exhibition mode.
