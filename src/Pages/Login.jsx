import React, { useEffect, useState } from 'react';
import { RiEyeCloseFill, RiEyeFill, RiLock2Line, RiUserLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import loginimg from '../assets/login-bg2.jpg';
import Loader from '../Components/Loader/Loader';
import { useLoading } from './LodingPage';
import './Login.css';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [pass, setPass] = useState(true);
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate a delay for demonstration
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => navigate("/"), 2000); // Navigate after showing success
    }, 4000);
  };

  // loading effect
  const { isLoading, setIsLoading }  = useLoading();
  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [setIsLoading]);

  return (
    <>{
      isLoading && <Loader />
    }
    {!isLoading && ( <div className="login">
      <img src={loginimg} alt="kitchen bg" className="login__img" />
      <form action="" className="login__form" onSubmit={handleLogin}>
        <h1 className="login__title">Login</h1>
        <div className="login__content">
          <div className="login__box">
            <RiUserLine className="login__icon" />
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
            <a href="#" className="login__forget">Forgot password?</a>
          </div>
        </div>
        <button
          className={`login__button ${loading ? 'loading' : ''} ${success ? 'success' : ''}`}
          id="btn-submit"
          disabled={loading}
        >
          <span className="button--text">{success ? 'Login Successful' : 'Log In'}</span>
          <div className="button--loader">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </button>
        <p className="login__register">
          Don't have an account? <a href="/sign-up" className="login__link">Sign up</a>
        </p>
      </form>
    </div>)}
    </>
  );
};

export default Login;
