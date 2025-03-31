import React from "react";

const BasicHero = ({ imageSrc, title, description, buttonText, imageLeft, bgColor }) => {
  return (
    <div className={`${bgColor ? `bg-[${bgColor}]` : "bg-[#C2F7F0]"} h-full flex flex-col md:flex-row items-center justify-between gap-10 p-10 rounded-lg`}>
      {/* Content on the left or right depending on imageLeft */}

      {!imageLeft && (
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-4xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-700 text-lg">{description}</p>
          {/* <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800">
            {buttonText}
          </button> */}
        </div>
      )}

      {/* Image Section */}
      <div
        className={`md:w-1/2 flex justify-center h-[80%]`}
      >
        <img
          src={imageSrc}
          alt="Hero"
          className="w-full h-full rounded-3xl shadow-lg max-w-md"
        />
      </div>

      {/* Content for imageLeft */}
      {imageLeft && (
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-4xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-700 text-lg">{description}</p>
          {/* <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800">
            {buttonText}
          </button> */}
        </div>
      )}
    </div>
  );
};

export default BasicHero;
