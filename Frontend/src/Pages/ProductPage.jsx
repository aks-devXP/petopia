import React from "react";
import { ShoppingCart, CreditCard } from "lucide-react";
export default function ProductPage() {
  return (
    <div className="h-screen w-full bg-[#1A120B] flex justify-center items-center pt-28 pb-4">
      {/* Left Section */}
      <div className="w-1/2 h-full flex flex-col items-center justify-center">
        <div className="w-[500px] h-[500px] bg-gray-200 rounded-lg flex items-center justify-center">
          <img src="" alt="Product" className="w-full h-full object-cover rounded-lg" />
        </div>
        <div className="flex gap-2 mt-4">
          <div className="w-14 h-14 bg-gray-300 rounded-lg"></div>
          <div className="w-14 h-14 bg-gray-300 rounded-lg"></div>
        </div>
      </div>

      <div className="h-[80%] w-[1px] bg-[#E5E5CB]/50"></div>

      {/* Right Section */}
      <div className="w-1/2 p-8">
        <h2 className="text-2xl font-semibold text-[#E5E5CB]">Fluted Contrast</h2>
        <p className="text-[#E5E5CB]/70 text-sm mt-1">Mug / 33 cl</p>
        <p className="text-[#E5E5CB]/80 mt-4">
          Fluted Contrast represents the perfect fusion between the aesthetic and the functional. The design is
          elegant and modern, created out of a deep respect for Royal Copenhagen history and traditions.
        </p>

        <div className="mt-4">
          <p className="text-[#E5E5CB] font-medium">Color Options</p>
          <div className="flex gap-2 mt-2">
            <span className="w-5 h-5 bg-blue-700 rounded-full border"></span>
            <span className="w-5 h-5 bg-red-500 rounded-full border"></span>
            <span className="w-5 h-5 bg-green-500 rounded-full border"></span>
            <span className="w-5 h-5 bg-yellow-400 rounded-full border"></span>
            <span className="w-5 h-5 bg-black rounded-full border"></span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div>
            <label className="text-[#E5E5CB] font-medium">Quantity</label>
            <select className="ml-2 border rounded p-1">
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
          <p className="text-lg font-bold text-[#E5E5CB]">INR 500</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center justify-center gap-2 mt-6 w-[60%] bg-[#3C2A21] text-[#E5E5CB] py-3 rounded-lg hover:bg-[#3C2A21]/80 transition">
            Buy Now
            <CreditCard className="w-5 h-5" />
          </button>
          <button className="flex items-center justify-center gap-2 mt-6 w-[40%] bg-[#3C2A21] text-[#E5E5CB] py-3 rounded-lg hover:bg-[#3C2A21]/80 transition">
            Add to Cart
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
