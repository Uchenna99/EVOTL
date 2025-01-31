import "../Stylesheets/SignupPage.css"
import drone from "../assets/Images/Pelican-2.0-Home.png"
import { FaCircleChevronDown } from "react-icons/fa6";
import { FaCircleChevronUp } from "react-icons/fa6";


const SignupPage = () => {
  return (
    <>
      <div className="signup-wrap">
        <div className="signup-left">
          <img src={drone} alt="" />
          <h2>Register and <br/> get started</h2>
        </div>



        <div className="signup-right">
          <div className="form-wrap">
            <div className="input-wrap">
              <label htmlFor="">First name</label>
              <input type="text" />
            </div>

            <div className="input-wrap">
              <label htmlFor="">Last name</label>
              <input type="text" />
            </div>

            <div className="input-wrap2">
              <div className="input-wrap" style={{width:'fit-content'}}>
                <label htmlFor="">Age</label>
                <input type="number" style={{width:'100px'}} />
              </div>

              <div className="input-wrap" style={{width:'fit-content'}}>
                <label htmlFor="">phone</label>
                <input type="number" style={{width:'200px'}} />
              </div>
            </div>

            <div className="input-wrap">
              <label htmlFor="">Region</label>
              <input type="text" />
            </div>

            <div className="input-wrap">
              <label htmlFor="">Email</label>
              <input type="text" />
            </div>

            <div className="input-wrap">
              <label htmlFor="">Password</label>
              <input type="text" />
            </div>

            <button className="register">Register</button>

          </div>
        </div>
      </div>
    </>
  )
}

export default SignupPage