import { Link, useNavigate } from "react-router-dom";
import { getUser, logout } from "../../services";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const DropdownLoggedIn = ({ setDropdown }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUser();
        if (data?.email) {
          setUser(data);
        } else {
          handleLogout();
        }
      } catch (error) {
        toast.error(error.message || "Failed to fetch user info", {
          closeButton: true,
          position: "bottom-center",
          autoClose: 5000,
        });
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleLogout() {
    logout();
    setDropdown(false);
    navigate("/");
    toast.info("Logged out successfully", {
      position: "bottom-center",
      autoClose: 2000,
    });
  }

  return (
    <div className="py-2">
      {/* User Info */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
          {user.email || "Guest User"}
        </p>
        {user.name && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{user.name}</p>
        )}
      </div>

      {/* Navigation Links */}
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
            to="/dashboard"
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <i className="bi bi-speedometer2"></i> Dashboard
          </Link>
        </li>
        <li>
          <Link
            onClick={() => setDropdown(false)}
            to="/cart"
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <i className="bi bi-cart"></i> Cart
          </Link>
        </li>
      </ul>

      {/* Logout Button */}
      <div className="border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <i className="bi bi-box-arrow-right"></i> Log out
        </button>
      </div>
    </div>
  );
};