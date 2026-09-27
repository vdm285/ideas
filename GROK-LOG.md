# Tabla Viva and Globo Curioso

**Status:** working. Last push 27 sep 2026, 15:40 (Mexico City). Iteration 3. Both apps pass the check.

**How to see it:**

1. Any browser or phone: https://raw.githack.com/vdm285/ideas/grok/polish-2026-09-27/interactive-science/sketch.html and https://raw.githack.com/vdm285/ideas/grok/polish-2026-09-27/interactive-globe/sketch.html. If a link is blocked, use the ZIP.
2. All changes: https://github.com/vdm285/ideas/compare/main...grok/polish-2026-09-27
3. ZIP: https://github.com/vdm285/ideas/archive/refs/heads/grok/polish-2026-09-27.zip. Unzip it and double-click either `sketch.html`. On this laptop the folder is `C:\Users\Victor\grok-work\ideas`.
4. Before and after pictures: `polish/shots/before/` vs `polish/shots/latest/`.

**Scoreboard:** Tabla 63. Globo 55 → 65.

- Tabla 63. T1 6, the phone table is higher but the rotation note still leads. T2 7, contrast failures are 0; alkali and noble gases are both pink. T3 7, phone tiles still have no names. T4 6, card type is small for a TV. T5 6, the card is still a long plain column. T6 6, no move from tile to card. T7 5, the TV page is 1,374 px. T8 5, the Reto end is a text bar. T9 7, 133 phone targets are under 44 px. T10 8, one global sample badge covers the automatic cards.
- Globo 65. G1 7, the globe is large and lit, and the search bar still crosses the top of the disc. G2 7, land colours are quieter; the graticule is faint. G3 5, drag still stops dead, frames average 22 ms, p95 33 ms. G4 6, the fact card still uses the sample amber. G5 8, a TV no longer scrolls (1,080 px) and the phone sheet works. G6 6, the buttons are one pill, and the search sits on the globe. G7 5, the game is plain. G8 7, night has a blue halo; the stars are sparse. G9 6, 18 targets are under 44 px. G10 8, the sample ribbon is easy to miss in the card.
- Errors: none. Under 24 px: 0. Contrast failures: 0. Globe p95: 33 ms.

**Top 3 changes:**

1. On a TV the globe fills the left side and the page no longer scrolls.
2. At night the globe has a blue halo and a few stars.
3. The long footer is now "Acerca de este boceto". The yellow sample ribbon stays.

**Top 3 open issues:**

1. Tabla still scrolls on a TV (1,374 px).
2. The globe's search bar sits on top of the disc.
3. Phone tiles are still small and have no names.

**Needs Victor:**

- Should the element card dock on a 1024 px tablet? Today it docks only from 1180 px.
- Palestina's name, and the Georgia Wikipedia link, stay as they are until you say otherwise.
- This run will not add new facts, a finer map, or live AI.

## Iterations

- **27 sep 2026, 15:40, Globo, hero globe.** Globo 55 → 65. The globe is the big object on a TV, with light from the upper left, a shadow, a night halo, and quieter land colours. The page fits in 1,080 px. The search bar still crosses the top of the disc.
- **27 sep 2026, 15:31, Tabla, palette and tiles.** Tabla 52 → 63. New family colours in both themes, a pill search, rounder tiles, and a shorter phone header. Dark contrast failures went from 5 to 0. The TV page is still 1,374 px tall.
- **27 sep 2026, 15:12, both apps, tier 0.** Globo 52 → 55, Tabla stays 52. Added the document head, a real phone viewport, and design tokens. On a phone the globe's sheet opens in three steps.
- **27 sep 2026, 15:05, both apps, setup.** Scores Tabla 52, Globo 52. Added the safety check, the before pictures, and the work list. No pixels in the apps changed.

## Posibles errores para revisar

- No new factual errors spotted. Already waiting on you, from the dossiers: the 15 hand-written country lines are unreviewed, and Palestina's name plus the Georgia Wikipedia slug are your call.

## Parking lot

- Empty.
