import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import pawprint from "../assets/PetGuide/Home/yellow-pawprint.png";
import { CatSlider, DogSlider } from '../Components/Guide/BreedSlider';
import PawSearchBar from '../Components/Guide/PawSearchBar';
import Tips from '../Components/Guide/Tips';

const DesktopTop = () =>{
  return(
    <div className="bg-slate-900 rounded-md w-full overflow-hidden relative px-4">

          {/* <header className="flex justify-center items-center mb-8">
            <div className="hidden md:flex space-x-6 text-white">
              <div className="flex items-center border border-white rounded-full p-1 w-96 bg-transparent mt-4">
                <PawSearchBar/>
              </div>
            </div>
          </header> */}

          <div className="flex gap-2 h-screen">
            <div className=''>
              <DogSlider/> 
            </div>

            <div className="flex-1 text-white flex flex-col">
              <div className='pl-8 flex justify-between'>
                <div>
                  <h1 className="text-4xl font-bold mb-6 ">
                    Paws & Personalities<br />Learn About Every <br />Breed
                  </h1>
                  <div className="h-1 w-32 bg-amber-400 mb-6"></div>
                  
                  <div className="mb-6">
                    <div className="text-amber-400 text-4xl font-bold hover:cursor-pointer"
                    onClick={() => window.scrollBy({ top: window.innerHeight + 200, behavior: "smooth" })}>
                      Checkout More Facts</div>
                  </div>
                </div>

                <img src={pawprint} className='w-44 h-44 rotate-45 hidden xl:block mr-10'/>
              </div>
              

              <div className='flex justify-end p-4 items-start'>
                <CatSlider/>
              </div>
            </div>
          </div>
        </div>
  )
}

const MobileTop = () => {
  return (
    <div className="bg-slate-900 rounded-md w-full overflow-hidden relative px-4">
      <div className="flex flex-col text-white space-y-6 pb-6">
        <div className="flex items-center border border-white rounded-full p-1 w-full max-w-full bg-transparent mt-4 overflow-hidden">
          <PawSearchBar />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-6 break-words">
            Paws & Personalities<br />Learn About Every <br />Breed
          </h1>
          <div className="h-1 w-32 bg-amber-400 mb-6"></div>
          
          <div className="mb-6">
            <div 
              className="text-amber-400 text-3xl md:text-4xl font-bold hover:cursor-pointer break-words"
              onClick={() => window.scrollBy({ top: window.innerHeight + 200, behavior: "smooth" })}
            >
              Checkout More Facts
            </div>
          </div>
        </div>

        <div className="w-full overflow-hidden">
          <CatSlider />
        </div>

        <div className="w-full overflow-hidden">
          <DogSlider />
        </div>
      </div>
    </div>
  )
}

const DogCoatProductPage = () => {

  const[petSelected, setPetSelected] = useState("Dogs");
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return (
    <>
      <div className={`${petSelected === "Dogs" ? "bg-amber-100" : "bg-purple-200"}  flex items-center justify-center p-1 pb-4`}>


      {isMobile ? <MobileTop/> : <DesktopTop />}
      </div>
      <Tips petSelected={petSelected} setPetSelected={setPetSelected}/>
      
    </>
  );
};

export default DogCoatProductPage;