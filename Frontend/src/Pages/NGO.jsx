import React from 'react'
import Banner from '../Components/NGO comp/Banner'
import Contribute from '../Components/NGO comp/Contribute'
import LayeredCard from '../Components/NGO comp/LayeredCard'
const NGO = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-8'>
     <div className='w-full'>
      <Banner/>
     </div>
     <div>
      <Contribute/>
     </div>
      <div>
        <LayeredCard/>
      </div>
    </div>
  )
}

export default NGO
