import { useState, useEffect } from "react";
import { Ratings } from "../components";
import { useParams } from "react-router-dom";
import { UseTitle } from "../hooks/UseTitle";
import { useCart } from "../context";
import { getProduct } from "../services";
import { toast } from "react-toastify";

export const ProductDetails = () => {
  const { cartList, addToCart, removeFromCart } = useCart();
  const [inCart, setInCart] = useState(false);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  UseTitle(product.name || "Product Details");

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const data = await getProduct(id);
        setProduct(data);
      } catch (error) {
        toast.error(error.message || "Failed to fetch product details", {
          closeButton: true,
          position: "bottom-center",
          autoClose: 5000,
        });
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  useEffect(() => {
    setInCart(cartList.some((item) => item.id === product.id));
  }, [cartList, product.id]);

  if (loading) {
    return (
      <main className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </main>
    );
  }

  if (!product.id) {
    return (
      <main className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 dark:text-gray-400">Product not found</p>
      </main>
    );
  }

  return (
    <main className="px-4 sm:px-6 md:px-10 lg:px-20 py-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          <span
            className="hover:text-blue-600 cursor-pointer"
            onClick={() => window.history.back()}
          >
            ← Back
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:items-start">
          {/* Product Image */}
          <div className="flex-shrink-0 w-full lg:w-1/2 max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-xl bg-white dark:bg-gray-800">
            <img
              src={`${process.env.REACT_APP_HOST}${product.poster}`}
              alt={product.name}
              className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 w-full">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              {product.name}
            </h1>

            <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
              {product.overview}
            </p>

            <div className="flex items-center gap-4 mb-4">
              <Ratings rating={product.rating} />
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                {product.reviews_count || 0} reviews
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {product.best_seller && (
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  BEST SELLER
                </span>
              )}
              {product.in_stock ? (
                <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-semibold px-3 py-1 rounded-full">
                  ✓ IN STOCK
                </span>
              ) : (
                <span className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 text-xs font-semibold px-3 py-1 rounded-full">
                  ✗ OUT OF STOCK
                </span>
              )}
              {product.size && (
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-semibold px-3 py-1 rounded-full">
                  📦 {product.size} MB
                </span>
              )}
            </div>

            <div className="mb-6">
              <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ${product.price}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {!inCart ? (
                <button
                  onClick={() => addToCart(product)}
                  disabled={!product.in_stock}
                  className={`flex-1 inline-flex items-center justify-center gap-2 py-3 px-6 text-lg font-semibold text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 ${
                    product.in_stock
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Add To Cart <i className="bi bi-cart-plus"></i>
                </button>
              ) : (
                <button
                  onClick={() => removeFromCart(product)}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-6 text-lg font-semibold text-white bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Remove from Cart <i className="bi bi-trash"></i>
                </button>
              )}
            </div>

            {product.long_description && (
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Description
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {product.long_description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
