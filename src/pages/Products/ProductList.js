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
    <main className="px-4 md:px-8 lg:px-16">
      <section className="my-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold dark:text-slate-100">
            All eBooks ({products.length})
          </h2>

          <button
            onClick={() => setShow(!show)}
            className="mt-3 md:mt-0 inline-flex items-center p-2 sm:p-3 text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
            </svg>
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-6 lg:justify-start">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-30 flex justify-end">
          <FilterBar setShow={setShow} />
        </div>
      )}
    </main>
  );
};
