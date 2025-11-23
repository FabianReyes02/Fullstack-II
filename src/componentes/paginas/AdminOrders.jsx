import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminOrders() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('fs_token') || (currentUser && currentUser.token);
        const res = await fetch('/api/orders', { headers: token ? { Authorization: `Bearer ${token}` } : {} });
        if (!res.ok) throw new Error('No autorizado o error al listar pedidos');
        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(String(err.message || err));
      } finally {
        setLoading(false);
      }
    })();
  }, [currentUser]);

  if (!currentUser) return (
    <div className="admin-page container admin-card">
      <h2>Acceso denegado</h2>
      <p>Debes iniciar sesión como administrador para ver los pedidos.</p>
      <div className="admin-actions"><button className="admin-btn" onClick={() => navigate('/login')}>Ir a Login</button></div>
    </div>
  );

  return (
    <div className="admin-page container admin-card">
      <h2>Pedidos</h2>
      {loading && <p>Cargando pedidos...</p>}
      {error && <p style={{ color: 'var(--danger-color)' }}>{error}</p>}
      {!loading && !error && orders.length === 0 && <p>No hay pedidos.</p>}
      <div className="admin-list">
        {orders.map(o => (
          <div key={o.id} className="admin-item">
            <div>
              <strong>Pedido #{o.id}</strong>
              <div className="admin-desc">Usuario: {o.user_id} — Total: ${o.total} — Estado: {o.status || '—'}</div>
            </div>
            <div className="admin-actions">
              <Link to={`/admin/orders/${o.id}`} className="admin-btn">Ver detalle</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
