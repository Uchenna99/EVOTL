import axios from "axios";
import { useEffect, useState } from "react";
import { DB_Load, Order } from "./interface";



const OrderSummary = () => {
    const [summary, setSummary] = useState<DB_Load[]|null>(null);
    
    useEffect(()=>{
        const getLoad = async ()=>{
            const savedOrder = localStorage.getItem('order');
            if(!savedOrder){
                alert('Could not fetch orders');
            }else{
                const orders: Order[] = JSON.parse(savedOrder);
                const getOrder = {
                    evtolId: orders[0].evtolId,
                    orderId: orders[0].orderId
                }
                await axios.post('http://localhost:4000/api/v1/evtol/evtol-load', getOrder)
                .then((response)=>{
                    setSummary(response.data as DB_Load[]);
                })
            }
        }
        getLoad();
    },[])

  return (
    <>
        <div className="summary-wrap">
            <h4 id="h4-header">Your order summary</h4>

            {
                summary &&
                summary.map((load)=>(
                    <div className="med-list-card" key={load.id}>
                        <div className="med-list-image"
                            style={{backgroundImage:`url()`}}
                        ></div>

                        <div className="med-list-info">
                            <p>{}</p>
                            <p>₦ {}</p>
                            
                        </div>

                    </div>
                ))
            }

            <button id="add-to-cart">
                Confirm order
            </button>
        </div>
    </>
  )
}

export default OrderSummary;