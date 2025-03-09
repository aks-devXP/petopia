import React from "react";
import { Clock, Stethoscope } from "lucide-react";

const History = () => {

  //month map
  const monthMap = {
    "01": "January", "02": "February", "03": "March", "04": "April", "05": "May",
    "06": "June", "07": "July", "08": "August", "09": "September", "10": "October",
    "11": "November", "12": "December"
  };

  const rows = [
    ["Tue", "10", "03", "2024", "1:00 PM", "Dr. Lee", "Max", "Beagle", "#234"],
    ["Mon", "04", "03", "2024", "10:00 AM", "Dr. Smith", "Buddy", "Labrador", "#123"],
    ["Wed", "15", "04", "2024", "2:30 PM", "Dr. Brown", "Whiskers", "Persian", "#456"],
    ["Fri", "26", "05", "2024", "6:45 PM", "Dr. Johnson", "Tweety", "Parrot", "#789"],
    ["Sat", "12", "03", "2023", "11:00 AM", "Dr. Adams", "Charlie", "Poodle", "#555"]
  ];

  // Sort rows by Year (desc), then Month (desc), then Date (desc)
  const sortedRows = [...rows].sort((a, b) => {
    const [dayA, dateA, monthA, yearA] = a;
    const [dayB, dateB, monthB, yearB] = b;
    return (
      parseInt(yearB) - parseInt(yearA) ||  // Sort by Year
      parseInt(monthB) - parseInt(monthA) || // Then by Month
      parseInt(dateB) - parseInt(dateA) // Then by Date
    );
  });

  // Group by Year and Month
  const groupedByYearMonth = sortedRows.reduce((acc, row) => {
    const [day, date, month, year] = row;
    const key = `${year}-${month}`; // "2024-03", "2023-03"

    if (!acc[key]) acc[key] = [];
    acc[key].push(row);
    return acc;
  }, {});

  return (
    <div className="w-full pt-4 bg-[#3d4143] p-4 rounded-lg">
      {Object.keys(groupedByYearMonth).map((key) => {
        const [year, month] = key.split("-");

        return (
          <div key={key} className="mb-8">
            {/* Month & Year Header */}
            <div className="border-b-2 mb-4 text-white font-bold text-lg">
              {monthMap[month]} {year}
            </div>

            {/* Rows for that Month */}
            {groupedByYearMonth[key].map((row, index) => (
              <div key={index} className="flex items-center h-[120px] bg-[#656c70] text-white p-1 rounded-md shadow-sm mt-2">
                {/* Day & Date */}
                <div className="h-full aspect-square text-center p-2 items-center justify-center">
                  <div className="flex h-[60%] uppercase text-3xl items-center justify-center">{row[0]}</div>
                  <div className="flex items-center justify-center h-[40%] text-xl">{row[1]}</div>
                </div>

                <div class="w-[1.5px] h-20 bg-gray-700"></div>
                
                {/* Time & Doctor Name */}
                <div className=" h-full flex-1 flex flex-col gap-3 justify-center p-2 pl-5">
                  {/* Time with Clock Icon */}
                  <div className="text-sm flex items-center gap-2">
                    <Clock size={16} className="text-gray-400" />
                    {row[4]}
                  </div>

                  {/* Doctor Name with Stethoscope Icon */}
                  <div className="text-sm flex items-center gap-2">
                    <Stethoscope size={16} className="text-gray-400" />
                    {row[5]}
                  </div>
                </div>

                {/* Pet Name & Breed */}
                <div className=" h-full flex-1 gap-1 flex flex-col justify-center p-2">
                  <div className="text-3xl">{row[6]}</div>
                  <div className="text-">{row[7]}</div>
                </div>

                {/* ID */}
                <div className="h-full flex items-center justify-center px-4">
                  ID: {row[8]}
                </div>

                {/* View Details Button */}
                <div className="h-full flex items-center justify-center px-4">
                  <button className="bg-black px-3 py-1 rounded text-white">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default History;