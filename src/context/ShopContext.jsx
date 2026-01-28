import { createContext, useState, useContext, useEffect } from "react";

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  // Ładowanie historii z localStorage 
  useEffect(() => {
    const savedOrders = localStorage.getItem("orderHistory");
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  const addToCart = (product, quantity) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + parseInt(quantity) }
            : item
        );
      }
      return [...prev, { ...product, quantity: parseInt(quantity) }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

const placeOrder = (userData) => {
    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      username: userData.username, 
    };

    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem("orderHistory", JSON.stringify(updatedOrders));
    clearCart();
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        placeOrder,
        orders,
        getCartTotal,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
