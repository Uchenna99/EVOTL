import axios from "axios";
import { useEffect, useState } from "react";
import { Medication, Order } from "./interface";
import {TailSpin } from "react-loader-spinner";
import { toast } from "sonner";
import { IoIosClose } from "react-icons/io";

interface Props{
    next: ()=>void;
    cartUpdate: ()=>void;
  }

const ListOfMedications = ({next, cartUpdate}: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [medsList, setMedsList] = useState<Medication[] | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [modal, setModal] = useState(false);
    const [selectedMed, setSelectedMed] = useState<Medication | null>(null);
    // const [orderArray, setOrderArray] = useState<Order[]>([]);


    useEffect(()=>{
        const getMeds = ()=>{
            setIsLoading(true);
            try {
                axios.get('http://localhost:4000/api/v1/users/fetch-meds')
                .then((response)=>{
                    setMedsList(response.data as Medication[]);
                    setIsLoading(false);
                })
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };
        const order = localStorage.getItem('order');
        if(order){null}else{
            const orderList = [] as Order[];
            const saveOrder = JSON.stringify(orderList)
            localStorage.setItem('order', saveOrder);
        };
        getMeds();
    },[])


    const addOrder = (order: Order)=>{
        const getOrder = localStorage.getItem('order');
        if(getOrder){
            let orderList: Order[] = JSON.parse(getOrder);
            const orderExists = orderList.some((medOrder)=> medOrder.medication.id === order.medication.id);

            if(orderExists){
                const update = orderList.map((medOrder)=> medOrder.medication.id === order.medication.id?
                    {...medOrder, quantity: medOrder.quantity + order.quantity} : medOrder
                )
                orderList = update
                
            }else{ orderList.push(order); }

            const saveOrder = JSON.stringify(orderList);
            localStorage.setItem('order', saveOrder);
            cartUpdate();
        }
    }


    const confirmOrder = ()=>{
        const getOrder = localStorage.getItem('order');
        if(!getOrder){
            toast.warning("Order not found", {position: "top-right"})
        }else{
            const orderList: Order[] = JSON.parse(getOrder);
            if(!orderList[0]){
                toast.warning('You have not selected any items yet', {position: "top-right"});
            }else{
                next();
            }
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
                    color="black"
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
                                        <input id="qty" type="number" value={quantity}
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
                                            toast.success('Item added to cart.', {position: 'top-right'})
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