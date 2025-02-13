import React from 'react'

const ButtonNav = ({icon,content,click, isActive}) => {
  return (
    <div onClick={click} className={`relative w-full pl-3  my-4 py-4 hover:cursor-pointer ${isActive ? 'font-semibold bg-n-9' : 'font-normal'}`}>
      <div className='flex items-center'>
        <div className='mr-2'>
          {icon}
        </div>
        {content}
        {isActive ? <div className='absolute right-0 w-1 h-[100%] rounded-3xl bg-white'>
          </div> : <></>}
      </div>
    </div>
  )
}

export default ButtonNav