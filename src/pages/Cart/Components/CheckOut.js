import { useEffect, useState } from "react";
import { useCart } from "../../../context";
import { useNavigate } from "react-router-dom";
import { createOrder, getUser } from "../../../services";
import { toast } from "react-toastify";

export const Checkout = ({ setCheckout }) => {
  const { total, cartList, clearCart } = useCart();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    try {
      const data = await createOrder(cartList, total, user);
      clearCart(); // FIXED: No parameter needed
      navigate("/order-summary", { state: { data: data, status: true } });
    } catch (error) {
      toast.error(error.message || "Order failed", {
        closeButton: true,
        position: "bottom-center",
        autoClose: 5000,
      });
      navigate("/order-summary", { state: { status: false } });
    } finally {
      setLoading(false);
    }
  }

  if (!user) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8">
          <p className="text-lg dark:text-white">Loading user info...</p>
        </div>
      </div>
    );
  }

  return (
    <section>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
        onClick={() => setCheckout(false)}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
        <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
          {/* Close Button */}
          <button
            onClick={() => setCheckout(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white bg-transparent rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <i className="bi bi-x-lg text-xl"></i>
          </button>

          {/* Modal Content */}
          <div className="p-6 sm:p-8">
            <h3 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              <i className="bi bi-credit-card mr-2"></i>
              Payment Details
            </h3>

            <form onSubmit={handleOrderSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <input
                  type="text"
                  value={user.name || ""}
                  disabled
                  className="w-full p-3 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address
                </label>
                <input
                  type="email"
                  value={user.email || ""}
                  disabled
                  className="w-full p-3 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Card Number
                </label>
                <input
                  type="text"
                  value="4242 4242 4242 4242"
                  disabled
                  className="w-full p-3 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    MM/YY
                  </label>
                  <input
                    type="text"
                    value="12/26"
                    disabled
                    className="w-full p-3 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    CVC
                  </label>
                  <input
                    type="text"
                    value="123"
                    disabled
                    className="w-full p-3 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl"
                  />
                </div>
              </div>

              <div className="text-center py-3">
                <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  ${total.toFixed(2)}
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <i className="bi bi-hourglass-split animate-spin"></i>{" "}
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <i className="bi bi-lock-fill"></i> Pay Now
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
