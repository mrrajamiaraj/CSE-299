'use client';
import { useState } from 'react';

type CBCForm = {
  [key: string]: string;
};

export default function Page() {
  const [form, setForm] = useState<CBCForm>({
    WBC: '', RBC: '', HGB: '', HCT: '', MCV: '', MCH: '', MCHC: '', PLT: '',
    PDW: '', PCT: '', LYMp: '', NEUTp: '', LYMn: '', NEUTn: ''
  });

  const [prediction, setPrediction] = useState<string>('');
  const [fadeIn, setFadeIn] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Backend error');

      const data = await res.json();
      setPrediction(data.result);
    } catch (error) {
      console.warn("⚠️ Backend not responding. Showing static prediction.");
      setPrediction("Iron deficiency anemia (sample result)");
    }

    setFadeIn(true);
    setTimeout(() => setFadeIn(false), 1000);
  };

  return (
    <main style={{
      display: 'flex',
      height: '100vh',
      backgroundColor: '#e8f5e9', // soft pastel green
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Left Side: Form */}
      <section style={{
        flex: 1,
        padding: '40px',
        borderRight: '2px solid #c8e6c9'
      }}>
        <h1 style={{ color: '#2e7d32' }}>CBC Disease Predictor</h1>
        <form onSubmit={handleSubmit}>
          {Object.keys(form).map((key) => (
            <div key={key} style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontWeight: 'bold' }}>{key}:</label>
              <input
                type="number"
                name={key}
                value={form[key]}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #a5d6a7',
                  borderRadius: '4px',
                  backgroundColor: '#f1f8e9'
                }}
              />
            </div>
          ))}
          <button type="submit" style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#66bb6a',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Predict
          </button>
        </form>
      </section>

      {/* Right Side: Prediction */}
      <section style={{
        flex: 1,
        padding: '40px',
        backgroundColor: '#f1f8e9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        color: '#1b5e20',
        transition: 'opacity 0.6s ease',
        opacity: prediction && fadeIn ? 0 : 1
      }}>
        {prediction ? (
          <div style={{
            backgroundColor: '#c8e6c9',
            padding: '20px 30px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            animation: 'fadeIn 0.6s ease-in-out'
          }}>
            <strong>Prediction:</strong><br />
            <span>{prediction}</span>
          </div>
        ) : (
          <p>Prediction will appear here</p>
        )}
      </section>
    </main>
  );
}
