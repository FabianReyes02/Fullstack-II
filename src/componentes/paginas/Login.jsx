<<<<<<< HEAD
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
=======
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const name = e.target.name?.value || '';
    const password = e.target.password.value;
    if (!email || !password) return alert('Email y contraseña requeridos');
    // Validar credenciales contra usuarios guardados en localStorage
    try {
      const users = JSON.parse(localStorage.getItem('fs_users_v1') || '[]');
      const found = users.find(u => String(u.email).toLowerCase() === String(email).toLowerCase() && u.password === password);
      if (!found) return alert('Credenciales inválidas. Regístrate primero.');
      const user = { email: found.email, name: found.name || found.email.split('@')[0], isAdmin: !!found.isAdmin };
      localStorage.setItem('fs_user', JSON.stringify(user));
      window.dispatchEvent(new Event('auth-change'));
      navigate(user.isAdmin ? '/admin' : '/');
    } catch (err) {
      alert('Error procesando usuarios.');
    }
  }
>>>>>>> 227cf16c6409b660023bdc7cbee5153a5d546129

  return (
    <section className="form-section">
      <h2>Iniciar Sesión</h2>
      <form id="login-form" onSubmit={handleSubmit}>
<<<<<<< HEAD
=======
        <label htmlFor="name">Nombre (opcional)</label>
        <input type="text" name="name" id="name" maxLength={60} />

>>>>>>> 227cf16c6409b660023bdc7cbee5153a5d546129
        <label htmlFor="email">Correo electrónico</label>
        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required />
        <label htmlFor="password">Contraseña</label>
<<<<<<< HEAD
        <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required />
=======
        <input type="password" name="password" id="password" minLength={4} maxLength={100} required />

>>>>>>> 227cf16c6409b660023bdc7cbee5153a5d546129
        <button type="submit">Ingresar</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </section>
  );
}
