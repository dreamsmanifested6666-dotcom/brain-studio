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
  persona: {
    id: "persona",
    paragraphs: [
      "Persona, in the Latin theatre, was the mask the actor held to the face. Jung kept the word for what it pointed at: the face the social world meets. Not pretence exactly. Most of the time the persona is necessary and almost involuntary — the version of you that knows how to be a colleague, a daughter, a customer in a shop. The trouble is not that there is a persona. The trouble is forgetting that it is one.",
      "The clinical observation is that people who become identified with their persona — who believe the role is the whole — get into a particular kind of difficulty. The unlived parts don't disappear; they accumulate. They show up later as exhaustion, or boredom, or a slow leak of meaning, or the strange fact that a successful life feels like someone else's. Jung gave it a name: the persona inflation.",
      "Neuroscience has no persona region. What it does have is research on self-monitoring, on the prefrontal effort of maintaining a presented self, on the cost of suppression over time. The mechanism doesn't map cleanly onto Jung's term, but the cost is convergent: a self continuously performed is also a self continuously edited, and the editing has a metabolic price.",
      "Holbein's lady is composed, finished, sittable. The squirrel on her arm and the starling at her shoulder are accessories of a different order — small private creatures kept close to a public face. What the portrait is asking, very quietly, is which of them is more like her.",
    ],
    citations: ["jung-cw6-types", "solms-hidden-spring"],
  },
  wise: {
    id: "wise",
    paragraphs: [
      "The Wise Old Man — Jung's term, with the obvious caveats about gender and age — names the interior figure who carries an authority the conscious ego doesn't possess. The grandfather in the dream who knows what to do. The voice in a difficult decision that arrives uninvited and turns out to be right. The teacher you internalized so completely that you can still consult them years after losing touch.",
      "Jung's claim was that this figure shows up across cultures and centuries because the psyche genuinely organizes some of its wisdom outside conscious access, and presents it to consciousness in the form of a guide. The figure is real to the experience even when there is no actual elder in the room. Sometimes it appears as an old man, sometimes as a wise woman, sometimes as a child saying something that turns out to be load-bearing. The form varies. The function holds.",
      "Neuroscience has no direct analogue. What it does suggest is that integration of learning over a lifetime produces patterns of automatic appraisal that the deliberative system can consult almost like an external source. Long-term meditators, expert clinicians, master artisans all describe a similar phenomenology: a knowing that arrives faster than thought. The mechanism is consolidation and pattern-recognition. The felt experience is closer to being advised.",
      "Rembrandt painted Aristotle's hand on the head of Homer's bust. The living thinker meets the dead poet through touch. The chain of medallions around Aristotle's neck shows Alexander, the student who became another kind of master. The painting is about the inheritance of wisdom across centuries and across mortality — one Wise Old Man recognizing another, with the awareness that he too will become a bust someone else lays a hand on.",
    ],
    citations: ["jung-cw9i", "sacks-man-who-mistook"],
  },
  trickster: {
    id: "trickster",
    paragraphs: [
      "The Trickster is the figure who breaks the rules to show that the rules are arbitrary — and, sometimes, to clear the way for what the rules were keeping out. Hermes and Loki, the medieval Fool, the coyote of certain Native traditions that this site does not appropriate. Jung studied the Trickster carefully because he saw the same figure recur across cultures and across centuries, doing the same disruptive work: revealing the seams of the constructed order by playing on them.",
      "What the figure protects against is rigidity. A psyche that has organized itself too tightly around a particular self-image needs the Trickster to come along and overturn the table, sometimes humiliatingly, so that the disowned parts can re-enter. The Trickster is rarely admired in the moment. He is often retrospectively necessary.",
      "Neuroscience has nothing to say about a Trickster. It does have evidence that rigid prediction models break down under enough surprise, that brittle self-concepts crack rather than bend, that what looks like insight often arrives only after a particular kind of disruption. The mechanism doesn't endorse the figure. The function the figure described still happens.",
      "Bosch's triptych is the Trickster as cosmology. Eden, the strange wide garden where appetite is unleashed, and the consequences. None of the panels is the moral. The Trickster is the whole arrangement — what is crossed, what is crossed again, what cannot be put back the way it was.",
    ],
    citations: ["jung-cw9i", "jung-memories-dreams-reflections"],
  },
};
