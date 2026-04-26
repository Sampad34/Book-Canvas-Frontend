import { useEffect, useState } from "react";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { Search } from "../Sections/Search";
import { DropdownLoggedOut, DropdownLoggedIn } from "../index";
import { useCart } from "../../context";

// Utility to safely parse JSON
const safeParseJSON = (value, fallback = null) => {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

export const Header = () => {
  const { cartList } = useCart();

  const [darkMode, setDarkMode] = useState(
    safeParseJSON(localStorage.getItem("darkMode"), false),
  );

  const [searchSection, setSearchSection] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  // FIXED: Proper token check without JSON.parse for null
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-lg">
      <nav className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <img
            src={Logo}
            className="h-8 sm:h-10 mr-2 sm:mr-3 transition-transform group-hover:scale-105"
            alt="BookWorld Logo"
          />
          <span className="self-center text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            BookVerse
          </span>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Dark Mode Toggle - FIXED icon */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <i className="bi bi-sun-fill text-xl sm:text-2xl text-yellow-400"></i>
            ) : (
              <i className="bi bi-moon-fill text-xl sm:text-2xl text-gray-700 dark:text-white"></i>
            )}
          </button>

          {/* Search Toggle */}
          <button
            onClick={() => setSearchSection(!searchSection)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Search"
          >
            <i className="bi bi-search text-xl sm:text-2xl text-gray-700 dark:text-white"></i>
          </button>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Cart"
          >
            <i className="bi bi-cart-fill text-xl sm:text-2xl text-gray-700 dark:text-white"></i>
            {cartList.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-red-500 text-white text-xs sm:text-sm px-1.5 sm:px-2 py-0.5 rounded-full animate-pulse">
                {cartList.length}
              </span>
            )}
          </Link>

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdown(!dropdown)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="User menu"
            >
              <i className="bi bi-person-circle text-xl sm:text-2xl text-gray-700 dark:text-white"></i>
            </button>

            {dropdown && (
              <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl z-50 animate-fade-in">
                {token ? (
                  <DropdownLoggedIn setDropdown={setDropdown} />
                ) : (
                  <DropdownLoggedOut setDropdown={setDropdown} />
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Search Section */}
      {searchSection && (
        <div className="px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
          <Search setSearchSection={setSearchSection} />
        </div>
      )}
    </header>
  );
};
