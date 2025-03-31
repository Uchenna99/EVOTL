import axios from "axios";
import { useEffect, useState } from "react";
import { CreateLoadDTO, DB_GetUser, DB_Order, Order, UserOrders } from "./interface";
import { JwtCode } from "../State";
import { TiArrowBack } from "react-icons/ti";
import { toast } from "sonner";

interface Props {
    next: ()=>void;
    user: DB_GetUser | null;
}


const OrderSummary = ({next, user}: Props) => {
    const [orderInfo, setOrderInfo] = useState<Order[]>([]);
    const [total, setTotal] = useState(0);

    useEffect(()=>{
        const getLoad = async ()=>{
            const getOrder = localStorage.getItem('evtolOrder');

            if(getOrder) {
                const orderList: UserOrders[] = JSON.parse(getOrder);
                const cartList = orderList.find((cartOrder)=> cartOrder.userId === user?.id);
                if(cartList) {
                    setOrderInfo(cartList.order);

                    let incr: number = 0
                    cartList.order.map((order)=> incr = incr + (order.medication.price * order.quantity));
                    setTotal(incr);

                }else{
                    toast.error("An unexpected error ocurred", {position:'top-right'});
                    next
                }
            }

        }
        getLoad();
    },[]);

    const handleOrder = async ()=>{
        const user = localStorage.getItem('evtolUser');
        if(user){
            const evtolUser: JwtCode = JSON.parse(user);
            await axios.post(`http://localhost:4000/api/v1/users/create-order`, {userId: evtolUser.id})
            .then((response)=>{
                localStorage.setItem('evtolnewOrder', JSON.stringify(response.data));
                createLoad();
            })
        }
    };

    const createLoad = async ()=>{
        const order = localStorage.getItem('evtolOrder');
        const newOrder = localStorage.getItem('evtolnewOrder');

        if(order && newOrder){
            const orderArray: Order[] = JSON.parse(order);
            const currOrder: DB_Order = JSON.parse(newOrder);
            let loadArray: CreateLoadDTO[] = []
            orderArray.map((orderObj)=> loadArray.push({
                medicationsId: orderObj.medication.id,
                quantity: orderObj.quantity,
                orderId: currOrder.id
            }));

            await axios.post(`http://localhost:4000/api/v1/evtol/create-load`, loadArray)
            .then((response)=>{
                toast.success(response.data.message, {position:'top-right'});
                
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