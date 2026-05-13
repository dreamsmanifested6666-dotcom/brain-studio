"use client";

import { useEffect, useState } from "react";

type Props = {
  /** Image source under /public. */
  src: string;
  /** Alt-text — usually the title of the source manuscript / engraving. */
  alt: string;
  /** Opacity. Cap is 0.12; anything higher triggers a dev console warning. */
  opacity?: number;
  /** Seconds for one full rotation. Default 180s. */
  rotationSeconds?: number;
  /** CSS position fragment — pass tailwind classes like "top-10 right-10". */
  position?: string;
  /** Width as a tailwind size class (e.g., "w-[40rem]"). Default w-[36rem]. */
  size?: string;
  /** Pointer events; default 'none' — mandalas are decoration only. */
  pointerEvents?: "none" | "auto";
};

/**
 * Atmospheric decoration. Renders a public-domain mandala (Fludd,
 * Hildegard, alchemical, etc.) at very low opacity, rotating slowly. CSS
 * transforms only — GPU accelerated, costs near zero CPU.
 *
 * Designed to be felt, not consciously noticed. A dev console warning
 * fires if you push opacity above 0.12 — the discipline is that mandalas
 * stay atmospheric, never decorative spectacle.
 *
 * Reduced motion: no rotation.
 */
export default function Mandala({
  src,
  alt,
  opacity = 0.08,
  rotationSeconds = 180,
  position = "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  size = "w-[36rem]",
  pointerEvents = "none",
}: Props) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    if (opacity > 0.12) {
      console.warn(
        `[Mandala] opacity ${opacity} exceeds the 0.12 atmospheric cap. ` +
          "Mandalas are decoration, not spectacle. Pull this back.",
      );
    }
  }, [opacity]);

  return (
    <div
      aria-hidden="true"
      className={`absolute ${position} ${size} -z-[2]`}
      style={{ pointerEvents }}
    >
      <img
        src={src}
        alt={alt}
        className="h-auto w-full"
        style={{
          opacity,
          animation: reduced
            ? "none"
            : `mandala-rotate ${rotationSeconds}s linear infinite`,
          willChange: "transform",
        }}
      />
      <style>{`
        @keyframes mandala-rotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
