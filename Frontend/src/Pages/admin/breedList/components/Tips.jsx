import React, { useState } from 'react'
import Training from "@assets/PetGuide/Home/training.png";
import Feeding from "@assets/PetGuide/Home/feeding.png";
import Grooming from "@assets/PetGuide/Home/grooming.png";
import { SvgBlob1 } from './SvgBlob1'
import { SvgBlob2 } from './SvgBlob2'
import { SvgBlob3 } from './SvgBlob3'
import Doggy from "@assets/PetGuide/Home/doggy.png";
import Cat from "@assets/PetGuide/Home/cat.png";
import PetToggle from './PetToggle';
import PetCareTips from './PetCareTips';

export default function Tips({ petSelected, setPetSelected }) {
  const [tipSelected, setTipSelected] = useState("Training");
  const handleSelect = (tip) => setTipSelected(tip);

  return (
    <div className={`w-full ${petSelected === "Dogs" ? "bg-app-bg" : "bg-purple-200"} min-h-screen flex flex-col lg:flex-row pt-16`}>

      <div className="lg:h-full w-full h-40 lg:gap-16 lg:w-1/5 flex lg:flex-col lg:justify-between lg:items-center text-ink-primary/70 font-bold text-2xl py-10">

        {/* Training */}
        <div className="relative w-full h-full flex justify-between items-center">
          {tipSelected === "Training" && (
            <div className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-200">
              <SvgBlob2 />
            </div>
          )}
          <div
            onClick={() => handleSelect("Training")}
            className={`z-10 relative flex flex-col items-center justify-center w/full h/full 
              ${tipSelected === "Training" ? "scale-110 text-ink-primary" : "hover:scale-[1.02]"} transition-transform duration-200 ease-in-out hover:cursor-pointer`}
            aria-selected={tipSelected === "Training"}
          >
            <img src={Training} alt="" className="max-w-[30%] max-h-[30%] object-contain" />
            <span>Training</span>
          </div>
        </div>

        {/* Grooming */}
        <div className="relative w-full h-full flex justify-center items-center ">
          {tipSelected === "Grooming" && (
            <div className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-200">
              <SvgBlob3 />
            </div>
          )}
          <div
            onClick={() => handleSelect("Grooming")}
            className={`z-10 relative flex flex-col items-center justify-center w/full h/full 
              ${tipSelected === "Grooming" ? "scale-105 text-ink-primary" : "hover:scale-110"} transition-transform duration-200 ease-in-out hover:cursor-pointer`}
            aria-selected={tipSelected === "Grooming"}
          >
            <img src={Grooming} alt="Grooming" className="max-w-[30%] max-h-[30%] object-contain" />
            <span>Grooming</span>
          </div>
        </div>

        {/* Feeding */}
        <div className="relative w-full h-full flex justify-center items-center">
          {tipSelected === "Feeding" && (
            <div className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-200">
              <SvgBlob1 />
            </div>
          )}
          <div
            onClick={() => handleSelect("Feeding")}
            className={`z-10 relative flex flex-col items-center justify-center w/full h/full 
              ${tipSelected === "Feeding" ? "scale-105 text-ink-primary" : "hover:scale-110"} transition-transform duration-200 ease-in-out hover:cursor-pointer`}
            aria-selected={tipSelected === "Feeding"}
          >
            <img src={Feeding} alt="Feeding" className="max-w-[30%] max-h-[30%] object-contain" />
            <span>Feeding</span>
          </div>
        </div>
      </div>

      <div className="lg:w-3/5 flex justify-center items-center w-full">
        <PetCareTips petSelected={petSelected} tipSelected={tipSelected} />
      </div>

      <div className="flex-1 flex items-center justify-center relative flex-col mt-4 lg:mt-0">
        <PetToggle setPetSelected={setPetSelected} petSelected={petSelected} />
        <img
          src={petSelected === "Dogs" ? Doggy : Cat}
          alt={petSelected === "Dogs" ? "Dog" : "Cat"}
          className="max-w-full lg:h-auto h-80 rounded-lg object-cover m-4"
        />
      </div>
    </div>
  );
}
