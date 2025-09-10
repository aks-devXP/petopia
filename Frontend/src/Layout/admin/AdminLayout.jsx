import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

const AdminLayout = () => {
  return (
    <>
        <div className='relative h-screen bg-[#1A120B]">'>
          <Navbar></Navbar>
          <Outlet></Outlet>
          <Footer></Footer>
          <ToastContainer/>
        </div>
    </>
  )
}

export default AdminLayout