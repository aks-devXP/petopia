import React from 'react'

const RelatedNewsCard = () => {
  return (
    <>
        <div className='mt-8'>
            <img src="https://ichef.bbci.co.uk/news/1024/cpsprodpb/646c/live/aa9b0190-d359-11ef-8fbe-83f74621e55c.jpg.webp" className='hover:cursor-pointer w-full h-full object-cover rounded-lg' alt="" />
            <p className='text-xs text-center mt-1'>Leslie Peene | 7 Hours Ago</p>
            <p className='text-sm text-pretty font-semibold mt-1 hover:cursor-pointer hover:text-n-3'>Endangered cats rehomed after owner is convicted</p>
            <p className='text-center text-xs text-n-3'>3 minute read</p>
        </div>
    </>
  )
}

export default RelatedNewsCard