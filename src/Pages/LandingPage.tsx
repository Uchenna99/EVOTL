import { Link } from "react-router-dom"
import Navbar from "../Components/Navbar"


const LandingPage = () => {

  return (
    <>
        <Navbar/>

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