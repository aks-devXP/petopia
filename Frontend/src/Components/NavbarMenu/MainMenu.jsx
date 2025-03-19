import { Bone, BookOpenTextIcon, ChevronDown, Home, MoveRight, PawPrint, Store } from 'lucide-react';
import { NavLink } from "react-router-dom";

const Submenu = () => {
  return (
    <ul className="absolute top-full left-[-2rem] bg-[#151516] rounded-md p-2 hidden group-hover:block z-50">
      {[
        { to: "/news", label: "News" },
        { to: "/ngo", label: "NGO" },
        { to: "/about", label: "About Us" },
        { to: "/contact", label: "Contact" }
      ].map((item, index) => (
        <li key={index} className="mt-2 group/item">
          <NavLink
            to={item.to}
            className="relative flex justify-between items-center p-2 min-w-[15rem] rounded-md 
              group-hover/item:bg-[#1f1d1d] group-hover/item:text-[#E5E5CB] 
              transition-all duration-300 
              group-hover/item:pl-4 group-hover/item:pr-4"
          >
            {item.label}
            <div className="relative w-5 h-5 ml-2">
              <MoveRight 
                className="absolute top-1/2 left-1/2 
                  -translate-x-[150%] -translate-y-1/2 
                  opacity-0 w-4 h-4
                  transition-all duration-300 
                  group-hover/item:opacity-100 group-hover/item:translate-x-[-50%]"
              />
            </div>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

const Menu = () => {
  return (
    <ul className="list-none p-0 m-0 flex gap-12 h-15 items-center">
      <li>
        <NavLink to="/home" className="text-white font-medium text-lg leading-[25px] capitalize mx-4 cursor-pointer hover:text-[#E5E5CB]">
          {({ isActive }) => (
            <div className={`flex justify-center transition-transform ${isActive ? "border-2 border-white rounded-3xl p-2" : ""}`}>
              { isActive?(<div className="px-3">
                <Home />
              </div>):
              (<p>Home</p>)
              }
            </div>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink to="/dictionary" className="text-white font-medium text-xl leading-[25px] capitalize mx-4 cursor-pointer hover:text-[#E5E5CB]">
          {({ isActive }) => (
            <div className={`${isActive ? "border-2 border-white rounded-3xl p-2" : ""}`}>
              { isActive?(<div className="px-3">
                <BookOpenTextIcon />
              </div>):
              (<p>Guide</p>)
              }
            </div>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink to="/vet" className="text-white font-medium text-xl leading-[25px] capitalize mx-4 cursor-pointer hover:text-[#E5E5CB]">
          {({ isActive }) => (
            <div className={`${isActive ? "border-2 border-white rounded-3xl p-2" : ""}`}>
              { isActive?(<div className="px-3">
                <PawPrint />
              </div>):
              (<p>Medic</p>)
              }
            </div>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink to="/shopping" className="text-white font-medium text-xl leading-[25px] capitalize mx-4 cursor-pointer hover:text-[#E5E5CB]">
          {({ isActive }) => (
            <div className={`${isActive ? "border-2 border-white rounded-3xl p-2" : ""}`}>
              { isActive?(<div className="px-3">
                <Store />
              </div>):
              (<p>Pet Essentials</p>)
              }
            </div>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink to="/trainer" className="text-white font-medium text-xl leading-[25px] capitalize mx-4 cursor-pointer hover:text-[#E5E5CB]">
            {({ isActive }) => (
              <div className={`${isActive ? "border-2 border-white rounded-3xl p-2" : ""}`}>
                { isActive?(<div className="px-3">
                  <Bone />
                </div>):
                (<p>Trainer</p>)
                }
              </div>
            )}
          </NavLink>
      </li>
      <li className="relative group">
        <NavLink 
          to="/bc" 
          className="text-white font-medium text-xl leading-[25px] capitalize mx-4 cursor-pointer group-hover:text-[#E5E5CB]"
        >
          {({ isActive }) => (
            <div className={`flex items-center ${isActive ? "border-2 border-white rounded-3xl p-2" : ""}`}>
              More
              <ChevronDown className="ml-2 w-5 h-5 opacity-50 group-hover:opacity-100" />
            </div>
          )}
        </NavLink>
        <Submenu />
      </li>
    </ul>
  );
};
export default Menu;
