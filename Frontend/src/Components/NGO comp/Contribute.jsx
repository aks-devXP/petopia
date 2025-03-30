import React from 'react';
import BasicHero from '../BasicHero';

const Contribute = () => {
  const cards = [
    { title: 'Donate', description: 'Your donations help us provide food, shelter, and medical care for animals in need.' },
    { title: 'Report', description: 'Report any stray or injured animals you find so we can assist them promptly.' },
    { title: 'Adopt a Pet', description: 'Give a loving home to a pet in need. Adoption saves lives!' },
    { title: 'Volunteer', description: 'Join us in our efforts. Your time can make a significant difference.' },
  ];

  return (
    <div className="w-full h-fit mx-auto p-6 bg-transparent text-white rounded-lg shadow-lg">
      {/* <h2 className="text-2xl font-semibold text-left mb-6">Bring a Change By</h2> */}
      {/* <div className='flex flex-col gap-5 w-full'>
        <div className='flex w-full justify-around '>
          {cards.slice(0,2).map((card, index) => (
            <div className="w-[40%] p-4 border-2 border-gray-200 rounded-lg text-center transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
              <h3 className="text-lg font-bold">{card.title}</h3>
              <p className="mt-2 text-gray-600 opacity-0 hover:opacity-100 transition-opacity duration-300">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        <div>
          <div className="text-center">
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
              Contribute
            </button>
          </div>
        </div>

        <div className='flex justify-around'>
          {cards.slice(2,4).map((card, index) => (
            <div className="w-[40%] p-4 border-2 border-gray-200 rounded-lg text-center transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
              <h3 className="text-lg font-bold">{card.title}</h3>
              <p className="mt-2 text-gray-600 opacity-0 hover:opacity-100 transition-opacity duration-300">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div> */}

      <div className='w-full my-10'>
          <BasicHero title={"Need to find a new home for a pet?"} description={"We're here to help them find a new, loving family—quickly and safely with Rehome by Adopt a Pet."} buttonText={"Learn More"} imageSrc={"https://media.adoptapet.com/image/upload/c_scale,w_524,dpr_2/f_auto,q_auto/homepage-rehome-pet.jpg"} imageLeft={false}/>
      </div>

      
    </div>
  );
};

export default Contribute;