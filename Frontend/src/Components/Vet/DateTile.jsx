import React from 'react'

const DateTile = ({day,date,toggle,click}) => {
  return (
    <>
        <div className={`flex flex-col items-center border-2 rounded-3xl w-fit h-fit px-6 py-2 justify-center shadow-md cursor-pointer hover:bg-n-12 ${toggle ? 'bg-n-12' : 'bg-inherit'} duration-500`} onClick={click}>
            <span>{day}</span>
            <span>{date}</span>
        </div>
    </>
  )
}

export default DateTile