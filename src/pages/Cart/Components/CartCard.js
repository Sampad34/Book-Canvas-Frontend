import { Link } from "react-router-dom";
import { useCart } from "../../../context";

export const CartCard = ({ product }) => {
  const { removeFromCart } = useCart();

  return (
    <div className="flex flex-col md:flex-row justify-between items-center border-b dark:border-slate-700 max-w-4xl mx-auto p-4 sm:p-6 mb-6 gap-4 sm:gap-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-transform transform hover:scale-102 duration-200">
      
      {/* Product Info */}
      <div className="flex items-center gap-4 w-full md:w-2/3">
        <Link to={`products/${product.id}`} className="flex-shrink-0">
          <img
            className="w-24 sm:w-32 h-24 sm:h-32 object-cover rounded-lg shadow-sm dark:shadow-none"
            src={`${process.env.REACT_APP_HOST}${product.poster}`}
            alt={product.name}
          />
        </Link>
        <div className="flex flex-col justify-between flex-1">
          <Link to={`products/${product.id}`}>
            <p className="text-base sm:text-lg md:text-xl font-medium text-gray-900 dark:text-slate-200 hover:underline truncate">
              {product.name}
            </p>
          </Link>
          <button
            onClick={() => removeFromCart(product)}
            className="mt-2 sm:mt-4 text-sm sm:text-base text-red-500 hover:text-red-600 font-medium transition-colors duration-200 self-start"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 dark:text-slate-200 mt-3 md:mt-0 md:text-right w-full md:w-1/6">
        ${product.price.toFixed(2)}
      </div>
    </div>
  );
};
