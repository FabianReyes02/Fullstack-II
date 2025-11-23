import React from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function Cart() {
  const { cart, removeFromCart, changeQuantity, totalAmount, clearCart, setShowCart } = useCart();
  const { currentUser } = useAuth();
  const [purchased, setPurchased] = React.useState(false);
  const [purchaseLoading, setPurchaseLoading] = React.useState(false);
  const [purchaseError, setPurchaseError] = React.useState(null);

  if (!cart) return null;

  function handlePurchase() {
    (async () => {
      if (!cart || cart.length === 0) {
        alert('El carrito está vacío.');
        return;
      }

      const items = cart.map(it => ({ product_id: Number(it.id || it.product_id), qty: Number(it.cantidad || it.qty || 1) }));
      const token = localStorage.getItem('fs_token') || (currentUser && currentUser.token);
      if (!token) {
        if (window.confirm('Debes iniciar sesión para realizar la compra. ¿Ir a Login?')) window.location.href = '/login';
        return;
      }

      setPurchaseLoading(true);
      setPurchaseError(null);
      try {
        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ items })
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || 'Error creating order');
        }
        const data = await res.json();
        setPurchased(true);
        clearCart();
        setTimeout(() => setPurchased(false), 3000);
      } catch (err) {
        console.error('Order error', err);
        setPurchaseError(String(err.message || err));
      } finally {
        setPurchaseLoading(false);
      }
    })();
  }

  return (
    <aside className="carrito" role="dialog" aria-label="Carrito de compras">
      <div className="carrito-header">
        <h3>Tu Carrito</h3>
        <button className="carrito-close" aria-label="Cerrar carrito" onClick={() => setShowCart(false)}>✕</button>
      </div>

      {purchased && <div className="compra-msg">¡Gracias por tu compra!</div>}

      {cart.length === 0 && !purchased && <p className="carrito-empty">Tu carrito está vacío.</p>}

      <ul className="carrito-list">
        {cart.map(item => (
          <li key={item.id} className="carrito-item">
            <img src={item.imagen || item.image || item.image_url || item.imageUrl || item.src || 'https://via.placeholder.com/60'} alt={item.nombre || item.name} width={60} height={60} className="carrito-item-img" />
            <div className="carrito-item-body">
              <div className="carrito-item-title">{item.nombre || item.name}</div>
              <div className="carrito-item-meta">
                <div className="carrito-price">${item.precio || item.price}</div>
                <div className="qty-control">
                  <button className="qty-btn" onClick={() => changeQuantity(item.id, (item.cantidad || 1) - 1)} aria-label={`Disminuir cantidad de ${item.nombre || item.name}`}>−</button>
                  <input className="qty-input" type="number" min={1} value={item.cantidad || 1} onChange={e => changeQuantity(item.id, e.target.value)} aria-label={`Cantidad de ${item.nombre || item.name}`} />
                  <button className="qty-btn" onClick={() => changeQuantity(item.id, (item.cantidad || 1) + 1)} aria-label={`Aumentar cantidad de ${item.nombre || item.name}`}>+</button>
                </div>
              </div>
            </div>
            <button className="carrito-remove" onClick={() => removeFromCart(item.id)} aria-label={`Eliminar ${item.nombre || item.name}`} title={`Eliminar ${item.nombre || item.name}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                <path d="M3 6h18"></path>
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                <path d="M10 11v6"></path>
                <path d="M14 11v6"></path>
                <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </li>
        ))}
      </ul>

      {cart.length > 0 && (
        <div className="carrito-footer">
          <div className="carrito-total">Total: <strong>${totalAmount()}</strong></div>
          <div style={{display:'flex',gap:'0.5rem',alignItems:'center'}}>
            <button className="btn btn-primary" onClick={handlePurchase} disabled={purchaseLoading}>
              {purchaseLoading ? 'Procesando...' : 'Finalizar Compra'}
            </button>
            {purchaseError && <div style={{color:'var(--danger-color)',fontSize:'0.9rem'}}>{purchaseError}</div>}
          </div>
        </div>
      )}
    </aside>
  );
}
