/**
 * Move 5 — Shareable PNG fingerprint composition.
 *
 * Server-side ImageResponse rendering for the Mirror room's "export
 * 1080×1080" affordance. Uses Next.js's built-in @vercel/og under
 * the hood; renders inside Satori (SVG-based) so the brain has to be
 * SVG, not WebGL.
 *
 * Composition (museum wall card more than social-media share):
 *   Top third      eyebrow + user's text in Fraunces italic, truncated
 *                  with a brass fade-out gradient if > 400 chars.
 *   Middle third   schematic top-down brain silhouette with the 20
 *                  regions as colored dots at their stylized
 *                  positions (lib/regions.ts). Same activation
 *                  colour ramp as the live brain — five stops from
 *                  IDLE through HOT.
 *   Bottom third   caption + thin brass divider + brand line in
 *                  Mono uppercase tracking-wide + URL.
 *
 * Fonts: ImageResponse defaults are limited to system serifs; we use
 * "Georgia, serif" (Fraunces fallback) for body and a generic mono
 * for the brand line. The PNG embeds these so it renders consistently
 * wherever it's shared.
 */

import { ImageResponse } from "next/og";
import { OG_PALETTE } from "@/lib/seo";
import { regions, regionById, type RegionId } from "@/lib/regions";

export const FINGERPRINT_SIZE = { width: 1080, height: 1080 } as const;
export const FINGERPRINT_CONTENT_TYPE = "image/png";

// ── Activation colour ramp — IDENTICAL to BrainAnatomy ─────────────
// Inlined as hex strings so Satori can rasterize without a Three.js
// Color object.

const RAMP = [
  { stop: 0.0, color: "#3d4a66" }, // IDLE
  { stop: 0.33, color: "#1e6cff" }, // COLD
  { stop: 0.62, color: "#22d3ee" }, // COOL
  { stop: 0.84, color: "#fde047" }, // WARM
  { stop: 1.0, color: "#ff4f1f" }, // HOT
] as const;

function lerpColor(a: string, b: string, t: number): string {
  const pa = [parseInt(a.slice(1, 3), 16), parseInt(a.slice(3, 5), 16), parseInt(a.slice(5, 7), 16)];
  const pb = [parseInt(b.slice(1, 3), 16), parseInt(b.slice(3, 5), 16), parseInt(b.slice(5, 7), 16)];
  const r = Math.round(pa[0] + (pb[0] - pa[0]) * t);
  const g = Math.round(pa[1] + (pb[1] - pa[1]) * t);
  const bl = Math.round(pa[2] + (pb[2] - pa[2]) * t);
  return `rgb(${r}, ${g}, ${bl})`;
}

function activationColor(a: number): string {
  const v = Math.max(0, Math.min(1, a));
  for (let i = 0; i < RAMP.length - 1; i++) {
    const s0 = RAMP[i];
    const s1 = RAMP[i + 1];
    if (v >= s0.stop && v <= s1.stop) {
      const t = (v - s0.stop) / (s1.stop - s0.stop);
      return lerpColor(s0.color, s1.color, t);
    }
  }
  return RAMP[RAMP.length - 1].color;
}

// ── Top-down brain projection ────────────────────────────────────────
// regions.position is [-1, 1] in (x, y, z). For a top-down view we
// project (x, z) to a 2D circle of radius ~280 px centred at (540, 480).
// The brain isn't quite circular — slightly oval — but the dots are
// the signal, not the silhouette.

const CENTER_X = 540;
const CENTER_Y = 540;
const RADIUS = 220;

function dotPosition(pos: readonly [number, number, number]): {
  cx: number;
  cy: number;
} {
  return {
    cx: CENTER_X + pos[0] * RADIUS,
    cy: CENTER_Y - pos[2] * RADIUS, // Z forward (anterior) → up in 2D
  };
}

function shortName(id: RegionId): string {
  return regionById[id].displayName.replace(/\s*\([LR]\)\s*$/i, "");
}

function hemisphereInitial(id: RegionId): string {
  if (id.endsWith("_left")) return "L";
  if (id.endsWith("_right")) return "R";
  return "";
}

// ── Top-3 helpers ────────────────────────────────────────────────────

type Activations = Partial<Record<RegionId, number>>;

function pickTopN(activations: Activations, n: number) {
  return Object.entries(activations)
    .map(([id, v]) => ({ id: id as RegionId, v: v ?? 0 }))
    .sort((a, b) => b.v - a.v)
    .slice(0, n);
}

// ── Composition ──────────────────────────────────────────────────────

