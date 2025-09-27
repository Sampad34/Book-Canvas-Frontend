import { Link } from "react-router-dom";

export const OrderFail = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center max-w-3xl sm:max-w-4xl mx-auto my-10 px-4 py-8 border rounded-lg dark:border-slate-700 dark:bg-gray-800 dark:text-slate-100 shadow-md">
      
      {/* Icon & Message */}
      <div className="mb-6 flex flex-col items-center">
        <span className="bi bi-exclamation-circle text-red-500 text-6xl sm:text-7xl mb-4"></span>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-2">
          Payment Failed
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg">
          Your payment could not be processed. Please try again.
        </p>
      </div>

      {/* Support Info */}
      <div className="mb-6 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
        <p>Your order is not confirmed.</p>
        <p>
          Contact <span className="font-medium text-blue-500">codebook@example.com</span> for support.
        </p>
      </div>

      {/* Action Button */}
      <Link
        to="/cart"
        className="inline-flex items-center justify-center bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium rounded-lg text-base sm:text-lg px-6 py-3 transition-all duration-200"
      >
        Check Cart Again <i className="ml-2 bi bi-cart"></i>
      </Link>
    </section>
  );
};
