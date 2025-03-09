import React from 'react'
import { NavLink } from 'react-router-dom'

const CardHero = ({link='',text='',img='', alt=''}) => {
  return (
    <>
        <div className="w-36 pt-3  rounded-xl  hover:shadow-2xl hover:scale-105 transition-transform duration-300">
            <div className="block text-center">
              <div className='w-16 h-16 mx-auto bg-n-1 px-2 py-2 rounded-2xl'>
                <img
                  src={img}
                  className="mb-4"
                  alt={alt}
                />
              </div>
              <p className="mx-2 my-1 font-medium cursor-default">
                {text}
              </p>
            </div>
          </div>
    </>
  )
}

export default CardHero