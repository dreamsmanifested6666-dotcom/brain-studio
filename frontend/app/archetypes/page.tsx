import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import AtmosphericGlow from "@/components/atmospheric/AtmosphericGlow";
import Mandala from "@/components/decoration/Mandala";
import AttributedImage from "@/components/content/AttributedImage";
import {
  Body,
  Caption,
  Display,
  Hand,
  Heading,
  Mono,
} from "@/components/typography/Typography";
import { archetypeProse } from "@/content/archetypes/prose";

type ManifestImage = {
  src: string;
  title: string;
  artist: string;
  date: string;
  institution: string;
  license: string;
  source_url: string;
  note?: string;
};

type ManifestArchetype = {
  id: string;
  title: string;
  subtitle: string;
  shipped: boolean;
  todo_note?: string;
  primary_image: ManifestImage | null;
  prose_id?: string;
};

type ManifestMandala = {
  id: string;
  src: string;
  title: string;
  artist: string;
  date: string;
  institution: string;
  license: string;
  source_url: string;
};

type Manifest = {
  archetypes: ManifestArchetype[];
  mandalas: ManifestMandala[];
};

async function loadManifest(): Promise<Manifest> {
  const p = path.join(
    process.cwd(),
    "content",
    "archetypes",
    "manifest.json",
  );
  const raw = await fs.readFile(p, "utf-8");
  return JSON.parse(raw) as Manifest;
}

