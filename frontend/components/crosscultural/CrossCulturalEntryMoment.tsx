"use client";

import { useRef } from "react";
import PinnedCinematic from "@/components/motion/PinnedCinematic";
import { useBrainStageStore } from "@/store/useBrainStageStore";

/**
 * Visual-elevation Fix 5 — Cross-Cultural entry moment.
 *
 * On the entry pinned step ("This model was trained on English"
 * etc.), the brain tilts ~15° on its Y axis across the pin — a
 * "tilting to hear" gesture for something the model doesn't quite
 * have words for. Returns to neutral on leave.
 *
 * The tilt is additive to the room's anchor rotation (set by the
 * orchestrator), so leaving the room cleanly restores the next
 * room's anchor.
 */
export default function CrossCulturalEntryMoment({
  children,
}: {
  children: React.ReactNode;
}) {
  const setTransform = useBrainStageStore((s) => s.setTransform);
  // Capture the baseline rotation Y so the tilt rides on top of
  // whatever the room anchor wants.
  const baselineY = useRef<number | null>(null);

  return (
    <PinnedCinematic
      id="crosscultural-entry-moment"
      pin={false}
      start="top 70%"
      end="bottom 30%"
      onEnter={() => {
        const { targetRotation } = useBrainStageStore.getState();
        if (baselineY.current === null) baselineY.current = targetRotation[1];
      }}
      onLeave={() => {
        // Snap back to baseline rotation.
        if (baselineY.current !== null) {
          setTransform({ rotation: [0, baselineY.current, 0] });
        }
      }}
      onProgress={(p) => {
        // 15° = 0.2618 rad. Tilt out and back across the pin so
        // the entry feels like a question the brain is asking,
        // not a permanent reorientation.
        const tilt = 0.2618 * Math.sin(p * Math.PI);
        const base = baselineY.current ?? 0;
        setTransform({ rotation: [0, base + tilt, 0] });
      }}
    >
      {children}
    </PinnedCinematic>
  );
}
