import React, { useState, useMemo } from 'react';
import { Star, MapPin, Clock, Filter } from 'lucide-react';

// Mock data
const mockProviders = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    type: "vet",
    location: "Downtown District",
    rating: 4.9,
    reviewCount: 127,
    price: 85,
    priceType: "consultation",
    availability: true,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Happy Paws Grooming",
    type: "groomer",
    location: "Westside Mall",
    rating: 4.7,
    reviewCount: 203,
    price: 45,
    priceType: "session",
    availability: true,
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop"
  },
  {
    id: 3,
    name: "Mike's Dog Training",
    type: "trainer",
    location: "Central Park Area",
    rating: 4.8,
    reviewCount: 89,
    price: 60,
    priceType: "hour",
    availability: false,
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop"
  },
  {
    id: 4,
    name: "Loving Care Pet Sitting",
    type: "caretaker",
    location: "Suburban Heights",
    rating: 4.6,
    reviewCount: 156,
    price: 25,
    priceType: "hour",
    availability: true,
    image: "https://images.unsplash.com/photo-1544568100-847a948585b9?w=400&h=400&fit=crop"
  },
  {
    id: 5,
    name: "Animal Medical Center",
    type: "vet",
    location: "Medical District",
    rating: 4.5,
    reviewCount: 234,
    price: 95,
    priceType: "consultation",
    availability: true,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop"
  },
  {
    id: 6,
    name: "Pampered Pets Spa",
    type: "groomer",
    location: "Fashion District",
    rating: 4.9,
    reviewCount: 178,
    price: 65,
    priceType: "session",
    availability: true,
    image: "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400&h=400&fit=crop"
  },
  {
    id: 7,
    name: "Alpha Training Academy",
    type: "trainer",
    location: "Sports Complex",
    rating: 4.4,
    reviewCount: 92,
    price: 75,
    priceType: "hour",
    availability: true,
    image: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400&h=400&fit=crop"
  },
  {
    id: 8,
    name: "24/7 Pet Care Services",
    type: "caretaker",
    location: "City Center",
    rating: 4.3,
    reviewCount: 145,
    price: 30,
    priceType: "hour",
    availability: false,
    image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&h=400&fit=crop"
  }
];

