// src/components/Sections/Search.js

import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Search = ({ setSearchSection }) => {
  const navigate = useNavigate();
  const searchRef = useRef();
  const inputRef = useRef();

  // Auto-focus input when search section opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    const searchTerm = searchRef.current.value.trim();
    setSearchSection(false);
    if (searchTerm) {
      navigate(`/products?q=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate("/products");
    }
  };

  const handleClear = () => {
    searchRef.current.value = "";
    searchRef.current.focus();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={() => setSearchSection(false)}
    >
      <div
        className="flex items-center justify-center min-h-screen px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
          {/* Search Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              <i className="bi bi-search mr-2"></i>
              Search eBooks
            </h3>
            <button
              onClick={() => setSearchSection(false)}
              className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <i className="bi bi-x-lg text-xl text-gray-500"></i>
            </button>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="p-6">
            <div className="relative">
              <span className="bi bi-search absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400 text-xl"></span>
              <input
                ref={searchRef}
                type="text"
                placeholder="Search by title, author, or category..."
                autoComplete="off"
                className="w-full pl-12 pr-12 py-4 text-base rounded-xl border-2 border-gray-300 bg-gray-50 text-gray-900
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                           dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400
                           transition"
              />
              <button
                type="button"
                onClick={handleClear}
                className="absolute inset-y-0 right-14 flex items-center text-gray-400 hover:text-gray-600"
              >
                <i className="bi bi-x-circle text-xl"></i>
              </button>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all transform hover:scale-105 shadow-md"
              >
                <i className="bi bi-search mr-2"></i>
                Search
              </button>
              <button
                type="button"
                onClick={() => setSearchSection(false)}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold rounded-xl transition"
              >
                Cancel
              </button>
            </div>

            {/* Search Tips */}
            <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
              <p>
                Popular searches: JavaScript, React, Python, Machine Learning
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
