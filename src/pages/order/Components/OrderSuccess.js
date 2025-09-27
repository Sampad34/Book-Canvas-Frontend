import { Link } from "react-router-dom";

export const OrderSuccess = ({ data }) => {
  return (
    <section className="flex flex-col items-center justify-center text-center max-w-3xl sm:max-w-4xl mx-auto my-10 px-4 py-8 border rounded-lg dark:border-slate-700 dark:bg-gray-800 dark:text-slate-100 shadow-md">
      
      {/* Success Icon & Message */}
      <div className="mb-6 flex flex-col items-center">
        <span className="bi bi-check-circle text-green-600 text-6xl sm:text-7xl mb-4"></span>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-2">
          Thank you, {data.user.name}!
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg">
          Your Order ID: <span className="font-medium">{data.id}</span>
        </p>
      </div>

      {/* Order & Payment Info */}
      <div className="mb-6 text-gray-600 dark:text-gray-400 text-sm sm:text-base space-y-2">
        <p>Your order is confirmed.</p>
        <p>Please check your email (<span className="font-medium text-blue-500">{data.user.email}</span>) for the eBook.</p>
        <p>Payment ID: <span className="font-medium">xyz_123456789</span></p>
      </div>

      {/* Continue Shopping Button */}
      <Link
        to="/products"
        className="inline-flex items-center justify-center bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium rounded-lg text-base sm:text-lg px-6 py-3 transition-all duration-200"
      >
        Continue Shopping <i className="ml-2 bi bi-cart"></i>
      </Link>
    </section>
  );
};
