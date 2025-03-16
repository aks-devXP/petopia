import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/petopia-logo.svg";
import { handleError } from "../Util/Alerts";
import DashboardModal from "../Components/ProfileSetting/DashboardModal";
import ProfileDropdown from "./ProfileSetting/Dropdown";
import MainMenu from "./NavbarMenu/MainMenu";

const Navbar = () => {
  const [loggedin, setLoggedin] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedin(localStorage.getItem("user_name") || "");
    }
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
    <div className="flex justify-between w-[90%] p-1.5 bg-[#1A120B] fixed top-2 left-20 z-20 min-h-20 rounded-3xl">
      <div className="flex flex-1 justify-start items-center">
        <div className="ml-6 rounded-full">
          <NavLink to="/home">
            <img src={logo} className="min-w-12 h-12" alt="Petopia Logo" />
          </NavLink>
        </div>
        <div className="flex flex-[2] justify-evenly h-full">
          <MainMenu />
        </div>
      </div>

      <div className="flex justify-end items-center mr-2">
        {localStorage.getItem("token") ? (
          <div className="relative">
            <button className="bg-white hover:bg-[#E5E5CB] px-5 py-2.5 rounded-[25px] text-[#1A120B]" onClick={handleProfileClick}>
              Hi, {loggedin.replace(/['"]+/g, "")}
            </button>
            {isDropdownOpen && <ProfileDropdown onSelect={handleOptionSelect} />}
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

      {/* Modals */}
      <DashboardModal isOpen={modalType !== null} onClose={() => setModalType(null)} option={modalType} />
    </div>
  );
};

export default Navbar;