import React, { useState, useEffect } from "react";
import { X, Luggage, Sun, Footprints } from "lucide-react";
import Clock from "./Clock";
import Calendar from "react-calendar";
import "./CustomCalendar.css";
import Akash from "../../assets/Trainer/akash.png";
import BackGround from "../../assets/Trainer/bg-1.jpg";

const DashboardModal = ({ isOpen, onClose }) => {
  const [selectedService, setSelectedService] = useState(null);
  const [pickupDate, setPickupDate] = useState(null);
  const [dropoffDate, setDropoffDate] = useState(null);
  const [pickupTime, setPickupTime] = useState("");
  const [dropoffTime, setDropoffTime] = useState("");

  const handleDateChange = (selectedDate) => {
    if (!pickupDate || (pickupDate && dropoffDate)) {
      setPickupDate(selectedDate);
      setDropoffDate(null);
    } else if (selectedDate > pickupDate) {
      setDropoffDate(selectedDate);
    }
  };

  const tileClassName = ({ date }) => {
    if (!pickupDate) return "";
    if (pickupDate.toDateString() === date.toDateString()) {
      return "bg-blue-500 text-black rounded-full";
    }
    if (dropoffDate && date >= pickupDate && date <= dropoffDate) {
      return "bg-blue-300 text-black";
    }
    return "";
  };

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = parseInt(document.body.style.top || "0") * -1;
      document.body.style.position = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed z-50 inset-0 flex items-end justify-center" onClick={onClose} role="dialog">
      <button className="absolute top-4 right-4 text-[#E5E5CB]" onClick={onClose}>
        <X size={24} />
      </button>

      <div className="flex w-full h-[92%] shadow-lg relative" onClick={(e) => e.stopPropagation()}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${BackGround})` }}>
          <div className="absolute inset-0 bg-black opacity-70"></div>
        </div>

        <div className="h-full w-full flex justify-end relative">
          <div className="absolute top-[10%] left-[14%] w-[200px] h-[200px] rounded-full z-20 overflow-hidden border-2">
            <img src={Akash} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <p className="absolute top-[19%] left-[29%] text-[#E5E5CB] font-grotesk text-2xl font-bold z-20">
            Akash Kumar
          </p>

          <div className="h-[70%] w-[90%] bg-black/60 absolute top-[25%] rounded-l-3xl z-10 p-6">
            <div className="h-full w-full flex gap-4">
              <div className="mt-24 ml-5">
                <div className="flex flex-col gap-3">
                  {[
                    { name: "Boarding", icon: <Luggage size={22} /> },
                    { name: "Day Care", icon: <Sun size={22} /> },
                    { name: "Walking", icon: <Footprints size={22} /> },
                  ].map((service, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedService(service.name)}
                      className={`w-56 h-[85px] rounded-3xl text-[#E5E5CB] flex items-center justify-center gap-4 text-[18px] transition ${
                        selectedService === service.name
                          ? "bg-[#664343d3]"
                          : "hover:bg-[#664343d3]/50 border border-[#664343d3]"
                      }`}
                    >
                      <span>{service.name}</span>
                      {service.icon}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-full rounded-3xl w-80 flex flex-col p-4 gap-4">
                <div className="flex flex-col gap-3 text-[#E5E5CB]">
                  <p className="font-semibold">Pick Up Date</p>
                  <div className="p-2 border border-[#E5E5CB] text-[#E5E5CB] w-[250px] h-[50px] rounded-[16px] flex items-center">
                    {pickupDate ? pickupDate.toDateString() : "Select Date"}
                  </div>
                  <Clock placeholder="Select Pickup Time" onTimeChange={setPickupTime} />
                </div>
                <hr className="my-1 w-[90%] border-b border-[#E5E5CB]/20" />
                <div className="flex flex-col gap-3 text-[#E5E5CB]">
                  <p className="font-semibold">Drop Off Date</p>
                  <div className="p-2 border border-[#E5E5CB] text-[#E5E5CB] w-[250px] h-[50px] rounded-[16px] flex items-center">
                    {dropoffDate ? dropoffDate.toDateString() : "Select Date"}
                  </div>
                  <Clock placeholder="Select Dropoff Time" onTimeChange={setDropoffTime} />
                </div>
              </div>

              <div className="h-full w-[340px] flex justify-center items-center overflow-hidden rounded-3xl shadow-lg">
                <Calendar className="react-calendar w-full h-full p-2" onClickDay={handleDateChange} tileClassName={tileClassName} minDate={new Date()} value={[pickupDate, dropoffDate]} />
              </div>

              <div className="flex flex-col flex-1 justify-between gap-4">
                <div className="w-full h-full flex flex-col justify-between rounded-3xl p-6 text-[#E5E5CB] border border-[#E5E5CB]/50">
                  <h2 className="text-xl font-semibold border-b border-[#E5E5CB]/20 pb-2 mb-4">Booking Summary</h2>
                  <div className="flex justify-between text-lg"><span>Hourly Price:</span> <span className="font-semibold">₹400</span></div>
                  <div className="flex justify-between text-lg"><span>Hours Booked:</span> <span className="font-semibold">8</span></div>
                  <div className="flex justify-between text-lg"><span>Total Price:</span> <span className="font-semibold">₹3200</span></div>
                  <div className="flex justify-between text-lg"><span>Tax (1.8%):</span> <span className="font-semibold">₹80</span></div>
                  <hr className="my-3 border-b border-black/20"/>
                  <div className="flex justify-between text-xl font-bold"><span>Total:</span> <span className="text-green-700">₹5026</span></div>
                </div>
                <button className="bg-blue-600 text-white font-bold py-3 px-6 rounded-full text-lg shadow-md hover:bg-blue-700 transition">Book Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardModal;
