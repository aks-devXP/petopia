import React from 'react'
import { NavLink } from 'react-router-dom'
import backgroundimg from '../assets/trainerbg.jpg'
import './Trainer.css'
function Trainer() {
  return (
    <div>
      <div className='trainer-container'>
        <div className="overlay"></div>
        <img className="bgimg" src={backgroundimg} alt="Trainer Background"/>
        <div className='content'></div>
        <div className='center-content'>
          <p className='page-info'>
            Where pet parents find expert care, and trusted trainers.
          </p>
          <button className='book-button'>
            <NavLink to="/book-trainer">Book Appointment</NavLink>
          </button>
        </div>
      </div>

      <div className='trainer-cards'>
        <div className='trainer-card-content'></div>
        <div className='trainer-card-img'></div>
      </div>

      <div className='trainer-cards'>
        <div className='trainer-card-img'></div>
        <div className='trainer-card-content'></div>
      </div>
      
      <div className='trainer-booking-button'></div>
    </div>
  )
}

export default Trainer