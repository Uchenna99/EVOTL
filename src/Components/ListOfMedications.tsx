import axios from "axios";
import { useEffect, useState } from "react";
import { Medication, Order } from "./interface";
import {TailSpin } from "react-loader-spinner";
import { toast } from "sonner";

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
                    console.log(response.data)
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
            const orderExists = orderList.some((medOrder)=> medOrder.medicationsId === order.medicationsId);

            if(orderExists){
                const update = orderList.map((medOrder)=> medOrder.medicationsId === order.medicationsId?
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
                <p>Select Medications</p>


                {
                    medsList?.length === 0?
                    <p style={{marginTop:'50px'}}>
                        Something went wrong! Could not fetch list of medications
                    </p>
                    :
                    medsList?.map((meds)=>(
                        <div className="med-list-card" key={meds.id}>
                            <div className="med-list-image"
                                style={{backgroundImage:`url(${meds.image})`}}
                            ></div>

                            <div className="med-list-info">
                                <p>{meds.name}</p>
                                <p>₦ {meds.price}</p>
                                <div className="quantity">
                                    <label htmlFor="qty">Quantity</label>
                                    <input id="qty" type="number" 
                                        onChange={(e)=>{setQuantity(parseInt(e.target.value))}}
                                    />
                                </div>
                            </div>

                            <div className="med-list-btn">
                                <button id="add-to-cart"
                                onClick={()=>{
                                    setSelectedMed(meds);
                                    setModal(true);
                                }}>
                                    Select
                                </button>
                            </div>

                            {
                                modal &&
                                <div className="select-modal-back" >

                                    <div className="select-modal-cover" onClick={()=>setModal(false)}></div>

                                    <div className="select-modal">
                                        <div className="select-modal-image" style={{backgroundImage:`url(${selectedMed?.image})`}}></div>
                                        <p>{selectedMed?.name}</p>
                                        <p>₦ {selectedMed?.price}</p>
                                        <div className="quantity">
                                            <label htmlFor="qty">Quantity</label>
                                            <input id="qty" type="number" value={quantity}
                                                onChange={(e)=>{setQuantity(parseInt(e.target.value))}}
                                            />
                                        </div>

                                        <button id="add-to-cart"
                                            onClick={()=>{
                                                addOrder({
                                                    medicationsId: selectedMed!.id, 
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
                    ))
                }

                {
                    medsList && (
                    medsList.length === 0?
                    '' :
                    <button id="add-to-cart" style={{marginTop:'20px', position:'fixed', bottom:40, right:50}}
                        onClick={confirmOrder}>
                        Next
                    </button>
                    )
                }

            </div>
        }
    </>
  )
}

export default ListOfMedications;