import React from 'react';

export const SvgBlob1 = () => (
    <svg id="sw-js-blob-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-[100%] h-[100%]">
      <defs>
        <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
          <stop id="stop1" stopColor="rgba(127, 177, 122, 1)" offset="0%"></stop>
          <stop id="stop2" stopColor="rgba(37, 172, 216, 1)" offset="100%"></stop>
        </linearGradient>
      </defs>
      <path
        fill="url(#sw-gradient)"
        d="M19.9,-33.3C23.9,-28.5,23.9,-19.7,24.6,-12.8C25.3,-5.9,26.8,-0.9,27.1,4.6C27.3,10,26.4,16,23.8,22.7C21.2,29.4,17.1,36.8,11.6,37.5C6.1,38.2,-0.8,32.3,-8.5,29.7C-16.2,27.1,-24.6,27.9,-31.2,24.6C-37.8,21.4,-42.6,14.1,-43.7,6.3C-44.8,-1.5,-42.2,-9.8,-38,-16.6C-33.7,-23.3,-27.6,-28.5,-21,-32.2C-14.4,-35.9,-7.2,-38.1,0.4,-38.6C8,-39.2,16,-38.2,19.9,-33.3Z"
        width="100%"
        height="100%"
        transform="translate(50 50)"
        strokeWidth="0"
        style={{ transition: '0.3s' }}
      />
    </svg>
  );
  
