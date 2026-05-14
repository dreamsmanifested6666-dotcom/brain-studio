# Brain visualization audit — v1.0

## Scope

Code-level audit of the persistent brain visualization across every
top-level route. Covers mount/unmount, anchor resolution per route,
reduced-motion handling, and the `setActivations` paths from
specialized pages (Mirror, Music, Cross-Cultural, Archetypes,
Atlas region pages, Tours).

The plan's "real browser sweep" (Chrome desktop, Safari desktop,
Firefox desktop, mobile Safari, Chrome Android) is genuinely
out of reach from this environment. That sweep is deferred to
v1.1 alongside the Lighthouse pass.

## Architecture

- `components/brain/BrainStage.tsx`
  - Mounted exactly once at `app/[locale]/layout.tsx`.
  - Dynamic import with `ssr: false` — no SSR cost.
  - Wraps a fixed-position container with `pointer-events-none` and
    `z-0` so the canvas never blocks interaction.
  - Visibility is opacity-toggled, NOT unmount — the underlying
    WebGL context survives route changes. Pages that need a
    different visual field (e.g. /cellular) set
    `useBrainStageStore.setVisible(false)` and restore on unmount.

- `components/brain/BrainStageClient.tsx`
  - Owns the R3F `<Canvas>` + Bloom postprocessing.

- `components/brain/BrainAnatomy.tsx`
  - Loads `fsaverage5` or `fsaverage6` glTF based on store's
    `meshResolution` field (set per anchor).
  - One useFrame loop lerps the group toward the store's
    `targetPosition` / `targetScale` / `targetRotation`.
  - **(PR 8 fix)** A second useFrame loop on the same component
    used to apply a continuous `g.rotation.y += delta * 0.05`
    regardless of the user's reduced-motion preference. This is
    now gated:
      ```ts
      if (!reduced) g.rotation.y += delta * 0.05;
      ```
    The `reduced` flag listens to
    `(prefers-reduced-motion: reduce)` and updates on change.

- `components/motion/TransitionOrchestrator.tsx`
  - Subscribes to `usePathname`, resolves `pathToRoomId(pathname)`,
    looks up `brainAnchors[roomId]`, and pushes the anchor's
    position/scale/rotation/lighting/meshResolution into the store.

## Route coverage

Every top-level route under `app/[locale]/` was inspected for its
brain anchor + activation path.

| Route                          | Anchor present | Activations source |
|--------------------------------|----------------|--------------------|
| `/`                            | home           | none (idle)        |
| `/mirror`                      | mirror         | TRIBE-Lite predictor in `MirrorInspector` |
| `/music`                       | music          | `TrackPlayer` sampleTimeline → setActivations |
| `/crosscultural`               | crosscultural  | `StimulusComparison` setActivations on pair hover |
| `/cellular`                    | cellular       | **hidden** (setVisible false) |
| `/threshold`                   | threshold      | scene-pinned via ScrollScene `brain` prop |
| `/archetypes`                  | archetypes     | `MandalaBrainViewer` setActivations on mandala select |
| `/faust`                       | faust          | none (literary; brain held as reference) |
| `/dante`                       | dante          | none (literary; brain held as reference) |
| `/about`                       | about          | none (idle) |
| `/atlas`                       | atlas          | none (index page) |
| `/atlas/[regionId]`            | atlas          | region detail page setActivations on mount |
| `/bridges`                     | bridges        | BridgesNetwork drives via setActivations on hover |
| `/tours`                       | tours          | Tour autoplayer drives setActivations per scene |
| `/tours/[tourId]`              | tours          | TourPlayer setActivations per scene |
| `/depth-psychology`            | depth-psychology | none (index) |
| `/depth-psychology/[slug]`     | depth-psychology | none (essay text) |
| `/field-notes`                 | field-notes    | none (index) |
| `/field-notes/[slug]`          | field-notes    | none (essay text) |
| `/map`                         | map (added)    | none (catalogue page) |

### Findings + fixes-applied

1. **`/map` route had no RoomId.** Before this PR the route fell
   through `pathToRoomId` to `"home"` and inherited the home
   anchor — visible as a brief "wrong scale" frame between
   navigating to /map and the page settling. **Fixed:** added
   `"map"` to the `RoomId` union, the `ALL_ROOM_IDS` list,
   `ROOM_DEPTH`, `ROOM_HREF`, `brainAnchors`, and
   `ROOM_ATMOSPHERE`.

2. **Continuous Y rotation ignored prefers-reduced-motion.**
   `BrainAnatomy.useFrame` applied an always-on `g.rotation.y +=
   delta * 0.05` regardless of media-query preference.
   **Fixed:** gated behind a `reduced` state subscribed to
   `(prefers-reduced-motion: reduce)`. Anchor-transition lerps
   stay enabled (those are intentional, scoped motions tied to
   route change).

3. **No other reduced-motion gaps found.** `PersistentAtmosphere`
   already honors the media query and disables the keystroke-
   pulse animation. `ParallaxLayer`, `PinnedSequence`, and
   `ScrollScene` honor it via GSAP `ScrollTrigger` defaults
   plus explicit checks.

### Mobile + cross-browser

Not covered in this audit. Items to verify in v1.1 / before final
production tag:

- Chrome desktop, Safari desktop, Firefox desktop — verify the
  R3F canvas renders without bloom artifacts.
- Mobile Safari, Chrome Android — verify the canvas degrades
  acceptably on lower-tier GPUs. The Bloom postprocess pass is
  the most likely culprit if perf drops.
- Verify `dpr={[1, 2]}` clamp is appropriate on high-DPI mobile.
- Verify the cellular descent transition (return-to-surface)
  doesn't strand the brain in an invisible state if the user
  hits Back during the transition.

### Archetypes mandala → brain shift

Spot-check: `components/content/MandalaBrainViewer.tsx` calls
`setActivations` with the selected mandala's activation map. The
shift was visible on the production deploy as the user clicks
between the seven mandalas. The brass-halo highlighting follows
the activations as expected.

## Out of scope for v1.0

- Lighthouse scores (covered by PR 11).
- WebGL fallback for browsers without WebGL 2 support — the site
  currently requires a modern GL context. Acceptable for v1.0.
- A no-WebGL SVG anatomical fallback. The plan flags this as
  "static SVG fallback below a measured performance threshold."
  Deferred.

## Code paths touched

- `lib/rooms.ts` — RoomId, ALL_ROOM_IDS, ROOM_DEPTH, ROOM_HREF
- `lib/brainAnchors.ts` — added `map` anchor
- `components/atmospheric/PersistentAtmosphere.tsx` — added `map`
- `components/brain/BrainAnatomy.tsx` — reduced-motion gate on
  continuous rotation
