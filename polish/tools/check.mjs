/**
 * Headless check for Tabla Viva and Globo Curioso.
 * Usage: node polish/tools/check.mjs [--quick] [--root DIR]
 *
 * ENFORCE_STANDARDS becomes true in the Tier 0 commit (doctype, charset, lang).
 * Until then quirks mode is reported and does not fail the baseline.
 */
import AxeBuilder from "@axe-core/playwright";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
import { chromium } from "playwright";

const ENFORCE_STANDARDS = false;
const HERE = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(HERE, "..", "..");
const args = process.argv.slice(2);
const quick = args.includes("--quick");
const rootFlag = args.indexOf("--root");
const root = path.resolve(rootFlag >= 0 ? args[rootFlag + 1] : repoRoot);
const isRepo = path.resolve(root) === path.resolve(repoRoot);
const shotsDir = path.join(repoRoot, "polish", "out", "shots");
const lockPath = path.join(repoRoot, "polish", "content-lock.json");
const metricsPath = path.join(repoRoot, "polish", "metrics.json");

const ALLOWED_HOSTS = new Set([
  "cdnjs.cloudflare.com",
  "cdn.jsdelivr.net",
  "fonts.googleapis.com",
  "fonts.gstatic.com",
]);
const VIEWS = [
  { id: "phone", w: 390, h: 844, dpr: 2, mobile: true, touch: true },
  { id: "tablet", w: 1024, h: 768, dpr: 2, mobile: false, touch: true },
  { id: "tv", w: 1920, h: 1080, dpr: 1, mobile: false, touch: false },
];
const THEMES = quick ? ["light"] : ["light", "dark"];
const VIEW_LIST = quick ? VIEWS.filter((v) => v.id === "phone" || v.id === "tv") : VIEWS;

const fails = [];
const notes = [];
const metrics = {
  tabla: blankApp(),
  globo: blankApp(),
};
metrics.globo.frameAvg = null;
metrics.globo.frameP95 = null;
metrics.tabla.bohrFrameAvg = null;
metrics.tabla.longTasks = null;
metrics.globo.longTasks = null;

function blankApp() {
  return {
    under44: 0,
    under24: 0,
    contrastFails: 0,
    axeSerious: 0,
    axeCritical: 0,
    tvPageHeight: 0,
    fcp: null,
    seen: false,
  };
}

function report(ok, name, detail = "") {
  const extra = detail ? " — " + detail : "";
  console.log(`${ok ? "ok" : "FAIL"}  ${name}${extra}`);
  if (!ok) fails.push(detail ? `${name}: ${detail}` : name);
}

const noted = new Set();
function note(msg) {
  if (noted.has(msg)) return;
  noted.add(msg);
  notes.push(msg);
  console.log("NOTE  " + msg);
}

function sha(text) {
  return createHash("sha256").update(text).digest("hex");
}

function readText(file) {
  const buf = fs.readFileSync(file);
  return { buf, text: buf.toString("utf8") };
}

function git(gitArgs) {
  try {
    const out = execFileSync("git", gitArgs, {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    return { code: 0, out };
  } catch (err) {
    return {
      code: typeof err.status === "number" ? err.status : 1,
      out: `${err.stdout || ""}${err.stderr || ""}`,
    };
  }
}

function appFile(name) {
  return path.join(root, name, "sketch.html");
}

function maxInto(slot, key, value) {
  if (!Number.isFinite(value)) return;
  slot[key] = Math.max(slot[key] || 0, value);
  slot.seen = true;
}

async function shoot(page, file) {
  if (!isRepo) return;
  await fs.promises.mkdir(path.dirname(file), { recursive: true });
  await page.screenshot({ path: file, type: "jpeg", quality: 68, fullPage: true });
}

async function launchBrowser() {
  return chromium.launch({ channel: "msedge", headless: true });
}

function watch(page, bag) {
  page.on("pageerror", (err) => bag.errors.push("pageerror: " + err.message));
  page.on("console", (msg) => {
    if (msg.type() !== "error") return;
    const text = msg.text();
    const where = (msg.location() && msg.location().url) || "";
    if (/favicon\.ico/i.test(text) || /favicon\.ico/i.test(where)) return;
    bag.errors.push("console: " + text.slice(0, 240) + (where ? " @ " + where.slice(0, 160) : ""));
  });
  page.on("response", (res) => {
    if (res.status() < 400) return;
    if (/favicon\.ico/i.test(res.url())) return;
    bag.errors.push(`http ${res.status()} ${res.url().slice(0, 180)}`);
  });
  page.on("request", (req) => {
    const url = req.url();
    if (/^(data|blob|file):/i.test(url)) return;
    let host = "";
    try {
      host = new URL(url).hostname;
    } catch {
      bag.bad.push(url.slice(0, 160));
      return;
    }
    if (host === "127.0.0.1" || host === "localhost") return;
    if (!ALLOWED_HOSTS.has(host)) bag.bad.push(host + " " + url.slice(0, 140));
  });
}

async function settle(page) {
  await page.evaluate(() =>
    Promise.race([
      document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve(),
      new Promise((r) => setTimeout(r, 5000)),
    ]),
  );
  await page.waitForTimeout(120);
}

async function openApp(browser, file, view, theme, extra = {}) {
  const context = await browser.newContext({
    viewport: { width: view.w, height: view.h },
    deviceScaleFactor: view.dpr,
    isMobile: view.mobile,
    hasTouch: view.touch,
    colorScheme: theme,
    reducedMotion: extra.reduced ? "reduce" : "no-preference",
    locale: "es-MX",
    timezoneId: "America/Mexico_City",
  });
  const page = await context.newPage();
  page.setDefaultTimeout(8000);
  const bag = { errors: [], bad: [] };
  watch(page, bag);
  const target = extra.url || pathToFileURL(file).href;
  try {
    await page.goto(target, { waitUntil: "load", timeout: 45000 });
  } catch (err) {
    bag.errors.push("goto: " + err.message);
  }
  await settle(page).catch(() => {});
  return { context, page, bag };
}

function layoutInfo() {
  const doc = document.documentElement;
  const vw = window.innerWidth;
  const offenders = [];
  for (const el of document.body.querySelectorAll("*")) {
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) continue;
    if (r.right > vw + 2 && r.left < vw - 1) {
      const cls = typeof el.className === "string" ? el.className : "";
      offenders.push(`${el.tagName.toLowerCase()}${cls ? "." + cls.split(" ")[0] : ""}`);
      if (offenders.length >= 6) break;
    }
  }
  const sample = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (!/muestra|ejemplo/i.test(node.textContent || "")) continue;
    const el = node.parentElement;
    if (!el) continue;
    const s = getComputedStyle(el);
    if (s.display === "none" || s.visibility === "hidden") continue;
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) continue;
    const onScreen = r.bottom > 0 && r.top < window.innerHeight && r.right > 0 && r.left < window.innerWidth;
    if (onScreen) sample.push((node.textContent || "").trim().slice(0, 80));
  }
  let fcp = null;
  const paint = performance.getEntriesByType("paint").find((p) => p.name === "first-contentful-paint");
  if (paint) fcp = Math.round(paint.startTime);
  return {
    scrollWidth: doc.scrollWidth,
    innerWidth: vw,
    clientWidth: doc.clientWidth,
    scrollHeight: doc.scrollHeight,
    offenders,
    sample,
    compat: document.compatMode,
    charset: document.characterSet,
    lang: document.documentElement.lang,
    fcp,
  };
}

