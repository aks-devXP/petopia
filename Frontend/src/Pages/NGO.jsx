import React from 'react'
import Banner from '../Components/NGO comp/Banner'
import Contribute from '../Components/NGO comp/Contribute'
import LayeredCard from '../Components/NGO comp/LayeredCard'
import WeekTop from '../Components/NGO comp/WeekTop'
import Impact from '../Components/NGO comp/Impact'
const NGO = () => {
  return (
    <div className='w-full'>
     <div className='w-full'>
      <Banner/>
     </div>
     <div>
      <Impact/>
     </div>
     <div>
      <WeekTop/>
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
