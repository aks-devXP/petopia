import { Clock, Languages, MapPin, ShieldCheck, Star } from "lucide-react";
import { useState } from "react";
import GalleryLightbox from "./GalleryLightbox";

const ProviderHero = ({ profile }) => {
  const {
    name,
    title,
    typeLabel,
    rating,
    ratingCount,
    experience,
    location,
    languages,
    heroBadges,
    tags,
    profilePic:profileImage,
    gallery,
    bookingTime,
    about,
    achievements,
  } = profile;

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const hasGallery = Array.isArray(gallery) && gallery.length > 0;

  return (
    <section className="relative overflow-hidden rounded-3xl bg-app-elevated shadow-[0_25px_80px_rgba(12,43,55,0.12)] ring-1 ring-app-surface/70">
      <div className="absolute inset-0 bg-gradient-to-br from-brand/15 via-transparent to-ink-primary/5" />
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand/20 blur-3xl" />

      <div className="relative grid gap-8 p-8 lg:grid-cols-[minmax(0,1fr)_260px] lg:p-10">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-brand/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-brand">
              {typeLabel}
            </span>
            {heroBadges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center rounded-full bg-ink-primary/90 px-3 py-1 text-xs font-medium text-white/90"
              >
                {badge}
              </span>
            ))}
          </div>

          <div>
            <h1 className="text-3xl font-quicksandBold leading-tight text-ink-heading sm:text-4xl">
              {name}
            </h1>
            <p className="mt-2 text-lg text-ink-secondary/80">{title}</p>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-sm text-ink-secondary/80">
            <div className="inline-flex items-center gap-2 rounded-full bg-ink-primary/5 px-3 py-1">
              <Star className="h-4 w-4 text-brand" />
              <span className="font-semibold text-ink-heading">{rating}</span>
              <span>({ratingCount}+ reviews)</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-ink-primary/5 px-3 py-1">
              <ShieldCheck className="h-4 w-4 text-emerald-700" />
              <span>{experience}+ yrs experience</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-ink-primary/5 px-3 py-1">
              <Clock className="h-4 w-4 text-amber-600" />
              <span>{bookingTime || "Confirms within 2 hours"}</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-ink-primary/5 px-3 py-1">
              <Languages className="h-4 w-4 text-indigo-700" />
              <span>{languages.join(" / ")}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-start gap-4 text-sm text-ink-secondary/90">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-brand" />
              <span>
                {location.city}
                {location.state ? `, ${location.state}` : ""}
              </span>
            </div>
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-app-surface px-3 py-1 text-xs font-medium text-ink-secondary"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-base leading-relaxed text-ink-secondary/90 lg:pr-10">
            {about}
          </p>

          {achievements.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {achievements.map((item) => (
                <span
                  key={item}
                  className="rounded-xl bg-white px-3 py-2 text-xs font-medium text-ink-heading shadow-[0_8px_30px_rgba(12,43,55,0.08)]"
                >
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="relative flex items-center justify-center">
          <button
            type="button"
            onClick={() => hasGallery && setIsGalleryOpen(true)}
            className={`group relative h-60 w-60 overflow-hidden rounded-3xl ring-1 ring-app-surface/60 shadow-[0_35px_70px_rgba(12,43,55,0.25)] transition`}
            aria-label={hasGallery ? "Open provider gallery" : undefined}
          >
            <img
              src={profileImage}
              alt={name}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-heading/80 via-ink-heading/20 to-transparent px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wide text-white/70">
                Trusted by {ratingCount}+ pet parents
              </p>
            </div>

            {hasGallery && (
              <span className="absolute right-3 top-3 rounded-full bg-white/80 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-ink-heading transition group-hover:bg-white">
                View gallery
              </span>
            )}

          </button>
        </div>
      </div>

      {hasGallery && isGalleryOpen && (
        <GalleryLightbox
          images={gallery}
          initialIndex={0}
          onClose={() => setIsGalleryOpen(false)}
        />
      )}
    </section>
  );
};

export default ProviderHero;
