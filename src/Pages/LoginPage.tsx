import { useEffect, useState } from "react";
import drone from "../assets/Images/Pelican-2.0-Home.png"
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import { JwtResponse } from "../Components/interface";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useGlobalState, { JwtCode } from "../State";
import { toast } from "sonner";
import { ThreeDots } from "react-loader-spinner";


const LoginPage = () => {
  const {setJwtDecoded, setLoggedIn} = useGlobalState();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [eye, setEye] = useState(false);

    const loginData = {
      email: email,
      password: password
    }

    useEffect(()=>{
      const loginCheck = ()=>{
        const isLoggedIn = localStorage.getItem('evtolLogin');
        const token = localStorage.getItem('evtolToken');
        if(isLoggedIn === 'true' && token){
          navigate('/');
        }
      }
      loginCheck();
    },[])

    const handleLogin = async ()=>{
      if(!email || !password){
        toast.warning('Email and password are required', {position:'top-right'});
      }else if(password.length < 8){
        toast.warning('Password length must be at least 8 characters long', {position:'top-right'});
      }
      else{
        setLoading(true);
        try {
            await axios.post('http://localhost:4000/api/v1/auth/login', loginData)
            .then((response)=>{
              const responseData = response.data as JwtResponse;
              localStorage.setItem('evtolToken', responseData.accessToken);
              localStorage.setItem('evtolLogin', 'true');
              const decode = jwtDecode(responseData.accessToken);
              localStorage.setItem('evtolUser', JSON.stringify(decode));
              setJwtDecoded(decode as JwtCode);
              setLoggedIn(true);
              navigate('/dashboard');
            })
        } catch (error: any) {
          toast.error(error.message, {position:'top-right'});
          setLoading(false);
        }
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
                  value={password} onChange={(e)=> setPassword(e.target.value)} minLength={8}
                />
                { 
                  eye? <FaRegEye id="pass-eye" onClick={()=> setEye(false)}/> 
                  : 
                  <FaRegEyeSlash id="pass-eye" onClick={()=> setEye(true)}/> 
                }
              </div>
            </div>

            {
              loading?
              <div className="loader-button" style={{width:98}}>
                <ThreeDots
                  color="white"
                  width={30}
                  height={30}
                />
              </div>
              :
              <button className="register" 
                onClick={handleLogin}>
                Login
              </button>
            }

            <p>Don't have an account? <Link id="form-login" to={'/signup'}>Sign Up</Link></p>

          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage;