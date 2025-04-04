import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { DB_GetUser, Order, UserOrders } from "./interface";

interface Props {
    close: ()=>void;
    user: DB_GetUser | null;
    cartUpdate: ()=>void;
}

const CartItems = ({close, user, cartUpdate}: Props) => {
    const [orderArray, setOrderArray] = useState<Order[]|null>(null);

    useEffect(()=>{

        const getCartItems = ()=>{
            const getOrder = localStorage.getItem('evtolOrder');

            if(getOrder){
                const orderList: UserOrders[] = JSON.parse(getOrder);
                const cartList = orderList.find((cartOrder)=> cartOrder.userId === user?.id);

                if(cartList) {
                    setOrderArray(cartList.order);
                }
            }
        }

        getCartItems();
    },[])

    const handleRemove = (id: number)=>{
        const getOrder = localStorage.getItem('evtolOrder');

        if(getOrder){
            const orderList: UserOrders[] = JSON.parse(getOrder);
            const cartList = orderList.find((cartOrder)=> cartOrder.userId === user?.id);

            if(cartList) {
                const filteredList = cartList.order.filter((order)=> order.medication.id !== id);
                setOrderArray(filteredList);
                orderList.map((userOrder)=> userOrder.userId === user?.id? userOrder.order = filteredList : userOrder);
                const saveList = JSON.stringify(orderList);
                localStorage.setItem('evtolOrder', saveList);
                cartUpdate();
            }
        }
    };

  return (
    <>
        <div className="select-modal-back">
            <div className="cart-items-div">
                <IoIosClose id="modal-close-icon" onClick={close} />
                <p>Your selected items</p>
                <div className="cart-items-scroll">
                    <div className="cart-items-grid">
                        {
                            orderArray &&
                            orderArray.map((order, index)=>(
                                <div className="med-list-main-card" key={index} style={{width:'100%'}}>
                                    <div className="med-card-list-image"
                                        style={{backgroundImage:`url(${order.medication.image})`, height:180}}
                                    ></div>
        
                                    <div className="med-card-list-info">

                                        <p>Name: {order.medication.name}</p>

                                        <p>Quantity: {order.quantity}</p>

                                        <p>Total: ₦ { (order.quantity * order.medication.price).toLocaleString()}</p>

                                        <button id="remove-item" onClick={()=>handleRemove(order.medication.id)}>
                                            Remove
                                        </button>
                                    </div>
        
                                </div>
                            ))
                        }
                        {
                            orderArray?.length === 0 &&
                            <p style={{justifySelf:'center', marginTop:100, fontWeight:600, color:'#F56565'}}>
                                No items selected
                            </p>
                        }
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default CartItems;