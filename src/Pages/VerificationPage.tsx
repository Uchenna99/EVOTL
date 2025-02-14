import { useEffect, useState } from "react";
import "../Stylesheets/SignupPage.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerificationPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');


    useEffect(()=>{
        const getEmail = ()=>{
            const user = localStorage.getItem('userEmail');
            if(user){
                setEmail(user);
            }
        }

        getEmail();
    },[])


    const verify = {
        email: email,
        otp: otp
    }

    const handleVerify = async ()=>{        
        try {
            await axios.post('http://localhost:4000/api/v1/auth/verify-email', verify)
            .then(()=>{
                navigate('/login')
            })
            .catch(err=>alert(err))
            
        } catch (error) {
            console.error('Verification failed');
        }
    }

  return (
    <>
        <div className="verify-page">
            <div className="verify-box">
                <h3>Verify your Email</h3>

                <p>An otp has been sent to your email</p>

                <div className="input-wrap" style={{width:'150px', alignItems:'center'}}>
                    <label htmlFor="otp">OTP</label>
                    <input id="otp" type="text" value={otp} style={{width:'150px'}}
                        onChange={((e)=>setOtp(e.target.value))}
                    />
                </div>

                <button className="register" onClick={handleVerify}>Verify</button>

                <p style={{fontSize:'13px', color:'red', marginTop:'20px'}}>
                    otp will expire after 10 minutes
                </p>
            </div>
        </div>
    </>
  )
}

export default VerificationPage;