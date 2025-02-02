import { useState } from "react";
import "../Stylesheets/SignupPage.css"
import drone from "../assets/Images/Pelican-2.0-Home.png"
import { GoChevronDown } from "react-icons/go";
import { GoChevronUp } from "react-icons/go";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";


const SignupPage = () => {
  const [eye, setEye] = useState(false);
  const [regionSelect, setRegionSelect] = useState(false);

  const [region, setRegion] = useState('Select a region');

  const selectRegion = ['Rumuola','Rumuigbo','Rumuokwuta','Rumuokoro','Rumudara','Rumubiakani','Rumuodumaya','Rumuogba']

  return (
    <>
      <div className="signup-wrap">
        <div className="signup-left">
          <h2>Your first drone delivery awaits</h2>
          <img src={drone} alt="" />
          <h2>Register and <br/> get started</h2>
        </div>


        <div className="signup-right">
          <div className="form-wrap">
            <div className="input-wrap">
              <label htmlFor="fname">First name</label>
              <input id="fname" type="text" />
            </div>

            <div className="input-wrap">
              <label htmlFor="lname">Last name</label>
              <input id="lname" type="text" />
            </div>

            <div className="input-wrap2">
              <div className="input-wrap" style={{width:'fit-content'}}>
                <label htmlFor="age">Age</label>
                <input id="age" type="number" style={{width:'100px'}} />
              </div>

              <div className="input-wrap" style={{width:'fit-content'}}>
                <label htmlFor="phone">Phone</label>
                <input id="phone" type="text" style={{width:'200px'}} />
              </div>
            </div>

            <div className="input-wrap">
              <label htmlFor="reg">Region</label>
              <div className="inner-input-wrap">
                <input id="reg" type="text" value={region}
                  style={{color:region === 'Select a region'? 'gray':'black'}}
                />

                {
                  regionSelect? <GoChevronUp id="pass-eye" onClick={()=> setRegionSelect(false)}/>
                  :
                  <GoChevronDown id="pass-eye" onClick={()=> setRegionSelect(true)}/>
                }

                <div className="region-dropdown" style={{display: regionSelect? 'flex':'none'}}>
                  {
                    selectRegion.map((reg)=>(
                      <div className="region-unit" 
                        onClick={()=>{
                          setRegionSelect(false);
                          setRegion(reg);
                        }}>
                        <p> {reg} </p>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>

            <div className="input-wrap">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" />
            </div>


            <div className="input-wrap">
              <label htmlFor="pass">Password</label>
              <div className="inner-input-wrap">
                <input id="pass" type={eye? 'text' : 'password'} />
                { 
                  eye? <FaRegEye id="pass-eye" onClick={()=> setEye(false)}/> 
                  : 
                  <FaRegEyeSlash id="pass-eye" onClick={()=> setEye(true)}/> 
                }
              </div>
            </div>

            <button className="register">Register</button>

          </div>
        </div>
      </div>
    </>
  )
}

export default SignupPage