import React from 'react';
import heartIcon from '../assets/trainer.png';
import receiveIcon from '../assets/animal-rights.png';
import scholarIcon from '../assets/pet-shop.png';
import vet from '../assets/vet.png';
import Card from './CardHero';

const HeroNav = () => {
  return (
    <section className="py-16 bg-n-8">
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-10">Welcome to Petopia</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <Card link='/vet' text='Book an Appointment' img={vet} alt='Vet Logo Art'></Card>
          <Card link='/trainer' text='Pet Trainers Nearby' img={heartIcon} alt="Pet Trainer Logo Art"></Card>
          <Card link='/ngo' text='Animal Welfare' img={receiveIcon} alt='NGO Logo Art'></Card>
          <Card link='/shopping' text='Shopping' img={scholarIcon} alt='Shopping Logo Art'></Card>
        </div>
      </div>
    </section>
  );
};

export default HeroNav;
