/**
 * Cross-tradition mandalas + the literature-informed activation map that
 * gets pushed to the persistent brain when each one is selected.
 *
 * The activation pattern is NOT a TRIBE prediction. TRIBE was trained on
 * text / audio / video stimuli, not on "viewing a mandala." The pattern
 * is informed by published neuroimaging studies of:
 *   - visual symmetry and form processing (V1/V2/V4 + parietal)
 *   - sustained-attention meditation (anterior cingulate, dlPFC)
 *   - default-mode quietening + integration (PCC, precuneus, vmPFC)
 *   - calming of amygdala salience in contemplative looking
 *
 * Composed pedagogically. The UI labels every reading as predicted,
 * not personal, and surfaces the limitation.
 *
 * References on which the activation map draws:
 *   Brefczynski-Lewis et al. 2007 (long-term meditators)
 *   Kjaer et al. 2002 (PET during yoga meditation)
 *   Davidson & Lutz 2008 (Buddhist contemplative neuroscience)
 *   Lutz et al. 2009 (attention and meditation)
 *   Vaitl et al. 2005 (altered states + visual symmetry)
 */

import type { RegionId } from "@/lib/regions";

export type MandalaActivation = Partial<Record<RegionId, number>>;

export type Mandala = {
  id: string;
  tradition: string;
  title: string;
  date: string;
  origin: string;
  src: string;
  provenance: {
    artist: string;
    date: string;
    institution: string;
    license: string;
    source_url: string;
    note?: string;
  };
  description: string;
  jungian_reading: string;
  activation: MandalaActivation;
};

/**
 * Baseline "looking at a mandala" pattern — what published mandala-viewing
 * and contemplative-attention studies converge on. Each cultural example
 * shifts this slightly to reflect its own emphasis (e.g. the Bhavachakra
 * has heavier narrative parsing because of its didactic figures; the Sri
 * Yantra has more pure-geometric symmetry).
 */
const BASE_VIEWING: MandalaActivation = {
  // Visual cortex isn't in our 20-region set, but the closest analogues
  // we can speak to are present.
  precuneus: 0.72,   // visuospatial integration + self-referential
  pcc: 0.68,         // DMN core; engaged in contemplative looking
  agl_left: 0.55,    // heteromodal integration of form and meaning
  agl_right: 0.60,   // spatial / self-location work
  dmpfc: 0.50,       // quiet self-reflection during sustained looking
  vmpfc: 0.42,       // valuation in a low-conflict, low-stake state
  amyg_left: 0.18,   // calming of salience — note the under-activation
  amyg_right: 0.18,
};

function shift(
  base: MandalaActivation,
  overrides: MandalaActivation,
): MandalaActivation {
  return { ...base, ...overrides };
}

