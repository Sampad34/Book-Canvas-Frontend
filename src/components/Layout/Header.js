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
    safeParseJSON(localStorage.getItem("darkMode"), false)
  );

  const [searchSection, setSearchSection] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const token = safeParseJSON(sessionStorage.getItem("token"), null);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header>
      <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center">
            <img src={Logo} className="h-8 sm:h-10 mr-3" alt="MyCodeBook Logo" />
            <span className="self-center text-xl sm:text-2xl font-semibold whitespace-nowrap dark:text-white">
              MyCodeBook
            </span>
          </Link>

          <div className="flex items-center space-x-4 sm:space-x-5">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-xl text-gray-700 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <i className="bi bi-gear-wide-connected"></i>
            </button>

            {/* Search Toggle */}
            <button
              onClick={() => setSearchSection(!searchSection)}
              className="text-xl text-gray-700 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <i className="bi bi-search"></i>
            </button>

            {/* Cart */}
            <Link to="/cart" className="relative text-gray-700 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <i className="text-2xl bi bi-cart-fill"></i>
              {cartList.length > 0 && (
                <span className="absolute -top-1 left-2.5 bg-rose-500 text-white text-xs px-1 rounded-full">
                  {cartList.length}
                </span>
              )}
            </Link>

            {/* User Dropdown */}
            <button
              onClick={() => setDropdown(!dropdown)}
              className="text-xl text-gray-700 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <i className="bi bi-person-circle"></i>
            </button>

            {/* Dropdown */}
            {dropdown &&
              (token ? (
                <DropdownLoggedIn setDropdown={setDropdown} />
              ) : (
                <DropdownLoggedOut setDropdown={setDropdown} />
              ))}
          </div>
        </div>
      </nav>

      {/* Search Section */}
      {searchSection && <Search setSearchSection={setSearchSection} />}
    </header>
  );
};
