import React from 'react'
import Navbar from "../Components/Navbar"
import ShoppingMenu from "../Components/NavbarMenu/ShoppingMenu"
export default function ProductDirectory() {
  return (
    <div className='h-[3000px] bg-blue-200'>
        <Navbar MenuComponent={ShoppingMenu} />
        <div className='flex h-40'>
        <div className='w-1/2 h-full bg-white'></div>
        <div className='w-1/2 bg-white'></div>
        </div>
    </div>
  )
}
