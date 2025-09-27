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
        data.email ? setUser(data) : handleLogout();
      } catch (error) {
        toast.error(error.message, {
          closeButton: true,
          position: "bottom-center",
          autoClose: 5000,
          closeOnClick: true,
        });
      }
    }
    fetchData();
  }, []); //eslint-disable-line

  function handleLogout() {
    logout();
    setDropdown(false);
    navigate("/");
  }

  return (
    <div
      id="dropdownAvatar"
      className="select-none absolute top-12 right-0 z-20 w-48 bg-white rounded-lg divide-y divide-gray-100 shadow-lg dark:bg-gray-700 dark:divide-gray-600 transition-transform transform scale-95 origin-top-right animate-in fade-in-80"
    >
      {/* User Info */}
      <div className="py-3 px-4 text-sm text-gray-900 dark:text-white">
        <div className="font-medium truncate">{user.email}</div>
      </div>

      {/* Links */}
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
            to="/dashboard"
            className="block py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white transition-colors"
          >
            Dashboard
          </Link>
        </li>
      </ul>

      {/* Logout */}
      <div className="py-1">
        <span
          onClick={handleLogout}
          className="cursor-pointer block py-2 px-4 text-sm text-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white transition-colors"
        >
          Log out
        </span>
      </div>
    </div>
  );
};
