import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "@assets/petopia-logo.svg";
import StaggeredMenu from "./StaggeredMenu";
import PawButton from "../buttons/PawButton";

const StaticNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthed = Boolean(localStorage.getItem("token"));

  const items = [
    { label: "Home", ariaLabel: "Go to Home", to: "/home" },
    { label: "Services", ariaLabel: "Go to Services", to: "/pet-services" },
    { label: "Guide", ariaLabel: "Go to Breed Guide", to: "/breed-info" },
    { label: "News", ariaLabel: "Go to News", to: "/news" },
    { label: "NGO", ariaLabel: "Go to NGO/Volunteer", to: "/ngo" },
    { label: "Contact", ariaLabel: "Go to Contact", to: "/contact" },
  ];

  const handleCTA = () => {
    navigate("/sign-in", { state: { from: location }, replace: false });
  };

  return (
    <nav
      className="
        sticky top-0 z-[100]  /* keep it above content when menu is closed */
        flex items-center justify-between
        bg-ink-secondary/30 h-20 px-2 sm:px-4 backdrop-blur-xl"
    >
      {/* Left: Petopia -> /welcome */}
      <button
        onClick={() => navigate("/welcome")}
        className="flex items-center gap-2 rounded-full transition"
        aria-label="Go to Welcome"
      >
        <div className="flex items-center gap-2">
                  {/* “Image” icon (inline SVG so you don’t need an asset) */}
                  <div className="p-0.5 rounded-full bg-ink-primary flex items-center justify-center">
                    <img src={logo} className="w-14 h-14" alt="Petopia Logo" />
                  </div>
                  <span className="text-ink-primary font-quicksandBold text-3xl">Petopia</span>
                </div>
      </button>

      {/* Right: if NOT authed -> CTA; if authed -> Menu */}
      <div className="flex items-center gap-2">
        {!isAuthed ? (
          <PawButton onClick={handleCTA} text="Create Your Pawfile">
          </PawButton>
        ) : (
          <StaggeredMenu
            items={items}
            colors={["#B19EEF", "#5227FF"]}
            menuButtonColor="#fff"
            openMenuButtonColor="#fff"
            changeMenuColorOnOpen
          />
        )}
      </div>
    </nav>
  );
};

export default StaticNavbar;
