import { Bell, LogOut } from "lucide-react";
import React from "react";
import ToggleSwitch from "./ToggleSwitch";

const ProfileDropdown = ({ onSelect, name }) => {
  return (
    <div className="absolute flex flex-col right-[-20px] top-[72px] 
    w-[220px] bg-[#1A120B] rounded-[32px] z-50 text-[#E5E5CB] px-3 justify-evenly">
      
      {/* Toggle Switch */}
      <div className="max-h-16 flex justify-center items-center p-2">

        <ToggleSwitch/>

      </div>

      {/* Menu Options */}
      <div className="h-[60%] border-t border-[#E5E5CB]/30 flex flex-col justify-between space-y-2 py-2">
        <div
          className="py-1 hover:bg-[#3C2A21] cursor-pointer rounded-lg pl-3"
          onClick={() => onSelect("profile")}
        >
          Your Profile
        </div>
        <div
          className="py-1 hover:bg-[#3C2A21] cursor-pointer rounded-lg pl-3"
          onClick={() => onSelect("Appointments")}
        >
          Appointments
        </div>
        <div
          className="py-1 hover:bg-[#3C2A21] cursor-pointer rounded-lg pl-3"
          onClick={() => onSelect("history")}
        >
          Medical History
        </div>
      </div>

      {/* Logout Option */}
      <div className="h-[20%] border-t border-[#E5E5CB]/30 py-2">
        <div
          className="py-2 hover:text-red-500 cursor-pointer rounded-2xl pl-3"
          onClick={() => onSelect("logout")}
        >
          <div className="flex justify-between items-center">
            <p> Log Out </p>
          <div className="mr-4">
              <LogOut className="w-4 h-4"/>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;