export default async function ArchetypesPage() {
  const manifest = await loadManifest();
  const shipped = manifest.archetypes.filter((a) => a.shipped);
  const upcoming = manifest.archetypes.filter((a) => !a.shipped);

  return (
    <>
      {/* Opening */}
      <section className="relative flex min-h-[90vh] items-center justify-center px-6 pt-36 md:px-10 md:pt-44">
        <Mandala
          src="/mandalas/hildegard_codex.jpg"
          alt="12th-century Hildegard codex illumination"
          opacity={0.07}
          rotationSeconds={300}
          position="top-[20%] left-1/2 -translate-x-1/2"
          size="w-[50rem]"
        />
        <div className="mx-auto max-w-[44rem] text-center">
          <Caption uppercase className="text-brass">
            The Archetypes
          </Caption>
          <Display italic className="mt-10">
            There are figures in the psyche that are not you.
          </Display>
          <Body className="text-bone-cream/65 mt-10">
            Carl Jung gave them names. Six are shown here, each illustrated
            with a real artifact from the visual tradition Jung drew on —
            paintings and manuscripts whose creators died long before he
            did. None of the images are Jung&apos;s own work.
          </Body>
        </div>
      </section>

      {/* Shipped archetypes */}
      {shipped.map((arch, i) => (
        <ArchetypeScene
          key={arch.id}
          archetype={arch}
          flip={i % 2 === 1}
          mandalaSrc={
            i % 2 === 0
              ? "/mandalas/fludd_microcosm.jpg"
              : "/mandalas/hildegard_codex.jpg"
          }
        />
      ))}

      {/* Upcoming archetypes (TODO_IMAGE) */}
      {upcoming.length > 0 && (
        <section className="relative px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-[44rem]">
            <Caption uppercase className="text-brass">
              Coming to this room
            </Caption>
            <Heading className="mt-6 font-[200]">Three more archetypes are scheduled.</Heading>
            <Body className="text-bone-cream/65 mt-6">
              Each of the following needs a verified public-domain artwork
              sourced before it can ship. The discipline of this room is
              that no archetype enters without an artifact whose
              provenance is documented and visible.
            </Body>
            <ul className="mt-10 space-y-8">
              {upcoming.map((a) => (
                <li key={a.id}>
                  <Caption uppercase className="text-brass">
                    {a.title}
                  </Caption>
                  <Body italic className="text-bone-cream/75 mt-2">
                    {a.subtitle}
                  </Body>
                  <Mono variant="label" className="text-bone-cream/45 mt-3 block">
                    TODO_IMAGE · {a.todo_note}
                  </Mono>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Closing */}
      <section className="relative flex min-h-[80vh] items-center px-6 pb-24 pt-32 md:px-10">
        <AtmosphericGlow preset="amber-lamp" position="bottom" intensity="subtle" />
        <Mandala
          src="/mandalas/fludd_microcosm.jpg"
          alt="Robert Fludd, De integra microcosmi harmonia"
          opacity={0.06}
          rotationSeconds={300}
          position="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          size="w-[42rem]"
        />
        <div className="mx-auto max-w-[40rem]">
          <Body className="text-bone-cream/80">
            These are not parts of the brain. They are not regions on a
            scan. They are patterns in the felt life of being a self —
            patterns old enough to have shown up in every culture&apos;s
            mythology, recurring enough to have made one psychologist try
            to give them names.
          </Body>
          <Body className="text-bone-cream/75 mt-6">
            Some of what Jung saw has been confirmed in different language
            by neuroscience. Some has not. Much of it lives in a register
            where neither neuroscience nor depth psychology can fully
            claim the territory.
          </Body>
          <Body italic className="text-bone-cream/85 mt-8 text-lg">
            This is what makes them worth keeping both languages alive for.
          </Body>
          <div className="mt-14 space-y-4">
            <div>
              <Link
                href="/threshold"
                className="text-bone-cream/70 hover:text-brass border-bone-cream/15 hover:border-brass border-b transition-colors"
              >
                <Body italic>Return to the threshold</Body>
              </Link>
            </div>
            <div>
              <Link
                href="/field-notes"
                className="text-bone-cream/70 hover:text-brass border-bone-cream/15 hover:border-brass border-b transition-colors"
              >
                <Body italic>Read the field notes</Body>
              </Link>
            </div>
            <div>
              <Link
                href="/"
                className="text-bone-cream/70 hover:text-brass border-bone-cream/15 hover:border-brass border-b transition-colors"
              >
                <Body italic>Return to the surface</Body>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative border-t border-bone-cream/10 px-6 py-12 text-center md:px-10">
        <Caption uppercase className="text-bone-cream/40">
          Sources · all artworks public domain · provenance under each ⓘ
        </Caption>
      </footer>
    </>
  );
}

function ArchetypeScene({
  archetype,
  flip,
  mandalaSrc,
}: {
  archetype: ManifestArchetype;
  flip: boolean;
  mandalaSrc: string;
}) {
  const prose = archetypeProse[archetype.prose_id ?? archetype.id];
  const img = archetype.primary_image!;
  return (
    <section className="relative px-6 py-28 md:px-10 md:py-40">
      <Mandala
        src={mandalaSrc}
        alt="Mandala decoration"
        opacity={0.05}
        rotationSeconds={300}
        position={flip ? "top-[20%] left-[-12rem]" : "top-[20%] right-[-12rem]"}
        size="w-[40rem]"
      />
      <div
        className={`mx-auto grid max-w-[1280px] grid-cols-1 gap-12 md:grid-cols-12 md:gap-16 ${
          flip ? "md:[direction:rtl]" : ""
        }`}
      >
        <div className="md:col-span-5 md:[direction:ltr]">
          <AttributedImage
            prov={img}
            width={1200}
            height={1600}
            priority={archetype.id === "shadow"}
          />
        </div>
        <div className="md:col-span-7 md:[direction:ltr]">
          <Caption uppercase className="text-brass">
            {archetype.title}
          </Caption>
          <Display
            italic
            as="h2"
            className="mt-8 md:!text-[3rem] md:!leading-[1.1]"
          >
            {archetype.subtitle}
          </Display>
          <div className="mt-10 space-y-6">
            {prose?.paragraphs.map((p, i) => (
              <Body key={i} className={i === 0 ? "" : "text-bone-cream/80"}>
                {p}
              </Body>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
