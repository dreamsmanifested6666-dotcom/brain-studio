"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { localeMeta, type Locale } from "@/i18n/locales";

/**
 * Translation-status banner. Renders only when the active locale is
 * non-English and its tier-1 strings have not been native-reviewed
 * (per `localeMeta[locale].tier1Reviewed`). The user can dismiss it
 * per session; it reappears in a new session.
 *
 * Placement: top of the page below the persistent header. The banner
 * is informational, never blocking. JetBrains-Mono caption-sized,
 * bone-cream tinted with a brass border-top so it reads as an
 * editorial note rather than a system warning.
 *
 * Voice: matches the rest of the site — quiet, honest, brief. Says
 *   1. what kind of translation this is (machine-assisted)
 *   2. that it is awaiting native review
 *   3. that English is canonical
 *
 * Strings live under `translationStatus` in each messages/<locale>.json,
 * so the banner itself speaks the active locale.
 */
export default function TranslationStatusBanner() {
  const locale = useLocale() as Locale;
  const t = useTranslations("translationStatus");
  const meta = localeMeta[locale];

  // Server-rendered initial value; hydration replaces it via effect.
  const [dismissed, setDismissed] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    try {
      const key = `translation-banner-dismissed:${locale}`;
      if (window.sessionStorage.getItem(key) === "1") {
        setDismissed(true);
      }
    } catch {
      // sessionStorage may be unavailable; ignore.
    }
  }, [locale]);

  if (!meta || meta.tier1Reviewed) return null;
  if (hydrated && dismissed) return null;

  const onDismiss = () => {
    setDismissed(true);
    try {
      window.sessionStorage.setItem(`translation-banner-dismissed:${locale}`, "1");
    } catch {}
  };

  return (
    <div
      role="note"
      aria-label={t("underReviewBanner")}
      className="border-brass/30 bg-navy-deep/80 relative z-30 border-y backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-[1440px] items-start gap-4 px-6 py-3 md:px-10">
        <span
          aria-hidden
          className="bg-brass mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full"
        />
        <p className="text-bone-cream/75 flex-1 font-mono text-[0.72rem] leading-snug italic">
          {t("underReviewBanner")}
        </p>
        <button
          type="button"
          onClick={onDismiss}
          aria-label={t("dismiss")}
          className="text-bone-cream/75 hover:text-bone-cream flex-shrink-0 transition-colors duration-150"
          data-hover
        >
          <svg
            viewBox="0 0 16 16"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            aria-hidden
          >
            <line x1="4" y1="4" x2="12" y2="12" />
            <line x1="12" y1="4" x2="4" y2="12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
