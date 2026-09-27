# Autonomous polish run: make Tabla Viva and Globo Curioso world-class

> Brief for Grok Build, written 2026-09-27 by Claude (Victor's senior dev) at Victor's request. Victor launched you with a one-line prompt pointing here.

You are the lead designer-engineer on two Spanish-language prototype web apps in the public repo https://github.com/vdm285/ideas. You work alone on Victor's Windows laptop for several hours. Victor (the owner, not a programmer) is away and will not answer. Never ask a question and never wait for input. When you must choose, make the call, add one line to `polish/DECISIONS.md` and keep going.

**Goal:** make both apps look and feel world-class, visuals first: type, colour, spacing, light, motion, cards, micro-interactions, dark mode, and phone, tablet and TV layouts. Break nothing and bend no truth. Push after every iteration, because your budget can end at any second and unpushed work is lost.

**When goals conflict:** (1) never lose or break work, (2) principles and honesty, (3) visual quality, (4) speed.

## 0. Hard rules
**Time.** Victor's weekly allowance resets at 21:00 Mexico City time today, 2026-09-27 (2026-09-28 03:00 UTC; Mexico City is UTC−6 all year). Check the time at the start of every iteration with `powershell -NoProfile -Command "[DateTime]::UtcNow.ToString('yyyy-MM-dd HH:mm')"`.
- Before 20:40 Mexico City (02:40 UTC), never stop, never end your turn and never write a "final summary". After each push, start the next iteration. The log is your report.
- After 20:00, pick only items you can finish and push before 20:40. From 20:40, do only the wrap-up (§8), then stop.
- If you start after 21:00 on 2026-09-27, Victor restarted you on purpose. Ignore the stop time and loop until you are stopped.

**Git.**
- Branch `grok/polish-2026-09-27` only. Before each commit, `git branch --show-current` must print exactly that name.
- Push with `git push origin HEAD:refs/heads/grok/polish-2026-09-27`.
- Never commit or push to `main`. Never force-push, amend, rebase or reset pushed commits, and never merge, delete branches, open PRs or change repo settings. Undo with `git revert`.
- The apps' AGENTS.md say "nothing pushed without Victor's OK". This prompt is that OK, for this branch only.
- Never commit secrets, `.env`, `node_modules`, or any file over 300 KB other than the app files.

**Scope.** You may change only `interactive-science/sketch.html`, `interactive-globe/sketch.html`, a new `polish/` folder and a new root `GROK-LOG.md`.
- Never touch `arduino-raspberry/`, `soccer-sentiment/`, `time-travel-camera/`, `README.md`, `LICENSE`, or any `AGENTS.md` or `DOSSIER.md`.
- Install nothing outside the repo except Node.js (and Playwright's browser) if missing. Change no system settings.

**How the apps run.**
- Each app stays ONE html file, same name and folder. The README promises "download it and double-click it", so all local data stays inline, including the globe's map.
- It opens by double-click (file://) with no build and no server, and it also works on GitHub Pages: relative paths only, exact filename case.
- Never use fetch/XHR of local files, `type="module"`, workers, service workers or manifests. All fail on file://.
- External resources may come only from cdnjs.cloudflare.com, cdn.jsdelivr.net/npm/ and Google Fonts, with pinned versions.
  - Tabla loads only fonts from outside, no external scripts (its About text promises this); hand-write small effects inline.
  - Globo keeps d3 7.9.0 and topojson 3.0.2 from cdnjs, and gets one new dependency: the flags in §6.
- No frameworks, bundlers, formatters, WebGL, three.js, globe.gl, MapLibre, Cesium, satellite imagery or 3D. Depth comes from gradients, light and layering.

**Always green.** Every commit leaves BOTH apps passing the full check (§3). Commit and push every iteration, and never hold working changes unpushed for more than 60 minutes.

**Honesty (hard gate).**
- Add no new factual claims anywhere: no numbers, dates, names, records, history, food, culture or news. This includes attract lines, tooltips, alt text and aria-labels.
- New wording is fine only for UI: labels, hints, buttons, empty states and celebrations. Values computed from existing data (distance, antipode, electron counts) are fine.
- Data is frozen and hashed (§3). List suspected factual errors under "Posibles errores para revisar" in the log and don't change them. Only obvious spelling typos may be fixed, with `polish/content-lock.json` updated in the same commit and the reason logged.
- Sample labels stay visible. You may restyle them, but they must still contain "muestra" or "ejemplo" and pass contrast:
  - Tabla: "Boceto · datos de muestra" and "★ Historia completa";
  - Globo: "Boceto: textos de ejemplo, sin revisar", the "(ejemplo)" source lines, and "tema de ejemplo · no es la noticia de hoy".
- These also stay:
  - "Modelo de Bohr simplificado…" and "(predicha)" for Z ≥ 104;
  - the disputed-territory notes and Hoy's attributed perspectives;
  - the footer credits (Natural Earth, world-atlas);
  - Modo niños' rules: no casualty numbers, no graphic detail.
- Decoration must never look like data. No fake terrain, city lights or invented markers. A sparse starfield in dark mode is fine, because it is obviously decorative. Perspective cards use neutral hues, never red or green.

**Design principles** (from the apps' AGENTS.md; binding).
- **Zero-click start:** the table or spinning globe is usable in the first frame. No splash, loader, tutorial or intro may delay the first tap.
- **Few clear choices:** add no new always-visible button, tab, mode or setting. Extras go in Tabla's Más menu or the card; Globo may group its existing controls into one toolbar. Regroup freely, but remove no feature; propose removals under "Needs Victor".
- **No accounts, analytics, cookies or tracking.** Keep the localStorage keys (`tv-sound`, `tv-big`, the Reto best score, `gc-kids`).
- **Kid and kiosk ready:** tap targets of at least 44 px, never under 24 px (the phone's rotated table tiles are the only exception between 24 and 44). `prefers-reduced-motion` turns off non-essential motion. Attract mode and idle reset keep working.
- **Spanish in Mexican usage:**
  - Use Mexican words (celular, computadora, platicar, jitomate) and tú. Never vosotros, vos, móvil, ordenador, vale, coger, zumo or patata.
  - Write "Toca", never "Haz clic" or "Pulsa".
  - Always ¿…? and ¡…!, accents on capitals too, and "solo" without an accent.
  - Keep the sketches' number style: 5,730 · 91.75 % · 25 °C.
  - Kid tone is short and warm, never babyish or shaming ("¡Casi! Eso es China. Japón está aquí.").
- The AGENTS.md parts about a future build (src/, PWA, macOS `jsc` tests) don't apply yet. Edit `sketch.html` directly.

**Windows and file safety.**
- Files stay UTF-8 without BOM. Never write repo files with PowerShell `>`, `Out-File` or `Set-Content`, which destroy the accents. Use your edit tool or Node `fs.writeFileSync(p, s, "utf8")`.
- If PowerShell blocks `npm`/`npx`, use `npm.cmd`/`npx.cmd`.
- `interactive-globe/sketch.html` has one line of about 107,000 characters (`const WORLD = {"type":"Topology"…`, the map). Never print or read it. Read files in line ranges and keep output short.
- Edit with small targeted replacements; never rewrite a whole file from memory. If your edit tool struggles with the long line, use a small Node script that replaces one exact unique snippet.
- Before each commit, run `git diff --cached --stat`. If an app file shows more than about 600 changed lines, you reformatted it or broke its line endings: redo the change as targeted edits.

## 1. Setup (iteration 0, at most 45 min, ends with a push; each step checks before acting, so a re-run resumes safely)
1. **Repo.** If the current folder is inside a clone of vdm285/ideas, use it. Otherwise, if an `ideas` subfolder exists here (a previous run), use that. Otherwise run `git clone https://github.com/vdm285/ideas.git ideas` and work in `ideas`. Then run `git fetch origin`.
2. **Auth.** If a push asks for credentials, run `gh auth setup-git` once. Victor does logins himself. If pushing still fails, keep committing locally, put "PUSH FAILING — Victor: run gh auth login" at the top of the log, and retry each iteration.
3. **Git config (repo-local).** Run `git config core.autocrlf true`. If `git config user.email` is empty, set `user.name` to "Grok Build for vdm285" and `user.email` to ID+LOGIN@users.noreply.github.com, with ID and LOGIN from `gh api user --jq ".id"` and `gh api user --jq ".login"`.
4. **Branch.** Run `git switch grok/polish-2026-09-27` (the branch already exists on origin and holds this brief). If `GROK-LOG.md` exists on it, you are RESUMING: read the top of `GROK-LOG.md`, `polish/BACKLOG.md`, the end of `polish/DECISIONS.md` and `git log -8 --oneline`, then go to §4. Otherwise continue with step 5.
5. **Brief.** This file is `polish/BRIEF.md`. Never edit it; re-read it after any context loss.
6. **Read** (15 min at most):
   - both `AGENTS.md` files;
   - the Round 1/Round 2 changelogs and "Still pending" lists at the end of both `DOSSIER.md` files;
   - both `sketch.html` files, in line ranges.
7. **Tools** (20 min at most, then the fallback).
   - **Node.** If `node -v` fails, try `"C:\Program Files\nodejs\node.exe"`, then `winget install -e --id OpenJS.NodeJS.LTS --accept-package-agreements --accept-source-agreements`. If winget waits for an admin prompt or runs more than 5 minutes, unzip the official Windows x64 LTS .zip from https://nodejs.org/dist/ into `%USERPROFILE%\tools\node` instead.
   - **Playwright.** In `polish/tools/`, run `npm.cmd init -y` and `npm.cmd i -D playwright @axe-core/playwright`. Launch with `chromium.launch({ channel: "msedge" })`: Windows' built-in Edge, no download. If that fails, run `npx.cmd playwright install chromium`.
   - Write `polish/.gitignore` with `tools/node_modules/` and `out/`.
   - **Fallback without Node.** Take screenshots with headless Edge: `"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless=new --hide-scrollbars --virtual-time-budget=5000 --window-size=W,H --screenshot=out.png file:///…`. For phones, use a wrapper page with a 390×844 `<iframe>`. Add static checks, and log that checking is reduced.
8. **Check.** Write `polish/tools/check.mjs` (§3), lean at first. Run it on the untouched files; it writes `polish/content-lock.json`, `polish/metrics.json` and the baseline shots. A flow failing on the baseline is either a wrong test (fix it) or a real bug on main (log it).
9. **Prove the check can fail.** Copy one app into `polish/out/canary/` with a planted break (rename the search input's id), run `check.mjs --root polish/out/canary`, confirm it goes red, and log it.
10. **First push.** Copy the baseline set to `polish/shots/before/` and score both apps (§7). Create `GROK-LOG.md` (§8), `polish/BACKLOG.md` (from §6) and `polish/DECISIONS.md`. Commit "setup: check + baseline" and push with `git push -u origin HEAD:refs/heads/grok/polish-2026-09-27`.

## 2. What exists today (all must keep working; * = automated in the check)
Measured in headless Chromium on 2026-09-27: both files lack `<!doctype html>`, so they render in quirks mode ("BackCompat").

**Tabla Viva** (`interactive-science/sketch.html`, 94 KB): a periodic table for kids and families on phones, tablets and touch TVs.
- *There are 118 `.cell` tiles. Hierro's card is loaded at start: shown docked at 1180 px and wider; narrower screens open cards as a sheet on tap.
- *Search `#q`: "oro" gives a best-match button that opens Oro. "26" finds Hierro, "wolframio" finds W, and "nitrogeno" finds Nitrógeno. Matching tiles glow.
- *Colouring by Familia or by Estado a 25 °C. Legend chips filter the table.
- *The card has:
  - the level switch (8 años · 12 años · 15 o más) and the story;
  - the Bohr SVG with "Ver cómo se llenan las capas";
  - a folded "Datos técnicos";
  - 6 ★ story cards (uses, where found, history, "Con un adulto" experiment, quiz, "Siguiente historia");
  - hooks for about 26 elements, and auto-built text with family chips for the rest;
  - "Escuchar".
- On phones there is a prev/next bar, and Back or a swipe right closes the card. Under 700 px the table is rotated, with a note saying so.
- *Reto: rounds of 10, Fácil/Difícil, hints, Saltar/Salir/Otra ronda, a "¿Sabías que…?" after a hit, the best score saved, and a chime.
- *Más: Letra grande, Pantalla completa, Sonido, Modo exhibición and "Acerca de este boceto". Modo exhibición shows an attract screen with an idle reset; you leave by holding the logo for 3 s. It hides the badge and footer by design.
- Problems:
  - at 1920×1080 the page is 1,390 px tall, and at 1024×768 it is 890 px, so both scroll;
  - on a 390 px phone the tiles are about 32×46 px and the table starts about 41% of the way down;
  - the dark family colours are muddy (olive and brown);
  - on touch screens the card covers the magnifier;
  - the Reto end screen is plain.

**Globo Curioso** (`interactive-globe/sketch.html`, 178 KB, of which 107 KB is the inline map): a d3-geo orthographic globe with Natural Earth 1:110m (177 shapes).
- *It opens on a spinning globe with México's card ready.
- The SVG has an ocean radial gradient (`#oceanGrad`), a shine overlay (`#shineGrad`), ★ text markers on the 4 sample countries, a name label on the globe, tap ripples and a landing flash.
- *Controls:
  - drag rotates, with no inertia;
  - pinch zooms, and so does the wheel (after a click on the globe, or with Ctrl);
  - +/− buttons, hidden on touch;
  - arrow keys, and Enter picks the centre country.
- Fly-to eases the rotation cubic in-out over 900 ms (1,800 ms with an extra turn for Sorpréndeme), and the zoom changes linearly.
- *A tap flies to the country and opens its card. Ocean taps name the water, and tiny places say "muy pequeño para este mapa".
- *Every card has:
  - the Spanish name, the distance and size vs México, and "Colinda con" chips;
  - a Wikipedia or Vikidia link;
  - "¿Sabías que…?" with the antipode, "Cava el túnel", the season and the size rank;
  - for 15 large countries, the capital and one line.
- *MX, JP, EG and BR have the tabs Historia · Comida · Cultura · Hoy. Hoy has "Uniendo los puntos", "Distintas miradas", "Lo que aún no se sabe" and "Para platicar en familia".
- *Also:
  - Modo niños (remembered), Léemelo and Compartir;
  - `#JP/comida/ninos` links;
  - search with aliases (EUA, Holanda, Malvinas…);
  - Sorpréndeme and "¿Dónde está…?" (5 rounds);
  - the Casa/Japón/Egipto/Brasil chips and Giro automático.
- Under 900 px there is a bottom sheet (collapsed/peek/open, with a swipeable handle), and the spin resumes after 30 s idle.
- Problems:
  - there is no charset, viewport or `lang`, so real phones lay it out 980 px wide and the sheet never switches on;
  - Google Fonts block rendering;
  - at 1920×1080 the globe is only 578 px wide and the page scrolls (1,130 px);
  - flag emoji are hidden on Windows (`noFlags`).

## 3. The check: `node polish/tools/check.mjs [--quick] [--root DIR]`
It loads each app from file:// (via `pathToFileURL`) in these views:
- phone 390×844 (DPR 2, isMobile, hasTouch);
- tablet 1024×768 (DPR 2, hasTouch);
- TV 1920×1080;
- each view in light and dark;
- one run with `reducedMotion: "reduce"`;
- one load over http from a tiny `node:http` server that the script starts and stops (this mimics GitHub Pages).

`--quick` runs only phone light, TV light and the flows. The script prints one line per check, ends with `ALL GREEN` or `RED: <reasons>`, and exits non-zero on red.

**Hard fails:**
- **Errors and requests:**
  - any page or console error (except failed font requests while offline);
  - any request to a host other than cdnjs.cloudflare.com, cdn.jsdelivr.net, fonts.googleapis.com or fonts.gstatic.com.
- **Layout:** horizontal overflow (`scrollWidth > innerWidth`).
- **Document mode**, from iteration 1: `compatMode` must be CSS1Compat, `characterSet` UTF-8 and `lang` "es".
- **Flows:** any failing * flow from §2. This includes:
  - a full Reto Fácil round reaching the end screen;
  - the 3 s logo hold;
  - a drag changing the globe's rotation;
  - all 4 tabs showing text;
  - Modo niños changing the text;
  - after the viewport fix, the phone sheet's 3 states.
- **Sample label:** none visible ("muestra"/"ejemplo") on the first screen in normal mode.
- **Reduced motion:** infinite animations still running (`document.getAnimations()`).
- **Content lock:** a SHA-256 mismatch of the top-level classic-script globals, which `page.evaluate` reads by bare name. Never rename them or make them non-global.
  - Tabla, as JSON: `SYM, NAME, MASS, ALIAS, CAT, STATE, EXC, SAMPLE, FACTS, HOOK`, plus `.toString()` of `catOf, stateOf, posOf, madelung, configOf`.
  - Globo, as JSON: `WORLD, SAMPLES, MINI, SOURCES, DISPUTED, ALIAS, NAME_ES, WIKI, SMALL, CDMX`, plus `oceanAt.toString()`.
- **Integrity:** the files must be UTF-8 with no BOM, no U+FFFD and no mojibake (`Ã`, `Â`, `â€`), and must still contain "Hidrógeno" and "Modo niños".
- **Scope:**
  - `git diff --quiet origin/main -- arduino-raspberry soccer-sentiment time-travel-camera README.md LICENSE interactive-science/AGENTS.md interactive-science/DOSSIER.md interactive-globe/AGENTS.md interactive-globe/DOSSIER.md` must pass;
  - staged paths must stay inside the §0 scope;
  - the staged files must contain none of `ghp_`, `github_pat_`, `xai-`, `sk-` or `PRIVATE KEY`.

**Ratchets.** These may not get worse than the last green commit (`polish/metrics.json`):
- controls under 44 px, and under 24 px (target 0);
- WCAG AA contrast failures (4.5:1 for text, 3:1 for large text and UI), including tile text on every family and state colour in both themes;
- axe serious and critical violations;
- TV page height (the goal is no scroll at 1920×1080).

**Tracked, not failing.** If one gets over 25% worse, re-run once, then log it and fix it soon:
- first contentful paint;
- globe frame times (average and p95) over a 2 s scripted drag and one fly-to at TV size (targets: average under 17 ms, p95 under 25 ms);
- Bohr fill frame times;
- long tasks over 50 ms when a card opens.

**Screenshots.**
- Per app: phone, tablet and TV, in light and dark.
- States:
  - Tabla: the Fe card on phone, Reto on TV, attract mode on TV;
  - Globo: Japón's Hoy tab on TV, Modo niños on phone, the open sheet on phone.
- Save them as JPEG (quality about 75) to `polish/out/shots/`, which is gitignored.
- A committed set (phone, tablet and TV light, plus TV dark, per app, each at most 250 KB) goes to `polish/shots/before/` once, then to `polish/shots/latest/` every 4th iteration and at wrap-up.
- If you can open images, look at every shot of the app you changed. If not, rely on the DOM metrics and say so in the log.

**The check is protected.** You may add checks or fix a wrong one, with a logged reason. Never loosen one to get a pass.

## 4. The loop (until the stop time; each iteration 20–45 min)
1. Check the time. `git status` must be clean. Read the top of `polish/BACKLOG.md` and the last log entry, and `polish/BRIEF.md` after any context loss.
2. Pick the item.
   - Opening order: #1 Tier 0 on both apps, #2 Tabla 1a, #3 Globo 1a, #4 Tabla 1b, #5 Globo 1b.
   - After that, pick the biggest expected score gain per hour for the app whose turn it is. Apps alternate strictly, and a red check comes first.
3. Write 1–3 lines of intent: what will look different, in which screenshot, and the acceptance test.
4. Implement with targeted edits, working from the tokens. Leave no dead CSS or JS.
5. Run `--quick` while you work. Then stage and run the full check, which also inspects the staged files.
6. **Critique.**
   - Compare the new shots with the previous ones, and name the 5 flaws a demanding design lead would point out first.
   - Walk one persona through 60 seconds:
     - Sofía, 9: taps fast and imprecisely, quits after two confusing moments;
     - Diego, 12: competitive, hates anything babyish;
     - Abuela Lupita, 68: needs big text, knows no gestures;
     - the kiosk TV: seen from 2–3 m, must invite a passer-by in 3 s.
   - Re-score the rubric rows you touched. Score what the shots show, not what you intended.
7. If the check is red or a row dropped, make at most 2 fix attempts (15 min). Then discard the edits (`git restore --staged --worktree <files>`), park the item with the reason, and move on.
8. Update `polish/BACKLOG.md` (re-rank it and add the flaws), `polish/DECISIONS.md` and `GROK-LOG.md`, and stage them. Commit with a message like `polish(globo): atmosphere halo + limb shading [G1 4→7, overall 52→58]`, then push.
9. Start the next iteration immediately.

**Every 4th iteration, step back** (20 min at most):
- score both apps on the full rubric;
- view dark mode, reduced motion, Letra grande and Modo niños;
- walk the §2 lists by hand;
- re-rank the backlog;
- commit `polish/shots/latest/`.

**When stuck:**
- The same failure twice: revert and park it. You may retry it once, after 3 other iterations.
- Tooling trouble for more than 20 min: use the fallback.
- Torn between options: pick the most reversible, the smallest and the closest to AGENTS.md, and log it.
- Stop early only if the budget ends or a blocker makes all work impossible. Write "BLOCKED: <reason>" at the top of the log and push if you can.

**The backlog never runs dry.** Turn the lowest rubric row into an item, or go deeper: TV readability at 3 m, dark-mode parity, Windows high contrast, keyboard use and focus, edge states, layout shift when fonts swap, smoothness under 4× CPU throttling, micro-interactions.

## 5. Visual direction (set now; refine it, don't restart it)
**Shared craft system.**
- **Tokens** at the top of the CSS, keeping the existing light `:root`, dark `prefers-color-scheme` and `[data-theme]` structure:
  - colour (light and dark), spacing 4/8/12/16/24/32/48 and radii;
  - 3 elevation shadows tinted with the hue underneath;
  - a fluid `clamp()` type scale up to TV;
  - motion: `--t-fast:120ms; --t-ui:200ms; --t-panel:320ms; --ease-out:cubic-bezier(.2,.8,.2,1); --ease-inout:cubic-bezier(.65,0,.35,1)`.
- **Colour:** design in OKLCH with even lightness steps, and ship hex.
- **Motion:**
  - purposeful, 120–400 ms, transform and opacity only;
  - filters and glows only on one small element at a time, never on the moving land group;
  - no `backdrop-filter` on large panels (old laptops and TVs);
  - nothing loops except the globe spin and attract mode.
- **Controls:** rest, hover (`pointer:fine` only), pressed (scale .97), a 3 px `:focus-visible` ring in both themes, selected and disabled.
- **Icons:** one inline-SVG line style (24 grid, 1.75–2 stroke, round caps). No emoji as UI icons.
- **Fonts:** keep each app's (Tabla: Bricolage Grotesque + Atkinson Hyperlegible Next; Globo: Alegreya + Alegreya Sans, and it may drop IBM Plex Mono). Add no families, and tune the fallbacks (Segoe UI, Roboto).
- **Layouts:**
  - Phone (360–412 px, cheap Android): thumb zone and safe areas.
  - Tablet: landscape.
  - TV 1920×1080: the object and card fit with no page scroll; body text at least 20 px, key labels at least 24 px.
- Emulate the references below in spirit only. Never copy their assets or text.

**Tabla Viva: "a luminous specimen cabinet".** A Papalote/Universum-level exhibit: crisp, geometric, joyful for kids, precise for adults. References: Ptable's clarity, the RSC table's storytelling, Theodore Gray's *The Elements*, Apple-grade type and motion.
- **Light:** a warm off-white background (not grey-blue), navy ink, glossy colour-card tiles.
- **Dark** ("museo de noche", which kiosk TVs use; make it stunning):
  - a near-black blue background;
  - tiles of dark tinted glass with a luminous top edge in the family colour;
  - the symbol in the family's light tint;
  - the selected tile glows.

**Globo Curioso: "a classroom globe under museum light" (light) / "the Earth from the night sky" (dark).** Warm, editorial and cartographic, an object with weight and light. References:
- Google Earth's fly-to and Radio Garden's joyful dark globe;
- the atmosphere glow of the GitHub and Stripe homepage globes;
- Replogle and National Geographic school globes for the palette;
- Bostock's d3 orthographic demos for the feel;
- NYT and The Pudding for the cards.

## 6. Starting backlog (seed `polish/BACKLOG.md`; re-rank as you learn)
**Tier 0 (iteration 1, both apps).**
- Add `<!doctype html>` and `<html lang="es">`, with `<meta charset="utf-8">` first.
- Add the viewport (`width=device-width,initial-scale=1,viewport-fit=cover`), `theme-color` for light and dark, a description and an inline SVG favicon.
- Load Globo's Google Fonts without blocking, as Tabla does.
- Standards mode and the viewport will shift the layouts. Compare shots carefully, especially Globo's phone sheet, which now appears on real phones.
- Add the token blocks without changing the look yet.

**Tier 1a Tabla (iteration 2).**
- **Palette:** 10 family and 4 state colours with matched perceived lightness in both themes.
  - Transition metals (about 40% of the table) get the calmest colour.
  - Replace the muddy dark tiles.
  - All tile text reaches 4.5:1.
  - Families stay distinct under deuteranopia (CDP `Emulation.setEmulatedVisionDeficiency`), and colour is never the only cue.
- **Tiles:**
  - radius about 8 px, a top highlight and a 1 px inner edge;
  - the number in tabular figures at 70%, a heavy tight symbol and a small name;
  - hover lifts 2 px with a family-tinted shadow, and press scales to .96;
  - selected gets an ink ring plus a glow;
  - filtering fades non-matches to 15% and desaturates them over 200 ms;
  - the ★ becomes a refined corner badge of at least 12 px.
- **Header:**
  - a compact brand row and a pill search with depth;
  - Reto as the one strong primary button, with Más kept quiet;
  - on phones, the table starts much higher.

**Tier 1a Globo (iteration 3).**
- **Lighting stack.** Update it only on resize or zoom, never per frame. Build on `#oceanGrad` and `#shineGrad`:
  - an ocean lit from the upper left;
  - limb darkening toward the lower right;
  - a soft specular highlight;
  - a thin atmosphere halo outside the rim (luminous blue in dark mode);
  - a contact shadow in light mode;
  - in dark mode, a sparse, deterministic, static starfield and a faint vignette.
- **Cartography:**
  - a new palette for the existing 5-colour scheme: muted ochre, sage, terracotta, sand and dusty rose in light mode, muted jewel tones in dark mode;
  - fine coastlines and a graticule that fades toward the limb;
  - the selection gets the pick colour, a bright 2 px edge and one pulse on landing;
  - refined ★ markers, and a pill name label with a halo that stays inside the disc.
- **The globe is the hero.**
  - TV and desktop: the globe fills the left ~60% at up to 88 vh (at least 850 px across at 1920×1080), with the card docked right and no page scroll.
  - Zoom ±, Giro, Sorpréndeme and ¿Dónde está…? become one floating pill toolbar at the foot of the globe.
  - The long footer folds into "Acerca de este boceto"; the ribbon stays visible.
  - Phone: the globe runs full-bleed, and the sheet gets a 20 px radius, a handle, spring snaps and safe areas.

**Tier 1b Tabla (iteration 4).**
- **Card:**
  - a hero header: a big family-colour tile, a faint oversized symbol watermark, a family pill and the "★ Historia completa" badge;
  - a stat strip from table data only (Número atómico · Masa · Estado a 25 °C · Grupo/Periodo);
  - the level switch as a segmented control with a sliding thumb;
  - the story at about 1.15 rem, line-height 1.6, at most 62 characters per line;
  - calm section cards with icons;
  - "Con un adulto" as an amber safety callout;
  - quiz answers as big cards: a correct one turns green with a check, a wrong one shakes gently.
- **Bohr:**
  - the nucleus as a soft radial-gradient sphere in the family colour;
  - thin rings, with the outer shell emphasised;
  - electrons as small lit spheres, glowing in dark mode;
  - during the fill, each electron pops in, with a soft tick if Sonido is on;
  - static under reduced motion.
- **TV fit:** the whole table and the docked card fit at 1920×1080, readable from 3 m. Decide whether the card docks at 1024×768, and log it.

**Tier 1b Globo (iteration 5).**
- **Motion:**
  - drag inertia: velocity from the last ~80 ms, exponential decay, stop below 0.02° per frame;
  - drag sensitivity scales with zoom;
  - fly-to with a Google Earth hop (zoom out about 15% mid-flight), 600–1,600 ms by distance, easing both rotation and zoom in and out;
  - spin eases in and out;
  - a coarser `proj.precision` while moving, if the frame times need it.
- **Card:**
  - the name large in Alegreya 800, with a quiet meta line;
  - "¿Sabías que…?" as a distinctive fact card, not in the amber reserved for sample labels;
  - tabs as a segmented control with icons, a sliding indicator and a 150 ms crossfade;
  - a drop cap on the first Historia paragraph (adult mode);
  - polished neighbour chips.
- **Flags:** one `<img>` per country from `https://cdn.jsdelivr.net/npm/flag-icons@7.5.0/flags/4x3/<iso2 lowercase>.svg` (MIT), loaded on tap, with `alt=""` and hidden on error. This fixes Windows. Add the credit and the network note to the footer.

**Tier 2 (alternate apps, lowest score first).**
- **Tabla:**
  - a keyboard-style preview bubble of the big tile under the pressing finger on phones (this fixes the covered magnifier);
  - a full-width rotated phone table;
  - a tile-to-card morph with View Transitions (otherwise a 200 ms fade and slide);
  - Reto: a HUD with a big target and progress dots, a family-colour hit burst, an end card with 1–3 stars and a big "Otra ronda", and inline confetti (at most 1.2 s and 100 particles; static stars under reduced motion);
  - an attract mode whose caption moves each cycle (against TV burn-in);
  - `?kiosk=1` starts Modo exhibición;
  - Más as a popover that closes on an outside tap or Escape;
  - arrow keys between tiles.
- **Globo:**
  - forgiving taps: water within about 16 px of a country selects it, while real ocean taps still name the water;
  - Hoy as an Antes → Hoy thread (a hollow dot to a filled dot), attributed quote cards in neutral hues, and icons for "Lo que aún no se sabe" and "Para platicar en familia", keeping "tema de ejemplo" prominent;
  - ¿Dónde está…?: a HUD pill; a green pulse when right; a gentle shake plus an arc to the right country when wrong; an end card with stars;
  - Modo niños friendlier but not babyish;
  - a styled tooltip and suggestion list (keep the aliases and the "muy pequeño" message);
  - a friendly Spanish message if d3 or topojson fail to load.

**Not now** (log such ideas under "Needs Victor"): new content, the 1:50m map, day/night shading, isotopes, 3D orbitals, live AI, globe sound, PWA/offline, and any library beyond the flags.

## 7. Rubrics (0–10 per row; [weight]; overall = weighted average × 10, out of 100)
**Anchors:**
- 2 = broken;
- 4 = works but generic;
- 6 = clean with rough edges;
- 8 = polished and cohesive, it would pass a top product team's design review;
- 10 = reference quality, no visible flaw in any view or theme.

Every row under 9 names its main flaw. A score rises only with evidence: a shot or a metric. Any honesty failure caps the overall score at 40.

**Tabla Viva:**
- T1 First impression in every view [15]
- T2 Colour: both themes, deuteranopia, AA [15]
- T3 Tiles and states [10]
- T4 Typography, readable on TV [10]
- T5 Card and Bohr [15]
- T6 Motion and feedback [10]
- T7 Layouts: phone, tablet, TV with no scroll [10]
- T8 Reto and attract mode [5]
- T9 Accessibility and speed [5]
- T10 Honesty and Spanish [5]

**Globo Curioso:**
- G1 The globe as an object: light, depth, atmosphere, both themes [20]
- G2 Cartography [10]
- G3 Motion feel: inertia, hop, spin, pinch; 55 fps or better [15]
- G4 Card: type, fact card, tabs, Hoy, sources [15]
- G5 Layouts: hero globe, phone sheet, TV with no scroll [10]
- G6 Controls and search [10]
- G7 Modo niños and the game [5]
- G8 Dark mode [5]
- G9 Accessibility and speed [5]
- G10 Honesty and Spanish [5]

## 8. The trail for Victor, and the wrap-up
**`GROK-LOG.md`** is plain English Victor can read in 2 minutes, with times in Mexico City time. Rewrite its top block (at most 30 lines) with every push. It holds:
- **Status:** working, finished, BLOCKED or PUSH FAILING; the last push time; the iteration number; whether both apps pass the check.
- **How to see it,** verbatim (after the first push, check with `curl.exe -sI <url>` that item 1 returns text/html, and drop it if not):
  1. Any browser or phone: https://raw.githack.com/vdm285/ideas/grok/polish-2026-09-27/interactive-science/sketch.html and https://raw.githack.com/vdm285/ideas/grok/polish-2026-09-27/interactive-globe/sketch.html
  2. All changes: https://github.com/vdm285/ideas/compare/main...grok/polish-2026-09-27
  3. ZIP: https://github.com/vdm285/ideas/archive/refs/heads/grok/polish-2026-09-27.zip. Unzip it and double-click either `sketch.html`. Also give the repo folder's full path on this laptop.
  4. Before and after pictures: `polish/shots/before/` vs `polish/shots/latest/`.
- **Scoreboard:** baseline → now per app (overall and per row), plus errors, targets under 44 px, contrast failures, TV page height and globe p95 in ms.
- **Top 3 changes** to look at, and the **top 3 open issues**.
- **Needs Victor:** at most 5 decisions he may want to reverse, and ideas that need his call.

Below the top block:
- **Iterations,** newest first, at most 5 lines each: time, app, item, scores before → after, commit, and what changed in plain words.
- **Posibles errores para revisar.**
- **Parking lot.**

`polish/DECISIONS.md`: one line per decision (number, time, app, what, why, how to undo).

**Wrap-up** (from 20:40, or when you sense the budget ending):
1. Start no new items.
2. Run the full check and refresh `polish/shots/latest/`.
3. Give the final full-rubric scores.
4. Mark the top block "finished" and add "Next 5 things I would do".
5. Commit "wrap-up", push, and stop.

Begin now with §1.
