# The Archetypes room

`/archetypes` ships six archetypes. Three are complete with verified
public-domain artworks and full prose; three are stubbed as `TODO_IMAGE`
markers awaiting verified sourcing.

## Legal constraints (enforced)

- **No Jung-authored visual artifact.** The Red Book / *Liber Novus*,
  Jung's painted mandalas, his published diagrams, and any work first
  published in his lifetime are still under copyright until at least
  2031. The Philemon Foundation and Princeton University Press hold
  active rights.
- **Only verified public-domain images.** Sources used:
  - Wikimedia Commons (PD-old, PD-art, CC0 tags)
  - Galleria Borghese, Tate Britain, Wellcome Collection,
    Biblioteca Statale di Lucca via Wikimedia
- **No AI-generated mandalas or archetype images.** The site's
  intellectual seriousness depends on showing real artifacts from the
  visual tradition Jung drew on.

## Shipped (three of six)

| Archetype | Image | Artist | Date | Institution |
|-----------|-------|--------|------|-------------|
| Shadow    | David with the Head of Goliath | Caravaggio | c. 1610 | Galleria Borghese |
| Anima     | The Lady of Shalott | John William Waterhouse | 1888 | Tate Britain |
| Self      | Liber Divinorum Operum | Hildegard von Bingen | c. 1163–1174 | Biblioteca Statale di Lucca |

Provenance for each image is embedded in `content/archetypes/manifest.json`
and surfaced to users via the ⓘ affordance on each image (see
`components/content/AttributedImage.tsx`).

## TODO_IMAGE (three of six)

The Persona, the Wise Old Man / Wise Woman, and the Trickster each
need verified public-domain sourcing before they ship. Candidates
researched for each, with the public-domain status confirmed in
principle but exact Wikimedia filenames not yet fetched:

- **Persona** — Tissot or Holbein portrait (Met Open Access or
  Wikimedia)
- **Wise Old Man** — Rembrandt's *Aristotle Contemplating the Bust of
  Homer* (Met Open Access, public domain)
- **Trickster** — Hieronymus Bosch fragment from *Garden of Earthly
  Delights* (Prado, PD-old). Cultural-sensitivity note: avoid Native
  American Coyote/Raven without explicit community clearance.

## Mandala decoration sources

Both mandalas used across `/threshold`, `/archetypes`, `/field-notes`,
and the About "two languages" section come from public-domain sources:

- **Robert Fludd**, *De integra microcosmi harmonia* from *Utriusque
  Cosmi Historia*, 1619, Wellcome Collection
- **Hildegardis-Codex**, 12th-century manuscript illumination,
  Biblioteca Statale di Lucca

The `<Mandala>` component enforces opacity ≤ 0.12 via a dev console
warning. Mandalas are atmospheric, not decorative spectacle.

## How to add a seventh archetype later

1. Verify a public-domain image source (Wikimedia, Met Open Access,
   Rijksmuseum, Wellcome). PD-old or CC0 only.
2. Download via `curl -L "https://commons.wikimedia.org/wiki/Special:FilePath/<filename>"`.
3. Place under `frontend/public/archetypes/<id>/`.
4. Add the entry to `content/archetypes/manifest.json` with
   `shipped: true` and full provenance.
5. Add the prose to `content/archetypes/prose.ts`.
6. The scene renders automatically — no further work required.

## Provenance pattern

Every artwork on this site that has provenance metadata uses
`<AttributedImage>`, which:
- Renders the image with a brass-bordered frame
- Adds a Mono caption beneath: artist · title · date · institution
- Adds a small ⓘ button in the corner that opens a provenance panel
  showing title, artist, date, institution, license, and source URL
- Links the source URL to the canonical Wikimedia / institution page

The discipline: you cannot show the picture without being able to
show where it came from.
