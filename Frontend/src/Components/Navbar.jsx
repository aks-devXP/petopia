import gsap from "gsap";
import ScrollTrigger from "gsap/all";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/petopia-logo.svg";
import DashboardModal from "../Components/ProfileSetting/DashboardModal";
import MainMenu from "./NavbarMenu/MainMenu";
import ProfileDropdown from "./ProfileSetting/Dropdown";
gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [loggedin, setLoggedin] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedin(localStorage.getItem("username") || "");
  
    // Initial setup
    gsap.set(".navbar", {
      display: "flex",
      position: "fixed",
      top: 0,
      width: "100%",
      opacity: 1,
      transition: "opacity 0.5s ease-in-out",
    });
  
    // First timeline - handles the navbar transformation
    const t1 = gsap.timeline({
      scrollTrigger: {
        trigger: ".navbar",
        start: "+=100 top",
        end: "+=500 top",
        scrub: 1,
      },
    });
  
    t1.to(".navbar", {
      position: "fixed",
      top: "2.5%",
      left: "12.5%",
      width: "75%",
      borderRadius: "1.25rem",
      zIndex: 1000,
      opacity: 1,
    });
  
    // For show/hide on scroll, use a separate approach
    let lastScrollY = window.scrollY;
  
    // Define the scroll handler function
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDiff = Math.abs(currentScrollY - lastScrollY);
  
      if (scrollDiff > 130) {
        if (currentScrollY > lastScrollY) {
          // Scrolling down by more than 150px: Hide navbar
          gsap.to(".navbar", { y: "-130%", duration: 0.8 });
        } else {
          // Scrolling up by more than 150px: Show navbar
          gsap.to(".navbar", { y: "0", duration: 0.8 });
        }
        lastScrollY = currentScrollY;
      }
    };
  
    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);
  
    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
  
      // Kill the GSAP animations to prevent memory leaks
      if (t1.scrollTrigger) {
        t1.scrollTrigger.kill();
      }
    };
  }, []);
  

  const handleSignInLogIn = (e) => {
    setLoggedin(true);
    navigate(e.target.innerText === "Sign Up" ? "/sign-up" : "/login");
  };

  const handleLogout = () => {
    setLoggedin("");
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (option) => {
    setIsDropdownOpen(false);
    if (option === "profile" || option === "history") {
      setModalType(option);
    } else if (option === "logout") {
      localStorage.removeItem("token");
      window.location.reload();
    }
  };

  // console.log("Current Path:", window.location.pathname);

  return (
    <div className="flex w-full h-20">
        <div className="navbar flex h-fit justify-between w-full p-1.5 bg-[#1A120B] z-20 min-h-20 shadow-[0_0_10px_rgba(229,229,203,0.4)]">
          <div className="flex justify-between flex-shrink w-full items-center mx-5">
            <div className="rounded-full w-[20%]">
              <NavLink to="/home">
                  <img src={logo} className="min-w-12 h-12" alt="Petopia Logo" />
              </NavLink>
            </div>
            
            <div className="flex flex-shrink justify-evenly h-full w-[50%]">
              <MainMenu />
            </div>

            <div className="flex justify-end items-center w-[30%]">
                {localStorage.getItem("token") ? (
                <div className="relative">
                    <button className="bg-white hover:bg-[#E5E5CB] px-5 py-2.5 rounded-[25px] text-[#1A120B]" onClick={handleProfileClick}>
                    Hi, {loggedin.replace(/['"]+/g, "")}
                    </button>
                    {isDropdownOpen && <ProfileDropdown onSelect={handleOptionSelect} name={loggedin.replace(/['"]+/g, "")}/>}
                </div>
                ) : (
                <>
                    <button className="mr-4 hover:text-[#E5E5CB]" type="button" onClick={handleSignInLogIn}>
                    Sign Up
                    </button>
                    <button className="bg-white hover:bg-[#E5E5CB] px-5 py-2.5 rounded-[25px] text-[#1A120B]" type="button" onClick={handleSignInLogIn}>
                    Log in
                    </button>
                </>
                )}
            </div>
          </div>


        {/* Modals */}
        <DashboardModal isOpen={modalType !== null} onClose={() => setModalType(null)} option={modalType} />
        </div>
    </div>
  );
};

export default Navbar;