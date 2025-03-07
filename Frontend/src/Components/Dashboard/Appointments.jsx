import React from 'react';

const Table = () => {
  
  //sample
  const titles = ["ID", "Service", "Type", "Name", "Pet Name", "Breed", "Status", "Time", "Date", "View Details"];
  const rows = [
    ["#123456", "D", "Dog", "John Doe", "Buddy", "Labrador", "Active", "10:30 AM", "12 Mar, 2024", "🔍"],
    ["#654321", "T", "Cat", "Jane Smith", "Whiskers", "Persian", "Pending", "2:00 PM", "15 Apr, 2024", "🔍"],
    ["#987654", "D", "Bird", "Mike Johnson", "Tweety", "Parrot", "Completed", "5:45 PM", "20 May, 2024", "🔍"]
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-500 text-white";
      case "Active":
        return "bg-yellow-500 text-black";
      case "Pending":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className="w-full p-4">
      <div className="grid grid-cols-10 items-center bg-gray-200 p-3 font-bold text-gray-700 rounded-md">
        {titles.map((title, index) => (
          <div key={index} className="text-center">{title}</div>
        ))}
      </div>

      {/* Table Rows */}
      <div className="flex flex-col gap-2 mt-2">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-10 h-[100px] items-center bg-gray-100 text-black p-3 rounded-md shadow-sm">
            {row.map((cell, cellIndex) => (
              <div
                key={cellIndex}
                className={`text-center ${cellIndex === 6 ? `${getStatusClass(cell)} rounded-md text-center` : ""}`}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
