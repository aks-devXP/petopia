import React, { useState } from 'react';
import { Heart, ShoppingBag, Search, User, ArrowUpRight, PawPrint, Dog } from 'lucide-react';
import PawSearchBar from '../Components/Guide/PawSearchBar';
import pawprint from "../assets/PetGuide/Home/yellow-pawprint.png"

import { CatSlider, DogSlider } from '../Components/Guide/BreedSlider';
import Tips from '../Components/Guide/Tips';
const DogCoatProductPage = () => {

  const[petSelected, setPetSelected] = useState("Dogs");
  
  return (
    <>
      <div className={`${petSelected === "Dogs" ? "bg-amber-100" : "bg-purple-200"} min-h-screen flex items-center justify-center p-1`}>
        <div className="bg-slate-900 rounded-md w-full overflow-hidden relative px-4">

          <header className="flex justify-center items-center mb-8">
            <div className="hidden md:flex space-x-6 text-white">
              <div className="flex items-center border border-white rounded-full p-1 w-96 bg-transparent mt-4">
                <PawSearchBar/>
              </div>
            </div>

          </header>

          <div className="flex gap-2 h-screen">
            <div className="relative ">
              <DogSlider/> 
            </div>

            <div className="flex-1 text-white">
              <div className='pl-8'>
                <h1 className="text-4xl font-bold mb-6">
                Paws & Personalities<br />Learn About Every <br />Breed
                </h1>
                <div className="h-1 w-32 bg-amber-400 mb-6"></div>
                
                <div className="mb-6">
                  <div className="text-amber-400 text-4xl font-bold hover:cursor-pointer"
                  onClick={() => window.scrollBy({ top: window.innerHeight + 200, behavior: "smooth" })}>
                    Checkout More Facts</div>
                </div>
              </div>
              <img src={pawprint} className='absolute w-52 right-8 top-8 rotate-45'/>

              <CatSlider/>
            </div>
          </div>
        </div>
      </div>
      
      <Tips petSelected={petSelected} setPetSelected={setPetSelected}/>
      
    </>
  );
};

export default DogCoatProductPage;