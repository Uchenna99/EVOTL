import { useNavigate } from "react-router-dom";
import useGlobalState from "../State";
import { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { DB_GetUser } from "../Components/interface";
import { GoSearch } from "react-icons/go";
import { LuHistory } from "react-icons/lu";
import { FaHistory } from "react-icons/fa";
import History from "../Components/History";
import OrderPage from "../Components/OrderPage.admin";
import EvtolsPage from "../Components/EvtolsPage";
import { TbClipboardList } from "react-icons/tb";
import { ClipboardList } from "lucide-react"



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
            </div>

            <div className="dash-left-options">

                <div className="dash-option-select" onClick={()=> setDashboard('orders')}
                    style={{animationName:dashboard==='orders'? 'select':''}}>
                    <ClipboardList 
                        size={22}
                        strokeWidth={2.5}
                        color={dashboard === 'orders'? '#5A67D8':''}
                    />
                    <p style={{color: dashboard==='orders'? '#5A67D8':'', fontWeight: dashboard === 'orders'? "bold" : '', fontSize:dashboard === 'orders'? 19 : ''}}>
                        Orders
                    </p>
                </div>

                <div className="dash-option-select" onClick={()=> setDashboard('evtols')}
                    style={{animationName:dashboard==='evtols'? 'select':''}}>
                    <p style={{color: dashboard==='evtols'? '#5A67D8':'', fontWeight: dashboard === 'evtols'? "bold" : '', fontSize:dashboard === 'evtols'? 19 : ''}}>
                        Evtols
                    </p>
                </div>

                <div className="dash-option-select" onClick={()=> setDashboard('history')}
                    style={{animationName: dashboard==='history'? 'select':''}}>
                    <FaHistory id="dash-option-icon"
                        style={{color: dashboard === 'history'? '#5A67D8':''}}
                    />
                    <p style={{color: dashboard==='history'? '#5A67D8':'', fontWeight: dashboard === 'history'? "bold" : '', fontSize:dashboard === 'history'? 20 : ''}}>
                        History
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
                    dashboard === 'evtols' &&
                    <EvtolsPage />
                }
                {
                    dashboard === 'history' &&
                    <History />
                }
            </div>
            </div>
        </div>
    </>
  )
}

export default AdminDashboard