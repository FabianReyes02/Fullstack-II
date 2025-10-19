import React, { createContext, useContext, useEffect, useState } from 'react';
import * as productsAPI from '../data/products';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem('carrito');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(cart));
  }, [cart]);

  function addToCart(id) {
    const producto = productsAPI.getProduct(id);
    if (!producto) return;
    setCart(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing) {
        return prev.map(i => i.id === id ? { ...i, cantidad: i.cantidad + 1 } : i);
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(i => i.id !== id));
  }

  function changeQuantity(id, cantidad) {
    cantidad = parseInt(cantidad) || 1;
    if (cantidad < 1) cantidad = 1;
    setCart(prev => prev.map(i => i.id === id ? { ...i, cantidad } : i));
  }

  function totalAmount() {
    return cart.reduce((acc, i) => acc + (i.precio || i.price || 0) * (i.cantidad || 0), 0);
  }

  function totalItems() {
    return cart.reduce((acc, i) => acc + (i.cantidad || 0), 0);
  }

  const value = {
    cart,
    addToCart,
    removeFromCart,
    changeQuantity,
    totalAmount,
    totalItems,
    showCart,
    setShowCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartContext;
