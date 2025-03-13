import React, { useState } from "react";
import { CalendarCheck, ShoppingBag, ClipboardPlus } from "lucide-react";
import Appointment from "../Dashboard/Appointments"
import MedicalHistory from "../Dashboard/History"

export default function HistoryOptions() {
  const [selectedOption, setSelectedOption] = useState("appointments");

  return (
    <div className="flex h-full w-full">
      {/* Left Panel */}
      <div className="w-[20%] text-[#E5E5CB] p-4 pl-0 mt-10 flex flex-col gap-5">
        <div
          className={`flex items-center gap-2 p-3 rounded-xl cursor-pointer ${
            selectedOption === "appointments" ? "bg-[#3C2A21]" : ""
          }`}
          onClick={() => setSelectedOption("appointments")}
        >
          <CalendarCheck size={20} />
          <p>My Appointments</p>
        </div>

        <div
          className={`flex items-center gap-2 p-3 rounded-xl cursor-pointer ${
            selectedOption === "purchase" ? "bg-[#3C2A21]" : ""
          }`}
          onClick={() => setSelectedOption("purchase")}
        >
          <ShoppingBag size={20} color="#E5E5CB"/>
          <p>Purchase History</p>
        </div>

        <div
          className={`flex items-center gap-2 p-3 rounded-xl cursor-pointer ${
            selectedOption === "records" ? "bg-[#3C2A21]" : ""
          }`}
          onClick={() => setSelectedOption("records")}
        >
          <ClipboardPlus size={20} />
          <p>Medical Records</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-[80%] text-[#E5E5CB] mt-10 p-6 border-l border-[#E5E5CB]/30 overflow-y-auto">
        {selectedOption === "appointments" ? (
          <div>
            <h2 className="text-2xl font-semibold mb-6">My Appointments</h2>
            <Appointment/>
          </div>
        ) : selectedOption === "purchase" ? (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Purchase History</h2>
            <p>Track your purchases, invoices, and order details here.</p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Medical Records</h2>
            <MedicalHistory/>
          </div>
        )}
      </div>
    </div>
  );
}
