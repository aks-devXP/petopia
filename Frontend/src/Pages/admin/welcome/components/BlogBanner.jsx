import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

/**
 * Testimonials
 * - Theme-aligned with PetopiaProcess:
 *   wrapper: bg-app-surface mx-2 sm:mx-12 rounded-3xl px-4 sm:px-8 lg:px-20 py-6 md:py-24
 *   card:    bg-app-bg rounded-[28px] p-6 sm:p-8 ring-1 ring-neutral-200 shadow-[0_10px_30px_rgba(0,0,0,0.1)]
 * - Responsive carousel: 1 card visible on small, 2 on md+
 * - Arrow nav with disabled state; smooth transitions
 * - Dynamic via props (headline, helper, testimonials[])
 */
export default function Testimonials({
  headline = (
    <>
      What our <br className="hidden sm:block" />
      happy pet parents <span className="text-rose-500">say</span>
    </>
  ),
  helper = "Real stories from families who booked vets, groomers, and trainers with Petopia.",
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
  // Responsive “visible cards” count: 1 on small, 2 on md+
  const [visible, setVisible] = useState(1);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setVisible(mq.matches ? 2 : 1);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const [index, setIndex] = useState(0);
  const maxIndex = Math.max(0, testimonials.length - visible);

  const handlePrev = () => setIndex((p) => Math.max(0, p - 1));
  const handleNext = () => setIndex((p) => Math.min(maxIndex, p + 1));

  // Layout math for transform & item width (gap-6 = 24px)
  const GAP_PX = 24;
  const itemWidth = useMemo(() => `calc(${100 / visible}% - ${GAP_PX / visible}px)`, [visible]);
  const translateX = useMemo(
    () => `translateX(-${index * (100 / visible)}%)`,
    [index, visible]
  );

  return (
    <section className="bg-app-surface mx-2 sm:mx-12 rounded-3xl px-4 sm:px-8 lg:px-12~ py-6 md:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header row (matches hero spacing/scale) */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-start sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-quicksandBold sm:text-4xl leading-tight text-ink-heading">
                {headline}
              </h2>
              <p className="text-ink-secondary max-w-xl">{helper}</p>
            </div>

            <div className="flex gap-2 shrink-0">
              <button
                onClick={handlePrev}
                disabled={index === 0}
                className="w-10 h-10 rounded-full ring-1 ring-neutral-300 text-ink-heading flex items-center justify-center bg-white hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                aria-label="Previous testimonials"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                disabled={index >= maxIndex}
                className="w-10 h-10 rounded-full ring-1 ring-neutral-300 text-ink-heading flex items-center justify-center bg-white hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                aria-label="Next testimonials"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel track */}
        <div className="overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-in-out will-change-transform"
            style={{ transform: translateX }}
          >
            {testimonials.map((t) => (
              <article
                key={t.id}
                className="
                  flex-shrink-0 bg-app-bg rounded-[28px] p-6 sm:p-8
                  ring-1 ring-neutral-200
                  shadow-[0_10px_30px_rgba(0,0,0,0.1)]
                  hover:shadow-[0_16px_40px_rgba(0,0,0,0.10)]
                  transition-shadow duration-200 ease-in-out
                "
                style={{ width: itemWidth }}
              >
                <header className="flex items-start gap-4 mb-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-ink-heading">{t.name}</h3>
                    <div className="flex gap-1 mt-1" aria-label={`${t.rating} star rating`}>
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                </header>
                <p className="text-ink-secondary leading-relaxed">“{t.text}”</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
