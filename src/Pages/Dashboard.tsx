import { useEffect, useState } from "react"
import "../Stylesheets/Dashboard.css"
import { useNavigate } from "react-router-dom";
import useGlobalState, { JwtCode } from "../State";
import { jwtDecode } from "jwt-decode";
import { GoSearch } from "react-icons/go";
import ListOfMedications from "../Components/ListOfMedications";
import OrderSummary from "../Components/OrderSummary";
import { GiDeliveryDrone } from "react-icons/gi";
import { Order } from "../Components/interface";

const Dashboard = () => {
  const { setLoggedIn } = useGlobalState();
  const navigate = useNavigate();
  const [user, setUser] = useState<JwtCode | null>(null);
  const [delivery, setDelivery] = useState(false);
  const [history, setHistory] = useState(false);
  const [newOrder, setNewOrder] = useState('meds-list');
  const [itemCount, setItemCount] = useState(0);
  const [cartUpdate, setCartUpdate] = useState(false);

  useEffect(()=>{
    const getUser = ()=>{
      const user = localStorage.getItem('token');
      if(user){
        const decoded = jwtDecode(user);
        setUser(decoded as JwtCode);
      }else{
        console.log('Could not decode user');
      }
    };
    getUser();
  },[]);

  useEffect(()=>{
    const order = localStorage.getItem('order');
    if(order){
      const orderList: Order[] = JSON.parse(order);
      setItemCount(orderList.length);
    }
  },[cartUpdate]);

  const handleLogout = ()=>{
    localStorage.removeItem('token');
    localStorage.setItem('isLoggedIn', 'false');
    setLoggedIn(false);
    navigate('/login');
  };


  return (
    <>
        <>
            <div className="dashboard-wrap">

              <div className="dash-left">

                <div className="dash-user">
                  <div className="dash-user-image"></div>
                  <div className="dash-user-name">
                    <p>Hello</p>
                    <p>{user?.name}</p>
                  </div>
                </div>

                <div className="dash-left-options">

                  <div className="dash-option-select" onClick={()=>{
                    setDelivery(true);
                    setHistory(false);
                  }}
                    style={{animationName:delivery? 'select':''}}>
                    <p>New delivery order</p>
                  </div>

                  <div className="dash-option-select" onClick={()=> {
                    setHistory(true);
                    setDelivery(false);
                    }}
                    style={{animationName:history? 'select':''}}>
                    <p>History</p>
                  </div>

                  <div className="dash-option-select" onClick={handleLogout}>
                    <p>Logout</p>
                  </div>
                </div>
              </div>


              <div className="dash-right">

                <div className="searchbar-section">
                  <div className="search-bar">
                    <input type="text" />
                    <div className="search-icon">
                      <GoSearch id="dash-search-icon"/>
                    </div>
                  </div>

                  <div className="drone-cart">
                    <GiDeliveryDrone id="cart-icon"/>
                    <div className="cart-item-count"> {itemCount} </div>
                  </div>
                </div>

                <div className="dash-display-board">
                  {
                    delivery &&
                    (
                      newOrder === 'meds-list'?
                      <ListOfMedications next={()=>setNewOrder('summary')} cartUpdate={()=>setCartUpdate(!cartUpdate)} /> :
                      // newOrder === 'drone-list'?
                      // <ListOfDrones next={()=>setNewOrder('summary')} /> :
                      newOrder === 'summary'?
                      <OrderSummary /> : ''
                    )
                  }
                </div>
              </div>
            </div>
        </>
    </>
  )
}

export default Dashboard