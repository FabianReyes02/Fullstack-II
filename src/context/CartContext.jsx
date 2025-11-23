import React, { createContext, useContext, useEffect, useState } from 'react';
import * as productsAPI from '../data/products';

const CartContext = createContext();

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    // Devuelve un objeto por defecto para evitar errores cuando el provider
    // no esté presente (por ejemplo en tests que renderizan componentes aislados).
    return {
      cart: [],
      addToCart: () => {},
      removeFromCart: () => {},
      changeQuantity: () => {},
      totalAmount: () => 0,
      totalItems: () => 0,
      showCart: false,
      setShowCart: () => {},
    };
  }
  return ctx;
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
    // nueva firma addToCart(id, cantidad = 1)
    const cantidad = arguments.length > 1 ? Number(arguments[1]) || 1 : 1;
    // getProduct es async; manejar correctamente
    productsAPI.getProduct(id).then(producto => {
      if (!producto) return;
      setCart(prev => {
        const existing = prev.find(i => i.id === id);
        if (existing) {
          return prev.map(i => i.id === id ? { ...i, cantidad: (i.cantidad || 0) + cantidad } : i);
        }
        return [...prev, { ...producto, cantidad }];
      });
    }).catch(err => {
      console.error('Failed to add product to cart', err);
    });
  }

  // Al montar, sanear carrito cargado desde localStorage: si hay items sin datos completos, rehidratar desde API
  useEffect(() => {
    let mounted = true;
    async function hydrate() {
      try {
        const needFix = cart.some(i => i && !(i.name || i.nombre) && (i.id || i.productId));
        if (!needFix) return;
        const fixed = await Promise.all(cart.map(async (i) => {
          if (!i) return i;
          if (i.name || i.nombre) return i;
          const pid = i.id || i.productId;
          try {
            const p = await productsAPI.getProduct(pid);
            return p ? { ...p, cantidad: i.cantidad || 1 } : i;
          } catch (e) {
            return i;
          }
        }));
        if (mounted) setCart(fixed);
      } catch (e) {
        // ignore
      }
    }
    hydrate();
    return () => { mounted = false; };
  }, []);

  function removeFromCart(id) {
    setCart(prev => prev.filter(i => i.id !== id));
  }

  function clearCart() {
    setCart([]);
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
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartContext;
