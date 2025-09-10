// src/components/Guide/InfoRow.jsx
import {
  Activity,
  Award,
  Heart,
  Home,
  Hourglass,
  Ruler,
  Scale,
  Scissors,
} from 'lucide-react'
import React from 'react'
import PawRating from './PawRating'

export default function InfoRow({ data }) {
  return (
    <div className="
      bg-white/20 text-[#ced1fbea] backdrop-blur-md border border-white/30
      rounded-xl
      p-4 sm:p-6 md:p-8
      flex flex-col md:flex-row
      gap-4 sm:gap-6 md:gap-8
      items-center md:items-start
    ">
      {/* Photo */}
      {/* <img
        src={germanShepherdImg}
        alt={data.breedGroup}
        className="
          w-full max-w-xs
          object-cover rounded-lg
          md:w-36 md:h-36
          mx-auto md:mx-0
        "
      /> */}

      {/* Info block */}
      <div className="flex-1 space-y-3 sm:space-y-4">
        {/* Breed Group */}
        <div className="flex items-center space-x-2">
          <Award className="w-4 h-4 sm:w-5 sm:h-5 opacity-90" />
          <span className="font-medium text-sm sm:text-base">
            {data.name}
          </span>
        </div>

        {/* Temperament */}
        <div className="flex items-center space-x-2">
          <Heart className="w-4 h-4 sm:w-5 sm:h-5 opacity-90" />
          <span className="font-medium text-sm sm:text-base">Temperament:</span>
          <span className="ml-auto text-sm sm:text-base">{data.temperament}</span>
        </div>

        {/* Height */}
        <div className="flex items-center space-x-2">
          <Ruler className="w-4 h-4 sm:w-5 sm:h-5 opacity-90" />
          <span className="font-medium text-sm sm:text-base">Height:</span>
          <span className="ml-auto text-sm sm:text-base">{data.height}</span>
        </div>

        {/* Energy Level */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 sm:w-5 sm:h-5 opacity-90" />
            <span className="font-medium text-sm sm:text-base">Energy Level:</span>
          </div>
          <PawRating rating={data.energyLevel} />
        </div>

        {/* Weight */}
        <div className="flex items-center space-x-2">
          <Scale className="w-4 h-4 sm:w-5 sm:h-5 opacity-90" />
          <span className="font-medium text-sm sm:text-base">Weight:</span>
          <span className="ml-auto text-sm sm:text-base">{data.weight}</span>
        </div>

        {/* Life Expectancy */}
        <div className="flex items-center space-x-2">
          <Hourglass className="w-4 h-4 sm:w-5 sm:h-5 opacity-90" />
          <span className="font-medium text-sm sm:text-base">
            Life Expectancy:
          </span>
          <span className="ml-auto text-sm sm:text-base">
            {data.lifeExpectancy}
          </span>
        </div>

        {/* Grooming Needs */}
        <div className="flex items-center space-x-2">
          <Scissors className="w-4 h-4 sm:w-5 sm:h-5 opacity-90" />
          <span className="font-medium text-sm sm:text-base">
            Grooming Needs:
          </span>
          <span className="ml-auto text-sm sm:text-base">
            {data.groomingNeeds}
          </span>
        </div>

        {/* Can Stay Alone */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Home className="w-4 h-4 sm:w-5 sm:h-5 opacity-90" />
            <span className="font-medium text-sm sm:text-base">
              Can Stay Alone:
            </span>
          </div>
          <PawRating rating={data.canStayAlone} />
        </div>
      </div>
    </div>
  )
}