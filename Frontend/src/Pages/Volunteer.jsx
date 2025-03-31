import React from "react";
import volunteer from "../assets/volunteer.jpg"

const Volunteer = () => {
  return (
    <div className="bg-gray-700 min-h-screen flex items-center justify-center p-10">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-gray-700">
        <div className="bg-white p-8 rounded-lg shadow-md w-full">
          <h2 className="text-3xl font-bold mb-6 text-black">Become a NGO volunteer today</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Jack Doe"
                className="p-3 border border-gray-300 rounded-md w-full bg-gray-100"
              />
              <input
                type="email"
                placeholder="Jackdoe@gmail.com"
                className="p-3 border border-gray-300 rounded-md w-full bg-gray-100"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Subject"
                className="p-3 border border-gray-300 rounded-md w-full bg-gray-100"
              />
              <div className="relative p-3 border border-gray-300 rounded-md w-full bg-gray-100 flex items-center">
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                />
                <span className="text-gray-500">Upload your CV</span>
                <span className="ml-auto text-gray-400">
                  📎
                </span>
              </div>
            </div>
            <textarea
              rows="4"
              placeholder="Comment (Optional)"
              className="p-3 border border-gray-300 rounded-md w-full bg-gray-100"
            />
            <button
              type="submit"
              className="w-full bg-gray-700 text-white py-3 rounded-md hover:bg-gray-800 transition"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Image and Info Section */}
        <div className="flex flex-col h-full items-center lg:items-start">
          <img
            src={volunteer}
            alt="Volunteer with dog"
            className="rounded-lg h-[70%] w-full mb-6 shadow-md"
          />
          <h3 className="text-2xl font-semibold mb-4">About Volunteering</h3>
          <p className="text-gray-300 leading-relaxed text-lg text-center lg:text-left">
            Become a volunteer today and make a difference in the lives of animals in need. 
            Help us with rescue operations, provide care and love to our furry friends, 
            and assist in organizing community awareness events. Your passion and dedication
            can bring joy and safety to many animals.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Volunteer;
