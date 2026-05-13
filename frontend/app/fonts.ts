import {
  Fraunces,
  JetBrains_Mono,
  Caveat,
  Noto_Serif_Thai,
  Sriracha,
  Noto_Serif_JP,
  Yusei_Magic,
  Noto_Serif_SC,
  Long_Cang,
} from "next/font/google";

/**
 * Multi-script font system.
 *
 * Latin (default — en, es, ca):
 *   --font-editorial   PP Editorial New (shimmed with Fraunces). Single
 *                      content typeface for display / heading / body /
 *                      caption. Variable axes: opsz, SOFT. Weights
 *                      200–500. Italic style requested in the same
 *                      family so we don't need a separate italic font.
 *   --font-mono        JetBrains Mono — numerical / technical only.
 *   --font-hand        Caveat — marginalia only (Hand component, 10
 *                      instance cap per page).
 *
 * Thai (th):
 *   --font-thai        Noto Serif Thai — automatic glyph fallback in the
 *                      same paragraph as Latin content.
 *   --font-thai-hand   Sriracha — Caveat-equivalent for Thai (Caveat
 *                      has no Thai glyphs).
 *
 * Japanese (ja):
 *   --font-jp          Noto Serif JP — primary serif.
 *   --font-jp-hand     Yusei Magic — Caveat-equivalent for Japanese.
 *
 * Chinese Simplified (zh-CN):
 *   --font-sc          Noto Serif SC — primary serif.
 *   --font-sc-hand     Long Cang — brush-calligraphy approximation.
 *
 * All variables are declared on the <html> element. The active locale's
 * html[lang] block in globals.css selects which to read into --font-serif
 * / --font-hand, so a paragraph of mixed scripts renders each glyph in
 * the right font automatically.
 *
 * Loading note: every locale's font is in the page weight. For locales
 * we expect to grow into (CJK), this trades a small payload increase
 * for the ability to switch languages without a roundtrip.
 */

export const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  // `--font-editorial-loaded` is the raw next/font face name. @theme
  // composes it into the public `--font-editorial` token, which html[lang]
  // blocks can safely override without recursing back into the same name.
  variable: "--font-editorial-loaded",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
  preload: true,
  fallback: ["Iowan Old Style", "Georgia", "ui-serif", "serif"],
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500"],
  preload: false,
});

export const caveat = Caveat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hand-loaded",
  weight: ["400"],
  preload: false,
});

export const notoSerifThai = Noto_Serif_Thai({
  subsets: ["thai"],
  display: "swap",
  variable: "--font-thai",
  weight: ["400", "500"],
  preload: false,
});

export const sriracha = Sriracha({
  subsets: ["thai"],
  display: "swap",
  variable: "--font-thai-hand",
  weight: ["400"],
  preload: false,
});

export const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jp",
  weight: ["400", "500", "600"],
  preload: false,
});

export const yuseiMagic = Yusei_Magic({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jp-hand",
  weight: ["400"],
  preload: false,
});

export const notoSerifSC = Noto_Serif_SC({
  display: "swap",
  variable: "--font-sc",
  weight: ["400", "500", "600"],
  preload: false,
});

export const longCang = Long_Cang({
  display: "swap",
  variable: "--font-sc-hand",
  weight: ["400"],
  preload: false,
});

export const fontVariables = [
  fraunces.variable,
  jetbrainsMono.variable,
  caveat.variable,
  notoSerifThai.variable,
  sriracha.variable,
  notoSerifJP.variable,
  yuseiMagic.variable,
  notoSerifSC.variable,
  longCang.variable,
].join(" ");
