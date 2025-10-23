import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const { totalItems, showCart, setShowCart } = useCart();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <header className="site-header" role="banner">
      <div className="container header-inner">
        <div className="header-brand">
          <h1 style={{margin:0, fontSize: '1.1rem'}}>
            <Link to="/">Tienda Online</Link>
          </h1>
        </div>

        <nav className="header-nav" role="navigation" aria-label="Main navigation">
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/productos">Productos</Link></li>
            {currentUser ? (
              <>
                {currentUser.isAdmin && <li><Link to="/admin">Admin</Link></li>}
                <li><span className="welcome-user" style={{color:'#fff', marginLeft:8}}>Bienvenido, <strong style={{color:'#fff'}}>{currentUser.name}</strong></span></li>
                <li><button type="button" onClick={handleLogout} style={{background:'transparent',color:'#fff',border:'1px solid rgba(255,255,255,0.12)',padding:'6px 8px',borderRadius:6}}>Cerrar Sesión</button></li>
              </>
            ) : (
              <>
                <li><Link to="/register">Registro</Link></li>
                <li><Link to="/login">Login</Link></li>
              </>
            )}
            <li><Link to="/contactanos">Contáctanos</Link></li>
          </ul>
        </nav>

        <div className="header-actions">
          <button aria-label="Carrito" className="carrito-circulo" onClick={() => setShowCart(!showCart)}>
            <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" alt="Carrito" width="28" height="28" />
            <span id="carrito-cantidad">{totalItems()}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
