import React from 'react'
import Slider from '../Components/Slider'
import HeroNav from '../Components/HeroNav'
import NgoHome from '../Components/HomeNews/NewsHome'
import './HomePage.css'
import backgrougvideo from '../assets/HomePageVideo/HV6.mp4'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className='mainpage'>
        <div className="overlay"></div>
        <video className="bgvideo" src={backgrougvideo} autoPlay loop muted/>
        <div className='content'>
         <Navbar></Navbar>
        </div>
        <div className='center-content'>
        <p className='page-info'>
          Where pet parents find expert care, top products, and trusted trainers.
        </p>
        <button className='about-button'>
            <NavLink to="/about">About Us</NavLink>
        </button>
        
        </div>
      </div>
      {/* <HeroNav></HeroNav>
      <NgoHome></NgoHome>
      <Footer></Footer> */}
    </div>
  )
}

export default Home
