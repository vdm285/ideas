# Decisions

1. 2026-09-27 14:40 Mexico City — both — Document mode is reported and becomes a hard fail only after Tier 0 (`ENFORCE_STANDARDS` in `polish/tools/check.mjs`). The untouched sketches are quirks mode on purpose. Undo: set the flag to true.
2. 2026-09-27 14:50 Mexico City — both — "Hidrógeno" is required in Tabla and "Modo niños" in Globo. Undo: require both strings in each file.
3. 2026-09-27 14:50 Mexico City — both — A favicon the page never asked for is not an app error. The local http check answers `/favicon.ico` with 204. Undo: remove that response and the favicon ignore.
4. 2026-09-27 14:50 Mexico City — both — Horizontal overflow fails when an element crosses the viewport. `scrollWidth` versus `innerWidth` is still printed. A vertical scrollbar alone does not fail. Undo: fail on `scrollWidth > innerWidth` alone.
5. 2026-09-27 14:50 Mexico City — globo — The phone sheet's three states are required only when the page is really under 900 px. With no viewport meta, mobile Edge lays the sketch out at 980 px and the sheet stays off. That is the Tier 0 bug, noted, not a false red. Undo: always click `#handle`.
6. 2026-09-27 14:50 Mexico City — both — The short token scan applies to text files. JPEG bytes can contain those three characters by chance. Longer tokens are scanned in every staged file. Undo: scan every byte of the shots.
7. 2026-09-27 14:40 Mexico City — both — `core.autocrlf` is true for this repo. The existing git name and email were already set, so they were left as they are. Undo: `git config --unset core.autocrlf`.
8. 2026-09-27 14:57 Mexico City — tabla — At 1024×768 the card stays a sheet (the dock starts at 1180). Tier 1b will decide whether the tablet should dock. Undo: change the 1180 px breakpoint.
9. 2026-09-27 15:12 Mexico City — both — Tier 0 adds the document head and declares spacing, type, and motion tokens without using them, so the colours stay put. Globo's font stylesheet uses the same non-blocking trick as Tabla. Undo: revert commit of iteration 1.
10. 2026-09-27 15:12 Mexico City — both — A quick check must not rewrite the saved measurements, or a light-only run would erase the dark-mode contrast count. Undo: let every run write `polish/metrics.json`.
11. 2026-09-27 15:31 Mexico City — tabla — The atomic number is at 70% strength by day and full strength at night, because 70% failed contrast on the dark glass. Undo: set `.cell .z` opacity back to .7 in both themes.
