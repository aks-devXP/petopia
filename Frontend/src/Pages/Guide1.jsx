// src/pages/Guide1Page.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import chicken from '../assets/Food/chicken.svg';
import chocolate from '../assets/Food/chocolate.svg';
import fatty from '../assets/Food/fatty.svg';
import grain from '../assets/Food/grain.svg';
import grapes from '../assets/Food/grapes.svg';
import onion from '../assets/Food/onion.svg';
import vegetables from '../assets/Food/vegetables.svg';
import germanShepherd from '../assets/PetGuide/german shepherd.jpg';
import InfoRow from '../Components/Guide/InfoRow';
import InfoSection from '../Components/Guide/InfoSection';
import { getAnimalById } from '../Util/Guide/AnimalService';
export default function Guide1Page() {
  const id = useParams().id

  const [data,setData] = useState({
    breedGroup: 'Working (German Shepherd)',
    temperament: 'Alert, Courageous, Confident',
    height: '22–26 in (m), 20–24 in (f)',
    energyLevel: 4,
    weight: '65–90 lbs (m), 50–70 lbs (f)',
    lifeExpectancy: '9–13 yrs',
    groomingNeeds: 'Moderate — weekly brushing',
    canStayAlone: 2,
    physicalDescription:
      'Large, muscular with dense double coat, erect ears & bushy tail.',
    dietaryNeeds: [
      'High-quality protein (chicken, fish, beef)',
      'Whole grains (rice, oats)',
      'Veg & fruits for vitamins',
    ],
    healthIssues: [
      'Hip & elbow dysplasia',
      'Bloat (gastric torsion)',
      'Degenerative myelopathy',
    ],
  })
  const[ giveList,setGive] = useState([
    { label: 'Chicken, fish, meat, mutton (high-quality proteins)', icon: chicken },
    { label: 'Whole grains (brown rice, oatmeal)',               icon: grain   },
    { label: 'Vegetables & fruits (carrots, apples, blueberries)', icon: vegetables },
  ])

  const [avoidList,setAvoid] = useState([
    { label: 'Chocolate',      icon: chocolate  },
    { label: 'Grapes & raisins', icon: grapes   },
    { label: 'Onions & garlic',  icon: onion    },
    { label: 'Excessively fatty or processed foods', icon: fatty },
  ])

  useEffect(() => {
    console.log('Fetching data for ID:', id)
    const animal = getAnimalById(id)

    if (animal) {
      setData(animal)
      setGive(animal.dietaryNeeds)
      setAvoid(animal.dietaryAvoid)
      console.log('Loaded animal:', animal)
    } else {
      console.error(`No animal found with id "${id}"`)
    }

  }, [id])
  return (
    <div className="min-h-screen bg-[#101017]">
      {/* ... header/breadcrumb code ... */}

      <main className="max-w-4xl mx-auto  px-4">
        {/* Hero Image */}
        <div className="flex  justify-center w-full ">
          <div className='w-full mt-4 sm:w-1/2 md:w-1/2 lg:w-[75%] rounded-lg shadow-md shadow-[#9a95d7]'>
          <img
            src={data.img || germanShepherd}
            alt="German Shepherd"
            className="object-contain  rounded-lg shadow-lg w-full "
          />
          </div>
          
        </div>

        {/* Glassy Basic Info Card */}
        <div className="mt-6">
          <InfoRow data={data} />
        </div>

        {/* Detail Sections */}
        <div className="mt-8 space-y-6">
          <InfoSection
            title="Physical Description"
            text={data.physicalDescription}
          />
          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h2 className="text-xl font-bold text-gray-100 mb-4">Diet</h2>
          <InfoSection title="To Give"  items={giveList} />
          <InfoSection title="To Avoid" items={avoidList} />
        </div>

        <InfoSection
          title="Health Issues"
          items={data.healthIssues}
        />
        </div>
      </main>
    </div>
  )
}