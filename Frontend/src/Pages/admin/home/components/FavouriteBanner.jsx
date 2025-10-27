import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

import Cat from "@assets/HomeScreen/cat.jpg";
import Dog from "@assets/HomeScreen/dog.jpg";
import Vet from "@assets/HomeScreen/vet.jpg";
import PawButton from "@/components/buttons/PawButton";

export default function FavouriteBanner() {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e?.preventDefault?.();      // optional, harmless
    navigate("/breed-info");    // go to breed info
  };

  return (
    <div className="px-4 mx-2 lg:mx-12 py-3 md:pt-8 flex-1 rounded-3xl">
      <div className="p-2 w-full">
        <h2 className="font-nunitoBlack text-2xl md:text-3xl leading-tight text-ink-primary">
          Because your pets <br className="hidden md:block" />
          deserve the trusted picks.
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-12 mt-1 md:mt-2">
        {/* LEFT */}
        <div className="w-full md:w-[55%] flex flex-col gap-4">
          <NavLink
            to="/favorites"
            className="group relative overflow-hidden rounded-3xl block"
            aria-label="Explore your favorite providers"
          >
            <div
              className="aspect-[4/3] md:aspect-[5/4] w-full bg-black text-white flex items-center justify-center relative
                         transition-transform duration-300 group-hover:scale-[1.02] cursor-pointer"
              style={{
                backgroundImage: `url(${Vet})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/50" />
              <div className="relative z-10 flex flex-col items-center gap-2 text-center px-4">
                <div className="inline-flex items-center justify-center rounded-full
                                bg-app-elevated/90 px-3 py-1 text-brand text-xl md:text-2xl font-quicksandBold">
                  <Heart className="h-5 w-5 mr-2" strokeWidth={2} /> Favourite Providers
                </div>
                <p className="text-sm md:text-base opacity-90 max-w-md">
                  Pick from your saved providers and book again in just a tap.
                </p>
              </div>
            </div>
          </NavLink>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-[45%] flex flex-col gap-4">
          <div className="rounded-3xl grid grid-cols-2 gap-2" aria-label="Pet showcase">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={Dog}
                alt="Happy dog"
                className="h-full w-full object-cover rounded-2xl transition-transform duration-200 hover:scale-[1.02]"
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={Cat}
                alt="Curious cat"
                className="h-full w-full object-cover rounded-2xl transition-transform duration-200 hover:scale-[1.02]"
              />
            </div>
          </div>

          <div className="rounded-3xl bg-app-elevated p-4 flex flex-col gap-3">
            <p className="text-ink-secondary/95 text-sm lg:text-base">
              Continue learning their quirks, needs, and traits. <br/> 
              Turn knowledge into better care. Because the better you know them, the better you care.
            </p>
            <div>
              <PawButton onClick={handleClick} text="Learn More" />
              {/* or just <NavLink to="/breed-info"><PawButton text="Learn More" /></NavLink> if no custom logic */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
