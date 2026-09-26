# Globo Curioso (working name): idea dossier

Updated: 2026-09-25. Owner: Victor. Status: **idea, not started**. Written by Claude (senior) for Victor
and for any AI that picks this up later. Plain language; sources carry dates.

Files in this folder:
- `DOSSIER.md`: this file (the idea, prior art, options, MVP, risks, effort, interview).
- `AGENTS.md`: DRAFT briefing for AI agents, in ListoLista's style.
- `sketch.html`: a clickable concept sketch (d3 globe, 4 sample countries, Modo niños). It is a
  feel-the-idea toy, not a product. All texts in it are samples.

---

## 1. The idea in Victor's words

(2026-09-25, lightly condensed.) An interactive world globe **for kids and adults**. You spin it,
zoom, and **tap any country, even without knowing its name**, and get layered views:
**history, gastronomy, culture, travel, and today's news**. The news is explained with its
historical and cultural context, "connecting the dots", in the most unbiased way possible.
Ideally it is built on Google Earth or on an open-source Earth viewer.

The same design rules as all his projects apply: zero-click start, few clear choices,
pay-for-what-you-use loading, no accounts, simple default with opt-in power features, the
Windows-Notepad benchmark (instant, plain), zero running cost, Spanish first for Mexican users,
learning/portfolio/open-source stage.

---

## 2. What already exists (prior art)

Checked 2026-09-25. Nobody combines all the layers in one tap, for kids and adults, in Spanish,
for free. Each piece exists somewhere.

| What | What it does well | What it lacks for us | Source (date) |
|---|---|---|---|
| **Google Earth + Voyager** | Real satellite globe; curated guided "stories" and quizzes, used in schools | No per-country layers in one tap; no news; cannot be embedded in our page; Google-controlled | google.com/earth/education (accessed 2026-09-25); Google Earth 2026 roadmap focuses on data import (KML/GeoJSON) and Gemini features (Google Earth blog, early 2026) |
| **Radio Garden** | Proof that "spin a globe, tap a dot" is a joyful interface (40,000+ radio stations, 2024) | One layer only (radio) | en.wikipedia.org/wiki/Radio_Garden (accessed 2026-09-25) |
| **TasteAtlas** | Food map of the world: ~10,000+ dishes with origin stories; founded 2018 | Food only; rankings and ads; not for kids | tasteatlas.com; Wikipedia "TasteAtlas" (accessed 2026-09-25) |
| **Ground News** | Shows who covers a story, bias mix per story, "Blindspot" feed | Bias ratings are averages of AllSides, Ad Fontes and MBFC (US left-right lens); paid tiers; no history context; not for kids | ground.news/rating-system; StationX review (Sep 2026) |
| **Particle** | AI app that summarises news from many outlets; "opposite sides" view; Q&A | Commercial app, US focus, no map, no history layer | TechCrunch (2024-06-11); Wisp review (2026) |
| **AllSides** | Left/centre/right side-by-side headlines | Ratings licensed CC BY-NC 4.0 (non-commercial only); US-centric | allsides.com bias-ratings licence page (accessed 2026-09-25) |
| **AR / talking globes for kids** (Shifu Orboot, LeapFrog LeapGlobe, talking-pen globes) | Kids love tapping a country and hearing facts about animals, food, landmarks | Paid hardware, fixed content, no news, often English only | 2026 buying guides (MuseumLink, June 2026; MomJunction 2026) |
| **Open-source news globes** (WorldMonitor, NewsMap, news-globe) | Globe + news per country; WorldMonitor uses globe.gl + deck.gl and AI summaries via cloud or local Ollama | Built for analysts (dense dashboards), not families; no culture/food/history; WorldMonitor is AGPL-3.0 | github.com/koala73/worldmonitor, github.com/RubenNunez/newsmap (accessed 2026-09-25) |
| **Vikidia (es)** | Free Spanish encyclopedia written for ages 8-13 (since 2008); CC BY-SA 3.0 | An encyclopedia, not a globe; coverage is uneven | es.vikidia.org (accessed 2026-09-25) |
| **Wikipedia current events** (en: Portal:Current events; es: Portal:Actualidad) | Daily, neutral-point-of-view summaries with sources; free licence | Short bullet lines, no "why"; uneven by country | es.wikipedia.org/wiki/Portal:Actualidad (accessed 2026-09-25) |
| **Wikinews** | Was the free, neutral news wiki | **Closed**: announced 2026-03-30, read-only since 2026-05-04 | heise.de; Wikipedia Signpost 2026-03-31 |

