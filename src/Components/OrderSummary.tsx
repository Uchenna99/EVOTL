import axios from "axios";
import { useEffect, useState } from "react";
import { DB_Load, Order } from "./interface";
import pelican from "../assets/Images/Pelican-2.0-Home.png"



const OrderSummary = () => {
    const [summary, setSummary] = useState<DB_Load[]|null>(null);
    const [orderInfo, setOrderInfo] = useState<Order[]>([]);

    useEffect(()=>{
        const getLoad = async ()=>{
            const savedOrder = localStorage.getItem('order');
            if(!savedOrder){
                alert('Could not fetch orders');
            }else{
                const orders: Order[] = JSON.parse(savedOrder);
                setOrderInfo(orders);
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
                                style={{backgroundImage:`url(${pelican})`}}
                            ></div>

                            <div className="med-card-list-info">
                                <p>Name: {order.medicationsId}</p>
                                <p>Price: ₦ {order.quantity}</p>
                                <p>Quantity: {order.quantity}</p>
                                
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