#!/usr/bin/env node
/**
 * One-shot: add the four missing nav labels (atlas, bridges, tours,
 * depthPsychology) to every locale bundle. Idempotent — skips a
 * locale if all four already exist.
 *
 * Existing locale-specific equivalents are reused from each bundle's
 * existing prose (e.g. `atlas.label`, `bridges.label`, etc.) where
 * possible, so the nav label matches what the destination page uses
 * for its own heading.
 */

const fs = require("node:fs");
const path = require("node:path");

const LOCALES = ["en", "es", "ca", "th", "ja", "zh-CN"];
const MESSAGES_DIR = path.join(__dirname, "..", "messages");

const TRANSLATIONS = {
  en: {
    atlas: "Atlas",
    bridges: "Bridges",
    tours: "Tours",
    depthPsychology: "Depth Psychology",
  },
  es: {
    atlas: "Atlas",
    bridges: "Puentes",
    tours: "Recorridos",
    depthPsychology: "Psicología profunda",
  },
  ca: {
    atlas: "Atles",
    bridges: "Ponts",
    tours: "Recorreguts",
    depthPsychology: "Psicologia profunda",
  },
  th: {
    atlas: "แอตลาส",
    bridges: "สะพาน",
    tours: "ทัวร์",
    depthPsychology: "จิตวิทยาเชิงลึก",
  },
  ja: {
    atlas: "アトラス",
    bridges: "橋",
    tours: "ツアー",
    depthPsychology: "深層心理学",
  },
  "zh-CN": {
    atlas: "图谱",
    bridges: "桥",
    tours: "导览",
    depthPsychology: "深度心理学",
  },
};

for (const locale of LOCALES) {
  const fp = path.join(MESSAGES_DIR, `${locale}.json`);
  const raw = fs.readFileSync(fp, "utf8");
  const data = JSON.parse(raw);
  if (!data.nav) {
    console.warn(`[skip] ${locale}: no nav namespace`);
    continue;
  }
  const t = TRANSLATIONS[locale];
  if (!t) {
    console.warn(`[skip] ${locale}: no translation table`);
    continue;
  }
  const before = JSON.stringify(data.nav);
  for (const key of Object.keys(t)) {
    if (!(key in data.nav)) data.nav[key] = t[key];
  }
  const after = JSON.stringify(data.nav);
  if (before === after) {
    console.log(`[noop] ${locale}: keys already present`);
    continue;
  }
  fs.writeFileSync(fp, JSON.stringify(data, null, 2) + "\n", "utf8");
  console.log(`[wrote] ${locale}.json — added missing nav labels`);
}
