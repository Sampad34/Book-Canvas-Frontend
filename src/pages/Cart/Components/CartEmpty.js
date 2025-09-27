import { Link } from "react-router-dom";

export const CartEmpty = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto my-12 p-6 border rounded-lg dark:border-slate-700 dark:bg-gray-800">
      <div className="mb-6">
        <span className="bi bi-cart text-green-500 text-8xl mb-4 inline-block"></span>
        <h2 className="text-2xl font-semibold mb-2 dark:text-slate-100">
          Oops! Your cart looks empty!
        </h2>
        <p className="text-gray-600 dark:text-slate-300">
          Add eBooks to your cart from our store collection.
        </p>
      </div>
      <Link
        to="/"
        className="inline-flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 font-medium rounded-lg text-lg px-6 py-3 transition"
      >
        Continue Shopping <i className="ml-2 bi bi-cart"></i>
      </Link>
    </section>
  );
};
