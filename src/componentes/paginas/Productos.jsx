import React, { useEffect, useState } from 'react';
import * as productsAPI from '../../data/products';
import { useCart } from '../../context/CartContext';
import ProductoCard from '../moleculas/ProductoCard';

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [categoria, setCategoria] = useState('Todos');
  const { addToCart, setShowCart } = useCart();

  useEffect(() => {
    setProductos(productsAPI.getAllProducts());
  }, []);

  useEffect(() => {
    const all = productsAPI.getAllProducts();
    if (categoria === 'Todos') setProductos(all);
    else setProductos(all.filter(p => (p.category || p.categoria) === categoria));
  }, [categoria]);

  const categorias = Array.from(new Set(productsAPI.getAllProducts().map(p => p.category || p.categoria))).filter(Boolean);

  return (
    <div className="productos-page container">
      <aside className="productos-aside">
        <h2>Menú de Categorías</h2>
        <ul id="menu-categorias">
          {categorias.map(cat => (
            <li key={cat}><button type="button" onClick={() => setCategoria(cat)} className={categoria === cat ? 'active' : ''}>{cat}</button></li>
          ))}
          <li><button type="button" onClick={() => setCategoria('Todos')} className={categoria === 'Todos' ? 'active' : ''}>Todos</button></li>
        </ul>
        <div style={{marginTop:12}}>
          <button type="button" onClick={() => setShowCart(true)}>Ver carrito</button>
        </div>
      </aside>
      <section className="productos">
        <div>
          <h2>Productos</h2>
          <div id="productos-list" className="productos-grid">
            {productos.length === 0 && <p>No hay productos aún.</p>}
            {productos.map(p => (
              <ProductoCard key={p.id} producto={p} onAdd={addToCart} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
