import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export default function TestimonialsCard({
  headline = (
    <>
      What our <br className="hidden md:block" />
      happy pet parents <span className="text-rose-500">say</span>
    </>
  ),
  helper = "Real stories from families who booked vets, groomers, and trainers with Petopia.",
  // ⬇ keep sample data
  testimonials = [
    {
      id: 1,
      name: "Dr. Smith",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&h=80&fit=crop",
      rating: 5,
      text:
        "They treated Bella like family and made her surgery process so smooth. We couldn’t have asked for better care!",
    },
    {
      id: 2,
      name: "Alisa Armina",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
      rating: 5,
      text:
        "Booking a groomer was effortless, and the reminders kept me perfectly on schedule. Bella’s coat looks amazing!",
    },
    {
      id: 3,
      name: "John Martinez",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop",
      rating: 5,
      text:
        "Our trainer matched our dog’s energy and needs. Clear guidance, kind approach—couldn’t be happier with the progress.",
    },
    {
      id: 4,
      name: "Sarah Johnson",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
      rating: 5,
      text:
        "Professional, caring, and thorough. They explained every option and made the whole experience stress-free.",
    },
  ],
}) {
  // Always show exactly 2 at a time, sliding by ONE card per click.
  const [index, setIndex] = useState(0); // left-most visible card
  const viewportRef = useRef(null);
  const [viewportW, setViewportW] = useState(0);

  // measure viewport width (so each card is exactly half of it)
  useEffect(() => {
    const measure = () => {
      if (viewportRef.current) {
        setViewportW(viewportRef.current.clientWidth);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const GAP = 24; // px gap between cards
  const visible = 2; // fixed
  const cardW = Math.max(0, (viewportW - GAP) / visible); // two cards + one gap fits perfectly
  const maxIndex = Math.max(0, (testimonials?.length ?? 0) - visible);

  const handlePrev = () => setIndex((p) => Math.max(0, p - 1));
  const handleNext = () => setIndex((p) => Math.min(maxIndex, p + 1));

  // translate track by one "card-with-gap" per index step
  const translateX = useMemo(() => {
    const step = cardW + GAP;
    return `translateX(-${index * step}px)`;
  }, [index, cardW]);

  return (
    <section className="mx-1 md:mx-2 rounded-2xl px-3 md:px-5 lg:px-6 py-4 md:py-8 shadow-sm">
      <div className="mb-4 md:mb-6 flex items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-2xl md:text-3xl font-quicksandBold leading-tight text-ink-heading">
            {headline}
          </h3>
          <p className="text-ink-secondary text-sm md:text-base max-w-xl">
            {helper}
          </p>
        </div>

        <div className="flex gap-2 shrink-0">
          <button
            onClick={handlePrev}
            disabled={index === 0}
            className="w-9 h-9 rounded-full ring-1 ring-neutral-300 text-ink-heading flex items-center justify-center bg-white hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            aria-label="Previous testimonials"
            type="button"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            disabled={index >= maxIndex}
            className="w-9 h-9 rounded-full ring-1 ring-neutral-300 text-ink-heading flex items-center justify-center bg-white hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            aria-label="Next testimonials"
            type="button"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Viewport */}
      <div ref={viewportRef} className="overflow-hidden">
        {/* Track */}
        <div
          className="flex transition-transform duration-500 ease-in-out will-change-transform"
          style={{
            transform: translateX,
            // Track width = sum of all cards + gaps
            width:
              testimonials.length > 0
                ? testimonials.length * cardW + Math.max(0, testimonials.length - 1) * GAP
                : 0,
          }}
        >
          {testimonials.map((t, i) => (
            <article
              key={t.id ?? i}
              className="flex-shrink-0 bg-app-bg rounded-[24px] p-5 md:p-6"
              style={{
                width: `${cardW}px`,
                marginRight: i === testimonials.length - 1 ? 0 : `${GAP}px`,
              }}
            >
              <header className="flex items-start gap-4 mb-3">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-semibold text-base md:text-lg text-ink-heading">
                    {t.name}
                  </h4>
                  <div
                    className="flex gap-1 mt-1"
                    aria-label={`${t.rating} star rating`}
                  >
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star
                        key={j}
                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </header>
              <p className="text-ink-secondary leading-relaxed text-sm md:text-base">
                “{t.text}”
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
