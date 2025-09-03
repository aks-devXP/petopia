import React, { useEffect, useState } from 'react';
import { PawPrint } from 'lucide-react';

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
    <div className="relative overflow-hidden bg-cover bg-center h-96 bg-['https://via.placeholder.com/1500x500'] ">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container relative z-10 mx-auto flex flex-col items-center justify-center h-full text-white text-center">
        <h1 className="text-4xl font-bold mb-4">
          Join Us in Making a Difference for Animals in Need
        </h1>
        <p className="text-xl mb-8">
          Your contribution can change lives. Help us save stray and poor animals today!
        </p>
        <div className="flex space-x-8">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold">{animalsSaved.toLocaleString()}</span>
            <span className="text-sm">Animals Saved</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold">{ngosAffiliated.toLocaleString()}</span>
            <span className="text-sm">NGOs Affiliated</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;