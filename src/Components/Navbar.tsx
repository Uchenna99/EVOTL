import { Link, useNavigate } from "react-router-dom"
import useGlobalState, { JwtCode } from "../State"

interface NavProps {
  user: JwtCode | null;
}

const Navbar = ({user}: NavProps) => {
  const {  } = useGlobalState();
  const navigate = useNavigate();
  

  const handleLogout = ()=>{
    localStorage.removeItem('token');
    localStorage.setItem('isLoggedIn', 'false');
    navigate('/login');
  };


  return (
    <>
        <div className="navbar-container">
          <div className="laptop-navbar">
            <div className="nav-left">
                <h2>EVTOL</h2>
            </div>

            <div className="nav-mid"></div>

            <div className="nav-right">
              {
                user?
                <div className="nav_user-info">
                  <h4>Hi, {user.name}</h4>
                  <button id="get-started" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
                :
                <div className="nav_user-info">
                  <Link id="nav-login" to={'/login'}>
                    Login
                  </Link>
                  <Link id="get-started" to={'/signup'}>
                    <p>Get Started</p>
                  </Link>
                </div>
              }
            </div>
          </div>
        </div>
    </>
  )
}

export default Navbar