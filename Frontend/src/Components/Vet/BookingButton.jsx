import React from 'react'
import { CalendarCheck } from 'lucide-react';

const BookingButton = () => {
  return (
    <>
        <div className='border-2 w-fit h-fit px-3 py-4 rounded-xl border-white font-light hover:bg-blue-500 hover:border-blue-500 text-sm text-center cursor-pointer flex gap-3 items-center duration-500 hover:scale-105'>
            <button>Confirm Appointment</button>
            <div>
                <CalendarCheck />
            </div>
        </div>
    </>
  )
}

export default BookingButton