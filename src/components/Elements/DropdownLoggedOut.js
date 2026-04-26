import { Link } from "react-router-dom";

export const DropdownLoggedOut = ({ setDropdown }) => {
  return (
    <div className="py-2">
      <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
        <li>
          <Link
            onClick={() => setDropdown(false)}
            to="/products"
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <i className="bi bi-grid"></i> All eBooks
          </Link>
        </li>

        <li>
          <Link
            onClick={() => setDropdown(false)}
            to="/login"
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <i className="bi bi-box-arrow-in-right"></i> Login
          </Link>
        </li>

        <li>
          <Link
            onClick={() => setDropdown(false)}
            to="/register"
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <i className="bi bi-person-plus"></i> Register
          </Link>
        </li>
      </ul>
    </div>
  );
};
