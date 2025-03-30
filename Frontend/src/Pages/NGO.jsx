import React from 'react'
import Banner from '../Components/NGO comp/Banner'
import Contribute from '../Components/NGO comp/Contribute'
import LayeredCard from '../Components/NGO comp/LayeredCard'
const NGO = () => {
  return (
    <div className='w-full'>
     <div className='w-full'>
      <Banner/>
     </div>
     <div className='w-full'>
      <Contribute/>
     </div>
      <div>
        <LayeredCard/>
      </div>
    </div>
  )
}

export default NGO
