import React from "react";
import Head from "../Components/Groomer/Head";
import PhotoGallery from "../Components/Groomer/Gallery";
import PriceList from "../Components/Groomer/PriceList";
import ReviewSection from "../Components/Groomer/ReviewSection";

export default function GroomerBook() {
  return (
    <div className="w-full bg-[#1A120B]">

      <div className="h-[4vh]"></div>

      <div className="w-full flex items-center justify-center sticky top-0 z-10 shadow-md bg-[#1A120B]">
        <Head/>
      </div>
      <div className="p-4 w-full flex items-center gap-2 pt-16">
        <div className="w-[65%]"><PhotoGallery/></div>
        <div className="w-[35%] h-full"> <PriceList/></div>
      </div>
      <div className="flex">
        <div className="p-4 w-full flex items-end justify-end gap-2 text-black">
          <ReviewSection/>
        </div>
      </div>
    </div>
  );
}
