import React from 'react';
import { MdEmail } from 'react-icons/md';
import { RiEyeCloseFill, RiLock2Line, RiUserLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import signup_img from '../assets/signup-bg.jpg';

export const Signup = () => {
  const Navigate = useNavigate();
  const Navigateto = async(e) => {
    e.preventDefault();
    Navigate("/");
  }
  return (
  <div className= "login">
    <img src={signup_img}alt="kitchen bg image" className = "login__img"/>
    <form action="" className="login__form" onSubmit={Navigateto}>
      <h1 className="login__title">Signup</h1>
      <div className="login__content">
      <div className="login__box">
          <RiUserLine className="login__icon"/>
          <div className="login__box-input">
            <input type="text" required  className="login__input" placeholder=""/>
            <label  className="login__label">
              UserName
            </label>
          </div>
        </div>
        {/* <!-- ######Email######## --> */}
        <div className="login__box">
          <MdEmail className="login__icon"/>
          <div className="login__box-input">
            <input type="email" required  className="login__input" placeholder=""/>
            <label  className="login__label">
              Email
            </label>
          </div>
        </div>
        {/* <!-- ######Password######## --> */}
        {/* <!-- <div className="login__box">
          <i className="ri-lock-2-line login__icon"></i>
          <div className="login__box-input">
            <input type="password" required  className="login__input" id="login-pass" placeholder="">
            <i className="ri-eye-close-fill login__eye" id="login-eye"></i>
            <label for="" className="login__label">
              Password
            </label>
          </div>
          
        </div> --> */}
        <div className="login__box">
          <RiLock2Line className=" login__icon"/>
          <div className="login__box-input">
            <RiEyeCloseFill className="login__eye" id="login-eye"/>
            <input type="password" required  className="login__input" placeholder=""/>
            <label  className="login__label">
              Password
            </label>
          </div>
        </div>
        {/* <!-- ######Checkbox######## --> */}
        <div className="login__check">
          <div className="login__check-group">
            <input type="checkbox" className="login__check-input"/>
            <label  className="login__check-label">
              Remember me
            </label>
          </div>
          {/* <a href="#" className="login__forget">Forgot password?</a> */}

        </div>
        
      </div>
      {/* <!--End of Login Content-->
        <!-- ######Button######## --> */}
        <button className="login__button" >SignUp</button>
      <p className="login__register">
        Try Login? <a href="/login" className="login__link">LogIn</a>
      </p>
    </form>
  </div>  
  );
}

export default Signup
