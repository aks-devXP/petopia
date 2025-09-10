import React from 'react';
import { Search, MapPin, ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function ShoppingMenu() {
  return (
    <div className='flex w-full h-full justify-evenly items-center'>
      <div className="w-[20%] flex flex-col hover:cursor-pointer items-center">
        <div className="flex items-center text-sm mb-[-2px]">
          <MapPin size={12} className="text-white/60" />
          <span className='text-white/60 ml-1'>Deliver to</span>
        </div>
        <div className="font-semibold text-white">Address 123</div>
      </div>

      <div className='flex w-[30%]'>
        <ul className="list-none p-0 m-0 flex gap-1 h-15 items-center">
          <li>
            <NavLink to="/" className="text-white font-medium text-xl leading-[25px] capitalize mx-4 cursor-pointer hover:text-[#E5E5CB]">
              Food
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className="text-white font-medium text-xl leading-[25px] capitalize mx-4 cursor-pointer hover:text-[#E5E5CB]">
              Toys
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className="text-white font-medium text-xl leading-[25px] capitalize mx-4 cursor-pointer hover:text-[#E5E5CB]">
              Grooming
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search..."
          className="text-[#1A120B] w-full pl-10 pr-4 py-2 bg-[#E5E5CB] border rounded-3xl focus:ring-2 focus:ring-[#3C2A21] focus:outline-none shadow-sm"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1A120B]" size={20} />
      </div>

      <div className='flex items-center justify-center text-[#E5E5CB]'>
        <ShoppingCart size={24} />
      </div>
    </div>
  );
}
