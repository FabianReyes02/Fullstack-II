import React from 'react';
import Header from './Header';
import Cart from '../organismos/Cart';
import { useCart } from '../../context/CartContext';

export default function Layout({ children }) {
  const { showCart } = useCart();
  return (
    <div>
      <Header />
      <main className="main-content container">{children}</main>
      {showCart && <Cart />}
      <footer>
        <p>© 2025 PerfumeStore</p>
      </footer>
    </div>
  );
}