export const mandalas: Mandala[] = [
  {
    id: "fludd",
    tradition: "European alchemy",
    title: "De integra microcosmi harmonia",
    date: "1619",
    origin: "Robert Fludd · Utriusque Cosmi Historia",
    src: "/mandalas/fludd_microcosm.jpg",
    provenance: {
      artist: "Robert Fludd",
      date: "1619",
      institution: "Wellcome Collection, London",
      license: "Public domain (PD-old)",
      source_url:
        "https://commons.wikimedia.org/wiki/File:De_integra_microcosmi_harmonia..._Fludd,_1619_Wellcome_L0016204.jpg",
      note:
        "An engraving from Robert Fludd's two-volume cosmography correlating the human being with the cosmos.",
    },
    description:
      "Robert Fludd's engraving correlates the human microcosm with the cosmic macrocosm. Concentric rings of elements and faculties radiate from a central figure who is both contained by the cosmos and figured as its mirror. Fludd was a 17th-century English physician working in the hermetic-Paracelsian tradition; this image is one of many in his Utriusque Cosmi Historia diagramming the same intuition.",
    jungian_reading:
      "Jung admired Fludd. He read the alchemical tradition as a record of psychological work — the philosopher's stone as a symbol for the integrated Self. The microcosm-macrocosm framing in particular maps onto his claim that the individual psyche and the larger collective patterns are continuous in structure. Fludd's engraving, in Jung's reading, is one of the clearest visual statements that the self being worked on is also a self that already contains the cosmos in miniature.",
    activation: shift(BASE_VIEWING, {
      agl_left: 0.62,     // heteromodal: form + symbol + concept
      agl_right: 0.65,
      precuneus: 0.78,    // strong visuospatial integration
    }),
  },
  {
    id: "hildegard",
    tradition: "Medieval Christian",
    title: "Hildegardis-Codex illumination",
    date: "12th century",
    origin: "Anonymous illuminator · Hildegard von Bingen tradition",
    src: "/mandalas/hildegard_codex.jpg",
    provenance: {
      artist: "12th-century manuscript illuminator",
      date: "12th century",
      institution: "Biblioteca Statale di Lucca",
      license: "Public domain (PD-old, medieval manuscript)",
      source_url:
        "https://commons.wikimedia.org/wiki/File:Meister_des_Hildegardis-Codex_001.jpg",
    },
    description:
      "A 12th-century illumination from the Hildegard codex, made centuries before Jung was born. The figure of humanity is contained within concentric circles of cosmos. Hildegard's writing accompanied images like this one — visionary texts in which the structure of the world and the structure of the soul were treated as the same diagram seen at different scales.",
    jungian_reading:
      "Jung gave Hildegard credit. Her vision of humanity-in-the-cosmos is, for him, an earlier intuition of what he later named the Self — the whole field within which the conscious ego is one figure among many. The center of the image is not 'the human'; the center is the whole arrangement. Jung's individuation, in this language, is the slow work of recognizing that the cosmos was always already the larger frame.",
    activation: shift(BASE_VIEWING, {
      pcc: 0.74,           // DMN under contemplative viewing
      dmpfc: 0.58,
      vmpfc: 0.48,
    }),
  },
  {
    id: "bhavachakra",
    tradition: "Tibetan Buddhist",
    title: "Bhavachakra — the Wheel of Becoming",
    date: "Traditional iconography",
    origin: "Tibetan and Indian Buddhist tradition",
    src: "/mandalas/bhavachakra.jpg",
    provenance: {
      artist: "Anonymous (traditional iconography)",
      date: "Traditional iconography; modern photograph",
      institution: "Wikimedia Commons",
      license: "Public domain / CC-licensed",
      source_url:
        "https://commons.wikimedia.org/wiki/File:The_wheel_of_life,_Buddhism_Bhavachakra.jpg",
      note:
        "Bhavachakra — the wheel of becoming — depicts the six realms of existence and the twelve links of dependent origination.",
    },
    description:
      "The Bhavachakra — sometimes rendered as 'the wheel of life,' though 'the wheel of becoming' is closer — depicts the six realms of conditioned existence in its inner ring and the twelve links of dependent origination around its outer rim. Yama, the lord of death, holds the whole wheel; the Buddha stands outside it, pointing the way out. The image is traditionally painted at the entrance of Tibetan monasteries as a teaching device — not as a metaphysical diagram but as a map for what the meditative life is attempting.",
    jungian_reading:
      "Jung was careful about Eastern thought — he both admired it and warned against the Western tendency to appropriate it as decoration. The Bhavachakra is one of the images he read carefully. The wheel as a structure containing all realms of experience, with a center (the three poisons) and a quaternity-multiplied (six realms × twelve links), is recognizable to his framework as a mandala in the strict sense: an organization of psychic territory under a single contained form. What he hedged about was direction. The Bhavachakra suggests an exit — the Buddha pointing out. Jung's individuation suggests integration rather than escape. Different orientations within a shared visual logic.",
    activation: shift(BASE_VIEWING, {
      mtg_left: 0.55,      // narrative parsing of the wheel's figures
      mtg_right: 0.58,
      pcc: 0.72,
      precuneus: 0.78,
      agl_left: 0.60,
    }),
  },
  {
    id: "sri_yantra",
    tradition: "Hindu (Shri Vidya tradition)",
    title: "Sri Yantra",
    date: "Origins disputed; canonical form by 12th century",
    origin: "Shri Vidya tantric tradition",
    src: "/mandalas/sri_yantra.jpg",
    provenance: {
      artist: "Anonymous (traditional construction)",
      date: "Origins disputed; the canonical nine-triangle form is medieval",
      institution: "Wikimedia Commons",
      license: "Public domain (traditional geometric form, copper rendering)",
      source_url:
        "https://commons.wikimedia.org/wiki/File:Sri_Yantra_copper.jpg",
      note:
        "Nine interlocking triangles — four pointing up, five pointing down — generate forty-three smaller triangles around a central bindu.",
    },
    description:
      "The Sri Yantra is among the most precisely constructed diagrams in any visual tradition. Nine interlocking triangles — four pointing upward, five pointing downward — generate forty-three smaller triangles around a central bindu, the point. The yantra is used in Shri Vidya tantric practice as both meditative focus and ritual diagram. Its geometric construction is technically demanding; getting the nine triangles to intersect cleanly at the bindu is a non-trivial problem in plane geometry.",
    jungian_reading:
      "The Sri Yantra reads, in Jung's language, as one of the clearest visual statements of his coniunctio — the union of opposites. Triangles upward and triangles downward, in a single resolved figure. He referenced Eastern yantras explicitly when writing about mandalas and was struck by the convergence between this geometric statement of integrated polarity and the spontaneous mandalas his patients were producing in central Europe a thousand years later. Same shape. Different vocabulary. He hedged, again, about whether the convergence meant something metaphysical or whether it meant only that the psyche reaches for the same forms when working on the same problem.",
    activation: shift(BASE_VIEWING, {
      precuneus: 0.82,     // very heavy visuospatial — pure geometry
      agl_right: 0.70,
      pcc: 0.66,
      amyg_left: 0.14,     // very quiet — almost no salience pull
      amyg_right: 0.14,
    }),
  },
  {
    id: "aztec_sun_stone",
    tradition: "Mexica (Aztec)",
    title: "Piedra del Sol",
    date: "c. 1502–1521",
    origin: "Mexica monolith, Tenochtitlán",
    src: "/mandalas/aztec_sun_stone.jpg",
    provenance: {
      artist: "Mexica sculptors, Tenochtitlán",
      date: "c. 1502–1521 (carved); rediscovered 1790",
      institution: "Museo Nacional de Antropología, Mexico City",
      license: "Public domain (PD-old monolith; modern photograph on Wikimedia)",
      source_url:
        "https://commons.wikimedia.org/wiki/File:Monolito_de_la_Piedra_del_Sol.jpg",
      note:
        "The 24-ton basalt monolith carved by Mexica sculptors in the last decades before Spanish contact. Rediscovered in Mexico City in 1790.",
    },
    description:
      "The Piedra del Sol — sometimes called the Aztec Calendar Stone, though it is not strictly a calendar — is a 24-ton basalt monolith carved by Mexica sculptors in the last decades before Spanish contact. Its central face is the god Tonatiuh or the earth-monster Tlaltecuhtli, depending on interpretation. Four directional ages surround the center; an outer ring of glyphs and serpents contains the whole. The stone was buried after the Conquest and rediscovered in Mexico City in 1790; it has been the object of careful scholarly disagreement ever since.",
    jungian_reading:
      "Jung did not write about Mesoamerican imagery with the same depth he gave to alchemy or Tibetan thought; he was honest about the limits of his cultural reach. But the Sun Stone is unmistakably a mandala in his structural sense — a center, a quaternity (the four previous suns), a containment (the cosmic ring of glyphs), a break in symmetry where the cardinal directions disrupt the radial pattern. Whether Jung's framework is the right one for reading a Mexica object is a real question. The structural recognition is honest; the cultural translation requires more care than Jung himself always brought to it. Both can be true.",
    activation: shift(BASE_VIEWING, {
      precuneus: 0.74,
      agl_left: 0.62,
      mtg_right: 0.52,     // mythological / narrative inference
      atl_right: 0.55,     // person-knowledge of the deity figures
      pcc: 0.68,
    }),
  },
  {
    id: "chartres_rose",
    tradition: "Gothic Christian",
    title: "Chartres Cathedral — North Rose Window",
    date: "c. 1235",
    origin: "Cathédrale Notre-Dame de Chartres, France",
    src: "/mandalas/chartres_rose.jpg",
    provenance: {
      artist: "Anonymous master glassworkers",
      date: "c. 1235",
      institution: "Cathédrale Notre-Dame de Chartres",
      license: "PD-architecture; photograph on Wikimedia Commons",
      source_url:
        "https://commons.wikimedia.org/wiki/File:Chartres_RosetteNord_121_DSC08241.jpg",
      note:
        "The North Transept rose window at Chartres, donated by Blanche of Castile c. 1235. Mary at the center, the Old Testament kings and prophets in concentric quaternities outward.",
    },
    description:
      "The North Transept rose window at Chartres, donated by Blanche of Castile c. 1235. Mary occupies the center. The first ring is the four doves of the Holy Spirit and the seven gifts; the next is the kings of Judah; the outermost rings are prophets, angels, and the fleur-de-lis of the donor's house. The whole composition is exactly twelve meters across. It is one of three rose windows at Chartres and is widely held to be among the most theologically and geometrically considered objects of the high medieval period.",
    jungian_reading:
      "Jung read rose windows as Christian mandalas in the strict sense. A center, four (or twelve, the four tripled), a containment, an ordering of figures that places the divine and the human in fixed structural relation. For him the medieval rose window was an extraordinary example of how the same mandala impulse he was observing in his patients had already been articulated, with full theological intent, by twelfth- and thirteenth-century master glassworkers and their patrons. The image is the same shape the unconscious reaches for when it is reorganizing — except here, it has been organized deliberately, by people who knew what they were doing.",
    activation: shift(BASE_VIEWING, {
      precuneus: 0.80,     // dense radial symmetry + multi-level figure parsing
      agl_left: 0.62,
      agl_right: 0.68,
      pcc: 0.74,
      mtg_right: 0.54,     // figural / narrative content
    }),
  },
  {
    id: "splendor_solis",
    tradition: "European alchemy",
    title: "Splendor Solis — Plate 7, The Drowning King",
    date: "1582",
    origin: "Attributed to Salomon Trismosin · Harley MS 3469",
    src: "/mandalas/splendor_solis.jpg",
    provenance: {
      artist: "Attributed to Salomon Trismosin (illuminator unknown)",
      date: "1582",
      institution: "British Library, Harley MS 3469 (illuminated copy)",
      license: "Public domain (PD-old)",
      source_url:
        "https://commons.wikimedia.org/wiki/File:Splendor_Solis_07_drowning_king.jpg",
      note:
        "From the 22-plate alchemical manuscript attributed to Salomon Trismosin. The crowned king sinks into water — a stage of the work where the old ruling principle dissolves so the new can form.",
    },
    description:
      "From the Splendor Solis, a 22-plate alchemical manuscript attributed to Salomon Trismosin and illuminated in the late sixteenth century. The drowning king — also called the dissolution or solutio in alchemical literature — is one of the canonical stages of the great work. The crowned ruling principle sinks into water so that something new can form. Each plate of the Splendor Solis is bordered by intricate marginalia; the central image is always doing work, not decoration.",
    jungian_reading:
      "Jung devoted volumes 12, 13, 14, and 16 of his Collected Works to alchemy. He read the manuscripts as the most extensive surviving record of psychological work in the West before the term 'psychological' existed. The drowning king, in his reading, is a precise image: the conscious ego — the ruling principle — has to dissolve, partly and temporarily, for individuation to proceed. The image is not metaphysical chemistry. It is the alchemists trying to say something about transformation that they did not yet have psychological language for. Jung's project, in many ways, was to give them that language while preserving what they had already correctly seen.",
    activation: shift(BASE_VIEWING, {
      mtg_right: 0.58,     // strong narrative / symbolic figural content
      atl_left: 0.55,
      vmpfc: 0.52,
      amyg_right: 0.32,    // a small lift in salience — the image is unsettling
    }),
  },
];

export const mandalaById = Object.fromEntries(
  mandalas.map((m) => [m.id, m] as const),
);
