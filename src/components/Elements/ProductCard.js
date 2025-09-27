import { Link } from "react-router-dom";
import { Ratings } from "./Ratings";
import { useCart } from "../../context";
import { useEffect, useState } from "react";

export const ProductCard = ({ product }) => {
  const { cartList, addToCart, removeFromCart } = useCart();
  const [inCart, setInCart] = useState(false);

  const { id, name, overview, poster, price, rating, best_seller, in_stock } = product;

  useEffect(() => {
    setInCart(cartList.some((item) => item.id === id));
  }, [cartList, id]);

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 max-w-sm w-full mx-auto">
      
      {/* Product Image */}
      <Link to={`/products/${id}`} className="relative block overflow-hidden rounded-t-2xl">
        {best_seller && (
          <span className="absolute top-3 left-3 px-2 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full shadow-sm z-10">
            Best Seller
          </span>
        )}
        <img
          className="w-full h-64 sm:h-72 md:h-80 object-cover transform transition-transform duration-300 hover:scale-105"
          src={`${process.env.REACT_APP_HOST}${poster}`}
          alt={name}
        />
      </Link>

      {/* Product Info */}
      <div className="p-5 flex flex-col gap-3">
        <Link to={`/products/${id}`}>
          <h5 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white hover:text-indigo-600 transition-colors truncate">
            {name}
          </h5>
        </Link>

        <p className="text-gray-700 dark:text-gray-400 text-sm sm:text-base line-clamp-3">
          {overview}
        </p>

        <div className="flex items-center mt-1">
          <Ratings rating={rating} />
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mt-3">
          <span className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-200">
            ${price}
          </span>

          {!inCart ? (
            <button
              onClick={() => addToCart(product)}
              disabled={!in_stock}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 py-2 px-4 text-sm sm:text-base font-medium rounded-lg transition-colors duration-200 ${
                in_stock ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white" : "bg-blue-300 cursor-not-allowed text-white"
              }`}
            >
              Add To Cart <i className="bi bi-plus-lg"></i>
            </button>
          ) : (
            <button
              onClick={() => removeFromCart(product)}
              disabled={!in_stock}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 py-2 px-4 text-sm sm:text-base font-medium rounded-lg transition-colors duration-200 ${
                in_stock ? "bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white" : "bg-red-300 cursor-not-allowed text-white"
              }`}
            >
              Remove Item <i className="bi bi-trash3"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
