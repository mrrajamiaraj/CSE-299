
// ==== Set your API base URL ====
// For local testing: "http://127.0.0.1:8000"
// After deploy (Render/Railway), replace with your backend URL
const API_BASE_URL = "https://cbc-api.fly.dev";

const form = document.getElementById("cbc-form");
const resultBlock = document.getElementById("result");
const predictedEl = document.getElementById("predicted-class");
const probaWrap = document.getElementById("proba-table-wrap");

const modal = document.getElementById("modal");
const modalClose = document.getElementById("modal-close");
const modalPred = document.getElementById("modal-pred-class");
const modalProbaWrap = document.getElementById("modal-proba-table-wrap");

modalClose.addEventListener("click", () => modal.classList.add("hidden"));
window.addEventListener("click", (e) => { if (e.target === modal) modal.classList.add("hidden"); });

function tableFromProbabilities(probas) {
  // probas: {class: number}
  const entries = Object.entries(probas).sort((a,b) => b[1] - a[1]);
  const rows = entries.map(([cls, p]) => `<tr><td>${cls}</td><td>${(p*100).toFixed(1)}%</td></tr>`).join("");
  return `<table class="table"><thead><tr><th>Class</th><th>Confidence</th></tr></thead><tbody>${rows}</tbody></table>`;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const payload = {};
  for (const [key, value] of formData.entries()) {
    const num = Number(value);
    if (Number.isNaN(num)) {
      alert(`Invalid number for ${key}`);
      return;
    }
    payload[key] = num;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const t = await res.text();
      throw new Error(`${res.status}: ${t}`);
    }
    const data = await res.json();
    // Update inline result
    predictedEl.textContent = data.predicted_class;
    probaWrap.innerHTML = tableFromProbabilities(data.probabilities);
    resultBlock.classList.remove("hidden");

    // Show modal popup
    modalPred.textContent = data.predicted_class;
    modalProbaWrap.innerHTML = tableFromProbabilities(data.probabilities);
    modal.classList.remove("hidden");
  } catch (err) {
    alert("Prediction failed: " + err.message);
  }
});
