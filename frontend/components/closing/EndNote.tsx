"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Display } from "@/components/typography/Typography";
import { useReadingDepth } from "@/hooks/useReadingDepth";

/**
 * Closing note.
 *
 * Renders a single line of italic display prose at the bottom of
 * threshold / archetypes / about for readers who have crossed a
 * cumulative reading-depth threshold. Conditionally rendered, never
 * styled-as-hidden — when the predicate is false the component
 * returns null and the line is absent from the DOM entirely.
 *
 * Fade-in: 800 ms after the preceding closing line scrolls fully
 * into the viewport (IntersectionObserver, threshold 1.0), the
 * line transitions from opacity 0 to 0.45 over 2 s.
 *
 * Reduced motion: renders at opacity 0.45 immediately, no fade.
 *
 * After first display, the markShown callback persists a flag so
 * subsequent eligibility checks short-circuit and the line never
 * re-renders.
 */
export default function EndNote() {
  const { eligible, shown, markShown } = useReadingDepth();
  const t = useTranslations("endNote");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  // Once we decide to render this instance (eligibility passed on
  // mount), keep rendering it for the lifetime of this component —
  // even after markShown() flips the persisted `shown` flag to true.
  // Otherwise the fade-in would re-render the component to null
  // mid-animation.
  const [latched, setLatched] = useState(false);

  // Latch on mount if eligibility holds.
  useEffect(() => {
    if (eligible && !shown && !latched) setLatched(true);
  }, [eligible, shown, latched]);

  // prefers-reduced-motion check, standard pattern.
  useEffect(() => {
    if (typeof window === "undefined") return;
    setReduced(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  // IntersectionObserver watches THIS element. When fully in view,
  // wait 800 ms, then fade to visible.
  useEffect(() => {
    if (!latched) return;
    const el = containerRef.current;
    if (!el) return;
    if (reduced) {
      setVisible(true);
      markShown();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 1.0) {
            window.setTimeout(() => {
              setVisible(true);
              markShown();
            }, 800);
            io.disconnect();
          }
        }
      },
      { threshold: 1.0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [latched, reduced, markShown]);

  // Strict conditional render — element is absent from DOM for
  // ineligible readers. View-source / DevTools never sees it. The
  // `latched` flag keeps the instance mounted for the lifetime of
  // the page once eligibility was met, so the fade can complete
  // without React unmounting us mid-transition.
  if (!latched && (!eligible || shown)) return null;

  return (
    <div
      ref={containerRef}
      className="mx-auto mt-32 max-w-[36rem] text-center"
      style={{
        opacity: visible ? 0.45 : 0,
        transition: reduced
          ? "none"
          : "opacity 2000ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <Display italic as="div">
        {t("text")}
      </Display>
    </div>
  );
}
