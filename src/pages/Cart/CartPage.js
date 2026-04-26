import { CartEmpty } from "./Components/CartEmpty";
import { CartList } from "./Components/CartList";
import { useCart } from "../../context";
import { UseTitle } from "../../hooks/UseTitle";

export const CartPage = () => {
  const { cartList } = useCart();
  UseTitle(`Cart (${cartList.length})`);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {cartList.length ? <CartList /> : <CartEmpty />}
    </main>
  );
};
