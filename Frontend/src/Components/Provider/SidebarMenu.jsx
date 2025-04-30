import React, { useState } from 'react';
import { Home, User, Settings, LogOut, CreditCard, Lock, Users, PhoneCall } from 'lucide-react';

export default function SidebarMenu({selectedTab, setSelectedTab}) {

  const menuItems = [
    { name: "Home", icon: <Home size={20} /> },
    { name: "Personal info", icon: <User size={20} /> },
    { name: "Security", icon: <Lock size={20} /> },
    { name: "People & sharing", icon: <Users size={20} /> },
    { name: "Payments & subscriptions", icon: <CreditCard size={20} /> },
    { name: "Contact Us", icon: <PhoneCall size={20} /> }
  ];

  return (
    <div className="md:w-56 w-full font-poppins flex md:flex-col gap-2 md:gap-0 h-full">
      <div className="py-4 flex-grow flex md:flex-col gap-2 md:gap-0 justify-center items-center md:items-start">
        {menuItems.map((item) => (
          <div
            key={item.name}
            className={`flex items-center px-4 py-3 cursor-pointer ${
              selectedTab === item.name 
                ? 'shadow-lg md:rounded-r-full rounded-full mr-4 font-bold' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setSelectedTab(item.name)}
          >
            <div className={`${selectedTab === item.name ? 'text-blue-600' : 'text-gray-600'}`}>
              {item.icon}
            </div>
            <span className={`font-medium ml-3 md:inline hidden ${
              selectedTab === item.name ? 'text-blue-600' : 'text-gray-600'
            }`}>
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}