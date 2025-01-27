import React from 'react'
import { NavLink } from 'react-router-dom'

const CardHero = ({link='',text='',img='', alt=''}) => {
  return (
    <>
        <div className="flex justify-center items-center p-4 hover:shadow-xl rounded-xl hover:bg-n-5 hover:-translate-y-2 cursor-pointer hover:scale-90 transition-transform duration-300">
            <NavLink to={link} className="block text-center">
              <img
                src={img}
                className="w-32 max-w-xs mx-auto mb-4"
                alt={alt}
              />
              <p className="text-lg font-medium">
                {text}
              </p>
            </NavLink>
          </div>
    </>
  )
}

export default CardHero