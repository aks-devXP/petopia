import React, { useState, useEffect } from 'react';

import bombaycat from "@assets/PetGuide/Home/bombaycat.jpg";
import germanshepherd from "@assets/PetGuide/Home/germanshepherd.jpeg";
import goldenretriever from "@assets/PetGuide/Home/goldenretriever.jpg";
import indianpariah from "@assets/PetGuide/Home/indianpariah.jpg";
import labradorretriever from "@assets/PetGuide/Home/labradorretriever.webp";
import mainecoonJPG from "@assets/PetGuide/Home/mainecoon.jpg";
import mainecoonWEBP from "@assets/PetGuide/Home/mainecoon.webp";
import ragdoll from "@assets/PetGuide/Home/ragdoll.jpg";
import shihtzu from "@assets/PetGuide/Home/shihtzu.jpeg";
import siamese from "@assets/PetGuide/Home/siamese.jpg";
import spottedcatAVIF from "@assets/PetGuide/Home/spottedcat.avif";
import spottedcatJPEG from "@assets/PetGuide/Home/spottedcat.jpeg";

const dogBreeds = [
  { name: "German Shepherd", image: germanshepherd },
  { name: "Golden Retriever", image: goldenretriever },
  { name: "Labrador Retriever", image: labradorretriever },
  { name: "Indian Pariah", image: indianpariah },
  { name: "Shih Tzu", image: shihtzu }
];

const catBreeds = [
  { name: "Bombay Cat", image: bombaycat },
  { name: "Maine Coon", image: mainecoonJPG }, 
  { name: "Ragdoll", image: ragdoll },
  { name: "Siamese", image: siamese },
  { name: "Spotted Cat", image: spottedcatJPEG }
];

export function DogSlider() {
  const [currentDogIndex, setCurrentDogIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentDogIndex((prev) => (prev + 1) % dogBreeds.length);
        setIsTransitioning(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return ( 
    <div className="relative rounded-full overflow-hidden border-2 
    border-amber-400 aspect-[3/4] w-full max-w-md mx-auto">
      
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-3 z-10">
        {dogBreeds.map((_, index) => (
          <button 
            key={index} 
            className={`w-3 h-3 rounded-full transition-all duration-300 
                ${currentDogIndex === index ? 'bg-amber-400 scale-125' : 
                    'bg-white bg-opacity-60 hover:bg-opacity-80'}`}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentDogIndex(index);
                setIsTransitioning(false);
              }, 500);
            }}
          />
        ))}
      </div>
      
      <div className={`transition-all duration-500 
        ease-in-out h-full ${isTransitioning ? 'opacity-0 transform -translate-y-8' : 'opacity-100'}`}>
        <img 
          src={dogBreeds[currentDogIndex].image} 
          alt={dogBreeds[currentDogIndex].name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-1/2 right-[-50px] transform -translate-y-1/2 rotate-90">
          <div className="mt-16 bg-black bg-opacity-50 text-white rounded-full px-2 py-1 text-sm">
            {dogBreeds[currentDogIndex].name}
          </div>
        </div>
      </div>
    </div> 
  );
}

export function CatSlider() {
  const [currentCatIndex, setCurrentCatIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentCatIndex((prev) => (prev + 1) % catBreeds.length);
        setIsTransitioning(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative rounded-full overflow-hidden border-2 border-amber-400 aspect-[4/3] w-full max-w-[520px]">
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-x-3 z-10">
        {catBreeds.map((_, index) => (
          <button 
            key={index} 
            className={`w-3 h-3 rounded-full transition-all duration-300 
                ${currentCatIndex === index ? 'bg-amber-400 scale-125' : 
                    'bg-white bg-opacity-60 hover:bg-opacity-80'}`}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentCatIndex(index);
                setIsTransitioning(false);
              }, 500);
            }}
          />
        ))}
      </div>
      
      <div className={`transition-all duration-500 
        ease-in-out h-full ${isTransitioning ? 'opacity-0 transform -translate-x-8' : 'opacity-100'}`}>
        <img 
          src={catBreeds[currentCatIndex].image} 
          alt={catBreeds[currentCatIndex].name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-black bg-opacity-50 text-white rounded-full px-3 py-1 text-sm">
            {catBreeds[currentCatIndex].name}
          </div>
        </div>
      </div>
    </div>
  );
}
