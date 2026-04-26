import { Link } from "react-router-dom";
import { useCart } from "../../../context";

export const CartCard = ({ product }) => {
  const { removeFromCart } = useCart();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
      {/* Product Info */}
      <div className="flex items-center gap-4 flex-1">
        <Link to={`/products/${product.id}`} className="flex-shrink-0">
          <img
            className="w-20 h-20 object-cover rounded-lg shadow-md"
            src={`${process.env.REACT_APP_HOST}${product.poster}`}
            alt={product.name}
          />
        </Link>
        <div className="flex-1">
          <Link to={`/products/${product.id}`}>
            <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 transition">
              {product.name}
            </p>
          </Link>
          <button
            onClick={() => removeFromCart(product)}
            className="mt-1 text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="text-xl font-bold text-gray-900 dark:text-white">
        ${product.price.toFixed(2)}
      </div>
    </div>
  );
};
