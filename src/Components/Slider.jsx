import React from 'react';
import dog from '../assets/home-slider/dog-human.jpg';
import volunteer from '../assets/home-slider/volunteer.jpg';
import vet from '../assets/home-slider/vet.jpg';
import SliderImages from './SliderImages';

const Slider = ({images=[dog,vet,volunteer]}) => {
    const slideImages = images;
  return (
        <div className='h-fit'>
            <SliderImages slides={slideImages}></SliderImages>
        </div>
  )
}

export default Slider