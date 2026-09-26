# Cámara del tiempo (time-travel camera): idea dossier

Status: **idea, not started** · Written 2026-09-25 by Claude (senior) for Victor · Working name only.
Companion files: `AGENTS.md` (DRAFT briefing), `sketch.html` (clickable storyboard of the Zócalo).
Sources were checked on 2026-09-25; each one shows its own date. "Accessed" means the page had no date.

---

## The idea in Victor's words

> A camera app: point your phone at a place; using geolocation, compass and AI it shows how that
> exact view looked in an era you choose (dinosaurs, Aztec/Tenochtitlan, medieval, industrial
> revolution...).

In one line: **stand somewhere, point your phone, pick an era, see that same view back then.**

---

## What already exists

The gesture "point your phone and see the past" is 15 years old. What nobody seems to combine yet:
**your exact spot and direction + many eras (including deep time) + an honest label of how sure we are.**

| # | What | Date | What it does | Gap we could fill |
|---|---|---|---|---|
| 1 | Museum of London **Streetmuseum** | launched 2010 ([PetaPixel, 2010-05-24](https://petapixel.com/2010/05/24/museum-of-london-releases-augmented-reality-app-for-historical-photos/)) | GPS takes you to a spot; old photos (from 1863) laid over the live camera. | Proves the gesture works. Only the photo era; one city; native app. |
| 2 | **IPN / CIDETEC app** for the Sacred Precinct of Tenochtitlan (Erick Huitrón Ramírez) | [Innovaspain, 2018-11-08](https://www.innovaspain.com/realidad-aumentada-recorrer-recinto-sagrado-mexico-tenochtitlan/); [El Heraldo, 2021-08-18](https://heraldodemexico.com.mx/nacional/2021/8/18/la-gran-tenochtitlan-en-realidad-virtual-360-gracias-esta-app-desarrollada-por-un-ingeniero-del-ipn-327285.html) | GPS + gyroscope; 14 Mexica buildings drawn in plain white at their real place and size in the Centro Histórico. | Closest local prior art. One era, untextured, install required; unclear if still available. |
| 3 | **A Portrait of Tenochtitlan** (Thomas Kole) + web 3D viewer | 2023, updated to 2025 ([project site](https://tenochtitlan.thomaskole.nl/), [viewer](https://retratodetenochtitlan.mx/), accessed 2026-09-25) | The most detailed open 3D reconstruction of the city in 1518; experts consulted (e.g. Michael E. Smith, Barbara Mundy); three.js viewer; **CC BY 4.0** but **"may not be used as input for AI"**; calls itself "an artist's impression". | Best open visual reference for our 1500 era. We can link to it or show it with credit, but must never feed it to an image AI. No "stand here and look" mode. |
| 4 | **Templo Mayor AR** (Google Play) and on-site VR tours | undated ([Play listing](https://play.google.com/store/apps/details?id=com.benitez.temploMayorAR), [GetYourGuide](https://www.getyourguide.com/mexico-city-l194/templo-mayor-tour-and-tenochtitlan-vr-experience-t1072593/), accessed 2026-09-25) | Marker-based model of the temple; paid headset tours at the ruins. | One building, one era; paid or marker-bound. |
| 5 | **Lithodomos** (Melbourne) | founded 2016 ([Digital Trends](https://digitaltrends.com/virtual-reality/lithodomos-vir), accessed 2026-09-25) | Archaeologists build VR/AR reconstructions of ancient sites (Rome, Athens, Jerusalem). | The accuracy benchmark: experts + sources. Paid; no Mexico. |
| 6 | **Google Earth historical Street View** | [TechCrunch, 2025-06-24](https://techcrunch.com/2025/06/24/google-brings-historical-street-view-imagery-to-google-earth) | Real old Street View photos and historical aerial imagery on phone and web. | Real photos only, so only the last decades. No reconstruction. |
| 7 | Generative "time travel photo" apps: **Time Camera**, **Chronoscapes** | 2026 ([timecam.app](https://timecam.app/en/), [Play listing](https://play.google.com/store/apps/details?id=com.polyhistor.chronoscape), accessed 2026-09-25) | Upload one photo, get it in another era (mostly selfies and costumes). Subscriptions after free credits. Time Camera warns that output "may contain fictional elements". | Shows demand. No location or compass, no sources, paywalls, novelty rather than history. |
| 8 | **Snapchat Imagine Lens** | Sept 2025 ([Social Media Today](https://www.socialmediatoday.com/news/snapchat-expands-access-to-generative-ai-imagine-lens/803571/), accessed 2026-09-25) | Rewrites a camera photo with a text prompt. | Generic; knows nothing about where you stand. |
| 9 | **8th Wall** (the main paid WebAR platform) | hosting access ended 2026-02-28; engine open-sourced (MIT, without SLAM) ([Road to VR, 2026-03-10](https://roadtovr.com/niantic-webar-platform-8th-wall-open-source/)) | Was the standard way to do AR in iPhone Safari. | A warning: don't build on a vendor platform. Plain web + our own data. |

**What we would do differently**
1. **Location + heading aware:** the app knows you stand in the Zócalo facing north-north-east, so the
   view and the text are about *that* direction (Cathedral today, the sacred precinct in 1500).
2. **Honesty layer built in:** every past view carries "Reconstrucción artística", a confidence
   level (photos > paintings > chronicles and archaeology > general science) and its sources.
3. **Deep time done right:** the Zócalo 100 million years ago was a warm shallow sea, not a dinosaur
   park. The honest answer is still a good story.
4. **Victor's house style:** web page, no install, no account, opens straight into the view, Spanish
   first, Mexico City first, zero running cost.

---

## How it could work

### The building blocks (all free, all in the phone's browser)
- **Where am I:** the phone's GPS through the browser. In a dense old centre expect errors of tens of
  metres. Enough to know "you're in the Zócalo"; not enough to draw a building exactly on top of its
  real outline.
- **Where am I looking:** the compass through the browser. On iPhone it needs **one tap** to allow it
  (Safari only asks after a tap), and its own accuracy report is usually around ±10°
  ([MDN, accessed 2026-09-25](https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent);
  [vueuse discussion, accessed 2026-09-25](https://github.com/vueuse/vueuse/discussions/787)).
- **Real AR on iPhone from a web page is still not possible:** Safari does not offer WebXR AR in 2026
  ([XRDoctors, 2026-06-09](https://xrdoctors.pro/blog/webxr-on-ios-what-actually-works)). Web pages can
  still show the camera and read GPS + compass, which is what the open-source LocAR.js library does
  ([AR.js org, accessed 2026-09-25](https://github.com/AR-js-org/locar.js/)).
- **Precise positioning** (to pin a building exactly on the camera image) needs Google's Geospatial API /
  visual positioning, which matches your camera against Street View in 100+ countries
  ([Google Developers blog, accessed 2026-09-25](https://developers.googleblog.com/create-world-scale-augmented-reality-experiences-in-minutes-with-googles-geospatial-creator/)).
  That means a native app and a Google developer key: a later-stage option at most.

**Design consequence:** show the past as a **window** (a full picture of that direction, which turns as
you turn) rather than a tight overlay on the live camera. Windows forgive 10° and 30 m of error;
overlays don't. The sketch uses a window.

### Option A — Curated windows (recommended for checkpoint 1)
- A few spots (start with one: the Zócalo), 4 directions each (N, E, S, W), 4-5 eras.
- Each window is a picture made ahead of time, plus a short text: "what you'd see", "what stands here
  today", confidence level, sources.
- **Who makes the pictures:** Victor, with his existing subscriptions (Gemini app in Google AI Pro,
  ChatGPT), starting from his own photos taken at the spot, using prompts that Claude writes from the
  sources. A third-party guide reports about 100 images/day on AI Pro and ~20/day free
  ([Zenken, 2026](https://ai.zenken.co.jp/en/post/gemini-image-guide/), not confirmed on Google's own
  help page, which only mentions limit changes on 2026-05-17). 1 spot × 4 directions × 4 eras = 16
  pictures, so the limit is not the problem; picking good ones is.
- Hosting: static files on GitHub Pages or Cloudflare Pages. **Running cost: $0.**
- Pay-for-what-you-use: the page loads only the picture for your current direction and era
  (~100-200 KB each).

### Option B — "Hazlo con tu IA" (bring your own AI; opt-in, $0 for us)
- The app knows the place, the direction and the era, so it writes a precise instruction ("keep this
  exact perspective; on the left the sacred precinct wall, on the right the Templo Mayor...").
- You take the photo, tap **Copiar instrucción**, and send photo + instruction to your own Gemini or
  ChatGPT (on Android the share sheet can pass the photo straight in).
- Pros: zero cost, any spot in the world, results as good as the best consumer model. Cons: 2-3 extra
  taps, results vary, and the "reconstrucción" label lives only in our app. Good as a power feature;
  the sketch includes it.

### Option C — Generate on demand with our own tiny server (later, capped)
- A Cloudflare Worker (Victor already has the account from ListoLista) calls **Workers AI FLUX.2
  [klein] 4B**, a small model that edits images (on Workers AI since
  [2026-01-15](https://developers.cloudflare.com/changelog/post/2026-01-15-flux-2-klein-4b-workers-ai/)).
  Free allowance: 10,000 "neurons" a day
  ([pricing, updated 2026-09-17](https://developers.cloudflare.com/workers-ai/platform/pricing/)).
  My arithmetic from that page: about $0.0012 per 1024×1024 edit, so **roughly 90 free edits a day for
  everyone combined**. Input photos must be under 512×512. Quality of a 4B model for this job: untested.
- The Gemini API has **no free tier for image models**; 3-7 US cents per image for Nano Banana 2
  ([Google pricing page, updated 2026-09-24](https://ai.google.dev/gemini-api/docs/pricing)).
  Also, models change fast: Gemini 2.5 Flash Image shuts down on 2026-10-02 (same page).
- Only this option has a running cost risk. Keep it opt-in, capped per day, and after checkpoint 1.

### Option D — Real 3D, no AI (ambitious, later)
- Place an open 3D model (e.g. Kole's CC BY 4.0 Tenochtitlan, with credit) in a three.js view oriented
  by the compass, like the IPN app did. Very honest (no AI invention), but the compass/GPS error makes
  buildings drift, and only works where someone has built a model.

### Who does what (the AI team)
| Role | Job in this project |
|---|---|
| Victor (owner) | Chooses eras and places, takes the photos on site, generates and picks pictures (Option A), says go/no-go at each checkpoint. |
| Claude (senior, cloud) | Research and fact-checking with sources, the prompt template, the app code, review. |
| Local Qwen3.6-35B (junior, Mac mini) | Text chores with a pass/fail check: draft Spanish panel texts from source excerpts; fill and validate the places data file against a schema; write the heading math tests ("which landmark is in front of me", angles wrap at 360°). It does not make images: it is a text model and the workstation mission excludes image generation. |
| Gemini / ChatGPT (Victor's subscriptions) | Make the pictures; a second vendor cross-checks historical claims. The "superbrain" could do one deep research pass on "the Zócalo in 1519: what stood in each direction". |

| Option | Cost to Victor | Cost to user | Taps to see the past | Control over accuracy | Build effort |
|---|---|---|---|---|---|
| A Curated windows | $0 (existing subscriptions) | $0 | 0-1 | High (reviewed) | Low |
| B Bring your own AI | $0 | own quota | 3-4 | Low | Very low |
| C Our server, capped | $0 up to the cap | $0 | 1 + wait | Medium | Medium |
| D Real 3D | $0 | $0 | 0-1 | High, but drifts | High |

---

## MVP / checkpoint 1

**"El Zócalo en cinco épocas":** a Spanish web page that opens straight into the Zócalo view; if you are
there, it follows your compass (one tap on iPhone), otherwise you drag to turn. Four directions ×
Hoy (Victor's photo) + 1910 + 1700 + 1500 + Cretácico, each with "what you'd see", "what stands here
today", a confidence level, sources and the **Reconstrucción artística** stamp. Opt-in extra:
"Hazlo con tu IA" (Option B).

| Checkpoint | Who uses it | Goal |
|---|---|---|
| 1 | Victor + family, on a visit to the Zócalo | Feel it on site; decide if the idea holds up |
| 2 | Friends and family; 5-10 spots in the Centro Histórico | Feedback; spot data format proven; maybe Option C |
| 3 | Public, open source | Others can add spots and eras (data files + review rules); English |

**Checkpoint 1 is done when**
- Victor stands near the flagpole, points at the Cathedral, slides to 1500, and the view and text match
  what he's facing.
- It works on Victor's Android and his wife's iPhone; first picture on screen in under 2 s on 4G.
- Every past picture shows its confidence level and at least one dated source.
- Someone who knows the history (a friend, or a second AI with sources) finds nothing clearly wrong.

---

## Risks and honest caveats

1. **Image AIs invent things.** Generated "history" looks certain even when it is wrong. Google itself
   paused Gemini images of people after historically wrong results
   ([Google, 2024-02-23](https://blog.google/products/gemini/gemini-image-generation-issue/)).
   Answer: the Reconstrucción artística stamp, a confidence level, sources, and human review of every
   curated picture.
2. **Deep time is not what people expect.** Under Mexico City, wells found marine limestone: the
   basin sits on a sea that vanished millions of years ago
   ([SECTEI CDMX, 2019-11-27](https://sectei.cdmx.gob.mx/comunicacion/nota/la-cuenca-de-mexico-se-asento-sobre-un-mar-que-desaparecio-hace-millones-de-anos)).
   About 100 million years ago the spot was likely a warm shallow sea with reefs; no dinosaurs and no
   volcanoes (Popocatépetl and Iztaccíhuatl came much later). Dinosaurs lived elsewhere in Mexico
   (e.g. Coahuila). Victor decides: honest mode only, or also a clearly labelled "fantasy" mode.
3. **"Medieval" and "industrial revolution" are European periods.** In Mexico City the matching eras
   are the Postclassic (Tenochtitlan), the Virreinato and the Porfiriato. Era names should fit the place.
4. **Scholars disagree.** Tenochtitlan reconstructions are interpretations (Kole says so himself). The
   exact edges of the sacred precinct under today's Zócalo are approximate. Known anchors: the Palacio
   Nacional stands on Moctezuma's "Casas Nuevas"
   ([CDMX tourism, accessed 2026-09-25](https://mexicocity.cdmx.gob.mx/venues/national-palace/?lang=en));
   the Cathedral towers were finished on 1791-05-14
   ([IMER](https://www.imer.mx/14-de-mayo-de-1791-terminadas-torres-catedral-cd-mexico/)); the Palacio
   Nacional's third floor was added 1926-1929
   ([Wikipedia ES, accessed 2026-09-25](https://es.wikipedia.org/wiki/Palacio_Nacional_(M%C3%A9xico))), so a
   1910 view must show two floors.
5. **Licences.** Kole's reconstruction: CC BY 4.0, but not as AI input. Mediateca INAH photos:
   CC BY-NC-ND 4.0 ([Mediateca INAH, accessed 2026-09-25](https://mediateca.inah.gob.mx/repositorio/)),
   fine to show with credit in a non-commercial project, but "no derivatives" means we must not edit or
   AI-transform them. Re-check everything if the project ever turns commercial.
6. **People and culture.** Showing Mexica people, rituals or the tzompantli is sensitive and easy to
   get wrong or stereotyped. Proposed default: architecture and landscape only in checkpoint 1.
7. **Sensors.** Compass errors grow near steel and traffic; GPS is weak between old stone buildings;
   iPhone needs a tap. The window design absorbs this; drag-to-turn is always available.
8. **Vendor churn.** 8th Wall closed; image models retire within a year. Pre-made pictures and plain web
   code survive; live API calls break.
9. **Running cost creep.** Only Option C can cost money. It stays opt-in and hard-capped.

---

## Effort estimate

| Piece | Who | Rough effort |
|---|---|---|
| Sources pass for the Zócalo in 5 eras (what stood in each direction) | Claude (+ optional superbrain cross-check) | 1 session |
| App shell: window view, era slider, compass + drag, text panel, labels | Claude | 1-2 sessions |
| Places data file + checker + heading tests | Local junior (Claude reviews) | 1 delegated chore |
| Photos at the Zócalo (4 directions, midday, same spot) | Victor | 1 hour on site |
| Generate and pick ~16 pictures (expect 3-4 tries each) | Victor with Gemini/ChatGPT | 2-4 hours |
| Review with sources, fixes, phone test | Victor + Claude | 1 session |

**Checkpoint 1 total:** about 3-4 Claude sessions plus half a day of Victor's time (including the visit).
Each extra spot later: about 2-3 hours, mostly picture-making and fact-checking.

---

## Interview questions for Victor

Each question has a default we'd use if there's no answer.

1. **Window or overlay?** A full picture of that direction that turns with you (sketch), or drawings on
   top of the live camera? *Default: window.*
2. **Truth or wow in deep time?** Only the honest version (the Zócalo in the Cretaceous was a sea), or
   also a "fantasía" mode with dinosaurs, clearly labelled? *Default: honest only.*
3. **Which eras for checkpoint 1?** Proposed: Hoy, 1910, 1700, 1500 (Tenochtitlan), ~14,000 years ago
   (lake and mammoths), Cretácico. Mexican eras, or world eras like "medieval"? *Default: Mexican eras.*
4. **Which places after the Zócalo?** Centro Histórico only, or also Coyoacán, Chapultepec,
   Teotihuacan, your own neighbourhood? *Default: 5-10 spots in the Centro Histórico.*
5. **Who makes the pictures?** You with your subscriptions (curated, $0), or live generation for
   everyone (Option C, capped free tier)? *Default: curated first, live generation later.*
6. **People in the past views?** Architecture and landscape only, or also people (Mexica, colonial)?
   *Default: no people in checkpoint 1.*
7. **May the Mac mini make images?** Today its mission excludes image generation and storage is tight.
   *Default: no; images come from cloud subscriptions.*
8. **Who is it for first?** Family, tourists, teachers and school groups? Spanish only? *Default:
   family, Spanish only.*
9. **Accuracy partner?** Contact someone (a UNAM or INAH historian, Thomas Kole) before going public?
   *Default: no outreach until checkpoint 2.*
10. **Name?** "Cámara del tiempo", "Aquí antes", "Ventana al pasado", or yours. *Default: Cámara del
    tiempo.*
