import { Link } from "react-router-dom";

export const DashboardCard = ({ order }) => {
  const orderDate = new Date(
    order.createdAt || Date.now(),
  ).toLocaleDateString();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Order Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Order ID</p>
          <p className="font-mono text-sm font-semibold text-gray-800 dark:text-gray-200">
            {order.id}
          </p>
        </div>
        <div className="mt-2 sm:mt-0">
          <p className="text-sm text-gray-500 dark:text-gray-400">Order Date</p>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {orderDate}
          </p>
        </div>
        <div className="mt-2 sm:mt-0">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Amount
          </p>
          <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            ${order.amount_paid?.toFixed(2) || "0.00"}
          </p>
        </div>
      </div>

      {/* Products List */}
      <div className="p-5 space-y-4">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Items ({order.cartList?.length || 0})
        </p>
        <div className="space-y-3">
          {order.cartList?.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50"
            >
              <Link to={`/products/${product.id}`}>
                <img
                  className="w-16 h-16 object-cover rounded-lg shadow-sm"
                  src={`${process.env.REACT_APP_HOST}${product.poster}`}
                  alt={product.name}
                />
              </Link>
              <div className="flex-1">
                <Link to={`/products/${product.id}`}>
                  <p className="font-semibold text-gray-800 dark:text-white hover:text-blue-600 transition">
                    {product.name}
                  </p>
                </Link>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  ${product.price?.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
