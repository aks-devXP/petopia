import React from 'react'
import { Link } from 'react-router-dom'
import ScrollToTop from '../ScrollToTop'

const Card = ({img='', id='A', topic="Sample Headline", subtopic="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam dolorum tempora rerum sit ratione molestias."}) => {
  return (
    <>  
        <div className='bg-white w-[30%] flex-col rounded-3xl overflow-hidden mx-10 border-8 border-[#595758]'>
        <Link to={`/news2/${id}`}>
            <div className='overflow-hidden'>
                <img className='hover:scale-110 hover:cursor-pointer transition-transform duration-500 rounded-0' src={img} alt="" />
            </div>
        </Link>
        
        <Link to={`/news2/${id}`}>
            <div className='my-4 mx-4'>
                <h2 className='text-black font-semibold text-center text-xl'>{topic}</h2>
                <h6 className='text-gray-500 font-normal '>{subtopic}</h6>
            </div>
        </Link>
        </div>
    </>
  )
}

export default Card