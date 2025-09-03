import React from 'react';
import paw from '@assets/Paw_Print.svg';

const Rating = ({ a }) => {
  return (
    <div className=" h-[40px] w-[200px] flex items-center">
      {Array.from({ length: a }).map((_, i) => (
        <img key={i} src={paw} alt="paw print" className="h-full m-[6px]" />
      ))}
    </div>
  );
};

export default Rating;
