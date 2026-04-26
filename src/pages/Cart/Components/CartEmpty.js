import { Link } from "react-router-dom";

export const CartEmpty = () => {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-6">
          <span className="bi bi-cart-x text-7xl sm:text-8xl text-gray-400"></span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-semibold dark:text-slate-100 mb-2">
          Your cart is empty
        </h2>

        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Looks like you haven't added any items to your cart yet.
        </p>

        <Link
          to="/products"
          className="inline-flex items-center justify-center gap-2 text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-semibold rounded-xl px-6 py-3 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <i className="bi bi-cart-plus"></i>
          Start Shopping
        </Link>
      </div>
    </section>
  );
};
