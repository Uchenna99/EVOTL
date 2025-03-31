import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { DB_GetUser, Order, UserOrders } from "./interface";

interface Props {
    close: ()=>void;
    user: DB_GetUser | null;
}

const CartItems = ({close, user}: Props) => {
    const [oderArray, setOrderArray] = useState<Order[]|null>(null);

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

  return (
    <>
        <div className="select-modal-back" onClick={close}>
            <div className="cart-items-div">
                <IoIosClose id="modal-close-icon" onClick={close} />
                <p>Your selected items</p>
                <div className="cart-items-scroll">
                    <div className="cart-items-grid">
                        {
                            oderArray &&
                            oderArray.map((order, index)=>(
                                <div className="med-list-main-card" key={index} style={{width:'100%'}}>
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
            </div>
        </div>
    </>
  )
}

export default CartItems;