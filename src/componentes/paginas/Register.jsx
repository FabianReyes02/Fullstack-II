import React from 'react';

export default function Register() {
  return (
    <section className="form-section">
      <h2>Crear Usuario</h2>
      <form>
        <label htmlFor="nombre">Nombre de usuario</label>
        <input type="text" name="nombre" id="nombre" required />

        <label htmlFor="email">Correo electrónico</label>
        <input type="email" name="email" id="email" required />

        <label htmlFor="password">Contraseña</label>
        <input type="password" name="password" id="password" required />

        <button type="submit">Registrarse</button>
      </form>
    </section>
  );
}
