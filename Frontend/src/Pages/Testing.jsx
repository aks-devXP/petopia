import React from 'react'
import Banner from '../Components/Banner'
import WeekTop from '../Components/NGO comp/WeekTop'

// const response = await fetch('http://localhost:3456/generate', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({ prompt: "Explain AI in 5 words" })
// });

// const data = await response.json();
// console.log(data.text);

// testing for the slidebar
const Testing = () => {

  

  return (
    <>
      
      <div className='w-screen h-screen'>
        <Banner/>
        <div>
         <WeekTop/>
        </div>
        <div>
          <p>

          </p>
        </div>
      </div>
    </>
  )
}


export default Testing
