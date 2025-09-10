import FacebookLogin from '@greatsumini/react-facebook-login';
import { useGoogleLogin } from "@react-oauth/google";
import React, { useEffect, useState } from "react";
import {
  RiEyeCloseFill,
  RiEyeFill,
  RiLock2Line,
  RiUserLine,
} from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { FacebookLoginAPI, GoogleLoginAPI, LoginAPI } from "../API/GeneralAPI";
import loginimg from "../assets/login-bg2.jpg";
import Loader from "../Components/Loader/Loader";
import { handleError, handleInfo, handleSuccess } from "../Util/Alerts";
import "./Login.css";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [pageLoader,setPageLoader] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedRole, setSelectedRole] = useState('user');
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [pass, setPass] = useState(true);
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!user.email) {
      handleError("Please enter email");
      return;
    }
    if (!user.password) {
      handleError("Please enter password");
      return;
    }
    setLoading(true); //disabling of the login button is being handled by loading state

    
    // Try verify the user
    try {
      if(selectedRole === 'user'){
      const response = await LoginAPI(user);
      const data = await response.json();
      console.log(data);
      if (data.success) {
        setLoading(false);
        setSuccess(true);
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", JSON.stringify(data.user_name));
        localStorage.setItem("userAuth", JSON.stringify("user"));
        setTimeout(() => navigate("/"), 2000); // Navigate after showing success
      } else {
        setLoading(false);
        setSuccess(false);
        handleError(data.message);
      }
    }
    // else {
    //   const response = await LoginGenAPI(user,selectedRole);
    //   const data = await response.json();
    //   console.log(data);
    //   if (data.success) {
    //     setLoading(false);
    //     setSuccess(true);
    //     localStorage.setItem("token", data.token);
    //     localStorage.setItem("username", JSON.stringify(data.user_name));
    //     localStorage.setItem("userAuth", JSON.stringify(selectedRole));
    //     setTimeout(() => navigate("/"), 2000); // Navigate after showing success
    //   } else {
    //     setLoading(false);
    //     setSuccess(false);
    //     handleError(data.message);
    //   }
    // }
    // else if(selectedRole === 'trainer'){

    // }
    } catch (err) {
      console.log(err);
      setLoading(false);
      setSuccess(false);
      handleError(err);
    } finally {
      setLoading(false);
    }
  };
  // Facebook login
  const responseFacebook = async(response) => {
    try {
      console.log('Facebook login response:', response);
      setLoading(true);
      const name = response.name;
      const email = response.email;
      const user = {
        email: email,
        name: name,
      };
      const res = await FacebookLoginAPI(user);
      const data = await res;
      console.log(data);
      if (data.success) {
        localStorage.setItem("username", JSON.stringify(data.user_name));
        localStorage.setItem("token", data.token);
        // localStorage.setItem("userAuth", JSON.stringify("user"));
        setSuccess(true);
        if (!data.pass_changed) {
          handleInfo(
            "Please change your password for security reasons. You can do this in the profile section."
          );
          setTimeout(() => navigate("/"), 3000);
        }
        else {
          setTimeout(() => navigate("/"), 1000); 
        }
        
        
      }
        // Redirect
    } 
    catch (error) {
      handleError(error);
    }
    finally {
      setLoading(false);
    }

  };
  // Google login
  const GoogleMechanism = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      console.log(credentialResponse);
      const userInfoResponse = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${credentialResponse.access_token}`,
          },
        }
      );
      setLoading(true);
      const userInfo = await userInfoResponse.json();
      console.log("Google User Info:", userInfo.name);
      const response = await GoogleLoginAPI({ email: userInfo.email, name: userInfo.name });
      const data = await response.json();
      console.log(data);
      // Save the user info to the database
      try {
        if (data.success) {
        localStorage.setItem("username", JSON.stringify(data.user_name));
        localStorage.setItem("token", data.token);
         // Redirect to the home page
        setSuccess(true);
        if (!data.pass_changed) {
          handleInfo(
            "Please change your password for security reasons. You can do this in the profile section."
          );
        }
        navigate("/");
        }
        else {
          handleError(data.message);
        }
      } catch (error) {
        handleError(error);
      }
     finally {
        setLoading(false);
      }
      
      // 
    },
    onError: () => {
      console.log("Login Failed");
    },
  });
  // handle input change
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    // console.log(user);
  };

  // loading effect
  useEffect(()=>{
    window.addEventListener('load',()=>{

    })
  },[])

  return (
    <>
      {pageLoader && <Loader/>}
      {!pageLoader && (
        <div className="login">
          <img src={loginimg} alt="kitchen bg" className="login__img" />
          <form action="" className="login__form">
            <h1 className="login__title">Login</h1>
            <div className="login__content">
              <div className="login__box">
                <RiUserLine className="login__icon" />
                <div className="login__box-input">
                  <input
                    type="email"
                    name="email"
                    onChange={(e) => handleChange(e)}
                    className="login__input"
                    placeholder=""
                  />
                  <label className="login__label">Email</label>
                </div>
              </div>
              <div className="login__box">
                <RiLock2Line className="login__icon" />
                <div className="login__box-input">
                  {pass ? (
                    <RiEyeCloseFill
                      className="login__eye"
                      onClick={() => setPass(!pass)}
                    />
                  ) : (
                    <RiEyeFill
                      className="login__eye"
                      onClick={() => setPass(!pass)}
                    />
                  )}

                  <input
                    type={pass ? "password" : "text"}
                    name="password"
                    onChange={(e) => handleChange(e)}
                    className="login__input"
                    placeholder=""
                  />
                  <label className="login__label">Password</label>
                </div>
              </div>
             {/* New Role Selection Section */}
             {/* <div className="login__role-selection">
                <p className="login__role-title">Select Your Role</p>
                <div className="login__role-options">
                  {['user', 'vet', 'trainer', 'groomer'].map((role) => (
                    <label 
                      key={role} 
                      className={`login__role-option ${selectedRole === role ? 'selected' : ''}`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={role}
                        checked={selectedRole === role}
                        onChange={() => setSelectedRole(role)}
                        className="login__role-radio"
                      />
                      <span className="login__role-label">
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div> */}

              <div className="login__check">
                <div className="login__check-group">
                  <input type="checkbox" className="login__check-input" />
                  <label className="login__check-label"> Remember me</label>
                </div>
                <a href="#" className="login__forget">
                  Forgot password?
                </a>
              </div>
            </div>
            <button
              className={`login__button ${loading ? "loading" : ""} ${
                success ? "success" : ""
              }`}
              onClick={(e) => handleLogin(e)}
              id="btn-submit"
              disabled={loading}
            >
              <span className="button--text">
                {success ? "Login Successful" : "Log In"}
              </span>
              <div className="button--loader">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </button>
            <p className="login__register">
              Don't have an account?{" "}
              <a href="/petopia/sign-up" className="login__link">
                Sign up
              </a>
            </p>
            <div className="login-options-container">
              <p>or Continue with</p>
              <div className="login-options">
                <button
                type='button'
                  onClick={(e) => {
                    e.preventDefault(); // Prevent page reload
                    GoogleMechanism();
                  }}
                >
                  <img src="/petopia/google-icon.png" alt="Google" width="20" />
                  Google
                </button>

                <FacebookLogin
                appId="2461290760871938" 
                autoLoad={false}
                fields="name,email,picture"
                onSuccess={(response)=>{

                  handleSuccess("Login Successful");

                }}
                onFail={(err)=>{
                  handleError(err)
                }
                }
                onProfileSuccess={(response) => {
                  responseFacebook(response)
                }}
                render={renderProps => (
                  <button
                  type="button"
                  onClick={(e)=>{
                    e.preventDefault();
                    renderProps.onClick();
                  }}
                  disabled= {renderProps.isDisabled}
                  >
                  <img src="/petopia/facebook-icon.png" alt="Facebook" width="20" />
                    Facebook
                  </button>
                )}
                />
                  {/* <button>
                    <img src="/facebook-icon.png" alt="Facebook" width="20" />
                    Facebook
                  </button> */}
                
              </div>
            </div>
          </form>

          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default Login;
