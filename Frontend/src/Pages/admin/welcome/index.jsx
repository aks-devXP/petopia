import React from 'react';
import PawPrint from './components/PawPrint';
import NavBar from './components/NavBar';
import Cat1 from '@assets/HomeScreen/Pets/cat3.png';
import Cat2 from '@assets/HomeScreen/Pets/cat4.png';
import Dog1 from '@assets/HomeScreen/Pets/dog1.png';
import Dog2 from '@assets/HomeScreen/Pets/dog3.png';
import ServiceHero from './components/ServiceHero';
import PetCareGuideBanner from './components/PetCareGuideBanner';
import BlogBanner from './components/BlogBanner';
import Footer from '@/components/Footer';

export default function Welcome() {
  const handleExplore = () => {
    document.getElementById('explore-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col items-center bg-app-bg">
      <div className="w-full">
        <NavBar onExploreClick={handleExplore} />
      </div>

      <div className="w-full flex items-center justify-center pb-2">
        <PawPrint
          className="w-[500px] hover:scale-[1.01] transition-transform duration-300 ease-out"
          fill="#e9ddd5"
          toeImages={[Dog1, Cat2, Dog2, Cat1]} // order preserved exactly
          padChildren={
            <div className="text-black px-4 pt-2 w-full mt-16">
              <p className="text-3xl font-nunitoBlack leading-tight text-brand">
                Caring for<br />Your Pet Made Simple!
              </p>
              <p className="text-lg font-nunito mt-4">
                Everything your pet needs, all in one place.
              </p>
            </div>
          }
        />
      </div>

      {/* Explore target */}
      <div id="explore-section" className="w-full flex flex-col space-y-2 sm:space-y-6 md:space-y-8 lg:space-y-12">
        <ServiceHero />
        <PetCareGuideBanner />
        <BlogBanner />

      </div>

      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}
