import { CartEmpty } from "./Components/CartEmpty";
import { CartList } from "./Components/CartList";
import { useCart } from "../../context";
import { UseTitle } from "../../hooks/UseTitle";


export const CartPage = ()=>{
    
  const { cartList } = useCart();
  UseTitle(`Cart (${cartList.length})`);

    return (
        <main>
            {cartList.length ? <CartList /> : <CartEmpty /> }
        </main>
    )

}