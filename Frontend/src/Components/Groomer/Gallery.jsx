import React from "react";
import pic1 from "../../assets/Groomer/sample-1.jpeg";
import pic2 from "../../assets/Groomer/sample-2.jpg";
import pic3 from "../../assets/Groomer/sample-3.jpg";
import pic4 from "../../assets/Groomer/sample-4.jpg";

export default function PhotoGallery() {
  return (
    <div className="grid grid-cols-10 gap-2 w-full max-w-[95vw] mx-auto aspect-[10/4]">
      {/* Large Main Image */}
      <div className="col-span-6 row-span-4">
        <img src={pic1} alt="Main Image" className="w-full h-full object-cover rounded-lg aspect-[6/4]" />
      </div>

      <div className="flex flex-col col-span-2 row-span-4 gap-3">
          <div className="col-span-2 row-span-2">
            <img src={pic2} alt="Small Image 1" className="w-full h-full object-cover rounded-lg aspect-[1/1]" />
          </div>
          <div className="col-span-2 row-span-2">
            <img src={pic3} alt="Small Image 2" className="w-full h-full object-cover rounded-lg aspect-[1/1]" />
          </div>
      </div>


      <div className="col-span-2 row-span-4">
        <img src={pic4} alt="Tall Image" className="w-full h-full object-cover rounded-lg aspect-[2/4]" />
      </div>
    </div>
  );
}
