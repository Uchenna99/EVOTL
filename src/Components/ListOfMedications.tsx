import axios from "axios";
import { useEffect, useState } from "react";
import { DB_GetUser, Medication, Order, UserOrders } from "./interface";
import {TailSpin } from "react-loader-spinner";
import { toast } from "sonner";
import { IoIosClose } from "react-icons/io";
import { HOST_URL } from "../Route";

interface Props{
    next: ()=>void;
    cartUpdate: ()=>void;
    user: DB_GetUser|null;
    cartCount: number;
}

const ListOfMedications = ({next, cartUpdate, user, cartCount}: Props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [medsList, setMedsList] = useState<Medication[] | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [modal, setModal] = useState(false);
    const [selectedMed, setSelectedMed] = useState<Medication | null>(null);


    useEffect(()=>{
        const getMeds = ()=>{
            setIsLoading(true);
            axios.get(`${HOST_URL}/api/v1/users/fetch-meds`)
            .then((response)=>{
                setMedsList(response.data as Medication[]);
                setIsLoading(false);
            })
            .catch(()=>{
                toast.error("Error getting medications, check your network connection and refresh the page", {position:'top-right'});
                setIsLoading(false);
            })
        };
        const order = localStorage.getItem('evtolOrder');
        if(!order){
            const orderList = [] as UserOrders[];
            const saveOrder = JSON.stringify(orderList)
            localStorage.setItem('evtolOrder', saveOrder);
        };
        getMeds();
    },[])


    const addOrder = (order: Order)=>{
        const getOrder = localStorage.getItem('evtolOrder');

        if(getOrder){
            const userOrdersList: UserOrders[] = JSON.parse(getOrder);
            const orderList = userOrdersList.find((userOrder)=> userOrder.userId === user?.id);

            if(orderList){
                const orderExists = orderList.order.some((medOrder)=> medOrder.medication.id === order.medication.id);

                if(orderExists){
                    const update = orderList.order.map((medOrder)=> medOrder.medication.id === order.medication.id?
                        {...medOrder, quantity: medOrder.quantity + order.quantity} : medOrder
                    )
                    orderList.order = update
                    
                }else{ orderList.order.push(order); }

            }else{
                toast.error("An unexpected error ocurred, please refresh the page", {position:'top-right'});
            }

            userOrdersList.map((userOrder)=> userOrder.userId === orderList?.userId? userOrder = orderList : userOrder);
            const saveOrder = JSON.stringify(userOrdersList);
            localStorage.setItem('evtolOrder', saveOrder);
            toast.success('Item added to cart.', {position: 'top-center'});
            cartUpdate();
        }
    }


    const confirmOrder = ()=>{

        if(cartCount > 0 ) {
            next();
        }else{
            toast.warning('You have not selected any items yet', {position: "top-right"});
        }

    }


  return (
    <>
        {
            isLoading?
            <div className="loader">
                <TailSpin
                    height="80"
                    width="80"
                    color="#5A67D8"
                    ariaLabel="loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
            :
            <div className="meds-display">
                <div className="summary-header">
                    
                <h4 id="h4-header">Select Medications</h4>

                    {
                        medsList && (
                        medsList.length === 0?
                        '' :
                        <button id="add-to-cart" style={{}}
                            onClick={confirmOrder}>
                            Next
                        </button>
                        )
                    }

                </div>


                {
                    medsList?.length === 0?
                    <p style={{marginTop:'50px'}}>
                        Something went wrong! Could not fetch list of medications
                    </p>
                    :
                    <div className="med-list-card-grid">

                        {
                            medsList &&
                            medsList.map((meds, index)=>(
                                <div className="med-list-main-card" key={index} onClick={()=>{
                                        setModal(true);
                                        setSelectedMed(meds);
                                    }} style={{cursor:'pointer'}}>
                                    <div className="med-card-list-image"
                                        style={{backgroundImage:`url(${meds.image})`}}
                                    ></div>

                                    <div className="med-card-list-info">
                                        <p>Name: {meds.name}</p>
                                        <p>Price: ₦ {meds.price.toLocaleString()}</p>
                                        <p>Weight: {meds.weight}g</p>
                                        
                                    </div>

                                </div>
                                
                            ))
                            
                        }

                        {
                            modal &&
                            <div className="select-modal-back" >

                                <div className="select-modal-cover" onClick={()=>setModal(false)}></div>

                                <div className="select-modal">
                                    <IoIosClose id="modal-close-icon" onClick={()=> setModal(false)} />
                                    <div className="select-modal-image" style={{backgroundImage:`url(${selectedMed?.image})`}}></div>
                                    <p>{selectedMed?.name}</p>
                                    <p>₦ {selectedMed?.price.toLocaleString()}</p>
                                    <div className="quantity">
                                        <label htmlFor="qty">Quantity</label>
                                        <input id="qty" type="number" min={0} value={quantity}
                                            onChange={(e)=>{setQuantity(parseInt(e.target.value))}}
                                        />
                                    </div>

                                    <button id="add-to-cart"
                                        onClick={()=>{
                                            addOrder({
                                                medication: selectedMed!, 
                                                quantity: quantity,
                                                evtolId: 0,
                                                orderId: ''
                                            });
                                            setModal(false);
                                        }}>
                                            Add to order
                                    </button>
                                </div>

                            </div>
                        }

                    </div>

                }


            </div>
        }
    </>
  )
}

export default ListOfMedications;