import React, { useEffect, useState } from 'react';
import * as productsAPI from '../../data/products';
import { useCart } from '../../context/CartContext';
import ProductoCard from '../moleculas/ProductoCard';

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [categoria, setCategoria] = useState('Todos');
  const { addToCart } = useCart();

  useEffect(() => {
    setProductos(productsAPI.getAllProducts());
  }, []);

  useEffect(() => {
    const all = productsAPI.getAllProducts();
    if (categoria === 'Todos') setProductos(all);
    else setProductos(all.filter(p => p.categoria === categoria));
  }, [categoria]);

  return (
    <div>
      <aside>
        <h2>Menú de Categorías</h2>
        <ul id="menu-categorias">
          <li><button onClick={() => setCategoria('Femenino')}>Femenino</button></li>
          <li><button onClick={() => setCategoria('Masculino')}>Masculino</button></li>
          <li><button onClick={() => setCategoria('Unisex')}>Unisex</button></li>
          <li><button onClick={() => setCategoria('Infantil')}>Infantil</button></li>
          <li><button onClick={() => setCategoria('Todos')}>Todos</button></li>
        </ul>
      </aside>
      <section className="productos">
        <div>
          <h2>Productos Destacados</h2>
          <div id="productos-list">
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
