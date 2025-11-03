import React from "react";
import { useNavigate } from "react-router-dom";
import catImage from "@assets/HomeScreen/cat.jpg";
import dogImage from "@assets/HomeScreen/dog.jpg";
import PawButton from "@components/buttons/PawButton";
import Slider from "./Slider";

export default function PetCareGuideCard({
  // Title as JSX so the line break renders correctly
  title = (
    <>
      New Pet at Home?
      <br /> Know Their Needs. Start the Right Care.
    </>
  ),
  // Refined description: concise, complete, and specific to Breed/Guide feature
  description = "Explore breed-specific guidance on behavior, diet, grooming, exercise, and common health needs—so you can care with confidence from day one.",
  buttonText = "Start Learning",
}) {
  const navigate = useNavigate();

  return (
    <div className="mx-2 sm:mx-12 ">
      <div className="grid grid-cols-1 md:grid-cols-10 gap-2 md:gap-8 items-center">
        {/* LEFT - Content */}
        <div
          className="
            order-2 md:order-1 md:col-span-6
            flex flex-col justify-center
            space-y-8
            px-6 sm:px-6 lg:px-10
            py-6 md:py-8 lg:py-10 xl:py-12
            bg-app-surface rounded-3xl
            shadow-md
          "
        >
          <div className="space-y-2">
            {/* Title */}
            <h2 className="text-3xl font-quicksandBold sm:text-4xl leading-tight text-ink-heading">
              {title}
            </h2>

            {/* Description */}
            <p className="text-ink-secondary">
              {description}
            </p>
          </div>

          {/* CTA Button */}
          <div className="w-full md:w-auto">
            <PawButton
              text={buttonText}
              onClick={() => navigate("/breed-info")}
            />
          </div>
        </div>

        {/* RIGHT - Images */}
        <div className="order-1 md:order-2 flex gap-4 w-full md:col-span-4">
          <Slider/>
        </div>
      </div>
    </div>
  );
}
