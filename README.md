# CBC Random Forest Predictor 🩸🤖

This project is a **machine learning–powered web application** that predicts health conditions based on **Complete Blood Count (CBC)** parameters.  
It uses a **Random Forest model** trained on labeled CBC data, exposed via a **FastAPI backend**, and connected to a simple **HTML/CSS/JS frontend**.

---

## 📑 Table of Contents
1. [Overview](#overview)  
2. [Features](#features)  
3. [Tech Stack](#tech-stack)  
4. [Project Workflow](#project-workflow)  
5. [Installation](#installation)  
6. [Usage](#usage)  
7. [Deployment](#deployment)  
8. [Future Improvements](#future-improvements)  
9. [Contributors](#contributors)  

---

## 🔎 Overview
The project helps doctors and patients **analyze CBC test results automatically**.  
Users can enter CBC values into a web form, and the trained model provides predictions such as:  
- Healthy  
- Normocytic normochromic anemia  
- Microcytic hypochromic anemia  
- Other subtypes  

---

## ✨ Features
- 🧪 **Random Forest Model** trained on CBC dataset  
- 🌐 **FastAPI backend** for predictions (`/predict` endpoint)  
- 💻 **Frontend UI** using HTML, CSS, and JavaScript  
- 📊 **Prediction Confidence Table** showing class probabilities  
- 🔔 **Modal Popup** to highlight predictions  
- 🚀 Deployable on **Fly.io (backend)** and **Netlify (frontend)**  

---

## 🛠️ Tech Stack
- **Machine Learning**: Python, scikit-learn (Random Forest)  
- **Backend**: FastAPI, Uvicorn  
- **Frontend**: HTML, CSS, JavaScript  
- **Deployment**: Fly.io (API) + Netlify (UI)  

---

## 🔄 Project Workflow
1. Train a **Random Forest Classifier** on CBC dataset (`blood.csv`).  
2. Save the trained model using `joblib`.  
3. Build a **FastAPI app** that loads the model and exposes a `/predict` endpoint.  
4. Design a **frontend form** to input CBC values.  
5. Connect frontend to backend using Fetch API.  
6. Deploy backend to **Fly.io** and frontend to **Netlify**.  

---

## ⚙️ Installation

### Clone Repository
```bash
git clone https://github.com/yourusername/cbc-rf-predictor.git
cd cbc-rf-predictor

