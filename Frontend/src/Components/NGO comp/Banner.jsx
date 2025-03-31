import React, { useEffect, useState } from 'react';
import banner_img from '../../assets/NGO/ngo_banner.jpg';


const Banner = () => {
  const [animalsSaved, setAnimalsSaved] = useState(0);
  const [ngosAffiliated, setNgosAffiliated] = useState(0);
  const finalAnimalsSaved = 5000; // Example number
  const finalNgosAffiliated = 150; // Example number

  useEffect(() => {
    // Animation for animals saved
    const interval1 = setInterval(() => {
      setAnimalsSaved(prev => {
        if (prev < finalAnimalsSaved) {
          return prev + Math.floor((finalAnimalsSaved - prev) / 10) + 1;
        } else {
          clearInterval(interval1);
          return finalAnimalsSaved;
        }
      });
    }, 50);

    // Animation for NGOs affiliated
    const interval2 = setInterval(() => {
      setNgosAffiliated(prev => {
        if (prev < finalNgosAffiliated) {
          return prev + Math.floor((finalNgosAffiliated - prev) / 10) + 1;
        } else {
          clearInterval(interval2);
          return finalNgosAffiliated;
        }
      });
    }, 50);

    // Cleanup function
    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, []);

  return (
    <div className="relative overflow-hidden h-screen w-full bg-cover bg-center" style={{ backgroundImage: `url(${banner_img})`}}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container relative z-10 mx-auto flex flex-col items-center justify-center h-full text-white text-center">
        <h1 className="text-4xl font-bold mb-4 ">
          Join Us in Making a Difference for Animals in Need
        </h1>
        <p className="text-xl mb-8 bg-clip-text text-transparent bg-[linear-gradient(90deg,_rgba(15,6,170,0.9710477941176471)_0%,_rgba(255,138,138,0.9150253851540616)_81%)] ">
          Your contribution can change lives. Help us bring new mornings and brighter tomorrows!
        </p>
        <div className="flex space-x-60">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold">{animalsSaved.toLocaleString()}</span>
            <span className="text-sm text-[#FFA24C]">Animals Saved</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold ">{ngosAffiliated.toLocaleString()}</span>
            <span className="text-sm text-[#FFA24C]">NGOs Affiliated</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;