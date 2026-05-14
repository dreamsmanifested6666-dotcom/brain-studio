"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { pathToRoomId } from "@/lib/rooms";

/**
 * The site-wide background system.
 *
 * Renders four fixed-position layers that compose with the existing
 * body gradient + PersistentAtmosphere + BrainStage + FilmGrain stack
 * to give every page depth and texture without any motion. See
 * `app/background-system.css` for the CSS architecture and per-room
 * plate mapping.
 *
 * Layer responsibilities (per the spec):
 *   - `.bg-plate` (z -2): the historical plate, faded sepia/cool
 *     watermark. URL set per room via [data-room] CSS variables.
 *   - `.bg-halo` (z -1): radial vignette pulling the eye to centre.
 *   - `.bg-grain` (z -1): SVG turbulence tinted warm, the "alive"
 *     element. Static — the eye reads micro-variation as material.
 *
 * The room is derived from the URL via `lib/rooms.ts/pathToRoomId`.
 * That helper already knows every locale prefix (en/, th/, ja/, etc.)
 * and every room's path. New routes default to "home" automatically,
 * which the CSS reads as "use the Fludd plate at 0.04 opacity".
 *
 * Toggle: Cmd-Shift-B (Ctrl-Shift-B on Windows/Linux) hides every
 * layer. Persisted to localStorage under `brain-studio:bg-system`.
 */

const STORAGE_KEY = "brain-studio:bg-system";

export default function BackgroundSystem() {
  const pathname = usePathname();
  const room = pathToRoomId(pathname);
  const [enabled, setEnabled] = useState(true);

  // Read the toggle once on mount. We default to enabled because the
  // initial SSR render has no localStorage; we'd rather flash-on
  // than flash-off if the user has disabled it (a single repaint is
  // cheaper than the inverse).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "off") setEnabled(false);
  }, []);

  // Keyboard shortcut: Cmd-Shift-B / Ctrl-Shift-B toggles the entire
  // background stack. The state persists across reloads.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.shiftKey && (e.key === "B" || e.key === "b")) {
        e.preventDefault();
        setEnabled((prev) => {
          const next = !prev;
          window.localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
          return next;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      aria-hidden="true"
      data-room={room}
      data-bg-system={enabled ? "on" : "off"}
      // The wrapper itself doesn't paint — it's only here to scope the
      // `[data-room]` and `[data-bg-system]` CSS selectors. Each of
      // the three layers below paints from its own fixed-position
      // div, which means scrolling never displaces them.
    >
      <div className="bg-plate" />
      <div className="bg-halo" />
      <div className="bg-grain" />
    </div>
  );
}
