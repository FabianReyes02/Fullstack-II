import React, { useEffect, useState } from 'react';

export default function Contacto() {
  const [comentarios, setComentarios] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errors, setErrors] = useState([]);
  const [fallbackSaved, setFallbackSaved] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('comentarios_contacto')) || [];
    setComentarios(saved);
  }, []);

  function validate(data) {
    const errs = [];
    if (!data.nombre || data.nombre.trim().length === 0) errs.push('Nombre es requerido.');
    if (data.nombre && data.nombre.length > 100) errs.push('Nombre máximo 100 caracteres.');
    const correo = data.correo || '';
    if (!correo || correo.trim().length === 0) errs.push('Correo es requerido.');
    if (correo && correo.length > 100) errs.push('Correo máximo 100 caracteres.');
    if (correo && !/^\S+@\S+\.\S+$/.test(correo)) errs.push('Ingresa un correo válido.');
    if (!data.comentario || data.comentario.trim().length === 0) errs.push('Comentario es requerido.');
    if (data.comentario && data.comentario.length > 500) errs.push('Comentario máximo 500 caracteres.');
    return errs;
  }

  function onSubmit(e) {
    e.preventDefault();
    setFallbackSaved(false);
    const data = Object.fromEntries(new FormData(e.target));
    const validation = validate(data);
    if (validation.length > 0) {
      setErrors(validation);
      setStatus('error');
      return;
    }

    setStatus('sending');
    setErrors([]);

    const payload = { name: data.nombre.trim(), email: data.correo.trim(), message: data.comentario.trim() };

    // Try send to backend, fallback to localStorage
    (async () => {
      try {
        const { apiFetch } = await import('../../utils/api');
        const res = await apiFetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('Server rejected');
        const created = await res.json();
        const updated = [...comentarios, { nombre: data.nombre.trim(), correo: data.correo.trim(), comentario: data.comentario.trim(), fecha: new Date().toISOString(), _id: created.id || undefined }];
        localStorage.setItem('comentarios_contacto', JSON.stringify(updated));
        setComentarios(updated);
        setStatus('success');
        e.target.reset();
        setTimeout(() => setStatus('idle'), 2500);
      } catch (err) {
        // fallback: save locally and inform user
        const updated = [...comentarios, { nombre: data.nombre.trim(), correo: data.correo.trim(), comentario: data.comentario.trim(), fecha: new Date().toISOString() }];
        localStorage.setItem('comentarios_contacto', JSON.stringify(updated));
        setComentarios(updated);
        setStatus('success');
        setFallbackSaved(true);
        e.target.reset();
        setTimeout(() => setStatus('idle'), 2500);
      }
    })();
  }

  function clearComments() {
    if (!window.confirm('¿Eliminar todos los comentarios guardados localmente?')) return;
    localStorage.removeItem('comentarios_contacto');
    setComentarios([]);
  }

  return (
    <div className="page-contacto">
      <h2>Contáctanos</h2>
      <div id="contacto-container" className="grid-2">
        <form id="contacto-form" className="form-section card" onSubmit={onSubmit} aria-labelledby="contacto-titulo">
          <h3 id="contacto-titulo">Envíanos un mensaje</h3>
          <p className="muted">Responderemos en menos de 48 horas. También puedes contactarnos por teléfono o redes sociales.</p>

          {status === 'success' && <div className="alert success">Tu mensaje fue enviado correctamente.</div>}
          {fallbackSaved && <div className="alert info">No se pudo enviar al servidor; comentario guardado localmente.</div>}
          {status === 'error' && errors.length > 0 && (
            <div className="alert error" role="alert">
              <ul>
                {errors.map((err, i) => <li key={i}>{err}</li>)}
              </ul>
            </div>
          )}

          <label className="field">Nombre<label className="sr-only">(requerido)</label>
            <input name="nombre" aria-required="true" maxLength={100} placeholder="Tu nombre completo" />
          </label>

          <label className="field">Correo<label className="sr-only">(requerido)</label>
            <input name="correo" type="email" aria-required="true" maxLength={100} placeholder="tucorreo@ejemplo.com" />
          </label>

          <label className="field">Comentario<label className="sr-only">(requerido)</label>
            <textarea name="comentario" aria-required="true" maxLength={500} rows={6} placeholder="¿En qué podemos ayudarte?" />
          </label>

          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={status === 'sending'}>{status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}</button>
            <button type="reset" className="btn-secondary">Limpiar</button>
          </div>
        </form>

        <aside className="contact-info card">
          <h3>Información de contacto</h3>
          <p><strong>PerfumeStore</strong></p>
          <p>Tel: <a href="tel:+56912345678">+56 9 1234 5678</a></p>
          <p>Email: <a href="mailto:soporte@perfumestore.cl">soporte@perfumestore.cl</a></p>
          <p>Horario: Lun-Vie 9:00 - 18:00</p>

          <div className="map-placeholder" aria-hidden="true">Mapa (placeholder)</div>

          <hr />
          <div className="comentarios-panel">
            <div className="comentarios-header">
              <h4>Comentarios</h4>
              <button className="link-small" onClick={clearComments} type="button">Eliminar todos</button>
            </div>
            <div id="comentarios-lista">
              {comentarios.length === 0 && <p className="muted">No hay comentarios aún.</p>}
              {comentarios.slice().reverse().map((c, i) => (
                <div className="comentario" key={i}>
                  <div className="meta"><strong>{c.nombre}</strong> <span className="muted">({c.correo})</span></div>
                  <div className="texto">{c.comentario}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
