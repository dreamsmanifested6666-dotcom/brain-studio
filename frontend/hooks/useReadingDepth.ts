"use client";

import { useEffect, useState } from "react";
import { usePathname } from "@/i18n/navigation";
import { pathToRoomId } from "@/lib/rooms";

/**
 * Reading-depth tracker.
 *
 * Three localStorage flags track whether the reader has earned a
 * single quiet closing note at the bottom of a small set of pages:
 *
 *   bs_visited        — already exists (set by Fix 12 after a 30 s
 *                       intentional first-visit dwell).
 *   bs_total_time_ms  — cumulative time across visits, while the
 *                       tab is visible. Updated every second.
 *   bs_deep_reads     — JSON array of room ids the reader scrolled
 *                       past 80 % of, per page.
 *
 * Eligibility (returned as `eligible`):
 *   visited === "true"
 *   AND deep_reads.length >= 3
 *   AND total_time_ms >= 600_000     (10 minutes)
 *
 * A separate flag `bs_hint_shown` is flipped once the closing note
 * has been rendered for an eligible reader; after that the hook
 * returns `eligible: false` so the note never re-renders.
 *
 * All writes are visibilitychange / beforeunload safe — the time
 * counter pauses while the tab is hidden, then persists on hide.
 */

const KEY_VISITED = "bs_visited";
const KEY_TOTAL_TIME = "bs_total_time_ms";
const KEY_DEEP_READS = "bs_deep_reads";
const KEY_SHOWN = "bs_hint_shown";
const THRESHOLD_TIME_MS = 600_000;
const THRESHOLD_DEEP_READS = 3;
const SCROLL_DEPTH_THRESHOLD = 0.8;
const SCROLL_THROTTLE_MS = 2000;

function readJsonArray(key: string): string[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x): x is string => typeof x === "string");
  } catch {
    return [];
  }
}

function readNumber(key: string): number {
  try {
    const raw = localStorage.getItem(key);
    return raw ? Number(raw) || 0 : 0;
  } catch {
    return 0;
  }
}

function readBool(key: string): boolean {
  try {
    return localStorage.getItem(key) === "true";
  } catch {
    return false;
  }
}

function writeBool(key: string, on: boolean) {
  try {
    localStorage.setItem(key, on ? "true" : "false");
  } catch {
    /* swallow */
  }
}

export type ReadingDepth = {
  eligible: boolean;
  shown: boolean;
  /** Mark the closing note as having been rendered. Idempotent. */
  markShown: () => void;
};

export function useReadingDepth(): ReadingDepth {
  const pathname = usePathname();
  const [eligible, setEligible] = useState(false);
  const [shown, setShown] = useState(false);

  // Re-evaluate eligibility on mount and whenever the route changes
  // — the latter so a reader who crosses the threshold mid-session
  // (e.g. by reading deeply through a third room) gets the note on
  // the page they're currently looking at, not only next time.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const visited = readBool(KEY_VISITED);
    const totalMs = readNumber(KEY_TOTAL_TIME);
    const deepReads = readJsonArray(KEY_DEEP_READS);
    const alreadyShown = readBool(KEY_SHOWN);
    setShown(alreadyShown);
    setEligible(
      !alreadyShown &&
        visited &&
        deepReads.length >= THRESHOLD_DEEP_READS &&
        totalMs >= THRESHOLD_TIME_MS,
    );
  }, [pathname]);

  // Time accumulator. Increments while the tab is visible. Persist
  // on visibilitychange and beforeunload.
  useEffect(() => {
    if (typeof window === "undefined") return;
    let accumulated = 0;
    let lastTick = performance.now();
    let timer: number | null = null;

    const flush = () => {
      const prior = readNumber(KEY_TOTAL_TIME);
      try {
        localStorage.setItem(
          KEY_TOTAL_TIME,
          String(prior + accumulated),
        );
      } catch {
        /* swallow */
      }
      accumulated = 0;
    };

    const tick = () => {
      const now = performance.now();
      if (document.visibilityState === "visible") {
        accumulated += now - lastTick;
      }
      lastTick = now;
      // Flush every ~30 s so a hard kill / crash doesn't lose much.
      if (accumulated >= 30_000) flush();
    };

    timer = window.setInterval(tick, 1000);

    const onVis = () => {
      lastTick = performance.now();
      if (document.visibilityState === "hidden") flush();
    };
    const onUnload = () => flush();

    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("beforeunload", onUnload);

    return () => {
      flush();
      if (timer !== null) window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("beforeunload", onUnload);
    };
  }, []);

  // Deep-read detection. Throttled scroll listener; when scroll
  // progress on the current page crosses 0.8, add the room id to
  // the persisted set.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const room = pathToRoomId(pathname);
    if (!room || room === "home") return;
    let lastFire = 0;

    const onScroll = () => {
      const now = performance.now();
      if (now - lastFire < SCROLL_THROTTLE_MS) return;
      lastFire = now;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = window.scrollY / scrollable;
      if (progress < SCROLL_DEPTH_THRESHOLD) return;
      // Record this room as a deep read.
      const reads = readJsonArray(KEY_DEEP_READS);
      if (reads.includes(room)) return;
      reads.push(room);
      try {
        localStorage.setItem(KEY_DEEP_READS, JSON.stringify(reads));
      } catch {
        /* swallow */
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return {
    eligible,
    shown,
    markShown: () => {
      writeBool(KEY_SHOWN, true);
      setShown(true);
      setEligible(false);
    },
  };
}
