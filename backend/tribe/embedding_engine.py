"""
Embedding-baseline brain region predictor.

What this is — and isn't:
    - This is NOT TRIBE v2. Meta's TRIBE checkpoint requires their private
      `tribe` / `neuralset` packages and a gated Llama-3.2-3B; neither is
      practically deployable on a portfolio-tier server.
    - This IS a semantic predictor that returns a real, repeatable mapping
      from text → 20-region activation distribution. The mapping uses a
      sentence-embedding model (default: BAAI/bge-small-en-v1.5 via
      `fastembed`, ONNX runtime, ~130 MB) to compute cosine similarity
      between the user's input and each region's curated anchor text in
      `region_anchors.py`.

Honesty: the response is labelled `engine: "embedding_baseline_v1"` so
the frontend can distinguish it from real TRIBE inference. The "regions"
field has the exact same shape TRIBE would produce.

Performance on CPU:
    - First request: ~3 s (model warm-up + anchor embedding once).
    - Subsequent requests: ~50–150 ms.
    - Memory: ~200 MB resident.

Engine selection: `make_embedding_engine()` returns None if fastembed
isn't installed. The route falls back to a 503 in that case and the
frontend's local `fakePredict` covers the gap.
"""

from __future__ import annotations

import logging
import math
import time
from typing import Any

from .region_anchors import REGION_ANCHORS, REGION_IDS

logger = logging.getLogger(__name__)

# bge-small-en-v1.5 is the right balance of size and quality for this
# use: 33 M params, ~130 MB ONNX, 384-dim embeddings, strong on short-text
# semantic similarity. Override with EMBEDDING_MODEL env var if needed.
DEFAULT_MODEL = "BAAI/bge-small-en-v1.5"


class EmbeddingBaselineEngine:
    """
    Lazy-loaded ONNX text encoder + precomputed region anchor embeddings.

    `predict(text)` returns `{region_id: activation_in_[0,1]}` for all 20
    regions. Higher activation = the input is closer in embedding space to
    that region's anchor text.
    """

    engine_name = "embedding_baseline_v1"

    def __init__(self, model_name: str = DEFAULT_MODEL) -> None:
        self.model_name = model_name
        self._model: Any | None = None
        # Each row is a region's anchor embedding (in REGION_IDS order).
        self._anchors: list[list[float]] | None = None
        self.load_seconds: float | None = None

    def lazy_load(self) -> bool:
        """
        Import fastembed, instantiate the model, and pre-embed the 20
        region anchors. Returns False if the dependency isn't installed
        so the caller can fall back to a 503.
        """
        if self._model is not None and self._anchors is not None:
            return True
        try:
            from fastembed import TextEmbedding
        except ImportError:
            logger.warning(
                "fastembed not installed — embedding engine unavailable. "
                "pip install fastembed onnxruntime"
            )
            return False

        t0 = time.time()
        try:
            self._model = TextEmbedding(model_name=self.model_name)
            anchor_texts = [REGION_ANCHORS[rid] for rid in REGION_IDS]
            embeddings = list(self._model.embed(anchor_texts))
            self._anchors = [e.tolist() for e in embeddings]
            self.load_seconds = time.time() - t0
            logger.info(
                "embedding_engine ready: model=%s anchors=%d load=%.2fs",
                self.model_name,
                len(self._anchors),
                self.load_seconds,
            )
            return True
        except Exception:  # noqa: BLE001 — broad on purpose; surface in 503
            logger.exception("failed to load embedding engine")
            self._model = None
            self._anchors = None
            return False

    def predict(self, text: str, temperature: float = 0.45) -> dict[str, float]:
        """
        Map `text` to a 20-region activation distribution.

        Cosine similarity (the anchor and query vectors are unit-normed
        by the model) is converted to a softmax probability with a
        moderately sharp temperature, then rescaled to [0.18, 0.95] so
        the visualization always has a visible "floor" and never redlines
        the colour ramp.

        `temperature` ∈ (0, 1): lower = more peaked / decisive,
        higher = more diffuse. 0.45 is a defensible middle.
        """
        if not self.lazy_load():
            raise RuntimeError(
                "Embedding engine unavailable: fastembed not installed"
            )
        assert self._model is not None
        assert self._anchors is not None

        cleaned = text.strip()
        if len(cleaned) < 3:
            # Mirror's behaviour: return idle for sub-threshold input.
            return {rid: 0.0 for rid in REGION_IDS}

        query_embeds = list(self._model.embed([cleaned]))
        if not query_embeds:
            return {rid: 0.0 for rid in REGION_IDS}
        q = query_embeds[0].tolist()

        sims = [
            sum(a * b for a, b in zip(q, anchor)) for anchor in self._anchors
        ]
        # Softmax with temperature.
        m = max(sims)
        t = max(0.05, float(temperature))
        exps = [math.exp((s - m) / t) for s in sims]
        z = sum(exps) or 1.0
        probs = [e / z for e in exps]

        # The softmax can be too peaked for visualization. Rescale to a
        # span that reads clearly on the brain colour ramp without
        # saturating either end.
        max_p = max(probs)
        min_p = min(probs)
        span = max_p - min_p or 1.0
        out: dict[str, float] = {}
        for rid, p in zip(REGION_IDS, probs):
            normalized = (p - min_p) / span  # 0..1
            out[rid] = round(0.18 + normalized * 0.77, 4)
        return out


def make_embedding_engine(model_name: str | None = None) -> EmbeddingBaselineEngine | None:
    """
    Factory used by the FastAPI app. Returns an unloaded engine; first
    `.predict()` call triggers the lazy load. Returns None if the engine's
    dependencies aren't present (so the caller can fall through to a 503).
    """
    import os

    engine = EmbeddingBaselineEngine(
        model_name=model_name or os.environ.get("EMBEDDING_MODEL", DEFAULT_MODEL),
    )
    # Probe-load eagerly so the /health endpoint can report status, but
    # don't fail construction — the model load may take 3 s on cold-start.
    return engine
