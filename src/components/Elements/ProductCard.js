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
    <div className="group flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 max-w-sm w-full mx-auto overflow-hidden">
      
      {/* Product Image */}
      <Link to={`/products/${id}`} className="relative block overflow-hidden">
        {best_seller && (
          <span className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold rounded-full shadow-md">
            ⭐ Best Seller
          </span>
        )}
        <img
          className="w-full h-64 sm:h-72 object-cover transition-transform duration-500 group-hover:scale-110"
          src={`${process.env.REACT_APP_HOST}${poster}`}
          alt={name}
        />
        {!in_stock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="px-3 py-1 bg-red-500 text-white font-semibold rounded-full">Out of Stock</span>
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="p-5 flex flex-col gap-3">
        <Link to={`/products/${id}`}>
          <h5 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate">
            {name}
          </h5>
        </Link>

        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
          {overview}
        </p>

        <div className="flex items-center mt-1">
          <Ratings rating={rating} />
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            ${price}
          </span>

          {!inCart ? (
            <button
              onClick={() => addToCart(product)}
              disabled={!in_stock}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 py-2.5 px-5 text-sm font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                in_stock 
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md" 
                  : "bg-gray-400 cursor-not-allowed text-white"
              }`}
            >
              Add To Cart <i className="bi bi-plus-lg"></i>
            </button>
          ) : (
            <button
              onClick={() => removeFromCart(product)}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 py-2.5 px-5 text-sm font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                in_stock 
                  ? "bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 text-white shadow-md" 
                  : "bg-gray-400 cursor-not-allowed text-white"
              }`}
            >
              Remove <i className="bi bi-trash3"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};