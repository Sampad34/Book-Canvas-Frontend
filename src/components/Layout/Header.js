// src/components/Layout/Header.js

import { useEffect, useState } from "react";
import Logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "../Sections/Search";
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
    safeParseJSON(localStorage.getItem("darkMode"), false)
  );
  const [searchSection, setSearchSection] = useState(false);
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

          {/* User Section - Shows different UI based on login status */}
          {isLoggedIn && user ? (
            // Logged In - Show user email and avatar with dropdown
            <div className="relative">
              <button
                onClick={() => setDropdown(!dropdown)}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="User menu"
              >
                {/* User Avatar with Initials */}
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                  {getUserInitials()}
                </div>
                {/* User Email - Hidden on mobile, visible on larger screens */}
                <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-200">
                  {user.email}
                </span>
                <i className="bi bi-chevron-down text-xs text-gray-500 dark:text-gray-400 hidden sm:block"></i>
              </button>

              {/* Dropdown Menu */}
              {dropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl z-50 animate-fade-in">
                  <div className="py-2">
                    {/* User Info Section */}
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {user.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                        {user.email}
                      </p>
                    </div>

                    {/* Navigation Links */}
                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                      <li>
                        <Link
                          onClick={() => setDropdown(false)}
                          to="/products"
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <i className="bi bi-grid text-base"></i> All eBooks
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={() => setDropdown(false)}
                          to="/dashboard"
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <i className="bi bi-speedometer2 text-base"></i> Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={() => setDropdown(false)}
                          to="/cart"
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <i className="bi bi-cart text-base"></i> Cart
                          {cartList.length > 0 && (
                            <span className="ml-auto bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs px-2 py-0.5 rounded-full">
                              {cartList.length}
                            </span>
                          )}
                        </Link>
                      </li>
                    </ul>

                    {/* Logout Button */}
                    <div className="border-t border-gray-200 dark:border-gray-700 mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <i className="bi bi-box-arrow-right text-base"></i> Log out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Logged Out - Show login/register buttons
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="hidden sm:inline-flex px-4 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-sm"
              >
                Sign Up
              </Link>
              
              {/* Mobile menu button for logged out state */}
              <button
                onClick={() => setDropdown(!dropdown)}
                className="sm:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <i className="bi bi-person-circle text-xl text-gray-700 dark:text-white"></i>
              </button>

              {/* Mobile dropdown for logged out */}
              {dropdown && (
                <div className="absolute right-0 top-14 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl z-50 sm:hidden">
                  <div className="py-2">
                    <Link
                      onClick={() => setDropdown(false)}
                      to="/products"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <i className="bi bi-grid"></i> All eBooks
                    </Link>
                    <Link
                      onClick={() => setDropdown(false)}
                      to="/login"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <i className="bi bi-box-arrow-in-right"></i> Login
                    </Link>
                    <Link
                      onClick={() => setDropdown(false)}
                      to="/register"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <i className="bi bi-person-plus"></i> Register
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
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