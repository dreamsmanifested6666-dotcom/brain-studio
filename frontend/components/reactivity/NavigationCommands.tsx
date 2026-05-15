"use client";

import { useRouter, usePathname } from "@/i18n/navigation";
import { useKeyboardCommands } from "@/hooks/useKeyboardCommands";
import { useBrainStageStore } from "@/store/useBrainStageStore";
import { pathToRoomId, type RoomId } from "@/lib/rooms";

/**
 * Reactivity-pass Fix 15 + Fix 20 — navigation shortcuts.
 *
 * Esc                — return to /en (surface).
 * ArrowLeft / Right  — cycle the 7-room loop.
 *
 * Esc semantics:
 *   • If a search palette is open, Esc closes it (the palette
 *     registers its own command at higher specificity).
 *   • If museum mode is active on Archetypes, Esc exits museum mode
 *     first (museum mode owns its own Esc handler; this one yields
 *     via the `when` predicate).
 *   • If the browser is in fullscreen, Esc is consumed by the
 *     browser before reaching us — fine, that's the right behaviour.
 *   • Otherwise: router.push to /en. On the home page, Esc is a
 *     no-op so it doesn't trap the reader.
 *
 * Arrow-key rotation (Fix 20):
 *   home → mirror → music → crosscultural → threshold → archetypes
 *   → cellular → home (wraps). Reference tiers (Atlas, Bridges,
 *   Tours, Long-form, Faust, Dante) are intentionally NOT in the
 *   cinematic loop — they're navigable but not on this conveyor.
 *
 *   Undocumented. Input-focus guard handled by the root hook.
 */

const ROOM_LOOP: RoomId[] = [
  "home",
  "mirror",
  "music",
  "crosscultural",
  "threshold",
  "archetypes",
  "cellular",
];

function roomToPath(room: RoomId): string {
  return room === "home" ? "/" : `/${room}`;
}

export default function NavigationCommands() {
  const router = useRouter();
  const pathname = usePathname();
  const museumMode = useBrainStageStore((s) => s.museumMode);

  useKeyboardCommands([
    {
      id: "nav:esc",
      key: "Escape",
      // Yield to museum mode (which has its own Esc handler) when
      // active on Archetypes. Yield to the search palette (handled
      // by its own `when: open` gate). On home, Esc is a no-op so
      // the reader isn't trapped in a refresh.
      when: () =>
        pathToRoomId(pathname) !== "home" &&
        !museumMode &&
        !document.fullscreenElement,
      onPress: () => router.push("/"),
    },
    {
      id: "nav:arrow-right",
      key: "ArrowRight",
      onPress: () => {
        const current = pathToRoomId(pathname);
        const idx = ROOM_LOOP.indexOf(current);
        // If we're not on a loop room (e.g. /atlas, /about), arrow
        // sends us to mirror (the first interactive room) as a sane
        // default rather than no-oping.
        const nextIdx = idx >= 0 ? (idx + 1) % ROOM_LOOP.length : 1;
        router.push(roomToPath(ROOM_LOOP[nextIdx]));
      },
    },
    {
      id: "nav:arrow-left",
      key: "ArrowLeft",
      onPress: () => {
        const current = pathToRoomId(pathname);
        const idx = ROOM_LOOP.indexOf(current);
        const prevIdx =
          idx >= 0
            ? (idx - 1 + ROOM_LOOP.length) % ROOM_LOOP.length
            : 0; // off-loop pages send us home
        router.push(roomToPath(ROOM_LOOP[prevIdx]));
      },
    },
  ]);

  return null;
}
