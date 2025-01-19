import React, { useEffect, useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { RiEyeCloseFill, RiEyeFill, RiLock2Line, RiUserLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import signup_img from '../assets/signup-bg.jpg';
import Loader from '../Components/Loader/Loader';

import { useLoading } from './LodingPage';
import './Login.css';

export const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [pass, setPass] = useState(true);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate a delay for signup process
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => navigate("/"), 2000); // Navigate after showing success
    }, 4000);
  };

  // Loader simulation from the context
  const { isLoading, setIsLoading } = useLoading();
  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [setIsLoading]);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="login">
          <img src={signup_img} alt="kitchen bg image" className="login__img" />
          <form action="" className="login__form" onSubmit={handleSignup}>
            <h1 className="login__title">Signup</h1>
            <div className="login__content">
              <div className="login__box">
                <RiUserLine className="login__icon" />
                <div className="login__box-input">
                  <input type="text" required className="login__input" placeholder="" />
                  <label className="login__label">UserName</label>
                </div>
              </div>
              <div className="login__box">
                <MdEmail className="login__icon" />
                <div className="login__box-input">
                  <input type="email" required className="login__input" placeholder="" />
                  <label className="login__label">Email</label>
                </div>
              </div>
              <div className="login__box">
                <RiLock2Line className="login__icon" />
                <div className="login__box-input">
                 {
                  pass?
                  <RiEyeCloseFill className="login__eye" onClick={()=>setPass(!pass)}/>
                  :
                  <RiEyeFill className="login__eye" onClick={()=>setPass(!pass)}/>
                               }
                  <input type={pass?"password":"text"} required className="login__input" placeholder="" />
                  <label className="login__label">Password</label>
                </div>
              </div>
              <div className="login__check">
                <div className="login__check-group">
                  <input type="checkbox" className="login__check-input" />
                  <label className="login__check-label">Remember me</label>
                </div>
              </div>
            </div>
            <button
              className={`login__button ${loading ? 'loading' : ''} ${success ? 'success' : ''}`}
              id="btn-submit"
              disabled={loading}
            >
              <span className="button--text">{success ? 'Signup Successful' : 'Sign Up'}</span>
              <div className="button--loader">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </button>
            <p className="login__register">
              Try Login? <a href="/login" className="login__link">Log In</a>
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default Signup;
