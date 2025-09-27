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
  const { id } = useParams();
  UseTitle(product.name);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProduct(id);
        setProduct(data);
      } catch (error) {
        toast.error(error.message || "Failed to fetch product details", {
          closeButton: true,
          position: "bottom-center",
          autoClose: 5000,
        });
      }
    }
    fetchProduct();
  }, [id]);

  useEffect(() => {
    setInCart(cartList.some((item) => item.id === product.id));
  }, [cartList, product.id]);

  return (
    <main className="px-4 sm:px-6 md:px-10 lg:px-20 py-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <section className="max-w-7xl mx-auto">
        {/* Product Header */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-slate-100 mb-3">
          {product.name}
        </h1>
        <p className="text-gray-700 dark:text-slate-300 text-center text-lg sm:text-xl mb-8">
          {product.overview}
        </p>

        <div className="flex flex-col lg:flex-row gap-10 lg:items-start justify-center">
          {/* Product Image */}
          <div className="flex-shrink-0 w-full lg:w-1/2 max-w-md rounded-lg overflow-hidden shadow-lg">
            <img
              src={`${process.env.REACT_APP_HOST}${product.poster}`}
              alt={product.name}
              className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 w-full max-w-xl flex flex-col gap-5">
            <p className="text-3xl font-bold text-gray-900 dark:text-slate-200">
              ${product.price}
            </p>

            <Ratings rating={product.rating} />

            <div className="flex flex-wrap gap-2">
              {product.best_seller && (
                <span className="bg-amber-50 text-amber-600 font-semibold px-3 py-1 rounded-lg border">
                  BEST SELLER
                </span>
              )}
              {product.in_stock ? (
                <span className="bg-emerald-50 text-emerald-600 font-semibold px-3 py-1 rounded-lg border">
                  IN STOCK
                </span>
              ) : (
                <span className="bg-rose-50 text-rose-600 font-semibold px-3 py-1 rounded-lg border">
                  OUT OF STOCK
                </span>
              )}
              {product.size && (
                <span className="bg-blue-50 text-blue-600 font-semibold px-3 py-1 rounded-lg border">
                  {product.size} MB
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:gap-4 gap-3">
              {!inCart ? (
                <button
                  onClick={() => addToCart(product)}
                  disabled={!product.in_stock}
                  className={`flex-1 inline-flex items-center justify-center gap-2 py-3 px-6 text-lg font-medium text-white rounded-lg shadow-lg transition-colors duration-300 hover:scale-105 ${
                    product.in_stock
                      ? "bg-blue-700 hover:bg-blue-800"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Add To Cart <i className="bi bi-plus-lg"></i>
                </button>
              ) : (
                <button
                  onClick={() => removeFromCart(product)}
                  disabled={!product.in_stock}
                  className={`flex-1 inline-flex items-center justify-center gap-2 py-3 px-6 text-lg font-medium text-white rounded-lg shadow-lg transition-colors duration-300 hover:scale-105 ${
                    product.in_stock
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Remove Item <i className="bi bi-trash3"></i>
                </button>
              )}
            </div>

            {product.long_description && (
              <p className="text-gray-700 dark:text-slate-300 leading-relaxed mt-5">
                {product.long_description}
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};
