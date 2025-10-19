import React from 'react';
import { useCart } from '../../context/CartContext';

export default function Cart() {
  const { cart, removeFromCart, changeQuantity, totalAmount } = useCart();

  if (!cart) return null;

  return (
    <div className="carrito">
      <h2>Carrito</h2>
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
    </div>
  );
}
