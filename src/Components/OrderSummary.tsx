import axios from "axios";
import { useEffect, useState } from "react";
import { CreateLoadDTO, DB_GetUser, DB_Order, Order, UserOrders } from "./interface";
import { JwtCode } from "../State";
import { TiArrowBack } from "react-icons/ti";
import { toast } from "sonner";
import { TailSpin } from "react-loader-spinner";

interface Props {
    next: ()=>void;
    user: DB_GetUser | null;
    cartUpdate: ()=>void;
}


const OrderSummary = ({next, user, cartUpdate}: Props) => {
    const [orderInfo, setOrderInfo] = useState<Order[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

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
                    next();
                }
            }

        }
        getLoad();
    },[]);


    const handleOrder = async ()=>{
        setLoading(true);
        const user = localStorage.getItem('evtolUser');
        if(user){
            const evtolUser: JwtCode = JSON.parse(user);
            await axios.post(`http://localhost:4000/api/v1/users/create-order`, {userId: evtolUser.id})
            .then((response)=>{
                localStorage.setItem('evtolnewOrder', JSON.stringify(response.data));
                createLoad();
            })
            .catch(()=> {
                setLoading(false);
                toast.error("Error creating order, please check your network connection and try again", {position:'top-right'});
            })
        }
    };

    const createLoad = async ()=>{
        const getOrder = localStorage.getItem('evtolOrder');
        const newOrder = localStorage.getItem('evtolnewOrder');

        if(getOrder && newOrder){
            const userOrdersList: UserOrders[] = JSON.parse(getOrder);
            const currOrder: DB_Order = JSON.parse(newOrder);
            let loadArray: CreateLoadDTO[] = [];
            const orderList = userOrdersList.find((userOrder)=> userOrder.userId === user?.id);

            if(orderList) {
                orderList.order.map((orderObj)=> loadArray.push({
                    medicationsId: orderObj.medication.id,
                    quantity: orderObj.quantity,
                    orderId: currOrder.id
                }));
    
                await axios.post(`http://localhost:4000/api/v1/evtol/create-load`, loadArray)
                .then((response)=>{
                    toast.success(response.data.message, {position:'top-right'});

                    userOrdersList.map((userOrder)=> userOrder.userId === user?.id? userOrder.order = [] : userOrder);
                    const saveOrder = JSON.stringify(userOrdersList);
                    localStorage.setItem('evtolOrder', saveOrder);

                    setLoading(false);
                    cartUpdate();
                    next();
                    
                })
                .catch(()=>{
                    setLoading(false);
                    toast.error("Error creating order, please check your network connection and try again", {position:'top-right'});
                })

            }
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

                    <div className="button-wrapper">
                        <button id="add-to-cart" onClick={handleOrder}>
                            Confirm order
                        </button>
                        {
                            loading &&
                            <div className="loading-button">
                                <TailSpin
                                    color="white"
                                    width={20}
                                    height={20}
                                />
                            </div>
                        }
                    </div>

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