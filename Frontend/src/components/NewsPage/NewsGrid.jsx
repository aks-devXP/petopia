import React from 'react'
import NewsCard from './NewsCard'

const NewsGrid = ({ items }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <NewsCard key={item.id} {...item} />
      ))}
    </div>
  )
}

export default NewsGrid


