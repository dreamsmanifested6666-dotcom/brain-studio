"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Visual-elevation Fix 5: a single pinned cinematic moment per
 * room. Wraps any content node, pins it via GSAP ScrollTrigger
 * while a per-room visual moment plays out, fires three callbacks
 * (`onEnter` / `onLeave` / `onProgress(p)`), and respects
 * prefers-reduced-motion by skipping the progressive `onProgress`
 * ramp and firing only intersection-based `onEnter` / `onLeave`.
 *
 * Per room — one place each, by design. Restraint.
 */
type Props = {
  id: string;
  /** GSAP ScrollTrigger `start` value; default "top center". */
  start?: string;
  /** GSAP ScrollTrigger `end` value; default "+=800". */
  end?: string;
  /** Whether to pin the wrapper during the moment. */
  pin?: boolean;
  /** Fired once when the moment begins. */
  onEnter?: () => void;
  /** Fired once when the moment ends. */
  onLeave?: () => void;
  /** Fired continuously while the moment is on-screen,
   *  `p` ∈ [0, 1]. Skipped under reduced motion. */
  onProgress?: (p: number) => void;
  className?: string;
  children: React.ReactNode;
};

export default function PinnedCinematic({
  id,
  start = "top center",
  end = "+=800",
  pin = true,
  onEnter,
  onLeave,
  onProgress,
  className,
  children,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  // Cache callbacks in refs so updates don't tear down + recreate
  // the ScrollTrigger on every render.
  const enterRef = useRef(onEnter);
  const leaveRef = useRef(onLeave);
  const progressRef = useRef(onProgress);
  useEffect(() => {
    enterRef.current = onEnter;
  }, [onEnter]);
  useEffect(() => {
    leaveRef.current = onLeave;
  }, [onLeave]);
  useEffect(() => {
    progressRef.current = onProgress;
  }, [onProgress]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      end,
      pin: pin && !reduce,
      pinSpacing: pin && !reduce,
      scrub: reduce ? false : true,
      onEnter: () => enterRef.current?.(),
      onLeave: () => leaveRef.current?.(),
      onEnterBack: () => enterRef.current?.(),
      onLeaveBack: () => leaveRef.current?.(),
      onUpdate: (self) => {
        if (reduce) return;
        progressRef.current?.(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [id, start, end, pin]);

  return (
    <div ref={ref} data-pinned-cinematic={id} className={className}>
      {children}
    </div>
  );
}
