import Link from "next/link";
import {
  Body,
  Caption,
  Display,
} from "@/components/typography/Typography";

/**
 * 404. Same atmospheric chrome as the rest of the site — persistent brain
 * still mounted in the layout above.
 */
export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center px-6 pt-32">
      <div className="mx-auto max-w-[40rem] text-center">
        <Caption uppercase className="text-brass">
          Out of the training distribution
        </Caption>
        <Display italic className="mt-10">
          We didn&apos;t learn that page.
        </Display>
        <Body className="text-bone-cream/65 mt-8">
          The address you tried isn&apos;t one of the rooms we built. The
          three that exist — Mirror, Music, Cross-Cultural — are linked
          below.
        </Body>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {[
            ["/mirror", "Brain Mirror"],
            ["/music", "NeuroMusic Lab"],
            ["/crosscultural", "Cross-Cultural Brain"],
            ["/", "Home"],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              prefetch
              data-hover
              className="border-brass text-brass hover:bg-brass hover:text-navy-deep inline-flex items-center justify-center rounded-sm border px-5 py-2.5 transition-colors duration-300"
            >
              <Caption uppercase>{label}</Caption>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
