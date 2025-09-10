import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useRef } from 'react';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const StackingCardsSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    
    // Clear the refs array to avoid duplications on re-renders
    if (cards.length > 3) {
      cardsRef.current = cards.slice(0, 3);
    }
    
    // Initial staggered positions
    gsap.set(cards[0], { y: 0, zIndex: 1 });    // First card (01) - will be at bottom in final state
    gsap.set(cards[1], { y: 120, zIndex: 2 });  // Second card (02) - middle
    gsap.set(cards[2], { y: 240, zIndex: 3 });  // Third card (03) - will be at top in final state
    
    // Main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=600",
        pin: true,
        scrub: 1,
        // markers: true, // Uncomment for debugging
      }
    });
    
    // Animation: cards stack from bottom to top (reverse of original)
    // Bottom card (03) moves to top position first
    tl.to(cards[1], { y: 0, duration: 1 })
      // Then middle card (02) moves to top, but stays under the previous card
      .to(cards[2], { y: 0, duration: 1 }, "<0.5");
    
    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Add refs to cards
  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <div ref={sectionRef} className="bg-[#0f172a] min-h-screen relative overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-start">
          {/* Left section - Fixed content */}
          <div className="lg:w-1/2 lg:pr-8 mb-12 lg:mb-0">
            <h2 className="text-5xl font-bold text-white mb-6">
              Discover the Power of Our Products
            </h2>
            <p className="text-white mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Suspendisse varius enim in eros elementum tristique. Duis 
              cursus, mi quis viverra ornare, eros dolor interdum nulla, ut 
              commodo diam libero vitae erat.
            </p>
            <button className="bg-purple-400 hover:bg-purple-500 text-white px-8 py-3 rounded-md transition-colors">
              Main action
            </button>
          </div>
          
          {/* Right section - Stacking cards */}
          <div className="lg:w-1/2 relative h-[600px]">
            {/* Card 01 - Will be at bottom in final state */}
            <div 
              ref={addToRefs}
              className="absolute w-full bg-[#4c4e82] rounded-2xl p-6 shadow-lg"
              style={{ height: '240px', left: '0' }}
            >
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-4xl font-bold text-white mb-4">
                    Contact Us
                  </h3>
                  <span className="text-6xl font-bold text-white/50">01</span>
                </div>
                <p className="text-white mt-4">
                  Reach out to us through our contact form or give us a call for any inquiries or assistance.
                </p>
              </div>
            </div>
            
            {/* Card 02 - Middle card */}
            <div 
              ref={addToRefs}
              className="absolute w-full bg-[#392b67] rounded-2xl p-6 shadow-lg"
              style={{ height: '240px', left: '0' }}
            >
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-4xl font-bold text-white mb-4">
                    Adopt a Pet
                  </h3>
                  <span className="text-6xl font-bold text-white/50">02</span>
                </div>
                <p className="text-white mt-4">
                  Browse through our available pets for adoption and find your perfect match.
                </p>
              </div>
            </div>
            
            {/* Card 03 - Will be at top in final state */}
            <div 
              ref={addToRefs}
              className="absolute w-full bg-[#0f172a] rounded-2xl p-6 shadow-lg"
              style={{ height: '240px', left: '0' }}
            >
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-4xl font-bold text-white mb-4">
                    Donate
                  </h3>
                  <span className="text-6xl font-bold text-white/50">03</span>
                </div>
                <p className="text-white mt-4">
                  Support our cause by making a donation to help us care for more pets in need.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StackingCardsSection;