**What we would do differently**
1. **All layers behind one tap**: Historia, Comida, Cultura (and later Viajes) and Hoy on the same card.
2. **Same globe for kids and adults**: every text exists in two versions; one switch changes them.
3. **News always comes with a thread to the past** ("Uniendo los puntos": Antes → Hoy) and with
   labelled perspectives ("Gobierno de Egipto dice…", "Gobierno de Etiopía dice…"), plus
   "Lo que aún no se sabe".
4. **Spanish first, written for Mexico** (jitomate, platicar), English later.
5. **Free, no account, no ads, open source, static**: nothing to pay for per visitor.

---

## 3. How it could work

### 3.1 The globe engine: three options

Versions and licences checked on npm 2026-09-25.

| Option | Engine | Look and weight | Cost / accounts | Verdict |
|---|---|---|---|---|
| **A. School-globe atlas (recommended)** | **d3-geo** orthographic (d3 7.9.0, ISC) + **Natural Earth** countries via world-atlas 2.0.2 (ISC; data public domain) | Clean illustrated globe, like a classroom globe. The 1:110m country file is 108 KB (39 KB compressed, 177 shapes). Runs on cheap Android phones. This is what `sketch.html` uses. | $0; no keys; static hosting (GitHub Pages or Cloudflare Pages) | Best fit for Notepad benchmark and zero cost. Load the finer 1:50m map only when the user zooms in (pay for what you use). |
| **B. Pretty 3D globe** | **globe.gl** 2.46.2 (MIT, three.js/WebGL) or **MapLibre GL JS** 6.11.2 (BSD-3; globe view since v5.0, Jan 2025) | Shaded 3D Earth with texture, atmosphere, smooth zoom to cities (MapLibre). Heavier download and battery use; MapLibre needs map tiles for street-level zoom. | $0 if we ship a small public-domain Earth texture and host tiles ourselves (to verify: Protomaps-style single-file tiles on static hosting) | Good "opt-in" upgrade later (a "vista 3D" switch). |
| **C. Real Earth (Google-Earth-like)** | **CesiumJS** 1.145.0 (Apache 2.0) with Cesium ion or **Google Photorealistic 3D Tiles** | Satellite and 3D cities, closest to Google Earth | Needs accounts and API keys. Google 3D Tiles is an "Enterprise" SKU with about 1,000 free sessions/month since the March 2025 pricing change (developers.google.com Map Tiles billing page; Woosmap 2026 summary). Cesium ion free tier ≈ 5 GB storage + 100 GB streaming/month (third-party overview, 2025-07-14; verify on cesium.com). Heavy on phones. | Breaks "no accounts" and "zero running cost" at any real scale. Park it. |

**About Google Earth itself:** our page cannot embed Google Earth (the old Google Earth browser
API was retired years ago; from memory, not re-checked today). The zero-cost bridge is a
**"Ver en Google Earth"** link per country that opens Google Earth at that spot (URL format to verify).
Satellite fans get their view; we stay light and free.

### 3.2 Where the texts come from (the real work)

**Evergreen layers (Historia, Comida, Cultura; later Viajes)**, built once, refreshed a few times a year:
1. A script on the Mac downloads, per country, the Spanish Wikipedia article sections, the Vikidia
   page (kid level) and a few Wikidata facts (capital, languages, population). It sends a proper
   User-Agent with contact info and runs slowly. Wikimedia started new API rate limits in 2026:
   about 10 requests/min for unidentified clients vs 200/min with a compliant User-Agent
   (mediawiki.org "Wikimedia APIs/Rate limits", updated 2026-06-03).
