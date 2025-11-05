import React from "react";
import { Quote, Sparkle } from "lucide-react";

const TestimonialsSection = ({ testimonials }) => {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="rounded-3xl bg-gradient-to-br from-ink-primary/95 to-ink-primary text-white px-8 py-10 shadow-[0_30px_70px_rgba(12,43,55,0.45)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-quicksandBold">What pet parents say</h2>
          <p className="mt-1 text-sm text-white/70">
            Consistently trusted for high-impact outcomes and seamless care
            journeys.
          </p>
        </div>
        <Sparkle className="hidden h-8 w-8 text-brand lg:block" />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {testimonials.map((item, index) => (
          <article
            key={`${item.name}-${index}`}
            className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-brand/50"
          >
            <Quote className="absolute -top-4 left-6 h-8 w-8 text-brand/80" />
            <p className="text-base leading-relaxed text-white/90">
              “{item.quote}”
            </p>
            <footer className="mt-6 flex items-center justify-between text-sm text-white/70">
              <span className="font-medium text-white">{item.name}</span>
              <span>{item.date}</span>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