function controlSizes() {
  const sel = "button, a[href], input, summary, [role='tab'], [role='switch']";
  let under44 = 0;
  let under24 = 0;
  const tiny = [];
  for (const el of document.querySelectorAll(sel)) {
    if (el.closest("[hidden]")) continue;
    const s = getComputedStyle(el);
    if (s.display === "none" || s.visibility === "hidden") continue;
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) continue;
    const m = Math.min(r.width, r.height);
    if (m < 44) {
      under44++;
      if (tiny.length < 8) tiny.push(`${Math.round(r.width)}x${Math.round(r.height)} ${el.id || el.className || el.tagName}`);
    }
    if (m < 24) under24++;
  }
  return { under44, under24, tiny };
}

function tileContrast() {
  const lin = (c) => {
    const x = c / 255;
    return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
  };
  const lum = (c) => 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
  const ratioOf = (a, b) => {
    const A = lum(a);
    const B = lum(b);
    return (Math.max(A, B) + 0.05) / (Math.min(A, B) + 0.05);
  };
  const rgb = (text) => {
    const m = /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/.exec(text || "");
    return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
  };
  const fails = [];
  const seen = new Set();
  const take = (mode) => {
    for (const cell of document.querySelectorAll(".cell")) {
      const z = Number(cell.dataset.z);
      const e = EL[z - 1];
      if (!e) continue;
      const key = mode + ":" + (mode === "cat" ? e.cat : e.st);
      if (seen.has(key)) continue;
      seen.add(key);
      const bg = rgb(getComputedStyle(cell).backgroundColor);
      if (!bg) continue;
      for (const part of cell.querySelectorAll(".z, .s, .n")) {
        const ps = getComputedStyle(part);
        if (ps.display === "none" || ps.visibility === "hidden") continue;
        const fg = rgb(ps.color);
        if (!fg) continue;
        const size = parseFloat(ps.fontSize) || 0;
        const weight = parseInt(ps.fontWeight, 10) || 400;
        const large = size >= 24 || (weight >= 700 && size >= 18.66);
        const ratio = ratioOf(fg, bg);
        const need = large ? 3 : 4.5;
        if (ratio + 0.02 < need) fails.push(`${key} ${part.className} ${ratio.toFixed(2)}<${need}`);
      }
    }
  };
  take("cat");
  const stBtn = document.querySelector("[data-color='st']");
  const catBtn = document.querySelector("[data-color='cat']");
  if (stBtn && catBtn) {
    stBtn.click();
    take("st");
    catBtn.click();
  }
  return fails;
}

async function runAxe(page) {
  const results = await new AxeBuilder({ page }).analyze();
  const serious = [];
  const critical = [];
  for (const v of results.violations) {
    const n = v.nodes ? v.nodes.length : 1;
    if (v.impact === "serious") serious.push(`${v.id}×${n}`);
    if (v.impact === "critical") critical.push(`${v.id}×${n}`);
  }
  const count = (list) => list.reduce((sum, item) => sum + Number(item.split("×")[1] || 1), 0);
  return { serious: count(serious), critical: count(critical), seriousIds: serious, criticalIds: critical };
}

