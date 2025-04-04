import axios from "axios";
import { useEffect, useState } from "react";
import { DB_Order } from "./interface";



const History = () => {
    const [section, setSection] = useState('all');
    const [orders, setOrders] = useState<DB_Order[]|null>(null);

    useEffect(()=>{
        axios.get(`http://localhost:4000/api/v1/users/get-orders`)
        .then((response)=>{
            setOrders(response.data);
        })
    },[]);

  return (
    <>
        <div className="history-section">
            <div className="history-headers">
                <div className="order-group-header">
                    <p onClick={()=> setSection('all')} style={{fontWeight:section === 'all'? 600:''}}>
                        All orders
                    </p>
                    <div className="underline-div" style={{display: section === 'all'? 'block':'none'}}></div>
                </div>

                <div className="order-group-header">
                    <p onClick={()=> setSection('completed')} style={{fontWeight:section === 'completed'? 600:''}}>
                        Completed
                    </p>
                    <div className="underline-div" style={{display: section === 'completed'? 'block':'none'}}></div>
                </div>

                <div className="order-group-header">
                    <p onClick={()=> setSection('pending')} style={{fontWeight:section === 'pending'? 600:''}}>
                        Pending
                    </p>
                    <div className="underline-div" style={{display: section === 'pending'? 'block':'none'}}></div>
                </div>

                <div className="order-group-header">
                    <p onClick={()=> setSection('cancelled')} style={{fontWeight:section === 'cancelled'? 600:''}}>
                        Cancelled
                    </p>
                    <div className="underline-div" style={{display: section === 'cancelled'? 'block':'none'}}></div>
                </div>
            </div>

            <div className="history-grid-wrap">
                <div className="history-grid-header">
                    <div className="history-grid-header-label">
                        Id
                    </div>
                    <div className="history-grid-header-label">
                        Items
                    </div>
                    <div className="history-grid-header-label">
                        Evtol
                    </div>
                    <div className="history-grid-header-label">
                        Date
                    </div>
                </div>

                {
                    orders &&
                    orders.map((order, index)=> (
                    <div className="history-item" key={index}>
                        <div className="history-item-section">
                            <p>#{order.id}</p>
                        </div>
                        <div className="history-item-section">
                            <p>Paracetamol</p>
                        </div>
                        <div className="history-item-section">
                            <p>{order.evtolId}</p>
                        </div>
                        <div className="history-item-section">
                            <p>{order.createdAt}</p>
                        </div>
                    </div>

                    ))
                }
            </div>
        </div>
    </>
  )
}

export default History;