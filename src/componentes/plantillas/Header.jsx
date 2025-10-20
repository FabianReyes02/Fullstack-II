import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function Header() {
  const { totalItems, showCart, setShowCart } = useCart();
  const [user, setUser] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('fs_user') || 'null'); } catch (e) { return null; }
  });
  const navigate = useNavigate();

  React.useEffect(() => {
    function onAuth() {
      try { setUser(JSON.parse(localStorage.getItem('fs_user') || 'null')); } catch (e) { setUser(null); }
    }
    window.addEventListener('auth-change', onAuth);
    return () => window.removeEventListener('auth-change', onAuth);
  }, []);

  function handleLogout() {
    localStorage.removeItem('fs_user');
    window.dispatchEvent(new Event('auth-change'));
    setUser(null);
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
            <li><Link to="/register">Registro</Link></li>
            {!user && <li><Link to="/login">Login</Link></li>}
            <li><Link to="/contactanos">Contáctanos</Link></li>
            {user && user.isAdmin && <li><Link to="/admin">Admin</Link></li>}
            {user && <li style={{color:'#fff', marginLeft:8}}>Hola, <strong style={{color:'#fff'}}>{user.name}</strong></li>}
            {user && <li><button type="button" onClick={handleLogout} style={{background:'transparent',color:'#fff',border:'1px solid rgba(255,255,255,0.12)',padding:'6px 8px',borderRadius:6}}>Cerrar sesión</button></li>}
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
