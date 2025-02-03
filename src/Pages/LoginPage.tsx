import { useState } from "react";
import drone from "../assets/Images/Pelican-2.0-Home.png"
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import { JwtResponse } from "../Components/interface";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [eye, setEye] = useState(false);

    const loginData = {
        email: email,
        password: password
    }

    const handleLogin = async ()=>{
        try {
            await axios.post('http://localhost:4000/api/v1/auth/login', loginData)
            .then((response)=>{
                const responseData = response.data as JwtResponse;
                localStorage.setItem('token', responseData.accessToken);
                navigate('/dashboard');
            })
        } catch (error) {
            
        }
    }

  return (
    <>
        <div className="signup-wrap">
        <div className="signup-left">
          <h2>Welcome back! </h2>
          <img src={drone} alt="" />
          <h2>Login and <br/> get started</h2>
        </div>


        <div className="signup-right">
          <div className="form-wrap">

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

            <button className="register" onClick={handleLogin}>Register</button>

          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage;