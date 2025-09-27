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
    <div className="mx-auto max-w-screen-xl p-4 my-5">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-2">
        <div className="relative w-full">
          <span className="bi bi-search absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400"></span>
          <input
            ref={searchRef}
            name="search"
            type="text"
            id="simple-search"
            placeholder="Search products..."
            autoComplete="off"
            required
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 transition"
          />
        </div>
        <button
          type="submit"
          className="flex items-center justify-center px-4 py-2 rounded-lg bg-blue-700 text-white text-sm font-medium border border-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition"
        >
          <span className="bi bi-search text-lg"></span>
        </button>
      </form>
    </div>
  );
};
