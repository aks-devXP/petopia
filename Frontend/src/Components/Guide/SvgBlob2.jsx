import React from 'react';

export const SvgBlob2 = () => (
    <svg id="sw-js-blob-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-[100%] h-[100%]">
      <defs>
        <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
          <stop id="stop1" stopColor="rgba(132.455, 152.459, 246.37, 1)" offset="0%"></stop>
          <stop id="stop2" stopColor="rgba(134.369, 199.618, 239.539, 1)" offset="100%"></stop>
        </linearGradient>
      </defs>
      <path
        fill="url(#sw-gradient)"
        d="M26.1,-27.9C33.4,-25,38.6,-16.4,39,-7.8C39.5,0.8,35.2,9.3,30.3,17.3C25.5,25.3,20.1,32.9,13.3,34.3C6.6,35.8,-1.5,31.2,-8.6,27.1C-15.7,23.1,-21.8,19.6,-26.1,14.1C-30.3,8.7,-32.7,1.2,-32,-6.1C-31.2,-13.4,-27.2,-20.6,-21.4,-23.8C-15.5,-27,-7.8,-26.2,0.8,-27.2C9.4,-28.1,18.8,-30.9,26.1,-27.9Z"
        width="100%"
        height="100%"
        transform="translate(50 50)"
        strokeWidth="0"
        style={{ transition: '0.3s' }}
      />
    </svg>
  );