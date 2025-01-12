import React from 'react';
import dog from '../assets/home-slider/dog-human.jpg';
import trainer from '../assets/home-slider/trainer.jpg';
import vet from '../assets/home-slider/vet.jpg';
import SliderImages from './SliderImages';

const Slider = () => {
    const slideImages = [trainer,dog,vet];
  return (
        <div className='h-fit'>
            <SliderImages slides={slideImages}></SliderImages>
        </div>
  )
}

export default Slider