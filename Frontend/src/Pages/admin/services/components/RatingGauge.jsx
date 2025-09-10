import React from "react";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const RatingGauge = ({ rating, text }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-24">
      <div className="rounded-full ">
        <CircularProgressbarWithChildren
            value={(rating / 5) * 100}
            text={`${rating}`}
            strokeWidth={15}
            circleRatio={0.75}
            styles={buildStyles({
            rotation: 1 / 2 + 1 / 8,
            strokeLinecap: "round",
            textColor: "#E5E5CB", // Change text color here
            textSize: "20px", // Optional: Adjust text size
            pathColor:
                rating > 4
                ? "#10B981"
                : rating > 3
                ? "#3B82F6"
                : rating > 2
                ? "#FBBF24"
                : rating > 1
                ? "#F97316"
                : "#EF4444",
            })}
        />
</div>

      </div>
      <div className="mt-[-10px] text-[#E5E5CB] text-md text-center">{text}</div>
    </div>
  );
};
export default RatingGauge;