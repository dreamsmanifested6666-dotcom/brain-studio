"""
build_video_activations_preview.py — Generate per-frame
Neurosynth-composite parcel-activation timelines for the encoder-
lab video gallery.

This is the PREVIEW path that ships before the Colab TRIBE precompute
runs. Each frame's activation is a weighted blend of pre-cached
Neurosynth term z-maps (same terms used by
`build_neurosynth_activations.py`), aggregated to HCP-MMP-360 parcels.

The output JSON shape matches what `BrainTimelineDriver` consumes on
the frontend, so when the Colab TRIBE notebook produces its own
frames, the JSON drops in at the same path and the page renders the
real TRIBE predictions instead of the Neurosynth preview. No code
change required for the swap.

Output: frontend/public/activations/videos/<video_id>.json
"""

from __future__ import annotations

import json
import math
import sys
from collections.abc import Iterable
from dataclasses import dataclass
from pathlib import Path

import numpy as np

HERE = Path(__file__).resolve().parents[2]
DATA_CACHE = HERE / "backend" / "data"
ZMAP_CACHE = DATA_CACHE / "term_zmaps"
PARCEL_LEFT_FP = HERE / "frontend" / "public" / "parcellation" / "hcp_mmp_left.json"
PARCEL_RIGHT_FP = HERE / "frontend" / "public" / "parcellation" / "hcp_mmp_right.json"
OUT_DIR = HERE / "frontend" / "public" / "activations" / "videos"


@dataclass(frozen=True)
class Keyframe:
    t: float
    composition: tuple[tuple[str, float], ...]


@dataclass(frozen=True)
class Video:
    id: str
    duration: float
    source: str
    license: str
    attribution: str
    notes: str
    # Keyframes anchor the timeline; activations interpolate between
    # them. ~3–5 keyframes per ~20-second clip reads well.
    keyframes: tuple[Keyframe, ...]


