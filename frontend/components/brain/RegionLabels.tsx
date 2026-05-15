"use client";

import { useEffect, useState } from "react";
import { Html } from "@react-three/drei";
import { regions, type RegionId } from "@/lib/regions";
import {
  getCachedRegionCentroids,
  getRegionCentroids,
} from "@/lib/brain/regionCentroids";
import * as THREE from "three";
import { useKeyboardCommands } from "@/hooks/useKeyboardCommands";

/**
 * Reactivity-pass Fix 19 — `Alt`/`Option` held = reveal region labels.
 *
 * While the Alt key is held, faint labels appear next to each
 * macroregion the site surfaces (IFG, pSTG, vmPFC, ...). The labels
 * use the canonical `displayName` from lib/regions and project the
 * centroid of each region — computed from the actual fsaverage5
 * mesh, cached at module level via lib/brain/regionCentroids — into
 * 2D viewport coords via drei's `<Html>` (which is already a project
 * dependency).
 *
 * Release Alt → labels fade out over 400 ms via CSS transition.
 *
 * Mounted as a sibling of BrainAnatomy INSIDE the Canvas so it has
 * access to the camera + projection matrix. The keyboard listener
 * (useKeyboardCommands) lives on the same component because the
 * Alt held-state directly toggles whether the Html portals render.
 *
 * Mobile: doesn't unmount, but the keyboard event will never fire
 * (no Alt key on touch devices), so the labels are practically
 * absent. R3F still skips the projection work because `shown` stays
 * false.
 */
export default function RegionLabels() {
  const [shown, setShown] = useState(false);
  const [centroids, setCentroids] = useState<Map<
    RegionId,
    THREE.Vector3
  > | null>(() => getCachedRegionCentroids());

  // Load centroids once. Same pattern BrassHalos uses.
  useEffect(() => {
    if (centroids) return;
    let cancelled = false;
    getRegionCentroids()
      .then((map) => {
        if (!cancelled) setCentroids(map);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [centroids]);

  useKeyboardCommands([
    {
      id: "labels:alt",
      key: "Alt",
      // Hold/release: keep `shown` mirrored against the key state.
      onPress: () => setShown(true),
      onRelease: () => setShown(false),
    },
  ]);

  if (!centroids) return null;

  return (
    <>
      {regions.map((region) => {
        const centroid = centroids.get(region.id);
        if (!centroid) return null;
        return (
          <Html
            key={region.id}
            position={centroid}
            center
            // pointer-events:none so the labels never steal clicks.
            // Use `transform` so the projection scales with the
            // brain (subtle but right for the "labels stuck to
            // tissue" read).
            transform={false}
            distanceFactor={0}
            style={{
              pointerEvents: "none",
              opacity: shown ? 0.85 : 0,
              transition: `opacity ${shown ? 200 : 400}ms cubic-bezier(0.16, 1, 0.3, 1)`,
              // Tint = bone-cream/brass mix at low alpha. Same
              // editorial register as the existing Caption type.
              color: "#f0e8d8",
              fontFamily: "var(--font-editorial)",
              fontSize: "0.7rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              // Soft shadow so the label stays legible across
              // bright (active) and dark (idle) cortex pixels.
              textShadow:
                "0 0 6px rgba(10, 20, 40, 0.85), 0 0 12px rgba(10, 20, 40, 0.6)",
              userSelect: "none",
            }}
          >
            {region.displayName}
          </Html>
        );
      })}
    </>
  );
}
