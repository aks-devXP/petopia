import React from "react";
import { CalendarCheck, PhoneCall, Heart } from "lucide-react";

const VetCareInfo = () => {
  return (
    <div className="bg-sand-light w-full h-full py-12">
      <div className="max-w-7xl h-full mx-auto flex flex-col md:flex-row items-center px-4">
        {/* Left Section - Mobile Screen */}
        <div className="w-full h-screen flex items-center md:w-1/2 md:mb-0">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Katz1.jpg"
            alt="Veterinary Treating a Pet"
            className="w-full h-[80%] object-cover max-w-md mx-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Right Section - Info Text */}
        <div className="w-full md:w-1/2 text-left">
          <h2 className="text-3xl font-bold text-[#0f2747] leading-tight mb-4">
            Get better vet care & meet with a vet in just minutes
          </h2>
          <p className="text-lg text-gray-600 mb-6">Getting started is as easy as 1-2-3.</p>

          <button className="bg-pink-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-pink-600 mb-6">
            Talk to a vet
          </button>

          {/* Steps */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-10 h-10 bg-[#0f2747] text-white rounded-full">
                1
              </div>
              <div className="w-[80%]">
                <h4 className="text-lg font-semibold text-[#0f2747]">Choose your vet</h4>
                <p className="text-gray-600">
                  Browse top-ranked vets near you and choose the best vet for your pet.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-10 h-10 bg-[#0f2747] text-white rounded-full">
                2
              </div>
              <div className="w-[80%]">
                <h4 className="text-lg font-semibold text-[#0f2747]">Book an appointment</h4>
                <p className="text-gray-600">
                  Pick a time with your vet and get the care your pet needs, today.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-10 h-10 bg-[#0f2747] text-white rounded-full">
                3
              </div>
              <div className="w-[80%]">
                <h4 className="text-lg font-semibold text-[#0f2747]">Get personalised care</h4>
                <p className="text-gray-600">
                  Get answers you need for your pet, including general advice, dietary constraints, and second opinions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VetCareInfo;
