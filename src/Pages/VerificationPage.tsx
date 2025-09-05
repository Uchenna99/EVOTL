import { useEffect, useState } from "react";
import "../Stylesheets/SignupPage.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ThreeDots } from "react-loader-spinner";
import { HOST_URL } from "../Route";

const VerificationPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [verifying, setVerifying] = useState(false);


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
        const email = localStorage.getItem('userEmail');
        if(email) {
            setVerifying(true);
    
            await axios.post(`${HOST_URL}/api/v1/auth/verify-email`, verify)
            .then(()=>{
                localStorage.removeItem('evtolUserEmail')
                navigate('/login');
                toast.success('Verification successful', {position:'top-right'});
            })
            .catch((error)=>{
                console.log(error);
                toast.error('Verification failed', {position:'top-right'});
                setVerifying(false);
            })
            .finally(()=> setVerifying(false));
        }else {
            toast.error('User not found', {position:'top-right'});
        }
    }

  return (
    <>
        <div className="verify-page">
            <div className="verify-box">
                <h3>Verify your Email</h3>

                <p>An otp has been sent to your email</p>

                <div className="input-wrap" style={{width:'150px', alignItems:'center'}}>
                    <label htmlFor="otp" style={{fontSize:13}}>OTP</label>
                    <input id="otp" type="text" value={otp} maxLength={6} style={{width:'150px', textAlign:'center'}}
                        onChange={((e)=>setOtp(e.target.value))}
                    />
                </div>

                {
                    verifying?
                    <div className="loader-button" style={{width:100}}>
                        <ThreeDots
                            color="white"
                            width={30}
                            height={30}
                        />
                    </div>
                    :
                    <button className="register" onClick={handleVerify} 
                        style={{}}>
                        Verify
                    </button>
                }

                <p style={{fontSize:'13px', color:'#F56565', marginTop:'20px'}}>
                    otp will expire after 10 minutes
                </p>
            </div>
        </div>
    </>
  )
}

export default VerificationPage;