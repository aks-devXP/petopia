import React, { useState } from "react";
import TrainerBookingModal from "./TrainerBookingModal";
import { Diamond, Bronze, Silver, Gold } from "./Ranking";
import Akash from "../../assets/Trainer/akash.png";


function TrainerBooking() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#1A120B] text-white p-10">
      {/* Top Rated Trainer Section */}
      <p className="text-3xl font-bold mb-5">Top Rated Trainer</p>

      {/* Profile + Reviews Section */}
      <div className="flex gap-5 mb-10">
        <div 
          className="w-[400px] h-[230px] bg-[#3C2A21]
          rounded-xl flex p-4
          cursor-pointer transition-all duration-300 hover:bg-[#3C2A21]/80"
          onClick={() => setIsModalOpen(true)}
        >
          <div class="flex flex-col items-center justify-center py-1 w-[40%]">
            <img src={Akash} alt="Profile Image" 
            class="w-32 h-32 rounded-full object-cover shadow-md"/>
            <div class="mt-[-20px] bg-[#E5E5CB] px-3 py-1 rounded-lg shadow-md text-sm font-semibold flex items-center gap-1">
              <Bronze className="w-4 h-4"/>
              <span className="text-[#1A120B]">Bronze</span>
            </div>
            <div className="text-[#E5E5CB] mt-2 text-[18px]">Akash Kumar</div>

          </div>
          <div className="w-[60%] h-full text-[#E5E5CB] flex flex-col justify-center pl-2">


            {/* Stats */}
            <div className="pr-2">
              {/* Row 1 */}
              <div className="w-full flex justify-between text-center">
                <div>
                  <p className="text-[16px] font-bold">400+</p>
                  <p className="text-sm opacity-60">Trained</p>
                </div>
                <div>
                  <p className="text-[16px] font-bold">★4.8</p>
                  <p className="text-sm opacity-60">Rating</p>
                </div>
                <div>
                  <p className="text-[16px] font-bold">1.7</p>
                  <p className="text-sm opacity-60">Years</p>
                </div>
              </div>

              {/* Row 2 (Training Services) */}
              <div className="flex flex-wrap justify-between mt-4 text-center">
                <p className="text-sm opacity-60 bg-[#3a2f23] rounded-md">
                  Protection Training
                </p>
                <p className="text-sm opacity-60 bg-[#3a2f23] py-1 rounded-md">
                  Socialization Training
                </p>
                <p className="text-sm opacity-60 bg-[#3a2f23] rounded-md">
                  Leash Training
                </p>
              </div>
            </div>
            <div className="text-[26px] font-bold mt-4">
              ₹400<span className="text-[18px] font-normal">/hr</span>
            </div>


          </div>


        </div>
        <div className="w-[300px] flex flex-1 border-white border rounded-md items-center justify-center">
          A few reviews of this profile service
        </div>
      </div>

      {/* Other Profiles Section */}
      <p className="text-3xl font-bold mb-5">Other Trainers</p>
      <div className="grid grid-cols-4 gap-5">
        {Array(4).fill().map((_, index) => (
          <div 
            key={index}
            className="w-[300px] h-[220px] border-white border rounded-md flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition-all duration-300"
            onClick={() => setIsModalOpen(true)}
          >
            Profile with rating
          </div>
        ))}
      </div>

      {/* Trainer Booking Modal */}
      {isModalOpen && (
        <TrainerBookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}

export default TrainerBooking;
