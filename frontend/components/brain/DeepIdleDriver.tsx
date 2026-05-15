"use client";

import { useEffect, useRef } from "react";
import { useBrainStageStore } from "@/store/useBrainStageStore";
import type { RegionId } from "@/lib/regions";

/**
 * Reactivity-pass Fix 11 — deep idle.
 *
 * When no `mousemove`, `scroll`, or `keydown` event fires for 20 s,
 * the brain enters a deeper state: breathing slows from 5 s to 9 s
 * (handled in BrainAnatomy via the `idleDepth` flag), emissive base
 * lifts ~8%, and a slow 4-group region cycle begins.
 *
 * The driver owns the lifecycle (timer + region scheduler). The
 * visual response lives in BrainAnatomy (breathing) and is driven
 * here for the region cycle via `setActivations` writes paced at
 * 6 s hold + 2 s crossfade.
 *
 * Reduced motion: still allows the slower breathing transition but
 * skips the region cycle so a moving reading surface doesn't sneak
 * up on a reader who explicitly asked for less motion.
 *
 * Reset is automatic: any pointermove / scroll / keydown returns
 * `idleDepth` to 0 and clears the cycle (BrainAnatomy applies a
 * 1.5 s ease-out on the cycle's residue via the per-region
 * smoothed lerp).
 *
 * Mounted once at the locale layout; piggybacks the same persistent-
 * shell lifecycle as BrainStage / RoomTemperature.
 */

const IDLE_THRESHOLD_MS = 20_000;
const HOLD_MS = 6_000;
const CROSSFADE_MS = 2_000;

// Four region groups, each held for 6 s with 2 s crossfade. Patterns
// are pedagogical "you-are-in-this-room" defaults — same shape as
// the published Neurosynth terms for each functional cluster.
type GroupId = "language" | "dmn" | "auditory" | "memory";
const GROUPS: Record<GroupId, Partial<Record<RegionId, number>>> = {
  language: {
    ifg_left: 0.78,
    pstg_left: 0.65,
    mtg_left: 0.55,
    atl_left: 0.5,
  },
  dmn: {
    vmpfc: 0.72,
    dmpfc: 0.62,
    pcc: 0.7,
    precuneus: 0.75,
  },
  auditory: {
    hg_left: 0.7,
    hg_right: 0.7,
    pstg_left: 0.55,
    pstg_right: 0.55,
  },
  memory: {
    hipp_left: 0.7,
    hipp_right: 0.7,
    amyg_left: 0.55,
    amyg_right: 0.55,
  },
};

const GROUP_ORDER: GroupId[] = ["language", "dmn", "auditory", "memory"];

export default function DeepIdleDriver() {
  const setIdleDepth = useBrainStageStore((s) => s.setIdleDepth);
  const setActivations = useBrainStageStore((s) => s.setActivations);
  const resetIdle = useBrainStageStore((s) => s.resetIdle);

  // Last user interaction timestamp (independent of the store's
  // lastInteractionAt, which is only stamped by specific UI inputs
  // — keystrokes in Mirror, scrubber drags, etc.). Here we listen
  // for any pointermove / scroll / keydown anywhere on the page.
  const lastEvent = useRef<number>(performance.now());
  const inDeepIdleRef = useRef(false);
  const groupIndexRef = useRef(0);
  const cycleTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const onActivity = () => {
      lastEvent.current = performance.now();
      if (inDeepIdleRef.current) {
        // Exit deep idle. BrainAnatomy applies the 1.5 s ease-out on
        // the breathing transition. The region cycle is cleared
        // immediately so the brain settles back to whatever the
        // current page's idle state is.
        inDeepIdleRef.current = false;
        setIdleDepth(0);
        if (cycleTimerRef.current !== null) {
          window.clearTimeout(cycleTimerRef.current);
          cycleTimerRef.current = null;
        }
        resetIdle();
      }
    };

    window.addEventListener("pointermove", onActivity, { passive: true });
    window.addEventListener("scroll", onActivity, { passive: true });
    window.addEventListener("keydown", onActivity);

    // Poll for the threshold. Cheap (one timer, one comparison) and
    // avoids racing the user's debounce.
    const poll = window.setInterval(() => {
      if (inDeepIdleRef.current) return;
      const since = performance.now() - lastEvent.current;
      if (since >= IDLE_THRESHOLD_MS) {
        inDeepIdleRef.current = true;
        setIdleDepth(1);
        if (reduced) return; // breathing slows; region cycle is off
        // Kick the cycle.
        const stepCycle = () => {
          if (!inDeepIdleRef.current) return;
          const group = GROUP_ORDER[groupIndexRef.current];
          setActivations(GROUPS[group] as Record<string, number>);
          groupIndexRef.current =
            (groupIndexRef.current + 1) % GROUP_ORDER.length;
          cycleTimerRef.current = window.setTimeout(
            stepCycle,
            HOLD_MS + CROSSFADE_MS,
          );
        };
        stepCycle();
      }
    }, 1000);

    return () => {
      window.removeEventListener("pointermove", onActivity);
      window.removeEventListener("scroll", onActivity);
      window.removeEventListener("keydown", onActivity);
      window.clearInterval(poll);
      if (cycleTimerRef.current !== null) {
        window.clearTimeout(cycleTimerRef.current);
      }
    };
  }, [setIdleDepth, setActivations, resetIdle]);

  return null;
}
