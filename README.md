
# CBC RF Web Starter (Frontend + Backend)

This project gives you a complete **always-online** web app:
- **Frontend**: static HTML/CSS/JS form with a popup for results
- **Backend**: FastAPI service that loads your trained Random Forest and responds with predictions

## 1) Train & export your model
Use your Jupyter notebook to save three files:
- `rf_blood_model.joblib` (Pipeline)
- `rf_label_encoder.joblib` (LabelEncoder)
- `rf_metadata.json`       (with `features`, `classes`, `target`)

> Tip: the metadata file is created in the step-by-step notebook I gave you.

## 2) Put artifacts in backend/
Copy those three files into the `backend/` folder.

## 3) Run backend locally
```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux:
. .venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```
Open: http://127.0.0.1:8000

## 4) Open frontend
- Edit `frontend/app.js` and set `API_BASE_URL` accordingly.
- Open `frontend/index.html` in a browser (or run `python -m http.server 5500` and open the link).

## 5) Deploy (always online)
- Push the **backend** folder to a GitHub repo.
- Create a **Web Service** on platforms like **Render** or **Railway** (gunicorn/uvicorn).
- Start command: `uvicorn main:app --host 0.0.0.0 --port 8000`
- Add/commit the three artifact files to the repo (or mount a storage).
- For the **frontend**, host it for free on Netlify/Vercel/GitHub Pages (just a static folder). Set `API_BASE_URL` to your backend URL.

That's it — enjoy your hosted predictor!
