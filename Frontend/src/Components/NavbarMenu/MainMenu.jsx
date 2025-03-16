import { NavLink } from "react-router-dom";
import { PersonStanding, BriefcaseMedical, Store, House } from 'lucide-react';


const Submenu = () => {
  return (
    <ul className="absolute top-full left-[-2rem] bg-[#151516] rounded-md p-2 hidden group-hover:block z-50">
      <li className="mt-2">
        <NavLink to="/news" className="flex justify-between items-center p-2 min-w-[15rem] rounded-md hover:bg-[#1f1d1d] hover:text-[#E5E5CB] hover:p-4">
          News
          <span className="opacity-0 hover:opacity-100">
            <img src="../assets/icon-arrow-right.svg" className="h-[17px]" />
          </span>
        </NavLink>
      </li>
      <li className="mt-2">
        <NavLink to="/ngo" className="flex justify-between items-center p-2 min-w-[15rem] rounded-md hover:bg-[#1f1d1d] hover:text-[#E5E5CB] hover:p-4">
          NGO
          <span className="opacity-0 hover:opacity-100">
            <img src="../assets/icon-arrow-right.svg" className="h-[17px]" />
          </span>
        </NavLink>
      </li>
      <li className="mt-2">
        <NavLink to="/about" className="flex justify-between items-center p-2 min-w-[15rem] rounded-md hover:bg-[#1f1d1d] hover:text-[#E5E5CB] hover:p-4">
          About Us
          <span className="opacity-0 hover:opacity-100">
            <img src="../assets/icon-arrow-right.svg" className="h-[17px]" />
          </span>
        </NavLink>
      </li>
      <li className="mt-2">
        <NavLink to="/contact" className="flex justify-between items-center p-2 min-w-[15rem] rounded-md hover:bg-[#1f1d1d] hover:text-[#E5E5CB] hover:p-4">
          Contact
          <span className="opacity-0 hover:opacity-100">
            <img src="../assets/icon-arrow-right.svg" className="h-[17px]" />
          </span>
        </NavLink>
      </li>
    </ul>
  );
};

const Menu = () => {
  return (
    <ul className="list-none p-0 m-0 flex gap-12 h-15 items-center">
      <li>
        <NavLink to="/home" className = {({ isActive }) => `text-white font-medium text-lg leading-[25px] capitalize mx-4 cursor-pointer hover:text-[#E5E5CB] ${isActive ? "border-2 rounded-3xl" : ""}`}>
          <div className= {`flex justify-center transition-transform`}>
            <div className="mr-2">
              <House/>
            </div>
            <p>Home</p>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dictionary" className="text-white font-medium text-xl leading-[25px] capitalize mx-4 cursor-pointer hover:text-[#E5E5CB]">
          Guide
        </NavLink>
      </li>
      <li>
        <NavLink to="/vet" className="text-white font-medium text-xl leading-[25px] capitalize mx-4 cursor-pointer hover:text-[#E5E5CB]">
          Medical Care
        </NavLink>
      </li>
      <li>
        <NavLink to="/shopping" className="text-white font-medium text-xl leading-[25px] capitalize mx-4 cursor-pointer hover:text-[#E5E5CB]">
          Pet Essentials
        </NavLink>
      </li>
      <li>
        <NavLink to="/trainer" className="text-white font-medium text-xl leading-[25px] capitalize mx-4 cursor-pointer hover:text-[#E5E5CB]">
          Trainer
        </NavLink>
      </li>
      <li className="relative flex gap-2 items-center justify-start group">
        <NavLink to="#" className="text-white font-medium text-xl leading-[25px] capitalize mx-4 cursor-pointer group-hover:text-[#E5E5CB] after:content-[''] after:w-6 after:h-6 after:opacity-50 after:bg-[url('../assets/icon-arrow-down.svg')] after:bg-contain after:bg-no-repeat">
          More
        </NavLink>
        <Submenu />
      </li>
    </ul>
  );
};

export default Menu;
