/**
 * Archetype prose. Inline TS instead of MDX so we don't add an MDX pipeline
 * for this slice. Each entry is rendered as a sequence of paragraphs.
 *
 * Voice discipline: no mystifying, no reducing, no therapy-app voice.
 * Hedge appropriately. Same standard as docs/the_bridge.md.
 */

export type ArchetypeProse = {
  id: string;
  paragraphs: string[];
  citations: string[];
};

export const archetypeProse: Record<string, ArchetypeProse> = {
  shadow: {
    id: "shadow",
    paragraphs: [
      "The shadow is what you have refused to know about yourself. Not the deepest, darkest secret — those you usually know. The shadow is what you can't see because seeing it would require restructuring who you think you are. The cruelty in the gentle person. The neediness in the self-sufficient one. The contempt in the empath.",
      "Jung's claim was that everyone has one, that it isn't optional, and that pretending otherwise is the principal mechanism by which people do harm. The shadow doesn't go away by being denied; it acts out through projection. What you can't see in yourself, you see everywhere in others — often with a strange intensity that gives the projection away.",
      "Neuroscience has nothing direct to say about the shadow. There is no shadow region of the brain. But research on inhibition, suppression, and confabulation describes the mechanism by which content is held outside conscious access, and how the cost of holding it grows over time. The phenomenology is Jung's. The cost is real.",
      "Caravaggio painted himself as Goliath, the head he has the boy hold up by the hair. The self-portrait under defeat is one of the oldest moves in art. What he was looking at — what he made us look at — is what every shadow project finally requires: the willingness to see what you would rather not see, and not look away.",
    ],
    citations: ["jung-cw9i", "solms-hidden-spring"],
  },
  anima: {
    id: "anima",
    paragraphs: [
      "Jung used anima and animus to name the interior figure of the gender one is not — the contrasexual aspect of the psyche. For men, anima: the inner feminine. For women, animus: the inner masculine. He believed the unintegrated contrasexual figure was where most relational difficulty came from, because the figure gets projected onto actual people and the relationship has to carry weight that doesn't belong to it.",
      "The terms have aged in complicated ways. The strict binary of masculine and feminine that Jung worked with is not how contemporary psychology speaks. But the underlying observation survives the vocabulary: there is an interior register of one's psyche that does not match one's surface identity, and pretending otherwise has costs. Substitute language as needed. The structure he was pointing at is real.",
      "Neuroscience again has nothing direct to say about an inner figure of any specific kind. What it does have is decades of research on how strongly we model other minds, how prone we are to projecting our unrecognized parts onto them, and how difficult it is to know whether what we feel about another person is mostly about them or mostly about us.",
      "Waterhouse painted the Lady of Shalott leaving the tower. She has loosened the chain. She is going toward a death she half-knows. The painting is about an interior figure becoming visible enough to act, and the cost of that visibility. Whatever you call this figure today, the moment she steps into the boat is still a real moment in the felt life of being a self.",
    ],
    citations: ["jung-cw9i", "jung-cw6-types"],
  },
  self: {
    id: "self",
    paragraphs: [
      "The Self — capitalized — was Jung's term for the whole psyche, including the conscious ego and the much larger unconscious of which the ego is a small lit room. The lifelong work of individuation, for Jung, was the slow, often unwanted process of making more of that whole liveable to consciousness.",
      "The danger of the word, especially in pop usage, is that it sounds grand. Authentic self. True self. The wellness industry has done damage here. Jung's Self is not a perfected inner essence to be uncovered. It is the larger field a person actually lives inside, much of which they can't see and will never fully see. The work is honest commerce with that field, not arrival.",
      "Contemporary neuroscience does not endorse the term. What it does offer, increasingly, is evidence that the conscious self is a small fraction of the brain's work — that the default-mode network's quiet activity, implicit memory, predictive processing, and automatic affective appraisal carry most of the load. The architecture is not the metaphysics. But the architecture supports Jung's intuition that consciousness is the small part.",
      "Hildegard of Bingen painted the figure of humanity contained within concentric circles of cosmos, four centuries before Jung. The Self in her image is not the human at the center; it is the whole arrangement. The center is contained, not central. Jung knew her work. He drew on it. The image earns its place in this room.",
    ],
    citations: ["jung-cw9i", "jung-memories-dreams-reflections", "mcgilchrist-master-emissary"],
  },
};
