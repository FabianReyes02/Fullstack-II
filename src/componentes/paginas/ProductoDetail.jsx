import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as productsAPI from '../../data/products';
import { useCart } from '../../context/CartContext';

export default function ProductoDetail() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const { addToCart, setShowCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const p = productsAPI.getProduct(Number(id));
    setProducto(p);
  }, [id]);

  if (!producto) return <p>Producto no encontrado.</p>;

  function handleAdd() {
    addToCart(producto.id, Number(cantidad || 1));
    setShowCart(true);
  }

  return (
    <div className="producto-detail container">
      <h2>{producto.nombre || producto.name}</h2>
      <div className="producto-detail-grid">
        <img src={producto.imagen || producto.image || 'https://via.placeholder.com/400x300'} alt={producto.nombre || producto.name} />
        <div className="producto-info">
          <p>{producto.descripcion || producto.description}</p>
          <p><strong>Precio: ${producto.precio || producto.price}</strong></p>
          <label> Cantidad: <input type="number" min={1} value={cantidad} onChange={e => setCantidad(e.target.value)} style={{width:60}} /></label>
          <div style={{marginTop:8}}>
            <button onClick={handleAdd}>Agregar al carrito</button>
            <button onClick={() => navigate(-1)} style={{ marginLeft: '10px' }}>Volver</button>
          </div>
        </div>
      </div>
    </div>
  );
}
