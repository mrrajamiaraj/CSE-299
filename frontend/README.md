
# Frontend — CBC Random Forest Predictor

A small static site (HTML/CSS/JS) that calls the FastAPI backend.

## Local preview
Just open `index.html` in your browser, or use a simple static server:
```bash
# Python 3
python -m http.server 5500
# then open http://127.0.0.1:5500/frontend/index.html
```

## Configure API URL
In `app.js`, set `API_BASE_URL` to your backend URL:

- Local: `http://127.0.0.1:8000`
- After deploy: your Render/Railway URL
