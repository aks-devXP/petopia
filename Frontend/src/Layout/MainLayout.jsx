import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'

const MainLayout = () => {
  return (
    <>
        <div className='relative h-screen'>
          <Navbar></Navbar>
          <Outlet></Outlet>
          <Footer></Footer>
          <ToastContainer/>
        </div>
    </>
  )
}

export default MainLayout