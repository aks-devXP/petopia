import React from "react";

import HomeScreenBG from "@assets/HomeScreen/homescreen-bg.jpg";
import MobileHomeScreenBG from "@assets/HomeScreen/mobilehomescreen-bg.jpg";
import Cat from "@assets/HomeScreen/cat.jpg";
import Dog from "@assets/HomeScreen/dog.jpg";
import Vet from "@assets/HomeScreen/vet.jpg";
import Groomer from "@assets/HomeScreen/groomer.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';


const DesktopHome = () => {
  return (
    <div>
{/* Top content */}
<div className="relative w-full bg-[#1A120B]">

  {/* Background Image */}
  <img 
    src={HomeScreenBG} 
    alt="background" 
    className="w-full h-auto object-cover"
  />

  {/* Foreground Content */}

    <div className="absolute inset-0 flex justify-end items-end">
      <div 
        className="
          text-black text-right
          max-w-[42%] md:max-w-[38%] lg:max-w-[34%]  /* ⬅️ CHANGED: Progressive width reduction for better scaling */
          mb-[1%] md:mb-[3%] lg:mb-[5%]  /* ⬅️ CHANGED: Increased bottom margins significantly to move text lower and avoid Petopia logo overlap */
          mr-[1%] md:mr-[2%] lg:mr-[4%]  /* ⬅️ CHANGED: Progressive right margins for consistent spacing */
        "
      >
        {/* Main heading with fluid typography */}
        <h1 
          className="font-fredoka mb-3 leading-tight"  /* ⬅️ CHANGED: Added fixed margin-bottom for consistent spacing */
          style={{ fontSize: "clamp(14px, 2vw, 32px)" }}  /* ⬅️ CHANGED: Replaced responsive classes with clamp() for smooth scaling from 14px to 32px */
        >
          Caring for Your Pet Made Simple!
        </h1>
        
        {/* Subtitle with fluid typography */}
        <p 
          className="font-bree mb-5 leading-relaxed"  /* ⬅️ CHANGED: Added fixed margin-bottom for consistent spacing */
          style={{ fontSize: "clamp(12px, 1.5vw, 20px)" }}  /* ⬅️ CHANGED: Replaced responsive classes with clamp() for smooth scaling from 12px to 20px */
        >
          Book trusted vets, find expert guidance, and shop for pet products effortlessly
        </p>
        
        {/* CTA Button with fluid scaling */}
        <button
          className="bg-black rounded-3xl text-white font-medium
                    hover:bg-gray-800 transition-all duration-300
                    origin-bottom-right"  /* ⬅️ CHANGED: Added transform origin for better scaling animation */
          style={{
            transform: "scale(clamp(0.6, 1vw + 0.5, 1))",  /* ⬅️ CHANGED: Fluid button scaling from 60% to 100% size */
            fontSize: "clamp(0.6rem, 1vw + 0.2rem, 1rem)", /* ⬅️ CHANGED: Fluid font size for button text */
            padding: "clamp(0.3rem, 1vw, 0.75rem) clamp(0.7rem, 2vw, 1.75rem)" /* ⬅️ CHANGED: Fluid padding that scales with viewport */
          }}
          onClick={() => window.scrollBy({ top: window.innerHeight + 60, behavior: "smooth" })}
        >
          Explore
        </button>
      </div>
    </div>
  </div>


      {/* Bottom Content */}
      <div className="h-screen w-full bg-[#1A120B] flex flex-col p-5 gap-5">

        {/* guide + news */}
        <div className="w-full flex justify-center gap-4 px-4">
          <div className="w-full h-[40vh] bg-gradient-to-b from-[#3C2A21] to-[#D5CEA3] rounded-xl flex">
            <div className="flex-1 p-4 flex flex-col justify-center text-right gap-5">
              <h1 className="font-fredoka text-[15px] lg:text-[25px]">
                A Happy Pet Starts with the Right Care
              </h1>
              <h1 className="font-grotesk text-[12px] lg:text-[20px]">
                A complete guide to pet care—from choosing the right food to understanding
                their behavior, get all the guidance you need
              </h1>
              <NavLink to="/dictionary" className="self-end">
                <button className="bg-black rounded-3xl px-4 py-2 text-white text-[15px]">
                  Start Learning
                </button>
              </NavLink>
            </div>

            <div className="flex items-center justify-center p-4 pr-0">
              <img 
                src={Cat} 
                className="max-h-full max-w-full rounded-xl transition-transform duration-300 hover:scale-105 hover:cursor-pointer" 
                alt="Cat" 
              />
            </div>
            <div className="flex items-center justify-center p-4">
              <img 
                src={Dog} 
                className="max-h-full max-w-full rounded-xl transition-transform duration-300 hover:scale-105 hover:cursor-pointer" 
                alt="Dog" 
              />
            </div>
          </div>

        </div>

        {/* vet + groomer */}

        <div className="w-full p-4 flex-1 flex gap-5">

          {/* Vet Section */}
          <NavLink to="/vet" className="w-1/2 flex-1 relative group overflow-hidden rounded-3xl">
            <div
              className="w-full h-full bg-black text-white p-4 flex items-center justify-center relative
                        transition-transform duration-300 group-hover:scale-105 cursor-pointer"
              style={{ backgroundImage: `url(${Vet})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>

              {/* Text on top */}
              <div className="relative flex flex-col justify-center items-center ">
                <h1 className="text-2xl font-bold">Medical Care</h1>
                <h1 className="text-md font-grotesk">Book trusted professionals for checkups, vaccinations, or emergency care</h1>
              </div>
            </div>
          </NavLink>

          {/* Groomer Section */}
          <NavLink to="/trainer" className="w-1/2 flex-1 relative group overflow-hidden rounded-3xl">
            <div
              className="w-full h-full bg-black text-white p-4 flex items-center justify-center relative
                        transition-transform duration-300 group-hover:scale-105 cursor-pointer"
              style={{ backgroundImage: `url(${Groomer})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>

              {/* Text on top */}
              <div className="relative flex flex-col justify-center items-center">
                <h1 className="text-2xl font-bold">Trainer & Groomer</h1>
                <h1 className="text-md font-grotesk text-center px-4">
                  Find top-rated trainers and groomers to help your pet stay well-behaved, healthy, and looking their best.
                </h1>
              </div>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

const MobileHome = () => {
  return (
    <div>
      {/* Top content */}
      <div className=" w-full bg-[#1A120B] ">

        {/* Background Image */}
        <div className="w-full h-full">
          <img 
            src={MobileHomeScreenBG} 
            alt="background" 
            className="w-full object-cover"
          />
        </div>

        {/* Foreground Content */}
        <div className="h-full">
        <div className="absolute flex justify-center flex-col items-center 
        top-[10%] h-[35%] text-black text-center space-y-2">
          <h1 className="font-fredoka text-[35px] leading-tight">
            Caring for Your Pet Made Simple!
          </h1>
          <h1 className="font-bree text-[20px] leading-normal">
            Book trusted vets, find expert guidance, and shop for pet products effortlessly
          </h1>
        </div>

        </div>
      </div>

      {/* Bottom Content */}
      <div className="min-h-screen w-full bg-[#1A120B] flex flex-col">
        {/* guide + news */}
        <div className="w-full flex justify-center gap-4 px-4 mt-5">
          <div className="w-full bg-gradient-to-b from-[#3C2A21] to-[#D5CEA3] rounded-xl flex flex-col">
            <div className="flex w-full">
              <div className="flex items-center justify-center p-4 pr-0">
                <img
                  src={Cat}
                  className="max-h-full max-w-full rounded-xl transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
                  alt="Cat"
                />
              </div>
              <div className="flex items-center justify-center p-4">
                <img
                  src={Dog}
                  className="max-h-full max-w-full rounded-xl transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
                  alt="Dog"
                />
              </div>
            </div>

            <div className="p-6 flex flex-col justify-center gap-6">
              <h1 className="font-fredoka text-[26px] leading-tight">
                A Happy Pet Starts with the Right Care
              </h1>
              <h1 className="font-grotesk text-[16px] leading-normal">
                A complete guide to pet care—from choosing the right food to understanding
                their behavior, get all the guidance you need
              </h1>
              <NavLink to="/dictionary" className="w-full">
                <button className="bg-black w-full rounded-3xl px-4 py-3 text-white text-[15px]">
                  Start Learning
                </button>
              </NavLink>
            </div>
          </div>
        </div>

        {/* vet + groomer */}
        <div className="w-full p-4 flex flex-col gap-5 pb-6">
          {/* Vet Section */}
          <NavLink to="/vet" className="w-full h-48 relative group overflow-hidden rounded-3xl">
            <div
              className="w-full h-full bg-black text-white p-4 flex items-center justify-center relative
                        transition-transform duration-300 group-hover:scale-105 cursor-pointer"
              style={{ backgroundImage: `url(${Vet})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>

              {/* Text on top */}
              <div className="relative flex flex-col justify-center items-center">
                <h1 className="text-2xl font-bold">Medical Care</h1>
                <h1 className="text-md font-grotesk">Book trusted professionals for checkups, vaccinations, or emergency care</h1>
              </div>
            </div>
          </NavLink>

          {/* Groomer Section */}
          <NavLink to="/trainer" className="w-full h-48 relative group overflow-hidden rounded-3xl">
            <div
              className="w-full h-full bg-black text-white p-4 flex items-center justify-center relative
                        transition-transform duration-300 group-hover:scale-105 cursor-pointer"
              style={{ backgroundImage: `url(${Groomer})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>

              {/* Text on top */}
              <div className="relative flex flex-col justify-center items-center">
                <h1 className="text-2xl font-bold">Trainer & Groomer</h1>
                <h1 className="text-md font-grotesk text-center px-4">
                  Find top-rated trainers and groomers to help your pet stay well-behaved, healthy, and looking their best.
                </h1>
              </div>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};



export default function HomePage() {
  const isMobile = useMediaQuery({ maxWidth: 700 });

  return isMobile ? <MobileHome /> : <DesktopHome />;
}


