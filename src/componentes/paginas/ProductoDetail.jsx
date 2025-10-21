import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as productsAPI from '../../data/products';
import { useCart } from '../../context/CartContext';

export default function ProductoDetail() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const p = productsAPI.getProduct(parseInt(id));
    setProducto(p);
  }, [id]);

  if (!producto) return <p>Producto no encontrado.</p>;

  return (
    <div className="producto-detail">
      <h2>{producto.nombre || producto.name}</h2>
      <img src={producto.imagen || producto.image || 'https://via.placeholder.com/400x300'} alt={producto.nombre || producto.name} />
      <p>{producto.descripcion || producto.description}</p>
      <p><strong>Precio: ${producto.precio || producto.price}</strong></p>
      <button onClick={() => addToCart(producto.id)}>Agregar al carrito</button>
      <button onClick={() => navigate(-1)} style={{ marginLeft: '10px' }}>Volver</button>
    </div>
  );
}