export function renderFingerprintImage(args: {
  text: string;
  activations: Activations;
  caption: string;
  locale: string;
}): ImageResponse {
  const { text, activations, caption, locale } = args;
  const top = pickTopN(activations, 3);
  const truncatedText =
    text.length > 400 ? text.slice(0, 380).trimEnd() + "…" : text;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: `linear-gradient(180deg, ${OG_PALETTE.navyDeep} 0%, ${OG_PALETTE.navyMid} 60%, ${OG_PALETTE.navyEnd} 100%)`,
          display: "flex",
          flexDirection: "column",
          color: OG_PALETTE.boneCream,
          fontFamily: "Georgia, serif",
          position: "relative",
          padding: "60px 70px",
        }}
      >
        {/*
          Top third — user's text, eyebrow above. Generous Fraunces
          italic at a large size. Truncated at ~400 chars.
        */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
            height: 320,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 18,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontFamily: "Menlo, monospace",
              color: OG_PALETTE.brass,
            }}
          >
            Brain Mirror · Your fingerprint
          </div>
          <div
            style={{
              display: "flex",
              fontSize: text.length > 200 ? 28 : 36,
              lineHeight: 1.35,
              fontStyle: "italic",
              color: OG_PALETTE.boneCream,
              marginTop: 28,
              maxHeight: 260,
              overflow: "hidden",
            }}
          >
            {truncatedText}
          </div>
        </div>

        {/*
          Middle third — schematic top-down brain. Outline ellipse +
          subtle midline + the 20 region dots colour-mapped from the
          activation pattern. Bigger dots for higher activation so the
          fingerprint reads at a glance even without colour.
        */}
        <div
          style={{
            display: "flex",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 0,
            height: 460,
          }}
        >
          <svg
            width={1080}
            height={460}
            viewBox="0 0 1080 460"
            style={{ position: "absolute" }}
          >
            {/* Cortical silhouette — peanut shape suggesting the two
                hemispheres seen top-down. */}
            <ellipse
              cx={CENTER_X}
              cy={230}
              rx={RADIUS + 30}
              ry={RADIUS + 40}
              fill={OG_PALETTE.brassMuted}
              fillOpacity={0.08}
              stroke={OG_PALETTE.brassMuted}
              strokeWidth={1.5}
            />
            {/* Inter-hemispheric fissure */}
            <line
              x1={CENTER_X}
              y1={230 - RADIUS - 40}
              x2={CENTER_X}
              y2={230 + RADIUS + 40}
              stroke={OG_PALETTE.brassMuted}
              strokeWidth={1}
              strokeOpacity={0.4}
            />
            {/* Region dots */}
            {regions.map((r) => {
              const a = activations[r.id] ?? 0;
              const { cx, cy } = dotPosition(r.position);
              // Re-center cy onto this SVG's coordinate frame.
              const sy = cy - 310;
              const fill = activationColor(a);
              const size = 18 + Math.round(a * 16); // 18..34 px
              return (
                <g key={r.id}>
                  <circle
                    cx={cx}
                    cy={sy}
                    r={size}
                    fill={fill}
                    fillOpacity={0.92}
                    stroke="rgba(240, 232, 216, 0.35)"
                    strokeWidth={1}
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/*
          Bottom third — caption + thin brass divider + brand line.
        */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
            height: 240,
            marginTop: "auto",
          }}
        >
          {/* Top-3 readout — small typographic key. */}
          <div
            style={{
              display: "flex",
              gap: 28,
              fontSize: 18,
              fontFamily: "Menlo, monospace",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(240, 232, 216, 0.7)",
            }}
          >
            {top.map((t) => (
              <div
                key={t.id}
                style={{ display: "flex", alignItems: "baseline", gap: 8 }}
              >
                <span style={{ color: OG_PALETTE.brass }}>
                  {Math.round(t.v * 100)}
                </span>
                <span>
                  {shortName(t.id)} {hemisphereInitial(t.id)}
                </span>
              </div>
            ))}
          </div>

          {/* Caption sentence — Fraunces, /70. */}
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontStyle: "italic",
              lineHeight: 1.4,
              color: "rgba(240, 232, 216, 0.7)",
              marginTop: 24,
            }}
          >
            {caption.length > 280 ? caption.slice(0, 270).trimEnd() + "…" : caption}
          </div>

          {/* Thin brass divider */}
          <div
            style={{
              width: "100%",
              height: 1,
              background: OG_PALETTE.brass,
              opacity: 0.4,
              marginTop: 24,
            }}
          />

          {/* Brand line */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 16,
              fontFamily: "Menlo, monospace",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(240, 232, 216, 0.55)",
              marginTop: 16,
            }}
          >
            <span>The Brain Studio · Brain Mirror · {locale}</span>
            <span>brain-studio-kappa.vercel.app</span>
          </div>
        </div>
      </div>
    ),
    {
      ...FINGERPRINT_SIZE,
    },
  );
}
