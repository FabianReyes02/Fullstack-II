import React from 'react';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <footer>
        <p>© 2025 Tienda Online Perfumes</p>
      </footer>
    </div>
  );
}
