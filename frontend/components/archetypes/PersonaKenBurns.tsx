"use client";

import { useRef } from "react";
import PinnedCinematic from "@/components/motion/PinnedCinematic";

/**
 * Visual-elevation Fix 5 — Archetypes Persona Ken Burns.
 *
 * Wraps the Holbein "Lady with a Squirrel and a Starling" image
 * and slowly pulls the viewport from the squirrel (lower right of
 * the portrait) up to the lady's face (upper centre) over the
 * pinned window. ~6 s when scrolled at a normal pace.
 *
 * Implemented via `transform: scale + translate` driven by
 * PinnedCinematic.onProgress. The image's natural aspect ratio
 * stays intact; we crop via `overflow-hidden` on the wrapper.
 *
 * Reduced-motion: PinnedCinematic skips the progress ramp, so the
 * image renders at its neutral transform throughout — same composition,
 * no zoom.
 */
export default function PersonaKenBurns({
  children,
}: {
  children: React.ReactNode;
}) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const apply = (scale: number, x: number, y: number) => {
    const el = wrapperRef.current;
    if (!el) return;
    el.style.transform = `scale(${scale}) translate(${x}%, ${y}%)`;
  };

  return (
    <PinnedCinematic
      id="archetypes-persona-kenburns"
      pin={false}
      start="top 80%"
      end="bottom 20%"
      onEnter={() => apply(1.45, 8, 14)} // zoom into the squirrel area
      onLeave={() => apply(1, 0, 0)} // neutral
      onProgress={(p) => {
        // Lerp from (1.45, 8%, 14%) → (1.12, 0%, -6%) — pulling
        // up to the lady's face while easing the zoom back so the
        // composition opens out as the move completes.
        const lerp = (a: number, b: number) => a + (b - a) * p;
        apply(lerp(1.45, 1.12), lerp(8, 0), lerp(14, -6));
      }}
    >
      <div
        // Crop window on the painting. Image inside gets transformed.
        className="overflow-hidden rounded-sm"
      >
        <div
          ref={wrapperRef}
          className="will-change-transform"
          style={{
            transform: "scale(1) translate(0%, 0%)",
            transformOrigin: "center center",
            transition: "transform 250ms linear",
          }}
        >
          {children}
        </div>
      </div>
    </PinnedCinematic>
  );
}
