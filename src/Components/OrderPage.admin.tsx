import axios from "axios";
import { useEffect, useState } from "react";
import { DB_Order, Medication } from "./interface";



const OrderPage = () => {
    const [section, setSection] = useState('all');
    const [orders, setOrders] = useState<DB_Order[]|null>(null);
    const [medsNames, setMedsNames] = useState<Medication[]|null>(null);



    useEffect(()=>{
        axios.get(`http://localhost:4000/api/v1/admin/get-orders`)
        .then((response)=>{
            setOrders(response.data);
        })
    },[]);

    useEffect(()=>{
        axios.get(`http://localhost:4000/api/v1/users/fetch-meds`)
        .then((response)=>{
            setMedsNames(response.data);
        })
    },[]);

    const shortenText = (text: string, maxLength: number) => {
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };

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

                <div className="history-grid-header">
                    <div className="history-grid-header-label">
                        Id
                    </div>
                    <div className="history-grid-header-label">
                        Items (quantity)
                    </div>
                    <div className="history-grid-header-label">
                        Evtol
                    </div>
                    <div className="history-grid-header-label">
                        Status
                    </div>
                    <div className="history-grid-header-label">
                        Date
                    </div>
                </div>
            <div className="history-grid-wrap">

                {
                    orders &&
                    orders.map((order, index)=> (
                    <div className="history-item" key={index}>
                        <div className="history-item-section">
                            <p>#{shortenText(order.id, 10)}</p>
                        </div>
                        <div className="history-item-section">
                            {
                                order.loads.map((load, index)=> (
                                    <p key={index} style={{marginRight:5}}>
                                        {medsNames?.map((med)=> med.id === load.medicationsId? med.name :'')}{' '}
                                        ({load.quantity})
                                        {index === order.loads.length-1 ? '':','}
                                        {' '}
                                    </p>
                                ))
                            }
                        </div>
                        <div className="history-item-section">
                            <p>{order.evtolId}</p>
                        </div>
                        <div className="history-item-section">
                            <p style={{color: order.status === 'COMPLETED'? 'green':
                                order.status === 'CANCELLED'? 'red':''
                            }}>
                                {order.status}
                            </p>
                        </div>
                        <div className="history-item-section">
                            <p>{new Date(order.createdAt).toLocaleString()}</p>
                        </div>
                    </div>

                    ))
                }
            </div>
        </div>

    </>
  )
}

export default OrderPage;