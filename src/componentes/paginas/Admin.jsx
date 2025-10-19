import React, { useState } from 'react';

export default function Admin() {
  const [view, setView] = useState('productos');

  return (
    <div>
      <header>
        <h1>Panel de Administración</h1>
        <nav>
          <ul>
            <li><button onClick={() => setView('productos')}>Productos</button></li>
            <li><button onClick={() => setView('usuarios')}>Usuarios</button></li>
            <li><a href="/contactanos">Contáctanos</a></li>
            <li><a href="/">Salir</a></li>
          </ul>
        </nav>
      </header>
      <main>
        {view === 'productos' && (
          <section id="admin-productos">
            <h2>Gestión de Productos</h2>
            <button className="admin-btn">Nuevo Producto</button>
            <div id="form-producto" style={{display:'none'}}></div>
            <div id="lista-productos"></div>
          </section>
        )}
        {view === 'usuarios' && (
          <section id="admin-usuarios">
            <h2>Gestión de Usuarios</h2>
            <button className="admin-btn">Nuevo Usuario</button>
            <div id="form-usuario" style={{display:'none'}}></div>
            <div id="lista-usuarios"></div>
          </section>
        )}
      </main>
    </div>
  );
}
