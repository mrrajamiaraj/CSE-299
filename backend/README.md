
# Backend (FastAPI) — CBC Random Forest Predictor

## Files to place here
- `rf_blood_model.joblib` — your trained Pipeline (Imputer → RandomForest)
- `rf_label_encoder.joblib` — the fitted LabelEncoder for the target
- `rf_metadata.json` — contains `features`, `classes`, `target` (created by the notebook)

## Run locally
```bash
python -m venv .venv
. .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```
Open: http://127.0.0.1:8000/health

## Deploy (always online)
- Push this folder to a GitHub repo.
- Create a **Web Service** on platforms like **Render** or **Railway**.
- Set start command to: `uvicorn main:app --host 0.0.0.0 --port 8000`
- Add environment variables if needed (MODEL_PATH, LE_PATH, META_PATH).
- Upload your three artifact files or include them in the repo.
