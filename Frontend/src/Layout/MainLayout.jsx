import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'

const MainLayout = () => {
  return (
    <>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
        <ToastContainer/>
    </>
  )
}

export default MainLayout