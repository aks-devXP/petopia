import React, { useEffect, useRef, useState } from 'react'
import Pagination from '../Components/General/Pagination'
import Category from '../Components/Guide/Category'
import Lister from '../Components/Guide/Lister'
import PawSearchBar from '../Components/Guide/PawSearchBar'
import { getAllAnimals, getAnimalCount } from '../Util/Guide/AnimalService'
import { urlChanger } from '../Util/general/Url'

const ALL_CATEGORIES = [
  { id: 'Dog', name: 'Dog' },
  { id: 'Cat', name: 'Cat' },
  { id: 'Fish', name: 'Fish' },
  { id: 'Bird', name: 'Bird' },
  { id: 'Reptile', name: 'Reptile' },
  { id: 'Rodent', name: 'Rodent' },
]
export default function GuideDisplay({ count = 8, maxVisiblePages = 5 }) {
  const [selectedCats, setSelectedCats] = useState([])
  const [page, setPage] = useState(1)
  const [endPage, setEndPage] = useState(5)
  const [animals, setAnimals] = useState([])
  const [loaded, setLoaded] = useState(false)

  // flag to prevent pushState when handling popstate
  const isPopNavRef = useRef(false)

  // Parse initial state from URL on first render
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlPage = parseInt(params.get('page') || '1', 10)
    const catsParam = params.get('categories')
    
    const cats = catsParam ? catsParam.split(',').filter(Boolean) : []
    setSelectedCats(cats)
    setPage(Number.isFinite(urlPage) && urlPage > 0 ? urlPage : 1)

    const onLoad = () => setLoaded(true)
    if (document.readyState === 'complete') setLoaded(true)
    else window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  // Compute animals when page/filters change
  useEffect(() => {
    setAnimals(getAllAnimals(page, count, selectedCats))
  }, [page, count, selectedCats])

  // Recompute total pages when filters/count change
  useEffect(() => {
    const total = getAnimalCount(selectedCats)
    const pages = Math.max(1, Math.ceil(total / count))
    setEndPage(pages)
    if (page > pages) {
      setPage(1)
      
    }
  }, [selectedCats, count])

  // Sync URL when state changes — but skip if we arrived via popstate
  useEffect(() => {
    if (!loaded) return
    if (isPopNavRef.current) {
      isPopNavRef.current = false // consume the flag
      return
    }
    urlChanger(selectedCats, page) // pushState ONLY for user-initiated changes
  }, [selectedCats, page, loaded])

  // Handle Back/Forward
  useEffect(() => {
    const handlePopState = (ev) => {
      // mark this render as pop navigation so we don't push a new entry
      isPopNavRef.current = true

      const params = new URLSearchParams(window.location.search)
      const pgn = parseInt(params.get('page') || '1', 10)
      setPage(Number.isFinite(pgn) && pgn > 0 ? pgn : 1)

      const catsFromState = (ev.state && ev.state.category) || []
      if (Array.isArray(catsFromState)) {
        setSelectedCats(catsFromState)
      } else {
        // fall back to query param if state missing
        const catsParam = params.get('categories')
        const cats = catsParam ? catsParam.split(',').filter(Boolean) : []
        setSelectedCats(cats)
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const changePageHandler = (nextPage) => {
    if (nextPage === page) return
    setPage(nextPage) 
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const onCategoriesChange = (cats) => {
    setSelectedCats(cats)
    setPage(1)
  }

  return (
    <div className='w-full h-auto flex flex-col items-center bg-[#101017]'>
      <div className='w-full flex justify-center items-center py-4 border-b-[.5px] border-[#e0e6f8] rounded-md'>
        <div className='mx-4'>
          <PawSearchBar />
        </div>
        <div>
          <Category
            categories={ALL_CATEGORIES}
            selectedCategories={selectedCats}
            onChange={onCategoriesChange}
          />
        </div>
      </div>

      <div className='flex flex-col flex-1'>
        <Lister animals={animals} />
      </div>

      <div>
        <Pagination
          start={1}
          end={endPage}
          currentPage={page}
          PageChangeHandler={changePageHandler}
          maxVisiblePages={maxVisiblePages}
        />
      </div>
    </div>
  )
}
