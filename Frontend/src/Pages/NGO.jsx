import React from 'react'
import LayeredCard from '../Components/NGO comp/LayeredCard'
import StackedCards from '../Components/NGO comp/StackedCards'

const NGO = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1>
        Welcome to Our NGO 
      </h1>
      <div className='h-1/3'>
      <StackedCards/>
      </div>
      
      <div>
        <LayeredCard/>
      </div>
    </div>
  )
}

export default NGO
