import React, { useEffect, useRef, useState } from "react";
import BookingButton from "./BookingButton";
import { Calendar, SquareArrowLeft, SquareArrowRight, ReceiptIndianRupee } from "lucide-react";
import DateTile from "./DateTile";
import TimeSlotComponent from "./TimeSlotComponent";


const VetBookCard = ({fees, currentWeek, availableTimes, toggleButton, setToggleButton, toggleTime, setTimeButton }) => {
  const scrollRef = useRef(null);
  const [dateLong, setDateLong] = useState();
  const [day,setDay] = useState();
  const [time,setTime] = useState();

  // Scroll left function
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -350, // Adjust scroll amount
        behavior: "smooth",
      });
    }
  };

  // Scroll right function
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 300, // Adjust scroll amount
        behavior: "smooth",
      });
    }
  };

  useEffect(()=>{
    const getDate = currentWeek[toggleButton].fullDate;
    setDateLong(getDate);
    const time = availableTimes[toggleTime];
    setTime(time);
    if(toggleButton == 0 ? setDay("Today") : toggleButton == 1 ? setDay("Tomorrow") : setDay(currentWeek[toggleButton].day));
  },[toggleButton, toggleTime, []]);


  return (
    <>
      <div className="h-full w-full bg-cream-mid rounded-3xl py-5 text-black">
        <div className="h-[75%] border-b border-[#E5E5E5] shadow-lg border-opacity-80 flex flex-col gap-5">
          <div className="h-fit">
            <div className="flex justify-between items-center px-5">
              <button onClick={scrollLeft} className=" hover:text-slate-500 hover:scale-125 duration-300">
                <SquareArrowLeft />
              </button>
              <span className="text-black font-medium text-xl">Next Available Time Slots</span>
              <button onClick={scrollRight} className="p-0 rounded-none hover:text-slate-500 hover:scale-125 duration-300">
                <SquareArrowRight />
              </button>
            </div>

            {/* Scrollable Date Tiles */}
            <div className="mt-5 px-3">
              <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-5 no-scrollbar items-center"
                style={{ scrollBehavior: "smooth", scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {currentWeek.map((item, index) => (
                  <DateTile
                    key={index}
                    click={() => setToggleButton(index)}
                    date={item.date}
                    day={index === 0 ? "Today" : index === 1 ? "Tomorrow" : item.day}
                    toggle={toggleButton === index}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-center shadow-md gap-1 pt-3 pb-1 items-center">
              <div>
                <Calendar className="w-3 h-3" />
              </div>
              <span className="text-sm font-medium">{dateLong}</span>
            </div>
          </div>

          <div
            onWheel={(e) => e.stopPropagation()} // Stops page scrolling
            className="h-fit overflow-y-auto scroll-smooth">
            <TimeSlotComponent availableTimes={availableTimes} toggleTime={toggleTime} setTimeButton={setTimeButton} />
          </div>
        </div>

        <div className="h-[25%] px-5 pt-4">
          <div className="flex justify-between mb-3">
            <div className="flex flex-col">
              <span className="text-3xl font-semibold text-black">Total</span>
              <span className="text-xs font-light text-white">Incl. tax & fees</span>
            </div>

            <div className="flex flex-col items-end">
              <div className="flex justify-center items-center flex-grow-0">
                <div className="">
                  <ReceiptIndianRupee />
                </div>
                <span className="font-semibold text-black text-3xl">{fees}</span>
              </div>

              <div className="flex flex-shrink-0 w-full ">
                <span className="text-black text-xs font-light">
                  {day} at {time}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <div>
              <BookingButton />
            </div>
            <span className="text-[11px] font-thin text-white/80">You won't be charged yet</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default VetBookCard;
