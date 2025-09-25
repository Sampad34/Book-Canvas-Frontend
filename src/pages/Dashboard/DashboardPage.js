import { useEffect, useState } from "react";
import { DashboardCard} from "./Components/DashboardCard";
import { DashboardEmpty} from "./Components/DashboardEmpty";
import { getUserOrders } from "../../services";
import { UseTitle } from "../../hooks/UseTitle";

export const DashboardPage = () => {

    //const orders=[];
    const [orders, setOrder]= useState([]);
    UseTitle("Dashboard");

    

    useEffect(()=> {
       
        async function fetchOrders(){
             

            const data =await getUserOrders();
            setOrder(data);
            
        }
        fetchOrders();

    },[])

  return (
    <main>
        <section>
            <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">my dashboard</p>
        </section>

        <section>
            { orders.length && orders.map((order) => (
                <DashboardCard key={order.id} order={order} />
            ))
            }

        </section>

        <section>
            { !orders.length && <DashboardEmpty /> }
        </section>
    </main>
  )
}
