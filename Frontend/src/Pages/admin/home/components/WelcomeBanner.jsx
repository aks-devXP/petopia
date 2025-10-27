import React from "react";
import HomeScreenBG from "@assets/dashboard/background3.jpeg";

export default function WelcomeBanner({ username = "Friend" }) {
  return (
    <div className="w-full">
      {/* Responsive outer padding: tighter on small screens */}
      <div className="w-full px-3 sm:px-4 md:px-8 lg:px-10 xl:px-12">
        {/* Fixed-height, overflow-hidden frame so sides crop symmetrically */}
        <div
          className="relative overflow-hidden rounded-b-3xl
                     h-[42vh] sm:h-[40vh] md:h-[40vh] lg:h-[44vh]"
        >
          {/* Image centered; keep height stable, crop L/R as width overflows */}
          <img
            src={HomeScreenBG}
            alt="Petopia home background"
            className="absolute top-0 left-1/2 -translate-x-1/2
                       h-full w-auto min-w-full max-w-none object-cover object-center"
            draggable="false"
          />

          {/* Gradient overlay: transparent → black, top → bottom */}
          <div
            className="absolute inset-0 rounded-b-3xl
                       bg-gradient-to-b from-transparent via-black/50 to-black"
            aria-hidden="true"
          />

          {/* Bottom-centered text over overlay */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center">
            <h1
              className="text-white text-center font-bold
                         text-xl sm:text-2xl md:text-3xl lg:text-4xl
                         pb-4 sm:pb-5 md:pb-6"
            >
              Hey, {username}! Welcome Back
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
