import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <>
        <div className="navbar-container">
            <div className="laptop-navbar">
                <div className="nav-left">
                    <h2>EVTOL</h2>
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