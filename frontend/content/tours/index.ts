/**
 * Tour registry — locale-aware.
 *
 * Each canonical English tour module exports a full Tour with the
 * structural metadata (scene ids, durations, activeRegions,
 * brainTransforms, lighting). Per-locale translations live under
 * ./{locale}/<tour-id>.ts and export a TourTranslation — only the
 * localizable strings, keyed by scene id.
 *
 * The merger here produces a fully-typed Tour for any (id, locale)
 * pair: locale strings replace English where present, English fills
 * in where the translation is missing.
 *
 * Adding a new tour: write the canonical module here, import it,
 * register it in `tours`. Then add ./{locale}/<tour-id>.ts for each
 * locale and wire them into the `translationsByLocale` map.
 */

import type { Tour } from "@/lib/tours";
import type { TourTranslation } from "./types";
import { actOfRememberingTour } from "./the-act-of-remembering";
import { howYouReadThisSentenceTour } from "./how-you-read-this-sentence";
import { whatsStillYouTour } from "./whats-still-you-when-you-stop-trying";
import { whenSomethingMattersTour } from "./when-something-matters";
import { howAFaceBecomesSomeoneYouKnowTour } from "./how-a-face-becomes-someone-you-know";
import { hearingMusicTour } from "./hearing-music";

// Spanish
import { actOfRememberingTourEs } from "./es/the-act-of-remembering";
import { howYouReadThisSentenceTourEs } from "./es/how-you-read-this-sentence";
import { whatsStillYouTourEs } from "./es/whats-still-you-when-you-stop-trying";
import { whenSomethingMattersTourEs } from "./es/when-something-matters";
import { howAFaceBecomesSomeoneYouKnowTourEs } from "./es/how-a-face-becomes-someone-you-know";
import { hearingMusicTourEs } from "./es/hearing-music";

// Catalan
import { actOfRememberingTourCa } from "./ca/the-act-of-remembering";
import { howYouReadThisSentenceTourCa } from "./ca/how-you-read-this-sentence";
import { whatsStillYouTourCa } from "./ca/whats-still-you-when-you-stop-trying";
import { whenSomethingMattersTourCa } from "./ca/when-something-matters";
import { howAFaceBecomesSomeoneYouKnowTourCa } from "./ca/how-a-face-becomes-someone-you-know";
import { hearingMusicTourCa } from "./ca/hearing-music";

// Thai
import { actOfRememberingTourTh } from "./th/the-act-of-remembering";
import { howYouReadThisSentenceTourTh } from "./th/how-you-read-this-sentence";
import { whatsStillYouTourTh } from "./th/whats-still-you-when-you-stop-trying";
import { whenSomethingMattersTourTh } from "./th/when-something-matters";
import { howAFaceBecomesSomeoneYouKnowTourTh } from "./th/how-a-face-becomes-someone-you-know";
import { hearingMusicTourTh } from "./th/hearing-music";

// Japanese
import { actOfRememberingTourJa } from "./ja/the-act-of-remembering";
import { howYouReadThisSentenceTourJa } from "./ja/how-you-read-this-sentence";
import { whatsStillYouTourJa } from "./ja/whats-still-you-when-you-stop-trying";
import { whenSomethingMattersTourJa } from "./ja/when-something-matters";
import { howAFaceBecomesSomeoneYouKnowTourJa } from "./ja/how-a-face-becomes-someone-you-know";
import { hearingMusicTourJa } from "./ja/hearing-music";

// Chinese Simplified
import { actOfRememberingTourZhCn } from "./zh-CN/the-act-of-remembering";
import { howYouReadThisSentenceTourZhCn } from "./zh-CN/how-you-read-this-sentence";
import { whatsStillYouTourZhCn } from "./zh-CN/whats-still-you-when-you-stop-trying";
import { whenSomethingMattersTourZhCn } from "./zh-CN/when-something-matters";
import { howAFaceBecomesSomeoneYouKnowTourZhCn } from "./zh-CN/how-a-face-becomes-someone-you-know";
import { hearingMusicTourZhCn } from "./zh-CN/hearing-music";

/**
 * Canonical English tours.
 *
 * Display order: language → memory → DMN → salience → faces →
 * music. Roughly the order of cognitive depth, from the cleanest
 * sensorimotor pipeline (reading a sentence) to the most
 * integrative (the felt sense of a piece of music). Six tours, six
 * angles on the brain in motion.
 */
