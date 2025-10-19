import React, { useEffect, useState } from 'react';

export default function Contacto() {
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('comentarios_contacto')) || [];
    setComentarios(saved);
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    // Validaciones simples
    if (!data.nombre || data.nombre.length > 100) return alert('Nombre requerido y máximo 100 caracteres.');
    if (!/^.+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(data.correo) || data.correo.length > 100) return alert('Correo válido requerido.');
    if (!data.comentario || data.comentario.length > 500) return alert('Comentario requerido y máximo 500 caracteres.');
    const updated = [...comentarios, data];
    localStorage.setItem('comentarios_contacto', JSON.stringify(updated));
    setComentarios(updated);
    e.target.reset();
  }

  return (
    <div>
      <h2>Contáctanos</h2>
      <div id="contacto-container">
        <form id="contacto-form" className="form-section" onSubmit={onSubmit}>
          <label>Nombre: <input name="nombre" required maxLength={100} /></label>
          <label>Correo: <input name="correo" required maxLength={100} placeholder="ejemplo@duoc.cl" /></label>
          <label>Comentario: <textarea name="comentario" required maxLength={500}></textarea></label>
          <button type="submit" className="admin-btn">Enviar</button>
        </form>
        <div id="comentarios-lista">
          {comentarios.length === 0 && <p>No hay comentarios aún.</p>}
          {comentarios.map((c, i) => (
            <div className="comentario" key={i}>
              <strong>{c.nombre}</strong> <span style={{color:'gray'}}>({c.correo})</span><br />
              <span>{c.comentario}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
