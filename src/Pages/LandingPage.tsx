import { Link } from "react-router-dom"
import Navbar from "../Components/Navbar"
import { useEffect, useState } from "react"
import { JwtCode } from "../State"
import { jwtDecode } from "jwt-decode"
import underline from "../assets/Images/Underline.png"


const LandingPage = () => {
  const [user, setUser] = useState<JwtCode | null>(null);

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
        <Navbar user={user} />

        <div className="page-wrap">
          <div className="hero-section">
            <div className="hero-image"></div>
          </div>

          <div className="transparent-cover"></div>

          <div className="page-wrap2">
            <div className="info-section">
              <h1>MEDICAL SUPPLIES, <br/> DRONE DELIVERED <span id="underlined-text">ON TIME <img id="underline-img" src={underline} /> </span>.</h1>

              <Link id="get-started" to={'/signup'} style={{fontSize:'20px'}}>
                <p>Get Started</p>
              </Link>
            </div>

            <div className="supplies"></div>
          </div>
        </div>
    </>
  )
}

export default LandingPage