// src/pages/Cart/Components/CartEmpty.js

import { Link } from "react-router-dom";

export const CartEmpty = () => {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-6">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center">
            <i className="bi bi-cart-x text-6xl text-gray-400 dark:text-gray-500"></i>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Your cart is empty
        </h2>

        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Looks like you haven't added any items to your cart yet. Browse our
          collection and find your next favorite eBook!
        </p>

        <Link
          to="/products"
          className="inline-flex items-center justify-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <i className="bi bi-grid-3x3-gap-fill"></i>
          Browse eBooks
          <i className="bi bi-arrow-right"></i>
        </Link>

        {/* Recommended Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            🎉 Free shipping on all orders • 14-day money-back guarantee
          </p>
        </div>
      </div>
    </section>
  );
};
