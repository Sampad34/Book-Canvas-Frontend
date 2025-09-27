export const DashboardEmpty = () => {
  return (
    <section className="max-w-4xl mx-auto my-10 p-6 text-center border rounded-lg shadow-sm dark:border-slate-700 dark:bg-gray-800 dark:text-slate-100">
      <div className="flex flex-col items-center gap-4">
        <p className="bi bi-cart text-green-500 text-7xl"></p>
        <p className="text-2xl font-semibold">Oops! Your order dashboard looks empty!</p>
        <p className="text-gray-700 dark:text-gray-300">
          Add eBooks to your cart from our store collection.
        </p>
        <a
          href="/"
          className="mt-4 inline-flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-lg px-6 py-3 transition duration-200 ease-in-out dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Continue Shopping <i className="ml-2 bi bi-cart"></i>
        </a>
      </div>
    </section>
  );
};
