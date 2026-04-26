import { UseTitle } from "../../hooks/UseTitle";
import { OrderSuccess } from "./Components/OrderSuccess";
import { OrderFail } from "./Components/OrderFail";
import { useLocation } from "react-router-dom";

export const OrderPage = () => {
  const { state } = useLocation();
  UseTitle("Order Summary");

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      {state?.status ? <OrderSuccess data={state.data} /> : <OrderFail />}
    </main>
  );
};
