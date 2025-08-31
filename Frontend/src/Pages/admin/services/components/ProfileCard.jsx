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
  className="bg-[#FDFCF7] w-full h-[230px] border border-gray-200
  rounded-xl flex p-4
  cursor-pointer transition-all duration-300 hover:bg-[#FAF7F2] hover:shadow-lg hover:scale-105"
  onClick={onClick}
>
  {/* Left: Profile & Rank */}
  <div className="flex flex-col items-center justify-center py-1 w-[40%]">
    <img 
      src={image} 
      alt={`${name} Profile`} 
      className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shadow-md"
    />
    <div className="mt-[-20px] bg-white px-3 py-1 rounded-lg shadow text-sm font-semibold flex items-center gap-1">
      {getRankBadge(rank)}
      <span className="text-[#2C2C2C] capitalize">{rank}</span>
    </div>
    <div className="text-[#2C2C2C] mt-2 text-base md:text-lg truncate max-w-full font-medium">{name}</div>
  </div>

  {/* Right: Stats & Services */}
  <div className="w-[60%] h-full text-[#2C2C2C] flex flex-col justify-center pl-2">
    <div className="pr-2">
      {/* Stats Bar */}
      <div className="w-full flex justify-between text-center bg-[#F4E1C1] py-1 px-2 rounded-xl">
        <div>
          <p className="text-sm md:text-base font-bold">{trainingCount}+</p>
          <p className="text-xs md:text-sm opacity-70">Trained</p>
        </div>
        <div>
          <p className="text-sm md:text-base font-bold">★{rating}</p>
          <p className="text-xs md:text-sm opacity-70">Rating</p>
        </div>
        <div>
          <p className="text-sm md:text-base font-bold">{experience}</p>
          <p className="text-xs md:text-sm opacity-70">Years</p>
        </div>
      </div>

      {/* Services */}
      <div className="flex flex-col justify-between mt-4 gap-1">
        {services.map((service, index) => (
          <p key={index} className="text-xs md:text-sm text-[#2C2C2C] opacity-80 bg-[#EEE8E1] px-2 py-0.5 rounded-md">
            {service}
          </p>
        ))}
      </div>
    </div>

    {/* Price */}
    <div className="text-xl md:text-2xl font-bold mt-4 text-[#2C2C2C]">
      ₹{hourlyRate}<span className="text-sm md:text-base font-normal">/hr</span>
    </div>
  </div>
</div>

  );
};

export default ProfileCard;