# Editorial keyframe map per video. Each composition is a list of
# (Neurosynth term, weight) pairs that sum to ~1.0. Weights are
# editorial — what the literature would predict for the average
# brain at this moment of stimulus.
VIDEOS: tuple[Video, ...] = (
    Video(
        id="water_lily",
        duration=20.0,
        source="https://commons.wikimedia.org/wiki/File:Water_lily_opening_bloom_20fps.ogv",
        license="CC-BY-SA",
        attribution="Water lily opening bloom, Wikimedia Commons (CC-BY-SA).",
        notes=(
            "Time-lapse close-up of a flower opening. Visual + scene "
            "encoding builds across the clip; subtle reward weighting "
            "as the bloom completes."
        ),
        keyframes=(
            Keyframe(0.0, (("perception", 0.5), ("face", 0.1), ("attention", 0.2), ("emotion", 0.2))),
            Keyframe(7.0, (("perception", 0.4), ("attention", 0.2), ("imagery", 0.2), ("emotion", 0.2))),
            Keyframe(14.0, (("perception", 0.35), ("reward", 0.2), ("attention", 0.2), ("imagery", 0.25))),
            Keyframe(20.0, (("perception", 0.3), ("reward", 0.3), ("attention", 0.2), ("default mode", 0.2))),
        ),
    ),
    Video(
        id="piano_grieg",
        duration=25.0,
        source="https://commons.wikimedia.org/wiki/File:Grieg_In_the_Hall_of_the_Mountain_King_-_piano_solo_-_Paul_Barton_pianowebm.webm",
        license="CC-BY",
        attribution="Paul Barton playing Grieg's 'In the Hall of the Mountain King,' Wikimedia Commons (CC-BY).",
        notes=(
            "Solo piano performance. Auditory + music tracking with "
            "rising emotional + reward weighting as the passage "
            "intensifies; motor regions track the visible hands."
        ),
        keyframes=(
            Keyframe(0.0, (("music", 0.4), ("auditory", 0.3), ("perception", 0.2), ("attention", 0.1))),
            Keyframe(8.0, (("music", 0.35), ("auditory", 0.25), ("emotion", 0.2), ("reward", 0.2))),
            Keyframe(16.0, (("music", 0.3), ("auditory", 0.2), ("emotion", 0.25), ("reward", 0.25))),
            Keyframe(25.0, (("music", 0.3), ("emotion", 0.3), ("reward", 0.25), ("default mode", 0.15))),
        ),
    ),
    Video(
        id="waterfall",
        duration=20.0,
        source="https://commons.wikimedia.org/wiki/File:202_Svartifoss_long_exposure_timelapse_Video_by_Giles_Laurent.webm",
        license="CC-BY-SA",
        attribution="Svartifoss long-exposure timelapse by Giles Laurent, Wikimedia Commons (CC-BY-SA).",
        notes=(
            "Long-exposure timelapse of a waterfall. Sustained visual-"
            "motion (V5/MT) encoding plus scene processing; the "
            "smoothed flow weights default-mode + perception over "
            "discrete-event terms."
        ),
        keyframes=(
            Keyframe(0.0, (("perception", 0.4), ("attention", 0.3), ("imagery", 0.2), ("default mode", 0.1))),
            Keyframe(10.0, (("perception", 0.35), ("default mode", 0.3), ("attention", 0.2), ("imagery", 0.15))),
            Keyframe(20.0, (("perception", 0.3), ("default mode", 0.4), ("imagery", 0.2), ("attention", 0.1))),
        ),
    ),
    Video(
        id="davos_speech",
        duration=25.0,
        source="https://commons.wikimedia.org/wiki/File:Davos_-_2015_-_An_Insight_an_Idea_with_Mario_Molina.webm",
        license="CC-BY",
        attribution="World Economic Forum, 'An Insight an Idea with Mario Molina' (Davos 2015), Wikimedia Commons (CC-BY).",
        notes=(
            "Person speaking on camera. Face perception (FFA), "
            "speech/language network, and mentalizing all engaged; "
            "the editorial weighting tracks listener cognition more "
            "than the speaker's articulation."
        ),
        keyframes=(
            Keyframe(0.0, (("face", 0.3), ("language", 0.3), ("speech perception", 0.2), ("attention", 0.2))),
            Keyframe(8.0, (("face", 0.25), ("language", 0.3), ("mentalizing", 0.25), ("speech perception", 0.2))),
            Keyframe(16.0, (("face", 0.2), ("language", 0.25), ("mentalizing", 0.3), ("semantic", 0.25))),
            Keyframe(25.0, (("face", 0.2), ("language", 0.2), ("mentalizing", 0.3), ("semantic", 0.3))),
        ),
    ),
)


def load_parcels() -> tuple[list[int], list[int]]:
    left = json.loads(PARCEL_LEFT_FP.read_text())
    right = json.loads(PARCEL_RIGHT_FP.read_text())
    return left, right


def load_term_zmap(term: str):
    """Load a cached term z-map produced by build_neurosynth_activations."""
    safe = term.replace(" ", "_").replace("/", "_")
    fp = ZMAP_CACHE / f"{safe}_z.nii.gz"
    if not fp.exists():
        return None
    import nibabel as nib
    return nib.load(str(fp))


def project_to_fsaverage5(z_img) -> tuple[np.ndarray, np.ndarray]:
    from nilearn import datasets as _ds
    from nilearn.surface import vol_to_surf

    fs = _ds.fetch_surf_fsaverage("fsaverage5")
    left = np.asarray(vol_to_surf(z_img, fs["pial_left"]))
    right = np.asarray(vol_to_surf(z_img, fs["pial_right"]))
    return left, right


def aggregate_to_parcels(
    left_verts: np.ndarray,
    right_verts: np.ndarray,
    parcels_left: list[int],
    parcels_right: list[int],
) -> dict[int, float]:
    out: dict[int, list[float]] = {}
    for v, p in zip(left_verts, parcels_left):
        if p == 0:
            continue
        out.setdefault(p, []).append(float(v))
    for v, p in zip(right_verts, parcels_right):
        if p == 0:
            continue
        out.setdefault(p, []).append(float(v))
    return {pid: float(np.mean(vs)) for pid, vs in out.items()}


