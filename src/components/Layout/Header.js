// src/components/Layout/Header.js

import { useEffect, useState, useRef } from "react"; // Added useRef import
import Logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { getUser, logout } from "../../services";
import { useCart } from "../../context";
import { toast } from "react-toastify";

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
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(
    safeParseJSON(localStorage.getItem("darkMode"), false),
  );
  const [dropdown, setDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check authentication status
  const token = sessionStorage.getItem("token");

  // Fetch user data when logged in
  useEffect(() => {
    async function fetchUserData() {
      if (token) {
        try {
          const userData = await getUser();
          if (userData && userData.email) {
            setUser(userData);
            setIsLoggedIn(true);
          } else {
            handleLogout();
          }
        } catch (error) {
          console.error("Failed to fetch user:", error);
          handleLogout();
        }
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    }
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  function handleLogout() {
    logout();
    setUser(null);
    setIsLoggedIn(false);
    setDropdown(false);
    navigate("/");
    toast.info("Logged out successfully", {
      position: "bottom-center",
      autoClose: 2000,
    });
  }

  // Get user initials for avatar
  const getUserInitials = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "U";
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-lg">
      {/* Main Navigation */}
      <nav className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <img
            src={Logo}
            className="h-8 sm:h-10 mr-2 sm:mr-3 transition-transform group-hover:scale-105"
            alt="BookWorld Logo"
          />
          <span className="self-center text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            BookVerse
          </span>
        </Link>

        {/* Search Bar - Always Visible on Desktop */}
        <div className="hidden md:flex flex-1 max-w-xl mx-4">
          <SearchInline />
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Dark Mode Toggle */}
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

          {/* Mobile Search Button */}
          <button
            onClick={() => {
              const mobileSearch = document.getElementById("mobile-search");
              if (mobileSearch) {
                mobileSearch.classList.toggle("hidden");
              }
            }}
            className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Search"
          >
            <i className="bi bi-search text-xl text-gray-700 dark:text-white"></i>
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

          {/* User Section */}
          {isLoggedIn && user ? (
            <div className="relative">
              <button
                onClick={() => setDropdown(!dropdown)}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="User menu"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                  {getUserInitials()}
                </div>
                <span className="hidden lg:block text-sm font-medium text-gray-700 dark:text-gray-200">
                  {user.email?.split("@")[0]}
                </span>
                <i className="bi bi-chevron-down text-xs text-gray-500 dark:text-gray-400 hidden sm:block"></i>
              </button>

              {dropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl z-50 animate-fade-in">
                  <div className="py-2">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {user.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                        {user.email}
                      </p>
                    </div>
                    <ul className="py-1">
                      <li>
                        <Link
                          onClick={() => setDropdown(false)}
                          to="/products"
                          className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <i className="bi bi-grid"></i> All eBooks
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={() => setDropdown(false)}
                          to="/dashboard"
                          className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <i className="bi bi-speedometer2"></i> Dashboard
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <i className="bi bi-box-arrow-right"></i> Log out
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="hidden sm:inline-flex px-4 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-sm"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Search Bar - Hidden by default, shows when search icon clicked */}
      <div id="mobile-search" className="hidden md:hidden px-4 pb-3">
        <SearchInline />
      </div>
    </header>
  );
};

// Inline Search Component for better integration
const SearchInline = () => {
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const handleSearch = (event) => {
    event.preventDefault();
    const searchTerm = searchRef.current?.value.trim();
    if (searchTerm) {
      navigate(`/products?q=${encodeURIComponent(searchTerm)}`);
      if (searchRef.current) {
        searchRef.current.value = "";
      }
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="relative">
        <span className="bi bi-search absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400 text-base"></span>
        <input
          ref={searchRef}
          type="text"
          placeholder="Search eBooks by title, author, or category..."
          className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-gray-300 bg-gray-50 text-gray-900
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400
                     transition"
        />
      </div>
    </form>
  );
};
