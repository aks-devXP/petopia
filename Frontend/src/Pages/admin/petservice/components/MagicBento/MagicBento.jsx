import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import {
  Stethoscope,
  Scissors,
  Dumbbell,
  BadgeCheck,
  Search,
  Calendar,
  CheckCircle2,
} from "lucide-react";

import ParticleCard from "./ParticleCard";
import GlobalSpotlight from "./GlobalSpotlight";
import TestimonialsCard from "./TestimonialsCard";

/** THEME BRIDGE (from your Tailwind theme) ****************************
app.bg        = #f2eeeb  -> bg-app-bg
app.surface   = #e9ddd5  -> bg-app-surface
app.elevated  = #ffffff  -> bg-app-elevated
app.element   = #b1d4e9
ink.primary   = #0c2b37  -> text-ink-primary
ink.secondary = #493014  -> text-ink-secondary
ink.heading   = #000000  -> text-ink-heading
brand.DEFAULT = #d85400  -> bg-brand
focus.ring    = #ff9a4d  -> ring-focus-ring
***********************************************************************/

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = "255, 154, 77"; // focus.ring (#ff9a4d)
const MOBILE_BREAKPOINT = 768;

// layout indices (unchanged)
const cardData = [
  { title: "Analytics",     description: "Track user behavior",         label: "Insights"     }, // -> Verified Services
  { title: "Dashboard",     description: "Centralized data view",       label: "Overview"     }, // -> Veterinary Care
  { title: "Collaboration", description: "Work together seamlessly",    label: "Teamwork"     }, // -> How to Book (3 steps)
  { title: "Automation",    description: "Streamline workflows",        label: "Efficiency"   }, // -> Testimonials
  { title: "Integration",   description: "Connect favorite tools",      label: "Connectivity" }, // -> Grooming
  { title: "Security",      description: "Enterprise-grade protection", label: "Protection"   }, // -> Training
];

const calculateSpotlightValues = (radius) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75,
});

const updateCardGlowProperties = (card, mouseX, mouseY, glow, radius) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;
  card.style.setProperty("--glow-x", `${relativeX}%`);
  card.style.setProperty("--glow-y", `${relativeY}%`);
  card.style.setProperty("--glow-intensity", String(glow));
  card.style.setProperty("--glow-radius", `${radius}px`);
};

const BentoCardGrid = ({ children, gridRef }) => (
  <div
    ref={gridRef}
    className="bento-section w-full grid gap-3 p-3 sm:p-4"
    style={{ fontSize: "clamp(1rem, 0.9rem + 0.5vw, 1.5rem)" }}
  >
    {children}
  </div>
);

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
};

