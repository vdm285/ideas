# Tabla Viva and Globo Curioso

**Status:** working. Last push 27 sep 2026, 15:05 (Mexico City). Iteration 0. Both apps pass the check.

**How to see it:**

1. Any browser or phone: https://raw.githack.com/vdm285/ideas/grok/polish-2026-09-27/interactive-science/sketch.html and https://raw.githack.com/vdm285/ideas/grok/polish-2026-09-27/interactive-globe/sketch.html
2. All changes: https://github.com/vdm285/ideas/compare/main...grok/polish-2026-09-27
3. ZIP: https://github.com/vdm285/ideas/archive/refs/heads/grok/polish-2026-09-27.zip. Unzip it and double-click either `sketch.html`. On this laptop the folder is `C:\Users\Victor\grok-work\ideas`.
4. Before and after pictures: `polish/shots/before/` vs `polish/shots/latest/`.

**Scoreboard:** baseline and now are the same. Nothing visual has changed yet.

- Tabla **52**. T1 5, the phone table starts low. T2 4, dark tiles are muddy and 5 texts miss contrast. T3 5, phone tiles are cramped. T4 6, card type is small for a TV across the room. T5 6, the card is a long plain column. T6 5, feedback is a brief glow. T7 4, the TV page is 1,390 px tall. T8 5, the Reto end is a text bar. T9 6, 133 targets under 44 px. T10 8, one global sample badge covers the automatic cards.
- Globo **52**. G1 5, the globe is a small flat disc. G2 6, land colours are pale. G3 5, drag stops dead and frames are 22 ms average, p95 33 ms. G4 6, the fact card uses the same amber as the sample ribbon. G5 3, a phone lays the page out at 980 px and the TV page is 1,130 px. G6 5, the controls are a loose row. G7 5, the game is plain. G8 5, dark mode is a recolor. G9 5, the page has no language and 18 targets are under 44 px. G10 8, the sample ribbon is easy to miss once you are in the card.
- Errors: none. Under 24 px: 0. Contrast failures: Tabla 5, Globo 0.

**Top 3 changes:** Nothing on screen changed. This push adds the safety check, the before pictures, and the work list.

**Top 3 open issues:**

1. On a phone, Globo lays out 980 px wide, so the bottom sheet never appears.
2. Both apps scroll on a TV.
3. Tabla's dark tiles are muddy.

**Needs Victor:**

- Should the element card dock on a 1024 px tablet? Today it docks only from 1180 px.
- Palestina's name, and the Georgia Wikipedia link, stay as they are until you say otherwise.
- This run will not add new facts, a finer map, or live AI.

## Iterations

- **27 sep 2026, 15:05, both apps, setup.** Scores Tabla 52, Globo 52. Commit `setup: check + baseline`. Added a headless check (Edge), baseline pictures, and the work list. Renaming the search box id in a throwaway copy made the check go red, then that copy was thrown away. No pixels in the apps changed.

## Posibles errores para revisar

- No new factual errors spotted. Already waiting on you, from the dossiers: the 15 hand-written country lines are unreviewed, and Palestina's name plus the Georgia Wikipedia slug are your call.

## Parking lot

- Empty.
