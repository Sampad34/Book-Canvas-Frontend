// src/components/Layout/Header.js

import { useEffect, useState, useRef } from "react";
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
  const searchRef = useRef(null);

  // Dark Mode State with localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) {
      return safeParseJSON(savedMode, false);
    }
    // Check system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [dropdown, setDropdown] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Apply dark mode class to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", JSON.stringify(true));
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", JSON.stringify(false));
    }
  }, [darkMode]);

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

  const handleSearch = (event) => {
    event.preventDefault();
    const searchTerm = searchRef.current?.value.trim();
    if (searchTerm) {
      navigate(`/products?q=${encodeURIComponent(searchTerm)}`);
      if (searchRef.current) {
        searchRef.current.value = "";
      }
      setMobileSearchOpen(false);
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Show toast notification for theme change
    toast.info(`${!darkMode ? "Dark" : "Light"} mode activated`, {
      position: "bottom-center",
      autoClose: 1500,
      icon: !darkMode ? "🌙" : "☀️",
    });
  };

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

  // Calculate total items in cart
  const totalCartItems = cartList.reduce(
    (total, item) => total + (item.quantity || 1),
    0,
  );

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-lg transition-colors duration-300">
      {/* Main Navigation */}
      <nav className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-3 sm:px-6 lg:px-8">
        {/* Logo with Website Icon */}
        <Link to="/" className="flex items-center group">
          {/* Logo Image */}
          <div className="relative">
            <img
              src={Logo}
              className="h-9 sm:h-11 w-auto mr-2 sm:mr-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
              alt="BookVerse Logo"
            />
            {/* Dark mode overlay effect for logo */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Website Name with Icon */}
          <div className="flex flex-col items-start">
            <span className="self-center text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:to-indigo-500 transition-all duration-300">
              BookVerse
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
              Read. Learn. Grow.
            </span>
          </div>
        </Link>

        {/* Search Bar - Desktop */}
        <div className="hidden md:block flex-1 max-w-xl mx-4">
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative">
              <span className="bi bi-search absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500 text-base"></span>
              <input
                ref={searchRef}
                type="text"
                placeholder="Search eBooks by title, author, or category..."
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
          </form>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Dark Mode Toggle Button - Enhanced */}
          <button
            onClick={toggleDarkMode}
            className="relative group"
            aria-label="Toggle dark mode"
          >
            <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 shadow-md">
              {darkMode ? (
                <div className="relative">
                  <i className="bi bi-sun-fill text-xl sm:text-2xl text-yellow-400 group-hover:rotate-45 transition-transform duration-300"></i>
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                </div>
              ) : (
                <div className="relative">
                  <i className="bi bi-moon-fill text-xl sm:text-2xl text-gray-700 dark:text-white group-hover:rotate-12 transition-transform duration-300"></i>
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
                </div>
              )}
            </div>
            {/* Tooltip */}
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
              {darkMode ? "Light Mode" : "Dark Mode"}
            </span>
          </button>

          {/* Mobile Search Button */}
          <button
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="md:hidden p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
            aria-label="Search"
          >
            <i className="bi bi-search text-xl text-gray-700 dark:text-white"></i>
          </button>

          {/* Cart with Enhanced UI */}
          <Link to="/cart" className="relative group" aria-label="Cart">
            <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 shadow-md">
              <i className="bi bi-cart-fill text-xl sm:text-2xl text-gray-700 dark:text-white group-hover:scale-110 transition-transform duration-300"></i>
            </div>

            {/* Cart Badge - Shows item count */}
            {totalCartItems > 0 && (
              <div className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-gradient-to-r from-rose-500 to-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1.5 shadow-lg animate-pulse">
                {totalCartItems > 99 ? "99+" : totalCartItems}
              </div>
            )}

            {/* Tooltip */}
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
              Cart ({totalCartItems})
            </span>
          </Link>

          {/* User Section */}
          {isLoggedIn && user ? (
            <div className="relative">
              <button
                onClick={() => setDropdown(!dropdown)}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                aria-label="User menu"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold text-sm sm:text-base shadow-md">
                  {getUserInitials()}
                </div>
                <span className="hidden lg:block text-sm font-medium text-gray-700 dark:text-gray-200">
                  {user.email?.split("@")[0]}
                </span>
                <i
                  className={`bi bi-chevron-down text-xs text-gray-500 dark:text-gray-400 hidden sm:block transition-transform duration-300 ${dropdown ? "rotate-180" : ""}`}
                ></i>
              </button>

              {dropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl z-50 animate-fade-in overflow-hidden">
                  <div className="py-2">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800">
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
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <i className="bi bi-grid text-blue-500"></i>
                          All eBooks
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={() => setDropdown(false)}
                          to="/dashboard"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <i className="bi bi-speedometer2 text-indigo-500"></i>
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={() => setDropdown(false)}
                          to="/cart"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <i className="bi bi-cart text-green-500"></i>
                          Cart
                          {totalCartItems > 0 && (
                            <span className="ml-auto bg-rose-100 dark:bg-rose-900 text-rose-600 dark:text-rose-300 text-xs px-2 py-0.5 rounded-full">
                              {totalCartItems}
                            </span>
                          )}
                        </Link>
                      </li>
                    </ul>
                    <div className="border-t border-gray-200 dark:border-gray-700 mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <i className="bi bi-box-arrow-right"></i>
                        Log out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="hidden sm:inline-flex px-4 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Search Bar */}
      {mobileSearchOpen && (
        <div className="md:hidden px-4 pb-3 pt-2 border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm animate-fade-in-down">
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative">
              <span className="bi bi-search absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500 text-base"></span>
              <input
                ref={searchRef}
                type="text"
                placeholder="Search eBooks..."
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                autoFocus
              />
            </div>
          </form>
        </div>
      )}
    </header>
  );
};
