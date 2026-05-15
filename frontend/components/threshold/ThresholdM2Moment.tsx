"use client";

import PinnedCinematic from "@/components/motion/PinnedCinematic";

/**
 * Visual-elevation Fix 5 — Threshold Movement Two moment.
 *
 * As the reader enters Movement Two, the scene gradually
 * desaturates and resaturates across the pin. The brain isn't
 * doing different activations here — it's the room's mood
 * shifting under the prose, the way a chapter break in a film
 * pulls the saturation down a half-stop and then returns.
 *
 * Implemented by writing the `--scene-saturate` CSS custom
 * property on <html>, which the locale layout composes into
 * <main>'s filter: `filter: var(--temperature-filter) saturate(...)`.
 * Progress p ∈ [0, 1] maps to a saturate curve 1 → 0.55 → 1
 * (parabolic; never goes to full grayscale because the prose
 * still needs to read).
 */
export default function ThresholdM2Moment({
  children,
}: {
  children: React.ReactNode;
}) {
  const setSat = (v: number) => {
    if (typeof document === "undefined") return;
    document.documentElement.style.setProperty("--scene-saturate", String(v));
  };

  return (
    <PinnedCinematic
      id="threshold-m2-moment"
      pin={false}
      start="top 70%"
      end="bottom 30%"
      onEnter={() => {
        // Start at full saturate; onProgress drives the curve.
        setSat(1);
      }}
      onLeave={() => {
        // Always clear back to neutral on leave (including back-scroll).
        setSat(1);
      }}
      onProgress={(p) => {
        // Parabolic dip: 1 → 0.55 → 1 across the pin.
        const dip = 1 - 4 * 0.45 * p * (1 - p);
        setSat(dip);
      }}
    >
      {children}
    </PinnedCinematic>
  );
}