async function auditView(browser, app, file, view, theme) {
  const label = `${app} ${view.id} ${theme}`;
  const { context, page, bag } = await openApp(browser, file, view, theme);
  try {
    if (app === "tabla") {
      const n = await page.locator(".cell").count();
      report(n === 118, `${label} cells`, String(n));
    } else {
      const n = await page.locator("#globe .land").count();
      report(n === 177, `${label} lands`, String(n));
      const name = await page.locator("#cname").innerText().catch(() => "");
      report(/M[eé]xico/i.test(name), `${label} mexico`, name.slice(0, 40));
    }
    const lay = await page.evaluate(layoutInfo);
    const overflow = lay.scrollWidth > lay.innerWidth + 1 && lay.offenders.length > 0;
    report(!overflow, `${label} overflow`, `sw ${lay.scrollWidth} iw ${lay.innerWidth} h ${lay.scrollHeight} ${lay.offenders.join(", ")}`);
    report(lay.sample.length > 0, `${label} sample-label`, lay.sample[0] || "none on first screen");
    const standardsOk = lay.compat === "CSS1Compat" && /utf-8/i.test(lay.charset) && lay.lang === "es";
    if (ENFORCE_STANDARDS) report(standardsOk, `${label} standards`, `${lay.compat} ${lay.charset} lang=${lay.lang || "-"}`);
    else if (!standardsOk) note(`${app} standards ${lay.compat} ${lay.charset} lang=${lay.lang || "-"} (enforced from tier 0)`);
    else report(true, `${label} standards`, `${lay.compat} lang=${lay.lang}`);
    if (view.id === "tv") {
      maxInto(metrics[app], "tvPageHeight", lay.scrollHeight);
      if (theme === "light" && lay.fcp != null) metrics[app].fcp = lay.fcp;
      report(true, `${label} page-height`, String(lay.scrollHeight));
    }
    if (isRepo) await shoot(page, path.join(shotsDir, `${app}-${view.id}-${theme}.jpg`));
    const sizes = await page.evaluate(controlSizes);
    maxInto(metrics[app], "under44", sizes.under44);
    maxInto(metrics[app], "under24", sizes.under24);
    report(true, `${label} targets`, `<44 ${sizes.under44} <24 ${sizes.under24}`);
    let contrastFails = 0;
    if (app === "tabla") {
      const list = await page.evaluate(tileContrast);
      contrastFails += list.length;
      if (list.length) note(`${label} tile contrast ${list.slice(0, 4).join("; ")}`);
    }
    const axe = await runAxe(page);
    contrastFails += axe.seriousIds.filter((id) => id.startsWith("color-contrast")).reduce((s, item) => s + Number(item.split("×")[1] || 1), 0);
    maxInto(metrics[app], "contrastFails", contrastFails);
    maxInto(metrics[app], "axeSerious", axe.serious);
    maxInto(metrics[app], "axeCritical", axe.critical);
    report(true, `${label} axe`, `serious ${axe.serious} [${axe.seriousIds.slice(0, 6).join(", ")}] critical ${axe.critical} [${axe.criticalIds.slice(0, 6).join(", ")}]`);
    const err = bag.errors.filter((e) => !/favicon/i.test(e));
    report(err.length === 0, `${label} errors`, err.slice(0, 3).join(" | "));
    report(bag.bad.length === 0, `${label} requests`, bag.bad.slice(0, 3).join(" | "));
    return { page, context, bag };
  } catch (err) {
    report(false, label, err.message);
    await context.close().catch(() => {});
    return null;
  } finally {
    if (context) await context.close().catch(() => {});
  }
}

async function hashGlobals(page, app) {
  const payload = await page.evaluate((which) => {
    if (which === "tabla") {
      return JSON.stringify({
        SYM, NAME, MASS, ALIAS, CAT, STATE, EXC, SAMPLE, FACTS, HOOK,
        catOf: catOf.toString(),
        stateOf: stateOf.toString(),
        posOf: posOf.toString(),
        madelung: madelung.toString(),
        configOf: configOf.toString(),
      });
    }
    return JSON.stringify({
      WORLD, SAMPLES, MINI, SOURCES, DISPUTED, ALIAS, NAME_ES, WIKI, SMALL, CDMX,
      oceanAt: oceanAt.toString(),
    });
  }, app);
  return sha(payload);
}

