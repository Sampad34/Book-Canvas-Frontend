import { useEffect, useState } from "react";
import { DashboardCard } from "./Components/DashboardCard";
import { DashboardEmpty } from "./Components/DashboardEmpty";
import { getUserOrders } from "../../services";
import { UseTitle } from "../../hooks/UseTitle";
import { toast } from "react-toastify";

export const DashboardPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  UseTitle("Dashboard");

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      try {
        const data = await getUserOrders();
        setOrders(data);
      } catch (error) {
        toast.error(error.message || "Failed to fetch orders", {
          closeButton: true,
          position: "bottom-center",
          autoClose: 5000,
        });
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </main>
    );
  }

  return (
    <main className="px-4 sm:px-6 md:px-8 lg:px-16 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <section>
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            My Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {orders.length} {orders.length === 1 ? "order" : "orders"} placed
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {orders.length > 0 ? (
            orders.map((order) => (
              <DashboardCard key={order.id} order={order} />
            ))
          ) : (
            <DashboardEmpty />
          )}
        </div>
      </section>
    </main>
  );
};
