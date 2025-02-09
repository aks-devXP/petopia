import React, { useEffect, useState } from "react";
import { RiCloseLine, RiMenu3Fill } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/petopia-logo.svg";
import { handleError } from "../Util/Alerts";
import "./Navbar.css";

const Navbar = () => {
  const [loggedin, setLoggedin] = useState("");
  const [toggle, setToggle] = useState(false);
  let userName = ""; 
  const Navigate =  useNavigate();

  const handleSignInLogIn = (e) => {
    setLoggedin(true);
    if(e.target.innerText === "Sign Up"){
      Navigate("/sign-up");
    }
    else{
      Navigate("/login");
    }
  };
  useEffect(() => {
    if(localStorage.getItem("token")){
      setLoggedin(localStorage.getItem("user_name")||"");
      // userName = JSON.parse(localStorage.getItem("user_name"));
      console.log(loggedin);
    }
  }, []);
  // console.log(loggedin);
  const handleLogout = () => {
    setLoggedin("");
    
  };

  const menuOff = () => {
    setToggle(false);
    console.log("menu off");
  };

  const Submenu = () => {
    return (
      <ul>
        <li>
          <NavLink to="/news">News</NavLink>
        </li>
        <li>
          <NavLink to="/ngo">NGO</NavLink>
        </li>
        <li>
          <NavLink to="/about">About Us</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
      </ul>
    );
  };

  const Menu = () => {
    return (
      <ul>
        <li>
          <NavLink to="/home">Home</NavLink>
        </li>
        <li>
          <NavLink to="/guide">Guide</NavLink>
        </li>
        <li>
          <NavLink to="/vet">Medical Care</NavLink>
        </li>
        <li>
          <NavLink to="/shopping">Pet Essentials</NavLink>
        </li>
        <li>
          <NavLink to="/trainers">Trainer</NavLink>
        </li>
        <li className="submenu">
          <NavLink to="#">More</NavLink>
          <Submenu />
        </li>
      </ul>
    );
  };

  const ProfileButton = ()=>{
    try{
      Navigate("/dashboard");
    }

    catch(e){
      handleError(e);
    }
  }

  return (
    <div className="navbar">
      <div className="navbar-links">
        <div className="navbar-links_logo">
          <NavLink to="/home">
            <img src={logo} alt="Petopia Logo" />
          </NavLink>
        </div>
        <div className="navbar-links_container">
          <Menu />
        </div>
      </div>

      <div className="navbar-sign">
        {localStorage.getItem("token") ? (
          <button className="user-button" type="user-button" onClick={ProfileButton}>
            Hi, {loggedin.replace(/['"]+/g, "")}
          </button>
        ) : (
          <>
            <button className="sign-in-button" type="sign-in-button" onClick={e=> handleSignInLogIn(e)}>
              Sign Up
            </button>
            <button className="log-in-button" type="log-in-button" onClick={e=>handleSignInLogIn(e)}>
              Log in
            </button>
          </>
        )}
      </div>

      <div className="navbar-menu" onBlur={menuOff}>
        {toggle ? (
          <RiCloseLine color="#fff" onClick={() => setToggle(false)} />
        ) : (
          <RiMenu3Fill color="#fff" onClick={() => setToggle(true)} />
        )}
        {toggle && (
          <div className="navbar-menu_container scale-up-center">
            <div className="navbar-menu_container-links">
              <Menu />
              <div className="navbar-menu_container-links-sign">
                <button type="button">Sign up</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;