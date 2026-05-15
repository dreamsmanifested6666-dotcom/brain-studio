"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "@/i18n/navigation";
import { useBrainStageStore } from "@/store/useBrainStageStore";
import { useKeyboardCommands } from "@/hooks/useKeyboardCommands";
import { pathToRoomId } from "@/lib/rooms";

/**
 * Home keystroke sequence handler.
 *
 * Watches for a fixed 7-letter sequence typed in order on the home
 * page only. On match, sets a transient activation pattern on the
 * brain, holds it, and restores the idle state. Designed to be
 * found, not announced.
 *
 * Implementation notes
 *  - Listens to every printable key via useKeyboardCommands' alpha
 *    range, gated to home. The input-focus guard from the root hook
 *    prevents the buffer from updating while typing in an input.
 *  - 2-second inter-keystroke timeout. Wrong key resets the buffer.
 *  - Reduced-motion: pattern snaps in over 1 s instead of 3 s,
 *    holds 30 s, snaps back. No drone audio (deferred to backlog).
 */

const KEYWORD = "mandala";
const KEYWORD_TIMEOUT_MS = 2000;
const HOLD_MS = 30_000;
const FADE_IN_MS = 3000;
const FADE_IN_REDUCED_MS = 1000;

// The pattern. Composed from `lib/regions` ids — readable here as a
// pedagogical activation map.
const PATTERN: Record<string, number> = {
  precuneus: 0.92,
  pcc: 0.88,
  agl_left: 0.78,
  agl_right: 0.78,
  dmpfc: 0.7,
  amyg_left: 0.15,
  amyg_right: 0.15,
};

export default function KeystrokeSequenceHandler() {
  const pathname = usePathname();
  const setActivations = useBrainStageStore((s) => s.setActivations);
  const resetIdle = useBrainStageStore((s) => s.resetIdle);

  // Mutable typing buffer kept in a ref — never in React state so a
  // keystroke doesn't trigger a re-render.
  const buffer = useRef("");
  const lastKeyTime = useRef(0);
  const sequenceRef = useRef<{
    fadeIn: number | null;
    hold: number | null;
  }>({ fadeIn: null, hold: null });

  // The matching predicate. Lowercase the key, check whether it
  // extends our current buffer toward the keyword; otherwise reset.
  const tryAdvance = (key: string) => {
    const now = performance.now();
    if (now - lastKeyTime.current > KEYWORD_TIMEOUT_MS) {
      buffer.current = "";
    }
    lastKeyTime.current = now;
    const lower = key.toLowerCase();
    // Single-character alpha keys only. Anything else (Shift, F12,
    // Enter, etc.) resets the buffer rather than passing through.
    if (!/^[a-z]$/.test(lower)) {
      buffer.current = "";
      return false;
    }
    const next = buffer.current + lower;
    if (!KEYWORD.startsWith(next)) {
      // If the new key matches the start of the keyword on its own,
      // begin a fresh attempt with this single character. Otherwise
      // wipe.
      buffer.current = KEYWORD.startsWith(lower) ? lower : "";
      return false;
    }
    buffer.current = next;
    return next === KEYWORD;
  };

  const fire = () => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fadeMs = reduced ? FADE_IN_REDUCED_MS : FADE_IN_MS;

    // Cancel any prior in-flight sequence (e.g. the reader fired
    // twice in 30 s — second one wins).
    if (sequenceRef.current.fadeIn) {
      window.clearTimeout(sequenceRef.current.fadeIn);
    }
    if (sequenceRef.current.hold) {
      window.clearTimeout(sequenceRef.current.hold);
    }

    setActivations(PATTERN);

    // After fade + hold, restore idle. We use a single timer for the
    // total dwell window so the existing per-region smoothing inside
    // BrainAnatomy handles the return ramp.
    sequenceRef.current.hold = window.setTimeout(() => {
      resetIdle();
      sequenceRef.current.hold = null;
    }, fadeMs + HOLD_MS);
  };

  // Register one keyboard command per letter in the keyword. We do
  // this letter-by-letter rather than catching every alpha keypress
  // because useKeyboardCommands' matcher is exact on `key`. The set
  // is fixed and small so listing them out is fine.
  const letters = Array.from(new Set(KEYWORD.split(""))).join("");
  useKeyboardCommands(
    letters.split("").map((letter) => ({
      id: `kw:${letter}`,
      key: letter,
      preventDefault: false, // typing on the page must still scroll
      when: () => pathToRoomId(pathname) === "home",
      onPress: (e) => {
        if (tryAdvance(e.key)) {
          buffer.current = "";
          fire();
        }
      },
    })),
  );

  useEffect(() => {
    return () => {
      if (sequenceRef.current.fadeIn) {
        window.clearTimeout(sequenceRef.current.fadeIn);
      }
      if (sequenceRef.current.hold) {
        window.clearTimeout(sequenceRef.current.hold);
      }
    };
  }, []);

  return null;
}