async function tablaFlows(browser, file) {
  const view = VIEWS[2];
  const { context, page, bag } = await openApp(browser, file, view, "light");
  try {
    const card = await page.evaluate(() => {
      const panel = document.getElementById("panel");
      const text = panel ? panel.innerText : "";
      const tech = panel && panel.querySelector("details.tech");
      const pos = panel ? getComputedStyle(panel).position : "";
      return {
        name: panel?.querySelector("h2")?.textContent || "",
        sheet: document.body.classList.contains("sheet-open"),
        pos,
        levels: ["8 años", "12 años", "15 o más"].every((s) => text.includes(s)),
        bohr: !!panel?.querySelector("#bohr"),
        fill: (panel?.querySelector("#b-fill")?.textContent || "").includes("Ver cómo se llenan las capas"),
        note: text.includes("Modelo de Bohr simplificado"),
        tech: (tech?.querySelector("summary")?.textContent || "").includes("Datos técnicos"),
        techOpen: !!(tech && tech.hasAttribute("open")),
        story: (panel?.querySelector("#story")?.textContent || "").length > 40,
        uses: text.includes("Para qué sirve"),
        where: text.includes("Dónde se encuentra"),
        hist: text.includes("Historia"),
        exp: text.includes("experimento") || text.includes("adulto"),
        quiz: text.includes("Pregunta"),
        next: text.includes("Siguiente historia"),
        say: !!panel?.querySelector("#b-say"),
        stars: document.querySelectorAll(".cell.has").length,
      };
    });
    report(/Hierro/.test(card.name) && !card.sheet && card.pos === "sticky", "tabla tv hierro docked", `${card.name} ${card.pos} sheet=${card.sheet}`);
    report(card.levels && card.story, "tabla card levels");
    report(card.bohr && card.fill && card.note, "tabla card bohr");
    report(card.tech && card.techOpen === false, "tabla card datos técnicos folded");
    report(card.uses && card.where && card.hist && card.exp && card.quiz && card.next, "tabla card stories");
    report(card.say, "tabla card escuchar");
    report(card.stars === 6, "tabla story stars", String(card.stars));

    const queries = [
      ["oro", /Oro/, 79],
      ["26", /Hierro/, 26],
      ["wolframio", /Tungsteno/, 74],
      ["nitrogeno", /Nitr[oó]geno/, 7],
    ];
    for (const [q, re, z] of queries) {
      const has = await page.locator("#q").count();
      if (!has) {
        report(false, `tabla search ${q}`, "missing #q");
        continue;
      }
      await page.fill("#q", q);
      const hit = await page.evaluate(() => {
        const el = document.getElementById("hit");
        return {
          text: el && !el.hidden ? el.textContent : "",
          glow: document.querySelectorAll(".cell.glow").length,
          live: [...document.querySelectorAll(".cell:not(.dim)")].map((c) => Number(c.dataset.z)),
        };
      });
      report(re.test(hit.text) && hit.live.includes(z) && hit.glow > 0, `tabla search ${q}`, `${hit.text} glow=${hit.glow} live=${hit.live.slice(0, 6).join(",")}`);
      if (q === "oro") {
        await page.click("#hit");
        await page.waitForFunction(() => /Oro/.test(document.querySelector("#panel h2")?.textContent || ""));
        report(true, "tabla search hit opens Oro");
      }
    }

    await page.fill("#q", "cobre");
    await page.click("#hit");
    await page.waitForFunction(() => /Cobre/.test(document.querySelector("#panel h2")?.textContent || ""));
    const hook = await page.locator("#panel .hook").innerText().catch(() => "");
    report(hook.trim().length > 12, "tabla hook", hook.slice(0, 60));
    await page.fill("#q", "");

    const beforeBg = await page.evaluate(() => getComputedStyle(document.querySelector(".cell[data-z='26']")).backgroundColor);
    await page.locator("#more").evaluate((el) => { el.open = true; });
    await page.click("[data-color='st']");
    const afterBg = await page.evaluate(() => getComputedStyle(document.querySelector(".cell[data-z='26']")).backgroundColor);
    report(beforeBg !== afterBg, "tabla color estado", `${beforeBg} -> ${afterBg}`);
    await page.click("[data-color='cat']");
    const backBg = await page.evaluate(() => getComputedStyle(document.querySelector(".cell[data-z='26']")).backgroundColor);
    report(backBg === beforeBg, "tabla color familia");
    await page.locator("#colors").evaluate((el) => { el.open = true; });
    await page.click("#chips .chip[data-k='nob']");
    const dim = await page.evaluate(() => document.querySelectorAll(".cell.dim").length);
    report(dim > 90 && dim < 118, "tabla legend filter", `dim ${dim}`);
    await page.click("#chips .chip[data-k='nob']");
    const dim2 = await page.evaluate(() => document.querySelectorAll(".cell.dim").length);
    report(dim2 === 0, "tabla legend clear", `dim ${dim2}`);

    if (!quick) {
      const bohr = await page.evaluate(async () => {
        const samples = [];
        let last = performance.now();
        const t0 = last;
        document.getElementById("b-fill")?.click();
        while (performance.now() - t0 < 700) {
          await new Promise((r) => requestAnimationFrame(r));
          const now = performance.now();
          samples.push(now - last);
          last = now;
        }
        const avg = samples.reduce((a, b) => a + b, 0) / (samples.length || 1);
        return Math.round(avg * 10) / 10;
      });
      metrics.tabla.bohrFrameAvg = bohr;
      report(true, "tabla bohr frames", `avg ${bohr} ms`);
    }

    await page.click("#btn-reto");
    const started = await page.waitForFunction(() => !document.getElementById("reto").hidden).then(() => true).catch(() => false);
    report(started, "tabla reto start");
    if (started) {
      for (let i = 0; i < 10; i++) {
        const ended = await page.evaluate(() => !document.getElementById("reto-end").hidden);
        if (ended) break;
        const sym = (await page.locator("#reto-name").innerText()).trim();
        await page.evaluate((symbol) => {
          const z = SYM.indexOf(symbol) + 1;
          document.querySelector(`.cell[data-z="${z}"]`)?.click();
        }, sym);
        await page.waitForFunction((symbol) => {
          const end = document.getElementById("reto-end");
          if (end && !end.hidden) return true;
          const ask = document.getElementById("reto-ask");
          const name = document.getElementById("reto-name");
          return ask && ask.textContent === "Busca" && name && name.textContent.trim() !== symbol;
        }, sym, { timeout: 7000 });
      }
      const endText = await page.locator("#reto-end").innerText();
      report(/10/.test(endText) && !await page.locator("#reto-end").isHidden(), "tabla reto end", endText);
      if (isRepo) await shoot(page, path.join(shotsDir, "tabla-tv-reto.jpg"));
      await page.click("#reto-exit");
    }

    await page.locator("#more").evaluate((el) => { el.open = true; });
    await page.click("#btn-vitrina");
    await page.waitForFunction(() => document.body.classList.contains("kiosk") && !document.getElementById("attract").hidden);
    if (isRepo) await shoot(page, path.join(shotsDir, "tabla-tv-attract.jpg"));
    await page.click("#attract");
    await page.waitForFunction(() => document.getElementById("attract").hidden && document.body.classList.contains("kiosk"));
    await page.locator("#logo").dispatchEvent("pointerdown");
    await page.waitForTimeout(3200);
    const left = await page.evaluate(() => !document.body.classList.contains("kiosk"));
    report(left, "tabla logo hold 3s");
    report(bag.errors.length === 0, "tabla flows errors", bag.errors.slice(0, 2).join(" | "));
  } catch (err) {
    report(false, "tabla flows", err.message);
  } finally {
    await context.close().catch(() => {});
  }

  const phone = VIEWS[0];
  const opened = await openApp(browser, file, phone, "light");
  try {
    const closed = await opened.page.evaluate(() => !document.body.classList.contains("sheet-open"));
    report(closed, "tabla phone card closed");
    await opened.page.evaluate(() => document.querySelector(".cell[data-z='26']")?.click());
    await opened.page.waitForFunction(() => document.body.classList.contains("sheet-open") && /Hierro/.test(document.querySelector("#panel h2")?.textContent || ""));
    report(true, "tabla phone sheet opens");
    if (isRepo) await shoot(opened.page, path.join(shotsDir, "tabla-phone-fe.jpg"));
  } catch (err) {
    report(false, "tabla phone sheet", err.message);
  } finally {
    await opened.context.close().catch(() => {});
  }
}