def sigmoid_squash(values: dict[int, float], center: float = 2.5, scale: float = 1.2) -> dict[int, float]:
    out: dict[int, float] = {}
    for pid, v in values.items():
        x = (v - center) / scale
        out[pid] = 1.0 / (1.0 + math.exp(-x))
    return out


def composite_parcels(
    per_term: dict[str, dict[int, float] | None],
    composition: tuple[tuple[str, float], ...],
) -> dict[int, float]:
    available = [(t, w) for t, w in composition if per_term.get(t) is not None]
    if not available:
        return {}
    total_w = sum(w for _, w in available)
    out: dict[int, float] = {}
    parcel_ids: set[int] = set()
    for t, _ in available:
        parcel_ids.update(per_term[t].keys())
    for pid in parcel_ids:
        s = 0.0
        for t, w in available:
            s += (w / total_w) * per_term[t].get(pid, 0.0)
        out[pid] = s
    return out


def unique_terms(videos: Iterable[Video]) -> list[str]:
    seen: set[str] = set()
    for v in videos:
        for kf in v.keyframes:
            for term, _ in kf.composition:
                seen.add(term)
    return sorted(seen)


def main() -> None:
    if not PARCEL_LEFT_FP.exists():
        print(
            "[error] parcellation missing. Run build_parcellation.py first.",
            file=sys.stderr,
        )
        sys.exit(1)

    parcels_left, parcels_right = load_parcels()
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    # Load (and parcel-project) every unique term referenced across all
    # videos. Cached term z-maps from the earlier Neurosynth build are
    # reused; missing terms are silently skipped (the composite falls
    # back to the remaining terms).
    terms = unique_terms(VIDEOS)
    print(f"[terms] {len(terms)} unique across all videos: {terms}")
    per_term: dict[str, dict[int, float] | None] = {}
    for term in terms:
        z = load_term_zmap(term)
        if z is None:
            print(f"[skip] no cached z-map for '{term}'")
            per_term[term] = None
            continue
        lv, rv = project_to_fsaverage5(z)
        raw = aggregate_to_parcels(lv, rv, parcels_left, parcels_right)
        per_term[term] = sigmoid_squash(raw)
        print(f"[term] {term} -> {len(per_term[term])} parcels")

    # Emit one JSON per video, with the full keyframe timeline.
    for v in VIDEOS:
        frames = []
        for kf in v.keyframes:
            parcels = composite_parcels(per_term, kf.composition)
            if not parcels:
                continue
            frames.append({
                "t": kf.t,
                "composition": [list(p) for p in kf.composition],
                "parcel_activations": {
                    str(pid): round(float(val), 4) for pid, val in parcels.items()
                },
            })

        payload = {
            "id": f"video_{v.id}",
            "duration": v.duration,
            "source": "Neurosynth meta-analysis (preview path)",
            "license": "CC0",
            "citation": "Yarkoni et al., Nature Methods 2011, doi:10.1038/nmeth.1635",
            "parcellation": "HCP-MMP-360 (Glasser 2016, doi:10.1038/nature18933)",
            "methodology": (
                "Per-keyframe Neurosynth composite. Each keyframe blends "
                "cached term z-maps with editorial weights, projects to "
                "fsaverage5 via nilearn.surface.vol_to_surf, aggregates "
                "within HCP-MMP-360 parcels. The frontend interpolates "
                "between keyframes as the video plays. This is the "
                "PREVIEW path — drop in TRIBE-v2-generated frames at the "
                "same path to swap in real predictions."
            ),
            "video": {
                "source_url": v.source,
                "license": v.license,
                "attribution": v.attribution,
                "notes": v.notes,
            },
            "frames": frames,
        }
        out_fp = OUT_DIR / f"{v.id}.json"
        out_fp.write_text(json.dumps(payload, indent=2, ensure_ascii=False))
        print(f"[write] {out_fp.relative_to(HERE)} ({len(frames)} keyframes)")


if __name__ == "__main__":
    main()
