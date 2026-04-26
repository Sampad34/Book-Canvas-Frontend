import { Checkout } from "./CheckOut";
import { useState } from "react";
import { CartCard } from "./CartCard";
import { useCart } from "../../../context";

export const CartList = () => {
  const [checkOut, setCheckout] = useState(false);
  const { cartList, total } = useCart();

  return (
    <>
      {/* Cart Header */}
      <section className="pt-8 pb-4">
        <h2 className="text-2xl sm:text-3xl text-center font-extrabold dark:text-slate-100">
          My Cart
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400">
          {cartList.length} {cartList.length === 1 ? "item" : "items"} in your
          cart
        </p>
      </section>

      {/* Cart Items */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="space-y-4">
          {cartList.map((product) => (
            <CartCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Total & Checkout */}
      {cartList.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Total Amount</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  ${total.toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => setCheckout(true)}
                className="inline-flex items-center justify-center gap-2 text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-semibold rounded-xl px-8 py-3 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Proceed to Checkout <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
        </section>
      )}

      {checkOut && <Checkout setCheckout={setCheckout} />}
    </>
  );
};