async function globoPoint(page, kind) {
  return page.evaluate((kind) => {
    const svg = document.getElementById("globe");
    const rect = svg.getBoundingClientRect();
    const toScreen = (pt) => ({ x: rect.left + (pt[0] / size) * rect.width, y: rect.top + (pt[1] / size) * rect.height });
    if (kind === "ocean") {
      for (let y = size * 0.18; y < size * 0.82; y += size / 26) {
        for (let x = size * 0.18; x < size * 0.82; x += size / 26) {
          if (Math.hypot(x - size / 2, y - size / 2) > proj.scale() * 0.9) continue;
          if (featureAt([x, y]) === null) return toScreen([x, y]);
        }
      }
      return null;
    }
    for (const f of features) {
      if (!f.properties.a || f === selected || f.properties.a === "AQ") continue;
      if (!facing(f.cen)) continue;
      const p = proj(f.cen);
      if (!p) continue;
      const hit = featureAt(p);
      if (hit && hit.properties.a === f.properties.a) {
        return { ...toScreen(p), name: f.name, code: f.properties.a };
      }
    }
    return null;
  }, kind);
}

async function globoFlows(browser, file) {
  const view = VIEWS[2];
  const { context, page, bag } = await openApp(browser, file, view, "light");
  try {
    const spinning = await page.evaluate(() => spinning === true);
    report(spinning, "globo spinning");
    const card = await page.evaluate(() => {
      const text = document.getElementById("panel")?.innerText || "";
      return {
        name: document.getElementById("cname")?.innerText || "",
        facts: document.getElementById("cfacts")?.innerText || "",
        hook: document.getElementById("chook")?.innerText || "",
        wiki: !!document.querySelector("#cmore a[href*='wikipedia.org']"),
        neighbours: /colinda con|lo más cercano/i.test(text),
        tabs: ["historia", "comida", "cultura", "hoy"].every((t) => document.getElementById("t-" + t)),
      };
    });
    report(/M[eé]xico/.test(card.name), "globo card name", card.name.slice(0, 40));
    report(/Ciudad de México|km/.test(card.facts), "globo card facts", card.facts.slice(0, 80));
    report(/Sabías que/.test(card.hook), "globo card hook");
    report(card.wiki, "globo card wiki");
    report(card.neighbours, "globo card neighbours", card.neighbours ? "" : "missing in panel");
    const tabs = ["historia", "comida", "cultura", "hoy"];
    for (const tab of tabs) {
      await page.click("#t-" + tab);
      const body = (await page.locator("#tabbody").innerText()).trim();
      const hoyOk = tab !== "hoy" || /tema de ejemplo/i.test(body);
      report(body.length > 30 && hoyOk, `globo tab ${tab}`, body.slice(0, 50));
    }
    if (isRepo) await shoot(page, path.join(shotsDir, "globo-tv-hoy.jpg"));
    const adult = await page.locator("#tabbody").innerText();
    await page.click("#kids");
    const kidOn = await page.getAttribute("#kids", "aria-checked");
    const kidText = await page.locator("#tabbody").innerText();
    report(kidOn === "true" && kidText.trim() !== adult.trim(), "globo kids changes text");
    await page.click("#kids");

    if ((await page.getAttribute("#spin", "aria-pressed")) === "true") await page.click("#spin");
    await page.locator("#globe").scrollIntoViewIfNeeded();
    const box = await page.locator("#globe").boundingBox();
    const before = await page.evaluate(() => rot[0]);
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;
    await page.mouse.move(cx, cy);
    await page.mouse.down();
    await page.mouse.move(cx + 160, cy + 20, { steps: 12 });
    await page.mouse.up();
    const after = await page.evaluate(() => rot[0]);
    report(Math.abs(after - before) > 2, "globo drag", `${before.toFixed(1)} -> ${after.toFixed(1)}`);

    const country = await globoPoint(page, "country");
    report(!!country, "globo country point", country ? country.code : "none");
    if (country) {
      await page.mouse.click(country.x, country.y);
      await page.waitForFunction((code) => selected && selected.properties.a === code, country.code);
      const shown = await page.locator("#cname").innerText();
      report(shown.includes(country.name), "globo tap card", shown.slice(0, 40));
    }
    const ocean = await globoPoint(page, "ocean");
    report(!!ocean, "globo ocean point");
    if (ocean) {
      await page.mouse.click(ocean.x, ocean.y);
      await page.waitForFunction(() => /oc[eé]ano|mar |agua|golfo|bah[ií]a|lago/i.test(document.getElementById("status")?.textContent || ""));
      const status = await page.locator("#status").innerText();
      report(true, "globo ocean names water", status.slice(0, 80));
    }

    const home = await page.locator("#cname").innerText();
    await page.click("#random");
    await page.waitForFunction((prev) => {
      const t = document.getElementById("cname")?.innerText || "";
      return t && !t.includes(prev);
    }, home.split("\n")[0]);
    report(true, "globo sorprendeme");

    if (!quick) {
      const perf = await page.evaluate(async () => {
        setSpin(false);
        const samples = [];
        let last = performance.now();
        const t0 = last;
        while (performance.now() - t0 < 2000) {
          rot[0] += 1.4;
          render();
          await new Promise((r) => requestAnimationFrame(r));
          const now = performance.now();
          samples.push(now - last);
          last = now;
        }
        const jp = byCode.JP;
        if (jp) select(jp, true);
        const t1 = performance.now();
        while (performance.now() - t1 < 1100) {
          await new Promise((r) => requestAnimationFrame(r));
          const now = performance.now();
          samples.push(now - last);
          last = now;
        }
        samples.sort((a, b) => a - b);
        const avg = samples.reduce((a, b) => a + b, 0) / samples.length;
        const p95 = samples[Math.min(samples.length - 1, Math.ceil(samples.length * 0.95) - 1)];
        return { avg: Math.round(avg * 10) / 10, p95: Math.round(p95 * 10) / 10 };
      });
      metrics.globo.frameAvg = perf.avg;
      metrics.globo.frameP95 = perf.p95;
      report(true, "globo frames", `avg ${perf.avg} ms p95 ${perf.p95} ms`);
    }
    report(bag.errors.length === 0, "globo flows errors", bag.errors.slice(0, 2).join(" | "));
  } catch (err) {
    report(false, "globo flows", err.message);
  } finally {
    await context.close().catch(() => {});
  }

  const hashView = await openApp(browser, file, view, "light", { url: pathToFileURL(file).href + "#JP/comida/ninos" });
  try {
    await hashView.page.waitForFunction(() => {
      const kids = document.getElementById("app")?.classList.contains("kids");
      const tab = document.getElementById("t-comida")?.getAttribute("aria-selected") === "true";
      const code = selected && selected.properties && selected.properties.a === "JP";
      return kids && tab && code;
    });
    const body = (await hashView.page.locator("#tabbody").innerText()).trim();
    report(body.length > 20, "globo hash JP comida niños", body.slice(0, 40));
  } catch (err) {
    report(false, "globo hash link", err.message);
  } finally {
    await hashView.context.close().catch(() => {});
  }

  const phone = await openApp(browser, file, VIEWS[0], "light");
  try {
    const mode = await phone.page.evaluate(() => ({
      w: window.innerWidth,
      phone: window.matchMedia("(max-width:899px)").matches,
      sheet: typeof sheetNow === "function" ? sheetNow() : "missing",
    }));
    if (!mode.phone) {
      note(`globo phone lays out at ${mode.w}px without a viewport meta, so the sheet stays off until tier 0`);
    } else {
      report(mode.sheet === "mini", "globo phone sheet start", mode.sheet);
      await phone.page.click("#handle");
      const peek = await phone.page.evaluate(() => sheetNow());
      report(peek === "peek", "globo phone sheet peek", peek);
      await phone.page.click("#handle");
      const open = await phone.page.evaluate(() => sheetNow());
      report(open === "open", "globo phone sheet open", open);
      if (isRepo) await shoot(phone.page, path.join(shotsDir, "globo-phone-sheet.jpg"));
    }
    await phone.page.click("#kids");
    const on = await phone.page.getAttribute("#kids", "aria-checked");
    report(on === "true", "globo phone kids");
    if (isRepo) await shoot(phone.page, path.join(shotsDir, "globo-phone-kids.jpg"));
  } catch (err) {
    report(false, "globo phone sheet", err.message);
  } finally {
    await phone.context.close().catch(() => {});
  }
}

