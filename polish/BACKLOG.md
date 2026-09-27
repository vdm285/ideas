# Backlog

Ranked for the polish loop. Apps alternate after the opening order. A red check jumps the queue.

## Now

1. **Tier 0, both apps.** Doctype, `lang="es"`, charset first, viewport, theme-color, description, inline SVG favicon. Load Globo's fonts without blocking, the way Tabla already does. Add the token block without changing the look. Then turn on the standards check. Globo's phone sheet must show its three states once the viewport is real. Acceptance: standards mode, charset UTF-8, lang es, Globo phone `innerWidth` about 390, sheet mini → peek → open, both apps still green.
2. **Tabla 1a — palette, tiles, header.** Even lightness for 10 families and 4 states, in both themes. Transition metals stay the calmest. Tile text at 4.5:1. Families stay distinct under deuteranopia. Tiles get an 8 px radius, a top highlight, a heavy symbol, a 2 px hover lift, and a glow when selected. Filtering fades the rest to 15%. The header becomes a compact brand row and a pill search, with Reto as the one strong button. On a phone the table starts much higher. Acceptance: dark contrast failures go down, and the phone shot shows the table in the top half.
3. **Globo 1a — light and the hero globe.** Ocean lit from the upper left, limb darkening, a soft highlight, an atmosphere halo, a contact shadow in light mode, and a sparse static starfield in dark mode. New muted land colours. Fine coasts and a graticule that fades at the limb. On a TV the globe fills the left ~60% (at least 850 px at 1920×1080) with the card docked and no page scroll. One pill toolbar. The footer folds into Acerca de. The phone globe is full-bleed and the sheet has a handle, a 20 px radius, and safe areas. Acceptance: TV page height ≤ 1080, and the TV shot shows a globe with a halo.
4. **Tabla 1b — card, Bohr, TV fit.** Hero header, stat strip from table data only, segmented level control, calmer story measure, amber "Con un adulto", quiz cards that mark a hit and shake a miss. Bohr nucleus and electrons as lit spheres; the fill pops, and stays still under reduced motion. The whole table and the docked card fit at 1920×1080. Acceptance: TV page height ≤ 1080 and the card shot shows the stat strip.
5. **Globo 1b — motion, card, flags.** Drag inertia, zoom-scaled sensitivity, a hop in the fly-to, spin that eases. Card name in Alegreya 800, a fact card that is not the sample amber, segmented tabs, a drop cap on adult Historia. One flag image per country from flag-icons 7.5.0, hidden on error, with credit in the footer. Acceptance: a drag coasts, and a Windows phone shows a flag image.

## Later (alternate apps, lowest score first)

- **Tabla.** Finger preview on phones. Full-width rotated table. Tile-to-card move. Reto HUD, stars, short confetti. Attract caption that moves. `?kiosk=1`. Más closes on an outside tap. Arrow keys between tiles.
- **Globo.** Forgiving taps near a coast. Hoy as an Antes → Hoy thread with neutral quote cards. Game HUD, a pulse when right, an arc when wrong. Friendlier Modo niños. Styled search suggestions. A Spanish message if d3 fails to load.

## Flaws from the baseline shots

- Tabla, phone: the table starts after the logo, the badge, the search, and the rotation note.
- Tabla, dark: family tiles are muddy olive and brown. Five texts miss contrast.
- Tabla, TV: the page is 1,390 px tall, so it scrolls. The card is a long plain column.
- Tabla, Reto: the end is a text bar and ten dots.
- Globo, phone: no viewport, so the layout is 980 px wide and the sheet never appears.
- Globo, TV: the globe is a small disc, the page is 1,130 px tall, and there is no atmosphere.
- Globo, both themes: the "¿Sabías que…?" card uses the same amber as the sample ribbon.
- Globo, motion: drag stops dead. Frames average 22 ms, p95 33 ms.

## Needs Victor

- New country texts, the finer map, day and night shading, isotopes, 3D orbitals, live AI, globe sound, and a PWA. Not in this run.
- Whether the card should dock at 1024×768. Today it docks only from 1180 px.
- Palestina versus "Territorios Palestinos", and the Georgia Wikipedia slug. Already open in the dossier. Not changed here.
