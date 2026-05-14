# Brain Studio — Backend

FastAPI service that powers the Mirror room's text-to-brain prediction.

## Engine cascade

Each `POST /api/infer/text` (or `/api/v1/predict`) call falls through:

1. **TRIBE v2 real** — only when `TRIBE_ENGINE=real`, the checkpoint is
   on disk, and Meta's gated `tribe` / `neuralset` packages are
   installed. Currently impractical to deploy.
2. **Embedding baseline** *(default)* — `fastembed` (ONNX runtime, no
   torch) running `BAAI/bge-small-en-v1.5` over 20 curated region
   anchor texts. Honest about what it is: response is labelled
   `engine: "embedding_baseline_v1"`.
3. **503 + diagnostic** — when neither is available. Frontend falls
   back to `lib/fakePredictor.ts` locally.

## Local dev

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
./start.ps1
```

Health: <http://127.0.0.1:8000/health>

```bash
curl -X POST http://127.0.0.1:8000/api/infer/text \
  -H "Content-Type: application/json" \
  -d '{"text":"I am thinking about my grandmother and the kitchen."}'
```

## Production deploy (Render free tier)

`render.yaml` is a Render Blueprint. Push to `main`, connect the repo
in the Render dashboard, and the service auto-stages.

Set `NEXT_PUBLIC_TRIBE_API_BASE` in Vercel to the Render service URL
(e.g. `https://brain-studio-api.onrender.com`).

Free-tier sleeps after 15 min idle; first request after a sleep wakes
the dyno (~30–60 s) — the frontend's local fakePredictor covers the
gap.

## Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/health` | Engine status + cached metadata |
| POST | `/api/infer/text` | Text → 20-region activation dict |
| POST | `/api/v1/predict` | Alias for `/api/infer/text` |
| GET | `/api/predictions` | List precomputed stimulus ids |
| GET | `/api/predictions/{id}` | One precomputed JSON |

Response shape (both POSTs):

```json
{
  "engine": "embedding_baseline_v1",
  "text_preview": "I am thinking about my grandmother...",
  "regions": { "ifg_left": 0.71, "pstg_left": 0.62, "...": 0.18 },
  "metadata": { "model_name": "BAAI/bge-small-en-v1.5", "load_seconds": 2.41 }
}
```

`regions` always covers all 20 region IDs from `tribe/region_anchors.py`.

## TRIBE v2 (Phase 10, future)

The cached checkpoint sits at:
`~/.cache/huggingface/hub/models--facebook--tribev2/snapshots/<sha>/best.ckpt`

A faithful PyTorch re-implementation of TRIBE's `FmriEncoder` lives in
`tribe/model.py`; `tribe/loader.py` validates the checkpoint and surfaces
its metadata. The blocker for real inference is Meta's private
`tribe` / `neuralset` packages — wire `tribe/predict.py:RealTribeEngine`
to those when available.
