import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (pizza) => {
    const existingItem = cart.find(item => item.id === pizza.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === pizza.id
          ? { ...item, count: item.count + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...pizza, count: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const increaseQuantity = (id) => {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, count: item.count + 1 }
        : item
    ));
  };

  const decreaseQuantity = (id) => {
    setCart(cart.map(item =>
      item.id === id && item.count > 1
        ? { ...item, count: item.count - 1 }
        : item
    ).filter(item => item.count > 0));
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.count), 0);
  };

  const getItemCount = () => {
    return cart.reduce((total, item) => total + item.count, 0);
  };

  const clearCart = () => {
    setCart([]);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getTotal,
    getItemCount,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};