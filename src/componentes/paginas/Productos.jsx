import React, { useEffect, useState } from 'react';
import * as productsAPI from '../../data/products';
import { useCart } from '../../context/CartContext';

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
              <div className="producto" key={p.id}>
                <img src={p.imagen || p.image || 'https://via.placeholder.com/280x180'} alt={p.nombre || p.name} />
                <h3>{p.nombre || p.name}</h3>
                <p>{p.descripcion || p.description}</p>
                <p><strong>${p.precio || p.price}</strong></p>
                <button onClick={() => addToCart(p.id)}>Agregar al carrito</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
