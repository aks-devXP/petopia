import React from "react";

const TrainerCard = ({
  image,
  name,
  rating,
  services,
  onClick
}) => {
  // Get a random service to use as the card title and determine background color
  const primaryService = services && services.length > 0 ? services[0] : "Dog Training";
  
  // Determine color scheme based on service (simulating the different colored cards in the image)
  const getColorScheme = () => {
    // Simple way to assign consistent colors to services
    const firstChar = primaryService.charAt(0).toLowerCase();
    
    if (firstChar < 'f') {
      return {
        bgColor: "bg-green-50",
        textColor: "text-green-800",
        badgeColor: "bg-green-200"
      };
    } else if (firstChar < 'p') {
      return {
        bgColor: "bg-red-50",
        textColor: "text-red-800",
        badgeColor: "bg-red-200"
      };
    } else {
      return {
        bgColor: "bg-purple-50",
        textColor: "text-purple-800",
        badgeColor: "bg-purple-200"
      };
    }
  };

  const { bgColor, textColor, badgeColor } = getColorScheme();

  // Calculate session count based on service type
  const getSessionCount = () => {
    // Return different number of sessions based on service type
    return primaryService.includes("Puppy") ? 12 : 24;
  };

  // Calculate price based on service type
  const getPrice = () => {
    if (primaryService.includes("Puppy")) {
      return { original: "₹10,780", discounted: "₹8,900" };
    } else {
      return { original: "₹20,540", discounted: "₹15,800" };
    }
  };

  const price = getPrice();
  const sessions = getSessionCount();
  const duration = primaryService.includes("Puppy") ? "1 Month" : "2 Months";

  return (
    <div 
      className={`w-full rounded-lg overflow-hidden shadow-md ${bgColor} ${textColor} cursor-pointer transition-all duration-300 hover:shadow-lg`}
      onClick={onClick}
    >
      {/* Top image */}
      <div className="w-full h-48">
        <img 
          src={image} 
          alt={`${primaryService}`} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-6 ">
        {/* Title and Sessions */}
        <div className="flex justify-between  mb-4">
          <h3 className="text-xl font-bold">{primaryService}</h3>
          <span className={`${badgeColor} px-3 py-1 rounded-full text-sm font-semibold min-w-28 text-center h-7`}>
            {sessions} Sessions
          </span>
        </div>
        
        {/* Duration */}
        <p className="mb-6">{duration} | 30min Session</p>
        
        {/* Services */}
        <div className="mb-6">
          <h4 className="font-bold mb-2">Includes</h4>
          <ul className="list-disc pl-5 space-y-1">
            {services.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
            {/* Add some standard inclusions as shown in the image */}
            <li>FREE Socialization Chart</li>
            <li>FREE diet chart</li>
          </ul>
        </div>
        
        {/* Price */}
        <div className="text-center">
          <p className="text-sm">Discounted Price</p>
          <p className="flex justify-center items-center gap-2">
            <span className="line-through text-gray-500">{price.original}</span>
            <span className="text-xl font-bold">{price.discounted}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrainerCard;