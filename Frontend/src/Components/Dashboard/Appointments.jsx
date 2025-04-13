import { CheckSquare, Dumbbell, LoaderCircleIcon, MoreVertical, Scissors, Stethoscope, User } from "lucide-react";
import React, { useEffect, useState } from "react";

const Table = ({data, refetch, petdata, }) => {
  const titles = [
    "Service",
    // "Pet Owner",
    "Pet Name",
    "Date & Time",
    "Status",
    "Actions"
  ];
  
  const  [initialRows, setInitialrows ]= useState([
    {
      type: "vet",
      name: "John Doe",
      petName: "Buddy",
      date: "12 Mar, 2024",
      time: "10:30 AM",
      status: "Confirmed"
    },
    {
      type: "groomer",
      name: "Jane Smith",
      petName: "Whiskers",
      date: "15 Apr, 2024",
      time: "2:00 PM",
      status: "Pending"
    },
    {
      type: "trainer",
      name: "Mike Johnson",
      petName: "Tweety",
      date: "20 May, 2024",
      time: "5:45 PM",
      status: "Completed"
    },
    {
      type: "caretaker",
      name: "Sarah Williams",
      petName: "Max",
      date: "5 Jun, 2024",
      time: "1:15 PM",
      status: "Confirmed"
    },
    {
      type: "vet",
      name: "Alex Chen",
      petName: "Rocky",
      date: "22 Mar, 2024",
      time: "9:00 AM",
      status: "Pending"
    },
    {
      type: "groomer",
      name: "Emily Davis",
      petName: "Luna",
      date: "10 Apr, 2024",
      time: "3:30 PM",
      status: "Completed"
    }
  ]);
  

  const [rows, setRows] = useState([]);
  const [showIncompleteOnly, setShowIncompleteOnly] = useState(false);
  const [petNameMap, setPetName] = useState({});
  // Sort and filter rows whenever the filter changes
  useEffect(() => {
    // setRows(data);
    const petNameMap = petdata.reduce((acc, pet) => {
      acc[pet._id] = pet.name;
      return acc;
    }, {});
    setPetName(petNameMap);
    let sortedRows =  data.map((row) => ({
      ...row,
      status: row.status.charAt(0).toUpperCase() + row.status.slice(1),
      petName: petNameMap[row.pet_id] || "Unknown",
      date: DateFormatter(row.date),
    }));
    sortedRows.sort((a, b) => {
      const statusOrder = { "Confirmed": 1, "Pending": 2, "Completed": 3 };
      return statusOrder[a.status] - statusOrder[b.status];
    })
    setRows(sortedRows);
    setInitialrows(sortedRows);
  }, [data]);

  console.log("Data",rows);
  console.log("Pet Data",petdata);

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-500";
      case "Confirmed":
        return "bg-[#24aee0]";
      case "Pending":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusTextClass = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-500";
      case "Confirmed":
        return "text-[#24aee0]";
      case "Pending":
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
      case "vet":
        return <Stethoscope size={20} className="text-red-400" />;
      case "trainer":
        return <Dumbbell size={20} className="text-amber-400" />;
      case "caretaker":
        return <User size={20} className="text-blue-400" />;
      default:
        return null;
    }
  };
  const clickHandler = (value) => {  
    
    let sortedRows = [...initialRows]

    
    // Sort by status priority (Upcoming first, then On Hold, then Completed)
    sortedRows.sort((a, b) => {
      const statusOrder = { "Confirmed": 1, "Pending": 2, "Completed": 3 };
      return statusOrder[a[4]] - statusOrder[b[4]];
    });
    
    // Filter incomplete if checkbox is checked
    if (!showIncompleteOnly) {
      sortedRows = sortedRows.filter(row => row.status !== "Completed");
    }
    setShowIncompleteOnly(!value);
    setRows(sortedRows);

    // console.log(value);
  }

  const renderServiceName = (service) => {
    const capitalizedService = service.charAt(0).toUpperCase() + service.slice(1);
    return `Pet ${capitalizedService}`;
  };
  const formatted = DateFormatter("2025-04-22T00:00:00.000Z");
  console.log(formatted); 
  return (
    <div className="w-full bg-gradient-to-br from-[#1C1917] to-[#292524] p-6 rounded-xl shadow-xl  sm:text-[0.8rem] md:text-base ">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#E5E5CB]">Appointments</h2>
  
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-3 py-2 bg-[#3C2A21] hover:bg-[#4C3A31] text-[#E5E5CB] rounded-lg transition-colors duration-200 "
          onClick={() => refetch()}
          >
            <LoaderCircleIcon size={16} />
            <span>Refresh</span>
          </button>
  
          <div className="flex items-center gap-2 text-[#E5E5CB]">
            <button
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => clickHandler(showIncompleteOnly)}
            >
              <div className={`w-5 h-5 flex items-center justify-center rounded border ${showIncompleteOnly ? 'bg-amber-500 border-amber-600' : 'border-[#E5E5CB]/30'}`} >
                {showIncompleteOnly && <CheckSquare size={14} className="text-white" />}
              </div>
              </button>
              <span className="text-sm">Show on-going</span>
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
            className="grid grid-cols-6  items-center bg-[#3C2A21]/40 hover:bg-[#3C2A21]/60 transition-colors duration-200 text-[#E5E5CB] p-4 rounded-xl shadow-sm"
          >
            {/* Service Column with Icon and Name */}
            <div className="flex items-center gap-3 justify-center ">
              <div className="p-2 bg-[#1C1917] rounded-full">
                {renderServiceIcon(row.type)}
              </div>
            </div>
  
            {/* <div className="text-center">{row.name}</div> */}
  
            {/* Pet Name */}
            <div className="text-center">{row.petName}</div>
  
            {/* Date & Time Combined */}
            <div className="text-center mr-2">
              <div className="text-sm">{row.date}</div>
              <div className="text-xs text-[#E5E5CB]/70">{row.time}</div>
            </div>
  
            {/* Status with Dot */}
            <div className="flex justify-center">
              <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${getStatusColor(row.status)}`}></div>
                <span className={`${getStatusTextClass(row.status)} font-medium`}>
                  {row.status}
                </span>
              </div>
            </div>
  
            {/* More Options */}
            <div className="flex justify-center">
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

const DateFormatter = ( isDate ) => {
  if (!isDate) return "Invalid Date";

  const date = new Date(isDate);
  if (isNaN(date)) return "Invalid Date";

  const day = date.getUTCDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getUTCFullYear();

  return `${day} ${month} ${year}`;
};

export default Table;