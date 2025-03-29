import { useEffect, useState } from "react"
import "../Stylesheets/Dashboard.css"
import { useNavigate } from "react-router-dom";
import useGlobalState, { JwtCode } from "../State";
import { jwtDecode } from "jwt-decode";
import { GoSearch } from "react-icons/go";
import ListOfMedications from "../Components/ListOfMedications";
import OrderSummary from "../Components/OrderSummary";
import { GiDeliveryDrone } from "react-icons/gi";
import { DB_GetUser, Order } from "../Components/interface";
import { toast } from "sonner";
import axios from "axios";
import CartItems from "../Components/CartItems";


const Dashboard = () => {
  const { setLoggedIn } = useGlobalState();
  const navigate = useNavigate();
  const [user, setUser] = useState<DB_GetUser|null>(null);
  const [dashboard, setDashboard] = useState('delivery');
  const [newOrder, setNewOrder] = useState('meds-list');
  const [itemCount, setItemCount] = useState(0);
  const [cartUpdate, setCartUpdate] = useState(false);
  const [showCart, setShowCart] = useState(false);

  useEffect(()=>{
    const getUser = async()=>{
      const user = localStorage.getItem('evtolToken');
      if(user){
        const decoded: JwtCode = jwtDecode(user);
        await axios.get(`http://localhost:4000/api/v1/users/get-user/${decoded.id}`)
        .then((response)=>{
          setUser(response.data as DB_GetUser);
          localStorage.setItem('GetUser', JSON.stringify(response.data));
        })
      }else{
        toast.warning('Could not get user');
      }
    };
    getUser();
  },[]);

  useEffect(()=>{
    const order = localStorage.getItem('evtolOrder');
    if(order){
      const orderList: Order[] = JSON.parse(order);
      setItemCount(orderList.length);
    }
  },[cartUpdate]);

  const handleLogout = ()=>{
    localStorage.removeItem('evtolToken');
    localStorage.removeItem('evtolOrder');
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('evtolUser');
    localStorage.removeItem('GetUser');
    setLoggedIn(false);
    navigate('/login');
  };


  return (
    <>
        <>
            <div className="dashboard-wrap">

              <div className="dash-left">

                <div className="dash-user">
                  <div className="dash-user-image" style={{backgroundImage: `url(${user?.image})`}}></div>
                  <div className="dash-user-name">
                    <p>Hello</p>
                    <p>{`${user?.firstName} ${user?.lastName}`}</p>
                  </div>
                </div>

                <div className="dash-left-options">

                  <div className="dash-option-select" onClick={()=> setDashboard('delivery')}
                    style={{animationName:dashboard==='delivery'? 'select':''}}>
                    <p style={{color: dashboard==='delivery'? 'white':''}}>New delivery</p>
                  </div>

                  <div className="dash-option-select" onClick={()=> setDashboard('tracking')}
                    style={{animationName:dashboard==='tracking'? 'select':''}}>
                    <p style={{color: dashboard==='tracking'? 'white':''}}>Order Tracking</p>
                  </div>

                  <div className="dash-option-select" onClick={()=> setDashboard('history')}
                    style={{animationName: dashboard==='history'? 'select':''}}>
                    <p style={{color: dashboard==='history'? 'white':''}}>History</p>
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

                  <div className="drone-cart" onClick={()=> setShowCart(true)}>
                    <GiDeliveryDrone id="cart-icon"/>
                    <div className="cart-item-count"> {itemCount} </div>
                  </div>
                </div>

                <div className="dash-display-board">
                  {
                    dashboard === 'delivery' &&
                    (
                      newOrder === 'meds-list'?
                      <ListOfMedications next={()=>setNewOrder('summary')} cartUpdate={()=>setCartUpdate(!cartUpdate)} /> :
                      // newOrder === 'drone-list'?
                      // <ListOfDrones next={()=>setNewOrder('summary')} /> :
                      newOrder === 'summary'?
                      <OrderSummary next={()=> setNewOrder('meds-list')} /> : ''
                    )
                  }
                </div>

                {
                  showCart &&
                  <CartItems close={()=>setShowCart(false)} />
                }
              </div>
            </div>
        </>
    </>
  )
}

export default Dashboard