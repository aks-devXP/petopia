import React from 'react';
import SlidingCard from './SlidingCard';
const WeekTop = () => {
  const cardsData = [
    {
      imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0", // Replace with actual image URLs
      title: "Community Clean-Up Day",
      subtitle: "Helping Hands NGO",
      description: "Join us for a community clean-up day to beautify our local parks and streets. Supplies will be provided!"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
      title: "Animal Shelter Visit",
      subtitle: "Paws for a Cause",
      description: "Spend a day at the local animal shelter, helping to care for and socialize with the animals in need."
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
      title: "Food Drive",
      subtitle: "Feed the Hungry",
      description: "Help us collect non-perishable food items for families in need. Every donation counts!"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
      title: "Fundraising Gala",
      subtitle: "Support Our Mission",
      description: "Join us for an evening of fun and fundraising to support our ongoing projects and initiatives."
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
      title: "Volunteer Training Session",
      subtitle: "Empower Change NGO",
      description: "Attend our training session to learn how you can make a difference in your community."
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
      title: "Health Awareness Camp",
      subtitle: "Wellness for All",
      description: "Participate in our health awareness camp, offering free check-ups and health education to the community."
    },
  ];

  return (
    <div className="container mx-auto py-10 bg-n-7">
      <h2 className="text-4xl font-bold text-center mb-6 bg-clip-text
      text-transparent bg-[linear-gradient(90deg,_rgba(170,6,165,0.7357536764705883)_12%,_rgba(153,123,228,0.8562018557422969)_100%);]">
        Top Week</h2>
      <div className="grid grid-cols-3 col-gap-4 ">
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
