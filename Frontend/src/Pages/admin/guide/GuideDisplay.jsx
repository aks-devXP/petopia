import Pagination from '@/components/General/Pagination'
import Category from '@/Pages/admin/guide/components/Category'
import Lister from '@/Pages/admin/guide/components/Lister'
import PawSearchBar from '@/Pages/admin/guide/components/PawSearchBar'
import { useQueries } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { urlChanger } from '../../../Util/general/Url'

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
  const [loaded, setLoaded] = useState(false)

  // prevent pushState while handling popstate
  const isPopNavRef = useRef(false)

  // -------- React Query: list + total count + categories (in parallel) --------
  const [listQ, countQ, catQ] = useQueries({
    queries: [
      {
        // Paged animals for current filters
        queryKey: ['guide-pets', 'list', { page, count, selectedCats }],
        queryFn: async ({ queryKey, signal }) => {
          const { page, count, selectedCats } = queryKey[2]
          
          return await getPets(page - 1, selectedCats, count, signal) 
        },
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        staleTime: 120_000,
      },
      {
        // Total items for current filters (for endPage)
        queryKey: ['guide-pets', 'count', { selectedCats }],
        queryFn: async ({ queryKey, signal }) => {
          const { selectedCats } = queryKey[2]
          return getPetCount(selectedCats, signal)
        },
        refetchOnWindowFocus: false,
        staleTime: 120_000,
      },
      {
        // All unique categories 
        queryKey: ['guide-pets', 'categories'],
        queryFn: async ({ signal }) => {
          // If you don't yet have an endpoint, return undefined and we'll fallback
          return getUniquePetCategories(signal)
        },
        refetchOnWindowFocus: false,
        staleTime: 10 * 60_000,
      },
    ],
  })

  // -------- Derive data for UI from queries --------
  const animals = listQ.data ?? []
  const total = countQ.data ?? 0
  const endPage = Math.max(1, Math.ceil(total / count))
  const categories = catQ.data?? ALL_CATEGORIES;

  // show loader while first load or any fetch in-flight
  const isFetching = !loaded || listQ.isFetching || countQ.isFetching || catQ.isFetching

  // -------- On mount: hydrate state from URL (no pushState here) --------
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

  // -------- When filters change, clamp page if it goes out of range --------
  useEffect(() => {
    // When countQ finishes, endPage is derived automatically (no need to set local endPage)
    // If current page is beyond endPage (e.g., fewer results after filtering), reset to 1
    if (page > endPage) {
      setPage(1)
    }
  }, [selectedCats, count, endPage, page])

  // -------- Sync URL on state change — skip if we're handling popstate --------
  useEffect(() => {
    if (!loaded) return
    if (isPopNavRef.current) {
      isPopNavRef.current = false
      return
    }
    urlChanger(selectedCats, page)
  }, [selectedCats, page, loaded])

  // -------- Back/Forward handling (only set state; do not push) --------
  useEffect(() => {
    const handlePopState = (ev) => {
      isPopNavRef.current = true

      const params = new URLSearchParams(window.location.search)
      const pgn = parseInt(params.get('page') || '1', 10)
      setPage(Number.isFinite(pgn) && pgn > 0 ? pgn : 1)

      const catsFromState = (ev.state && ev.state.category) || []
      if (Array.isArray(catsFromState)) {
        setSelectedCats(catsFromState)
      } else {
        const catsParam = params.get('categories')
        const cats = catsParam ? catsParam.split(',').filter(Boolean) : []
        setSelectedCats(cats)
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // -------- Handlers --------
  const changePageHandler = (nextPage) => {
    if (nextPage === page) return
    setPage(nextPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const onCategoriesChange = (cats) => {
    setSelectedCats(cats)
    setPage(1) // reset to first page on filter change
  }

  // -------- Render --------
  if (isFetching) {
    return <Loader />
  }

  return (
    <div className='w-full h-auto flex flex-col items-center bg-[#101017]'>
      <div className='w-full flex justify-center items-center py-4 border-b-[.5px] border-[#e0e6f8] rounded-md'>
        <div className='mx-4'>
          <PawSearchBar />
        </div>
        <div>
          <Category
            categories={categories}
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
