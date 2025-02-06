import axios from "axios";
import { useEffect, useState } from "react";
import { Medication, Order } from "./interface";

interface Props{
    next: ()=>void;
  }

const ListOfMedications = ({next}: Props) => {
    const [medsList, setMedsList] = useState<Medication[] | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [modal, setModal] = useState(false);
    const [selectedMed, setSelectedMed] = useState<Medication | null>(null);


    useEffect(()=>{
        const getMeds = ()=>{
            axios.get('https://evtol-backend-mquf.onrender.com/api/v1/users/fetch-meds')
            .then((response)=>{
                setMedsList(response.data as Medication[]);
                console.log(response.data)
            })
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
        if(!getOrder){null}else{
            const orderList: Order[] = JSON.parse(getOrder);
            orderList.push(order);
            const saveOrder = JSON.stringify(orderList);
            localStorage.setItem('order', saveOrder);
            console.log(saveOrder)
        }
    }

  return (
    <>
        <div className="meds-display">
            <p>Select Medications</p>

            {
                medsList?.length === 0?
                <p style={{marginTop:'50px'}}>
                    Something went wrong! Could not fetch list of medications
                </p>
                :
                medsList?.map((meds)=>(
                    <div className="med-list-card" key={meds.code}>
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
                                            setModal(false);
                                            addOrder({id: selectedMed!.id, quantity: quantity});
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
                medsList?.length === 0?
                '' :
                <button id="add-to-cart" style={{marginTop:'20px'}}
                    onClick={next}>
                    Next
                </button>
            }

        </div>
    </>
  )
}

export default ListOfMedications;