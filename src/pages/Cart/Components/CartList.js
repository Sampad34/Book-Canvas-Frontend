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
      <section>
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-extrabold dark:text-slate-100 my-8 underline underline-offset-4">
          My Cart ({cartList.length})
        </h2>
      </section>

      {/* Cart Items */}
      <section className="flex flex-col gap-4 sm:gap-5 md:gap-6 mb-8 px-4 sm:px-6 md:px-0">
        {cartList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {cartList.map((product) => (
              <CartCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 text-base sm:text-lg">
            Your cart is empty.
          </p>
        )}
      </section>

      {/* Total & Checkout */}
      {cartList.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 md:px-0">
          <div className="flex flex-col md:flex-row justify-between items-center p-4 md:p-6 border-b dark:border-slate-700 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-5 gap-3 md:gap-0">
            <p className="text-lg sm:text-xl md:text-2xl font-semibold dark:text-slate-100">
              Total Amount:
            </p>
            <p className="text-lg sm:text-xl md:text-2xl font-semibold dark:text-slate-100">
              ${total.toFixed(2)}
            </p>
          </div>
          <div className="text-center md:text-right">
            <button
              onClick={() => setCheckout(true)}
              type="button"
              className="inline-flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 font-medium rounded-lg text-base sm:text-lg md:text-xl px-6 sm:px-8 py-3 sm:py-4 transition-transform transform hover:scale-105 shadow-lg"
            >
              PLACE ORDER <i className="ml-2 bi bi-arrow-right"></i>
            </button>
          </div>
        </section>
      )}

      {checkOut && <Checkout setCheckout={setCheckout} />}
    </>
  );
};
