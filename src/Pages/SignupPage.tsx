import { useState } from "react";
import "../Stylesheets/SignupPage.css"
import drone from "../assets/Images/Pelican-2.0-Home.png"
import { GoChevronDown } from "react-icons/go";
import { GoChevronUp } from "react-icons/go";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { EvtolUser } from "../Components/interface";



const SignupPage = () => {
  const navigate = useNavigate();

  const [eye, setEye] = useState(false);
  const [regionSelect, setRegionSelect] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const [region, setRegion] = useState('Select a region');
  const selectRegion = ['Rumuola','Rumuigbo','Rumuokwuta','Rumuokoro','Rumudara','Rumubiakani','Rumuodumaya','Rumuogba'];

  const submitData = {
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phone,
    age: age,
    region: region,
    email: email,
    password: password
  }


  const handleRegister = async ()=>{
    try {
      await axios.post('http://localhost:4000/api/v1/users/create-user', submitData)
      .then((response)=>{
        const responseData = response.data as EvtolUser;
        localStorage.setItem('user', responseData.email);
        navigate('/email-verification');
      })
      .catch(err=> console.log(err))
      
    } catch (error) {
      console.log('Failed to register new user');
      alert(error);
    }
  }

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
              <input id="fname" type="text" value={firstName} onChange={(e)=> setFirstName(e.target.value)}/>
            </div>

            <div className="input-wrap">
              <label htmlFor="lname">Surname</label>
              <input id="lname" type="text" value={lastName} onChange={(e)=> setLastName(e.target.value)}/>
            </div>

            <div className="input-wrap2">
              <div className="input-wrap" style={{width:'fit-content'}}>
                <label htmlFor="age">Age</label>
                <input id="age" type="text" style={{width:'100px'}}
                  value={age} onChange={(e)=> setAge(e.target.value)} 
                />
              </div>

              <div className="input-wrap" style={{width:'fit-content'}}>
                <label htmlFor="phone">Phone</label>
                <input id="phone" type="text" style={{width:'200px'}}
                  value={phone} onChange={(e)=> setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="input-wrap">
              <label htmlFor="reg">Region</label>
              <div className="inner-input-wrap">
                <input id="reg" type="text" value={region} readOnly
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
                      <div key={reg} className="region-unit" 
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
              <input id="email" type="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
            </div>


            <div className="input-wrap">
              <label htmlFor="pass">Password</label>
              <div className="inner-input-wrap">
                <input id="pass" type={eye? 'text' : 'password'} 
                  value={password} onChange={(e)=> setPassword(e.target.value)}
                />
                { 
                  eye? <FaRegEye id="pass-eye" onClick={()=> setEye(false)}/> 
                  : 
                  <FaRegEyeSlash id="pass-eye" onClick={()=> setEye(true)}/> 
                }
              </div>
            </div>

            <button className="register" onClick={handleRegister}>Register</button>

            <p>Already have an account? <Link id="form-login" to={'/login'}>Login</Link></p>

          </div>
        </div>
      </div>
    </>
  )
}

export default SignupPage