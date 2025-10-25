import React from 'react'

export default function images() {
  return (
    <div>
      <div className="flex-1 flex items-center justify-center">
            <img
              src={catImage}
              className="
                w-full h-full object-cover rounded-[28px]
                transition-all duration-200 hover:scale-[1.01] hover:cursor-pointer
                shadow-[0_10px_30px_rgba(0,0,0,0.25)]
              "
              alt="Cat"
            />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <img
              src={dogImage}
              className="
                w-full h-full object-cover rounded-[28px]
                transition-all duration-200 hover:scale-[1.01] hover:cursor-pointer
                shadow-[0_10px_30px_rgba(0,0,0,0.25)]
              "
              alt="Dog"
            />
          </div>
    </div>
  )
}
