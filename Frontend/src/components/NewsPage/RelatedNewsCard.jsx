import React from 'react';
import { Link } from 'react-router-dom';

const RelatedNewsCard = ({ item }) => {
  if (!item) return null;
  const imageSrc = item.image || item.img;
  return (
    <Link to={`/news/${item.id}`} className="mt-6 group">
      <div className="overflow-hidden rounded-lg shadow shadow-brand/10">
        <img
          src={imageSrc}
          alt={item.title}
          className="w-full h-28 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <p className="text-xs text-center mt-1 text-ink-primary font-medium">
        {item.author || "Petopia News"} | {item.time || "5"} min read
      </p>
      <p className="text-base text-pretty font-semibold mt-1 text-ink-primary group-hover:text-brand">
        {item.title}
      </p>
    </Link>
  );
};

export default RelatedNewsCard;
