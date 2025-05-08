import React, { useRef, useState } from "react";
import backgroundimg from "../assets/trainerbg.jpg";
import CareTakerOptions from "../Components/PetServices/CareTakerOptions";
import GroomerOptions from "../Components/PetServices/GroomerOptions";
import TrainerOptions from "../Components/PetServices/TrainerOptions";

function PetServices() {
  const textOptions = {
    trainer: "Where pet parents find expert care and trusted trainers.",
    caretaker: "Loving care when you're not there.",
    groomer: "Pamper your pet with top-notch grooming."
  };

  const [selectedService, setSelectedService] = useState("trainer");

  // Refs for each section
  const trainerRef = useRef(null);
  const caretakerRef = useRef(null);
  const groomerRef = useRef(null);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    const sectionRef = {
      trainer: trainerRef,
      caretaker: caretakerRef,
      groomer: groomerRef
    }[service];

    sectionRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative overflow-hidden h-screen w-full">
        <div className="absolute inset-0 w-full h-full bg-black bg-opacity-70 z-4"></div>
        <img className="object-cover absolute inset-0 w-full h-full" src={backgroundimg} alt="Trainer Background" />

        <div className="absolute w-full h-full flex flex-col justify-center text-white z-5 md:pl-5 p-3 pt-10">
          {/* Button Group */}
          <div className="flex gap-5">
            {Object.entries(textOptions).map(([key, value]) => (
              <button
                key={key}
                onClick={() => handleServiceSelect(key)}
                className={`w-[180px] text-[22px] transition-all duration-300 py-2 rounded-md
                  ${selectedService === key
                    ? "font-bold bg-white text-black"
                    : "hover:border-b-4 hover:border-gray-400 hover:font-bold"}`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>

          {/* Centered Text */}
          <div className="md:max-w-[70%] md:mt-0 mt-4 h-[300px] flex items-center text-[50px] lg:text-[70px] leading-tight">
            {textOptions[selectedService]}
          </div>

          {/* Scroll to Services */}
          <div className="flex items-center justify-center mt-5 w-[200px] bg-transparent border-2
              border-white px-[15px] py-[10px]
              text-white cursor-pointer text-[16px] transition-all 
              duration-300 hover:bg-white hover:text-black">
            <button onClick={() => trainerRef.current.scrollIntoView({ behavior: "smooth" })}>
              Book Appointment
            </button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="w-full bg-[#1A120B]">
        <div ref={trainerRef}><TrainerOptions /></div>
        <div ref={caretakerRef}><CareTakerOptions /></div>
        <div ref={groomerRef}><GroomerOptions /></div>
      </div>
    </div>
  );
}

export default PetServices;
