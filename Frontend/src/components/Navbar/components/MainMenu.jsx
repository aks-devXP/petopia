// MainMenu.jsx
import {
  Bone,
  BookOpenTextIcon,
  ChevronDown,
  Home,
  MoveRight,
  Newspaper,
  PawPrint,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Submenu = () => (
  <ul className="absolute top-full left-[-2rem] bg-[#1A120B] rounded-2xl p-2 hidden group-hover:block z-50">
    {[
      { to: "/ngo", label: "NGO" },
      // { to: "/shopping", label: "Pet Essentials" },
      { to: "/about", label: "About Us" },
      { to: "/contact", label: "Contact" },
    ].map((item, i) => (
      <li key={i} className="mt-2 group/item">
        <NavLink
          to={item.to}
          className="relative flex justify-between items-center p-2 min-w-[15rem] rounded-md
                     group-hover/item:bg-[#1f1d1d] group-hover/item:text-[#E5E5CB]
                     transition-all duration-300
                     group-hover/item:pl-4 group-hover/item:pr-4"
        >
          {item.label}
          <MoveRight
            className="absolute top-1/2 left-[90%] -translate-x-[150%] -translate-y-1/2
                      opacity-0 w-4 h-4
                      transition-all duration-300
                      group-hover/item:opacity-100 group-hover/item:translate-x-[-50%]"
          />
        </NavLink>
      </li>
    ))}
  </ul>
);

const Menu = () => {
  const items = [
    { to: "/home", label: "Home", Icon: Home },
    { to: "/guide", label: "Guide", Icon: BookOpenTextIcon },
    { to: "/vet", label: "Medic", Icon: PawPrint },
    { to: "/news", label: "News", Icon: Newspaper },
    { to: "/services", label: "Services", Icon: Bone },
  ];

  return (
    <ul className="flex items-center gap-10 text-lg">
      {items.map(({ to, label, Icon }, idx) => (
        <li key={idx}>
          <NavLink to={to} end>
            {({ isActive }) => (
              <div
                className={`flex items-center justify-center space-x-1
                            transition-transform duration-200
                            ${isActive ? "border-2 border-white rounded-3xl p-2" : ""}`}
              >
                {/* ICON: always visible on xs/sm/md; hide on lg+ if you want */}
                <Icon
                  className={`w-5 h-5 block
                              ${!isActive ? "lg:hidden" : ""}`}
                />

                {/* TEXT: hidden on xs/sm; show from md upwards; hide entirely if active */}
                <span
                  className={`hidden lg:inline text-white font-medium
                              ${isActive ? "hidden" : ""}`}
                >
                  {label}
                </span>
              </div>
            )}
          </NavLink>
        </li>
      ))}

      {/* "More" with submenu */}
      <li className="relative group">
        <NavLink to="#" className="flex items-center">
          {({ isActive }) => (
            <div
              className={`items-center space-x-1 hidden sm:flex
                  
                          transition-transform duration-200
                          ${isActive ? "border border-white rounded-full p-2" : ""}`}
            >
              {/* always show chevron */}
              <ChevronDown className="w-5 h-5 block" />

              <span
                className={`hidden lg:inline text-white font-medium
                            ${isActive ? "hidden" : ""}`}
              >
                More
              </span>
            </div>
          )}
        </NavLink>
        <Submenu/>
      </li>
    </ul>
  );
};

export default Menu;
