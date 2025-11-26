import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({img='', id='A', topic="Sample Headline", subtopic="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam dolorum tempora rerum sit ratione molestias."}) => {
  return (
    <>  
        <div className='bg-app-elevated w-72 sm:w-80 md:w-96 flex-col rounded-3xl overflow-hidden mx-4 border border-app-surface shadow-sm hover:shadow-md hover:shadow-brand/10 transition-shadow duration-300'>
        <Link to={`/news/${id}`}>
            <div className='overflow-hidden'>
                <img className='hover:scale-110 hover:cursor-pointer transition-transform duration-500 rounded-0' src={img} alt="" />
            </div>
        </Link>
        
        <Link to={`/news/${id}`}>
            <div className='my-4 mx-4'> 
                <h2 className='text-ink-primary font-semibold text-center text-xl'>{topic}</h2>
                <h6 className='text-ink-primary/80 font-normal '>{subtopic}</h6>
            </div>
        </Link>
        </div>
    </>
  )
}

export default Card
