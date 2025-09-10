import React, { useState } from 'react'
import Training from "../../assets/PetGuide/Home/training.png";
import Feeding from "../../assets/PetGuide/Home/feeding.png";
import Grooming from "../../assets/PetGuide/Home/grooming.png";
import { SvgBlob1 } from './SvgBlob1'
import { SvgBlob2 } from './SvgBlob2'
import { SvgBlob3 } from './SvgBlob3'
import Doggy from "../../assets/PetGuide/Home/doggy.png";
import Cat from "../../assets/PetGuide/Home/cat.png";
import PetToggle from './PetToggle';
import PetCareTips from './PetCareTips';

export default function Tips({petSelected, setPetSelected}) {

  const[tipSelected, setTipSelected] = useState("Training");
  const handleSelect = (tip) => {
    setTipSelected(tip);
  };

  return (
    <div className={`w-full ${petSelected === "Dogs" ? "bg-amber-100" : "bg-purple-200"} min-h-screen flex flex-col lg:flex-row`}>

      <div className="lg:h-full w-full h-40 lg:gap-10 lg:w-1/5 flex lg:flex-col lg:justify-between lg:items-center text-black/70 font-bold text-xl py-10">
          {/* Training */}
          <div className="relative w-full h-full flex justify-center items-center">
            <div className="absolute inset-0 z-0">
              <SvgBlob1 />
            </div>
            <div
              onClick={() => handleSelect("Training")}
              className={`z-10 relative flex flex-col items-center justify-center w-full h-full 
                ${tipSelected === "Training" ? "scale-125 text-black" : "hover:scale-110"} transition-transform duration-300 ease-in-out hover:cursor-pointer`}
            >
              <img src={Training} alt="" className="max-w-[40%] max-h-[40%] object-contain" />
              <span>Training</span>
            </div>
          </div>

          {/* Grooming */}
          <div className="relative w-full h-full flex justify-center items-center">
            <div className="absolute inset-0 z-0">
              <SvgBlob2 />
            </div>
            <div
              onClick={() => handleSelect("Grooming")}
              className={`z-10 relative flex flex-col items-center justify-center w-full h-full 
                ${tipSelected === "Grooming" ? "scale-125 text-black" : "hover:scale-110"} transition-transform duration-300 ease-in-out hover:cursor-pointer`}
            >
              <img src={Grooming} alt="Your Image" className="max-w-[40%] max-h-[40%] object-contain" />
              <span>Grooming</span>
            </div>
          </div>

          {/* Feeding */}
          <div className="relative w-full h-full flex justify-center items-center">
            <div className="absolute inset-0 z-0">
              <SvgBlob3 />
            </div>
            <div
              onClick={() => handleSelect("Feeding")}
              className={`z-10 relative flex flex-col items-center justify-center w-full h-full 
                ${tipSelected === "Feeding" ? "scale-125 text-black" : "hover:scale-110"} transition-transform duration-300 ease-in-out hover:cursor-pointer`}
            >
              <img src={Feeding} alt="Your Image" className="max-w-[40%] max-h-[40%] object-contain" />
              <span>Feeding</span>
            </div>
          </div>
      </div>

      <div className="lg:w-3/5 flex justify-center items-center w-full">
        <PetCareTips petSelected={petSelected} tipSelected={tipSelected}/>
      </div>

      <div className="flex-1 flex items-center justify-center relative flex-col mt-4 lg:mt-0">
          <PetToggle setPetSelected={setPetSelected} petSelected={petSelected}/>
          <img 
            src={petSelected === "Dogs" ? Doggy : Cat}
            alt={petSelected === "Dogs" ? "Dog" : "Cat"}
            className="max-w-full lg:h-auto h-80 rounded-lg object-cover m-4"
          />
        </div>
      </div>
  )
}
