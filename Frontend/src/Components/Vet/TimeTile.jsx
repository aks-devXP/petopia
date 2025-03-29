import React from 'react'

const TimeTile = ({time, fees,toggle,click}) => {
  return (
    <>
        <div className={`flex justify-between items-center mb-3 border-2 rounded-xl w-[80%] h-fit px-5 py-5 shadow-md cursor-pointer hover:bg-n-12 hover:scale-110 hover:text-white ${toggle ? 'bg-n-12 scale-105 text-white border-none' : 'bg-inherit'} duration-500`} onClick={click}>
            <span>{time}</span>
            <span>Rs. {fees}</span>
        </div>
    </>
  )
}

export default TimeTile