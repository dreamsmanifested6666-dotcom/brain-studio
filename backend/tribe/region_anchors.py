"""
Anchor texts for the 20 brain regions used by the EmbeddingBaselineEngine.

Each anchor is a concatenation of the region's neuroanatomical name, its
"involved in" gloss, and its more figurative gloss — the same prose the
frontend surfaces in `lib/regions.ts`. The semantic encoder uses these
as fixed reference points; cosine similarity between a user input and
each anchor produces the region's predicted activation.

Keep these in lockstep with `frontend/lib/regions.ts`. They are the
source of truth for what each region "means" to the embedding model.
"""

from __future__ import annotations

from typing import Final

REGION_IDS: Final[tuple[str, ...]] = (
    "ifg_left",
    "ifg_right",
    "pstg_left",
    "pstg_right",
    "mtg_left",
    "mtg_right",
    "atl_left",
    "atl_right",
    "agl_left",
    "agl_right",
    "hg_left",
    "hg_right",
    "vmpfc",
    "dmpfc",
    "pcc",
    "precuneus",
    "amyg_left",
    "amyg_right",
    "hipp_left",
    "hipp_right",
)


# Each anchor is intentionally rich: anatomy + function + a few characteristic
# words. The embedding model picks up vocabulary the user is likely to type
# ("memory", "music", "fear", "wondering what someone is thinking") and maps
# them via cosine similarity to the most semantically related region.
REGION_ANCHORS: Final[dict[str, str]] = {
    "ifg_left": (
        "Broca's region, left inferior frontal gyrus. Syntactic processing, "
        "speech production, articulation. The part of you that finds the "
        "next word — and catches its own tongue when the word isn't quite "
        "right. Grammar, sentences, language production."
    ),
    "ifg_right": (
        "Right inferior frontal gyrus. Prosody, figurative meaning, "
        "inhibitory control of language. The listener under the listener, "
        "attending to what isn't said. Sarcasm, irony, tone, the meaning "
        "beneath the meaning."
    ),
    "pstg_left": (
        "Posterior superior temporal gyrus, left. Phonological and lexical "
        "processing — sometimes called Wernicke's area. Where sound first "
        "becomes meaning. Word recognition, the threshold of being addressed."
    ),
    "pstg_right": (
        "Posterior superior temporal gyrus, right. Tonal and prosodic "
        "processing. Melody, the affective shape of sound, music and feeling "
        "meeting. The numinous register when it arrives unannounced through "
        "the ear."
    ),
    "mtg_left": (
        "Middle temporal gyrus, left. Lexical semantics, word retrieval, "
        "sentence-level meaning. Where 'mother' is not just a noun — where "
        "words carry the freight of having been used. Vocabulary, definitions, "
        "the weight of language."
    ),
    "mtg_right": (
        "Middle temporal gyrus, right. Figurative meaning, narrative "
        "comprehension, biological-motion perception. Metaphor, story arc, "
        "inferred mental states. The hemisphere that handles metaphor "
        "without flinching."
    ),
    "atl_left": (
        "Anterior temporal lobe, left. A semantic hub — integrates "
        "multimodal conceptual knowledge into meaning. The part of you that "
        "knows what a thing is, not just what it's called. Concepts, gestalt "
        "of things, knowing-what."
    ),
    "atl_right": (
        "Anterior temporal lobe, right. Person-knowledge, social semantics, "
        "meanings carried by faces. Where a face is not yet a name but "
        "already a feeling. Familiarity, the felt sense of who someone is, "
        "social meaning."
    ),
    "agl_left": (
        "Angular gyrus, left. Heteromodal hub for semantic integration, "
        "metaphor, default-mode network. The crossing where senses translate "
        "into ideas. Reading, mathematics, abstraction, where one sense "
        "lends a word to another."
    ),
    "agl_right": (
        "Angular gyrus, right. Numeracy, spatial cognition, the body schema. "
        "Where number, body, and self meet — the part of the self that holds "
        "its own coordinates. Geometry, where you are in a room."
    ),
    "hg_left": (
        "Heschl's gyrus, left primary auditory cortex. Tonotopically "
        "organized — receives the first cortical signal from the ear. "
        "Pitch, sound, the doorway sound walks through to become a thought."
    ),
    "hg_right": (
        "Heschl's gyrus, right primary auditory cortex. Fine-grained "
        "spectral processing. The ear that hears the difference between a "
        "violin and someone crying. Timbre, voice quality, musical detail."
    ),
    "vmpfc": (
        "Ventromedial prefrontal cortex. Valuation, self-referential "
        "thought, default-mode network. The part of you that knows what is "
        "good for you and is sometimes wrong. Preference, value, what "
        "matters, the ego in dialogue."
    ),
    "dmpfc": (
        "Dorsomedial prefrontal cortex. Mentalizing — modeling the mental "
        "states of others, self-reflection. The part of you that wonders "
        "what someone else is thinking. Theory of mind, social cognition, "
        "perspective-taking, projection."
    ),
    "pcc": (
        "Posterior cingulate cortex. Core node of the default-mode network. "
        "Mind-wandering, self-related thought, memory. The part of you "
        "that's still you when you stop trying. Rest, daydreaming, "
        "individuation, the room lit when the others aren't."
    ),
    "precuneus": (
        "Precuneus. Autobiographical memory, mental imagery, visual-spatial "
        "integration. Where you go when you remember the smell of your "
        "grandmother's kitchen. Reminiscing, replaying scenes, inner stage, "
        "personal history."
    ),
    "amyg_left": (
        "Amygdala, left. Salience detection, emotional learning — including "
        "positive emotions, not just fear. The part of you that notices what "
        "matters before you have words for why. Emotional weight, the "
        "numinous."
    ),
    "amyg_right": (
        "Amygdala, right. Rapid affective processing, fear, reward, "
        "unconscious emotional verdict. Where the body decides this is real "
        "before the mind has caught up. Gut feeling, threat, attraction, "
        "startle."
    ),
    "hipp_left": (
        "Hippocampus, left. Episodic memory encoding, spatial cognitive "
        "maps. Knitting experience into a story you can return to. "
        "Remembering, autobiographical recall, reconstructing the past, "
        "memory traces."
    ),
    "hipp_right": (
        "Hippocampus, right. Spatial memory, imagining future scenes, "
        "counterfactual scenarios. Where you walk through rooms that "
        "haven't been built yet. Imagination, planning, active imagination, "
        "alternative pasts and futures."
    ),
}

# Sanity check: every ID must have an anchor, and vice versa.
assert set(REGION_IDS) == set(REGION_ANCHORS.keys()), (
    "REGION_IDS and REGION_ANCHORS must cover the same 20 regions"
)
