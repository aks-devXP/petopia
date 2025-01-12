import React from 'react'
import SliderImages from './SliderImages';
import trainer from '../assets/home-slider/dog.jpg'
import dog from '../assets/home-slider/dog-human.jpg'
import vet from '../assets/home-slider/vet.jpg'

const Slider = () => {
    const slideImages = [trainer,dog,vet];
  return (
    <>
        <div className='w-auto'>
            <SliderImages slides={slideImages}></SliderImages>
        </div>
    </>
  )
}

export default Slider