export const tours: Tour[] = [
  howYouReadThisSentenceTour,
  actOfRememberingTour,
  whatsStillYouTour,
  whenSomethingMattersTour,
  howAFaceBecomesSomeoneYouKnowTour,
  hearingMusicTour,
];

export const toursById: Record<string, Tour> = Object.fromEntries(
  tours.map((t) => [t.id, t]),
);

/**
 * Locale → tour id → translation. Lookups fall back to the canonical
 * English value when a key is missing.
 */
const translationsByLocale: Record<
  string,
  Record<string, TourTranslation>
> = {
  es: {
    "how-you-read-this-sentence": howYouReadThisSentenceTourEs,
    "the-act-of-remembering": actOfRememberingTourEs,
    "whats-still-you-when-you-stop-trying": whatsStillYouTourEs,
    "when-something-matters": whenSomethingMattersTourEs,
    "how-a-face-becomes-someone-you-know": howAFaceBecomesSomeoneYouKnowTourEs,
    "hearing-music": hearingMusicTourEs,
  },
  ca: {
    "how-you-read-this-sentence": howYouReadThisSentenceTourCa,
    "the-act-of-remembering": actOfRememberingTourCa,
    "whats-still-you-when-you-stop-trying": whatsStillYouTourCa,
    "when-something-matters": whenSomethingMattersTourCa,
    "how-a-face-becomes-someone-you-know": howAFaceBecomesSomeoneYouKnowTourCa,
    "hearing-music": hearingMusicTourCa,
  },
  th: {
    "how-you-read-this-sentence": howYouReadThisSentenceTourTh,
    "the-act-of-remembering": actOfRememberingTourTh,
    "whats-still-you-when-you-stop-trying": whatsStillYouTourTh,
    "when-something-matters": whenSomethingMattersTourTh,
    "how-a-face-becomes-someone-you-know": howAFaceBecomesSomeoneYouKnowTourTh,
    "hearing-music": hearingMusicTourTh,
  },
  ja: {
    "how-you-read-this-sentence": howYouReadThisSentenceTourJa,
    "the-act-of-remembering": actOfRememberingTourJa,
    "whats-still-you-when-you-stop-trying": whatsStillYouTourJa,
    "when-something-matters": whenSomethingMattersTourJa,
    "how-a-face-becomes-someone-you-know": howAFaceBecomesSomeoneYouKnowTourJa,
    "hearing-music": hearingMusicTourJa,
  },
  "zh-CN": {
    "how-you-read-this-sentence": howYouReadThisSentenceTourZhCn,
    "the-act-of-remembering": actOfRememberingTourZhCn,
    "whats-still-you-when-you-stop-trying": whatsStillYouTourZhCn,
    "when-something-matters": whenSomethingMattersTourZhCn,
    "how-a-face-becomes-someone-you-know": howAFaceBecomesSomeoneYouKnowTourZhCn,
    "hearing-music": hearingMusicTourZhCn,
  },
};

/**
 * Apply a translation onto a canonical English tour. Missing keys
 * pass through; the structural fields (id, durations, activeRegions,
 * brainTransforms, lighting) come from the canonical source.
 */
function mergeTranslation(base: Tour, t: TourTranslation | undefined): Tour {
  if (!t) return base;
  return {
    ...base,
    title: t.title ?? base.title,
    subtitle: t.subtitle ?? base.subtitle,
    blurb: t.blurb ?? base.blurb,
    continueLabel: t.continueLabel ?? base.continueLabel,
    scenes: base.scenes.map((s) => ({
      ...s,
      narration: t.scenes?.[s.id]?.narration ?? s.narration,
    })),
  };
}

/** Locale-aware single-tour lookup. Falls back to English by id. */
export function tourByIdAndLocale(
  id: string,
  locale: string,
): Tour | undefined {
  const base = toursById[id];
  if (!base) return undefined;
  return mergeTranslation(base, translationsByLocale[locale]?.[id]);
}

/** Locale-aware list of all tours, in display order. */
export function toursForLocale(locale: string): Tour[] {
  return tours.map((t) => mergeTranslation(t, translationsByLocale[locale]?.[t.id]));
}

/** Legacy English-only lookup. New code should prefer the locale-aware variant. */
export function tourById(id: string): Tour | undefined {
  return toursById[id];
}
