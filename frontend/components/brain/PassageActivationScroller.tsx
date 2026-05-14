"use client";

import { useEffect, useRef, useState } from "react";
import { useBrainStageStore } from "@/store/useBrainStageStore";
import type { ParcelActivationFile } from "@/lib/loadActivations";

/**
 * PR-C — Generalized scroll-driven activation driver for pages
 * that render multiple passages/sections in a single scroll
 * (Faust, Dante, etc).
 *
 * Watches every `<element data-activation-id="<id>">` and pushes
 * the corresponding parcel-activation map into the persistent
 * brain store as the reader scrolls. Identical contract to
 * BridgesActivationScroller, generalized to any
 * `data-activation-id` markup.
 *
 * Pass the preloaded activation files (one per passage id) as a
 * prop. The component picks a sensible default on mount —
 * `defaultId` if provided, else the first id with a real file.
 */
export default function PassageActivationScroller({
  activationFiles,
  defaultId,
}: {
  activationFiles: Record<string, ParcelActivationFile | null>;
  defaultId?: string;
}) {
  const setParcelActivations = useBrainStageStore(
    (s) => s.setParcelActivations,
  );
  const resetIdle = useBrainStageStore((s) => s.resetIdle);
  const [activeId, setActiveId] = useState<string | null>(null);

  const initialRef = useRef(false);
  useEffect(() => {
    if (initialRef.current) return;
    initialRef.current = true;
    if (defaultId && activationFiles[defaultId]) {
      setActiveId(defaultId);
      return;
    }
    const fallback = Object.keys(activationFiles).find(
      (k) => activationFiles[k],
    );
    if (fallback) setActiveId(fallback);
  }, [activationFiles, defaultId]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        let best: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (!best || entry.intersectionRatio > best.intersectionRatio) {
            best = entry;
          }
        }
        if (best) {
          const id = (best.target as HTMLElement).dataset.activationId;
          if (id && activationFiles[id]) setActiveId(id);
        }
      },
      {
        rootMargin: "-25% 0px -25% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    const els = document.querySelectorAll<HTMLElement>("[data-activation-id]");
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activationFiles]);

  useEffect(() => {
    if (!activeId) return;
    const file = activationFiles[activeId];
    if (!file) return;
    setParcelActivations(file.parcel_activations);
  }, [activeId, activationFiles, setParcelActivations]);

  useEffect(() => {
    return () => resetIdle();
  }, [resetIdle]);

  return null;
}
