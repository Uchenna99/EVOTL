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


  return (
    <>
        <Navbar user={user} dropdownStatus={()=>{if(dropdown){setDropdown(false)}}} />

        <div className="page-wrap" onClick={()=> {if(dropdown){setDropdown(false)}}}>
          <div className="hero-section">
            <div className="hero-image"></div>
          </div>

          <div className="transparent-cover"></div>

          <div className="page-wrap2">
            <div className="info-section">
              <h1>MEDICAL SUPPLIES, <br/> DRONE DELIVERED <span id="underlined-text">ON TIME <img id="underline-img" src={underline} /> </span>.</h1>

              <Link id="get-started" to={'/signup'}>
                <p>GET STARTED</p>
              </Link>
            </div>

            <div className="supplies"></div>
          </div>
        </div>
    </>
  )
}

export default LandingPage