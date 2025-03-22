import React, { useState } from "react";
import TrainerBookingModal from "../Components/Trainer/TrainerBookingModal";

function TrainerBooking() {
  const [date, setDate] = useState(new Date()); // Default to today's date
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const tileDisabled = ({ date }) => {
    return date < new Date().setHours(0, 0, 0, 0); // Disable past dates
  };

  return (
    <div className="h-screen flex justify-center items-center bg-[#1A120B]">
      {/* Button to Open Modal */}
      <button 
        onClick={() => setIsModalOpen(true)} 
        className="px-6 py-3 text-c bg-[#3E2C2C] rounded-lg text-lg font-semibold shadow-lg hover:bg-[#553939] transition"
      >
        Open Trainer Booking
      </button>



              


      {/* Trainer Booking Modal */}
      {isModalOpen && (
        <TrainerBookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}

export default TrainerBooking;
