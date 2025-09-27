import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { UseTitle } from "../hooks/UseTitle";

export const PageNotFound = () => {
  UseTitle("Page Not Found");

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <section className="flex flex-col items-center text-center">
        <p className="text-7xl font-extrabold text-gray-700 dark:text-white mb-6 sm:text-8xl">
          404
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-600 dark:text-gray-300 mb-6">
          Oops! Page Not Found
        </h2>

        <div className="max-w-xs sm:max-w-sm mb-8">
          <img
            className="w-full rounded-lg shadow-lg"
            src={Logo}
            alt="CodeBook Page Not Found"
          />
        </div>

        <Link to="/">
          <button
            type="button"
            className="w-64 sm:w-72 text-xl sm:text-2xl text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold rounded-lg px-6 py-3 shadow-lg focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            Back To Home
          </button>
        </Link>
      </section>
    </main>
  );
};
