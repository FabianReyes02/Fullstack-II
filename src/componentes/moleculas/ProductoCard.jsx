import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductoCard({ producto, onAdd }) {
  const nombre = producto.nombre || producto.name;
  const descripcion = producto.descripcion || producto.description;
  const precio = producto.precio || producto.price;
  const srcImg = producto.imagen || producto.image || '';

  // fallback SVG data URL (built at runtime to avoid encoding issues)
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='280' height='180'><rect width='100%' height='100%' fill='%23e0e0e0'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23888' font-size='14'>No image</text></svg>`;
  const fallback = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;

  return (
    <div className="producto">
      <Link to={`/producto/${producto.id}`}>
        <img src={srcImg || fallback} alt={nombre} onError={(e) => { e.currentTarget.src = fallback; }} />
      </Link>
      <h3><Link to={`/producto/${producto.id}`}>{nombre}</Link></h3>
      <p>{descripcion}</p>
      <p><strong>${precio}</strong></p>
      <button onClick={() => onAdd(producto.id)}>Agregar al carrito</button>
    </div>
  );
}
