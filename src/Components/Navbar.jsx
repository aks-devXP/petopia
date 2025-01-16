import React, { useState } from 'react';
import { RiCloseLine, RiMenu3Fill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import logo from '../assets/petopia-logo-color.png';
import './Navbar.css';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const menuOff = ()=>{
    setToggle(false);
    console.log("menu off");
  };
  const [loggedin, setLoggedin] = useState("Sign in");
  const Submenu = ()=>{
    return (
      <ul>
        <li>
          <Link to={"/"} >Veterinary</Link>
        </li>
        <li>
          <Link to={"/"} >NGO</Link>
        </li>
        <li>
          <Link to={"/"} >Products</Link>
        </li>
        <li>
          <Link to={"/"} >Training</Link>
        </li>
      </ul>
    )
  }
  const Menu = ()=>{
    return(
      
        <ul>
          <li>
            <Link to={"/home"} >Home</Link>
          </li>
          <li>
            <Link to={"/about"} >About</Link>
          </li>
          <li className='submenu'>
            <Link to={"#"} >Services</Link>
            <Submenu/>
          </li>
          <li>
            <Link to={"/contact"} >Contact</Link>
          </li>
          <li>
            <Link to={"/news"} >News</Link>
          </li>
          
        </ul>
      
    )
  }
  return (
    <div className="navbar">
      <div className="navbar-links">
        <div className="navbar-links_logo">
          <img src={logo} alt="" />
        </div>
        <div className="navbar-links_container">
          <Menu/>
        </div>
      </div>
      <div className="navbar-sign">
        <button type="button" onClick={()=>{
          if(loggedin === "Sign in"){
            setLoggedin("Sign out");
          }else{
            setLoggedin("Sign in");
          }
        }}>{loggedin}</button>
      </div>
      <div className="navbar-menu" onBlur= {menuOff}>
        {toggle?<RiCloseLine color="#fff" onClick={()=>setToggle(false)}/>:<RiMenu3Fill color="#fff" onClick={()=>setToggle(true)}/>}
          {
            toggle && (<div className="navbar-menu_container scale-up-center" >
              <div className="navbar-menu_container-links">
                <Menu/>
                  <div className="navbar-menu_container-links-sign">
                  <button type="button">Sign up</button>
                </div>
              </div>
              </div> )
          }
      </div>
    </div>
  );
}

export default Navbar