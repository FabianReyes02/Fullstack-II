import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('fs_token') || (currentUser && currentUser.token);
        const res = await fetch(`/api/orders/${id}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
        if (!res.ok) throw new Error('No autorizado o pedido no encontrado');
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        setError(String(err.message || err));
      } finally {
        setLoading(false);
      }
    })();
  }, [id, currentUser]);

  if (!currentUser) return (
    <div className="admin-page container admin-card">
      <h2>Acceso denegado</h2>
      <p>Debes iniciar sesión como administrador para ver el detalle del pedido.</p>
      <div className="admin-actions"><button className="admin-btn" onClick={() => navigate('/login')}>Ir a Login</button></div>
    </div>
  );

  return (
    <div className="admin-page container admin-card">
      <h2>Detalle Pedido #{id}</h2>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'var(--danger-color)' }}>{error}</p>}
      {order && (
        <div>
          <p><strong>Id:</strong> {order.id}</p>
          <p><strong>Usuario:</strong> {order.user_id}</p>
          <p><strong>Total:</strong> ${order.total}</p>
          <p><strong>Estado:</strong> {order.status}</p>
          <h3>Items</h3>
          <ul>
            {Array.isArray(order.items) && order.items.map(it => (
              <li key={it.id || `${it.product_id}-${Math.random()}`}>
                Producto: {it.product_id} — Cantidad: {it.qty} — Precio: ${it.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
