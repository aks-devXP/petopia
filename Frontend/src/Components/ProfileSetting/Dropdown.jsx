import React from "react";
import { Bell, Power } from "lucide-react";
import ToggleSwitch from "./ToggleSwitch";

const ProfileDropdown = ({ onSelect, name }) => {
  return (
    <div className="absolute flex flex-col right-[-9px] top-[65px] w-[280px] h-[368px] bg-[#1A120B] rounded-[32px] z-50 text-[#E5E5CB] px-6">
      <div className="h-[28%] flex items-center justify-between">
        {/* Profile Picture */}
        <div className="w-[30%] flex items-center">
          <div className="h-15 w-15 rounded-full bg-transparent object-cover">
            <img className="w-full h-full rounded-full" src="https://snapynow.com/wp-content/uploads/2024/05/sad-boy-profile-dp_66.webp" alt="" />
          </div>
        </div>
        <div className="w-[50%] font-poppins">{name}</div>
        
        {/* Bell Icon (Rightmost) */}
        <div className="w-[20%] flex justify-end items-center pr-2">
          <Bell size={24} className="text-[#E5E5CB] cursor-pointer" />
        </div>
      </div>

      {/* Toggle Switch */}
      <div className="h-[17%] border-t border-[#E5E5CB]/30 flex justify-center items-center">
        <ToggleSwitch />
      </div>

      {/* Menu Options */}
      <div className="h-[35%] border-t border-[#E5E5CB]/30 flex flex-col justify-center">
        <div
          className="py-1 hover:bg-[#3C2A21] cursor-pointer rounded-lg pl-3"
          onClick={() => onSelect("profile")}
        >
          Your Profile
        </div>
        <div
          className="py-1 hover:bg-[#3C2A21] cursor-pointer rounded-lg pl-3"
          onClick={() => onSelect("history")}
        >
          Appointments
        </div>
        <div
          className="py-1 hover:bg-[#3C2A21] cursor-pointer rounded-lg pl-3"
          onClick={() => onSelect("history")}
        >
          Order History
        </div>
      </div>

      {/* Logout Option */}
      <div className="h-[20%] border-t border-[#E5E5CB]/30">
        <div
          className="py-2 hover:bg-red-900 cursor-pointer rounded-2xl pl-3 mt-2"
          onClick={() => onSelect("logout")}
        >
          <div className="flex justify-between items-center">
            <p> Log Out </p>
            <div className="mr-4">
              <Power className="w-4 h-4"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;
