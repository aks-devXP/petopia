import React from "react";
import ProfileCard from "./components/ProfileCard";
import Akash from "@assets/Trainer/akash.png";

function CareTakerCards() {
  const topTrainers = [
    {
      id: 1,
      image: Akash,
      name: "Akash Kumar",
      rank: "Bronze",
      trainingCount: "400",
      rating: "4.8",
      experience: "1.7",
      services: ["Protection Training", "Socialization Training", "Leash Training"],
      hourlyRate: "400",
    },
    {
      id: 2,
      image: Akash,
      name: "Sarah Smith",
      rank: "Gold",
      trainingCount: "520",
      rating: "4.9",
      experience: "3.2",
      services: ["Puppy Training", "Advanced Commands"],
      hourlyRate: "500",
    },
    {
      id: 3,
      image: Akash,
      name: "Mike Johnson",
      rank: "Silver",
      trainingCount: "350",
      rating: "4.6",
      experience: "2.5",
      services: ["Basic Training", "House Training"],
      hourlyRate: "450",
    },
  ];

  return (
    <div className="w-full">
      {/* Top Trainers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {topTrainers.map((trainer) => (
          <ProfileCard key={trainer.id} {...trainer} />
        ))}
      </div>
    </div>
  );
}

export default CareTakerCards;
