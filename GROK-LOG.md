# Tabla Viva and Globo Curioso

**Status:** finished by Claude on 2026-09-28 after Grok hit its weekly limit. Grok's run stopped at iteration 30 (last push 27 sep 2026, 18:38 Mexico City), before its wrap-up. Claude (senior dev) reviewed the branch and made the small fixes below on branch `claude/grok-fixes`. Both apps pass Grok's check run with Chrome (all but its branch-name test, which expects Grok's branch), plus a smoke test at phone, laptop and TV sizes in light and dark: no errors, no failed requests, no sideways scrolling. The frozen data is unchanged (content-lock hashes equal main's).

**How to see it:**

1. **Live (GitHub Pages, merged 2026-09-28):** https://vdm285.github.io/ideas/interactive-science/sketch.html and https://vdm285.github.io/ideas/interactive-globe/sketch.html. Grok's version as it stopped: https://raw.githack.com/vdm285/ideas/1d27207d041b9073452fe97cba449f1003c6e11d/interactive-globe/sketch.html (and interactive-science; Grok's last commit, its branch was deleted after the merge).
2. All changes vs the baseline: https://github.com/vdm285/ideas/compare/034ccf1...main (034ccf1 = main before Grok, after the 2026-09-28 email clean-up).
3. ZIP: https://github.com/vdm285/ideas/archive/refs/heads/main.zip. Unzip it and double-click either `sketch.html`.
4. Before and after pictures: `polish/shots/before/` vs `polish/shots/latest/` (Grok's last set; it misses Grok's last two commits and these fixes).

**Scores:** Grok's own: Tabla 52 → 72, Globo 52 → 80 (80 is final; a bullet that said 79 was stale). Independent design review before these fixes: Tabla 5 → 6.5, Globo 4.5 → 7 out of 10.

**Fixes by Claude (one commit each):**

- Tabla: tiles never overlap on short wide screens; the no-scroll fit is for TV-size screens only, laptops scroll (aca8ca7). Escape in the search box closes Más and the card again (be9926f). Arrow keys only move between tiles and never answer Reto; Up/Down follow the table as drawn (0a4a370). The Reto hit ring grows again and all confetti shows (fb1f356). The facts strip never splits a word and keeps "25 °C" together (e0e5bd6). The docked card shows "Más abajo ↓" while more is below (852d4e8).
- Globo: the flag credit says truthfully when flags download (56c021c). No flag on places the map marks as disputed (82d7341). Giro automático works on a tap under reduced motion (2700bea). Laptops get the 578 px globe back (cc16bf0). Map colours that tell neighbours apart (608ffb0). The selected tab stands out (64460c0). "Para platicar en familia" leaves the sample amber (2c63160).

**Still open (from the review, 2026-09-27):**

- Grok's check: add laptop sizes, the legend and Reto screens, keyboard tests, Chrome as well as Edge, and allow only jsdelivr's /npm/ path. Re-take `polish/shots/latest/`.
- Tabla: muddy dark-mode tiles (lanthanides, alkaline earths); tile names 9.6 px on TV; look-alike family colours; the tile-to-card animation aims at the name; doubled Reto end buttons.
- Globo: blank space and small text in the TV card; the TV globe is 776 px (brief: 850); labels for the phone's icon-only buttons; phone and tablet pages scroll into empty space.
- Honesty: say the "¿Sabías que…?" lines are unreviewed; ★ means both "full story" and "score"; show "isótopo más estable" in the strip; bring back the phone's "Toca cualquier elemento…" hint. Old bug, also on main: a `#constructor` link breaks Globo.

