import { useEffect, useState } from "react";
import { ProductCard } from "../../../components";
import { getFeaturedList } from "../../../services";
import { toast } from "react-toastify";

export const FeatureProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getFeaturedList();
        setProducts(data);
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
  }, []);

  if (loading) {
    return (
      <section className="my-16 md:my-24 px-4 sm:px-6 md:px-12 lg:px-16">
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-extrabold dark:text-slate-100 mb-10">
          Featured eBooks
        </h1>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="my-16 md:my-24 px-4 sm:px-6 md:px-12 lg:px-16">
      {/* Section Heading */}
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold dark:text-slate-100">
          Featured{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            eBooks
          </span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Most popular books this month
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 dark:text-gray-400 text-base">
            No featured products available at the moment.
          </p>
        )}
      </div>
    </section>
  );
};
