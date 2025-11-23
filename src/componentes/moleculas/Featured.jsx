import React, { useEffect, useState } from 'react';
import ProductoCard from './ProductoCard';
import * as productsAPI from '../../data/products';
import { useCart } from '../../context/CartContext';

const sample = [
  { id: 's1', nombre: 'Perfume Floral', precio: 24990, imagen: '' },
  { id: 's2', nombre: 'Aroma Amaderado', precio: 29990, imagen: '' },
  { id: 's3', nombre: 'Cítrico Fresco', precio: 19990, imagen: '' },
  { id: 's4', nombre: 'Esencia Noche', precio: 34990, imagen: '' },
];

export default function Featured({ title = 'Destacados' }) {
  const [items, setItems] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await productsAPI.getAllProducts();
        if (!mounted) return;
        if (Array.isArray(data) && data.length > 0) {
          setItems(data.slice(0, 4));
        } else {
          setItems(sample);
        }
      } catch (e) {
        setItems(sample);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  return (
    <section className="featured-section container">
      <h2 style={{ textAlign: 'center', margin: '1.5rem 0' }}>{title}</h2>
      <div className="productos-grid">
        {items.map(p => (
          <ProductoCard key={p.id} producto={p} onAdd={addToCart} />
        ))}
      </div>
    </section>
  );
}
