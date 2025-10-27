import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';

/* ----------------- Breed Card ----------------- */
function BreedCard({ item, isFav, onToggleFav }) {
  const img = item?.images?.primary || item?.images?.secondary || '/petopia/vite.svg';
  return (
    <div
      className="
        group relative flex-shrink-0 w-[260px] sm:w-[300px]
        rounded-xl bg-white
        ring-1 ring-black/5
        shadow-[0_10px_30px_rgba(0,0,0,0.08)]
        hover:shadow-[0_18px_45px_rgba(0,0,0,0.15)]
        transition-transform duration-200 hover:scale-[1.01]
        overflow-hidden
      "
    >
      <Link to={`/breed-info/${item.slug}`} className="block">
        <div className="h-44 sm:h-48 w-full bg-app-surface flex items-center justify-center">
          <img src={img} alt={item.breed} loading="lazy" className="max-h-full max-w-full object-contain" />
        </div>
      </Link>
      <div className="flex items-center justify-between px-4 py-3">
        <div className="min-w-0">
          <div className="text-sm sm:text-base font-semibold text-ink-heading truncate">{item.breed}</div>
          <div className="text-xs text-ink-secondary truncate">{item.species}</div>
        </div>
        <button
          type="button"
          onClick={() => onToggleFav(item.slug)}
          aria-label={isFav ? 'Remove from favourites' : 'Add to favourites'}
          className="p-2 rounded-full bg-white ring-1 ring-black/5 hover:ring-black/10 hover:shadow transition"
        >
          <Heart className={`w-5 h-5 ${isFav ? 'fill-brand text-brand' : 'text-ink-heading'}`} />
        </button>
      </div>
    </div>
  );
}

/* ----------------- Horiz Row with arrows + virtualization ----------------- */
export default function SpeciesRow({ title, items }) {
  const ref = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [range, setRange] = useState([0, 6]); // virtual window
  const CARD_W = 300; // px at sm+
  const BUFFER = 2;

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const { scrollLeft, clientWidth, scrollWidth } = el;
    setShowLeft(scrollLeft > 2);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 2);

    const first = Math.floor(scrollLeft / CARD_W);
    const visible = Math.ceil(clientWidth / CARD_W) + BUFFER;
    const start = Math.max(0, first - 1);
    const end = Math.min(items.length, start + visible);
    setRange([start, end]);
  }, [items.length]);

  useEffect(() => {
    update();
    const el = ref.current;
    if (!el) return;
    const onScroll = () => update();
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [update]);

  const scrollByCards = (n) => ref.current?.scrollBy({ left: n * CARD_W, behavior: 'smooth' });

  const [start, end] = range;
  const windowed = items.slice(start, end);

  // local favourites
  const [favs, setFavs] = useState(() => new Set());
  const toggleFav = (slug) =>
    setFavs((prev) => {
      const next = new Set(prev);
      next.has(slug) ? next.delete(slug) : next.add(slug);
      return next;
    });

  return (
    <section className="w-full">
      {/* Title uses your theme — species label like Apple row */}
      <h3 className="mb-1 sm:mb-2 text-xl sm:text-3xl font-bold text-app-bg">{title}</h3>
      <div className="relative">
        {showLeft && (
          <button
            onClick={() => scrollByCards(-3)}
            aria-label="Scroll left"
            className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow ring-1 ring-black/5 hover:shadow-md"
          >
            <ChevronLeft className="w-5 h-5 text-ink-heading" />
          </button>
        )}

        <div
          ref={ref}
          className="
            w-full overflow-x-auto overflow-y-hidden
            scrollbar-hide
            flex gap-4 sm:gap-5
            px-1 sm:px-2
            snap-x snap-mandatory
          "
          style={{ scrollBehavior: 'smooth' }}
        >
          {/* left spacer for virtualization */}
          <div style={{ width: start * CARD_W }} className="flex-shrink-0" />
          {windowed.map((b) => (
            <div key={b.slug} className="snap-start">
              <BreedCard item={b} isFav={favs.has(b.slug)} onToggleFav={toggleFav} />
            </div>
          ))}
          {/* right spacer */}
          <div style={{ width: Math.max(0, (items.length - end) * CARD_W) }} className="flex-shrink-0" />
        </div>

        {showRight && (
          <button
            onClick={() => scrollByCards(3)}
            aria-label="Scroll right"
            className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow ring-1 ring-black/5 hover:shadow-md"
          >
            <ChevronRight className="w-5 h-5 text-ink-heading" />
          </button>
        )}
      </div>
    </section>
  );
}