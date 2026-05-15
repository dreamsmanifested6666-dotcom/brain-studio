"use client";

import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Suspense } from "react";
import BrainAnatomy from "./BrainAnatomy";
import BrainLighting from "./BrainLighting";
import CursorLight from "./CursorLight";

/**
 * The persistent R3F canvas. Mounted once at root layout and never
 * unmounts. Driven by `useBrainStageStore`.
 *
 * Visualization: the anatomical fsaverage mesh (5 or 6 depending on the
 * store's meshResolution). Bloom postprocessing glows active regions.
 */
export default function BrainStageClient() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.0], fov: 32 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
    >
      <Suspense fallback={null}>
        <BrainLighting />
        <BrainAnatomy />
        {/* Visual-elevation Fix 7 — a warm point light that
            follows the cursor and gives the cortex a specular
            highlight as the reader moves. Self-gates to null on
            mobile so phones pay no GPU cost. */}
        <CursorLight />
        {/* Visual-elevation Fix 1 + hotfix: bloom retuned per
            brief — threshold 0.52 so the idle brain doesn't blow
            out into a white blob but active regions still cross
            the floor and halo, radius 0.65 reads as a soft glow
            around regions, intensity 0.7 keeps it restrained
            now that the brain's emissive base contributes more
            consistently than the pre-elevation vertex-paint path. */}
        <EffectComposer enableNormalPass={false}>
          <Bloom
            intensity={0.7}
            luminanceThreshold={0.52}
            luminanceSmoothing={0.22}
            mipmapBlur
            radius={0.65}
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
