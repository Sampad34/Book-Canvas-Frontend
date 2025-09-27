import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export const Search = ({ setSearchSection }) => {
  const navigate = useNavigate();
  const searchRef = useRef();

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchSection(false);
    navigate(`/products?q=${searchRef.current.value}`);
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 my-5">
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
      >
        {/* Search Input */}
        <div className="relative w-full sm:flex-1">
          <span className="bi bi-search absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400 text-lg"></span>
          <input
            ref={searchRef}
            name="search"
            type="text"
            id="simple-search"
            placeholder="Search products..."
            autoComplete="off"
            required
            className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 bg-gray-50 text-gray-900
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400
                       dark:focus:ring-blue-500 dark:focus:border-blue-500 transition"
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="w-full sm:w-auto flex items-center justify-center px-4 py-2 sm:py-3 rounded-lg bg-blue-700 text-white text-sm sm:text-base font-medium
                     border border-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500
                     dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition"
        >
          <span className="bi bi-search text-lg sm:text-xl"></span>
          <span className="ml-2 hidden sm:inline">Search</span>
        </button>
      </form>
    </div>
  );
};
