"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Props = {
  /** 1.0 = scrolls with content. <1 = slower (further). >1 = faster (closer). */
  speed?: number;
  children: ReactNode;
  className?: string;
};

/**
 * Translates child in Y based on scroll, at `speed` relative to natural scroll.
 * Range typically 0.4 (deep background) to 1.4 (foreground accent).
 * Reduced-motion: speed forced to 1 (no translation).
 */
export default function ParallaxLayer({ speed = 0.85, children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mq.matches) return; // no translation when reduced
    }
    gsap.registerPlugin(ScrollTrigger);

    const el = ref.current;
    const offset = (speed - 1) * 200; // px of total drift per viewport scroll
    const tween = gsap.fromTo(
      el,
      { yPercent: 0 },
      {
        yPercent: offset,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
