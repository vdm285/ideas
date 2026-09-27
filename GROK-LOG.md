# Tabla Viva and Globo Curioso

**Status:** working. Last push 27 sep 2026, 16:57 (Mexico City). Iteration 14. Both apps pass the check.

**How to see it:**

1. Any browser or phone: https://raw.githack.com/vdm285/ideas/grok/polish-2026-09-27/interactive-science/sketch.html and https://raw.githack.com/vdm285/ideas/grok/polish-2026-09-27/interactive-globe/sketch.html. If a link is blocked, use the ZIP.
2. All changes: https://github.com/vdm285/ideas/compare/main...grok/polish-2026-09-27
3. ZIP: https://github.com/vdm285/ideas/archive/refs/heads/grok/polish-2026-09-27.zip. Unzip it and double-click either `sketch.html`. On this laptop the folder is `C:\Users\Victor\grok-work\ideas`.
4. Before and after pictures: `polish/shots/before/` vs `polish/shots/latest/`.

**Scoreboard:** Tabla 68. Globo 73.

- Tabla 68. T1 6, the phone table is higher but the rotation note still leads. T2 7, contrast failures are 0; alkali and noble gases are both pink. T3 7, phone tiles still have no names until you press. T4 6, card type is small from across a room. T5 7, the electrons are lit spheres; the quiz still sits below the fold on a TV. T6 7, pressing a phone tile shows its name; there is still no move from tile to card. T7 8, a TV no longer scrolls (1,080 px). T8 5, the Reto end is a text bar. T9 7, 133 phone targets are under 44 px. T10 8, one global sample badge covers the automatic cards.
- Globo 73. G1 7, the search bar still crosses the top of the disc. G2 7, the graticule is faint. G3 7, a flight pulls back and Giro eases; slow frames are still about 33 ms. G4 9, adult Historia opens with a large first letter; the neighbour chips are still plain. G5 8, a TV no longer scrolls and the phone sheet works. G6 6, the search sits on the globe. G7 6, Modo niños fits on a TV; the game is still plain. G8 7, night has a blue halo. G9 6, 18 targets are under 44 px. G10 8, the sample ribbon is easy to miss in the card.
- Errors: none. Under 24 px: 0. Contrast failures: 0. TV page height: 1,080 px for both. Globe p95: 33 ms.

**Top 3 changes:**

1. Adult Historia opens with a large first letter. Modo niños keeps the paragraph plain.
2. On an element card, a blue thumb slides between 8 años, 12 años, and 15 o más.
3. Flying to a country pulls the globe back, then settles. Turning Giro off lets it slow down.

**Top 3 open issues:**

1. The globe's search bar still sits on top of the disc.
2. Phone tiles are still small, and the name shows only while you press.
3. Neighbour chips are still plain text, and on a TV the rest of an element card sits below the fold.

**Needs Victor:**

- Should the element card dock on a 1024 px tablet? Today it docks only from 1180 px.
- Palestina's name, and the Georgia Wikipedia link, stay as they are until you say otherwise.
- This run will not add new facts, a finer map, or live AI.

## Iterations

- **27 sep 2026, 16:57, Globo, drop cap.** Globo stays 73. Adult Historia opens with a large first letter. Comida, Cultura, and Modo niños stay plain. The words are the same.
- **27 sep 2026, 16:52, Tabla, electrons.** Tabla stays 68. Each electron is a shaded sphere, and in the dark it glows. The Bohr drawing still takes about 16 ms a frame. The quiz is still below the fold, so the card score stays 7.
- **27 sep 2026, 16:47, Globo, tabs.** Globo 71 → 73. The four tabs are a segmented control with a sliding thumb, and the text fades in 150 ms. Reduced motion skips the fade. Historia still has no drop cap.
- **27 sep 2026, 16:40, Tabla, phone preview.** Tabla 67 → 68. Pressing a tile shows its symbol and name in a bubble. During Reto the name stays hidden. The tiles are still nameless at rest.
- **27 sep 2026, 16:33, Globo, Modo niños.** G7 5 → 6. Globo stays 71. On a television the controls stay on one line and clear the country chips. The game is still plain.
- **27 sep 2026, 16:27, Tabla, level switch.** Tabla stays 67. A blue thumb slides between 8 años, 12 años, and 15 o más. The quiz is still below the fold, so the card score stays 7.
- **27 sep 2026, 16:21, Globo, fly-to hop.** Globo 69 → 71. A flight pulls back about 15% in the middle, then settles. Giro speeds up and slows down. Reduced motion still jumps. Fresh pictures are in `polish/shots/latest/`. In Modo niños the TV controls collide.
- **27 sep 2026, 16:08, Globo, fact card.** Globo 68 → 69. The "¿Sabías que…?" card is blue by day and by night. The yellow ribbon, the "(ejemplo)" line, and the "tema de ejemplo" tag stay yellow.
- **27 sep 2026, 16:01, Globo, flags.** Globo 67 → 68. Each country card shows its flag as an image, including on Windows, and hides it if the image fails. The credit is in Acerca de este boceto.
- **27 sep 2026, 15:54, Globo, drag coast.** Globo 65 → 67. After you let go, the globe keeps turning and slows to a stop. Reduced motion skips the coast. The flight to a country does not hop yet.
- **27 sep 2026, 15:50, Tabla, card and TV fit.** Tabla 63 → 67. The table and the card fit on a 1,080 px screen. The card leads with a stat strip. A correct quiz answer turns green with a check. The experiment's safety line is an amber note.
- **27 sep 2026, 15:40, Globo, hero globe.** Globo 55 → 65. The globe fills the left of a TV, with a night halo. The page fits in 1,080 px. The search bar still crosses the disc.
- **27 sep 2026, 15:31, Tabla, palette and tiles.** Tabla 52 → 63. New family colours, a pill search, and rounder tiles. Dark contrast failures went from 5 to 0.
- **27 sep 2026, 15:12, both apps, tier 0.** Globo 52 → 55. Real phone layout, Spanish language, standards mode. The globe's sheet opens in three steps.
- **27 sep 2026, 15:05, both apps, setup.** Scores Tabla 52, Globo 52. Added the safety check, the before pictures, and the work list.

## Posibles errores para revisar

- No new factual errors spotted. Already waiting on you, from the dossiers: the 15 hand-written country lines are unreviewed, and Palestina's name plus the Georgia Wikipedia slug are your call.

## Parking lot

- Empty.
