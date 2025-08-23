
import os
import json
from typing import Dict, Any
import pandas as pd
import joblib
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# ---- Load artifacts (place your trained files in the backend folder) ----
MODEL_FP = os.getenv("MODEL_PATH", "rf_blood_model.joblib")
LE_FP    = os.getenv("LE_PATH", "rf_label_encoder.joblib")
META_FP  = os.getenv("META_PATH", "rf_metadata.json")

try:
    model = joblib.load(MODEL_FP)
except Exception as e:
    raise RuntimeError(f"Could not load model from {MODEL_FP}: {e}")

try:
    label_encoder = joblib.load(LE_FP)
except Exception as e:
    raise RuntimeError(f"Could not load label encoder from {LE_FP}: {e}")

# Load metadata if present; otherwise fall back to known feature order
DEFAULT_FEATURES = ["WBC","LYMp","NEUTp","LYMn","NEUTn","RBC","HGB","HCT","MCV","MCH","MCHC","PLT","PDW","PCT"]
try:
    with open(META_FP, "r") as f:
        meta = json.load(f)
        FEATURES = meta.get("features", DEFAULT_FEATURES)
        CLASSES  = meta.get("classes", list(label_encoder.classes_))
        TARGET   = meta.get("target", "Diagnosis")
except Exception:
    FEATURES = DEFAULT_FEATURES
    CLASSES  = list(label_encoder.classes_)
    TARGET   = "Diagnosis"

# ---- FastAPI app + CORS ----
app = FastAPI(title="CBC Random Forest Predictor", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CBCInput(BaseModel):
    WBC: float = Field(..., description="White Blood Cell count")
    LYMp: float
    NEUTp: float
    LYMn: float
    NEUTn: float
    RBC: float
    HGB: float
    HCT: float
    MCV: float
    MCH: float
    MCHC: float
    PLT: float
    PDW: float
    PCT: float

class PredictResponse(BaseModel):
    predicted_class: str
    probabilities: Dict[str, float]

@app.get("/health")
def health():
    return {"status": "ok", "features": FEATURES, "classes": CLASSES, "target": TARGET}

@app.post("/predict", response_model=PredictResponse)
def predict(inp: CBCInput):
    try:
        # Ensure correct column order for the model
        row = pd.DataFrame([[getattr(inp, col) for col in FEATURES]], columns=FEATURES)
        proba = model.predict_proba(row)[0]
        idx = int(proba.argmax())
        pred_class = label_encoder.inverse_transform([idx])[0]
        return {"predicted_class": pred_class,
                "probabilities": {cls: float(p) for cls, p in zip(label_encoder.classes_, proba)}}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