**Needs Victor:** nothing from this run. (Grok stopped at its weekly limit before the wrap-up; nothing was left unpushed. Grok's branch and the fixes branch were deleted after the 2026-09-28 merge; the history is in main.)

## Iterations

- **28 sep 2026, Claude, review fixes.** Grok stopped at its weekly limit, so Claude made the 13 small fixes the review asked for (listed at the top, one commit each). No new facts; the frozen data is unchanged; the check and a phone, laptop and TV smoke test pass in light and dark.
- **27 sep 2026, 18:38, Tabla, tile move.** T6 7 → 8. Tabla 71 → 72. The symbol travels from the tile to the card in about a third of a second. Reduced motion and Reto do not send it. The page still fits in 1,080 px. A slow globe frame was 35 ms.
- **27 sep 2026, 18:33, Globo, dock.** G6 8 → 9. Globo 79 → 80. On a television the country chips and the controls share one card under the globe, including in Modo niños. A side-by-side row was tried and put back, because it ran off a narrower screen. The page still fits in 1,080 px. The search stays above. A slow frame was 34 ms.
- **27 sep 2026, 18:26, Tabla, confetti.** T8 7 → 8. Tabla 70 → 71. A perfect round throws twelve pieces from the stars. They fade in under a second. Reduced motion does not throw them. The end words stay "¡10 de 10! Perfecto." Fresh pictures are in `polish/shots/latest/`. A slow globe frame was 34 ms.
- **27 sep 2026, 18:20, Globo, sample ribbon.** G10 8 → 9. Globo stays 79. On a television the sample line sits in the header at 16 px and does not cover the title, the switch, or the globe. The words are the same. The page still fits in 1,080 px. A slow frame was 36 ms.
- **27 sep 2026, 18:15, Tabla, phone symbols.** Tabla stays 70. On a narrow tile the symbol is 16 px, up from 13 px. Letra grande uses 18 px. The phone page stays 1,183 px. The name still appears only while you press.
- **27 sep 2026, 18:07, Globo, game.** G7 6 → 7. Globo 78 → 79. The question shows five dots. A right tap pulses green. A wrong tap shakes, and the globe turns to that country. The end card repeats the same words and adds stars. Reduced motion skips the pulse and the shake. Fresh pictures are in `polish/shots/latest/`. Modo niños is still the same layout, only larger.
- **27 sep 2026, 17:56, Tabla, story.** T4 6 → 7. Tabla 69 → 70. On a short wide screen the story is 20 px. Phones stay as they were. The page still fits in 1,080 px. A slow globe frame was 38 ms, inside the 25% band. From across a room, 20 px is still small.
- **27 sep 2026, 17:44, Globo, grid.** Globo 77 → 78. The latitude and longitude lines are stronger, and they still fade at the rim. They have no degree labels.
- **27 sep 2026, 17:39, Globo, Hoy thread.** Globo stays 77. Antes is a hollow dot and Hoy is a filled ink dot. The sample tag stays first. The words are the same. A slow frame was 40 ms, inside the 25% band.
- **27 sep 2026, 17:33, Tabla, arrow keys.** Tabla stays 69. Left and right move one element. Up and down move a row of 18. The search box still uses the arrows for the cursor. Moving the quiz above the Bohr was tried and put back, because it hid the drawing.
- **27 sep 2026, 17:26, Globo, controls.** Globo 76 → 77. The search, the country chips, and the controls sit clear of the globe, including in Modo niños. The globe is smaller. The page still fits in 1,080 px.
- **27 sep 2026, 17:20, Tabla, attract.** T8 6 → 7. Tabla stays 69. The exhibition caption shifts each cycle. Reduced motion leaves it still. Holding the logo for 3 seconds still exits. There is no confetti.
- **27 sep 2026, 17:15, Globo, search.** Globo 73 → 76. On a television the search sits above the globe. The page still fits in 1,080 px. The controls still touch the south rim.
- **27 sep 2026, 17:10, Tabla, Reto end.** Tabla 68 → 69. A perfect round shows three stars, a large "¡10 de 10! Perfecto.", and a blue "Otra ronda". The stars stay still. Attract mode is still plain.
- **27 sep 2026, 17:05, Globo, neighbour flags.** G9 6 → 7. Globo stays 73. Neighbour chips show a flag image and grew from 40 px to 44 px. Targets under 44 px went from 18 to 11.
- **27 sep 2026, 17:01, Tabla, phone note.** Tabla stays 68. The rotation note is one line: "Gira el teléfono: la tabla se ve como en tu libro." The phone page went from 1,208 px to 1,183 px.
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
