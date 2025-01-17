import React from 'react'
import Slider from '../Components/Slider'
import HeroNav from '../Components/HeroNav'
import NgoHome
 from '../Components/HomeNews/NewsHome'
const Home = () => {
  return (
    <div className='my-2 bg-slate-500'>
      <Slider></Slider>
      <HeroNav></HeroNav>
      <NgoHome></NgoHome>
    </div>
  )
}

export default Home
