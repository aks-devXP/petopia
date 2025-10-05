import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import pawprint from "@assets/PetGuide/Home/yellow-pawprint.png";
import { CatSlider, DogSlider } from '@/Pages/admin/guide/components/BreedSlider';
import GuideCTA from '@/Pages/admin/guide/components/GuideCTA';
import Tips from '@/Pages/admin/guide/components/Tips';

const DesktopTop = () => {
  const isXlScreen = useMediaQuery({ minWidth: 1280 });
  const isLgScreen = useMediaQuery({ minWidth: 1024 });

  // Dynamic sizing based on screen width
  const getSliderSize = () => {
    if (isXlScreen) return { maxWidth: 'max-w-[450px]', scale: 1 };
    if (isLgScreen) return { maxWidth: 'max-w-[400px]', scale: 0.9 };
    return { maxWidth: 'max-w-[350px]', scale: 0.8 };
  };

  const { maxWidth, scale } = getSliderSize();

  return (
    <div className="bg-slate-900 rounded-md w-full overflow-hidden relative px-4 lg:px-6 pt-10">
      <div className="flex gap-4 lg:gap-6 h-screen max-h-[800px]">
        <div className="flex items-center">
          <div className={`transform scale-${Math.round(scale * 100)}`}>
            <DogSlider maxWidth={maxWidth} />
          </div>
        </div>

        <div className="flex-1 text-white flex flex-col justify-between">
          <div className="pl-6 lg:pl-8 flex justify-between items-start">
            <div>
              <h1 className={`font-bold mb-6 ${isXlScreen ? 'text-4xl' : isLgScreen ? 'text-3xl' : 'text-2xl'}`}>
                Paws & Personalities<br />Learn About Every <br />Breed
              </h1>
              <div className={`h-1 ${isXlScreen ? 'w-32' : 'w-24'} bg-amber-400 mb-6`}></div>
              
              <div className="mb-6">
                <button
                  className={`${isXlScreen ? 'text-4xl' : isLgScreen ? 'text-3xl' : 'text-2xl'} 
                    text-amber-400 font-bold hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400`}
                  onClick={() => window.scrollBy({ top: window.innerHeight + 200, behavior: "smooth" })}
                  aria-label="Scroll to more facts"
                >
                  Checkout More Facts
                </button>
              </div>
            </div>

            <img 
              src={pawprint} 
              className={`w-44 h-44 rotate-45 hidden xl:block mr-10 
                ${isXlScreen ? 'scale-100' : 'scale-75'}`} 
              alt="Paw print decoration" 
            />
          </div>

          <div className="flex justify-end p-4 items-start">
            <div className={`transform scale-${Math.round(scale * 100)}`}>
              <CatSlider maxWidth={maxWidth} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MobileTop = () => {
  return (
    <div className="bg-slate-900 rounded-md w-full overflow-hidden relative px-4">
      <div className="flex flex-col text-white space-y-6 pb-6">
        {/* <div className="flex items-center border border-white rounded-full p-1 w-full max-w-full bg-transparent mt-4 overflow-hidden">
          <PawSearchBar />
        </div> */}
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
      <div>

      <Tips petSelected={petSelected} setPetSelected={setPetSelected}/>
      </div>
    <div>
      <GuideCTA/>
    </div>
    </>
  );
};

export default DogCoatProductPage;