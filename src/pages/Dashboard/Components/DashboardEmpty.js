import { Link } from "react-router-dom";

export const DashboardEmpty = () => {
  return (
    <div className="text-center py-12">
      <div className="mb-6">
        <span className="bi bi-inbox text-6xl sm:text-7xl text-gray-400"></span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-semibold dark:text-slate-100 mb-2">
        No Orders Yet
      </h2>

      <p className="text-gray-500 dark:text-gray-400 mb-8">
        You haven't placed any orders. Start shopping to see your orders here!
      </p>

      <Link
        to="/products"
        className="inline-flex items-center justify-center gap-2 text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-semibold rounded-xl px-6 py-3 transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        <i className="bi bi-cart"></i>
        Start Shopping
      </Link>
    </div>
  );
};
