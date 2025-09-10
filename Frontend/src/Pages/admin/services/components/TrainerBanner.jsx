import React from "react";

// sample data directly from your reference code
const trainingImages = [
  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1542715234-4bafcfc68b03?auto=format&fit=crop&q=80"
];

const trainingTypes = [
  {
    name: "Puppy Training",
    services: ["Potty Training", "Socialization", "Biting Correction"]
  },
  {
    name: "Basic Training",
    services: ["7 Basic Commands", "No Commands", "Biting Correction"]
  },
  {
    name: "Advanced Training",
    services: ["Off-leash", "Distance Commands", "Behavioral Corrections"]
  },
  {
    name: "Protection Training",
    services: ["Guard Commands", "Aggression Control", "Owner Protection"]
  }
];

// generate 2 trainers
const trainers = Array(2).fill().map((_, i) => ({
  id: i + 1,
  name: `Trainer ${i + 1}`,
  image: trainingImages[i],
  rating: (4 + Math.random()).toFixed(1),
  services: trainingTypes[i].services,
  package: trainingTypes[i].name,
  hourlyRate: 500 + i * 100
}));

export default function TrainerBanner() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      {trainers.map((trainer) => (
        <div
          key={trainer.id}
          className="aspect-square relative rounded-xl overflow-hidden shadow-lg group cursor-pointer bg-[#fff]"
        >
          {/* Background image */}
          <img
            src={trainer.image}
            alt={trainer.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

          {/* Content */}
          <div className="absolute bottom-0 p-4 text-white">
            <h3 className="text-xl font-bold">{trainer.name}</h3>
            <p className="text-sm text-gray-200 mb-1">
              ⭐ {trainer.rating} • {trainer.package}
            </p>
            <ul className="text-xs text-gray-300 space-y-0.5">
              {trainer.services.slice(0, 2).map((service, idx) => (
                <li key={idx}>• {service}</li>
              ))}
            </ul>
            <p className="mt-2 font-semibold text-lg">
              ₹{trainer.hourlyRate}/hr
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
