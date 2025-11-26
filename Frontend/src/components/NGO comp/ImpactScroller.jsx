import Marquee from "react-fast-marquee";

const ImpactScroller = ({
  items = [],
  title = "Trusted partners and drives across India",
  badge = "On-going relief",
}) => {
  const slides = items.length
    ? items
    : [
        {
          name: "Mumbai Flood Relief",
          city: "Mumbai",
          image:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=60",
        },
        {
          name: "Stray Vaccination Drive",
          city: "Delhi",
          image:
            "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1400&q=60",
        },
        {
          name: "Community Feeding",
          city: "Bengaluru",
          image:
            "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=60",
        },
        {
          name: "Foster Network",
          city: "Hyderabad",
          image:
            "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1400&q=60",
        },
        {
          name: "Rescue & Rehab",
          city: "Kolkata",
          image:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=60",
        },
        {
          name: "Street Sterilization",
          city: "Chennai",
          image:
            "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=60",
        },
        {
          name: "Monsoon Shelter",
          city: "Pune",
          image:
            "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1400&q=60",
        },
      ];

  return (
    <section className="my-10">
      <div className="mx-4 sm:mx-10 rounded-3xl overflow-hidden bg-gradient-to-r from-ink-primary via-[#0f3947] to-[#0d2732] text-white shadow-[0_30px_70px_rgba(12,43,55,0.35)] border border-white/5 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-10 top-12 w-48 h-48 bg-brand/30 blur-[120px]" />
          <div className="absolute right-0 bottom-0 w-64 h-64 bg-white/10 blur-[140px]" />
        </div>
        <div className="relative px-6 sm:px-10 py-8 sm:py-10 flex flex-col gap-4 sm:gap-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/15 border border-white/20 uppercase tracking-wide">
                {badge}
              </span>
              <div className="h-px flex-1 bg-white/10 hidden sm:block" />
            </div>
            <h3 className="text-xl sm:text-2xl font-quicksandBold text-white text-right sm:text-left">
              {title}
            </h3>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <Marquee
              direction="left"
              speed={45}
              gradient={false}
              autoFill
              className="py-6"
            >
              {slides.map((slide, idx) => (
                <div
                  key={`${slide.name}-${idx}`}
                  className="mx-3 sm:mx-4 min-w-[260px] sm:min-w-[300px] rounded-2xl overflow-hidden border border-white/15 bg-white/10 backdrop-blur-sm shadow-lg/20"
                >
                  <div className="relative h-52">
                    <img
                      src={slide.image}
                      alt={slide.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2 text-white drop-shadow">
                      <p className="text-sm font-nunitoSemiBold">{slide.name}</p>
                      <p className="text-xs text-cream-lightest/90">{slide.city}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactScroller;
