import { useEffect, useState } from "react";
import { useCart } from "../../../context";
import { useNavigate } from "react-router-dom";
import { createOrder, getUser } from "../../../services";
import { toast } from "react-toastify";

export const Checkout = ({ setCheckout }) => {
  const { total, cartList, clearCart } = useCart();
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUser();
        setUser(data);
      } catch (error) {
        toast.error(error.message || "Failed to fetch user info", {
          closeButton: true,
          position: "bottom-center",
          autoClose: 5000,
        });
      }
    }
    fetchData();
  }, []);

  async function handleOrderSubmit(event) {
    event.preventDefault();
    try {
      const data = await createOrder(cartList, total, user);
      clearCart();
      navigate("/order-summary", { state: { data: data, status: true } });
    } catch (error) {
      toast.error(error.message || "Order failed", {
        closeButton: true,
        position: "bottom-center",
        autoClose: 5000,
      });
      navigate("/order-summary", { state: { status: false } });
    }
  }

  if (!user) {
    return <p className="text-center mt-10 text-lg dark:text-slate-200">Loading user info...</p>;
  }

  return (
    <section>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

      {/* Modal */}
      <div
        id="authentication-modal"
        tabIndex="-1"
        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 md:p-6"
        aria-modal="true"
        role="dialog"
      >
        <div className="relative w-full max-w-md md:max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* Close Button */}
          <button
            onClick={() => setCheckout(false)}
            type="button"
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-900 dark:hover:text-white bg-transparent rounded-lg p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>

          {/* Modal Content */}
          <div className="px-6 py-8 md:px-8">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center justify-center gap-2">
              <i className="bi bi-credit-card"></i> Card Payment
            </h3>

            <form onSubmit={handleOrderSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  value={user.name}
                  disabled
                  className="w-full p-2.5 text-gray-900 dark:text-white text-sm bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full p-2.5 text-gray-900 dark:text-white text-sm bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Card Number */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Card Number
                </label>
                <input
                  type="text"
                  value="4215 6254 6259 7845"
                  disabled
                  className="w-full p-2.5 text-gray-900 dark:text-white text-sm bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                />
              </div>

              {/* Expiry Month/Year */}
              <div className="flex gap-3">
                <input
                  type="text"
                  value="03"
                  disabled
                  className="w-1/2 p-2.5 text-gray-900 dark:text-white text-sm bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                />
                <input
                  type="text"
                  value="27"
                  disabled
                  className="w-1/2 p-2.5 text-gray-900 dark:text-white text-sm bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                />
              </div>

              {/* Security Code */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Security Code
                </label>
                <input
                  type="text"
                  value="523"
                  disabled
                  className="w-full p-2.5 text-gray-900 dark:text-white text-sm bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                />
              </div>

              {/* Total */}
              <p className="text-center text-2xl font-bold text-lime-500 my-2">
                ${total}
              </p>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-2.5 text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition"
              >
                <i className="bi bi-lock-fill"></i> PAY NOW
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
