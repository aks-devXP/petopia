// src/Pages/petservice/components/ProviderCard.jsx
import { Heart, Home, MapPin, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const DEFAULT_IMG =
  "https://res.cloudinary.com/demo/image/upload/c_fill,g_auto,w_800,h_600/sample.jpg";

function ServiceChip({ label }) {
  return (
    <span
      title={label}
      className="shrink-0 whitespace-nowrap inline-flex items-center px-2.5 py-1 rounded-full text-[11px] bg-app-surface text-ink-primary border border-brand/40 font-semibold"
    >
      {label}
    </span>
  );
}

export default function ProviderCard({
  provider,
  isFavorite = false,
  onToggleFavorite = () => {},
}) {
  const {
    id,
    name = "Sophie Bennett",
    specialization:profession = "Groomer",
    rating = 4.7,
    profilePic,
    facilities: services = ["Grooming", "Washing", "Trimming", "Something Else"],
    homeService = false,
    locality = "C-Scheme",
    city = "Jaipur",
    about = "",
    detailPath,
  } = provider || {};

  const [fav, setFav] = useState(Boolean(isFavorite));

  // one-row chips, overflow as +N
  const MAX_CHIPS = 3;
  const visibleServices = useMemo(() => services.slice(0, MAX_CHIPS), [services]);
  const leftover = Math.max(services.length - visibleServices.length, 0);

  const handleFav = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setFav((v) => !v);
    onToggleFavorite(id);
  };

  const Wrapper = detailPath ? Link : "div";
  const wrapperProps = detailPath
    ? { to: detailPath, className: "block h-full" }
    : { className: "h-full" };

  return (
    <Wrapper {...wrapperProps}>
      <article
        className="
          group relative h-full flex flex-col bg-white rounded-3xl shadow-md overflow-hidden cursor-pointer
          transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)] will-change-transform
          hover:-translate-y-0.5 hover:shadow-xl focus-within:ring-2 focus-within:ring-brand/40
          p-3
        "
      >
        {/* Rounded image wrapper: matches outer curve visually */}
        <div className="relative w-full aspect-[4/3] bg-slate-100 rounded-2xl overflow-hidden ring-1 ring-black/5">
          <img
            src={profilePic || DEFAULT_IMG}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              if (e.currentTarget.src !== DEFAULT_IMG) e.currentTarget.src = DEFAULT_IMG;
            }}
          />
          {/* Favorite over image, respecting the rounded corner */}
          <button
            aria-label={fav ? "Remove from favorites" : "Add to favorites"}
            onClick={handleFav}
            className={`absolute top-3 right-3 z-10 p-2 rounded-full border bg-white/90 backdrop-blur shadow-sm
              transition duration-200 ease-out hover:scale-105 active:scale-95
              ${fav ? "border-rose-300" : "border-slate-200"}`}
          >
            <Heart className={`h-5 w-5 ${fav ? "fill-rose-500 text-rose-500" : "text-slate-700"}`} />
          </button>
        </div>

        {/* Content with fixed rows -> uniform height across cards */}
        <div className="pt-3 px-1 pb-1 flex-1 grid grid-rows-[auto_2.5rem_2.25rem_auto] gap-2">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-[1.05rem] leading-6 font-semibold text-ink-primary truncate">
                {name}
              </h3>
              <div className="text-xs text-ink-secondary/70">{profession}</div>
            </div>
            <div
              className="shrink-0 inline-flex items-center gap-1.5 rounded-full px-2 py-1 bg-amber-50 border border-amber-200"
              title={`${Number(rating).toFixed(1)} rating`}
            >
              <span className="text-[13px] font-medium">{Number(rating).toFixed(1)}</span>
              <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
            </div>
          </div>

          {/* About (2-line clamp) */}
          <div className="text-[13px] leading-5 text-ink-primary/70 line-clamp-2 overflow-hidden">
            {about}
          </div>

          {/* Services (single row) */}
          <div className="flex items-center gap-2 overflow-hidden">
            {visibleServices.map((s) => (
              <ServiceChip key={s} label={s} />
            ))}
            {leftover > 0 && (
              <span
                title={`${leftover} more services`}
                className="shrink-0 whitespace-nowrap inline-flex items-center px-2.5 py-1 rounded-full text-[11px] bg-app-surface text-ink-primary border border-brand/40 font-semibold"
              >
                +{leftover}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-1.5 min-w-0 text-sm text-slate-600"
              title={`${locality ? `${locality}, ` : ""}${city}`}
            >
              <MapPin className="h-4 w-4 text-slate-500 shrink-0" />
              <span className="truncate">
                {locality ? `${locality}, ` : ""}
                {city}
              </span>
            </div>

            {homeService && (
              <span
                className="inline-flex items-center gap-1 shrink-0 text-[11px] font-semibold ring-1 ring-ink-primary/70 text-ink-primary px-2 py-0.5 rounded-full bg-white/60 backdrop-blur transition-colors"
                title="In-home visit available"
              >
                <Home className="h-3.5 w-3.5" />
                At-Home
              </span>
            )}
          </div>
        </div>
      </article>
    </Wrapper>
  );
}
