import React, { useState, useEffect, useRef } from "react";
import ProfileCard from "./components/ProfileCard";
import Akash from "@assets/Trainer/akash.png";

function CareTakerCards() {

  const [visibleTrainers, setVisibleTrainers] = useState(6); // Initial visible count
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const loadMoreRef = useRef(null);

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
      hourlyRate: "400"
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
      hourlyRate: "500"
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
      hourlyRate: "450"
    }
  ];

  // Generate random trainers for the "Explore More" section
  const generateMoreTrainers = (count) => {
    const names = ["John Doe", "Lisa Chen", "David Wilson", "Emma Taylor", "Michael Brown", 
                   "Sophia Lee", "James Martin", "Olivia White", "Robert Green", "Emily Clark",
                   "William Hall", "Jennifer Adams", "Thomas Baker", "Elizabeth Scott", "Daniel Evans"];
    
    const ranks = ["Bronze", "Silver", "Gold", "Diamond"];

    const services = [
      ["Protection Training", "Socialization Training"], 
      ["Leash Training", "Obedience Training"],
      ["Behavior Modification", "Puppy Training"], 
      ["Advanced Commands", "Agility Training"],
      ["House Training", "Basic Training"]
    ];
    
    return Array(count).fill().map((_, index) => ({
      id: 100 + index,
      image: Akash,
      name: names[index % names.length],
      rank: ranks[Math.floor(Math.random() * ranks.length)],
      trainingCount: String(Math.floor(Math.random() * 500) + 100),
      rating: (Math.random() * (5 - 4) + 4).toFixed(1),
      experience: (Math.random() * 5 + 0.5).toFixed(1),
      services: services[index % services.length],
      hourlyRate: String(Math.floor(Math.random() * 400) + 200)
    }));
  };

  const moreTrainers = generateMoreTrainers(10); //30 more trainers


  // Load more trainers when scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleTrainers < moreTrainers.length) {
          // Load 3 more trainers when reaching the bottom
          setVisibleTrainers(prev => Math.min(prev + 3, moreTrainers.length));
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [visibleTrainers, moreTrainers.length]);

  // Manual load more button handler
  const handleLoadMore = () => {
    setVisibleTrainers(prev => Math.min(prev + 6, moreTrainers.length));
  };

  return (
    <div className="min-h-screen w-full bg-black text-white p-4">
      {/* Top Rated Trainers Section */}
      <p className="text-3xl font-bold mb-3">Top-Rated Caretakers</p>

      {/* Top Trainers Grid - Always visible */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {topTrainers.map((trainer) => (
          <ProfileCard 
            key={trainer.id}
            {...trainer}
            
          />
        ))}
      </div>

      {/* Explore More Trainers Section */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-3xl font-bold">Explore All Care Options</p>
      </div>

      {/* Lazy loaded trainers grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {moreTrainers.slice(0, visibleTrainers).map((trainer) => (
          <ProfileCard 
            key={trainer.id}
            {...trainer}
            
          />
        ))}
      </div>

      {/* Invisible element to detect when to load more */}
      {visibleTrainers < moreTrainers.length && (
        <div ref={loadMoreRef} className="h-10 w-full" />
      )}
      
    </div>
  );
}

export default CareTakerCards;