2. The **local junior (Qwen3.6-35B)** drafts two versions (adults ~80 words, kids ~50 words) **only
   from that source text**, and marks which source paragraph backs each sentence.
3. Automatic checks: length, every number appears in the source, kid version passes a
   word list and sentence-length check, Mexican Spanish style list.
4. The **cloud senior** reviews all "sensitive" countries (wars, disputed territories) and a random
   10% of the rest. Victor spot-checks.
5. Output: one small JSON file per country (2-4 KB), loaded only when that country is tapped.

**Licence consequence:** texts adapted from Wikipedia and Vikidia must be shared under
**CC BY-SA** with attribution. That fits Victor's open-source stance, but it means the texts can
never become closed content.

**Hoy (news with context)**, a weekly digest, not live news:
1. Sunday job on the Mac: per country, query **GDELT DOC 2.0** (free; JSON; open CORS; filters by
   source country and language; about 1 request per 5 seconds; up to 250 articles per query) and
   read Wikipedia's current-events pages.
   GDELT allows any use, even commercial, if we cite GDELT and link to it (gdeltproject.org/about.html, accessed 2026-09-25).
2. The junior clusters the week's stories, picks one topic per country, and drafts the card:
   **Qué pasa · Uniendo los puntos (Antes → Hoy) · Distintas miradas (each labelled with who says it) ·
   Lo que aún no se sabe · Enlaces**.
3. **Balance rules checked by script:** at least 3 outlets from at least 2 countries (including a local
   one and a foreign one); every opinion attributed; loaded words ("régimen", "terrorista", "héroe") only
   inside attributed quotes; no casualty numbers in kid mode.
4. Senior reviews conflict topics; the card shows "Resumen semanal, revisado el <fecha>".
5. We never copy articles: only our own summary, the headline and a link.

### 3.3 Local AI vs cloud AI: who does what

| Role | Does | Why |
|---|---|---|
| **Local junior** (Qwen3.6-35B on the Mac) | Bulk drafting, translation, kid versions, first-pass checks, weekly news clustering | Free and private. Measured writing speed on this Mac is ~42 tokens/s (local-ai benchmarks, 2026-09-23). All ~1,200 evergreen texts (200 countries × 3 layers × 2 levels) ≈ one overnight run. A weekly Hoy for 20 countries takes minutes. |
| **Cloud senior** (Claude today, swappable) | Style guide, balance rules, review of sensitive topics, random audits, hard rewrites | Better judgement on contested history; runs on the existing subscription |
| **In the page** | Nothing at first. Maybe later an opt-in "Pregúntale al globo" that only rephrases our reviewed text. | The Mac serves localhost only (no remote access), so it cannot answer visitors. Chrome's built-in Gemini Nano runs only on desktop Chrome and needs ~22 GB free disk and 16 GB RAM; no Android or iOS (developer.chrome.com Prompt API, updated 2026-08-26). Most Mexican users are on phones, so this is out for now. |

So all AI work happens **before publishing**. Visitors get a static site, and each visit costs $0.

