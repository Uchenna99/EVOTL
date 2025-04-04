import { useEffect, useState } from "react"
import "../Stylesheets/Dashboard.css"
import { useNavigate } from "react-router-dom";
import useGlobalState, { JwtCode } from "../State";
import { jwtDecode } from "jwt-decode";
import { GoSearch } from "react-icons/go";
import ListOfMedications from "../Components/ListOfMedications";
import OrderSummary from "../Components/OrderSummary";
import { GiDeliveryDrone } from "react-icons/gi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { DB_GetUser, UserOrders } from "../Components/interface";
import { toast } from "sonner";
import axios from "axios";
import CartItems from "../Components/CartItems";
import ProfilePage from "../Components/ProfilePage";
import History from "../Components/History";


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
          localStorage.setItem('evtolGetUser', JSON.stringify(response.data));
          setCartUpdate(!cartUpdate);
        })
      }else{
        toast.warning('Could not get user');
      }
    };
    getUser();
  },[]);

  useEffect(()=>{
    const order = localStorage.getItem('evtolOrder');
    const user = localStorage.getItem('evtolGetUser');
    
    if(order && user){
      const orderList: UserOrders[] = JSON.parse(order);
      const userInfo: DB_GetUser = JSON.parse(user);
      let usersOrder = orderList.find((userOrder)=> userOrder.userId === userInfo.id);

      if(usersOrder){
        setItemCount(usersOrder.order.length);
      }else{
        usersOrder = {userId: userInfo.id, order: []};
        orderList.push(usersOrder);
        setItemCount(usersOrder.order.length);
        const saveOrder = JSON.stringify(orderList);
        localStorage.setItem('evtolOrder', saveOrder);
      }

    }else if(!order && user){
      const userInfo: DB_GetUser = JSON.parse(user);
      const orderList = [{userId: userInfo.id , order: []}] as UserOrders[];
      const saveOrder = JSON.stringify(orderList)
      localStorage.setItem('evtolOrder', saveOrder);
      
    }

    
  },[cartUpdate]);

  const handleLogout = ()=>{
    localStorage.removeItem('evtolToken');
    // localStorage.removeItem('evtolOrder');
    localStorage.setItem('evtolLogin', 'false');
    localStorage.removeItem('evtolUser');
    localStorage.removeItem('evtolGetUser');
    setLoggedIn(false);
    navigate('/login');
  };


  return (
    <>
        <>
            <div className="dashboard-wrap">

              <div className="dash-left">

                <div className="dash-user">
                  <h1 style={{color:'#EDF2F7'}}>
                    EVTOL
                  </h1>
                  {/* <div className="dash-user-image" style={{backgroundImage: `url(${user?.image})`}}></div>
                  <div className="dash-user-name">
                    <p>Hello</p>
                    <p>{`${user?.firstName} ${user?.lastName}`}</p>
                  </div> */}
                </div>

                <div className="dash-left-options">

                  <div className="dash-option-select" onClick={()=> setDashboard('delivery')}
                    style={{animationName:dashboard==='delivery'? 'select':''}}>
                    <p style={{color: dashboard==='delivery'? '#5A67D8':'', fontWeight: dashboard === 'delivery'? "bold" : '', fontSize:dashboard === 'delivery'? 19 : ''}}>
                      New delivery
                    </p>
                  </div>

                  <div className="dash-option-select" onClick={()=> setDashboard('tracking')}
                    style={{animationName:dashboard==='tracking'? 'select':''}}>
                    <p style={{color: dashboard==='tracking'? '#5A67D8':'', fontWeight: dashboard === 'tracking'? "bold" : '', fontSize:dashboard === 'tracking'? 19 : ''}}>
                      Order Tracking
                    </p>
                  </div>

                  <div className="dash-option-select" onClick={()=> setDashboard('history')}
                    style={{animationName: dashboard==='history'? 'select':''}}>
                    <p style={{color: dashboard==='history'? '#5A67D8':'', fontWeight: dashboard === 'history'? "bold" : '', fontSize:dashboard === 'history'? 20 : ''}}>
                      History
                    </p>
                  </div>

                  <div className="dash-option-select" onClick={()=> setDashboard('profile')}
                    style={{animationName:dashboard==='profile'? 'select':''}}>
                    <p style={{color: dashboard==='profile'? '#5A67D8':'', fontWeight: dashboard === 'profile'? "bold" : '', fontSize:dashboard === 'profile'? 19 : ''}}>
                      Profile
                    </p>
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

                  <div className="notification-section">
                    <div className="drone-cart" onClick={()=> setShowCart(true)}>
                      <GiDeliveryDrone id="cart-icon"/>
                      <div className="cart-item-count"> {itemCount} </div>
                    </div>

                    <div className="drone-cart">
                      <IoMdNotificationsOutline id="cart-icon"/>
                      <div className="notification-count" style={{display:'none'}}> {itemCount} </div>
                    </div>
                  </div>
                </div>

                <div className="dash-display-board">
                  {
                    dashboard === 'delivery' &&
                    (
                      newOrder === 'meds-list'?
                      <ListOfMedications 
                        next={()=>setNewOrder('summary')} 
                        cartUpdate={()=>setCartUpdate(!cartUpdate)} 
                        user={user} 
                        cartCount={itemCount}
                      /> 
                      :
                      newOrder === 'summary'?
                      <OrderSummary 
                        next={()=> setNewOrder('meds-list')} 
                        user={user}
                        cartUpdate={()=>setCartUpdate(!cartUpdate)}
                      /> 
                      : ''
                    )
                  }
                  {
                    dashboard === 'history' &&
                    <History />
                  }
                  {
                    dashboard === 'profile' &&
                    <ProfilePage />
                  }
                </div>

                {
                  showCart &&
                  <CartItems 
                    close={()=>setShowCart(false)} 
                    user={user}
                    cartUpdate={()=> setCartUpdate(!cartUpdate)}
                  />
                }
              </div>
            </div>
        </>
    </>
  )
}

export default Dashboard