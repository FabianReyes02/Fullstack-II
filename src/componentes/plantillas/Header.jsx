import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function Header() {
  const { totalItems, showCart, setShowCart } = useCart();
  return (
    <header>
      <h1>Tienda Online</h1>
      <nav>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/register">Registro</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/contactanos">Contáctanos</Link></li>
        </ul>
      </nav>
      <button className="carrito-circulo" onClick={() => setShowCart(!showCart)}>
        <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" alt="Carrito" width="32" height="32" />
        <span id="carrito-cantidad">{totalItems()}</span>
      </button>
    </header>
  );
}