async function reducedPass(browser, app, file) {
  const { context, page, bag } = await openApp(browser, file, VIEWS[2], "light", { reduced: true });
  try {
    const infinite = await page.evaluate(() => {
      const found = new Set();
      const list = [];
      if (document.getAnimations) list.push(...document.getAnimations());
      if (document.documentElement.getAnimations) list.push(...document.documentElement.getAnimations({ subtree: true }));
      for (const anim of list) {
        if (found.has(anim)) continue;
        found.add(anim);
      }
      return [...found].filter((anim) => {
        const timing = anim.effect && anim.effect.getTiming ? anim.effect.getTiming() : null;
        return timing && timing.iterations === Infinity && anim.playState === "running";
      }).map((anim) => anim.animationName || "animation");
    });
    report(infinite.length === 0, `${app} reduced motion`, infinite.join(", ") || "still");
    if (app === "globo") {
      const spin = await page.evaluate(() => spinning === true);
      report(spin === false, "globo reduced spin off");
    }
    report(bag.errors.length === 0, `${app} reduced errors`, bag.errors.slice(0, 2).join(" | "));
  } catch (err) {
    report(false, `${app} reduced motion`, err.message);
  } finally {
    await context.close().catch(() => {});
  }
}

function startServer(dir) {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url || "/", "http://127.0.0.1");
    let rel = decodeURIComponent(url.pathname).replace(/^[/\\]+/, "");
    if (!rel || rel.endsWith("/")) rel += "index.html";
    if (/favicon\.ico$/i.test(rel)) {
      res.writeHead(204);
      res.end();
      return;
    }
    const base = path.resolve(dir);
    const file = path.resolve(base, rel);
    if (file !== base && !file.startsWith(base + path.sep)) {
      res.writeHead(403);
      res.end("no");
      return;
    }
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
      res.writeHead(404);
      res.end("missing");
      return;
    }
    const ext = path.extname(file).toLowerCase();
    const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".svg": "image/svg+xml" };
    res.writeHead(200, { "Content-Type": types[ext] || "application/octet-stream", "Cache-Control": "no-store" });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

