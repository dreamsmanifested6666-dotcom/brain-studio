"""
The Brain Studio — FastAPI backend.

Engine selection (cascading fallback, first match wins):

  1. TRIBE v2 real         — only if Meta's tribe / neuralset packages are
                             installed AND the checkpoint is on disk AND
                             TRIBE_ENGINE=real. Not currently practical to
                             deploy on a portfolio-tier server.
  2. Embedding baseline    — fastembed (ONNX BGE-small-en-v1.5) computing
                             cosine similarity to 20 curated region anchor
                             texts. Honest about what it is: response is
                             labelled engine="embedding_baseline_v1". This
                             is the default for the public deployment.
  3. 503 + diagnostic      — when neither is available. The frontend's
                             local lib/fakePredictor.ts then handles the
                             preview.

Endpoints (response shape stays stable across engines, so the frontend
client doesn't care which is serving):

  GET  /health              — engine status, checkpoint metadata
  POST /api/infer/text      — text → region activations (canonical path)
  POST /api/v1/predict      — alias for /api/infer/text (matches
                              external design-critic brief)
  GET  /api/predictions     — list precomputed stimulus ids
  GET  /api/predictions/{id} — fetch one precomputed JSON
"""

from __future__ import annotations

import logging
import os
from typing import Any

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from .predictions import list_available, load_prediction  # noqa: E402
from tribe.embedding_engine import (  # noqa: E402
    EmbeddingBaselineEngine,
    make_embedding_engine,
)
from tribe.loader import make_predictor, TribePredictor  # noqa: E402

logging.basicConfig(
    level=os.environ.get("LOG_LEVEL", "INFO"),
    format="%(asctime)s %(levelname)s %(name)s :: %(message)s",
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="The Brain Studio API",
    version="0.3.0",
    description=(
        "Backend for the Brain Studio's Mirror room. Maps text to a "
        "20-region brain activation distribution via embedding-baseline "
        "or TRIBE v2 inference depending on availability."
    ),
)

# CORS: localhost dev + any *.vercel.app preview + the canonical site.
# Override VERCEL_URL_PATTERN if the prod domain ever moves off vercel.app.
_vercel_pattern = os.environ.get(
    "VERCEL_URL_PATTERN",
    r"https://(.*\.vercel\.app|brain-studio-kappa\.vercel\.app)",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3100",
        "http://127.0.0.1:3100",
    ],
    allow_origin_regex=_vercel_pattern,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


# Lazy-cached engines. Inspected once at first request; results cached
# for the lifetime of the worker.
_tribe_predictor: TribePredictor | None = None
_tribe_inspected = False
_embedding_engine: EmbeddingBaselineEngine | None = None
_embedding_inspected = False


def get_tribe() -> TribePredictor | None:
    global _tribe_predictor, _tribe_inspected
    if not _tribe_inspected:
        _tribe_predictor = make_predictor()
        _tribe_inspected = True
    return _tribe_predictor


def get_embedding() -> EmbeddingBaselineEngine | None:
    global _embedding_engine, _embedding_inspected
    if not _embedding_inspected:
        _embedding_engine = make_embedding_engine()
        _embedding_inspected = True
    return _embedding_engine


# Back-compat alias for the previous helper name.
get_predictor = get_tribe


class HealthResponse(BaseModel):
    status: str
    # Whichever engine would actually run on the next /api/infer/text call.
    active_engine: str
    embedding_available: bool
    tribe_available: bool
    embedding_model: str | None = None
    embedding_load_seconds: float | None = None
    tribe_engine: str | None = None
    checkpoint_present: bool = False
    hidden_size: int | None = None
    n_layers: int | None = None
    text_backbone: str | None = None


@app.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    tribe = get_tribe()
    embedding = get_embedding()
    tribe_real = tribe is not None and tribe.engine == "real"
    embedding_ready = embedding is not None and embedding.lazy_load()
    if tribe_real:
        active = "real_tribe_v2"
    elif embedding_ready:
        active = embedding.engine_name  # "embedding_baseline_v1"
    else:
        active = "none"
    return HealthResponse(
        status="ok",
        active_engine=active,
        embedding_available=embedding_ready,
        tribe_available=tribe is not None,
        embedding_model=embedding.model_name if embedding else None,
        embedding_load_seconds=embedding.load_seconds if embedding else None,
        tribe_engine=tribe.engine if tribe else None,
        checkpoint_present=tribe is not None,
        hidden_size=tribe.info.hidden_size if tribe else None,
        n_layers=tribe.info.n_layers if tribe else None,
        text_backbone=tribe.info.text_backbone if tribe else None,
    )


class InferTextRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=4000)


def _run_inference(text: str) -> dict[str, Any]:
    """
    Engine cascade. Tries real TRIBE first (if available), falls back to
    the embedding baseline, raises 503 if neither is ready. Same JSON
    shape regardless of which engine wins — the frontend treats them
    interchangeably except for the labelled `engine` field.
    """
    tribe = get_tribe()
    if tribe is not None and tribe.engine == "real":
        try:
            regions = tribe.predict(text)
            return {
                "engine": tribe.engine,
                "text_preview": text[:200],
                "regions": regions,
                "metadata": {
                    "checkpoint_path": str(tribe.info.path),
                    "text_backbone": tribe.info.text_backbone,
                    "hidden_size": tribe.info.hidden_size,
                    "hemodynamic_offset_s": tribe.info.hemodynamic_offset_s,
                },
            }
        except NotImplementedError as e:
            logger.info("real TRIBE not wired (%s); falling back", e)

    embedding = get_embedding()
    if embedding is not None and embedding.lazy_load():
        regions = embedding.predict(text)
        return {
            "engine": embedding.engine_name,
            "text_preview": text[:200],
            "regions": regions,
            "metadata": {
                "model_name": embedding.model_name,
                "load_seconds": embedding.load_seconds,
                "note": (
                    "Embedding-baseline predictor: cosine similarity "
                    "between input and curated region anchor texts, "
                    "softmax-mapped to activations. Not TRIBE."
                ),
            },
        }

    raise HTTPException(
        status_code=503,
        detail={
            "reason": "no_engine_available",
            "message": (
                "Neither real TRIBE inference nor the embedding-baseline "
                "engine is ready. Install `fastembed` to enable the "
                "embedding baseline."
            ),
        },
    )


@app.post("/api/infer/text")
def infer_text(req: InferTextRequest) -> dict[str, Any]:
    return _run_inference(req.text)


@app.post("/api/v1/predict")
def predict_v1(req: InferTextRequest) -> dict[str, Any]:
    """Alias for /api/infer/text. The design-critic brief used this path."""
    return _run_inference(req.text)


@app.get("/api/predictions")
def list_predictions() -> dict[str, list[str]]:
    return {"available": list_available()}


@app.get("/api/predictions/{stimulus_id}")
def get_prediction(stimulus_id: str) -> dict[str, Any]:
    data = load_prediction(stimulus_id)
    if data is None:
        raise HTTPException(
            status_code=404,
            detail=f"No precomputed prediction for stimulus '{stimulus_id}'.",
        )
    return data
