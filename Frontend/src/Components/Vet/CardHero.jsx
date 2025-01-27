import React from 'react'
import { NavLink } from 'react-router-dom'

const CardHero = ({link='',text='',img='', alt=''}) => {
  return (
    <>
        <div className="w-36 pt-3 hover:shadow-xl rounded-xl bg-n-11 hover:bg-n-8 hover:-translate-y-2 cursor-pointer hover:scale-90 transition-transform duration-300">
            <NavLink to={link} className="block text-center">
              <div className='w-16 h-16 mx-auto bg-white px-2 py-2 rounded-2xl'>
                <img
                  src={img}
                  className="mb-4"
                  alt={alt}
                />
              </div>
              <p className="text-lg font-medium">
                {text}
              </p>
            </NavLink>
          </div>
    </>
  )
}

export default CardHero