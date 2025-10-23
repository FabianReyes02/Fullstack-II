import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const loggedInUser = await login(formData.email, formData.password);

      if (loggedInUser && loggedInUser.email) {
        navigate(loggedInUser.isAdmin ? '/admin' : '/');
      } else {
        // This part handles cases where login might fail or return an unexpected value.
        // The original error message was "Credenciales inválidas. Regístrate primero."
        // We'll use a more generic error message for now, as the AuthContext login
        // is designed to always return a user object (even if not an admin).
        // If the login function were to return null or throw an error, this would be caught.
        setError('Credenciales inválidas. Por favor, verifica tu correo y contraseña.');
      }
    } catch (err) {
      console.error("Login submission error:", err);
      setError('Error procesando la solicitud de inicio de sesión.');
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
