import { useEffect, useState } from "react";
import { DashboardCard } from "./Components/DashboardCard";
import { DashboardEmpty } from "./Components/DashboardEmpty";
import { getUserOrders } from "../../services";
import { UseTitle } from "../../hooks/UseTitle";

export const DashboardPage = () => {
  const [orders, setOrder] = useState([]);
  UseTitle("Dashboard");

  useEffect(() => {
    async function fetchOrders() {
      const data = await getUserOrders();
      setOrder(data);
    }
    fetchOrders();
  }, []);

  return (
    <main className="px-4 md:px-8 lg:px-16 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <section>
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white my-8 underline underline-offset-8">
          My Dashboard
        </h1>
      </section>

      <section className="space-y-6">
        {orders.length > 0
          ? orders.map((order) => <DashboardCard key={order.id} order={order} />)
          : <DashboardEmpty />}
      </section>
    </main>
  );
};
