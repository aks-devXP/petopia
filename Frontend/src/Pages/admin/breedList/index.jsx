import React, { useState } from 'react';
import BreedListTop from './components/BreedListTop'; 
import Tips from './components/Tips';

const BreedList = () => {
  const [petSelected, setPetSelected] = useState('Dogs');

  return (
    <div className="flex flex-col">
      {/* Top section with dynamic background */}
      <div
        className={`${
          petSelected === 'Dogs' ? 'bg-amber-100' : 'bg-purple-200'
        } flex flex-col items-center justify-center p-1 shadow-md`}
      >
        <BreedListTop />
      </div>

      {/* Tips Section */}
      <div>
        <Tips petSelected={petSelected} setPetSelected={setPetSelected} />
      </div>
    </div>
  );
};

export default BreedList;
