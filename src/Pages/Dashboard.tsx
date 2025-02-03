import { useState } from "react"
import "../Stylesheets/Dashboard.css"
import { useNavigate } from "react-router-dom";
import useGlobalState from "../State";

const Dashboard = () => {
  const { setLoggedIn } = useGlobalState();
  const navigate = useNavigate();
  const [delivery, setDelivery] = useState(false);
  const [history, setHistory] = useState(false);

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

              <div className="dash-right"></div>
            </div>
        </>
    </>
  )
}

export default Dashboard