"use client";

import PinnedCinematic from "@/components/motion/PinnedCinematic";
import { useBrainStageStore } from "@/store/useBrainStageStore";

/**
 * Visual-elevation Fix 5 — Mirror moment.
 *
 * When the home page's "Language is a brain event before it is a
 * sentence" insight card enters the viewport, push a transient
 * parcel-activation map that lights the inferior frontal gyrus
 * (Broca's region: HCP-MMP parcels 44, 45, 47l on the left), holds
 * it, and clears on leave.
 *
 * Pinning is delegated to the existing ScrollScene wrapping this
 * card (pin={false} here). The brain cue is the moment; the
 * card's parallax provides the editorial pacing.
 */
export default function MirrorCueOnScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const setParcelActivations = useBrainStageStore(
    (s) => s.setParcelActivations,
  );
  const resetIdle = useBrainStageStore((s) => s.resetIdle);

  return (
    <PinnedCinematic
      id="home-mirror-moment"
      pin={false}
      start="top 70%"
      end="bottom 30%"
      onEnter={() => {
        // IFG-left parcels in HCP-MMP-360: 44 (left = 1..180 →
        // Broca's pars opercularis = "44_L" parcel id is 75 in the
        // standard ordering, but the JSON store keys parcels by
        // numeric id string. To stay format-agnostic we set the
        // 20-region path which BrainAnatomy falls back to when no
        // parcel map is provided.
        setParcelActivations({});
        useBrainStageStore.getState().setActivations({
          ifg_left: 0.95,
          pstg_left: 0.68,
          mtg_left: 0.55,
          atl_left: 0.45,
          agl_left: 0.4,
        });
      }}
      onLeave={() => {
        resetIdle();
      }}
    >
      {children}
    </PinnedCinematic>
  );
}
