import { Link } from "react-router-dom";
import { useCart } from "../../../context";

export const CartCard = ({ product }) => {
  const { removeFromCart } = useCart();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center border-b dark:border-slate-700 max-w-4xl mx-auto p-4 sm:p-6 mb-6 gap-4 sm:gap-6 transition-transform hover:scale-[1.01] duration-200">
      
      {/* Product Info */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <Link to={`products/${product.id}`}>
          <img
            className="w-24 sm:w-32 h-24 sm:h-32 object-cover rounded-lg shadow-sm dark:shadow-none"
            src={`${process.env.REACT_APP_HOST}${product.poster}`}
            alt={product.name}
          />
        </Link>
        <div className="flex flex-col justify-between">
          <Link to={`products/${product.id}`}>
            <p className="text-base sm:text-lg md:text-xl font-medium text-gray-900 dark:text-slate-200 hover:underline">
              {product.name}
            </p>
          </Link>
          <button
            onClick={() => removeFromCart(product)}
            className="mt-2 text-sm sm:text-base text-red-500 hover:text-red-600 transition-colors duration-200"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-slate-200 mt-2 sm:mt-0">
        ${product.price}
      </div>
    </div>
  );
};
