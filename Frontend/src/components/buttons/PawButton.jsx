import React from "react";
import { PawPrint } from "lucide-react";

export default function PawButton({ 
  onClick,
  text = "Get Started",
  className = "" 
}) {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center justify-center
        rounded-full 
        transition-all duration-200 
        hover:scale-[1.01] hover:shadow-lg
        focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30
        group
        ${className}
      `}
    >
      {/* Text portion */}
      <div className="
        h-12
        bg-neutral-900 text-white 
        rounded-full 
        px-6 py-3
        font-quicksandSemiBold
      ">
        {text}
      </div>
      
      {/* Icon portion with negative margin for overlap */}
      <div className="
        flex items-center justify-center
        w-12 h-12
        bg-neutral-900
        p-1
        -ml-4 
        rounded-full           
        transition-transform duration-200
        group-hover:rotate-12
      ">
        <div className="
          flex items-center justify-center
          w-full h-full
          bg-brand
          rounded-full
        ">
          <PawPrint 
            className="w-5 h-5 text-neutral-900" 
            fill="currentColor"
            strokeWidth={2}
          />
        </div>
      </div>
    </button>
  );
}