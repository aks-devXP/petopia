import React from 'react'
import { NavLink } from 'react-router-dom'

const CardHero = ({link='',text='',img='', alt=''}) => {
  return (
    <>
        <div className="flex justify-center items-center p-4 hover:shadow-xl rounded-[30px] hover:text-black hover:bg-white  cursor-pointer hover:scale-95 transition-transform duration-150">
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