import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import logo from "@assets/petopia-logo.svg";

export default function NavBar({ onExploreClick }) {
  const navigate = useNavigate();

  return (
    <header className="w-full">
      <div className=" w-full flex items-start justify-between px-1 sm:px-3 lg:px-4 pt-4">
        {/* Left: icon + brand */}
        <div className="flex items-center gap-2">
          {/* “Image” icon (inline SVG so you don’t need an asset) */}
          <div className="p-0.5 rounded-full bg-[#C4682B] flex items-center justify-center">
            <img src={logo} className="min-w-10 h-10" alt="Petopia Logo" />
          </div>
          <span className="text-brand font-quicksandBold text-3xl">Petopia</span>
        </div>

        {/* Right: two lines (Register small, then Explore with down-arrow) */}
        <div className="flex flex-col items-center justify-center">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-sm text-ink-secondary hover:opacity-80 transition"
            aria-label="Register"
          >
            Register
          </button>

          <button
            type="button"
            onClick={onExploreClick}
            className="mt-1 inline-flex items-center gap-1 text-md font-semibold text-brand hover:opacity-80 transition"
            aria-label="Explore"
          >
            Explore <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