const ServiceTemplate = ({ type = "all", id = null }) => {
  const [filters, setFilters] = useState({
    category: type === "all" ? "" : type,
    priceRange: [0, 2000],
    rating: 0,
    availability: false
  });
  
  const [sortBy, setSortBy] = useState("rating-desc");
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort providers
  const filteredProviders = useMemo(() => {
    let filtered = mockProviders.filter(provider => {
      if (filters.category && provider.type !== filters.category) return false;
      if (provider.price < filters.priceRange[0] || provider.price > filters.priceRange[1]) return false;
      if (provider.rating < filters.rating) return false;
      if (filters.availability && !provider.availability) return false;
      return true;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating-desc":
          return b.rating - a.rating;
        case "rating-asc":
          return a.rating - b.rating;
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        default:
          return 0;
      }
    });

    return filtered;
  }, [filters, sortBy]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      category: type === "all" ? "" : type,
      priceRange: [0, 200],
      rating: 0,
      availability: false
    });
  };

  const getServiceTypeLabel = (serviceType) => {
    const labels = {
      vet: "Veterinarian",
      groomer: "Pet Groomer",
      trainer: "Pet Trainer",
      caretaker: "Pet Caretaker"
    };
    return labels[serviceType] || serviceType;
  };

  const StarRating = ({ rating, reviewCount }) => (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4  ${
              star <= rating
                ? "fill-yellow-400 text-black/10"
                : "text-black/10 fill-white "
            }`}
          />
        ))}
      </div>
      <span className="text-sm text-gray-600">
        {rating} ({reviewCount})
      </span>
    </div>
  );

const ServiceCard = ({ provider }) => (
  <div className="bg-[#E5E5CB] rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow pr-5 p-2">
    <div className="flex flex-col sm:flex-row items-center">
      <div className="w-full sm:w-32 h-48 sm:h-32 flex-shrink-0 flex items-center justify-center mb-4 sm:mb-0">
        <img
          src={provider.image}
          alt={provider.name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      
      <div className="flex-1 px-4  sm:pt-4 text-center sm:text-left">
        <div className="mb-2">
          <h3 className="font-semibold text-lg text-stone-800">{provider.name}</h3>
          <p className="text-sm text-amber-800 capitalize">{getServiceTypeLabel(provider.type)}</p>
        </div>
        
        
        <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
          <MapPin className="w-4 h-4 text-stone-500" />
          <span className="text-sm text-stone-600">{provider.location}</span>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
          <StarRating rating={provider.rating} reviewCount={provider.reviewCount} />
          <div className="flex items-center justify-center sm:justify-start gap-1">
            <Clock className="w-4 h-4 text-stone-600" />
            <span className={`text-sm ${provider.availability ? 'text-green-700' : 'text-red-700'}`}>
              {provider.availability ? 'Available' : 'Busy'}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-center sm:items-end justify-center h-full  gap-2 sm:ml-4 min-w-max">
        <div className="text-lg font-bold text-gray-900 text-center/ pr-1">
          ₹{provider.price}
          <span className="text-sm font-normal text-gray-600">/{provider.priceType}</span>
        </div>
        <button className="bg-amber-700 text-white px-6 py-3 rounded-3xl hover:bg-amber-800 transition-colors whitespace-nowrap w-full sm:w-auto">
          Book Now
        </button>
        
      </div>
    </div>
  </div>
);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {type === "all" ? "All Service Providers" : `${getServiceTypeLabel(type)}s`}
          </h1>
          <p className="text-gray-600">
            {filteredProviders.length} providers found
          </p>
        </div>

        <div className="flex gap-6">
          {/* Left Sidebar - Filters */}
          <div className="w-64 flex-shrink-0 hidden lg:block">
            <div className="bg-[#E5E5CB] rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </h2>
                <button
                  onClick={resetFilters}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Reset
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2 flex items-center justify-between">
                  Category
                </h3>
                <div className="space-y-2">
                  {["", "vet", "groomer", "trainer", "caretaker"].map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        checked={filters.category === category}
                        onChange={() => handleFilterChange("category", category)}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">
                        {category === "" ? "All Types" : getServiceTypeLabel(category)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2 flex items-center justify-between">
                  Price Range
                </h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={filters.priceRange[1]}
                    onChange={(e) => handleFilterChange("priceRange", [0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹0</span>
                    <span>₹{filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2 flex items-center justify-between">
                  Minimum Rating
                </h3>
                <div className="space-y-2">
                  {[0, 3, 4, 4.5].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="rating"
                        checked={filters.rating === rating}
                        onChange={() => handleFilterChange("rating", rating)}
                        className="mr-2"
                      />
                      <div className="flex items-center gap-1">
                        {rating === 0 ? (
                          <span className="text-sm text-gray-700">Any Rating</span>
                        ) : (
                          <>
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-gray-700">{rating}+ Stars</span>
                          </>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2 flex items-center justify-between">
                  Availability
                </h3>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.availability}
                    onChange={(e) => handleFilterChange("availability", e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Available Now</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 w-full lg:w-auto">
            {/* Sort Controls */}
            <div className="bg-[#E5E5CB] rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-stone-600">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 sm:flex-none"
                  >
                    <option value="rating-desc">Highest Rated</option>
                    <option value="rating-asc">Lowest Rated</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </div>
                
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center justify-center gap-2 text-sm text-gray-600 border border-gray-300 rounded-md px-4 py-2 w-full sm:w-auto"
                >
                  <Filter className="w-4 h-4" />
                  Filters & Sort
                </button>
              </div>
            </div>

            {/* Service Provider List */}
            <div className="space-y-4">
              {filteredProviders.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                  <div className="text-gray-400 mb-2">
                    <Filter className="w-12 h-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No providers found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your filters to see more results.</p>
                  <button
                    onClick={resetFilters}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                filteredProviders.map((provider) => (
                  <ServiceCard key={provider.id} provider={provider} />
                ))
              )}
            </div>

            {/* Load More Button (for pagination simulation) */}
            {filteredProviders.length > 0 && (
              <div className="mt-8 text-center">
                <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors">
                  Load More Providers
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay - Amazon-style bottom sheet */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-lg max-h-[80vh] overflow-hidden">
            {/* Handle bar */}
            <div className="flex justify-center py-3 border-b border-gray-200">
              <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
            </div>
            
            <div className="p-4 overflow-y-auto max-h-[calc(80vh-60px)]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900 text-lg">Filters</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Category</h3>
                <div className="space-y-3">
                  {["", "vet", "groomer", "trainer", "caretaker"].map((category) => (
                    <label key={category} className="flex items-center py-2">
                      <input
                        type="radio"
                        name="category"
                        checked={filters.category === category}
                        onChange={() => handleFilterChange("category", category)}
                        className="mr-3 w-4 h-4"
                      />
                      <span className="text-gray-700">
                        {category === "" ? "All Types" : getServiceTypeLabel(category)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={filters.priceRange[1]}
                    onChange={(e) => handleFilterChange("priceRange", [0, parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹0</span>
                    <span>₹{filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Minimum Rating</h3>
                <div className="space-y-3">
                  {[0, 3, 4, 4.5].map((rating) => (
                    <label key={rating} className="flex items-center py-2">
                      <input
                        type="radio"
                        name="rating"
                        checked={filters.rating === rating}
                        onChange={() => handleFilterChange("rating", rating)}
                        className="mr-3 w-4 h-4"
                      />
                      <div className="flex items-center gap-2">
                        {rating === 0 ? (
                          <span className="text-gray-700">Any Rating</span>
                        ) : (
                          <>
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-gray-700">{rating}+ Stars</span>
                          </>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Availability</h3>
                <label className="flex items-center py-2">
                  <input
                    type="checkbox"
                    checked={filters.availability}
                    onChange={(e) => handleFilterChange("availability", e.target.checked)}
                    className="mr-3 w-4 h-4"
                  />
                  <span className="text-gray-700">Available Now</span>
                </label>
              </div>

              {/* Apply and Reset buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={resetFilters}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-md hover:bg-gray-200 transition-colors font-medium"
                >
                  Reset
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceTemplate;