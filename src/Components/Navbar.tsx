import { Link } from "react-router-dom"
import logo from "../assets/Images/evotl_logo_small.jpg"

const Navbar = () => {
  return (
    <>
        <div className="navbar-container">
            <div className="laptop-navbar">
                <div className="nav-left">
                    <img src={logo} alt="" />
                </div>

                <div className="nav-mid"></div>

                <div className="nav-right">
                  <Link id="get-started" to={'/signup'}>
                    <p>Get Started</p>
                  </Link>
                </div>
            </div>
        </div>
    </>
  )
}

export default Navbar