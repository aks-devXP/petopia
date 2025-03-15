import React from "react";

const ProfileDropdown = ({ onSelect }) => {
  return (
    <div className="absolute right-[-9px] top-[55px] mt-2 w-48 bg-[#1A120B] rounded-lg shadow-lg z-50 text-[#E5E5CB]">
      <ul className="py-2 space-y-2">
        <li
          className="px-4 py-2 hover:bg-[#3C2A21] cursor-pointer"
          onClick={() => onSelect("profile")}
        >
          Profile & Settings
        </li>
        <li
          className="px-4 py-2 hover:bg-[#3C2A21] cursor-pointer"
          onClick={() => onSelect("history")}
        >
          History & Records
        </li>
        <li
          className="px-4 py-2 hover:bg-[#3C2A21] cursor-pointer"
          onClick={() => onSelect("logout")}
        >
          Log Out
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;
