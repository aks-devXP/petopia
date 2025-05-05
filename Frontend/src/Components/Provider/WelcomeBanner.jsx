import React from 'react';

export default function WelcomeBanner({ Name, text }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 text-center w-full">
      <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-black/50">
        <img 
          src="https://snapynow.com/wp-content/uploads/2024/05/sad-boy-profile-dp_66.webp" 
          alt="Doctor profile" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome, {Name || "Dr. Aditya"}</h1>
      
      <p className="text-gray-600 flex items-center gap-1">
        {text}
      </p>
    </div>
  );
}