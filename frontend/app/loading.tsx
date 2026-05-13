import { Caption } from "@/components/typography/Typography";

/**
 * Route-level loading UI. Streams under the persistent canvas while a
 * Server Component segment is fetching. Designed to look like a moment of
 * the site's voice, not a spinner.
 */
export default function Loading() {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <div className="bg-bone-cream/10 mx-auto h-px w-32 overflow-hidden">
          <span className="bg-brass block h-full animate-[pulse-bar_1.6s_cubic-bezier(0.4,0,0.2,1)_infinite] w-1/3" />
        </div>
        <Caption uppercase className="text-bone-cream/55 mt-6 block">
          Resolving room
        </Caption>
      </div>

      <style>{`
        @keyframes pulse-bar {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  );
}
