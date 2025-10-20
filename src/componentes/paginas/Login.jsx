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

  return (
    <section className="form-section">
      <h2>Iniciar Sesión</h2>
      <form id="login-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre (opcional)</label>
        <input type="text" name="name" id="name" maxLength={60} />

        <label htmlFor="email">Correo electrónico</label>
        <input type="email" name="email" id="email" maxLength={100} required />

        <label htmlFor="password">Contraseña</label>
        <input type="password" name="password" id="password" minLength={4} maxLength={100} required />

        <button type="submit">Ingresar</button>
      </form>
    </section>
  );
}
