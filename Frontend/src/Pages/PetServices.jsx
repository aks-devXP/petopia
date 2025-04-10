import { React, useState } from "react";
import { NavLink } from "react-router-dom";
import backgroundimg from "../assets/trainerbg.jpg";
import CareTakerOptions from "../Components/PetServices/CareTakerOptions";
import TrainerOptions from "../Components/PetServices/TrainerOptions";
import GroomerOptions from "../Components/PetServices/GroomerOptions";

function PetServices() {
  const textOptions = {
    trainer: "Where pet parents find expert care and trusted trainers.",
    caretaker: "Loving care when you're not there.",
    groomer: "Pamper your pet with top-notch grooming."
  };

  // Track the selected service type, not just the text
  const [selectedService, setSelectedService] = useState("trainer");

  // Function to handle service selection
  const handleServiceSelect = (service, text) => {
    setSelectedService(service);
  };

  return (
    <div>
      <div className="relative overflow-hidden h-screen w-full">
        <div className="absolute inset-0 w-full h-full bg-black bg-opacity-70 z-4"></div>

        <img className="object-cover absolute inset-0 w-full h-full" src={backgroundimg} alt="Trainer Background" />

        <div className="absolute w-full h-full flex flex-col justify-center text-white z-5 pl-5 pt-10">
          {/* Button Group */}
          <div className="flex gap-5">
            {Object.entries(textOptions).map(([key, value]) => (
              <button
                key={key}
                onClick={() => handleServiceSelect(key, value)}
                className={`w-[180px] text-[22px] transition-all duration-300 py-2 rounded-md
                  ${selectedService === key
                    ? "font-bold bg-white text-black "
                    : "hover:border-b-4 hover:border-gray-400 hover:font-bold"}`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>

          {/* Centered Text with Fixed Size */}
          <div className="max-w-[70%] h-[300px] flex items-center text-[50px] lg:text-[70px] leading-tight">
            {textOptions[selectedService]}
          </div>

          {/* Appointment Button */}
          <div className="flex items-center justify-center mt-5 w-[200px] bg-transparent border-2
            border-white px-[15px] py-[10px]
              text-white cursor-pointer text-[16px] transition-all 
              duration-300 hover:bg-white hover:text-black">
            <button
              onClick={() => window.scrollBy({ top: window.innerHeight + 80, behavior: "smooth" })}>
              Book Appointment
            </button>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#1A120B]">
        {selectedService === "trainer" && <TrainerOptions />}
        {selectedService === "caretaker" && <CareTakerOptions />}
        {selectedService === "groomer" && <GroomerOptions />}
      </div>
    </div>
  );
}

export default PetServices;