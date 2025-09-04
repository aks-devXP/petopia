import React from 'react'

const categories = ['All', 'Adoption', 'Wildlife', 'Health', 'Policy', 'Inspiration']
const timeRanges = ['Any time', '24 hours', '7 days', '30 days']

const NewsFilters = ({
  selectedCategory,
  onCategoryChange,
  query,
  onQueryChange,
  timeRange,
  onTimeRangeChange
}) => {
  return (
    <div className="w-full bg-white/70 backdrop-blur rounded-2xl border border-gray-200 p-4 md:p-5 mb-8">
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="flex-1">
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search news, topics, keywords..."
            className="w-full h-11 rounded-xl border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-3 flex-wrap">
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="h-11 rounded-xl border border-gray-300 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={timeRange}
            onChange={(e) => onTimeRangeChange(e.target.value)}
            className="h-11 rounded-xl border border-gray-300 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {timeRanges.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default NewsFilters