const MagicBento = ({
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = false,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true,
  testimonialsProps, // optional overrides for Testimonials
}) => {
  const gridRef = useRef(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  useEffect(() => {
    // lightweight mouse glow support for non-ParticleCard path (kept for parity)
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".card");
    const onMove = (e) => {
      cards.forEach((el) =>
        updateCardGlowProperties(el, e.clientX, e.clientY, 0.6, DEFAULT_SPOTLIGHT_RADIUS)
      );
    };
    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <style>
        {`
          .bento-section {
            --app-bg: #f2eeeb;
            --app-surface: #e9ddd5;
            --app-elevated: #ffffff;
            --app-element: #b1d4e9;
            --ink-primary: #0c2b37;
            --ink-secondary: #493014;
            --ink-heading: #000000;
            --brand: #d85400;
            --focus-ring: #ff9a4d;

            --glow-x: 50%;
            --glow-y: 50%;
            --glow-intensity: 0;
            --glow-radius: 200px;
            --glow-color: ${glowColor};

            --border-color: var(--app-surface);
            --card-bg: var(--app-elevated);
            --label-color: var(--ink-secondary);
            --title-color: var(--ink-primary);
            --desc-color: color-mix(in srgb, var(--ink-secondary) 85%, black 0%);
          }

          .card-responsive {
            display: grid;
            grid-template-columns: 1fr;
            width: 100%;
            margin: 0;
            padding: 0.5rem;
          }

          @media (min-width: 600px) {
            .card-responsive { grid-template-columns: repeat(2, 1fr); }
          }
          @media (min-width: 1024px) {
            .card-responsive { grid-template-columns: repeat(4, 1fr); }
            .card-responsive .card:nth-child(3) { grid-column: span 2; grid-row: span 2; }
            .card-responsive .card:nth-child(4) { grid-column: 1 / span 2; grid-row: 2 / span 2; }
            .card-responsive .card:nth-child(6) { grid-column: 4; grid-row: 3; }
          }

          .card--border-glow::after {
            content: '';
            position: absolute; inset: 0; padding: 6px;
            background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
              rgba(${glowColor}, calc(var(--glow-intensity) * 0.7)) 0%,
              rgba(${glowColor}, calc(var(--glow-intensity) * 0.35)) 28%,
              transparent 60%);
            border-radius: inherit;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            pointer-events: none;
            transition: opacity 0.25s ease;
            z-index: 1;
          }
          .card--border-glow:hover::after { opacity: 1; }

          .particle::before {
            content: '';
            position: absolute; inset: -2px;
            background: rgba(${glowColor}, 0.18);
            border-radius: 50%; z-index: -1;
          }

          .text-clamp-1 { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden; }
          .text-clamp-2 { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; }

          @media (max-width: 599px) {
            .card-responsive { grid-template-columns: 1fr; padding: 0.5rem; }
            .card-responsive .card { width: 100%; min-height: 180px; }
          }
        `}
      </style>

      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisableAnimations}
          enabled={enableSpotlight}
          spotlightRadius={DEFAULT_SPOTLIGHT_RADIUS}
          glowColor={DEFAULT_GLOW_COLOR}
          calculateSpotlightValues={calculateSpotlightValues}
          updateCardGlowProperties={updateCardGlowProperties}
        />
      )}

      <BentoCardGrid gridRef={gridRef}>
        <div className="card-responsive gap-3">
          {cardData.map((card, index) => {
            const baseClassName =
              `card flex flex-col justify-between relative aspect-[4/3] min-h-[200px] w-full max-w-full 
               p-5 rounded-3xl border border-solid font-nunitosan text-ink-primary overflow-hidden 
               transition-all duration-300 ease-in-out hover:-translate-y-0.5 
               hover:shadow-[0_8px_25px_rgba(0,0,0,0.12)]
               focus:outline-none focus:ring-2 ring-focus-ring/60
               bg-app-elevated ${enableBorderGlow ? "card--border-glow" : ""}`;

            const cardStyle = {
              backgroundColor: "var(--card-bg)",
              borderColor: "var(--border-color)",
              color: "var(--ink-primary)",
              "--glow-x": "50%",
              "--glow-y": "50%",
              "--glow-intensity": "0",
              "--glow-radius": "200px",
            };

            const ServiceInner = ({ Icon, title, description }) => (
              <>
                <div className="card__header flex justify-between gap-3 relative">
                  <span className="card__label text-base text-ink-secondary" />
                </div>
                <div className="card__content flex flex-col relative text-center items-center">
                  <div className="w-16 h-16 bg-app-bg rounded-full flex items-center justify-center mb-3">
                    <Icon className="h-8 w-8 text-ink-primary" aria-hidden="true" />
                  </div>
                  <h3 className={`card__title text-ink-heading font-nunitoSemiBold text-lg m-0 mb-2 ${textAutoHide ? "text-clamp-1" : ""}`}>
                    {title}
                  </h3>
                  <p className={`card__description text-ink-secondary text-sm leading-6 opacity-90 ${textAutoHide ? "text-clamp-2" : ""}`}>
                    {description}
                  </p>
                </div>
              </>
            );

            const StepsInner = () => (
              <>
                <div className="card__header flex flex-col justify-between gap-6 xl:mt-6 relative"> 
                  <span className="lg:text-5xl text-2xl md:text-2xl xl:text-6xl text-ink-secondary font-bold">How to Book</span> 
                  <span className="hidden lg:block xl:text-2xl lg:text-xl text-ink-secondary">We made booking simple <br/> Just follow these quick steps to get trusted pet care without the back-and-forth.</span> 
                </div>
                <div className="card__content relative">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="relative bg-app-bg/40 rounded-2xl p-4">
                      <div className="text-5xl font-extrabold text-ink-primary/10 absolute -top-2 -right-2 select-none">01</div>
                      <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-app-bg flex items-center justify-center mb-3">
                          <Search className="w-6 h-6 text-ink-primary" />
                        </div>
                        <h4 className="text-base font-nunitoSemiBold text-ink-heading mb-1">Find Your Service</h4>
                        <p className="text-xs text-ink-secondary font-semibold">Browse certified vets, trainers, and groomers near you.</p>
                      </div>
                    </div>
                    <div className="relative bg-app-bg/40 rounded-2xl p-4">
                      <div className="text-5xl font-extrabold text-ink-primary/10 absolute -top-2 -right-2 select-none">02</div>
                      <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-app-bg flex items-center justify-center mb-3">
                          <Calendar className="w-6 h-6 text-ink-primary" />
                        </div>
                        <h4 className="text-base font-nunitoSemiBold text-ink-heading mb-1">Select Date & Time</h4>
                        <p className="text-xs text-ink-secondary font-semibold opacity-90">Pick a slot that fits—see real-time availability.</p>
                      </div>
                    </div>
                    <div className="relative bg-app-bg/40 rounded-2xl p-4">
                      <div className="text-5xl font-extrabold text-ink-primary/10 absolute -top-2 -right-2 select-none">03</div>
                      <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-app-bg flex items-center justify-center mb-3">
                          <CheckCircle2 className="w-6 h-6 text-ink-primary" />
                        </div>
                        <h4 className="text-base font-nunitoSemiBold text-ink-heading mb-1">Book Appointment</h4>
                        <p className="text-xs text-ink-secondary font-semibold opacity-90">Confirm in one click—get instant confirmation & reminders.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );

            const content =
              index === 0 ? (
                <>
                  <div className="card__header flex justify-between gap-3 relative" />
                  <div className="card__content flex flex-col relative text-center items-center">
                    <div className="w-16 h-16 bg-app-bg rounded-full flex items-center justify-center mb-3">
                      <BadgeCheck className="h-8 w-8 text-ink-primary" aria-hidden="true" />
                    </div>
                    <h3 className={`card__title text-ink-heading font-nunitoSemiBold text-lg m-0 mb-2 ${textAutoHide ? "text-clamp-1" : ""}`}>
                      Verified Services
                    </h3>
                    <p className={`card__description text-ink-secondary text-sm leading-6 opacity-90 ${textAutoHide ? "text-clamp-2" : ""}`}>
                      Only verified professionals—care you can truly trust.
                    </p>
                  </div>
                </>
              ) : index === 1 ? (
                <ServiceInner
                  Icon={Stethoscope}
                  title="Veterinary Care"
                  description="From first checkups to urgent care—licensed vets who treat your pet like family."
                />
              ) : index === 2 ? (
                <StepsInner />
              ) : index === 3 ? (
                <TestimonialsCard {...(testimonialsProps || {})} />
              ) : index === 4 ? (
                <ServiceInner
                  Icon={Scissors}
                  title="Grooming"
                  description="Fresh bath, tidy trim, happy wiggles—safe, gentle grooming your pet will love."
                />
              ) : index === 5 ? (
                <ServiceInner
                  Icon={Dumbbell}
                  title="Training"
                  description="Better manners, stronger bond—positive training tailored to your pet’s pace."
                />
              ) : (
                <>
                  <div className="card__header flex justify-between gap-3 relative">
                    <span className="card__label text-base text-ink-secondary">{card.label}</span>
                  </div>
                  <div className="card__content flex flex-col relative">
                    <h3 className={`card__title text-ink-heading font-nunitoSemiBold text-base m-0 mb-1 ${textAutoHide ? "text-clamp-1" : ""}`}>
                      {card.title}
                    </h3>
                    <p className={`card__description text-ink-secondary text-xs leading-5 opacity-90 ${textAutoHide ? "text-clamp-2" : ""}`}>
                      {card.description}
                    </p>
                  </div>
                </>
              );

            return enableStars ? (
              <ParticleCard
                key={index}
                className={baseClassName}
                style={cardStyle}
                disableAnimations={shouldDisableAnimations}
                particleCount={particleCount}
                glowColor={DEFAULT_GLOW_COLOR}
                enableTilt={enableTilt}
                clickEffect={clickEffect}
                enableMagnetism={enableMagnetism}
              >
                {content}
              </ParticleCard>
            ) : (
              <div className={baseClassName} style={cardStyle} key={index}>
                {content}
              </div>
            );
          })}
        </div>
      </BentoCardGrid>
    </>
  );
};

export default MagicBento;
