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
    (async () => {
      try {
        const p = await productsAPI.getProduct(Number(id));
        setProducto(p);
      } catch (err) {
        console.error('Error loading product', err);
        setProducto(null);
      }
    })();
  }, [id]);

  if (!producto) return <p>Producto no encontrado.</p>;

  function handleAdd() {
    const qty = Number(cantidad || 1);
    const stock = producto.stock ?? producto.cantidad ?? 0;
    if (qty > stock) {
      alert('La cantidad supera el stock disponible');
      return;
    }
    addToCart(producto.id, qty);
    setShowCart(true);
  }

  return (
    <div className="producto-detail container">
      <h2>{producto.nombre || producto.name}</h2>
      <div className="producto-detail-grid">
        <img src={producto.imagen || producto.image || producto.image_url || producto.imageUrl || producto.src || 'https://via.placeholder.com/400x300'} alt={producto.nombre || producto.name} />
        <div className="producto-info">
          <p>{producto.descripcion || producto.description}</p>
          <p><strong>Precio: ${producto.precio || producto.price}</strong></p>
          <p><strong>Disponibilidad:</strong> {(producto.stock ?? producto.cantidad ?? 0) > 0 ? `${producto.stock ?? producto.cantidad} en stock` : 'Agotado'}</p>
          <label> Cantidad: <input type="number" min={1} max={producto.stock ?? producto.cantidad ?? 1} value={cantidad} onChange={e => setCantidad(e.target.value)} style={{width:60}} /></label>
          <div style={{marginTop:8}}>
            <button onClick={handleAdd} disabled={(producto.stock ?? producto.cantidad ?? 0) <= 0}>Agregar al carrito</button>
            <button onClick={() => navigate(-1)} style={{ marginLeft: '10px' }}>Volver</button>
          </div>
        </div>
      </div>
    </div>
  );
}
