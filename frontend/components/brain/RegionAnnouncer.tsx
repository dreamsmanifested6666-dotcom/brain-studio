"use client";

import { useEffect, useState } from "react";
import { useBrainStageStore } from "@/store/useBrainStageStore";
import { regionById, type RegionId } from "@/lib/regions";

/**
 * Screen-reader-only live region. Announces the top brain regions as
 * activations change. Throttled to one announcement every 1.6s so screen
 * reader users aren't drowned out by every micro-update during typing
 * or scrubbing.
 *
 * The announcement is concise: "Active: Broca's region (left), 79%;
 * Posterior STG (left), 64%; …". Three regions max.
 */
export default function RegionAnnouncer() {
  const activations = useBrainStageStore((s) => s.targetActivations);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const id = window.setTimeout(() => {
      const top = (
        Object.entries(activations) as [RegionId, number][]
      )
        .filter(([, v]) => (v ?? 0) > 0.3)
        .sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0))
        .slice(0, 3);
      if (top.length === 0) {
        setMessage("");
        return;
      }
      const text =
        "Active brain regions: " +
        top
          .map(([id, v]) => {
            const r = regionById[id];
            const name = r?.displayName ?? id;
            return `${name}, ${Math.round((v ?? 0) * 100)} percent`;
          })
          .join("; ") +
        ".";
      setMessage(text);
    }, 1600);
    return () => window.clearTimeout(id);
  }, [activations]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  );
}
