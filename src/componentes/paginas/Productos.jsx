import React, { useEffect, useState, useMemo } from 'react';
import * as productsAPI from '../../data/products';
import { useCart } from '../../context/CartContext';
import ProductoCard from '../moleculas/ProductoCard';

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [categoria, setCategoria] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // debounced input value
  const [categorias, setCategorias] = useState(['Todos']);
  const { addToCart } = useCart();

  // Debounce search input: apply searchTerm to busqueda after delay
  useEffect(() => {
    const t = setTimeout(() => setBusqueda(searchTerm), 350);
    return () => clearTimeout(t);
  }, [searchTerm]);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await productsAPI.getAllProducts();
        if (!mounted) return;
        let all = Array.isArray(data) ? data : [];
        // set categories from full data
        let cats = Array.from(new Set(all.map(p => p.category || p.categoria))).filter(Boolean);
        // If API returns no useful categories (e.g. only 'Test' during development), provide sensible defaults
        const onlyTest = cats.length === 1 && String(cats[0]).toLowerCase() === 'test';
        if (cats.length === 0 || onlyTest) {
          cats = ['Hombres', 'Mujeres', 'Novedades', 'Ofertas'];
        }
        setCategorias(['Todos', ...cats]);

        // filter by category
        if (categoria !== 'Todos') {
          all = all.filter(p => (p.category || p.categoria) === categoria);
        }

        // filter by search (case-insensitive across name or nombre)
        if (busqueda) {
          const q = busqueda.toLowerCase();
          all = all.filter(p => (p.name || p.nombre || '').toLowerCase().includes(q) || (p.description || p.descripcion || '').toLowerCase().includes(q));
        }

        setProductos(all);
      } catch (e) {
        console.error('Error loading products', e);
        setProductos([]);
        setCategorias(['Todos']);
      }
    }
    load();
    return () => { mounted = false; };
  }, [categoria, busqueda]);

  const clearSearch = () => {
    setSearchTerm('');
    setBusqueda('');
  };

  const hasProducts = productos && productos.length > 0;

  const categoryChips = useMemo(() => categorias, [categorias]);

  return (
    <div className="container">
      <h2 style={{ textAlign: 'center', margin: '2rem 0' }}>Nuestros Perfumes</h2>

      <div className="search-filter-bar">
        <div className="search-bar">
          <input
            type="search"
            inputMode="search"
            placeholder="Buscar perfumes, aromas, marcas..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="search-input"
            aria-label="Buscar productos"
          />
          {searchTerm && <button className="search-clear" onClick={clearSearch} aria-label="Limpiar búsqueda">✕</button>}
        </div>

        <div className="category-chips" role="tablist" aria-label="Filtrar por categoría">
          {categoryChips.map((cat) => (
            <button
              key={cat}
              className={`chip ${categoria === cat ? 'active' : ''}`}
              onClick={() => setCategoria(cat)}
              aria-pressed={categoria === cat}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="productos-grid">
        {hasProducts ? (
          productos.map(p => (
            <ProductoCard key={p.id} producto={p} onAdd={addToCart} />
          ))
        ) : (
          <p style={{ textAlign: 'center', marginTop: '2rem' }}>No hay productos que coincidan con la búsqueda.</p>
        )}
      </div>
    </div>
  );
}
