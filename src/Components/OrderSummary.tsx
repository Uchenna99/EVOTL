import axios from "axios";
import { useEffect, useState } from "react";
import { Order } from "./interface";
import { JwtCode } from "../State";
import { TiArrowBack } from "react-icons/ti";

interface Props {
    next: ()=>void;
}


const OrderSummary = ({next}: Props) => {
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
    },[]);

    const handleOrder = async ()=>{
        const user = localStorage.getItem('evtolUser');
        if(user){
            const evtolUser: JwtCode = JSON.parse(user);
            await axios.post(`http://localhost:4000/api/v1/users/create-order`, evtolUser.id)
            .then((response)=>{
                localStorage.setItem('newOrder', response.data);
            })
        }
    };

  return (
    <>
        <div className="summary-wrap">

            <div className="summary-header">
                
                <h4 id="h4-header">Your order summary</h4>

                <p style={{fontWeight:600}}>Total Amount: ₦ {total.toLocaleString()}</p>

                <div className="right-side-butn">

                    <TiArrowBack id="back-arrow" onClick={next}/>

                    <button id="add-to-cart" onClick={handleOrder}>
                        Confirm order
                    </button>

                </div>


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
                                <p>Total: ₦ { (order.quantity * order.medication.price).toLocaleString()}</p>
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