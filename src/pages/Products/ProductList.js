import { useState, useEffect } from "react";
import { ProductCard } from "../../components/Elements/ProductCard";
import { FilterBar } from "./Components/FilterBar";
import { UseTitle } from "../../hooks/UseTitle";
import { useFilter } from "../../context";
import { useLocation } from "react-router-dom";
import { getProductList } from "../../services";
import { toast } from "react-toastify";

export const ProductList = () => {
  UseTitle("Explore Ebooks Collection");
  const { products, initialProductList } = useFilter();
  const [show, setShow] = useState(false);
  const search = useLocation().search;
  const searchTerm = new URLSearchParams(search).get("q");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProductList(searchTerm);
        initialProductList(data);
      } catch (error) {
        toast.error(error.message, {
          closeButton: true,
          position: "bottom-center",
          autoClose: 5000,
          closeOnClick: true,
        });
      }
    }
    fetchProducts();
  }, [searchTerm]); //eslint-disable-line

  return (
    <main className="px-4 sm:px-6 md:px-10 lg:px-16 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <section className="mb-8">
        {/* Header with title and filter button */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-slate-100 text-center sm:text-left">
            All eBooks <span className="text-blue-600 dark:text-blue-400">({products.length})</span>
          </h2>

          <button
            onClick={() => setShow(!show)}
            className="flex items-center gap-2 p-2 sm:p-3 text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
            </svg>
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 col-span-full">
              No products found.
            </p>
          )}
        </div>
      </section>

      {/* Overlay Filter Drawer */}
      {show && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 flex justify-end"
          onClick={() => setShow(false)}
        >
          <div
            className="w-72 sm:w-80 md:w-96 h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <FilterBar setShow={setShow} />
          </div>
        </div>
      )}
    </main>
  );
};
