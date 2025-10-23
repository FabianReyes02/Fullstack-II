import React, { useEffect, useState } from 'react';
import * as productsAPI from '../../data/products';
import { useCart } from '../../context/CartContext';
import ProductoCard from '../moleculas/ProductoCard';

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [categoria, setCategoria] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    let all = productsAPI.getAllProducts();

    if (categoria !== 'Todos') {
      all = all.filter(p => (p.category || p.categoria) === categoria);
    }

    if (busqueda) {
      all = all.filter(p => p.name.toLowerCase().includes(busqueda.toLowerCase()));
    }

    setProductos(all);
  }, [categoria, busqueda]);

  const categorias = Array.from(new Set(productsAPI.getAllProducts().map(p => p.category || p.categoria))).filter(Boolean);

  return (
    <div className="container">
      <h2 style={{ textAlign: 'center', margin: '2rem 0' }}>Nuestros Perfumes</h2>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Buscar perfumes..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          style={{ marginRight: '1rem', padding: '0.5rem' }}
        />
        <button onClick={() => setCategoria('Todos')} className={categoria === 'Todos' ? 'active' : ''}>Todos</button>
        {categorias.map(cat => (
          <button key={cat} onClick={() => setCategoria(cat)} className={categoria === cat ? 'active' : ''} style={{ marginLeft: '1rem' }}>
            {cat}
          </button>
        ))}
      </div>
      <div className="productos-grid">
        {productos.length > 0 ? (
          productos.map(p => (
            <ProductoCard key={p.id} producto={p} onAdd={addToCart} />
          ))
        ) : (
          <p>No hay productos en esta categoría.</p>
        )}
      </div>
    </div>
  );
}
