import { Link } from "react-router-dom";

export const DropdownLoggedOut = ({ setDropdown }) => {
  return (
    <div
      id="dropdownAvatar"
      className="absolute top-14 right-0 z-20 w-48 sm:w-52 bg-white dark:bg-gray-700 rounded-lg shadow-lg divide-y divide-gray-100 dark:divide-gray-600 transition-transform transform scale-95 origin-top-right animate-in fade-in-80"
    >
      <ul className="py-1 text-sm sm:text-base text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
        
        <li>
          <Link
            onClick={() => setDropdown(false)}
            to="/products"
            className="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white transition-colors duration-200"
          >
            All eBooks
          </Link>
        </li>
        
        <li>
          <Link
            onClick={() => setDropdown(false)}
            to="/login"
            className="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white transition-colors duration-200"
          >
            Login
          </Link>
        </li>
        
        <li>
          <Link
            onClick={() => setDropdown(false)}
            to="/register"
            className="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white transition-colors duration-200"
          >
            Register
          </Link>
        </li>

      </ul>
    </div>
  );
};
