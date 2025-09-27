export const DashboardEmpty = () => {
  return (
    <section className="max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto my-12 sm:my-16 p-6 sm:p-8 text-center border rounded-xl shadow-md dark:border-slate-700 dark:bg-gray-800 dark:text-slate-100 transition-transform hover:scale-[1.01]">
      
      <div className="flex flex-col items-center gap-4 sm:gap-6">
        {/* Cart Icon */}
        <span className="bi bi-cart text-green-500 text-6xl sm:text-7xl md:text-8xl"></span>
        
        {/* Headline */}
        <p className="text-xl sm:text-2xl md:text-3xl font-semibold">
          Oops! Your order dashboard looks empty!
        </p>

        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300">
          Add eBooks to your cart from our store collection.
        </p>

        {/* Continue Shopping Button */}
        <a
          href="/"
          className="mt-4 sm:mt-6 inline-flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 font-medium rounded-lg text-base sm:text-lg md:text-xl px-6 sm:px-8 py-3 sm:py-4 transition-transform transform hover:scale-[1.02] duration-200"
        >
          Continue Shopping <i className="ml-2 bi bi-cart"></i>
        </a>
      </div>
    </section>
  );
};
