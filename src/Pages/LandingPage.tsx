import { Link } from "react-router-dom"
import Navbar from "../Components/Navbar"
import { useEffect, useState } from "react"
import { JwtCode } from "../State"
import { jwtDecode } from "jwt-decode"
import underline from "../assets/Images/Underline.png"
import { BriefcaseMedical, Facebook, Instagram, Linkedin, Youtube } from "lucide-react"
import logistics from "../assets/Images/logistics.jpeg"
import treatment from "../assets/Images/various-medical-treatment-types.jpg"
import transport from "../assets/Images/What-are-Logistics-in-Healthcare.jpg"
import logo from "../assets/Images/drone_logo.png"
import { useInView } from "react-intersection-observer"
import { toast } from "sonner"



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

              <Link id="get-started" to={user? '/dashboard' :'/signup'}>
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
                <h4>Inter-hospital transport</h4>
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
                <h4>Smart logistics</h4>
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
                    <div className="about-img" style={{backgroundImage:`url(${treatment})`}}>
                    </div>
                    <div className="about-text">
                      <p>Preventing avoidable casualties through faster emergency drugs delivery</p>
                    </div>
                  </div>

                  <div className="about-card">
                    <div className="about-img" style={{backgroundImage:`url(${logistics})`}}>
                    </div>
                    <div className="about-text">
                      <p>We're on a mission to revolutionize medical logistics, speeding up critical drug deliveries to save more lives every day.</p>
                    </div>
                  </div>

                  <div className="about-card">
                    <div className="about-img" style={{backgroundImage:`url(${transport})`}}>
                    </div>
                    <div className="about-text">
                      <p>Our drone network ensures swift and safe transportation of emergency drugs, reducing response times dramatically.</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className="footer">
              <div className="footer-content">
                <div className="footer-content-left">
                  <div className="foot-icon-left">
                    <img src={logo} style={{width:70, marginLeft:-15}} alt="" />
                    <h2 style={{fontSize:16, color:'#EDF2F7'}}>EVTOL</h2>
                  </div>
                  <p>Aptech, Nigeria</p>
                </div>
                <div className="footer-content-right">
                  <Link to={''} className="footer-link">CONTACT US</Link>
                  <Link to={''} className="footer-link">MEDICINES</Link>
                  <Link to={''} className="footer-link">BLOG</Link>
                </div>
              </div>
              
              <div className="footer-line-div">
                <div className="footer-line"></div>
              </div>

              <div className="copyright">
                <p>Copyright © EVTOL INC. All rights reserved.</p>

                <div className="social-logos">

                  <div className="social-icon">
                    <Facebook
                      id="socials"
                      size={20}
                    />
                  </div>

                  <div className="social-icon">
                    <Instagram
                      id="socials-2"
                      size={20}
                    />
                  </div>

                  <div className="social-icon">
                    <Youtube
                      id="socials-2"
                      size={20}
                    />
                  </div>

                  <div className="social-icon">
                    <Linkedin
                      id="socials"
                      size={20}
                      fill="#EDF2F7"
                    />
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default LandingPage