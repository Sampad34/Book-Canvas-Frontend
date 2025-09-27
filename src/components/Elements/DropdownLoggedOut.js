import { Link } from "react-router-dom";

export const DropdownLoggedOut = ({ setDropdown }) => {
  return (
    <div
      id="dropdownAvatar"
      className="select-none absolute top-12 right-0 z-20 w-48 bg-white rounded-lg divide-y divide-gray-100 shadow-lg dark:bg-gray-700 dark:divide-gray-600 transition-transform transform scale-95 origin-top-right animate-in fade-in-80"
    >
      <ul
        className="py-1 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownUserAvatarButton"
      >
        <li>
          <Link
            onClick={() => setDropdown(false)}
            to="/products"
            className="block py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white transition-colors"
          >
            All eBooks
          </Link>
        </li>
        <li>
          <Link
            onClick={() => setDropdown(false)}
            to="/login"
            className="block py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white transition-colors"
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            onClick={() => setDropdown(false)}
            to="/register"
            className="block py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white transition-colors"
          >
            Register
          </Link>
        </li>
      </ul>
    </div>
  );
};
