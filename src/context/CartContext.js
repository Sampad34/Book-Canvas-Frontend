// src/context/CartContext.js

import { createContext, useContext, useReducer, useEffect } from "react";
import { CartReducer } from "../reducers";

const cartInitialState = {
  cartList: [],
  total: 0,
};

const CartContext = createContext(cartInitialState);

// Load cart from localStorage
const loadCartFromStorage = () => {
  const savedCart = localStorage.getItem("bookverse_cart");
  if (savedCart) {
    try {
      return JSON.parse(savedCart);
    } catch {
      return cartInitialState;
    }
  }
  return cartInitialState;
};

// Save cart to localStorage
const saveCartToStorage = (cartState) => {
  localStorage.setItem(
    "bookverse_cart",
    JSON.stringify({
      cartList: cartState.cartList,
      total: cartState.total,
    }),
  );
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, loadCartFromStorage());

  // Save to localStorage whenever cart changes
  useEffect(() => {
    saveCartToStorage(state);
  }, [state]);

  function addToCart(product) {
    // Check if product already exists in cart
    const existingItem = state.cartList.find((item) => item.id === product.id);

    if (existingItem) {
      // Update quantity if already in cart
      const updatedList = state.cartList.map((item) =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item,
      );
      const updatedTotal = state.total + product.price;

      dispatch({
        type: "UPDATE_CART",
        payload: {
          products: updatedList,
          total: updatedTotal,
        },
      });
    } else {
      // Add new item with quantity 1
      const updatedList = [...state.cartList, { ...product, quantity: 1 }];
      const updatedTotal = state.total + product.price;

      dispatch({
        type: "ADD_TO_CART",
        payload: {
          products: updatedList,
          total: updatedTotal,
        },
      });
    }
  }

  function removeFromCart(product) {
    const updatedList = state.cartList.filter((item) => item.id !== product.id);
    const itemToRemove = state.cartList.find((item) => item.id === product.id);
    const updatedTotal =
      state.total - itemToRemove.price * (itemToRemove.quantity || 1);

    dispatch({
      type: "REMOVE_FROM_CART",
      payload: {
        products: updatedList,
        total: updatedTotal,
      },
    });
  }

  function updateQuantity(productId, newQuantity) {
    const updatedList = state.cartList.map((item) => {
      if (item.id === productId) {
        // FIXED: Removed unused variable 'quantityDiff'
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    // Recalculate total
    const updatedTotal = updatedList.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0,
    );

    dispatch({
      type: "UPDATE_CART",
      payload: {
        products: updatedList,
        total: updatedTotal,
      },
    });
  }

  function clearCart() {
    dispatch({
      type: "CLEAR_CART",
      payload: {
        products: [],
        total: 0,
      },
    });
  }

  const value = {
    cartList: state.cartList,
    total: state.total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
