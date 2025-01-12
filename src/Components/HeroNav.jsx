import React from 'react';
import { NavLink } from 'react-router-dom';
import heartIcon from '../assets/trainer.png';
import receiveIcon from '../assets/animal-rights.png';
import scholarIcon from '../assets/pet-shop.png';
import vet from '../assets/vet.png';

const HeroNav = () => {
  return (
    <section className="py-16 bg-n-8">
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-10">Welcome to Petopia</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Vet Appointment */}
          <div className="flex justify-center items-center p-4 hover:shadow-xl rounded-xl hover:bg-n-5 hover:-translate-y-2 cursor-pointer hover:scale-90 transition-transform duration-300">
            <NavLink to="/vet" className="block text-center">
              <img
                src={vet}
                className="w-32 max-w-xs mx-auto mb-4"
                alt="Vet Appointment"
              />
              <p className="text-lg font-medium">
                Book an <strong>Appointment</strong>
              </p>
            </NavLink>
          </div>

          {/* Pet Trainers */}
          <div className="flex justify-center items-center p-4 hover:shadow-xl hover:bg-n-5 hover:-translate-y-2 rounded-xl cursor-pointer hover:scale-90 transition-transform duration-300">
            <NavLink to="/trainer" className="block text-center">
              <img
                src={heartIcon}
                className="w-32 max-w-xs mx-auto mb-4"
                alt="Pet Trainers Nearby"
              />
              <p className="text-lg font-medium">
                <strong>Pet</strong> Trainers Nearby
              </p>
            </NavLink>
          </div>

          {/* Animal Welfare */}
          <div className="flex justify-center items-center p-4 hover:shadow-xl hover:bg-n-5 hover:-translate-y-2 rounded-xl cursor-pointer hover:scale-90 transition-transform duration-300">
            <NavLink to="/animal_welfare" className="block text-center">
              <img
                src={receiveIcon}
                className="w-32 max-w-xs mx-auto mb-4"
                alt="Animal Welfare"
              />
              <p className="text-lg font-medium">
                Animal <strong>Welfare</strong>
              </p>
            </NavLink>
          </div>

          {/* Shopping Center */}
          <div className="flex justify-center items-center p-4 hover:shadow-xl hover:bg-n-5 hover:-translate-y-2 rounded-xl cursor-pointer hover:scale-90 transition-transform duration-300">
            <NavLink to="/shopping" className="block text-center">
              <img
                src={scholarIcon}
                className="w-32 max-w-xs mx-auto mb-4"
                alt="Shopping Center"
              />
              <p className="text-lg font-medium">
                <strong>Shopping</strong> Center
              </p>
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroNav;
