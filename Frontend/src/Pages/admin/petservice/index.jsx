import React from 'react'
import ServiceBanner from './components/ServiceBanner'
import MagicBento from './components/MagicBento/MagicBento'



export default function index() {
  
  return (
    <div>
      <ServiceBanner />
      <div className='sm:mx-6'>
        <MagicBento />
      </div>
    </div>
  )
}
