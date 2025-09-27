import { Link } from "react-router-dom";

export const CartEmpty = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center max-w-md sm:max-w-xl mx-auto my-12 sm:my-16 p-6 sm:p-8 border rounded-xl dark:border-slate-700 dark:bg-gray-800">
      
      <div className="mb-6 sm:mb-8">
        <span className="bi bi-cart text-green-500 text-7xl sm:text-8xl mb-4 inline-block"></span>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 dark:text-slate-100">
          Oops! Your cart looks empty!
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-slate-300">
          Add eBooks to your cart from our store collection.
        </p>
      </div>

      <Link
        to="/"
        className="inline-flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 font-medium rounded-lg text-base sm:text-lg md:text-xl px-6 sm:px-8 py-3 sm:py-4 transition-transform transform hover:scale-[1.02]"
      >
        Continue Shopping <i className="ml-2 bi bi-cart"></i>
      </Link>
    </section>
  );
};
