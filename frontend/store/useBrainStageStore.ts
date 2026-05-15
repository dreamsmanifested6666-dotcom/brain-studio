"use client";

import { create } from "zustand";

export type BrainLightingPreset = "cinematic" | "warm" | "clinical";
export type MeshResolution = "fsaverage5" | "fsaverage6";

export type Vec3 = readonly [number, number, number];

export type RegionActivations = Readonly<Record<string, number>>;

/**
 * PR-A (v1.0 real-fMRI pipeline). Parcel-level activations keyed by
 * HCP-MMP-360 parcel ID as a string (e.g. "44_L", "v23ab_R"). When
 * non-empty, BrainAnatomy renders per-parcel coloring (the new
 * authoritative path); when empty, the renderer falls back to the
 * 20-region `targetActivations` map so pages that haven't yet been
 * wired to load precomputed Neurosynth JSON still display.
 */
export type ParcelActivations = Readonly<Record<string, number>>;

export type BrainStageState = {
  targetPosition: Vec3;
  targetScale: number;
  targetRotation: Vec3;
  lighting: BrainLightingPreset;
  targetActivations: RegionActivations;
  /** PR-A: HCP-MMP-360 parcel-level activations (real Neurosynth data). */
  parcelActivations: ParcelActivations;
  /**
   * Visual-elevation Fix 2: timestamp of the last user interaction
   * (keystroke in Mirror, scrubber drag in Music, pair / language
   * toggle in Cross-Cultural, video timeupdate in Encoder). The
   * idle mesh-scale breathing in BrainAnatomy pauses for 2 s after
   * this value updates so the breath doesn't compete with the
   * reader's active engagement.
   */
  lastInteractionAt: number;
  visible: boolean;
  /**
   * Which fsaverage mesh resolution the BrainAnatomy is currently rendering.
   * 'fsaverage6' (~82k vertices) is used for hero cinematic moments — home
   * and about. 'fsaverage5' (~20k vertices) is the interactive workhorse —
   * Mirror / Music / Cross-Cultural. Pages set this in their ScrollScene
   * effect; the BrainAnatomy lazy-loads the GLB it needs.
   */
  meshResolution: MeshResolution;

  setTransform: (t: {
    position?: Vec3;
    scale?: number;
    rotation?: Vec3;
  }) => void;
  setLighting: (preset: BrainLightingPreset) => void;
  setActivations: (a: RegionActivations) => void;
  /** PR-A: push HCP-MMP-360 parcel-level activations. */
  setParcelActivations: (p: ParcelActivations) => void;
  setMeshResolution: (r: MeshResolution) => void;
  setVisible: (v: boolean) => void;
  /**
   * Visual-elevation Fix 2: stamp `lastInteractionAt = Date.now()`.
   * Cheap (single setState); callers should fire on every user
   * input that engages the brain visualization.
   */
  markInteraction: () => void;
  resetIdle: () => void;
};

const idleActivations: RegionActivations = Object.freeze({});
const idleParcels: ParcelActivations = Object.freeze({});

export const useBrainStageStore = create<BrainStageState>((set) => ({
  targetPosition: [0, 0, 0],
  targetScale: 1,
  targetRotation: [0, 0, 0],
  lighting: "cinematic",
  targetActivations: idleActivations,
  parcelActivations: idleParcels,
  lastInteractionAt: 0,
  visible: true,
  meshResolution: "fsaverage5",

  setTransform: ({ position, scale, rotation }) =>
    set((s) => ({
      targetPosition: position ?? s.targetPosition,
      targetScale: scale ?? s.targetScale,
      targetRotation: rotation ?? s.targetRotation,
    })),

  setLighting: (preset) => set({ lighting: preset }),

  setActivations: (a) => set({ targetActivations: a }),

  setParcelActivations: (p) => set({ parcelActivations: p }),

  setMeshResolution: (r) => set({ meshResolution: r }),

  setVisible: (v: boolean) => set({ visible: v }),

  markInteraction: () => set({ lastInteractionAt: Date.now() }),

  resetIdle: () =>
    set({
      targetActivations: idleActivations,
      parcelActivations: idleParcels,
      lastInteractionAt: 0,
    }),
}));
