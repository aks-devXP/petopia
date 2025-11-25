import React, { useMemo, useState, useRef, useEffect } from 'react'
import NewsHero from '@/components/NewsPage/NewsHero'
import NewsFilters from '@/components/NewsPage/NewsFilters'
import NewsGrid from '@/components/NewsPage/NewsGrid'
import NewsPagination from '@/components/NewsPage/NewsPagination'
import NewsletterCTA from '@/components/NewsPage/NewsletterCTA'
import TrendingNews from '@/components/NewsPage/TrendingNews'

const sampleItems = [
  {
    id: 'A',
    image: 'https://blog.uber-cdn.com/cdn-cgi/image/width=2160,quality=80,onerror=redirect,format=auto/wp-content/uploads/sites/131/2016/06/Istanbul_uberPET-Launch_blog_960x480_r1.jpg',
    title: 'Uber allows Mumbai residents to travel with pets',
    excerpt: 'Uber expands its pet-friendly rides to Mumbai, easing travel for pet parents.',
    badge: 'Trending',
    category: 'Policy',
  },
  {
    id: 'B',
    image: 'https://media.licdn.com/dms/image/v2/D4E12AQFQwXUZ-OurGg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1684406913385?e=2147483647&v=beta&t=QbPSAR02bVfR_6U8Rrjlqaziqpxb8Y4ZJ515GjwvW04',
    title: 'Gen Z drives India\'s pet parenting boom',
    excerpt: 'Survey shows 70% of Gen Z pet owners are first-time pet parents.',
    badge: 'Featured',
    category: 'Inspiration',
  },
  {
    id: 'C',
    image: 'https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/in/wp-content/uploads/2023/04/pexels-petra-vajdova-7341095-Cropped-scaled.jpg',
    title: 'Pet insurance market set to reach ₹6,500 Cr',
    excerpt: 'Rising vet costs and awareness boost demand for pet insurance in India.',
    badge: 'Analysis',
    category: 'Health',
  },
  {
    id: 'D',
    image: 'https://d1jyxxz9imt9yb.cloudfront.net/medialib/4030/image/s768x1300/white_tiger_2_Cropped2.jpg',
    title: 'Tiger conservation efforts show promising results',
    excerpt: 'New census indicates uptick in tiger populations due to habitat protection.',
    badge: 'Wildlife',
    category: 'Wildlife',
  },
  {
    id: 'E',
    image: 'https://images.pexels.com/photos/573271/pexels-photo-573271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Community drive helps 200+ street dogs find homes',
    excerpt: 'NGOs and citizens collaborate for a mega adoption weekend across cities.',
    badge: 'Adoption',
    category: 'Adoption',
  },
  {
    id: 'F',
    image: 'https://images.pexels.com/photos/574539/pexels-photo-574539.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Study: Pets reduce workplace stress significantly',
    excerpt: 'Research shows employee well-being rises when offices adopt pet-friendly policies.',
    badge: 'Research',
    category: 'Health',
  },
]

const News = () => {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [timeRange, setTimeRange] = useState('Any time')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const newsGridRef = useRef(null)
  const [shouldScroll, setShouldScroll] = useState(false)

  const filtered = useMemo(() => {
    const text = query.trim().toLowerCase()
    const filteredItems = sampleItems.filter((item) => {
      const matchesText = !text ||
        item.title.toLowerCase().includes(text) ||
        item.excerpt.toLowerCase().includes(text)
      const matchesCategory = category === 'All' || item.category === category
      return matchesText && matchesCategory
    })
    
    // Reset to page 1 when filters change
    setCurrentPage(1)
    return filteredItems
  }, [query, category])

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filtered.slice(startIndex, endIndex)
  }, [filtered, currentPage, itemsPerPage])

  const totalPages = Math.ceil(filtered.length / itemsPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
    setShouldScroll(true)
  }

  // Handle scroll after page change
  useEffect(() => {
    if (shouldScroll && newsGridRef.current) {
      // Small delay to ensure DOM has updated
      setTimeout(() => {
        newsGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        setShouldScroll(false)
      }, 100)
    }
  }, [shouldScroll, currentPage])

  return (
    <div className="min-h-screen bg-gradient-to-b from-app-bg via-app-surface to-app-bg pb-12">
      <NewsHero className='mt-10' />
      <div className='w-full mx-auto px-4 mb-5'>
        <TrendingNews/>

        <NewsFilters
          selectedCategory={category}
          onCategoryChange={setCategory}
          query={query}
          onQueryChange={setQuery}
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
        />


        <div ref={newsGridRef}>
          <h2 className='text-2xl text-center font-extrabold mt-10 mb-4 text-ink-primary'>Latest stories</h2>
        </div>
        <NewsGrid items={paginatedItems} />
        
        <NewsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
        />

        <NewsletterCTA className='max-w-6xl' />
      </div>
    </div>
  )
}

export default News
