/**
 * Locale-translation shape for tours.
 *
 * The canonical English tours in this directory carry the full Tour
 * type with structural metadata (scene ids, durations, activeRegions,
 * brainTransforms, lighting). Translations only override the
 * localizable strings, so we avoid duplicating the structural fields
 * 5 times per tour.
 *
 * Scene narration is keyed by scene id rather than by index, so
 * scenes can be added or reordered in the English source without
 * silently corrupting translations.
 *
 * Partial coverage is safe: a missing locale key (e.g. title) or a
 * missing scene narration falls back to the canonical English value
 * via the merger in `./index.ts`.
 */

export type TourSceneTranslation = {
  narration?: string;
};

export type TourTranslation = {
  title?: string;
  subtitle?: string;
  blurb?: string;
  continueLabel?: string;
  /** Keyed by scene id (from the canonical English tour). */
  scenes?: Record<string, TourSceneTranslation>;
};
