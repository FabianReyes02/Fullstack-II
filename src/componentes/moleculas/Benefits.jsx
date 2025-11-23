import React from 'react';

function Benefit({ icon, title, text }) {
  return (
    <div className="benefit">
      <div className="benefit-icon" aria-hidden>{icon}</div>
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}

export default function Benefits() {
  return (
    <section className="benefits-section container" aria-label="Beneficios">
      <div className="benefits-grid">
        <Benefit icon={<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12h14" stroke="#2c3e50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>} title="Envío Rápido" text="Despachos en 24-48 horas a todo el país." />
        <Benefit icon={<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7l3-7z" stroke="#2c3e50" strokeWidth="0" fill="#f1c40f"/></svg>} title="100% Original" text="Garantía de autenticidad en todas las marcas." />
        <Benefit icon={<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="#2c3e50" strokeWidth="2"/></svg>} title="Devoluciones" text="30 días para cambios o devoluciones." />
      </div>
    </section>
  );
}
