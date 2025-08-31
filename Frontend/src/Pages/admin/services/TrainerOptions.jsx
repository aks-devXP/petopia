import React, { useState, useEffect, useRef } from "react";
import TrainerCard from "./components/TrainerCard";

// Sample training images - replace with actual images
const trainingImages = [
  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1542715234-4bafcfc68b03?auto=format&fit=crop&q=80"
];

export default function TrainerOptions() {
  const [visibleTrainers, setVisibleTrainers] = useState(6); // Initial visible count
  const loadMoreRef = useRef(null);

  // Generate training packages
  const generateTrainingPackages = (count) => {
    const trainingTypes = [
      {
        name: "Puppy Training",
        services: [
          "Potty / Pee Training",
          "Basic Socialization",
          "Puppy Biting Correction",
          "Instruction - Sit, Stay, Shake Hand",
          "Walking - Come, Go"
        ]
      },
      {
        name: "Basic Training",
        services: [
          "7 Basic Commands - Sit, Down, Stay, Hi5, Handshake, Come, Go",
          "5 No Commands - No, Don't Jump, Don't bark, Don't Pull, Don't Eat",
          "Biting/Mouthing Correction"
        ]
      },
      {
        name: "Advanced Training",
        services: [
          "Off-leash Training",
          "Distance Commands",
          "Behavioral Corrections",
          "Advanced Socialization",
          "Outdoor Navigation"
        ]
      },
      {
        name: "Protection Training",
        services: [
          "Guard Commands",
          "Controlled Aggression",
          "Threat Assessment",
          "Defensive Positioning",
          "Owner Protection"
        ]
      },
      {
        name: "Socialization Training",
        services: [
          "Dog-to-Dog Interaction",
          "Public Space Behavior",
          "Stranger Interaction",
          "Environmental Desensitization",
          "Confidence Building"
        ]
      }
    ];
    
    return Array(count).fill().map((_, index) => ({
      id: index + 1,
      image: trainingImages[index % trainingImages.length],
      name: `Trainer ${index + 1}`,
      rating: (4 + Math.random()).toFixed(1),
      services: trainingTypes[index % trainingTypes.length].services
    }));
  };

  const trainingPackages = generateTrainingPackages(3);

  // Load more trainers when scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleTrainers < trainingPackages.length) {
          // Load 3 more packages when reaching the bottom
          setVisibleTrainers(prev => Math.min(prev + 3, trainingPackages.length));
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
  }, [visibleTrainers, trainingPackages.length]);

  return (
    <div className="min-h-screen w-full bg-[#1A120B] text-white p-10">
      <div className="flex items-center justify-between mb-6">
        <p className="text-3xl font-bold">Find the Perfect Training Package</p>
      </div>

      {/* Lazy loaded trainers grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        {trainingPackages.slice(0, visibleTrainers).map((trainingPackage) => (
          <TrainerCard 
            key={trainingPackage.id}
            {...trainingPackage}
          />
        ))}
      </div>

      {/* Invisible element to detect when to load more */}
      {visibleTrainers < trainingPackages.length && (
        <div ref={loadMoreRef} className="h-10 w-full" />
      )}
    </div>
  );
}