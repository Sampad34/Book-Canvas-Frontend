import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { UseTitle } from "../hooks/UseTitle";

export const PageNotFound = () => {
  UseTitle("Page Not Found");

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="text-center">
        <p className="text-7xl sm:text-8xl md:text-9xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          404
        </p>

        <h2 className="mt-4 text-2xl sm:text-3xl font-semibold text-gray-700 dark:text-gray-300">
          Oops! Page Not Found
        </h2>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-8 w-48 sm:w-56 mx-auto">
          <img
            className="w-full rounded-2xl shadow-xl"
            src={Logo}
            alt="BookVerse Logo"
          />
        </div>

        <Link to="/">
          <button
            type="button"
            className="mt-8 inline-flex items-center gap-2 text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-semibold rounded-xl px-6 py-3 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <i className="bi bi-house-door"></i>
            Back to Home
          </button>
        </Link>
      </div>
    </main>
  );
};
