export function isAfterTime(timeString) {
    const now = new Date();
  
    const targetTime = new Date();
  
    const [timePart, meridiem] = timeString.split(" ");
    let [hours, minutes] = timePart.split(":").map(Number);
  
    if (meridiem === "PM" && hours < 12) {
      hours += 12;
    } else if (meridiem === "AM" && hours === 12) {
      hours = 0;
    }
  
    targetTime.setHours(hours, minutes, 0, 0);
  
    return now < targetTime;
  }
  
  export function AppointmentTimings(value, times) {
    let timeSlots = times || [
      "10:00 AM",
      "12:00 PM",
      "02:00 PM",
      "04:00 PM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM",
      "Special Timing",
    ];
  
    const now = new Date();
    const selectedDate = new Date(value);
  
    const isToday =
      selectedDate.getDate() === now.getDate() &&
      selectedDate.getMonth() === now.getMonth() &&
      selectedDate.getFullYear() === now.getFullYear();
  
    if (isToday) {
      timeSlots = timeSlots.filter((timeSlot) => {
        // Skip "Special Timing" since it's not a valid time string
        if (timeSlot === "Special Timing") return true;
        return isAfterTime(timeSlot);
      });
    }
  
    return timeSlots;
  }
  