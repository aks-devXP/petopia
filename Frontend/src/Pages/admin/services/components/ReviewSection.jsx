import React from 'react';
import { Star,  ThumbsUp, ThumbsDown } from 'lucide-react';
import RatingGauge from './RatingGauge';

const ReviewSection = () => {

  const ratingData = {
    average: 4.3,
    total: 538,
    breakdown: [
      { stars: 5, count: 349 },
      { stars: 4, count: 101 },
      { stars: 3, count: 34 },
      { stars: 2, count: 13 },
      { stars: 1, count: 41 }
    ],
    QualityServices:2.2,
    HandlingCare:4.1,
    ExperiencePricing:4.0
  };

  const customerPhotos = [
    "",
    "",
    "",
  ];

  const reviewSample = [{
    rating: 4,
    text: "Finally, I found the perfect pet salon! 🐶✨ I had been searching for a place that truly cares for pets, and this one exceeded my expectations. The staff is incredibly gentle and patient, making my nervous pup feel completely at ease. They did a fantastic job with the grooming—his coat is soft, shiny, and smells amazing! 🛁✂️ Plus, they offer little finishing touches like a cute bandana and a spritz of pet-friendly fragrance. I’m giving 4 stars instead of 5 because the appointment slots fill up quickly, making it hard to get a last-minute booking. But honestly, that just shows how good they are! If you're looking for a salon that treats your pet like family, this is the one. Highly recommend! ❤️🐾",
    userName: "Akash Kumar",
    date: "4 Dec 2024",
    upvotes: 3,
    downvotes: 1,
    images: [
      "",
      "",
      ""
    ]
  }];


  const maxCount = Math.max(...ratingData.breakdown.map(item => item.count));
  const getBarWidth = (count) => {
    return `${(count / maxCount) * 100}%`;
  };

  return (
    <div className="w-full p-4 text-[#E5E5CB] bg-[#1A120B] h-full">
      {/* Ratings Section */}
      <div className="border-b border-[#E5E5CB]/50 pb-6">
        <div className="flex items-start mb-2">
          <h2 className="text-xl font-bold uppercase">RATINGS</h2>
        </div>

        <div className="flex flex-col items-baseline">
          <div className="flex items-center">
          <span className="text-3xl font-bold">{ratingData.average}</span>
            <Star className="ml-2 w-6 h-6 fill-current text-yellow-500" />
          </div>
          <div className="text-sm text-[#E5E5CB]/60">
            {ratingData.total} Verified Buyers
          </div>
          
          <div className='flex w-full items-center justify-center'>
              <div className="w-[500px]">
                {ratingData.breakdown.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 mb-1">
                    <div className='flex gap-[1px] items-center'>
                        <span className="text-sm w-3">{item.stars}</span>
                        <Star className="inline text-yellow-500" fill="currentColor" size={14} />
                    </div>
                    <div className="w-3/4 bg-white h-2 rounded-full">
                      <div
                        className={`h-full rounded-full
                            ${item.stars === 5 ? 'bg-emerald-500' :
                                item.stars === 4 ? 'bg-blue-500' :
                                item.stars === 3 ? 'bg-yellow-500' :
                                item.stars === 2 ? 'bg-orange-500' :
                                'bg-red-500'}`}
              
                        style={{ width: getBarWidth(item.count) }}
                      ></div>
                    </div>
                    <span className="text-sm w-8 text-[#E5E5CB]/60">{item.count}</span>
                  </div>
                ))}
              </div>
              <div className='flex flex-1 w-full justify-center gap-16'>
                <RatingGauge rating={ratingData.QualityServices} text={"Quality & Services"}/>
                <RatingGauge rating={ratingData.HandlingCare} text="Handling & Care" />
                <RatingGauge rating={ratingData.ExperiencePricing} text="Experience & Pricing" />
              </div>
          </div>
        </div>
        
        
      </div>

      {/* Customer Photos */}
      <div className="py-4 border-b border-[#E5E5CB]/50">
        <h3 className="font-semibold mb-3">Customer Photos (21)</h3>
        <div className="flex space-x-2 mt-2">
          {customerPhotos.map((photo, index) => (
            <div key={index} className="w-16 h-16 relative bg-gray-100 rounded overflow-hidden">
              <img src={photo} alt={`Customer photo ${index + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
          <div className="w-16 h-16 bg-white/20 text-white flex items-center justify-center font-medium">
            +20
          </div>
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="py-4">
        <h3 className="font-semibold mb-4">Customer Reviews (70)</h3>
        
        <div className="mb-4 mt-4 p-3 border rounded-lg border-black">
          <div className="flex flex-col gap-1 mb-2 ">
            <div className="flex items-center mb-2">
                <span className="bg-green-500
                 text-white text-xs px-2 py-1 rounded flex items-center justify-center gap-1">{4} <Star size={12} className="inline" /></span>
            </div>
            <p className="text- text-[#E5E5CB]/70">{reviewSample[0].text}</p>
          </div>
          
          <div className="flex gap-2 mt-6 mb-2">
            {reviewSample[0].images.map((img, index) => (
              <div key={index} className="w-14 h-14 bg-gray-100 rounded overflow-hidden">
                <img src={img} alt={`Review image ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          
          <div className="flex flex-col justify-start items-start text-[#E5E5CB]/60">
            <div className="text-xs mt-8 mb-2 ">
              {reviewSample[0].userName} | {reviewSample[0].date}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <ThumbsUp className="w-4 h-4" />
                <span>{reviewSample[0].upvotes}</span>
              </div>
              <div className="flex items-center gap-1">
                <ThumbsDown className="w-4 h-4" />
                <span>{reviewSample[0].downvotes}</span>
              </div>
            </div>
          </div>
        </div>
        
        <button className="text-[#E5E5CB] text-sm">View all 70 reviews</button>
      </div>
    </div>
  );
};

export default ReviewSection;