### 3.4 Kid mode (Modo niños)
- Same globe, bigger text, the kid version of each card, a "¿Sabías que…?" fact.
- Reading level aimed at ages 8-12 (Vikidia's audience is 8-13).
- Hoy for kids: gentle wording, no graphic detail, a "Para platicar en familia" question.
  Whether Hoy shows at all in kid mode is an interview question.
- Later, a free option: "Léemelo" with the browser's built-in speech voice, for kids who can't read yet.

---

## 4. MVP / checkpoint 1

**The smallest version worth using: "Globo de la casa".** Spin and tap any country and see its
name in Spanish. For 20 countries, read Historia, Comida and Cultura in an adult and a kid version,
with sources. Static site, $0, no account.

| # | Checkpoint | Who uses it | Goal | Status |
|---|---|---|---|---|
| 0 | Sketch | Victor | Feel the idea (`sketch.html`), answer the interview below | ✅ built 2026-09-25 |
| 1 | **Globo de la casa** | Victor + family | Globe (option A) + 20 countries × 3 layers × 2 levels, Modo niños, source links, home-screen icon | 🔜 after the interview |
| 2 | Hoy piloto | Family + a few friends | Weekly news card with "Uniendo los puntos" for 5 countries, for 4 weeks. Does the format feel fair and useful? | 💤 |
| 3 | Todo el mundo | Friends and family, maybe a teacher | All countries, finer map when zoomed, offline, Viajes layer | 💤 |
| 4 | Público, open source | Anyone | English, contribution rules, "report an error" without accounts | 💤 |

**Checkpoint 1 is done when:**
- [ ] It opens straight onto a spinning globe in under 2 seconds on Victor's Android phone.
- [ ] Tapping any country shows its Spanish name; the 20 chosen countries show 3 layers.
- [ ] Modo niños switches every text; a kid in the family can use it alone.
- [ ] Every text shows its source link and "revisado el <fecha>".
- [ ] Victor reads 10 random cards and trusts them.
- [ ] Hosting costs $0 and needs no login for visitors.

---

## 5. Risks and honest caveats

1. **"Unbiased" cannot be promised; "transparent and balanced" can.** Choosing which stories and which
   perspectives appear is already an editorial choice. We need a short written **editorial policy**
   that Victor owns: attributed perspectives, sources shown, uncertainty stated, same rules for
   every country.
2. **Maps take sides.** Borders and names are political (Malvinas/Falklands, Western Sahara,
   Kosovo, Taiwan, Palestine, Crimea, Kashmir). Natural Earth draws **de facto** control by default
   and marks disputes. It also offers point-of-view versions for ~31 countries
   (naturalearthdata.com, accessed 2026-09-25). The sketch flags 7 disputed shapes with a neutral note.
3. **AI gets facts wrong**, and kids believe what they read. Mitigation: generate only from fetched
   sources, check numbers automatically, review by a human and the senior, show the review date,
   and add an easy "reportar un error" path.
4. **News rights.** We can't copy articles, only summarise and link. GDELT requires a citation.
   AllSides ratings are non-commercial only (CC BY-NC 4.0). There is no free,
   ready-made neutral news source: Wikinews closed in May 2026.
5. **Kids and hard news** (wars, disasters). Hoy may need to be hidden or gentle in kid mode, or
   "only with an adult".
6. **Freshness vs zero cost.** A weekly digest depends on Victor's Mac running on Sunday; a missed
   week means an old "Hoy". The date must be visible.
7. **Review is the bottleneck, not writing.** The junior can draft 1,200 texts overnight; checking
   them takes human hours. Start with 20 countries.
8. **Tiny countries** are hard to tap, and the light 1:110m map has 177 shapes and omits many small
   island states. We need search (in the sketch) and the 1:50m map when zoomed.
9. **Heavy 3D engines hurt cheap phones.** Keep the default light (option A); 3D is opt-in.
10. **Overlap with giants** (Google Earth, Wikipedia). Our reason to exist must stay sharp: Spanish,
    family, all layers connected, free.

---

## 6. Effort estimate

Rough, in AI-assisted working sessions (a session ≈ one focused senior sitting of 1-3 hours).

| Piece | Senior | Local junior | Victor |
|---|---|---|---|
| Interview + editorial policy draft | 1 session | – | 30-45 min |
| Checkpoint 1 app (grow the sketch: finer map on zoom, JSON per country, PWA) | 1-2 sessions | small chores with tests | 20 min phone test |
| Checkpoint 1 content pipeline + 20 countries (120 texts) | 1-2 sessions | ~30-60 min of drafting | 1-2 h reading |
| Checkpoint 2 Hoy pilot (weekly job + balance checks) | 2-3 sessions | ~15 min per week | 20-30 min per week for 4 weeks |
| Checkpoint 3 all countries (~1,200 texts) | 2 sessions of review | one overnight run (est. 2-8 h) | 3-5 h spot checks |
| **Running cost** | $0 (static hosting, free data, AI on existing Mac/subscription) | | |

---

## 7. Interview questions for Victor

Answer in any order; defaults in brackets are what I'd do if you don't mind either way.

1. **Who is the first user?** You and your wife, children in the family (what ages?), a classroom?
   This sets the kid reading level. [ages 8-12]
2. **What does "unbiased" mean to you?** (a) a neutral voice with only facts, (b) each side in its
   own words, clearly labelled, or (c) both? On a contested topic, who has the final word? [c; you]
3. **How fresh must "Hoy" be?** Live, daily, or a weekly reviewed digest? Is it OK if Hoy starts as
   a 5-country pilot after the evergreen layers? [weekly; pilot at checkpoint 2]
4. **Look:** clean school-globe style (light, any phone, like the sketch) or satellite Google-Earth
   style (heavier, may need accounts/costs)? Would a "Ver en Google Earth" button be enough for
   satellite views? [school globe + button]
5. **Which 20 countries first?** [Mexico, Latin America, the 4 samples, and places your family has ties to]
6. **Kids and news:** in Modo niños, hide Hoy, show a gentle version, or show it only with an adult?
   [gentle version]
7. **Depth:** 30-second cards only, or also "leer más" links to Wikipedia/Vikidia? Want "Léemelo"
   (read aloud) for small kids? [both, read-aloud later]
8. **Disputed borders and names:** Natural Earth's de facto map with a "disputado" note, or
   Mexico's official view? For example, "Malvinas" or "Falkland" as the main name?
   [de facto map + note; name the way Spanish speakers say it, other name in brackets]
9. **Your weekly time:** 0, 15 or 30 minutes to review Hoy? This decides whether Hoy is feasible.
10. **Name and licence:** keep "Globo Curioso"? Open source from day one (MIT for code, CC BY-SA
    for texts, required by Wikipedia/Vikidia)? [yes; yes]

---

## Sources (accessed 2026-09-25 unless dated)
- CesiumJS (Apache 2.0): cesium.com/platform/cesiumjs; github.com/CesiumGS/cesium.
- MapLibre globe view (GL JS v5.0, Jan 2025): maplibre.org/roadmap/maplibre-gl-js/globe-view; newsletter 2026-09-02.
- globe.gl / three-globe (MIT): github.com/vasturiano/globe.gl.
- npm registry versions (2026-09-25): cesium 1.145.0, maplibre-gl 6.11.2, globe.gl 2.46.2, deck.gl 9.4.0, d3 7.9.0, world-atlas 2.0.2.
- Natural Earth public domain + disputed-boundaries policy + point-of-view variants: naturalearthdata.com.
- Google Maps Platform billing (March 2025 per-SKU free caps; 3D Tiles = Enterprise): developers.google.com/maps/documentation/tile/usage-and-billing; woosmap.com (2026).
- Google Earth 2026 roadmap: medium.com/google-earth (2026).
- GDELT terms: gdeltproject.org/about.html. DOC 2.0 API: blog.gdeltproject.org/gdelt-doc-2-0-api-debuts.
- Wikimedia API rate limits (new in 2026; page updated 2026-06-03): mediawiki.org/wiki/Wikimedia_APIs/Rate_limits.
- Wikinews closure (announced 2026-03-30, read-only 2026-05-04): heise.de; en.wikinews.org.
- Vikidia (es, ages 8-13, CC BY-SA 3.0): es.vikidia.org.
- Ground News rating system: ground.news/rating-system; StationX review (Sep 2026).
- AllSides ratings licence (CC BY-NC 4.0): allsides.com/tools-services/bias-ratings-license-api.
- Particle: techcrunch.com (2024-06-11); wisp.news review (2026).
- TasteAtlas, Radio Garden: Wikipedia articles.
- WorldMonitor (AGPL-3.0): github.com/koala73/worldmonitor.
- Chrome Prompt API requirements (updated 2026-08-26): developer.chrome.com/docs/ai/prompt-api.
- Local model speed: ~/local-ai/benchmarks/2026-09-23-qwen36-35b-a3b.md and docs/LOG.md.
