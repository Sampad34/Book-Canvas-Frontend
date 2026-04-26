// src/pages/Cart/Components/CartList.js

import { Checkout } from "./CheckOut";
import { useState } from "react";
import { CartCard } from "./CartCard";
import { useCart } from "../../../context";
import { Link } from "react-router-dom";

export const CartList = () => {
  const [checkOut, setCheckout] = useState(false);
  const { cartList, total, clearCart } = useCart();

  const totalItems = cartList.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0,
  );
  const originalTotal = cartList.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0,
  );
  const savings = originalTotal - total;
  const discount =
    savings > 0 ? ((savings / originalTotal) * 100).toFixed(0) : 0;

  return (
    <>
      {/* Cart Header */}
      <section className="pt-8 pb-4">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Your Shopping Cart
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
          </p>
        </div>
      </section>

      {/* Cart Items */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="space-y-4">
          {cartList.map((product) => (
            <CartCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Cart Summary */}
      {cartList.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            {/* Summary Header */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Order Summary
              </h3>
            </div>

            {/* Summary Details */}
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 dark:text-gray-400">
                  Subtotal ({totalItems} items)
                </span>
                <span className="text-gray-900 dark:text-white font-semibold">
                  ${originalTotal.toFixed(2)}
                </span>
              </div>

              {savings > 0 && (
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-green-600 dark:text-green-400">
                    Discount
                  </span>
                  <span className="text-green-600 dark:text-green-400 font-semibold">
                    -${savings.toFixed(2)} ({discount}% off)
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 dark:text-gray-400">
                  Shipping
                </span>
                <span className="text-green-600 dark:text-green-400 font-semibold">
                  Free
                </span>
              </div>

              <div className="flex justify-between items-center py-3 border-t-2 border-gray-200 dark:border-gray-700 mt-2">
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  Total Amount
                </span>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  ${total.toFixed(2)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link
                  to="/products"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold rounded-xl transition-all duration-300"
                >
                  <i className="bi bi-arrow-left"></i>
                  Continue Shopping
                </Link>
                <button
                  onClick={clearCart}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-semibold rounded-xl transition-all duration-300"
                >
                  <i className="bi bi-trash3"></i>
                  Clear Cart
                </button>
                <button
                  onClick={() => setCheckout(true)}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Proceed to Checkout
                  <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {checkOut && <Checkout setCheckout={setCheckout} />}
    </>
  );
};
