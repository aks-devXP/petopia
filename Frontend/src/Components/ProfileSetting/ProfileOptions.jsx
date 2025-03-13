import React, { useState } from "react";
import { UserRoundPen, KeyRound, MessageCircle } from "lucide-react";
import ProfileInfo from "./ProfileInfo";
import Messages from "../Dashboard/Messages";

export default function ProfileOptions() {
  const [selectedOption, setSelectedOption] = useState("profile");

  return (
    <div className="flex h-full w-full">

      {/* Left Panel */}
      <div className="w-[20%] text-[#E5E5CB] p-4 pl-0 mt-10 flex flex-col gap-5">
        
        <div
          className={`flex items-center gap-2 p-3 rounded-xl cursor-pointer ${
            selectedOption === "profile" ? "bg-[#3C2A21]" : ""
          }`}
          onClick={() => setSelectedOption("profile")}
        >
          <UserRoundPen size={20} />
          <p>Profile Info</p>
        </div>

        <div
          className={`flex items-center gap-2 p-3 rounded-xl cursor-pointer ${
            selectedOption === "password" ? "bg-[#3C2A21]" : ""
          }`}
          onClick={() => setSelectedOption("password")}
        >
          <KeyRound size={20} />
          <p>Login & Security</p>
        </div>

        <div
          className={`flex items-center gap-2 p-3 rounded-xl cursor-pointer ${
            selectedOption === "messages" ? "bg-[#3C2A21]" : ""
          }`}
          onClick={() => setSelectedOption("messages")}
        >
          <MessageCircle size={20} />
          <p>Messages Preferences</p>
        </div>

      </div>

      {/* Right Panel */}
      <div className="w-[80%] text-black mt-10 p-6 border-l border-[#E5E5CB]/30 overflow-y-auto">
        {selectedOption === "profile" ? (
          <ProfileInfo/>
        ) : selectedOption === "password" ? (
          <div className="text-[#E5E5CB]">
            <h2 className="text-2xl font-semibold mb-6">Login & Security</h2>
            <p className="my-2">Enter Your Current Password: <input className="ml-1 rounded-md" type="password" /></p>
            <p className="my-2">Enter New Password: <input className="ml-1 rounded-md" type="password" /></p>
            <p className="my-2">Re-Enter New Password: <input className="ml-1 rounded-md" type="password" /></p>
            <div className="mt-5 bg-[#3C2A21] border-2 w-fit px-5 py-2 hover:bg-black rounded-full">
              <button className="text-lg">Change Password</button>
            </div>
          </div>
        ) : (
          <Messages/>
        )}
      </div>

    </div>
  );
}
