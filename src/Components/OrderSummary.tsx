import axios from "axios";
import { useEffect, useState } from "react";
import { Order } from "./interface";



const OrderSummary = () => {
    // const [summary, setSummary] = useState<DB_Load[]|null>(null);
    const [orderInfo, setOrderInfo] = useState<Order[]>([]);
    const [total, setTotal] = useState(0);

    useEffect(()=>{
        const getLoad = async ()=>{
            const savedOrder = localStorage.getItem('order');
            if(!savedOrder){
                alert('Could not fetch orders');
            }else{
                const orders: Order[] = JSON.parse(savedOrder);
                setOrderInfo(orders);
                
                let incr: number = 0
                orders.map((order)=> incr = incr + (order.medication.price * order.quantity));
                setTotal(incr);

                // const getOrder = {
                //     evtolId: orders[0].evtolId,
                //     orderId: orders[0].orderId
                // }
                // await axios.post('http://localhost:4000/api/v1/evtol/evtol-load', getOrder)
                // .then((response)=>{
                //     setSummary(response.data as DB_Load[]);
                // })
            }
        }
        getLoad();
    },[])

  return (
    <>
        <div className="summary-wrap">

            <div className="summary-header">
                
                <h4 id="h4-header">Your order summary</h4>

                <p>Total Amount: {total}</p>

                <button id="add-to-cart">
                    Confirm order
                </button>

            </div>

            <div className="med-list-card-grid">

                {
                    orderInfo &&
                    orderInfo.map((order, index)=>(
                        <div className="med-list-main-card" key={index}>
                            <div className="med-card-list-image"
                                style={{backgroundImage:`url(${order.medication.image})`}}
                            ></div>

                            <div className="med-card-list-info">
                                <p>Name: {order.medication.name}</p>
                                <p>Quantity: {order.quantity}</p>
                                <p>Total: { order.quantity * order.medication.price}</p>
                            </div>

                        </div>
                        ))
                }

            </div>

        </div>
    </>
  )
}

export default OrderSummary;