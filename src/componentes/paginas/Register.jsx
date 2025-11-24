import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({ nombre: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validaciones
    if (formData.nombre.length < 3 || formData.nombre.length > 100) {
      return setError('El nombre debe tener entre 3 y 100 caracteres.');
    }
    if (!/^([\w.-]+)@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(formData.email) || formData.email.length > 100) {
      return setError('Correo inválido. Dominios permitidos: @duoc.cl, @profesor.duoc.cl, @gmail.com.');
    }
    if (formData.password.length < 4 || formData.password.length > 10) {
      return setError('La contraseña debe tener entre 4 y 10 caracteres.');
    }

    // Enviar al backend
    (async () => {
      try {
        const { apiFetch } = await import('../../utils/api');
        const res = await apiFetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: formData.nombre, email: formData.email, password: formData.password })
        });
        if (!res.ok) {
          const err = await res.json();
          return setError(err.error || 'Error registrando');
        }
        setSuccess('¡Registro exitoso! Redirigiendo al login...');
        setTimeout(() => navigate('/login'), 1500);
      } catch (err) {
        setError('Error de conexión al servidor');
      }
    })();
  };

  return (
    <section className="form-section">
      <h2>Crear Usuario</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre de usuario</label>
        <input type="text" name="nombre" id="nombre" value={formData.nombre} onChange={handleChange} required />
        <label htmlFor="email">Correo electrónico</label>
        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required />
        <label htmlFor="password">Contraseña</label>
        <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Registrarse</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </section>
  );
}
