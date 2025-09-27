import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { UseTitle } from "../hooks/UseTitle";

export const PageNotFound = () => {
  UseTitle("Page Not Found");

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
      <section className="flex flex-col items-center text-center space-y-6 sm:space-y-8">
        {/* Error Code */}
        <p className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-gray-700 dark:text-white">
          404
        </p>

        {/* Error Message */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-600 dark:text-gray-300">
          Oops! Page Not Found
        </h2>

        {/* Logo/Image */}
        <div className="w-56 sm:w-72 md:w-96">
          <img
            className="w-full rounded-xl shadow-xl"
            src={Logo}
            alt="CodeBook Page Not Found"
          />
        </div>

        {/* Back Home Button */}
        <Link to="/">
          <button
            type="button"
            className="w-full sm:w-64 md:w-72 text-lg sm:text-xl md:text-2xl text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
                       hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold rounded-lg px-6 py-3 shadow-lg 
                       focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            Back To Home
          </button>
        </Link>
      </section>
    </main>
  );
};
