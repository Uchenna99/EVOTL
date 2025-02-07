import { useEffect, useState } from "react";
import { DB_Evtol, Order } from "./interface";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";


interface Props{
  next: ()=>void;
}

const ListOfDrones = ({next}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [evtols, setEvtols] = useState<DB_Evtol[]|null>(null);

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
        <div className="drone-list-wrap">
          {/* <p>Select a drone </p> */}
          {
            evtols &&
            evtols.map((evtol)=>(
              <div className="drone-list-card">
                <div className="drone-list-image" style={{backgroundImage:`url(${evtol.image})`}}></div>
                <p>Model: {evtol.model}</p>
                <button id="add-to-cart" style={{alignSelf:'center', marginTop:'10px'}}>
                  Select
                </button>
              </div>
            ))
          }
        </div>
      }
    </>
  )
}

export default ListOfDrones;