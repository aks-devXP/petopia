import React, { useEffect, useState } from 'react'
import Category from '../Components/Guide/Category'
import Lister from '../Components/Guide/Lister'
import PawSearchBar from '../Components/Guide/PawSearchBar'
import Loader from '../Components/Loader/Loader'
import { getAllAnimals } from '../Util/Guide/AnimalService'
const ALL_CATEGORIES = [
  { id: 'Dog', name: 'Dog' },
  { id: 'Cat', name: 'Cat' },
  { id: 'Fish', name: 'Fish' },
  { id: 'Bird', name: 'Bird' },
  { id: 'Reptile', name: 'Reptile' },
  { id: 'Rodent', name: 'Rodent' }
]

const GuideDisplay = () => {
  const [selectedCats, setSelectedCats] = useState([])
  
  let animals = getAllAnimals()
  animals = animals.filter((animal) => {
    if (selectedCats.length === 0) {
      return true
    }
    return selectedCats.includes(animal.category)
  }
  )
  const [loaded, setLoaded] = useState(false);

  useEffect(()=>{
    const loadingComplete = ()=>{
      setLoaded(true);
    };

    if (document.readyState == "complete"){
      setLoaded(true);

    }
    else{
      window.addEventListener('load',loadingComplete);
    }
    return()=>{
    window.removeEventListener('load',loadingComplete)
  };
    
  },[]);
  return (
    <>
    {loaded ?
    (<div className='w-full h-auto flex flex-col items-center bg-[#101017]'>
      <div className='w-full flex  justify-center items-center  py-4 border-b-[.5px]  border-[#e0e6f8] rounded-md'>
        <div className='mx-4 ' >
        <PawSearchBar/>

        </div>
        <div>
          <Category
          categories={ALL_CATEGORIES}
          selectedCategories={selectedCats}
          onChange={setSelectedCats}/>
        </div>
      </div>
      <div className= "flex flex-col flex-1">
        <Lister animals={animals} />
      </div>

    </div>)
    :(<div>
      <Loader/>
      </div>)}
    </>
  )
}

export default GuideDisplay
