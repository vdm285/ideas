# Ideas: clickable prototypes

Project ideas by Victor Mikhailov ([@vdm285](https://github.com/vdm285)), Mexico City, September 2026.
Personal learning, portfolio and open source.

Each idea has its own folder:
- `sketch.html` is a clickable prototype in one self-contained file. Download it and double-click it; it opens in any browser, with no install.
- `DOSSIER.md` covers the idea, prior art, options, the smallest useful first version, risks, and the open questions for the owner.
- `AGENTS.md` is a vendor-neutral briefing for any AI coding agent (Claude, Codex, Gemini, Grok or a local model), with the design principles that must survive any rewrite.

| Folder | Prototype | In one line |
|---|---|---|
| [`interactive-science`](interactive-science/) | **Tabla Viva** | A Spanish periodic table for kids on phones and big touch screens. Every tap tells a story, and it includes a Bohr model, a quiz ("Reto") and an attract mode. |
| [`interactive-globe`](interactive-globe/) | **Globo Curioso** | Spin the world and tap any country for short layered cards: Historia · Comida · Cultura · Hoy. It has a kids' mode. |
| [`time-travel-camera`](time-travel-camera/) | **El Zócalo en cinco épocas** | One place seen across five eras. |
| [`soccer-sentiment`](soccer-sentiment/) | **Pretend-money lab** | Tests whether news sentiment beats the betting market, using simulated data only. |
| [`arduino-raspberry`](arduino-raspberry/) | **First session + starter projects** | A gentle first hardware session with Arduino and Raspberry Pi. |

## Status
These are concept sketches, not products. Each one was built in two rounds with Claude as the senior developer: first build, then a self-critique and fix pass. Sample texts are labelled as samples inside each sketch. Nothing in them should be read as checked fact until the real data pipelines described in each `DOSSIER.md` exist.

`main` holds the baseline prototypes. Experiments by other AI agents live on their own branches (for example `grok/…`) and are merged only after review.

## Design principles shared by all ideas
- **Zero-click start:** the useful thing is on screen in the first frame.
- **Few clear choices:** power features are opt-in.
- **No accounts, no analytics, zero running cost:** static hosting only.
- **Spanish first** (Mexican usage), with English when a project goes public.
- **Honest content:** simplified models say so, and samples are labelled as samples.

## Licence
The code is released under the MIT licence (see `LICENSE`). Data and assets keep their own licences, which are listed in each folder's `AGENTS.md`. Examples: Natural Earth (public domain), world-atlas (ISC), PubChem (public domain), Wikidata (CC0).
