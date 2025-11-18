import { useEffect, useState } from 'react';
import { ArrowRight, PawPrint, Shield, Heart, Users, Phone } from 'lucide-react';

const heroImageUrl = 'https://images.unsplash.com/photo-1563736139994-2799cb988ecb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2062';

const statHighlights = [
  { label: 'Partner NGOs', value: '150+', icon: Users },
  { label: 'Animals Rescued', value: '5,000+', icon: PawPrint },
  { label: 'Emergency Calls', value: '24/7', icon: Phone }
];

const featureHighlights = [
  { label: 'Verified NGOs', icon: Shield },
  { label: 'Secure Donations', icon: Heart },
  { label: 'Community Support', icon: Users }
];

const NGOHero = ({ onExploreServices }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      const timer = setTimeout(() => setHasAnimated(true), 800);
      return () => clearTimeout(timer);
    }
  }, [isVisible, hasAnimated]);

  const entranceBase = isVisible
    ? 'opacity-100 translate-y-0 scale-100'
    : 'opacity-0 translate-y-4 scale-95';

  const getDelay = (ms) => (hasAnimated ? '0ms' : `${ms}ms`);

  const handleExploreClick = () => {
    if (onExploreServices) {
      onExploreServices();
    }
  };

  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden bg-[#050b1e]">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute  inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroImageUrl})`,
            filter: 'brightness(0.6) blur(1px)',
            transform: 'scale(1.08)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/45 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/20" />
        <div className="absolute -left-12 top-16 w-48 h-48 bg-brand/25 blur-[140px]" />
        <div className="absolute right-0 bottom-0 w-64 h-64 bg-pink-mid/25 blur-[160px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <div
            className={`inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20 shadow-lg/10 backdrop-blur transition-all duration-500 ease-out ${entranceBase}`}
            style={{ transitionDelay: getDelay(80) }}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand/20">
              <PawPrint className="w-4 h-4 text-brand" />
            </div>
            <span className="text-sm sm:text-base font-nunitoSemiBold text-white tracking-wide">
              Empowering compassionate care nationwide
            </span>
          </div>

          <div
            className={`space-y-6 transition-all duration-600 ease-out ${entranceBase}`}
            style={{ transitionDelay: getDelay(160) }}
          >
            <h1 className="font-quicksandBold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight">
              A trusted movement for
              <span className="text-brand block">Animal Welfare & Relief</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-cream-lightest font-nunito max-w-3xl mx-auto leading-relaxed">
              Build meaningful connections with verified NGOs, support urgent rescues,
              and contribute to long-term animal welfare initiatives. Your compassion fuels
              every rescue mission we undertake.
            </p>
          </div>

          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-5 transition-all duration-500 ease-out ${entranceBase}`}
            style={{ transitionDelay: getDelay(220) }}
          >
            <button
              type="button"
              onClick={handleExploreClick}
              className="w-full sm:w-auto px-7 py-3 md:px-8 md:py-4 bg-brand hover:bg-brand-hover active:bg-brand-active text-white rounded-full font-nunitoSemiBold text-sm md:text-base transition-all hover:-translate-y-0.5 hover:shadow-2xl flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={!onExploreServices}
            >
              Explore Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              type="button"
              className="w-full sm:w-auto px-7 py-3 md:px-8 md:py-4 rounded-full font-nunitoSemiBold text-sm md:text-base bg-white/10 text-white border border-white/30 hover:bg-white/20 hover:border-white/60 transition-all"
            >
              Discover NGOs
            </button>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {statHighlights.map(({ label, value, icon: Icon }, index) => (
              <div
                key={label}
                className={`bg-white/10 border border-white/15 rounded-2xl px-4 py-6 text-left backdrop-blur-sm shadow-lg/10 hover:border-brand transition-all duration-500 ease-out hover:-translate-y-1 ${entranceBase}`}
                style={{ transitionDelay: getDelay(index * 120 + 260) }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-brand/15 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-brand" />
                  </div>
                  <p className="text-xs font-nunito text-cream-lightest/70 uppercase tracking-widest">{label}</p>
                </div>
                <p className="font-quicksandBold text-2xl md:text-3xl text-white">{value}</p>
                <p className="text-sm text-cream-lightest/70 font-nunito">
                  {label === 'Emergency Calls'
                    ? 'Rapid response team'
                    : 'Impact achieved with your support'}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-xs sm:text-sm text-cream-lightest">
            {featureHighlights.map(({ label, icon: Icon }, index) => (
              <div
                key={label}
                className={`flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 font-nunito backdrop-blur-sm transition-all duration-400 ease-out hover:bg-white/15 ${entranceBase}`}
                style={{ transitionDelay: getDelay(index * 120 + 380) }}
              >
                <Icon className="w-4 h-4 text-brand" />
                <span className='cursor-default'>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NGOHero;
