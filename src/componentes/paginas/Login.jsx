import React from 'react';

export default function Login() {
  return (
    <section className="form-section">
      <h2>Iniciar Sesión</h2>
      <form id="login-form">
        <label htmlFor="email">Correo electrónico</label>
        <input type="email" name="email" id="email" maxLength={100} required />

        <label htmlFor="password">Contraseña</label>
        <input type="password" name="password" id="password" minLength={4} maxLength={10} required />

        <button type="submit">Ingresar</button>
      </form>
    </section>
  );
}
