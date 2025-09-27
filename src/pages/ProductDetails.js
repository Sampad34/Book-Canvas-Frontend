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
    async function fetchProducts() {
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
    fetchProducts();
  }, [id]);

  useEffect(() => {
    setInCart(cartList.some((item) => item.id === product.id));
  }, [cartList, product.id]);

  return (
    <main className="px-4 md:px-10 lg:px-20 py-10">
      <section>
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-slate-200 mb-4">
          {product.name}
        </h1>
        <p className="text-lg md:text-xl text-center text-gray-700 dark:text-slate-300 mb-8">
          {product.overview}
        </p>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
          {/* Product Image */}
          <div className="flex-shrink-0 max-w-md w-full rounded-lg overflow-hidden shadow-lg">
            <img
              src={`${process.env.REACT_APP_HOST}${product.poster}`}
              alt={product.name}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="max-w-xl w-full space-y-5">
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
              {product.in_stock && (
                <span className="bg-emerald-50 text-emerald-600 font-semibold px-3 py-1 rounded-lg border">
                  IN STOCK
                </span>
              )}
              {!product.in_stock && (
                <span className="bg-rose-50 text-rose-600 font-semibold px-3 py-1 rounded-lg border">
                  OUT OF STOCK
                </span>
              )}
              <span className="bg-blue-50 text-blue-600 font-semibold px-3 py-1 rounded-lg border">
                {product.size} MB
              </span>
            </div>

            <div>
              {!inCart ? (
                <button
                  onClick={() => addToCart(product)}
                  disabled={!product.in_stock}
                  className={`w-full sm:w-auto inline-flex items-center justify-center py-3 px-6 text-lg font-medium text-white rounded-lg shadow-lg transition-all duration-300 hover:bg-blue-800 ${
                    product.in_stock
                      ? "bg-blue-700 cursor-pointer"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Add To Cart <i className="ml-2 bi bi-plus-lg"></i>
                </button>
              ) : (
                <button
                  onClick={() => removeFromCart(product)}
                  disabled={!product.in_stock}
                  className={`w-full sm:w-auto inline-flex items-center justify-center py-3 px-6 text-lg font-medium text-white rounded-lg shadow-lg transition-all duration-300 hover:bg-red-800 ${
                    product.in_stock
                      ? "bg-red-600 cursor-pointer"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Remove Item <i className="ml-2 bi bi-trash3"></i>
                </button>
              )}
            </div>

            <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
              {product.long_description}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};
