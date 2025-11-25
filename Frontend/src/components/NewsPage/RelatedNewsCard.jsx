import React from 'react'

const RelatedNewsCard = ({img, author, topic, time}) => {
  return (
    <>
        <div className='mt-8'>
            <img src="https://ichef.bbci.co.uk/news/1024/cpsprodpb/646c/live/aa9b0190-d359-11ef-8fbe-83f74621e55c.jpg.webp" className='hover:cursor-pointer w-full h-full object-cover rounded-lg shadow shadow-brand/10' alt="" />
            <p className='text-xs text-center mt-1 text-ink-primary/70'>Leslie Peene | 7 Hours Ago</p>
            <p className='text-sm text-pretty font-semibold mt-1 text-ink-primary hover:cursor-pointer hover:text-brand'>Endangered cats rehomed after owner is convicted</p>
            <p className='text-center text-xs text-ink-primary/70'>3 minute read</p>
        </div>
    </>
  )
}

export default RelatedNewsCard