async function httpPass(browser, app, file, port) {
  const rel = file.replace(root, "").replace(/\\/g, "/");
  const url = `http://127.0.0.1:${port}${rel.startsWith("/") ? rel : "/" + rel}`;
  const { context, page, bag } = await openApp(browser, file, VIEWS[2], "light", { url });
  try {
    if (app === "tabla") {
      const n = await page.locator(".cell").count();
      report(n === 118, "tabla http", String(n));
    } else {
      const n = await page.locator("#globe .land").count();
      report(n === 177, "globo http", String(n));
    }
    report(bag.errors.length === 0, `${app} http errors`, bag.errors.slice(0, 2).join(" | "));
    report(bag.bad.length === 0, `${app} http requests`, bag.bad.slice(0, 2).join(" | "));
  } catch (err) {
    report(false, `${app} http`, err.message);
  } finally {
    await context.close().catch(() => {});
  }
}

function staticChecks() {
  const tabla = appFile("interactive-science");
  const globo = appFile("interactive-globe");
  if (!fs.existsSync(tabla) || !fs.existsSync(globo)) return;
  for (const file of [tabla, globo]) {
    const { buf, text } = readText(file);
    const name = path.basename(path.dirname(file));
    const bom = buf.length >= 3 && buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf;
    report(!bom && !text.includes("\uFFFD") && !text.includes("Ã") && !text.includes("Â") && !text.includes("â€"), `${name} encoding`);
  }
  const tablaText = fs.readFileSync(tabla, "utf8");
  const globoText = fs.readFileSync(globo, "utf8");
  report(tablaText.includes("Hidrógeno"), "tabla contains Hidrógeno");
  report(globoText.includes("Modo niños"), "globo contains Modo niños");
  report(tablaText.includes("Boceto · datos de muestra") && tablaText.includes("★ Historia completa"), "tabla sample strings");
  report(tablaText.includes("Modelo de Bohr simplificado") && tablaText.includes("(predicha)"), "tabla science labels");
  report(globoText.includes("Boceto: textos de ejemplo, sin revisar") && globoText.includes("(ejemplo)") && globoText.includes("tema de ejemplo · no es la noticia de hoy"), "globo sample strings");
}

function scopeChecks() {
  if (!isRepo) {
    report(true, "scope", "skipped for --root");
    return;
  }
  const branch = git(["branch", "--show-current"]).out.trim();
  report(branch === "grok/polish-2026-09-27", "branch", branch);
  const protectedPaths = [
    "arduino-raspberry",
    "soccer-sentiment",
    "time-travel-camera",
    "README.md",
    "LICENSE",
    "interactive-science/AGENTS.md",
    "interactive-science/DOSSIER.md",
    "interactive-globe/AGENTS.md",
    "interactive-globe/DOSSIER.md",
  ];
  const diff = git(["diff", "--quiet", "origin/main", "--", ...protectedPaths]);
  report(diff.code === 0, "scope vs main", diff.code === 0 ? "clean" : diff.out.slice(0, 180));
  const staged = git(["diff", "--cached", "--name-only"]).out.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
  const badPaths = staged.filter((p) => {
    const n = p.replace(/\\/g, "/");
    return n !== "GROK-LOG.md" && n !== "interactive-science/sketch.html" && n !== "interactive-globe/sketch.html" && !n.startsWith("polish/");
  });
  report(badPaths.length === 0, "staged scope", badPaths.join(", ") || `${staged.length} files`);
  const secretRe = new RegExp(
    ["ghp", "_"].join("") + "|" + ["github", "_pat_"].join("") + "|" + ["xa", "i-"].join("") + "|" + ["PRIVATE", " KEY"].join(""),
  );
  const shortRe = new RegExp(["s", "k-"].join(""));
  const secretHits = [];
  for (const rel of staged) {
    const abs = path.join(repoRoot, rel);
    if (!fs.existsSync(abs) || !fs.statSync(abs).isFile()) continue;
    const size = fs.statSync(abs).size;
    const n = rel.replace(/\\/g, "/");
    const isApp = n === "interactive-science/sketch.html" || n === "interactive-globe/sketch.html";
    if (!isApp && size > 300 * 1024) secretHits.push(`${n} is ${size} bytes`);
    const textish = /\.(html|md|json|mjs|js|css|txt)$/.test(n) || n.endsWith(".gitignore");
    const raw = fs.readFileSync(abs);
    const asText = raw.toString("utf8");
    if (secretRe.test(asText)) secretHits.push(n + " secret");
    if (textish && shortRe.test(asText)) secretHits.push(n + " short-token");
  }
  report(secretHits.length === 0, "staged secrets", secretHits.join(", ") || "none");
  for (const rel of ["interactive-science/sketch.html", "interactive-globe/sketch.html"]) {
    const num = git(["diff", "--cached", "--numstat", "--", rel]).out.trim();
    if (!num) continue;
    const [add, del] = num.split("\t").map(Number);
    const changed = (add || 0) + (del || 0);
    report(changed <= 600, `diff size ${rel}`, `${changed} lines`);
  }
}

