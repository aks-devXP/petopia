import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import Navbar from '../Components/Navbar'

const MainLayout = () => {
  return (
    <>
        <Navbar></Navbar>
        <Header></Header>
        <Outlet></Outlet>
        <Footer></Footer>
    </>
  )
}

export default MainLayout