import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const { totalItems, showCart, setShowCart } = useCart();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const headerRef = useRef(null);

  function handleLogout() {
    try { logout(); } catch (e) { /* ignore */ }
    try { localStorage.removeItem('usuarioLogueado'); } catch (e) { /* ignore */ }
    try { localStorage.removeItem('fs_token'); } catch (e) { /* ignore */ }
    navigate('/');
  }

  useEffect(() => {
    function updateHeaderHeight() {
      if (headerRef.current) {
        const h = headerRef.current.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${h}px`);
      }
    }

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  // Determinar usuario mostrado y si es admin (soporte para dos estrategias de auth)
  let storedUser = null;
  try { storedUser = JSON.parse(localStorage.getItem('usuarioLogueado') || 'null'); } catch (e) { storedUser = null; }
  const activeUser = currentUser || storedUser || null;
  const isAdmin = (activeUser && activeUser.isAdmin) || (activeUser && String(activeUser.email || '').toLowerCase() === 'admin@duoc.cl');

  return (
    <header ref={headerRef} className="site-header" role="banner">
      <div className="container header-inner">
        <div className="header-brand">
          <h1 style={{margin:0, fontSize: '1.1rem'}}>
            <Link to="/">PerfumeStore</Link>
          </h1>
        </div>

        <nav className="header-nav" role="navigation" aria-label="Main navigation">
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/productos">Productos</Link></li>
            {/* Mostrar enlace Admin si el usuario actual es admin (soporta localStorage fallback) */}
            {isAdmin && <li><Link to="/admin">Admin</Link></li>}
            <li><Link to="/contactanos">Contáctanos</Link></li>
          </ul>
        </nav>

        <div className="header-actions">
          {activeUser ? (
            <div className="user-block">
              <span className="user-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" fill="#fff"/><path d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4v1H4v-1z" fill="#fff"/></svg>
              </span>
              <span className="welcome-user">Bienvenido, <strong>{activeUser.name || activeUser.email}</strong></span>
              <button type="button" className="btn-logout" onClick={handleLogout}>Cerrar Sesión</button>
            </div>
          ) : (
            <div className="auth-links">
              <Link className="link-small" to="/register">Registro</Link>
              <Link className="link-small" to="/login">Login</Link>
            </div>
          )}

          <button aria-label="Carrito" className="carrito-circulo" onClick={() => setShowCart(!showCart)}>
            <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" alt="Carrito" width="28" height="28" />
            <span id="carrito-cantidad">{totalItems()}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
