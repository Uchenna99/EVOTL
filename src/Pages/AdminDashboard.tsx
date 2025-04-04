import { useNavigate } from "react-router-dom";
import useGlobalState from "../State";
import { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { DB_GetUser } from "../Components/interface";
import { GoSearch } from "react-icons/go";
import History from "../Components/History";
import ProfilePage from "../Components/ProfilePage";
import OrderPage from "../Components/OrderPage.admin";



const AdminDashboard = () => {
    const { setLoggedIn } = useGlobalState();
    const navigate = useNavigate();
    const [user, setUser] = useState<DB_GetUser|null>(null);
    const [dashboard, setDashboard] = useState('orders');
    const [itemCount, setItemCount] = useState(0);

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

                <div className="dash-option-select" onClick={()=> setDashboard('orders')}
                style={{animationName:dashboard==='orders'? 'select':''}}>
                <p style={{color: dashboard==='orders'? '#5A67D8':'', fontWeight: dashboard === 'orders'? "bold" : '', fontSize:dashboard === 'orders'? 19 : ''}}>
                    Orders
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
                    <div className="drone-cart">
                        <IoMdNotificationsOutline id="cart-icon"/>
                        <div className="notification-count" style={{display:'none'}}> {itemCount} </div>
                    </div>
                </div>
            </div>

            <div className="dash-display-board">
                {
                    dashboard === 'orders' &&
                    (
                        <OrderPage />
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
            </div>
        </div>
    </>
  )
}

export default AdminDashboard