function ratchet() {
  if (!isRepo || !fs.existsSync(metricsPath)) return;
  const prev = JSON.parse(fs.readFileSync(metricsPath, "utf8"));
  for (const app of ["tabla", "globo"]) {
    const was = prev[app] || {};
    const now = metrics[app];
    for (const key of ["under44", "under24", "contrastFails", "axeSerious", "axeCritical", "tvPageHeight"]) {
      if (typeof was[key] !== "number") continue;
      const worse = key === "tvPageHeight" ? now[key] > was[key] + 2 : now[key] > was[key];
      report(!worse, `${app} ratchet ${key}`, `${was[key]} -> ${now[key]}`);
    }
    const perfKeys = app === "globo" ? ["frameAvg", "frameP95"] : ["bohrFrameAvg"];
    for (const key of perfKeys) {
      if (typeof was[key] !== "number" || typeof now[key] !== "number" || was[key] <= 0) continue;
      if (now[key] > was[key] * 1.25) note(`${app} ${key} rose more than 25% (${was[key]} -> ${now[key]})`);
    }
  }
}

function writeBaselines(hashes) {
  if (!isRepo || fails.length || !hashes.tabla || !hashes.globo) return;
  const prevLock = fs.existsSync(lockPath) ? JSON.parse(fs.readFileSync(lockPath, "utf8")) : null;
  if (!prevLock) {
    fs.writeFileSync(lockPath, JSON.stringify({ tabla: hashes.tabla, globo: hashes.globo }, null, 2) + "\n", "utf8");
  }
  const out = {
    updated: new Date().toISOString(),
    tabla: {
      under44: metrics.tabla.under44,
      under24: metrics.tabla.under24,
      contrastFails: metrics.tabla.contrastFails,
      axeSerious: metrics.tabla.axeSerious,
      axeCritical: metrics.tabla.axeCritical,
      tvPageHeight: metrics.tabla.tvPageHeight,
      fcp: metrics.tabla.fcp,
      bohrFrameAvg: metrics.tabla.bohrFrameAvg,
      longTasks: metrics.tabla.longTasks,
    },
    globo: {
      under44: metrics.globo.under44,
      under24: metrics.globo.under24,
      contrastFails: metrics.globo.contrastFails,
      axeSerious: metrics.globo.axeSerious,
      axeCritical: metrics.globo.axeCritical,
      tvPageHeight: metrics.globo.tvPageHeight,
      fcp: metrics.globo.fcp,
      frameAvg: metrics.globo.frameAvg,
      frameP95: metrics.globo.frameP95,
      longTasks: metrics.globo.longTasks,
    },
  };
  fs.writeFileSync(metricsPath, JSON.stringify(out, null, 2) + "\n", "utf8");
}

async function main() {
  const tabla = appFile("interactive-science");
  const globo = appFile("interactive-globe");
  report(fs.existsSync(tabla) && fs.existsSync(globo), "files", tabla);
  staticChecks();
  let browser;
  try {
    browser = await launchBrowser();
  } catch (err) {
    report(false, "browser", err.message);
    console.log("RED: " + fails.join("; "));
    process.exit(1);
  }
  const hashes = {};
  try {
    for (const app of ["tabla", "globo"]) {
      const file = app === "tabla" ? tabla : globo;
      for (const view of VIEW_LIST) {
        for (const theme of THEMES) {
          await auditView(browser, app, file, view, theme);
        }
      }
      const hashPage = await openApp(browser, file, VIEWS[2], "light");
      try {
        hashes[app] = await hashGlobals(hashPage.page, app);
        report(true, `${app} content hash`, hashes[app].slice(0, 12));
      } catch (err) {
        report(false, `${app} content hash`, err.message);
      } finally {
        await hashPage.context.close().catch(() => {});
      }
    }
    if (isRepo && fs.existsSync(lockPath) && hashes.tabla && hashes.globo) {
      const lock = JSON.parse(fs.readFileSync(lockPath, "utf8"));
      report(lock.tabla === hashes.tabla, "tabla content lock");
      report(lock.globo === hashes.globo, "globo content lock");
    }
    await tablaFlows(browser, tabla);
    await globoFlows(browser, globo);
    if (!quick) {
      await reducedPass(browser, "tabla", tabla);
      await reducedPass(browser, "globo", globo);
      const server = await startServer(root);
      const port = server.address().port;
      try {
        await httpPass(browser, "tabla", tabla, port);
        await httpPass(browser, "globo", globo, port);
      } finally {
        await new Promise((resolve) => server.close(resolve));
      }
    }
  } finally {
    await browser.close().catch(() => {});
  }
  scopeChecks();
  ratchet();
  writeBaselines(hashes);
  if (notes.length) console.log(`NOTES ${notes.length}`);
  if (fails.length) {
    console.log("RED: " + fails.slice(0, 16).join("; ") + (fails.length > 16 ? `; +${fails.length - 16} more` : ""));
    process.exit(1);
  }
  console.log("ALL GREEN");
}

main().catch((err) => {
  console.log("FAIL  crash — " + (err.stack || err.message));
  console.log("RED: crash " + err.message);
  process.exit(1);
});
