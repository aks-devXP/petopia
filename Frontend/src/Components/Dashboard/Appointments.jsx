import React from "react";
import { Info } from "lucide-react";

// Google Material Icons with Proper Styling
const MaterialIcon = ({ name, size = 24, color = "#E5E5CB" }) => (
  <span
    className="material-symbols-outlined"
    style={{
      fontSize: size,
      display: "inline-flex",
      verticalAlign: "middle",
      color: color, // Set the icon color
    }}
  >
    {name}
  </span>
);

const Table = () => {
  const titles = [
    "ID",
    "Service",
    "Type",
    "Name",
    "Pet Name",
    "Breed",
    "Status",
    "Time",
    "Date",
    "View Details",
  ];
  const rows = [
    ["#123456", "D", "Dog", "John Doe", "Buddy", "Labrador", "Active", "10:30 AM", "12 Mar, 2024"],
    ["#654321", "T", "Cat", "Jane Smith", "Whiskers", "Persian", "Pending", "2:00 PM", "15 Apr, 2024"],
    ["#987654", "G", "Bird", "Mike Johnson", "Tweety", "Parrot", "Completed", "5:45 PM", "20 May, 2024"],
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-500/70 text-white";
      case "Active":
        return "bg-yellow-500/70 text-white";
      case "Pending":
        return "bg-red-500/70 text-white";
      default:
        return "bg-gray-300";
    }
  };

  // Function to replace "G", "D", "T" with respective icons
  const renderServiceIcon = (service) => {
    switch (service) {
      case "G":
        return <MaterialIcon name="content_cut"/>;
      case "D":
        return <MaterialIcon name="syringe" />;
      case "T":
        return <MaterialIcon name="sports" />;
      default:
        return service;
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-10 items-center p-3 font-bold text-[#E5E5CB]/50 rounded-md">
        {titles.map((title, index) => (
          <div key={index} className="text-center">
            {title}
          </div>
        ))}
      </div>

      {/* Table Rows */}
      <div className="flex flex-col gap-2 mt-2">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="grid grid-cols-10 h-[100px] items-center bg-[#3C2A21]/50 text-[#E5E5CB] p-3 rounded-3xl shadow-sm"
          >
            {row.map((cell, cellIndex) => (
              <div
              key={cellIndex}
              className={`text-center flex items-center justify-center ${
                cellIndex === 6 ? `${getStatusClass(cell)} flex justify-center items-center px-3 py-[2px] rounded-full text-[14px]` : ""
              }`}
            >
              {cellIndex === 6 ? <span className="inline-block">{cell}</span> : cell}
            </div>
            
            ))}
            {/* Info Icon for "View Details" Column */}
            <div className="text-center flex items-center justify-center cursor-pointer hover:">
              <div className="aspect-square h-full p-2 hover:bg-[#3C2A21] rounded-full">
                <Info size={24} color="#E5E5CB" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
