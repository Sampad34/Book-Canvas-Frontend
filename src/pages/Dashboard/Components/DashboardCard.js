import { Link } from "react-router-dom";

export const DashboardCard = ({ order }) => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 mb-6 border rounded-xl shadow-md dark:border-slate-700 dark:bg-gray-800 transition-transform hover:scale-[1.01] duration-200">
      
      {/* Order Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm sm:text-base font-semibold mb-4 text-gray-800 dark:text-slate-200 gap-2 sm:gap-0">
        <span>
          Order ID: <span className="font-medium">{order.id}</span>
        </span>
        <span>
          Total: <span className="font-medium text-green-500">${order.amount_paid.toFixed(2)}</span>
        </span>
      </div>

      {/* Products List */}
      <div className="flex flex-col gap-4">
        {order.cartList.map((product) => (
          <div
            key={product.id}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-slate-600 transition-shadow hover:shadow-lg"
          >
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <Link to={`/products/${product.id}`}>
                <img
                  className="w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 object-cover rounded-lg shadow-sm"
                  src={`${process.env.REACT_APP_HOST}${product.poster}`}
                  alt={product.name}
                />
              </Link>
              <div className="flex flex-col">
                <Link to={`/products/${product.id}`}>
                  <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-slate-100 hover:underline">
                    {product.name}
                  </p>
                </Link>
                <span className="text-gray-700 dark:text-slate-200 text-sm sm:text-base mt-1">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
