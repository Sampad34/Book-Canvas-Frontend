import { Link } from "react-router-dom";

export const OrderSuccess = ({ data }) => {
  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4">
            <i className="bi bi-check-lg text-4xl text-green-500"></i>
          </div>
          <h2 className="text-2xl font-bold text-white">Payment Successful!</h2>
          <p className="text-green-100 mt-1">Thank you for your purchase</p>
        </div>

        <div className="p-6">
          <div className="space-y-3 mb-6">
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Order ID</span>
              <span className="font-mono font-semibold text-gray-900 dark:text-white">
                {data?.id}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">
                Customer Name
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {data?.user?.name}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Email</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {data?.user?.email}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600 dark:text-gray-400">
                Amount Paid
              </span>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ${data?.amount_paid?.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 mb-6">
            <p className="text-sm text-green-700 dark:text-green-300 flex items-center gap-2">
              <i className="bi bi-envelope-paper"></i>
              Confirmation email sent to {data?.user?.email}
            </p>
          </div>

          <Link
            to="/products"
            className="block w-full text-center py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};
