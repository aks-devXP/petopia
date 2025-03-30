import React from "react";
import { Phone, Star, Share, MapPin, MessageCircle, CalendarCheck } from "lucide-react";

export default function Head() {
  return (
    <div className="w-full h-full p-1 flex flex-col justify-between max-w-[95vw] text-[#E5E5CB]">

      <div className="w-full flex justify-between items-center">
          <div className="flex flex-col flex-1">
            <h1 className="text-3xl font-bold">
              Luzo - Pet salon 
            </h1>
            <p className="text-[#E5E5CB]/50">
              Property 13, Ground Floor, The Exchange Building, Alipur Road, Civil Lines, New Delhi
            </p>
          </div>
          <div className="w-[35%] flex items-end gap-6 mt-4 justify-end">
            <div className="flex items-center gap-2">
              <span className="bg-green-600 text-white px-2 py-1 rounded-md flex items-center gap-1 text-sm font-semibold">
                4.1 <Star className="text-white w-4 h-4" />
              </span>
              <span className="Picturetext-[#E5E5CB]/50 text-sm">190 Grooming Ratings</span>
            </div>
            <div className="flex items-center  gap-2">
              <span className="bg-green-600 text-white px-2 py-1 rounded-md flex items-center gap-1 text-sm font-semibold">
                4.3 <Star className="text-white w-4 h-4" />
              </span>
              <span className="Picturetext-[#E5E5CB]/50 text-sm">416 Cleaning Ratings</span>
            </div>
          </div>    
      </div>

      <div className="flex w-full justify-between items-center">
      <div className="flex items-center gap-4 mt-2">
            <span className="text-green-600 font-semibold border border-green-600 px-2 py-1 rounded-full text-sm">
              Open now
            </span>
            <span className="text-[#E5E5CB]/50">12noon - 12midnight (Today)</span>
            <div className="flex items-center gap-2">
                <Phone className="text-[#E5E5CB] w-4 h-4" />
                <a href="tel:+917289991947" className="text-[#E5E5CB] font-semibold">
                  +91 999999999
                </a>
            </div>
          </div>

          
          {/* Action Buttons */}
          <div>
              <div className="flex gap-1 mt-4 pt-2 justify-between">
                <button className="flex items-center gap-2 border px-4 py-2 rounded-xl Picturetext-[#E5E5CB]/30 hover:bg-[#3C2A21]">
                  <MapPin className="text-[#E5E5CB] w-4 h-4" />
                  Direction
                </button>
                <button className="flex items-center gap-2 border px-4 py-2 rounded-xl Picturetext-[#E5E5CB]/30 hover:bg-[#3C2A21]">
                  <Share className="text-[#E5E5CB] w-4 h-4" />
                  Share
                </button>
                <button className="flex items-center gap-2 border px-4 py-2 rounded-xl Picturetext-[#E5E5CB]/30 hover:bg-[#3C2A21]">
                  <MessageCircle className="text-[#E5E5CB] w-4 h-4" />
                  Reviews
                </button>
                <button className="flex items-center gap-2 border px-4 py-2 rounded-xl 
                bg-[#3C2A21] hover:text-white text-[#E5E5CB]">
                  <CalendarCheck className="w-4 h-4" />
                  Book Appointment
                </button>
              </div>
          </div>
      </div>
    </div>
  );
}
