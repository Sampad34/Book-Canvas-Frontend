import { useEffect, useState } from "react";
import { ProductCard } from "../../../components";
import { getFeaturedList } from "../../../services";
import { toast } from "react-toastify";

export const FeatureProducts = () => {
  const [products, setProducts] = useState([]);

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
          closeOnClick: true,
        });
      }
    }
    fetchProducts();
  }, []);

  return (
    <section className="my-24 px-4 md:px-8 lg:px-16">
      <h1 className="text-3xl md:text-4xl text-center font-bold dark:text-slate-100 mb-8 underline underline-offset-8">
        Featured eBooks
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {products.length > 0 ? (
          products.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p className="text-center col-span-full text-gray-500 dark:text-gray-400">
            No featured products available at the moment.
          </p>
        )}
      </div>
    </section>
  );
};
