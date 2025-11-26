import React from 'react'
import { Link } from 'react-router-dom'

const NewsCard = ({ id, image, title, excerpt, badge }) => {
  return (
    <article className="group bg-app-elevated rounded-2xl border border-app-surface overflow-hidden hover:shadow-lg hover:shadow-brand/10 transition-shadow duration-300">
      <Link to={`/news/${id}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {badge && (
            <span className="absolute top-3 left-3 bg-brand text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
              {badge}
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg text-ink-primary font-bold leading-snug line-clamp-2">{title}</h3>
          <p className="mt-2 text-sm text-ink-primary/80 line-clamp-3">{excerpt}</p>
        </div>
      </Link>
    </article>
  )
}

export default NewsCard
