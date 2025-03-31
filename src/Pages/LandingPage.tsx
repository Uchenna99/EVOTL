import { Link } from "react-router-dom"
import Navbar from "../Components/Navbar"
import { useEffect, useState } from "react"
import useGlobalState, { JwtCode } from "../State"
import { jwtDecode } from "jwt-decode"


const LandingPage = () => {
  const {  } = useGlobalState();
  const [user, setUser] = useState<JwtCode | null>(null);

  useEffect(()=>{
    const loginCheck = ()=>{
      const isLoggedIn = localStorage.getItem('evtolLogin');
      const token = localStorage.getItem('token');
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
              <h2>MEDICAL SUPPLIES, <br/> DRONE DELIVERED ON TIME.</h2>

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