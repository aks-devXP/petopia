import React, { useState } from 'react';
import { LogOut } from 'lucide-react';
import logo from "../assets/petopia-logo.svg";
import SidebarMenu from '../Components/Provider/SidebarMenu';
import WelcomeBanner from '../Components/Provider/WelcomeBanner';
import DashBoard from '../Components/Provider/DashBoard';

export default function DoctorHome() {

  const [selectedTab, setSelectedTab] = useState("Home");

  return (

    <div className="flex flex-col w-full min-h-screen bg-gray-100 overflow-x-hidden">

      <div className="w-full h-16 flex justify-between items-center bg-white shadow-sm">
        <div className="flex items-center space-x-3 px-3">
          <img src={logo} className="w-12 h-12" alt="Petopia Logo" />
          <span className="font-grotesk font-bold text-xl text-black">Petopia</span>
        </div>
        
        <div className="px-4 flex gap-2">
          <div className="text-black flex py-3 px-4 items-center justify-center cursor-pointer
           hover:bg-red-100 rounded-full hover:text-red-600 transition-colors duration-200">
            <LogOut size={14} className="hover:text-red-600" />
            <span className="text-sm ml-2">Logout</span>
          </div>
          <div className="h-12 w-12 border-4 border-black/50 rounded-full hover:border-black/70 cursor-pointer">
            <img 
              className="w-full h-full rounded-full object-cover"
              src="https://snapynow.com/wp-content/uploads/2024/05/sad-boy-profile-dp_66.webp" 
              alt="User profile" 
            />
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row flex-1">

        <div className="md:h-[calc(100vh-4rem)] w-full md:w-auto">
          <SidebarMenu selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        </div>
        
        <DashBoard/>
      </div>
    </div>
  );
}