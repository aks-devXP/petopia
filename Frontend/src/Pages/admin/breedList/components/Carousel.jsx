import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

/**
 * Reusable Carousel for breed teaser cards
 * Props:
 * - items: Array<{ slug, breed, images: { primary, secondary } }>
 */
export default function Carousel({ items = [] }) {
  const [idx, setIdx] = useState(0);
  const length = items.length;

  const next = () => setIdx((i) => (i + 1) % length);
  const prev = () => setIdx((i) => (i - 1 + length) % length);

  useEffect(() => {
    if (length <= 1) return undefined;
    const t = setInterval(next, 4000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length]);

  if (length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-[56px] border-2 border-yellow-500/80 bg-white shadow-lg">
      {/* Slides */}
      <div className="relative h-64 bg-white sm:h-80 md:h-[22rem]">
        {items.map((b, i) => (
          <Link
            key={b.slug || i}
            to={`/breed-info/${b.slug}`}
            aria-hidden={i !== idx}
            tabIndex={i === idx ? 0 : -1}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === idx ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="flex h-full w-full items-center justify-center bg-yellow-400">
              <img
                src={b.images?.primary || b.images?.secondary || '/petopia/vite.svg'}
                alt={b.breed}
                className="max-h-full max-w-full object-contain"
                loading="lazy"
              />
            </div>
            <div className="absolute left-1/2 top-2 -translate-x-1/2 rounded-full
             bg-black/60 px-3 py-1 text-xs font-semibold text-white shadow">
              {b.breed}
            </div>
          </Link>
        ))}
      </div>

      {/* Controls */}
      {length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-800 shadow hover:bg-white"
          >
            <MdChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-800 shadow hover:bg-white"
          >
            <MdChevronRight className="text-2xl" />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {items.map((_, i) => (
              <span
                key={i}
                onClick={() => setIdx(i)}
                className={`h-2.5 w-2.5 cursor-pointer rounded-full ${i === idx ? 'bg-yellow-400' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
