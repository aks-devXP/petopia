import React from 'react';
import { useEffect, useState } from 'react';

const Slider = ({doctors}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const duplicateData = [...doctors];

  // Auto-scrolling functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        (prevIndex + 1) % (duplicateData.length - 5)); // Loop back to the start
    }, 2000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [duplicateData.length]);

  const imageWidth = 300/duplicateData.length;
  
  return (
    <>
    <div className="relative overflow-hidden w-full bg-white py-4">
      <div
        className="flex gap-4 transition-transform ease-in-out duration-500"
        style={{ transform: `translateX(-${currentIndex * imageWidth}%)` }}
      >
        {doctors.map((slide, index) => (
            <div className='w-[300px] flex-shrink-0 h-[300px] bg-slate-400 rounded-3xl p-2 mx-1'>
              <div className='w-[50%] h-[50%] mb-3'>
                <img
                  className="w-full h-full rounded-full object-cover"
                  src={slide.imageUrl}
                  alt={`Slide ${index}`}
                />
              </div>
              <div className='text-white'>
                <p className='text-black font-bold'>Debijit Chowdhury</p>
                <p className='text-black font-bold'>Qualification: <span>BVSc, MVSc</span> </p>
                <p className='text-black font-bold'>Experience: <span>6 Years</span></p>
                <p className='text-black font-bold'>Rating: 4.2</p>
              </div>
            </div>
        ))}
      </div>
      </div>
    </>
  )
}

export default Slider