import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer.jsx/Footer'
import Navbar from './Navbar/Navbar'

const Template = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
      
    </div>
  )
}

export default Template
