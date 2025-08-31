import React, { useState, useEffect, useRef } from 'react'
import GroomerCard from './components/GroomerCard';
import Akash from "@assets/Groomer/sample-2.jpg";

export default function GroomerCards() {
  
  const [visibleGroomers, setVisibleGroomers] = useState(6); // Initial visible count
  const loadMoreRef = useRef(null);

  // Generate random groomers for the "Explore More" section
  const generateMoreGroomers = (count) => {
    const names = ["Paws & Relax", "Happy Tails", "PetSpa Deluxe", "VIP Grooming", "Furry Salon", 
                   "Bark & Bath", "Pawdicure", "Pampered Pets", "Fluffy Care", "Groomer's Hub",
                   "Clean Paws", "Tail Waggers", "Pet Paradise", "Premium Pet Spa", "The Grooming Studio"];
    
    const ranks = ["Bronze", "Silver", "Gold", "Diamond"];

    const services = [
      ["Pet Grooming", "Bathing"], 
      ["Hair Cutting", "Nail Trimming"],
      ["Pet Spa", "Fur Styling"], 
      ["Teeth Cleaning", "Ear Care"],
      ["Medicated Baths", "De-shedding"]
    ];
    
    const locations = [
      "Vasant Kunj, Delhi", 
      "Saket, New Delhi", 
      "Greater Kailash, Delhi", 
      "Dwarka, New Delhi",
      "Rohini, Delhi",
      "Noida, UP",
      "Gurugram, Haryana",
      "Faridabad, Haryana",
      "South Extension, Delhi",
      "Lajpat Nagar, New Delhi"
    ];
    
    return Array(count).fill().map((_, index) => ({
      id: 100 + index,
      image: Akash,
      name: names[index % names.length],
      rank: ranks[Math.floor(Math.random() * ranks.length)],
      rating: (Math.random() * (5 - 3.8) + 3.8).toFixed(1),
      services: services[index % services.length],
      location: locations[index % locations.length]
    }));
  };

  const moreGroomers = generateMoreGroomers(10); // 10 more groomers

  // Load more groomers when scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleGroomers < moreGroomers.length) {
          // Load 3 more groomers when reaching the bottom
          setVisibleGroomers(prev => Math.min(prev + 3, moreGroomers.length));
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
  }, [visibleGroomers, moreGroomers.length]);

  return (
    <div className="min-h-screen w-full bg-[#1A120B] text-white p-4">

      {/* Explore More Groomers Section */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-3xl font-bold">Explore All Grooming Options</p>
      </div>

      {/* Lazy loaded groomers grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {moreGroomers.slice(0, visibleGroomers).map((groomer) => (
          <GroomerCard 
            key={groomer.id}
            {...groomer}
          />
        ))}
      </div>

      {/* Invisible element to detect when to load more */}
      {visibleGroomers < moreGroomers.length && (
        <div ref={loadMoreRef} className="h-10 w-full" />
      )}
    </div>
  );
}