# Marcador honesto (soccer sentiment lab): idea dossier

Written 2026-09-25 by Claude (senior), before Victor's alignment interview. Nothing here is decided.
Working name "Marcador honesto" = "the honest scoreboard": the project's core is a scoreboard that
compares our predictions with the betting market, without real money.

Status: 💡 idea, researched. No code. Clickable mock: `sketch.html` (v1, 2026-09-25; see "Sketch
changelog" at the end). Next step: Victor answers the interview questions at the bottom.

---

## The idea in Victor's words

> "An outlier project: use sentiment analysis and AI to inform soccer (football) betting decisions."

Victor's framing (2026-09-25): research it honestly (Mexican law, terms of service, whether public
sentiment really adds anything over bookmaker odds, data sources, gambling risks) and propose the
safest valuable version, such as a paper-trading research lab that tracks predictions against closing
odds without real money, as a learning project in data science and NLP with the local model.

**The one-line version we propose:** a free, local, Spanish-first lab that asks one sharp question,
"does news sentiment tell us anything the Liga MX betting market doesn't already know?", and answers
it with an honest scoreboard, with no real money involved.

---

## What already exists

### Research: does public sentiment beat the odds? (dated)

Short answer from the evidence: **before kickoff, almost certainly not in a way you can profit from.**
The market already prices both the news and the fans' bias. There are narrow, interesting exceptions.

