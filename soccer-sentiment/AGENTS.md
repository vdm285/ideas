# AGENTS.md — Marcador honesto / soccer sentiment lab (read this first) — DRAFT

> **DRAFT, 2026-09-25.** Written by Claude (senior) before Victor's alignment interview. Nothing here
> is decided until Victor answers the questions in `DOSSIER.md`. Defaults below are proposals.

Vendor-neutral briefing for any AI agent working on this project (Claude, ChatGPT/Codex, Gemini,
Grok, or a local model). `CLAUDE.md` (when the repo exists) just imports it. Whoever changes direction
or architecture updates this file.

## Owner
Victor (github.com/vdm285): product owner and architect. Mathematician and analytical philosopher,
MBA-style owner, basic coding; explain in plain language, and show the maths when it matters (he
likes it). He checks in at milestones: show the scoreboard, explain what changed, then ask go/no-go.
Nothing is published or pushed to GitHub without his OK. Project stage: personal learning, portfolio
and open source; not commercial.

## Mission
A **paper-trading research lab**, not a betting tool. It answers one question honestly: *does news
sentiment, read by AI, tell us anything the Liga MX betting market doesn't already know?* Every
prediction is scored against the closing odds on a public-style scoreboard. No real money, ever.
It is also Victor's hands-on course in data science (backtests, calibration, proper scoring rules)
and NLP (Spanish headline labelling with the local model).

Rollout by checkpoints (each one used and trusted before the next):
1. "El marcador honesto": history scoreboard, pre-registered sentiment test, one forward torneo
   of paper trading (see `DOSSIER.md`, "MVP / checkpoint 1").
2. Maybe: more leagues, the line-movement study, the "AI forecasters league".
3. Maybe: open-source the code and publish the result (Spanish first), data excluded.

## Hard rules (non-negotiable)
1. **No real money.** No bookmaker accounts, no bet placement, no bookmaker links or affiliate codes,
   no "picks" sent to anyone. Paper bets use "fichas" (units), never pesos.
2. **Never scrape bookmakers or automate anything on their sites.** Their terms forbid it (e.g.
   Caliente cl. 2.3.5, 19.3-19.4). Odds come only from football-data.co.uk CSVs and, if Victor
   approves a key, The Odds API free tier.
3. **Respect data terms.** football-data.co.uk is for private individuals only: never commit its
   CSVs to a public repo; ask its owner before publishing any downloader. Credit GDELT (citation +
   link) and StatsBomb (logo) wherever their data is used.
4. **Pre-register before looking.** Hypothesis, metric, hold-out seasons and pass mark go in
   `PREREGISTRATION.md`, approved by Victor, before any sentiment result is computed. Hold-out
   seasons stay untouched until the final run.
5. **No time leakage.** Every feature carries a timestamp; nothing published after the odds snapshot
   may feed that match. Tests enforce this.
6. **Always show the market.** Every chart and table shows the market's numbers next to ours. The
   scoreboard never says "edge" without its confidence interval.
7. **Zero running cost.** Free data and free tiers only; the Mac's own models; no servers.
8. Spanish first for anything Victor or the public reads (memo, scoreboard labels, write-up).
9. Responsible-gambling note on the scoreboard page: Línea de la Vida 800 911 2000.

## Design principles (Victor's house style)
1. **Zero-click start:** one command (or a scheduled job) produces `scoreboard.html`; opening it
   shows the answer first.
2. **Few clear choices:** the scoreboard has one table, one calibration chart, one paragraph.
   Details live in notebooks.
3. **Pay for what you use:** the numbers-only baseline runs alone; sentiment, line movement and the
   AI league are opt-in modules.
4. **No accounts:** none needed for the core. Optional: Google sign-in for the BigQuery sandbox
   (historical GDELT), an email key for The Odds API. Both only with Victor's OK.
5. **Optionality:** simple default (Liga MX, news sentiment, closing-odds benchmark); power
   features behind switches.
6. **Notepad benchmark:** the scoreboard opens instantly and is plain.

## The evaluation contract (don't change without Victor)
- Market probabilities: closing odds with the margin removed (proportional; Shin as a check),
  using football-data's **average** closing odds (Pinnacle's odds have been stale since 2025-07-23).
- Primary metric: mean 3-way log-loss; report Δ = ours − market on the same matches, 95% interval
  by paired bootstrap over matchdays. Beat the market = interval entirely below 0.
- Secondary: multi-class Brier, calibration chart, out-of-sample gain of "market + sentiment" over
  "market alone" (encompassing test), closing-line value (CLV) of paper bets. Paper profit is shown
  but labelled as mostly luck.
- Reference numbers (Liga MX, 4,734 matches to 2026-09-21): market log-loss 1.022 (recent seasons
  0.96-1.00), base rates 1.071. About 340 matches per season, so one torneo can't prove an edge.

## Current state
- 2026-09-25: idea researched (`DOSSIER.md`): law, terms of service, evidence, data sources,
  MVP and metric. No code yet. No repo yet (lives in `~/projects/ideas/soccer-sentiment/`).
- Waiting on Victor: the 10 interview questions in `DOSSIER.md` (goal, league, news vs social,
  BigQuery yes/no, pass mark, weekly time, public vs private, guardrails, AI league, interface).

## Decisions so far
- None final. Proposed defaults: Liga MX first; news sentiment (GDELT + headlines) not social media;
  local 35B as the headline labeller; football-data CSVs for odds; paper trading only.

## How to work here (once the repo exists)
- Python 3.12 with uv; pandas, matplotlib; penaltyblog for ratings models. Raw data lives in
  `data/` and is git-ignored; derived, shareable results in `results/`.
- Branch per piece of work; nothing merged or pushed without Victor's OK.
- Tests before features: odds→probability maths, scoring rules, bootstrap and leakage checks get
  known-answer tests first. Tests are protected: don't weaken them to make code pass.
- Local juniors (via `~/local-ai/scripts/delegate.sh`) get bounded chores with a pass/fail
  `verify:` command (loaders, fetchers, chart scripts, label runs). The senior reviews every patch.
- The local 35B as a runtime labeller: `http://127.0.0.1:8080` (OpenAI-style API), model
  `qwen3.6-35b-a3b`, thinking off (`"chat_template_kwargs": {"enable_thinking": false}`), JSON output
  validated against a schema. Never let it do arithmetic; the maths is Python's job.
- Weekly jobs (if Victor approves): Thursday freeze predictions + commit; Tuesday fill in closing
  odds/results + redraw the scoreboard.
- Research lives in `docs/research/` (dated, fact-checked). The sources for this draft are listed at
  the end of `DOSSIER.md`.
