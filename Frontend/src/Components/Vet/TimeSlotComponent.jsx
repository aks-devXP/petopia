import React, { useState, useEffect } from "react";
import TimeSlotButton from "./TimeTile";

const TimeSlotComponent = ({ availableTimes, toggleTime, setTimeButton }) => {
  return (
    <div className="h-full w-full flex overflow-y-auto flex-col items-center gap-1 py-1">
      {availableTimes.length > 0 ? (
        availableTimes.map((time, index) => (
          <TimeSlotButton toggle={toggleTime === index} click={() => setTimeButton(index)} key={index} time={time} fees={"2590"} />
        ))
      ) : (
        <p className="text-gray-500">No available slots for the selected date.</p>
      )}
    </div>
  );
};

export default TimeSlotComponent;
