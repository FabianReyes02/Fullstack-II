import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const users = JSON.parse(localStorage.getItem('usuarios')) || [];
    const admin = { email: 'admin@duoc.cl', password: 'admin' }; // Admin por defecto

    // Check admin
    if (formData.email === admin.email && formData.password === admin.password) {
      login({ ...admin, nombre: 'Admin' });
      return;
    }

    // Check regular users
    const user = users.find(u => u.email === formData.email && u.password === formData.password);

    if (user) {
      login(user);
    } else {
      setError('Correo o contraseña incorrectos.');
    }
  };

  return (
    <section className="form-section">
      <h2>Iniciar Sesión</h2>
      <form id="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Correo electrónico</label>
        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required />
        <label htmlFor="password">Contraseña</label>
        <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Ingresar</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </section>
  );
}
