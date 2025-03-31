import React from 'react';
import topw1 from '../../assets/NGO/topw1.webp';
import truncateText from '../../Util/Shortcuts';

const SlidingCard = ({ imageUrl=topw1, title= "Donate", subtitle="There are many unfortunate ones", description="Your donations help us provide food, shelter, and medical care for animals in need." }) => {
  return (
    <div className="max-w-[25rem]   overflow-hidden flex flex-col items-center max-h-[40rem] ">
      {/* Image */}
      <div className='flex max-w-[25rem]  h-[20rem] p-2 ' >
      <img src={imageUrl } alt="Card Image" className=" rounded-lg  w-full h-full object-cover " />
       
      </div>
    
      {/* Card Content */}
      <div className="p-4 flex flex-col flex-start">
        <h4 className="text-sm text-gray-500 font-semibold">{subtitle}</h4>
        <h3 className="text-xl font-bold mt-2 text-[#86A788]">{title}</h3>
        <p className="text-gray-600 mt-2">{truncateText(description,50)}</p>
      </div>
    </div>
  );
};


// Example usage
// const ParentComponent = () => {
//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <SlidingCard 
//         title="Donate" 
//         description="Your donations help us provide food, shelter, and medical care for animals in need." 
//         imageUrl="https://via.placeholder.com/300"
//       />
//     </div>
//   );
// };

export default SlidingCard;