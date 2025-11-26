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
    <div className="w-[80%] mx-auto bg-app-surface/80 backdrop-blur rounded-2xl border border-app-surface p-4 md:p-5 mb-8 shadow-sm text-ink-primary">
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="flex-1">
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search news, topics, keywords..."
            className="w-full h-11 rounded-xl border border-stone-200 bg-white px-4 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent text-ink-primary placeholder:text-ink-primary/40"
          />
        </div>

        <div className="flex gap-3 flex-wrap">
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="h-11 rounded-xl border border-stone-200 bg-white px-3 text-ink-primary focus:outline-none focus:ring-2 focus:ring-brand"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={timeRange}
            onChange={(e) => onTimeRangeChange(e.target.value)}
            className="h-11 rounded-xl border border-stone-200 bg-white px-3 text-ink-primary focus:outline-none focus:ring-2 focus:ring-brand"
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
