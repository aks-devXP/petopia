import React, { useState, useEffect } from "react";
import { MoreVertical, User, Stethoscope, Scissors, Dumbbell, SlidersHorizontal, CheckSquare } from "lucide-react";

const Table = () => {
  const titles = [
    "Service",
    "Pet Owner",
    "Pet Name",
    "Date & Time",
    "Status",
    "" 
  ];
  
  const initialRows = [
    ["doctor", "John Doe", "Buddy", { date: "12 Mar, 2024", time: "10:30 AM" }, "Upcoming"],
    ["groomer", "Jane Smith", "Whiskers", { date: "15 Apr, 2024", time: "2:00 PM" }, "On Hold"],
    ["trainer", "Mike Johnson", "Tweety", { date: "20 May, 2024", time: "5:45 PM" }, "Completed"],
    ["caretaker", "Sarah Williams", "Max", { date: "5 Jun, 2024", time: "1:15 PM" }, "Upcoming"],
    ["doctor", "Alex Chen", "Rocky", { date: "22 Mar, 2024", time: "9:00 AM" }, "On Hold"],
    ["groomer", "Emily Davis", "Luna", { date: "10 Apr, 2024", time: "3:30 PM" }, "Completed"],
  ];

  const [rows, setRows] = useState(initialRows);
  const [showIncompleteOnly, setShowIncompleteOnly] = useState(false);
  
  // Sort and filter rows whenever the filter changes
  useEffect(() => {
    let sortedRows = [...initialRows];
    
    // Sort by status priority (Upcoming first, then On Hold, then Completed)
    sortedRows.sort((a, b) => {
      const statusOrder = { "Upcoming": 1, "On Hold": 2, "Completed": 3 };
      return statusOrder[a[4]] - statusOrder[b[4]];
    });
    
    // Filter incomplete if checkbox is checked
    if (showIncompleteOnly) {
      sortedRows = sortedRows.filter(row => row[4] !== "Completed");
    }
    
    setRows(sortedRows);
  }, [showIncompleteOnly]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-500";
      case "Upcoming":
        return "bg-blue-500";
      case "On Hold":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusTextClass = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-500";
      case "Upcoming":
        return "text-blue-500";
      case "On Hold":
        return "text-yellow-500";
      default:
        return "text-gray-500";
    }
  };

  // Function to render appropriate service icon from Lucide React
  const renderServiceIcon = (service) => {
    switch (service) {
      case "groomer":
        return <Scissors size={20} className="text-pink-400" />;
      case "doctor":
        return <Stethoscope size={20} className="text-red-400" />;
      case "trainer":
        return <Dumbbell size={20} className="text-amber-400" />;
      case "caretaker":
        return <User size={20} className="text-blue-400" />;
      default:
        return null;
    }
  };

  const renderServiceName = (service) => {
    const capitalizedService = service.charAt(0).toUpperCase() + service.slice(1);
    return `Pet ${capitalizedService}`;
  };

  return (
    <div className="w-full bg-gradient-to-br from-[#1C1917] to-[#292524] p-6 rounded-xl shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#E5E5CB]">Appointments</h2>
        
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-3 py-2 bg-[#3C2A21] hover:bg-[#4C3A31] text-[#E5E5CB] rounded-lg transition-colors duration-200">
            <SlidersHorizontal size={16} />
            <span>Filter</span>
          </button>
          
          <div className="flex items-center gap-2 text-[#E5E5CB]">
            <button 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setShowIncompleteOnly(!showIncompleteOnly)}
            >
              <div className={`w-5 h-5 flex items-center justify-center rounded border ${showIncompleteOnly ? 'bg-amber-500 border-amber-600' : 'border-[#E5E5CB]/30'}`}>
                {showIncompleteOnly && <CheckSquare size={14} className="text-white" />}
              </div>
              <span className="text-sm">Show on-going</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-6 p-3 font-medium text-[#E5E5CB]/70 border-b border-[#3C2A21] mb-4">
        {titles.map((title, index) => (
          <div key={index} className={` text-center ${index === 3 ? 'text-center' : index === 5 ? 'text-right' : ''}`}>
            {title}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="grid grid-cols-6 items-center bg-[#3C2A21]/40 hover:bg-[#3C2A21]/60 transition-colors duration-200 text-[#E5E5CB] p-4 rounded-xl shadow-sm"
          >
            {/* Service Column with Icon and Name */}
            <div className="flex items-center gap-3 justify-center">
              <div className="p-2 bg-[#1C1917] rounded-full">
                {renderServiceIcon(row[0])}
              </div>
              
            </div>
            

            <div className="text-center">{row[1]}</div>
            
            {/* Pet Name */}
            <div className="text-center">{row[2]}</div>
            
            {/* Date & Time Combined */}
            <div className="text-center">
              <div className="text-sm">{row[3].date}</div>
              <div className="text-xs text-[#E5E5CB]/70">{row[3].time}</div>
            </div>
            
            {/* Status with Dot */}
            <div className="flex justify-center">
              <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${getStatusColor(row[4])}`}></div>
                <span className={`${getStatusTextClass(row[4])} font-medium`}>
                  {row[4]}
                </span>
              </div>
            </div>
            
            {/* More Options */}
            <div className="flex justify-end">
              <button className="p-2 hover:bg-[#1C1917] rounded-full transition-colors duration-200">
                <MoreVertical size={20} color="#E5E5CB" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Empty State */}
      {rows.length === 0 && (
        <div className="py-8 text-center text-[#E5E5CB]/70">
          No appointments match your criteria
        </div>
      )}
    </div>
  );
};

export default Table;