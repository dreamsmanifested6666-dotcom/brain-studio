"use client";

import ScrollScene from "@/components/motion/ScrollScene";
import PinnedSequence, { PinnedStep } from "@/components/motion/PinnedSequence";
import ParallaxLayer from "@/components/motion/ParallaxLayer";
import { signaturePatterns } from "@/lib/regions";

/**
 * Debug harness for the scroll-as-camera system.
 * Five distinct scroll scenes proving:
 *   - The persistent brain moves between positions
 *   - Lighting crossfades
 *   - PinnedSequence reveals steps with scroll progress
 *   - ParallaxLayer drifts at non-scroll speed
 */
export default function TestScrollPage() {
  return (
    <main>
      {/* Scene 1 — center */}
      <ScrollScene
        id="t-center"
        brain={{ position: [0, 0, 0], scale: 1, rotation: [0, 0, 0] }}
        lighting="cinematic"
        className="relative flex min-h-screen items-center justify-center px-6"
      >
        <div className="mx-auto max-w-[36rem] text-center">
          <p className="text-brass font-display text-xs uppercase tracking-[0.32em]">
            Test scroll
          </p>
          <h1 className="font-display text-bone-cream mt-8 text-balance text-4xl md:text-5xl">
            Center, cinematic.
          </h1>
          <p className="text-bone-cream/70 mt-8">
            Scroll down to watch the brain glide between camera positions.
          </p>
        </div>
      </ScrollScene>

      {/* Scene 2 — brain glides left, warm */}
      <ScrollScene
        id="t-left-warm"
        brain={{
          position: [-1.0, 0, 0],
          scale: 0.7,
          rotation: [0, 0.35, 0],
          activations: signaturePatterns.mirror,
        }}
        lighting="warm"
        className="relative grid min-h-screen grid-cols-1 items-center px-6 md:grid-cols-2"
      >
        <div />
        <div className="max-w-[28rem]">
          <h2 className="font-display text-bone-cream text-3xl md:text-4xl">
            Left, warm.
          </h2>
          <p className="text-bone-cream/70 mt-6 text-base leading-[1.65]">
            The brain glides to the left third and the lighting softens.
            Activations light the language regions.
          </p>
        </div>
      </ScrollScene>

      {/* Scene 3 — pinned sequence */}
      <ScrollScene
        id="t-pinned"
        brain={{
          position: [0, 0, 0],
          scale: 1,
          rotation: [0, 0, 0],
          activations: signaturePatterns.music,
        }}
        lighting="cinematic"
      >
        <PinnedSequence steps={3}>
          <PinnedStep>
            <div className="mx-auto max-w-[34rem] text-center">
              <p className="text-brass font-display text-xs uppercase tracking-[0.32em]">
                Pinned · step one
              </p>
              <h2 className="font-display text-bone-cream mt-8 text-4xl">
                One sentence.
              </h2>
            </div>
          </PinnedStep>
          <PinnedStep>
            <div className="mx-auto max-w-[34rem] text-center">
              <p className="text-brass font-display text-xs uppercase tracking-[0.32em]">
                Pinned · step two
              </p>
              <h2 className="font-display text-bone-cream mt-8 text-4xl">
                Then another.
              </h2>
            </div>
          </PinnedStep>
          <PinnedStep>
            <div className="mx-auto max-w-[34rem] text-center">
              <p className="text-brass font-display text-xs uppercase tracking-[0.32em]">
                Pinned · step three
              </p>
              <h2 className="font-display text-bone-cream mt-8 text-4xl">
                And the brain held still through all of them.
              </h2>
            </div>
          </PinnedStep>
        </PinnedSequence>
      </ScrollScene>

      {/* Scene 4 — clinical lighting */}
      <ScrollScene
        id="t-clinical"
        brain={{
          position: [1.0, 0.4, 0],
          scale: 0.55,
          rotation: [0, -0.4, 0],
          activations: signaturePatterns.crosscultural,
        }}
        lighting="clinical"
        className="relative flex min-h-screen items-center px-6"
      >
        <div className="mx-auto max-w-[36rem]">
          <h2 className="font-display text-bone-cream text-3xl md:text-4xl">
            Top-right, clinical.
          </h2>
          <p className="text-bone-cream/70 mt-6 text-base leading-[1.65]">
            The brain shrinks to the corner. Lighting goes cool and even — the
            data view.
          </p>
          <ParallaxLayer speed={0.55} className="mt-12">
            <p className="text-bone-cream/40 text-sm leading-[1.65]">
              This paragraph drifts at 0.55× scroll, a slow parallax that gives
              the page depth without competing with the brain for attention.
            </p>
          </ParallaxLayer>
        </div>
      </ScrollScene>

      {/* Scene 5 — back to center */}
      <ScrollScene
        id="t-end"
        brain={{ position: [0, 0, 0], scale: 1, rotation: [0, 0, 0] }}
        lighting="cinematic"
        className="relative flex min-h-screen items-center justify-center px-6"
      >
        <div className="mx-auto max-w-[36rem] text-center">
          <h2 className="font-display text-bone-cream text-4xl md:text-5xl">
            Center, again.
          </h2>
          <p className="text-bone-cream/65 mt-6">
            End of the test.
          </p>
        </div>
      </ScrollScene>
    </main>
  );
}
