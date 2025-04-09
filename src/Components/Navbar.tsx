import { useNavigate } from "react-router-dom"
import useGlobalState, { JwtCode } from "../State"
import { Menu } from "lucide-react"
import logo from "../assets/Images/drone_logo.png"

interface NavProps {
  user: JwtCode | null;
  dropdownShow: ()=>void;
  dropdownHide: ()=>void;
  dropdownStatus: boolean;
}

const Navbar = ({user, dropdownStatus, dropdownShow, dropdownHide}: NavProps) => {
  const { setLoggedIn } = useGlobalState();
  const navigate = useNavigate();

  const handleLogout = ()=>{
    localStorage.removeItem('evtolToken');
    localStorage.removeItem('evtolOrder');
    localStorage.setItem('evtolLogin', 'false');
    localStorage.removeItem('evtolUser');
    localStorage.removeItem('evtolGetUser');
    setLoggedIn(false);
    navigate('/login');
  };


  return (
    <>
        <div className="navbar-container" onClick={dropdownHide}>
          <div className="laptop-navbar">
            <div className="nav-left">
              <img id="drone-png" src={logo} alt="" />
              <h2>EVTOL</h2>
            </div>

            {/* <div className="nav-mid"></div> */}

            <div className="nav-right">
              <Menu
                cursor={'Pointer'}
                size={35}
                strokeWidth={2.5}
                onClick={dropdownShow}
              />

              <div className={`menu-dropdown ${dropdownStatus? 'open':''}`}>
                {
                  !user &&
                  <div className="menu-dropdown-option">
                    <p>Sign Up / Sign In</p>
                  </div>
                }
                <div className="menu-dropdown-option">
                  <p>Medicines</p>
                </div>
                <div className="menu-dropdown-option">
                  <p>Contact Us</p>
                </div>
                {
                  user &&
                  <div className="menu-dropdown-option" onClick={handleLogout}>
                    <p style={{color:'#F56565'}}>Logout</p>
                  </div>
                }
              </div>


              {/* {
                user?
                <div className="nav_user-info">
                  <h4>
                    Hi, 
                    <Link id="name-link" to={'/dashboard'}> {user.name}</Link>
                  </h4>
                  <button id="add-to-cart" onClick={handleLogout}>
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
              } */}
            </div>
          </div>
        </div>
    </>
  )
}

export default Navbar