"use client";

import { useTranslations } from "next-intl";
import { Caption } from "@/components/typography/Typography";

/**
 * Persistent honesty marker inside the Mirror viewport.
 *
 * The Mirror's prediction backend is BGE-small embedding similarity,
 * not a TRIBE forward pass. The About page surfaces this via
 * `ProvenanceBadge`; the AttributionChip surfaces it in the result
 * band after a prediction settles. Neither is visible *during*
 * typing, when the reader is mostly forming an impression of what
 * the room is doing.
 *
 * This badge is the missing in-viewport caveat: a small Caption
 * uppercase line in brass with a status dot, visible above the
 * textarea at all times. Visual register matches the
 * AttributionChip — same status-dot pattern, same Caption type, so
 * a reader reading both at once sees one consistent honesty
 * convention.
 */
export default function MirrorCaveatBadge() {
  const t = useTranslations("mirror");
  return (
    <div className="mb-3 flex items-center gap-2">
      <span
        aria-hidden
        className="bg-brass/60 inline-block h-1.5 w-1.5 rounded-full"
      />
      <Caption
        uppercase
        className="text-brass/75 tracking-[0.22em]"
      >
        {t("caveatBadge")}
      </Caption>
    </div>
  );
}
