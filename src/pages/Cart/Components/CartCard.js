// src/pages/Cart/Components/CartCard.js

import { Link } from "react-router-dom";
import { useCart } from "../../../context";
import { useState } from "react";

export const CartCard = ({ product }) => {
  const { removeFromCart, updateQuantity } = useCart();
  const [quantity, setQuantity] = useState(product.quantity || 1);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    updateQuantity(product.id, newQuantity);
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row gap-4 p-4">
        {/* Product Image */}
        <Link
          to={`/products/${product.id}`}
          className="flex-shrink-0 self-center sm:self-auto"
        >
          <img
            className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300"
            src={`${process.env.REACT_APP_HOST}${product.poster}`}
            alt={product.name}
          />
        </Link>

        {/* Product Details */}
        <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1">
            <Link to={`/products/${product.id}`}>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2">
                {product.name}
              </h3>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
              {product.overview}
            </p>

            {/* Price per item */}
            <div className="mt-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Price:{" "}
              </span>
              <span className="text-base font-semibold text-gray-900 dark:text-white">
                ${product.price.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="w-8 h-8 rounded-lg bg-white dark:bg-gray-600 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-500 transition-all flex items-center justify-center font-bold shadow-sm"
                aria-label="Decrease quantity"
              >
                <i className="bi bi-dash-lg text-sm"></i>
              </button>
              <span className="w-10 text-center font-semibold text-gray-900 dark:text-white">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="w-8 h-8 rounded-lg bg-white dark:bg-gray-600 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-500 transition-all flex items-center justify-center font-bold shadow-sm"
                aria-label="Increase quantity"
              >
                <i className="bi bi-plus-lg text-sm"></i>
              </button>
            </div>

            {/* Subtotal */}
            <div className="text-right min-w-[100px]">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Subtotal
              </p>
              <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ${(product.price * quantity).toFixed(2)}
              </p>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeFromCart(product)}
              className="p-2 rounded-lg text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
              aria-label="Remove item"
            >
              <i className="bi bi-trash3 text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
