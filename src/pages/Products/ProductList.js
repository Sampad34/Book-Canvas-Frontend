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
  const [loading, setLoading] = useState(true);
  const search = useLocation().search;
  const searchTerm = new URLSearchParams(search).get("q");

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const data = await getProductList(searchTerm);
        initialProductList(data);
      } catch (error) {
        toast.error(error.message, {
          closeButton: true,
          position: "bottom-center",
          autoClose: 5000,
        });
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  if (loading) {
    return (
      <main className="px-4 sm:px-6 md:px-10 lg:px-16 py-8 min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </main>
    );
  }

  return (
    <main className="px-4 sm:px-6 md:px-10 lg:px-16 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <section>
        {/* Header with title and filter button */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-slate-100">
              All eBooks
            </h2>
            {searchTerm && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Showing results for: "{searchTerm}"
              </p>
            )}
          </div>

          <button
            onClick={() => setShow(!show)}
            className="flex items-center gap-2 px-4 py-2 text-gray-900 bg-white dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg dark:text-white transition-all border border-gray-200 dark:border-gray-600"
          >
            <i className="bi bi-funnel"></i>
            <span>Filters</span>
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs px-2 py-0.5 rounded-full">
              {products.length}
            </span>
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <i className="bi bi-search text-6xl text-gray-400 mb-4 block"></i>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No products found matching your criteria.
              </p>
              <button
                onClick={() => (window.location.href = "/products")}
                className="mt-4 text-blue-600 hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Filter Drawer */}
      {show && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            onClick={() => setShow(false)}
          ></div>
          <div className="fixed top-0 right-0 z-50 h-full">
            <FilterBar setShow={setShow} />
          </div>
        </>
      )}
    </main>
  );
};
