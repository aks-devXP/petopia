import React from 'react'
import Slider from '../Components/Slider'
import HeroNav from '../Components/HeroNav'
import NgoHome from '../Components/HomeNews/NewsHome'
import './HomePage.css'
import backgrougvideo from '../assets/HomePageVideo/HV6.mp4'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'


const Home = () => {
  return (
    <div>
      <div className='mainpage'>
        <div className="overlay"></div>
        <video className="bgvideo" src={backgrougvideo} autoPlay loop muted/>
        <div className='content'>
         <Navbar></Navbar>
        </div>
      </div>
      <HeroNav></HeroNav>
      <NgoHome></NgoHome>
      <Footer></Footer>
    </div>
  )
}

export default Home
