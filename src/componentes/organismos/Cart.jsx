import React from 'react';
import { useCart } from '../../context/CartContext';

export default function Cart() {
  const { cart, removeFromCart, changeQuantity, totalAmount, clearCart } = useCart();
  const [purchased, setPurchased] = React.useState(false);

  if (!cart) return null;

  function handlePurchase() {
    if (!cart || cart.length === 0) {
      alert('El carrito está vacío.');
      return;
    }
    setPurchased(true);
    clearCart();
    setTimeout(() => setPurchased(false), 3000);
  }

  return (
    <div className="carrito">
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Tu Carrito</h2>
      {purchased && <div className="compra-msg">¡Gracias por tu compra!</div>}
      {cart.length === 0 && !purchased && <p>Tu carrito está vacío.</p>}
      <ul className="carrito-list">
        {cart.map(item => (
          <li key={item.id}>
            <img src={item.imagen || item.image || 'https://via.placeholder.com/50'} alt={item.nombre || item.name} width={60} height={60} style={{ borderRadius: '8px' }} />
            <div style={{ flexGrow: 1 }}>
              <strong>{item.nombre || item.name}</strong>
              <div>${item.precio || item.price} x <input type="number" min={1} value={item.cantidad} onChange={e => changeQuantity(item.id, e.target.value)} /></div>
            </div>
            <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      {cart.length > 0 && (
        <>
          <div className="carrito-total">
            Total: ${totalAmount()}
          </div>
          <button onClick={handlePurchase} style={{ width: '100%', marginTop: '1rem' }}>
            Finalizar Compra
          </button>
        </>
      )}
    </div>
  );
}
