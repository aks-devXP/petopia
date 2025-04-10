import React from 'react'
import Akash from "../../assets/Trainer/akash.png";
import { Diamond, Bronze, Silver, Gold } from "./Ranking";

export default function GroomerCard({ 
  image, 
  name, 
  rank, 
  rating,
  services = [],
  location
}) {
  const getRankBadge = (rank) => {
    switch (rank?.toLowerCase()) {
      case 'diamond':
        return <Diamond className="w-8 h-8" />;
      case 'gold':
        return <Gold className="w-8 h-8" />;
      case 'silver':
        return <Silver className="w-8 h-8" />;
      case 'bronze':
      default:
        return <Bronze className="w-8 h-8" />;
    }
  };

  return (
    <div className="rounded-xl border border-white/10 overflow-hidden  text-[#E5E5CB]">
      {/* Image section */}
      <div className="relative h-80 w-full bg-gray-200">
        <img 
          src={image || "/api/placeholder/400/320"} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        
        {/* Rank badge */}
        {rank && (
          <div className="absolute top-2 left-2 p-1 bg-black/30 rounded-full">
            {getRankBadge(rank)}
          </div>
        )}
        
      </div>
      
      {/* Content section */}
      <div className="p-4">
        {/* Name */}
        <div className='flex justify-between'>
            <h3 className="text-xl font-bold mb-1">{name}</h3>
            <div className="flex items-center bg-green-700 text-white px-2 py-1 rounded">
                  <span>{rating}</span>
                  <span className="ml-1">★</span>
            </div>
        </div>
        {/* Services/categories */}
        <div className="text-[#E5E5CB]/40 text-sm mb-2">
          {services.join(", ")}
        </div>
        
        {/* Location and distance */}
        <div className="flex justify-between items-center mt-2">
          <div className="text-[#E5E5CB]/60">{location}</div>
          <div className="flex items-center">
            <div className="text-sm text-[#E5E5CB]/40 mr-2">1.2 km</div>
          </div>
        </div>
      </div>
    </div>
  )
}