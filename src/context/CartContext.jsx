import { createContext, useEffect, useMemo, useState } from "react";

export const CartContext = createContext();

const STORAGE_KEY = "cart";

const getInitialCart = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];

  try {
    return JSON.parse(stored);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(getInitialCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (vinilo, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item._id === vinilo._id);

      if (existing) {
        return current.map((item) =>
          item._id === vinilo._id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [
        ...current,
        {
          _id: vinilo._id,
          title: vinilo.title,
          image: vinilo.image,
          price: vinilo.price,
          quantity,
        },
      ];
    });
  };

  const removeItem = (viniloId) => {
    setItems((current) => current.filter((item) => item._id !== viniloId));
  };

  const updateQuantity = (viniloId, quantity) => {
    if (quantity < 1) {
      removeItem(viniloId);
      return;
    }

    setItems((current) =>
      current.map((item) =>
        item._id === viniloId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items],
  );

  const totalPrice = useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [items],
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
