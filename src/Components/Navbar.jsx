import React, { useState } from "react";
import { RiCloseLine, RiMenu3Fill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import logo from "../assets/petopia-logo.png";
import "./Navbar.css";

const Navbar = () => {
  const [loggedin, setLoggedin] = useState(false);
  const [toggle, setToggle] = useState(false);
  const userName = "UserName"; // Replace with a dynamic value if needed

  const handleSignInLogIn = () => {
    setLoggedin(true);
  };

  const handleLogout = () => {
    setLoggedin(false);
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
        {loggedin ? (
          <button className="user-button" type="user-button" onClick={handleLogout}>
            Hi, {userName}
          </button>
        ) : (
          <>
            <button className="sign-in-button" type="sign-in-button" onClick={handleSignInLogIn}>
              Sign in
            </button>
            <button className="log-in-button" type="log-in-button" onClick={handleSignInLogIn}>
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
