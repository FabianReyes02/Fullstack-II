import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const [view, setView] = useState('productos');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser || currentUser.email !== 'admin@duoc.cl') {
      navigate('/');
    }
  }, [currentUser, navigate]);

  return currentUser && currentUser.email === 'admin@duoc.cl' ? (
    <div>
      <header>
        <h1>Panel de Administración</h1>
        <nav>
          <ul>
            <li><button onClick={() => setView('productos')}>Productos</button></li>
            <li><button onClick={() => setView('usuarios')}>Usuarios</button></li>
            <li><button onClick={logout} className="logout-btn">Salir</button></li>
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
  ) : null; // O un componente de "Cargando..." o "No autorizado"
}
