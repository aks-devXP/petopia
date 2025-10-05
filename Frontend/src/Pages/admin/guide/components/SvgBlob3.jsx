import React from 'react';

export const SvgBlob3 = () => (
    <svg id="sw-js-blob-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-[100%] h-[100%]">
      <defs>
        <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
          <stop id="stop1" stopColor="rgba(15, 23, 42, 1)" offset="0%"></stop>
          <stop id="stop2" stopColor="rgba(109, 66, 66, 1)" offset="100%"></stop>
        </linearGradient>
      </defs>
      <path
        fill="url(#sw-gradient)"
        d="M14.1,-23C18.1,-16.5,21.1,-12.2,23.2,-7.2C25.2,-2.2,26.3,3.3,27,11.1C27.7,18.8,27.9,28.7,23.3,31.8C18.7,34.9,9.4,31.2,0.5,30.6C-8.4,30,-16.9,32.4,-24.4,30.3C-31.8,28.1,-38.3,21.3,-40.8,13.3C-43.4,5.3,-42,-3.9,-38.1,-11.3C-34.2,-18.6,-27.8,-24,-21,-29.6C-14.2,-35.2,-7.1,-41.1,-1,-39.7C5.1,-38.3,10.1,-29.6,14.1,-23Z"
        width="100%"
        height="100%"
        transform="translate(50 50)"
        strokeWidth="0"
        style={{ transition: '0.3s' }}
      />
    </svg>
  );