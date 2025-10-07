import { useState } from "react";
import { Dog, Cat, Utensils, Scissors, GraduationCap } from "lucide-react";
import tips from "../../../../Data/PetCareTips";

export default function PetCareTips({ petSelected, tipSelected }) {

  // Function to calculate pentagon positions
  // Function to calculate pentagon positions
const getPentagonPosition = (index, total) => {
  // Reduce radius a bit to keep inside screen
  const radius = 38; // was 42
  const startAngle = -Math.PI / 2;
  const angle = (2 * Math.PI * index) / total + startAngle;

  const x = 50 + radius * Math.cos(angle);
  const y = 50 + radius * Math.sin(angle);

  return {
    left: `${x}%`,
    top: `${y}%`,
    transform: "translate(-50%, -50%)",
  };
};


  return (
    <div className="p-4 h-full w-full mx-auto ">
      <h2 className="text-3xl font-semibold mb-12 text-black text-center">
        {petSelected} Care Tips - {tipSelected}
      </h2>
      
      <div className="md:hidden relative w-full flex flex-col justify-center items-center gap-3">
        {tips[petSelected][tipSelected].map((tip, index) => {
          return (
            <div 
              key={index}
              className="w-full h-40 text-gray-700 
              flex flex-col items-center justify-center p-4 rounded-full shadow-md bg-white border border-gray-100 overflow-auto"
            >
              <div className="flex items-center justify-center mb-2">
                <strong className="ml-1 text-center">{tip.title}</strong>
              </div>
              <p className="text-gray-600 text-xs text-center">{tip.content}</p>
            </div>
          );
        })}
        
      </div>

      <div className="hidden md:block relative w-full h-96  mt-32">
        {tips[petSelected][tipSelected].map((tip, index) => {
          const positionStyle = getPentagonPosition(index, tips[petSelected][tipSelected].length);
          
          return (
            <div 
              key={index}
              className="absolute w-60 h-40 text-gray-700 
              flex flex-col items-center justify-center p-4 rounded-full shadow-md bg-white border border-gray-100 overflow-auto"
              style={positionStyle}
            >
              <div className="flex items-center justify-center mb-2">
                <strong className="ml-1 text-center">{tip.title}</strong>
              </div>
              <p className="text-gray-600 text-xs text-center">{tip.content}</p>
            </div>
          );
        })}
        
      </div>
    </div>
  );
}