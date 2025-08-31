import React from "react";
import { Diamond, Bronze, Silver, Gold } from "./Ranking";

const ProfileCard = ({ 
  image, 
  name, 
  rank, 
  trainingCount, 
  rating, 
  experience, 
  services, 
  hourlyRate, 
  onClick 
}) => {
  // Function to render the appropriate rank badge
  const getRankBadge = (rank) => {
    switch (rank.toLowerCase()) {
      case 'diamond':
        return <Diamond className="w-4 h-4" />;
      case 'gold':
        return <Gold className="w-4 h-4" />;
      case 'silver':
        return <Silver className="w-4 h-4" />;
      case 'bronze':
      default:
        return <Bronze className="w-4 h-4" />;
    }
  };

  return (
    <div 
      className="w-full h-[230px] border border-white/10
      rounded-xl flex p-4
      cursor-pointer transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:scale-105 transit"
      onClick={onClick}
    >
      <div className="flex flex-col items-center justify-center py-1 w-[40%]">
        <img 
          src={image} 
          alt={`${name} Profile`} 
          className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shadow-md"
        />
        <div className="mt-[-20px] bg-[#E5E5CB] px-3 py-1 rounded-lg shadow-md text-sm font-semibold flex items-center gap-1">
          {getRankBadge(rank)}
          <span className="text-[#1A120B]">{rank}</span>
        </div>
        <div className="text-[#E5E5CB] mt-2 text-base md:text-lg truncate max-w-full">{name}</div>
      </div>
      <div className="w-[60%] h-full text-[#E5E5CB] flex flex-col justify-center pl-2">
        {/* Stats */}
        <div className="pr-2">
          {/* Row 1 */}
          <div className="w-full flex justify-between text-center bg-[#664c30] py-1 px-2 rounded-xl">
            <div>
              <p className="text-sm md:text-base font-bold">{trainingCount}+</p>
              <p className="text-xs md:text-sm opacity-60">Trained</p>
            </div>
            <div>
              <p className="text-sm md:text-base font-bold">★{rating}</p>
              <p className="text-xs md:text-sm opacity-60">Rating</p>
            </div>
            <div>
              <p className="text-sm md:text-base font-bold">{experience}</p>
              <p className="text-xs md:text-sm opacity-60">Years</p>
            </div>
          </div>

          {/* Row 2 (Training Services) */}
          <div className="flex flex-col justify-between mt-4 gap-1">
            {services.map((service, index) => (
              <p key={index} className="text-xs md:text-sm opacity-60 bg-[#3a2f23] px-1 rounded-md">
                {service}
              </p>
            ))}
          </div>
        </div>
        <div className="text-xl md:text-2xl font-bold mt-4">
          ₹{hourlyRate}<span className="text-sm md:text-base font-normal">/hr</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;