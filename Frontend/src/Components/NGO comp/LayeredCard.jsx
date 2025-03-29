import React from 'react';

const LayeredCard = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Base card layer (always visible) */}
      <div className="relative transition-all duration-300 transform group hover:-translate-y-2">
        {/* Background layers that appear on hover */}
        <div className="absolute -top-4 -left-4 w-full h-full bg-indigo-700 opacity-0 rounded-lg transition-opacity duration-300 group-hover:opacity-20"></div>
        <div className="absolute -top-2 -left-2 w-full h-full bg-indigo-700 opacity-0 rounded-lg transition-opacity duration-300 group-hover:opacity-40"></div>
        
        {/* Main card */}
        <div className="relative bg-indigo-800 text-white p-12 rounded-lg shadow-lg transition-all duration-300 group-hover:bg-white group-hover:text-indigo-900">
          <h1 className="text-4xl font-bold mb-6">Join Us in Making a Difference for Pets</h1>
          <p className="text-lg mb-8">
            Together, we can provide a better future for pets in need. Join our cause and help us
            create a world where every pet is loved and cared for.
          </p>
          <div className="flex justify-end">
            <button className="bg-purple-400 hover:bg-purple-500 text-white px-6 py-2 rounded-lg transition-colors duration-300">
              Get Involved
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayeredCard;