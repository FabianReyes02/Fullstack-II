import React from 'react';
import { useCart } from '../../context/CartContext';

export default function Cart() {
  const { cart, removeFromCart, changeQuantity, totalAmount } = useCart();
  const { clearCart } = useCart();
  const [purchased, setPurchased] = React.useState(false);

  if (!cart) return null;

  function handlePurchase() {
    if (!cart || cart.length === 0) return alert('El carrito está vacío.');
    // Simular compra
    setPurchased(true);
    clearCart();
    setTimeout(() => setPurchased(false), 3000);
  }

  return (
    <div className="carrito">
      <h2>Carrito</h2>
      {purchased && <div className="compra-msg">¡Compra realizada! Gracias por tu compra.</div>}
      <ul className="carrito-list">
        {cart.length === 0 && <li>El carrito está vacío.</li>}
        {cart.map(item => (
          <li key={item.id}>
            <img src={item.imagen || item.image || 'https://via.placeholder.com/50'} alt={item.nombre || item.name} width={50} height={35} style={{verticalAlign:'middle', borderRadius:4}} />
            <strong>{item.nombre || item.name}</strong> x
            <input type="number" min={1} max={99} value={item.cantidad} style={{width:40}} onChange={e => changeQuantity(item.id, e.target.value)} />
            - ${ (item.precio || item.price) * item.cantidad }
            <button onClick={() => removeFromCart(item.id)} style={{marginLeft:8}}>Quitar</button>
          </li>
        ))}
      </ul>
      <p className="carrito-total">Total: ${totalAmount()}</p>
      <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
        <button className="admin-btn" onClick={handlePurchase}>Comprar</button>
      </div>
    </div>
  );
}
