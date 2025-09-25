import { UseTitle } from "../../hooks/UseTitle";
import {OrderSuccess} from "./Components/OrderSuccess";
import { OrderFail } from "../order/Components/OrderFail";
import { useLocation } from "react-router-dom";

// this is basically order-summary page

export const OrderPage = () => {

    const {state} = useLocation();
    UseTitle("Order Summary");

  return (
    <main>{ state.status ? <OrderSuccess data={state.data} /> : <OrderFail />}</main>
  )
}
