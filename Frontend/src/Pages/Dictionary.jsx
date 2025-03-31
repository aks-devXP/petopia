import React from 'react';
import { Heart, ShoppingBag, Search, User, ArrowUpRight, PawPrint, Dog } from 'lucide-react';
import PawSearchBar from '../Components/Guide/PawSearchBar';
import GermanShephard from '../assets/PetGuide/germanShepherd.png'
import Cat1 from '../assets/PetGuide/cat1.jpg'
import Cat2 from '../assets/PetGuide/cat2.jpg'
import Dog3 from '../assets/PetGuide/dog3.png'
import Dog2 from '../assets/PetGuide/dog1.webp'
const DogCoatProductPage = () => {
  return (
    <>
      <div className="bg-amber-100 min-h-screen flex items-center justify-center p-2">
        <div className="bg-slate-900 rounded-md w-full overflow-hidden relative px-4">

          <header className="flex justify-between items-center mb-8">
            <div className="text-amber-200 text-2xl font-semibold">Explore Pet Breeds</div>
            <div className="hidden md:flex space-x-6 text-white">
              <div className="flex items-center border border-white rounded-full p-1 w-96 bg-transparent mt-4">
                <PawSearchBar/>
              </div>
            </div>
            <div> SOME ICON </div>
          </header>

          <div className="flex gap-2 h-screen">
            <div className="relative ">
              <div className="relative rounded-full overflow-hidden border-2 border-amber-400 aspect-[3/4] max-w-md mx-auto">
                <img 
                  src={Dog2} 
                  alt="dog" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-1/2 right-[-50px] transform -translate-y-1/2 rotate-90">
                  <div className="text tracking-widest text-black text-xl">German Shepherd</div>
                </div>
              </div> 
            </div>

            <div className="flex-1 text-white">
              <div className='pl-8'>
                <h1 className="text-4xl font-bold mb-6">
                Paws & Personalities<br />Learn About Every <br />Dog Breed
                </h1>
                <div className="h-1 w-32 bg-amber-400 mb-6"></div>
                
                <div className="mb-6">
                  <div className="text-amber-400 text-4xl font-bold">Checkout More</div>
                </div>
              </div>
              

              <div className="relative mt-1">
                <div className="rounded-full overflow-hidden border-2 border-amber-400 w-[500px] h-96 absolute right-8 ">
                  <img 
                    src={Cat2} 
                    alt="cat" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute right-56 bottom-[-59px] text-xl text-black">
                  Persian Cat
                </div>
              </div>
            </div>
          </div>

          {/* Bottom thumbnails */}

        </div>
      </div>

      <div className='flex gap-2 min-h-screen w-full p-4 px-2'>
        <div className='flex gap-2'>
          <div className='bg-white w-72'>
          </div>
          <div className='bg-white w-72'>
          
          </div>
        </div>
        <div className='bg-white flex-1'>

        </div>
      </div>
    </>
  );
};

export default DogCoatProductPage;