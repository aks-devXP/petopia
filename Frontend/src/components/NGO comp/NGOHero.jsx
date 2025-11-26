import { PawPrint } from 'lucide-react';
import backgroundImage from '@/assets/NGO/background.png';
import PawButton from '@/components/buttons/PawButton';

const NGOHero = ({ onExploreServices }) => {
  const handleExploreClick = () => {
    if (onExploreServices) onExploreServices();
  };

  return (
    <section className="relative w-full min-h-[420px] sm:min-h-[520px] md:min-h-[600px] lg:min-h-[680px] overflow-hidden">

      {/* Background Image */}
      <img
        src={backgroundImage}
        alt="Animal welfare NGO background"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center top-20 sm:top-40">

        {/* Main Text */}
        <h1 className="text-app-bg font-nunitoBlack text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-5xl leading-tight drop-shadow-xl">
          Partner with NGOs that <br className="hidden sm:block" /> prioritize transparency, trust,<br className="hidden sm:block" />
          and long-term animal welfare.
        </h1>

        {/* Curved Tagline */}
        <p className="mt-6 bg-app-bg font-quicksandBold text-brand text-lg sm:text-xl md:text-2xl px-6 py-3 rounded-full shadow-xl rotate-[-2deg]">
          A kinder world for countless happy tails
        </p>

        {/* Explore Button */}
        <div className="mt-8 sm:mt-10">
          <PawButton
            text="Explore"
            onClick={handleExploreClick}
          />
        </div>
      </div>
    </section>
  );
};

export default NGOHero;
