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
        <h2 className="text-2xl md:text-3xl text-center font-semibold dark:text-slate-100 my-8 underline underline-offset-4">
          My Cart ({cartList.length})
        </h2>
      </section>

      {/* Cart Items */}
      <section className="flex flex-col gap-4 md:gap-6 mb-6">
        {cartList.map((product) => (
          <CartCard key={product.id} product={product} />
        ))}
      </section>

      {/* Total & Checkout */}
      <section className="max-w-3xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center p-4 border-b dark:border-slate-700 bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-5">
          <p className="text-lg md:text-xl font-semibold dark:text-slate-100 mb-2 md:mb-0">
            Total Amount:
          </p>
          <p className="text-lg md:text-xl font-semibold dark:text-slate-100">${total}</p>
        </div>
        <div className="text-center md:text-right">
          <button
            onClick={() => setCheckout(true)}
            type="button"
            className="inline-flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 font-medium rounded-lg text-base px-6 py-3 transition"
          >
            PLACE ORDER <i className="ml-2 bi bi-arrow-right"></i>
          </button>
        </div>
      </section>

      {checkOut && <Checkout setCheckout={setCheckout} />}
    </>
  );
};
