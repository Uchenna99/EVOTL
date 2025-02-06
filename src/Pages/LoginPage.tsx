import { useState } from "react";
import drone from "../assets/Images/Pelican-2.0-Home.png"
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import { JwtResponse } from "../Components/interface";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useGlobalState, { JwtCode } from "../State";


const LoginPage = () => {
  const {setJwtDecoded, setLoggedIn} = useGlobalState();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [eye, setEye] = useState(false);

    const loginData = {
        email: email,
        password: password
    }

    const handleLogin = async ()=>{
      if(!email || !password){
        alert('All input fields are required')
      }
      try {
          await axios.post('https://evtol-backend-mquf.onrender.com/api/v1/auth/login', loginData)
          .then((response)=>{
              const responseData = response.data as JwtResponse;
              localStorage.setItem('token', responseData.accessToken);
              localStorage.setItem('isLoggedIn', 'true');
              const decode = jwtDecode(responseData.accessToken);
              setJwtDecoded(decode as JwtCode)
              console.log(decode);
              setLoggedIn(true);
              navigate('/dashboard');
          })
      } catch (error) {
          console.log(error);
          alert(error);
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

            <button className="register" onClick={handleLogin}>Login</button>

            <p>Don't have an account? <Link id="form-login" to={'/signup'}>Sign Up</Link></p>

          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage;