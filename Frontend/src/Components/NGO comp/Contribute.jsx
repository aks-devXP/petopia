import React from 'react';

const Contribute = () => {
  const cards = [
    { title: 'Donate', description: 'Your donations help us provide food, shelter, and medical care for animals in need.' },
    { title: 'Report', description: 'Report any stray or injured animals you find so we can assist them promptly.' },
    { title: 'Adopt a Pet', description: 'Give a loving home to a pet in need. Adoption saves lives!' },
    { title: 'Volunteer', description: 'Join us in our efforts. Your time can make a significant difference.' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Bring a Change By</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {cards.map((card, index) => (
          <div key={index} className="relative group">
            <div className="p-4 border-2 border-gray-200 rounded-lg text-center transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
              <h3 className="text-lg font-bold">{card.title}</h3>
              <p className="mt-2 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
          Contribute
        </button>
      </div>
    </div>
  );
};

export default Contribute;