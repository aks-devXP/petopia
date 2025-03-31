import React from 'react';
import SlidingCard from './SlidingCard';
const WeekTop = () => {
  const cardsData = [
    {
      imageUrl: "https://images.unsplash.com/photo-1601758003130-1c1c1c1c1c1c",
      title: "What to Know About Pet Adoption Paperwork",
      subtitle: "Adoption Advice",
      description: "Are you finalizing a new pet’s adoption? Learn everything you need to know about pet adoption paperwork."
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1601758003130-1c1c1c1c1c1c",
      title: "Understanding Pet Nutrition",
      subtitle: "Nutrition Tips",
      description: "Learn about the best diets for your new furry friend."
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1601758003130-1c1c1c1c1c1c",
      title: "Training Your New Pet",
      subtitle: "Training Tips",
      description: "Get tips on how to train your new pet effectively."
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1601758003130-1c1c1c1c1c1c",
      title: "Creating a Safe Home for Your Pet",
      subtitle: "Safety Tips",
      description: "Ensure your home is safe for your new pet."
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1601758003130-1c1c1c1c1c1c",
      title: "Fun Activities to Do with Your Pet",
      subtitle: "Activity Ideas",
      description: "Explore fun activities to enjoy with your furry friend."
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1601758003130-1c1c1c1c1c1c",
      title: "Pet Grooming Essentials",
      subtitle: "Grooming Tips",
      description: "Learn about the essentials of grooming your pet."
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-4xl font-bold text-center mb-6 bg-clip-text
      text-transparent bg-[linear-gradient(90deg,_rgba(170,6,165,0.7357536764705883)_12%,_rgba(153,123,228,0.8562018557422969)_100%);]">

        Top Week</h2>
      <div className="grid grid-cols-3 col-gap-4 bg-[linear-gradient(150deg, #3b2e5b, #5b3672, #7d3e83, #9e478d, #bd558e, #d86783, #ee7e67, #ff9913);]">
        {cardsData.map((card, index) => (
          <SlidingCard 
            key={index}
            title={card.title}
            subtitle={card.subtitle}
            description={card.description}
          />
        ))}
      </div>
    </div>
  );
};

export default WeekTop
