import { Link } from "react-router-dom";

export const DashboardCard = ({ order }) => {
  return (
    <div className="max-w-4xl mx-auto p-4 mb-6 border rounded-lg shadow-sm dark:border-slate-700 dark:bg-gray-800">
      {/* Order Header */}
      <div className="flex justify-between items-center text-sm font-semibold mb-4 text-gray-800 dark:text-slate-200">
        <span>Order ID: <span className="font-medium">{order.id}</span></span>
        <span>Total: <span className="font-medium text-green-500">${order.amount_paid}</span></span>
      </div>

      {/* Products List */}
      {order.cartList.map((product) => (
        <div
          key={product.id}
          className="flex flex-wrap items-center justify-between gap-4 mb-4 p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-slate-600"
        >
          <div className="flex items-center gap-4">
            <Link to={`/products/${product.id}`}>
              <img
                className="w-24 md:w-32 h-24 md:h-32 object-cover rounded-lg shadow-sm"
                src={`${process.env.REACT_APP_HOST}${product.poster}`}
                alt={product.name}
              />
            </Link>
            <div className="flex flex-col">
              <Link to={`/products/${product.id}`}>
                <p className="text-lg font-semibold text-gray-900 dark:text-slate-100 hover:underline">
                  {product.name}
                </p>
              </Link>
              <span className="text-gray-700 dark:text-slate-200 text-base mt-1">
                ${product.price}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
