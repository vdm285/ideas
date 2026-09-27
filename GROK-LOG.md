# Tabla Viva and Globo Curioso

**Status:** working. Last push 27 sep 2026, 15:31 (Mexico City). Iteration 2. Both apps pass the check.

**How to see it:**

1. Any browser or phone: https://raw.githack.com/vdm285/ideas/grok/polish-2026-09-27/interactive-science/sketch.html and https://raw.githack.com/vdm285/ideas/grok/polish-2026-09-27/interactive-globe/sketch.html. If a link is blocked, use the ZIP.
2. All changes: https://github.com/vdm285/ideas/compare/main...grok/polish-2026-09-27
3. ZIP: https://github.com/vdm285/ideas/archive/refs/heads/grok/polish-2026-09-27.zip. Unzip it and double-click either `sketch.html`. On this laptop the folder is `C:\Users\Victor\grok-work\ideas`.
4. Before and after pictures: `polish/shots/before/` vs `polish/shots/latest/`.

**Scoreboard:** Tabla 52 → 63. Globo 55.

- Tabla 63. T1 6, the phone table is higher but the rotation note still leads. T2 7, colours match in both themes and contrast failures are 0; alkali and noble gases are both pink. T3 7, tiles have a highlight and a star badge; phone tiles still have no names. T4 6, card type is small for a TV. T5 6, the card is still a long plain column. T6 6, press and filter are in, with no move from tile to card. T7 5, the TV page is 1,374 px. T8 5, the Reto end is a text bar. T9 7, contrast is clean and 133 phone targets are under 44 px. T10 8, one global sample badge covers the automatic cards.
- Globo 55. G1 5, the globe is still a small flat disc. G2 6, land colours are pale. G3 5, drag stops dead, frames average 22 ms, p95 32 ms. G4 6, the fact card uses the same amber as the sample ribbon. G5 5, the phone sheet works but the TV page is 1,113 px. G6 5, the controls are a loose row. G7 5, the game is plain. G8 5, dark mode is a recolor. G9 6, 18 targets are under 44 px. G10 8, the sample ribbon is easy to miss in the card.
- Errors: none. Under 24 px: 0. Contrast failures: 0.

**Top 3 changes:**

1. The table sits on warm cream paper by day, and at night the tiles are dark glass with a light symbol.
2. The big block of transition metals is the calm colour.
3. On a phone the title is one row, and the table starts higher.

**Top 3 open issues:**

1. Both apps still scroll on a TV (Tabla 1,374 px, Globo 1,113 px).
2. Phone tiles are still small and have no names.
3. On the phone, Globo's footer runs into the bottom sheet.

**Needs Victor:**

- Should the element card dock on a 1024 px tablet? Today it docks only from 1180 px.
- Palestina's name, and the Georgia Wikipedia link, stay as they are until you say otherwise.
- This run will not add new facts, a finer map, or live AI.

## Iterations

- **27 sep 2026, 15:31, Tabla, palette and tiles.** Tabla 52 → 63. New family colours in both themes, a pill search, rounder tiles, and a shorter phone header. Dark contrast failures went from 5 to 0. The TV page is still 1,374 px tall.
- **27 sep 2026, 15:12, both apps, tier 0.** Globo 52 → 55, Tabla stays 52. Added the document head, a real phone viewport, and unused design tokens. On a phone the globe's sheet now opens in three steps. The footer still collides with that sheet.
- **27 sep 2026, 15:05, both apps, setup.** Scores Tabla 52, Globo 52. Commit `setup: check + baseline`. Added a headless check (Edge), baseline pictures, and the work list. Renaming the search box id in a throwaway copy made the check go red, then that copy was thrown away. No pixels in the apps changed.

## Posibles errores para revisar

- No new factual errors spotted. Already waiting on you, from the dossiers: the 15 hand-written country lines are unreviewed, and Palestina's name plus the Georgia Wikipedia slug are your call.

## Parking lot

- Empty.
