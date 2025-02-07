import { useEffect, useState } from "react";
import { DB_Evtol, DB_Order, Order } from "./interface";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";


interface Props{
  next: ()=>void;
}

const ListOfDrones = ({next}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [evtols, setEvtols] = useState<DB_Evtol[]|null>(null);
  const [selectedId, setSelectedId] = useState<number|null>(null);

  useEffect(()=>{
    const getEvtols = async ()=>{
      setIsLoading(true);
      try {
        await axios.get('https://evtol-backend-mquf.onrender.com/api/v1/evtol/fetch-all-evtols')
        .then((response)=>{
          const data = response.data as DB_Evtol[];
          setEvtols(data);
          setIsLoading(false);
        })
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    getEvtols();
  },[])


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
        <div className="drone-list-main-wrapper">
          <h3>Select a drone</h3>

          <div className="drone-list-wrap">
            {
              evtols &&
              evtols.map((evtol)=>(
                <div className="drone-list-card" key={evtol.id}>
                  <div className="drone-list-image" style={{backgroundImage:`url(${evtol.image})`}}></div>
                  <p>Model: {evtol.model}</p>
                  <button id="add-to-cart" style={{alignSelf:'center', marginTop:'10px'}}
                  onClick={async ()=>{
                    const savedOrders = localStorage.getItem('order');
                    if(!savedOrders){
                      alert('Orders not found');
                    }else{
                      const createOrder = {evtolId: evtol.id};
                      await axios.post('https://evtol-backend-mquf.onrender.com/api/v1/users/create-order', createOrder)
                      .then(async(response)=>{
                        const resp = response.data as DB_Order;
                        const orders: Order[] = JSON.parse(savedOrders);
                        const mapped = orders.map((order)=>({...order, evtolId: evtol.id, orderId: resp.id}))
                        await axios.post('https://evtol-backend-mquf.onrender.com/api/v1/evtol/create-load/', mapped)
                        .then((response)=>{
                          const jsonOrder = JSON.stringify(mapped);
                          localStorage.setItem('order', jsonOrder);
                          console.log(response.data.message);
                        })
                      })
                    }
                    next();
                  }}>
                    Select
                  </button>
                </div>
              ))
            }
          </div>

          {/* <button id="add-to-cart" style={{marginTop:'20px'}}>
            Place Order
          </button> */}
        </div>
      }
    </>
  )
}

export default ListOfDrones;