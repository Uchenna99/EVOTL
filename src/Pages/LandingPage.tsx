import { Link } from "react-router-dom"
import Navbar from "../Components/Navbar"
import { useEffect, useState } from "react"
import { JwtCode } from "../State"
import { jwtDecode } from "jwt-decode"
import underline from "../assets/Images/Underline.png"
import { BriefcaseMedical } from "lucide-react"
import photo from "../assets/Images/Pelican-2.0-Home.png"
import { useInView } from "react-intersection-observer"



const LandingPage = () => {
  const { ref: cardRef1, inView: cardView1 } = useInView({threshold: 0.6});
  const { ref: cardRef2, inView: cardView2 } = useInView({threshold: 0.6});
  const { ref: cardRef3, inView: cardView3 } = useInView({threshold: 0.6});
  const { ref: cardRef4, inView: cardView4 } = useInView({threshold: 0.6});
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

              <div className={`home-info-card ${cardView1? 'inView':''}`} ref={cardRef1} >
                <div className="info-card-img">
                  <BriefcaseMedical
                    color="#5A67D8"
                    size={40}
                    strokeWidth={1.5}
                  />
                </div>
                <h4>Medical delivery</h4>
                <p>Bypass traffic and challenging terrain to deliver medications rapidly.</p>
              </div>

              <div className={`home-info-card ${cardView2? 'inView':''}`} ref={cardRef2}>
                <div className="info-card-img">
                  <BriefcaseMedical
                    color="#5A67D8"
                    size={40}
                    strokeWidth={1.5}
                  />
                </div>
                <h4>Medical delivery</h4>
                <p>Bypass traffic and challenging terrain to deliver medications rapidly.</p>
              </div>

              <div className={`home-info-card ${cardView3? 'inView':''}`} ref={cardRef3}>
                <div className="info-card-img">
                  <BriefcaseMedical
                    color="#5A67D8"
                    size={40}
                    strokeWidth={1.5}
                  />
                </div>
                <h4>Medical delivery</h4>
                <p>Bypass traffic and challenging terrain to deliver medications rapidly.</p>
              </div>

              <div className={`home-info-card ${cardView4? 'inView':''}`} ref={cardRef4}>
                <div className="info-card-img">
                  <BriefcaseMedical
                    color="#5A67D8"
                    size={40}
                    strokeWidth={1.5}
                  />
                </div>
                <h4>Medical delivery</h4>
                <p>Bypass traffic and challenging terrain to deliver medications rapidly.</p>
              </div>

            </div>

            <div className="about-us">
              <div className="about-us-header">
                <h1>MORE ABOUT US</h1>
              </div>
              <div className="about-us-cards-div">
                <div className="about-us-cards-wrap">

                  <div className="about-card">
                    <div className="about-img" style={{backgroundImage:`url(${photo})`}}>
                    </div>
                    <div className="about-text">
                      <p>Preventing avoidable deaths through faster emergency drugs delivery</p>
                    </div>
                  </div>

                  <div className="about-card">
                    <div className="about-img" style={{backgroundImage:`url(${photo})`}}>
                    </div>
                    <div className="about-text">
                      <p>Preventing avoidable deaths through faster emergency drugs delivery</p>
                    </div>
                  </div>

                  <div className="about-card">
                    <div className="about-img" style={{backgroundImage:`url(${photo})`}}>
                    </div>
                    <div className="about-text">
                      <p>Preventing avoidable deaths through faster emergency drugs delivery</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className="footer"></div>
          </div>
        </div>
    </>
  )
}

export default LandingPage