import React from 'react'

const DateTile = ({day,date,toggle,click}) => {
  return (
    <>
        <div className={`flex flex-col items-center border-2 rounded-lg w-fit h-fit px-7 py-3 justify-center cursor-pointer hover:bg-n-12 hover:text-white hover:scale-90 ${toggle ? 'bg-n-12 border-none scale-95 text-white' : 'bg-inherit'} transition-all duration-300`} onClick={click}>
            <span>{day}</span>
            <span>{date}</span>
        </div>
    </>
  )
}

export default DateTile