import { Display } from "@/components/typography/Typography";

/**
 * Home page hero. Renders the three lines as one <Display italic> with
 * each word entering in a 50ms stagger.
 *
 * Stagger is a CSS keyframe (see globals.css `.hero-word`) — pure CSS so
 * there are no Framer Motion hydration races in Next 16 / React 19 strict.
 * Per-word animation-delay is set inline.
 */
export default function HeroDisplay({
  line1,
  line2,
  line3,
  className = "",
}: {
  line1: string;
  line2: string;
  line3: string;
  className?: string;
}) {
  const lines = [line1, line2, line3];
  // Build a flat sequence so the staggered delays are continuous across lines.
  let wordIndex = 0;
  return (
    <Display
      italic
      className={`text-bone-cream mx-auto max-w-[18ch] ${className}`}
    >
      <span className="sr-only">{lines.join(" ")}</span>
      <span aria-hidden className="block">
        {lines.map((line, li) => {
          const words = line.split(" ");
          return (
            <span key={li} className="block">
              {words.map((word, wi) => {
                const delay = 0.18 + wordIndex * 0.06;
                wordIndex++;
                const last = wi === words.length - 1;
                return (
                  <span
                    key={`${li}-${wi}`}
                    className="hero-word"
                    style={{ animationDelay: `${delay}s` }}
                  >
                    {word}
                    {last ? "" : " "}
                  </span>
                );
              })}
            </span>
          );
        })}
      </span>
    </Display>
  );
}
