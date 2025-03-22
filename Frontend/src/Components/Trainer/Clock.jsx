import React, { useState } from "react";

const Clock = ({ placeholder = "Select Time", onTimeChange }) => {
  const [selectedTime, setSelectedTime] = useState("");

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
    if (onTimeChange) {
      onTimeChange(e.target.value);
    }
  };

  return (
    <input
      type="time"
      value={selectedTime}
      onChange={handleTimeChange}
      placeholder={placeholder}
      style={{
        width: 250,
        height: 50,
        fontSize: "16px",
        borderRadius: "16px",
        backgroundColor: "transparent",
        color: "#E5E5CB",
        border: "1px solid #E5E5CB",
        padding: "8px",
      }}
    />
  );
};

export default Clock;