import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductoCard({ producto, onAdd }) {
  const nombre = producto.nombre || producto.name;
  const precio = producto.precio || producto.price;
  const srcImg = producto.imagen || producto.image || '';

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='280' height='200'><rect width='100%' height='100%' fill='%23ecf0f1'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23bdc3c7' font-size='16'>Imagen no disponible</text></svg>`;
  const fallback = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;

  return (
    <div className="producto">
      <Link to={`/producto/${producto.id}`}>
        <img src={srcImg || fallback} alt={nombre} onError={(e) => { e.currentTarget.src = fallback; }} />
      </Link>
      <h3 className="producto-title">
        <Link to={`/producto/${producto.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          {nombre}
        </Link>
      </h3>
      <p className="producto-price">${precio}</p>
      <button onClick={() => onAdd(producto.id, 1)}>Agregar al carrito</button>
    </div>
  );
}
