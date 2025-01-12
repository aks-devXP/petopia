import React from 'react'
import Header from "../Components/Header"
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router-dom'

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