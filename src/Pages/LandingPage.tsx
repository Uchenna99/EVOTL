import { Link } from "react-router-dom"
import Navbar from "../Components/Navbar"
import { useEffect, useState } from "react"
import { JwtCode } from "../State"
import { jwtDecode } from "jwt-decode"
import underline from "../assets/Images/Underline.png"


const LandingPage = () => {
  const [user, setUser] = useState<JwtCode | null>(null);
  const [dropdown, setDropdown] = useState(false);


  useEffect(()=>{
    const loginCheck = ()=>{
      const isLoggedIn = localStorage.getItem('evtolLogin');
      const token = localStorage.getItem('evtolToken');
      if(isLoggedIn === 'true' && token){
        const decoded: JwtCode = jwtDecode(token);
        setUser(decoded);
      }
    }
    loginCheck();
  },[])

  const handleDropdownShow = ()=>{
    setDropdown(true);
  };

  const handleDropdownHide = ()=>{
    if(dropdown){ setDropdown(false); }
  };


  return (
    <>
        <Navbar user={user} dropdownShow={handleDropdownShow} dropdownHide={handleDropdownHide} dropdownStatus={dropdown} />

        <div className="page-wrap" onClick={handleDropdownHide}>
          <div className="hero-section">
            <div className="hero-image"></div>
          </div>

          <div className="transparent-cover"></div>

          <div className="page-wrap2">
            <div className="info-section">
              <h1>MEDICAL SUPPLIES, <br/> DRONE DELIVERED <span id="underlined-text">ON TIME <img id="underline-img" src={underline} /> </span>.</h1>

              <Link id="get-started" to={user? '':'/signup'}>
                <p>GET STARTED</p>
              </Link>
            </div>

            <div className="info-card-grid">
              <div className="home-info-card">
                <div className="info-card-img"></div>
                <h4>Medical delivery</h4>
                <p>Bypass traffic and challenging terrain to deliver medications rapidly.</p>
              </div>
            </div>

            <div className="supplies"></div>
          </div>
        </div>
    </>
  )
}

export default LandingPage