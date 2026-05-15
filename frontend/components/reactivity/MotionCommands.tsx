"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useKeyboardCommands } from "@/hooks/useKeyboardCommands";
import { useBrainStageStore } from "@/store/useBrainStageStore";

/**
 * Reactivity-pass Fix 16 + 17 + 18 — motion shortcuts.
 *
 *   F                — fullscreen toggle (browser fullscreen)
 *   Space            — pause/resume all motion (motionScale 0 ↔ 1)
 *   Shift (hold)     — slow the world (motionScale → 0.4) while held
 *
 * All three go through the root keyboard hook so the input-focus
 * guard against the Mirror textarea is consistent. Shift uses
 * onPress/onRelease for the held-key shape; F and Space are
 * simple toggles.
 *
 * Shift release uses a 1 s eased return to 1.0 (the brief calls it
 * out: "release Shift, everything returns to normal speed over 1 s
 * ease-out"). The ramp is a gsap.to on a single proxy that calls
 * setMotionScale every tick — cheaper than re-implementing an
 * inline rAF lerp.
 */
export default function MotionCommands() {
  const setMotionScale = useBrainStageStore((s) => s.setMotionScale);
  const motionScale = useBrainStageStore((s) => s.motionScale);
  const shiftRampTween = useRef<gsap.core.Tween | null>(null);
  const beforeShift = useRef<number>(1);

  // When the user clicks pause (Space), record it as the "natural"
  // motion scale so a subsequent Shift-hold doesn't override it
  // with 0.4 then return to 1 on release.
  const pauseToggleRef = useRef(false);

  useEffect(() => {
    return () => {
      shiftRampTween.current?.kill();
    };
  }, []);

  useKeyboardCommands([
    {
      id: "motion:fullscreen",
      key: "f",
      onPress: () => {
        if (typeof document === "undefined") return;
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => undefined);
        } else {
          document.documentElement
            .requestFullscreen()
            .catch(() => undefined);
        }
      },
    },
    {
      id: "motion:pause",
      key: " ", // Space
      onPress: () => {
        pauseToggleRef.current = !pauseToggleRef.current;
        setMotionScale(pauseToggleRef.current ? 0 : 1);
      },
    },
    {
      id: "motion:slow-world",
      key: "Shift",
      // Modifier-style keys fire here on press AND release because
      // we declared onRelease.
      onPress: () => {
        // Don't trample a Space-pause. If currently paused, leave
        // the scale at 0 — slow-world is a no-op when motion is
        // already frozen.
        if (pauseToggleRef.current) return;
        beforeShift.current = motionScale;
        shiftRampTween.current?.kill();
        setMotionScale(0.4);
      },
      onRelease: () => {
        if (pauseToggleRef.current) return;
        // Ease from current (could be 0.4 or anywhere mid-tween)
        // back to whatever the natural scale was when Shift went
        // down. 1 s ease-out per brief.
        shiftRampTween.current?.kill();
        const start = { v: 0.4 };
        shiftRampTween.current = gsap.to(start, {
          v: beforeShift.current,
          duration: 1,
          ease: "power2.out",
          onUpdate: () => setMotionScale(start.v),
        });
      },
    },
  ]);

  return null;
}
