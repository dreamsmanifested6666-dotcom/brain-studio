import { redirect } from "next/navigation";
import AtmosphericGlow from "@/components/atmospheric/AtmosphericGlow";
import {
  Body,
  Caption,
  Display,
  Heading,
  Mono,
} from "@/components/typography/Typography";
import { Link } from "@/i18n/navigation";
import { toursForLocale } from "@/content/tours";
import { tourDuration } from "@/lib/tours";
import { getTranslations, setRequestLocale } from "next-intl/server";

/**
 * Tours index. Lists every available guided tour as a card.
 *
 * Single-tour auto-redirect: when there's only one tour available
 * (which is currently the case — "the-act-of-remembering"), the
 * index page would force the reader through an unnecessary click
 * before anything plays. Instead we redirect straight into the tour
 * so the page is autonomous: arrive at /tours and the tour begins.
 * Once a second tour ships, the index renders as before.
 */
export default async function ToursIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "tours" });
  const tours = toursForLocale(locale);

  // Autonomous mode: single tour → redirect into the player.
  if (tours.length === 1) {
    redirect(`/${locale}/tours/${tours[0].id}`);
  }

  return (
    <>
      <section className="relative px-6 pt-36 md:px-10 md:pt-44">
        <AtmosphericGlow preset="amber-lamp" position="top" intensity="subtle" />
        <div className="mx-auto max-w-[1100px]">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-3 gap-y-2 text-bone-cream/50">
              <li>
                <Link href="/" className="hover:text-brass">
                  <Caption uppercase className="tracking-[0.18em]">
                    The Brain Studio
                  </Caption>
                </Link>
              </li>
              <li aria-hidden className="text-bone-cream/30">·</li>
              <li>
                <Caption uppercase className="text-bone-cream/80 tracking-[0.18em]">
                  Tours
                </Caption>
              </li>
            </ol>
          </nav>
          <Caption uppercase className="text-brass mt-12 tracking-[0.22em]">
            {t("label")}
          </Caption>
          <Display italic className="mt-8">
            {t("title")}
          </Display>
          <Body className="text-bone-cream/65 mt-8 max-w-[36rem]">
            {t("intro")}
          </Body>
        </div>
      </section>

      <section className="relative px-6 pb-32 pt-16 md:px-10 md:pb-40 md:pt-20">
        <div className="mx-auto max-w-[1100px]">
          {tours.length === 0 ? (
            <Body italic className="text-bone-cream/70">
              {t("emptyState")}
            </Body>
          ) : (
            <div className="grid grid-cols-1 gap-12 md:gap-16">
              {tours.map((tour) => {
                const dur = tourDuration(tour);
                const mins = Math.floor(dur / 60);
                const secs = Math.round(dur % 60);
                return (
                  <Link
                    key={tour.id}
                    href={`/tours/${tour.id}` as never}
                    prefetch
                    className="border-bone-cream/10 hover:border-brass/60 group block rounded-sm border p-6 transition-colors duration-200 md:p-8"
                    data-hover
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-4">
                      <div>
                        <Mono variant="label" className="text-bone-cream/65 block">
                          {t("tour")}
                        </Mono>
                        <Heading
                          as="h3"
                          className="mt-3 font-[200] group-hover:text-brass transition-colors duration-200"
                        >
                          {tour.title}
                        </Heading>
                      </div>
                      <div className="text-right">
                        <Mono variant="value" className="text-brass leading-none">
                          {mins}:{String(secs).padStart(2, "0")}
                        </Mono>
                        <Caption uppercase className="text-bone-cream/45 mt-1 block tracking-[0.18em]">
                          {t("duration")}
                        </Caption>
                      </div>
                    </div>
                    <Body italic className="text-bone-cream/70 mt-6">
                      {tour.subtitle}
                    </Body>
                    <Body className="text-bone-cream/60 mt-4 max-w-[42rem]">
                      {tour.blurb}
                    </Body>
                    <Caption uppercase className="text-brass mt-6 inline-flex items-center gap-2 tracking-[0.18em]">
                      {t("openTour")}
                      <span
                        aria-hidden
                        className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-2"
                      >
                        →
                      </span>
                    </Caption>
                  </Link>
                );
              })}
            </div>
          )}

          <Body italic className="text-bone-cream/45 mt-16 max-w-[36rem]">
            {t("comingSoon")}
          </Body>
        </div>
      </section>

      <footer className="relative border-t border-bone-cream/10 px-6 py-12 text-center md:px-10">
        <Caption uppercase className="text-bone-cream/65">
          {t("footerNote")}
        </Caption>
      </footer>
    </>
  );
}
