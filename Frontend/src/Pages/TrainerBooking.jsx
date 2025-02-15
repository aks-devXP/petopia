import React, { useState } from "react";
import Calendar from "react-calendar";
import './CustomCalendar.css'

function TrainerBooking() {
  const [date, setDate] = useState(new Date()); // Default to today's date

  const tileDisabled = ({ date }) => {
    return date < new Date().setHours(0, 0, 0, 0); // Disable past dates
  };
  
  const [isAM, setIsAM] = useState(true); //toggle switch

  return (
    <div className="h-screen flex bg-[#FFF8E8] gap-2">

      {/* Left Section */}
      <div className="w-[44%] pl-3 py-10">
        <div className="bg-[#664343d3] w-full rounded-[30px] p-5">
          
          <div className="flex mb-5">
            <div className="w-[180px] h-[190px] bg-white rounded-[20px] mr-5 text-black">
              Profile pic
            </div>
            <div className="flex-1 h-[190px] bg-black rounded-[20px]">
              Name and basic info
            </div>
          </div>

          <div className="w-full bg-white rounded-[20px] flex-grow text-black h-[225px]">
            Details
          </div>

        </div>
      </div>


      {/* Right Section */}
      <div className="w-[55%]">
        <div className="w-full h-[580px] py-6 flex flex-row">
          <div className="w-[75%] h-full p-4 rounded-lg">
            <Calendar
              className="react-calendar w-full h-full"
              onChange={setDate}
              value={date}
              minDate={new Date()} // Prevent past dates selection
              tileDisabled={tileDisabled}
            />
          </div>

          <div className="w-[25%] h-full p-4 rounded-lg flex flex-col items-center space-y-3">
              <div className="w-full flex justify-center items-center space-x-3">
                <span className={isAM ? "font-bold text-[#254336]" : "text-[#6B8A7A]"}>AM</span>
                <div
                  className={`w-12 h-6 flex items-center bg-[#3B3030] rounded-full p-1 cursor-pointer transition duration-300 ${
                    isAM ? "justify-start" : "justify-end bg-blue-500"
                  }`}
                  onClick={() => setIsAM(!isAM)}
                >
                  <div className="w-5 h-5 bg-white rounded-full shadow-md"></div>
                </div>
                <span className={!isAM ? "font-bold text-[#254336]" : "text-[#6B8A7A]"}>PM</span>
              </div>

              <div className="flex-1 flex flex-col space-y-2">
                <button className="w-32 flex-1 bg-[#664343d3] text-white rounded-md">12-2</button>
                <button className="w-32 flex-1 bg-[#664343d3] text-white rounded-md">2-4</button>
                <button className="w-32 flex-1 bg-[#664343d3] text-white rounded-md">4-6</button>
                <button className="w-32 flex-1 bg-[#664343d3] text-white rounded-md">6-8</button>
                <button className="w-32 flex-1 bg-[#664343d3] text-white rounded-md">8-10</button>
                <button className="w-32 flex-1 bg-[#664343d3] text-white rounded-md">10-12</button>
                <button className="w-32 flex-1 bg-[#686565a1] text-white rounded-md">Book Appointment</button>
              </div>

            </div>
        </div>
      </div>
    </div>
  );
}

export default TrainerBooking;
