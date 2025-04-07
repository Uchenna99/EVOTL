import { Link, useNavigate } from "react-router-dom"
import useGlobalState, { JwtCode } from "../State"
import { Menu } from "lucide-react"
import { useState } from "react";

interface NavProps {
  user: JwtCode | null;
}

const Navbar = ({user}: NavProps) => {
  const { setLoggedIn } = useGlobalState();
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);
  
  // const handleDropdown = ()=>{
  //   if(dropdown === 'show') {
  //     setDropdown('hide');
  //   }else{
  //     setDropdown('show');
  //   }
  // };

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
        <div className="navbar-container">
          <div className="laptop-navbar">
            <div className="nav-left">
                <h2>EVTOL</h2>
            </div>

            {/* <div className="nav-mid"></div> */}

            <div className="nav-right">
              <Menu
                cursor={'Pointer'}
                size={35}
                strokeWidth={2.5}
                onClick={()=> setDropdown(!dropdown)}
              />

              <div className={`menu-dropdown ${dropdown? 'open':''}`}>
                <div className="menu-dropdown-option">
                  <p>Medicines</p>
                </div>
                <div className="menu-dropdown-option">
                  <p>Logout</p>
                </div>
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