| Study (date) | What they did | What they found | What it means for us |
|---|---|---|---|
| Angelini & De Angelis, *Int. J. Forecasting* (2019) | Odds from 41 bookmakers, 11 European leagues, 11 years | 8 of 11 leagues efficient; 3 had exploitable gaps | Smaller leagues can be less efficient. Liga MX is worth testing, but expect efficiency |
| Forrest & Simmons, *Applied Economics* 40(1) (2008) | 3,000+ bets on Spanish top-flight matches | Odds were shaded by fan numbers: fans of popular clubs got better prices | "Sentiment" is already inside the odds as a known bias |
| Feddersen, Humphreys & Soebbing, *Economic Inquiry* 55(2) (2017) | Facebook likes as a popularity/sentiment proxy, 7 pro leagues in Europe and North America | Bookmakers give popular teams better lines, but those bets don't win more | Fan mood ≠ information. Bookmakers already account for it |
| Brown, Rambaccussing, Reade & Rossi, working paper (2016); *Economic Inquiry* (Oct 2018) | 13.8M tweets + Betfair exchange prices, 372 Premier League matches, 2013/14 | Tweet tone (and certain journalists' tweets) added information beyond prices, mostly **during** matches | The one solid positive result is in-play and speed-dependent; a home lab can't (and shouldn't) trade in-play |
| Schumaker, Jarmoszko & Labedz, *Decision Support Systems* (2016) | Twitter sentiment on Premier League clubs, one season | Higher paper payout than always backing favourites, but lower accuracy | Small sample; benchmark was "back the favourite", not the closing odds |
| Ramirez, Reade & Singleton, *IJF* 39(3) (2023), "Betting on a buzz" | Wikipedia page views ("buzz") before 10,000+ tennis matches | Buzz predicted bookmaker mispricing; strategy looked very profitable | See next row |
| Clegg & Cartlidge, *IJF* 41(2) (2025), correction study | Re-ran the buzz study on the same data | Most of the profit came from **one bet with wrong odds**; later seasons showed no profit | A single bad data row can fake an edge. We need data checks and outlier audits |
| Kaunitz, Zhong & Kreiner, arXiv (Oct 2017) | Bet when one bookmaker's odds disagreed with the market average | Profitable in simulation and with real money... then bookmakers **limited their accounts**, some to maximum stakes of a few dollars | Even a real edge gets shut down by bookmakers |
| Khazaal et al., *Subst. Abuse Treat. Prev. Policy* (2012) | Football experts vs non-experts predicting matches | Expertise did not improve accuracy | "I know football" is not an edge |
| Ding, Guo & Xu, arXiv 2607.17765 (2026-07-20) | Four frontier AI agents (Claude, ChatGPT, Gemini, Grok) forecast all 104 World Cup 2026 matches | None beat the market's Brier score; simply backing the market favourite earned more than any agent | Frontier AI + web search did not beat the market in 2026 |
| Varghese, Bickmann & Sandmann, arXiv 2609.12495 (2026-09-11) | Multi-agent LLM system, 56 World Cup 2026 matches; a "news specialist" agent (injuries, press conferences) | The news agent matched, not beat, the market on exact-score hits | News-reading AI can reach market level on some metrics |

Methods we'll borrow:
- **Turning odds into probabilities:** Štrumbelj, *IJF* 30(4) (2014), found that Shin's method beats
  simple normalisation; a 2026 method (arXiv 2604.17194, 2026-04-19, tested on 90,014 football matches)
  is a newer option.
- **Don't copy the bookmaker:** Hubáček, Šourek & Železný, *IJF* 35(2) (2019): a model is only useful
  for betting where it *disagrees* with the market, so they penalise correlation with the odds.
- **Choose models by calibration, not accuracy:** Walsh & Joshi, *Machine Learning with Applications*
  (2024) argued this for betting. Caveat: a 2025 corrigendum says pipeline bugs affected their numbers,
  so we use the principle (standard in forecasting) but not their ROI figures.

### Tools and projects (free, open)
- **penaltyblog** (Python, v1.4.1 on PyPI): Dixon-Coles and Poisson match models, Elo/Massey/Pi
  ratings, odds tools. It covers our "numbers-only" baseline without us writing the maths.
- **soccerdata** (Python): scrapers for FBref, Understat, ClubElo, football-data and others. Useful
  but it is a *scraper*; each site's terms apply (see below). We'd use only the parts that respect them.
- **FiveThirtyEight SPI**: the best-known public football model. Stopped updating June 2023; history
  (2016/17-2022/23) is still on GitHub. Good for comparisons, not live.
- **ClubElo**: public Elo ratings for European clubs (no Liga MX).
- **"BeatTheBookie"** (Kaunitz et al.'s code on GitHub): the odds-dispersion strategy from the paper.
- **Commercial "AI tipster" sites and apps**: many exist. None we found publishes a verifiable track
  record against closing odds. That gap is the opening for an honest, open project.

### What we'd do differently
1. **Honest scoreboard first.** Everyone reports "win rate" or cherry-picked profits. We report
   log-loss and Brier against the closing odds on every match, plus calibration charts. Negative
   results get published too.
2. **Pre-registered.** Before looking at results we write down the hypothesis, the metric and the
   pass mark (a lesson from the "buzz" correction).
3. **Spanish-first, Liga MX-first.** Almost all prior work is English and Premier League. Liga MX is
   Victor's home market, plausibly less efficient, and Spanish news is where a local model can add
   something.
4. **Zero cost, fully local.** Free data, the Mac's own 35B model for labelling headlines, no servers,
   no paid APIs.
5. **No money, ever, in the product.** No bookmaker links, no affiliate deals, no "picks" channel.

---

## The ground rules we found (law, terms of service, data)

### Is online betting legal for an individual in Mexico? (as of 2026-09-25)
- **Yes, with licensed operators, 18+.** The regulator is the Secretaría de Gobernación (SEGOB),
  through its Dirección General de Juegos y Sorteos (DGJS), under the 1947 Ley Federal de Juegos y
  Sorteos and its 2004 Reglamento. Online betting runs as an extension of a SEGOB permit; there is no
  separate online licence (compliance guides, 2026). Example: Caliente's terms cite SEGOB permit
  DGG/SP/404/97 and an 18+ rule (read 2026-09-25). Always check the official DGJS permit list
  before trusting a site.
- **Unlicensed offshore sites are widespread.** One 2026 estimate puts offshore sites at about 60% of
  online gambling (gamblingharm.org, 2026-05-09; secondary source). SEGOB can block unlicensed domains
  and apps (Vanguardia, 2026-08-20).
- **Taxes.** Operators pay IEPS at 50% (up from 30%) from 2026-01-01 (DOF decree 2025-11-07; BDO
  and BAC summaries). A higher tax often means worse odds for bettors. Players: licensed operators
  withhold 1% federal ISR on prizes, plus state taxes; winnings must be declared (SAT; El Contribuyente,
  2026-02).
- **The law may change.** A bill to replace the 1947 law (new national gaming institute) stalled; the
  Chamber extended review to 2027-08-31 (gamblingharm.org, 2026-05-09). Proposals in play: minimum age
  21, bet limits linked to income, ads only after 22:30. One outlet (Vanguardia, 2026-08-20) reports
  the ad curfew as in force; earlier coverage (Feb-Mar 2026) describes it as a bill. **Not verified
  in the DOF.**
- **What this means for us:** a paper-trading lab is not gambling. No permit, no tax, no age question.
  The only legal exposure is **data terms** (next section).

### Terms of service: automated access and bots
- **Bookmakers: never scrape, never automate.** Caliente's terms (read 2026-09-25) forbid interfering
  with the site, robots and similar devices included (cl. 2.3.5), allow odds and stats for personal
  viewing only, and forbid copying or redistributing them (cl. 19.3-19.4). bet365's terms are reported
  to ban automated systems, scripts and crawlers. Bot use typically ends in closed accounts.
- **football-data.co.uk** (page updated 2026-09-24): free CSVs of results + odds, including **Liga MX
  2012/13-2026/27 with closing odds** (average, max, Betfair exchange, bet365). Its terms say use is
  "intended for private individuals only", not commercial products or data-training products using
  bots, scrapers or AI. Our reading: Victor's private lab downloading one file a week is fine. We
  **don't redistribute** the CSVs in a public repo, and we ask the owner before publishing any
  downloader. Caveat from the site: Pinnacle's odds have been unreliable since 2025-07-23 (its public
  API closed), so we use the **market average** closing odds.
- **The Odds API**: free "Starter" plan, 500 credits/month, API key by email; covers Liga MX
  (`soccer_mexico_ligamx`); historical odds are paid-only (site and docs, read 2026-09-25). One
  snapshot of one market in one region costs 1 credit, so a weekly early-odds snapshot uses about 5-10
  credits/month.
- **football-data.org** API: free tier 10 requests/minute, 12 competitions, **no Liga MX**
  (docs, 2026).
- **API-Football (api-sports)**: free tier about 100 requests/day with Liga MX fixtures, line-ups and
  injuries (third-party comparisons, 2026; its terms to be read before use; account required).
- **StatsBomb open data** (GitHub): free event data for selected competitions, for research, with
  attribution (StatsBomb logo). Great for learning xG, **not** Liga MX.
- **GDELT** (news): free for any use with citation + link. Tracks world news in 65 languages including
  Spanish, with a tone score per article. DOC 2.0 API: no key, rolling 3-month window. Full history
  (since 2015) via bulk files (terabytes) or Google BigQuery.
- **BigQuery sandbox**: free, no credit card, Google sign-in, 1 TiB of queries/month, tables expire
  after 60 days (Google docs, 2026).
- **X (Twitter) API**: pay-per-use only, $0.005 per post read, no free read tier (docs.x.com, read
  2026-09-25). 10,000 posts a week ≈ US$50/week, which breaks the zero-cost rule.
- **Bluesky Jetstream**: free public stream of all posts as JSON (developer guidelines apply). Free,
  but Mexican football talk there is probably thin (not measured).
- Reddit: not researched (unreachable for Claude).

### The baseline we must beat (measured today, 2026-09-25)
From football-data's Liga MX file (4,734 matches, 2012/13 to 2026-09-21), probabilities from the
**average closing odds** (margin removed by simple normalisation):

| Forecaster | Log-loss (lower = better) | Brier (lower = better) |
|---|---|---|
| "Always the base rates" (home 44.6%, draw 27.1%, away 28.3%) | 1.071 | 0.648 |
| Market, average closing odds | **1.022** (recent seasons 0.96-1.00) | 0.613 |
| Betfair exchange closing odds (714 matches only) | 0.974 | 0.579 |

- The whole "skill" of the market over knowing nothing is about **0.05 nats** per match. Any real edge
  will be a small fraction of that, say 0.002-0.01.
- The average closing odds carry a **7.5% margin** (overround 1.075). A bettor at average prices starts
  7.5% behind; the best price across all bookmakers is near 0.3%, but that needs accounts everywhere.
- Liga MX plays about **336-342 matches per season** (Apertura + Clausura, including liguilla).

---

## How it could work

All options run on the Mac mini, in Python 3.12 with uv (the existing `envs/data` setup has pandas and
matplotlib). No server, no paid service. The output is one scoreboard page (HTML) that opens with one
command, plus notebooks for digging in.

### Option A — Numbers only (the control group; always built)
- Data: football-data Liga MX CSV (results + closing odds), downloaded weekly.
- Model: a ratings model (Elo or Dixon-Coles via penaltyblog) → home/draw/away probabilities.
- Output: our log-loss vs the market's, calibration chart, per-season table.
- Why: sentiment can only be judged against a model without sentiment. Also teaches the core
  data-science loop (features, backtest, hold-out seasons, calibration).

### Option B — News sentiment (recommended core)
- **Sources:** GDELT (Spanish-language sports coverage per team, with its own tone score) and, for
  richer labels, headlines from the RSS feeds of Mexican sports outlets (headlines only, personal use).
- **The local junior's job at runtime:** Qwen3.6-35B labels each headline into fixed JSON: team,
  event type (injury, suspension, coach change, dressing-room conflict, form, transfer), direction for
  the team (+/−), confidence. Thinking off; schema-checked. At about 42 tokens/s output and 1,000
  tokens/s input on this Mac, a headline takes under a second: a week's Liga MX headlines (our guess: ~500) take
  about 5-10 minutes, unattended.
- **Quality check:** Victor labels 100 headlines by hand (a "gold set", ~30 minutes); we report the
  model's agreement with him. If it's poor, labels are noise and we say so.
- **The test that matters (encompassing test):** does adding sentiment to the *market's own
  probabilities* improve out-of-sample log-loss? If the sentiment coefficient is ~0, sentiment adds
  nothing beyond the odds. This is sharper than "does sentiment predict results" (it does, weakly,
  because the market does too).
- **A cleverer second target: line movement.** Predicting results is very noisy. Predicting whether
  Thursday's odds **move** by kickoff is far less noisy and is exactly where fresh news should show up
  first. For Liga MX we need an early snapshot (football-data only has closing odds for Liga MX), so
  this uses The Odds API free tier (one Thursday call per week). For European leagues, football-data
  already has both early and closing odds.
- **History:** GDELT's free API only reaches back 3 months (about one Apertura, ~90 matches). For a
  real backtest (2015-2026) we'd query GDELT in the BigQuery sandbox (Google sign-in, free; we'd
  dry-run each query first to see its size). Otherwise we collect forward and wait.

### Option C — Social media sentiment (not recommended for checkpoint 1)
X is paid per post read; Bluesky is free but likely thin for Liga MX; Reddit is out of reach. Social
media also mostly measures **fan mood**, which the research shows the market already prices as a
bias. Revisit only if Option B finds a signal.

### Option D — "AI forecasters league" (optional, fun, cheap)
Each matchday the local 35B (and, by hand, any cloud AI Victor likes) gives probabilities for the
same matches. They join the scoreboard as extra rows, scored the same way. It turns the 2026 World
Cup papers into a running local experiment and costs nothing but a few minutes.

### Who does what (the AI team)
- **Victor (owner):** answers the interview, approves the pre-registration, labels the 100-headline
  gold set, glances at the scoreboard weekly, decides go/no-go.
- **Claude (senior):** design, pre-registration, statistics (metric code, bootstrap, encompassing
  test), briefs for the junior, reviews every patch.
- **Local 35B (junior), two roles:** (1) runtime headline labeller (above); (2) bounded coding
  chores via `~/local-ai/scripts/delegate.sh`, each with a pass/fail `verify:` command: odds→probability
  functions with known-answer tests, CSV loaders, the GDELT fetcher, chart scripts.
- **Other cloud AIs (ChatGPT/Gemini):** an independent review of the pre-registration and the final
  statistics, to catch errors like the one-bad-bet trap.

---

## MVP / checkpoint 1: "El marcador honesto"

**The MVP in one line:** a zero-cost local lab that scores numbers-only and news-sentiment
predictions for every Liga MX match against the closing odds, with paper bets only, and reports
honestly whether sentiment adds anything.

### Step 1 — Scoreboard vs market (history, numbers only)
- Victor downloads the Liga MX CSV once (one click on football-data), or approves a weekly
  script that fetches that one file.
- The lab turns closing odds into market probabilities, fits the ratings model on past seasons, and
  scores both on held-out seasons.
- One command opens `scoreboard.html`: a table (log-loss, Brier, n matches), a calibration chart, one
  plain-Spanish paragraph of findings.
- **Useful on its own:** it answers "how far is a simple model from the market?" (expected: behind).

### Step 2 — Does sentiment add anything? (pre-registered)
- First, `PREREGISTRATION.md`: the hypothesis, the metric, the hold-out seasons and the pass mark,
  approved by Victor before any result is seen.
- Sentiment features: GDELT tone per team for the 72 hours before the odds snapshot, plus 35B
  headline labels (with the 100-headline gold-set check).
- Tests: (a) encompassing test on market probabilities; (b) line-movement test where early odds
  exist.

### Step 3 — Paper-trading notebook (forward, one torneo)
- Every Thursday, zero clicks: a scheduled script freezes our probabilities for the weekend in a
  CSV and commits it to git. The commit time proves the prediction came before kickoff.
- Rule-based paper bets in "fichas" (units, never pesos): back an outcome only when our probability ×
  early odds > 1.03.
- Every Tuesday, after football-data updates: fill in closing odds and results; the scoreboard
  redraws.
- Run for one full torneo (~17 jornadas plus liguilla).

### The evaluation metric (the contract)
For match *i* with outcome *y_i* ∈ {home, draw, away}:
- **Market probabilities** from closing odds *o*: m_ik = (1/o_ik) / Σ_j (1/o_ij); Shin's method as a
  robustness check.
- **Primary:** mean log-loss L(p) = −(1/n) Σ log p_{i,y_i}. Report **Δ = L(ours) − L(market)** on the same
  matches, with a 95% interval from a paired bootstrap that resamples whole matchdays (matches on the
  same weekend share news). Δ < 0 with the interval below 0 = we beat the market. Expected: Δ > 0.
- **Secondary:** multi-class Brier score; calibration (reliability) chart; for sentiment, the
  out-of-sample gain of "market + sentiment" over "market alone".
- **For paper bets:** closing-line value, CLV_i = o_taken / o_fair_close − 1, where o_fair_close = 1 / m_close.
  Mean CLV > 0 means we got better prices than the final market; this is less noisy than profit.
  Paper profit is shown but labelled "mostly luck at this sample size".
- **How many matches we need (rough power estimate):** per-match log-loss varies with SD ≈ 0.4
  (measured). The paired difference between two decent models is much less noisy; assuming its SD is
  0.05-0.10, 80% power to detect a true edge of 0.01 needs about 200-800 matches (0.6-2.4 Liga MX
  seasons); an edge of 0.005 needs about 800-3,000 (2.4-9 seasons). So **one forward torneo can't
  prove an edge**; it can only test the pipeline and the line-movement signal. The historical backtest
  (step 2 with BigQuery) is what can give a verdict.

### Checkpoint 1 is done when
The scoreboard shows history (step 1), the sentiment verdict with its interval (step 2) and one
forward torneo (step 3), and Victor gets a one-page memo in Spanish: "sentiment added X ± Y; here's
what we learned." Then go/no-go on anything further.

---

## Risks and honest caveats

1. **The edge probably doesn't exist.** Pre-match markets are close to efficient, fan sentiment is
   already priced as a bias, and 2026 frontier AI agents didn't beat the market. The likely result is
   an honest "no". That's a fine outcome for a learning lab and a portfolio piece. It is a bad basis
   for betting.
2. **Gambling harm is real, and this project could feed it.** Sports betting is the form most tied to
   the "illusion of control" (Journal of Gambling Studies, 2021, as summarised by problem-gambling
   services). A dashboard that says "AI edge" makes that illusion stronger. Mexico context: Proceso
   (2026-05-19) and El Imparcial (2026-06-08) report heavy betting debt among 18-25-year-olds; CONASAMA
   (2026-08-10) warned about betting apps; help: **Línea de la Vida 800 911 2000**. US data: Baker et
   al. (NBER w33108, 2024) found online sports betting raised credit-card debt in low-savings
   households. **Guardrails:** no real-money module, no bookmaker links or affiliates, no picks shared
   with friends, paper units only, and the scoreboard always shows the market next to our numbers.
3. **Winning gets you banned anyway.** Kaunitz et al. (2017) had some accounts cut to maximum stakes of a few
   dollars once they won. Even a real edge wouldn't turn into income.
4. **Terms of service.** Bookmaker scraping or automated betting breaks their terms (and can freeze
   funds). football-data is "private individuals only": the public repo must not include its CSVs.
   GDELT and StatsBomb need attribution. The Odds API needs an email key (a light account).
5. **Data traps.** One wrong odds value can create fake profit (the "buzz" correction). Pinnacle odds
   have been stale since 2025-07-23. **Time leakage:** a headline published after the odds snapshot
   must never feed that match's prediction. Defences: outlier audit, timestamps on every feature, tests
   for leakage.
6. **Too many tries.** Testing 30 sentiment variants will find one that "works" by chance.
   Defence: pre-registration and untouched hold-out seasons.
7. **Small numbers.** ~340 Liga MX matches a year; see the power estimate. Adding European leagues
   (more matches, early + closing odds) would help but moves away from Spanish/Mexico.
8. **Label quality.** The 35B may misread sarcasm, slang or club nicknames ("las Chivas", "el Rebaño").
   The 100-headline gold set measures this.
9. **Legal drift.** Mexican gambling law is in flux (new law, age 21, ad rules). The lab isn't
   gambling, so it's exposed only if it ever touched real money or advertised betting. It won't.
10. **Reputation.** "Can AI beat the betting market? A pre-registered test" is a strong portfolio
    piece. "My AI betting bot" is not. Framing matters for the open-source release.

---

## Effort estimate

| Piece | Senior (Claude) | Junior (local 35B) | Victor | Elapsed |
|---|---|---|---|---|
| Step 1: scoreboard vs market | 3-4 h | 2-3 chores (odds maths + tests, CSV loader, chart) | 30 min (download, review) | 1-2 days |
| Step 2: sentiment + pre-registration | 6-10 h | labelling runs (unattended) + 2-3 chores (GDELT fetcher, feature builder) | 1-1.5 h (approve pre-reg, label 100 headlines, optional Google sign-in for BigQuery) | 1-2 weeks |
| Step 3: forward paper trading | 2-3 h setup | weekly labelling (automatic) | ~5 min/week glance | one torneo (~4 months) |
| Memo + open-source write-up | 2-3 h | translation drafts | 30 min review | at the end |

- **Money:** $0. Free data, free tiers, the Mac's own model.
- **Disk:** under 1 GB (CSVs, headlines, labels). No new models to download.
- **Memory:** labelling uses the already-loaded 35B; nothing else large runs.

---

## Interview questions for Victor

1. **What is the real goal?** (a) a data-science/NLP learning lab and portfolio piece with an honest
   yes/no answer, or (b) something you'd one day bet real money with? If (b), I'll push back: the
   evidence says no. We'd need hard rules first (a fixed entertainment budget, never chasing losses).
2. **Which league?** Liga MX only (Spanish news, your home market, maybe less efficient, but ~340
   matches/year and no free early odds), European leagues (more data, early + closing odds free, but
   English news), or Liga MX first and Europe later?
3. **Is news-only sentiment OK for checkpoint 1?** Social media would mean a paid X API (~US$50 per
   10,000 posts) or thin Bluesky data. I suggest news (GDELT + headlines) first.
4. **History or patience?** The real verdict needs history (2015-2026) through the free BigQuery
   sandbox, which needs a Google sign-in (your allowed exception). Without it, we collect forward and
   need 1-3 years for a verdict.
5. **What result would satisfy you?** Proposed pass mark: "sentiment improves out-of-sample log-loss
   over the market alone, with the 95% interval excluding zero". Anything else you'd want to see, such
   as the calibration chart or the line-movement test?
6. **Your weekly time:** zero-click (a scheduled script runs Thursdays and Tuesdays; you just open the
   page) or one button you press? And are you up for labelling 100 headlines once (about 30 minutes)?
7. **Public or private?** Open-source the code and publish the (probably negative) result as a
   Spanish-first write-up? The data itself can't be shared (football-data terms).
8. **Guardrails agreement:** no real money, no bookmaker accounts or links, no picks shared with
   friends or family, paper "fichas" only. OK as the project's hard rules?
9. **AI forecasters league (Option D):** add the local 35B, and cloud AIs by hand, as competitors on
   the scoreboard? It's fun and cheap, but it takes a few minutes of your time per matchday for the
   cloud ones.
10. **Where should it live?** A JupyterLab notebook (already set up) or a single HTML scoreboard page
    that opens instantly (Notepad benchmark)? I suggest the page for daily use and notebooks for
    digging in.

---

## Sources (all read or searched 2026-09-25)

Law and taxes (Mexico)
- SEGOB DGJS home and permit list: http://www.juegosysorteos.gob.mx/ ; http://www.juegosysorteos.gob.mx/es/Juegos_y_Sorteos/Permisionario
- Vanguardia, "Así cambió la regulación de apuestas y casinos en México en 2026" (2026-08-20): https://www.vanguardia.com/mundo/2026/08/20/asi-cambio-la-regulacion-de-apuestas-y-casinos-en-mexico-en-2026/
- Gamblingharm.org, bill stalls (2026-05-09): https://gamblingharm.org/mexico-sports-betting-online-casino-bill/
- BDO México on the IEPS 50% reform (2025): https://www.bdomexico.com/es-mx/publicaciones/flash-de-consultoria-legal/2025/se-aprueba-incremento-de-tasa-del-ieps-a-juegos-con-apuestas-y-sorteos
- BAC, IEPS reform for 2026 (2025-12-08): https://bac.com.mx/2025/12/08/reformas-a-la-ley-del-ieps-en-materia-de-juegos-con-apuestas-y-sorteos-para-2026/
- El Contribuyente, state vs federal betting taxes (2026-02): https://www.elcontribuyente.mx/2026/02/impuestos-estatales-vs-federales-el-mapa-de-las-apuestas-en-mexico/
- SAT, income from prizes: https://www.sat.gob.mx/consulta/72905/conoce-el-regimen-de-los-ingresos-por-la-obtencion-de-premios
- Gaming Compliance, SEGOB licence 2026 (secondary): https://gamingcompliance.io/segob-licence-requirements/
- Yogonet, ad restrictions proposal (2026-02-23): https://www.yogonet.com/international/news/2026/02/23/117722-mexico-considers-restrictions-on-gambling-ads-during-2026-fifa-world-cup-broadcasts

Terms of service and data
- Caliente.mx Términos y Condiciones (read 2026-09-25): https://www.caliente.mx/mas/ayuda/terminos-y-condiciones/
- football-data.co.uk data page (updated 2026-09-24): https://www.football-data.co.uk/data.php ; Liga MX file: https://www.football-data.co.uk/new/MEX.csv
- The Odds API (pricing on home page; docs): https://the-odds-api.com/ ; https://the-odds-api.com/liveapi/guides/v4/
- football-data.org API policies: https://docs.football-data.org/general/v4/policies.html
- StatsBomb open data: https://github.com/statsbomb/open-data
- GDELT terms and DOC 2.0 API: https://www.gdeltproject.org/about.html ; https://blog.gdeltproject.org/gdelt-doc-2-0-api-debuts/
- BigQuery sandbox: https://docs.cloud.google.com/bigquery/docs/sandbox
- X API pricing: https://docs.x.com/x-api/getting-started/pricing
- Bluesky Jetstream: https://docs.bsky.app/blog/jetstream ; developer guidelines: https://docs.bsky.app/docs/support/developer-guidelines
- Pinnacle API closure (2025-07-23), secondary: https://arbusers.com/access-to-pinnacle-api-closed-since-july-23rd-2025-t10682/

Evidence on sentiment and market efficiency
- Brown et al., Economic Inquiry (2018): https://onlinelibrary.wiley.com/doi/10.1111/ecin.12506 ; working paper (2016): https://ideas.repec.org/p/rdg/emxxdp/em-dp2016-01.html
- Schumaker et al., Decision Support Systems (2016): https://www.sciencedirect.com/science/article/abs/pii/S0167923616300835
- Feddersen, Humphreys & Soebbing, Economic Inquiry (2017): https://ideas.repec.org/a/bla/ecinqu/v55y2017i2p1119-1129.html
- Forrest & Simmons, Applied Economics (2008): https://ideas.repec.org/a/taf/applec/v40y2008i1p119-126.html
- Angelini & De Angelis, IJF (2019): https://www.researchgate.net/publication/328072253_Efficiency_of_online_football_betting_markets
- Ramirez, Reade & Singleton, IJF (2023): https://www.sciencedirect.com/science/article/pii/S0169207022001091
- Clegg & Cartlidge, IJF (2025) correction: https://arxiv.org/abs/2306.01740
- Kaunitz, Zhong & Kreiner, arXiv (2017): https://arxiv.org/abs/1710.02824
- Khazaal et al. (2012): https://pmc.ncbi.nlm.nih.gov/articles/PMC3502081/
- Ding, Guo & Xu, arXiv (2026-07-20): https://arxiv.org/abs/2607.17765
- Varghese, Bickmann & Sandmann, arXiv (2026-09-11): https://arxiv.org/abs/2609.12495
- Štrumbelj, IJF (2014): https://www.sciencedirect.com/science/article/abs/pii/S0169207014000533
- Odds-only methods, arXiv 2604.17194 (2026-04-19): https://arxiv.org/abs/2604.17194
- Hubáček, Šourek & Železný, IJF (2019): https://ida.fel.cvut.cz/papers/hubacek2019exploiting.html
- Walsh & Joshi, MLwA (2024) + corrigendum (2025): https://arxiv.org/abs/2303.06021 ; https://www.sciencedirect.com/science/article/pii/S2666827025000106

Tools
- penaltyblog: https://github.com/martineastwood/penaltyblog
- soccerdata: https://github.com/probberechts/soccerdata
- FiveThirtyEight SPI data: https://github.com/fivethirtyeight/data/blob/master/soccer-spi/README.md
- BeatTheBookie: https://github.com/Lisandro79/BeatTheBookie

Gambling harm
- CONASAMA via LaSalud.mx (2026-08-10): https://lasalud.mx/2026/08/10/conasama-refuerza-la-prevencion-del-trastorno-por-juego-de-apuestas/
- Proceso (2026-05-19): https://www.proceso.com.mx/nacional/2026/5/19/ludopatia-en-jovenes-estudiantes-revelan-el-infierno-de-las-apuestas-deportivas-372133.html
- El Imparcial (2026-06-08): https://www.elimparcial.com/mexico/2026/06/08/cuatro-de-cada-10-jovenes-mexicanos-de-entre-18-y-25-anos-ya-estan-endeudados-por-apuestas-deportivas-en-aplicaciones-moviles/
- Baker et al., NBER w33108 (2024): https://www.nber.org/system/files/working_papers/w33108/w33108.pdf
- Hollenbeck, Larsen & Proserpio (2025 version): https://www.anderson.ucla.edu/sites/default/files/document/2025-05/Hollenbeck_The_Financial_Consequences_of_Legalized_Sports_Gambling.pdf
- Illusion of control in sports betting (Nebraska Problem Gambling, 2023): https://problemgambling.nebraska.gov/november-2023-blog/

---

## Sketch changelog

- **v1 (2026-09-25, Claude senior):** `sketch.html`, a clickable mock of the "paper-trading lab"
  dashboard in Spanish. One self-contained file (Google Fonts only; no other network access), light
  and dark themes, works at 400 px wide. **All data is simulated** with a fixed seed (a toy
  ordered-logit model: 18 Liga MX clubs, J1-J9 played, J10 frozen "this Thursday"); invented
  headlines name no players. What it shows:
  - Sticky banner "Dinero ficticio, solo aprendizaje" + "Datos de ejemplo simulados"; Línea de la
    Vida in the footer; no bookmaker names or links anywhere.
  - Answer first: "does news add anything to the market?" with Δ log-loss vs market and a 95%
    interval (paired bootstrap over jornadas) for three rows: market + news (the encompassing test),
    numbers + news, numbers only (control). In the sample: control clearly behind the market, news
    helps our model, the key test is inconclusive (interval includes 0).
  - KPI tiles (log-loss and Brier per forecaster); a running log-loss chart in SVG with a
    "difference vs market" view, jornada markers, the 1.071 base-rate reference and hover tooltips.
  - Paper bets in fichas: switch the deciding model, the value threshold (prob × Thursday odds) and
    the stake; summary with CLV (the honest signal) and paper profit labelled "mostly luck".
  - Calibration chart (market vs the chosen model).
  - Match list per jornada: market / numbers / numbers+news probabilities, the paper bet and its CLV;
    expand for Thursday vs closing odds with margin, per-match log-loss, and headlines labelled by the
    local 35B (event, direction, confidence, publish time, "before the cut" vs "excluded" = the
    leakage rule), with the raw JSON label.
  - Paper-bet log (newest first), weekly zero-click cycle explained (Thursday freeze + git commit,
    Tuesday results).
  - Open questions for the interview: is this the right "one screen"? Too much for the Notepad
    benchmark (maybe verdict + chart only, the rest behind a tab)? Keep the AI-forecasters league
    (Option D) as extra rows?
