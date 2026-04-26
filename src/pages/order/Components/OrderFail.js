import { Link } from "react-router-dom";

export const OrderFail = () => {
  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-red-500 to-rose-600 p-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4">
            <i className="bi bi-x-lg text-4xl text-red-500"></i>
          </div>
          <h2 className="text-2xl font-bold text-white">Payment Failed</h2>
          <p className="text-red-100 mt-1">
            Something went wrong with your transaction
          </p>
        </div>

        <div className="p-6">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 mb-6">
            <p className="text-sm text-red-700 dark:text-red-300 flex items-center gap-2">
              <i className="bi bi-exclamation-triangle-fill"></i>
              Your order has not been confirmed. Please try again.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/cart"
              className="flex-1 text-center py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-300"
            >
              Return to Cart
            </Link>
            <Link
              to="/products"
              className="flex-1 text-center py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
