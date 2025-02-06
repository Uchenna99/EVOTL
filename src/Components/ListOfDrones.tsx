import { useEffect, useState } from "react";
import { Order } from "./interface";


interface Props{
  next: ()=>void;
}

const ListOfDrones = ({next}: Props) => {
  const [orders, setOrders] = useState();

  useEffect(()=>{
    const getOrders = ()=>{
      const savedOrder = localStorage.getItem('order');
      if(!savedOrder){null}else{
        const order: Order[] = JSON.parse(savedOrder);

      }
    }
  },[])

  return (
    <>
        <div className="drone-list-wrap">
          {/* <p>Select a drone </p> */}
          <div className="drone-list-card">
            <div className="drone-list-image"></div>
            <p>Model: {}</p>
            <button id="add-to-cart" style={{alignSelf:'center', marginTop:'10px'}}>
              Select
            </button>
          </div>
        </div>
    </>
  )
}

export default ListOfDrones;