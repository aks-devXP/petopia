import React from "react";
import BlurText from "@components/BlurText";
import CardNav from "@components/CardNav";
import Vet from "@assets/PetServices/ServiceBanner.png";
import { ShieldCheck, BadgeIndianRupee, CalendarClock, Zap } from "lucide-react";

export default function ServiceBanner() {
  const items = [
    {
      title: "Veterinary",
      bgColor: "#0c2b37",
      textColor: "#fff",
      services: [
        { label: "Emergency Care", ariaLabel: "Emergency Vet Care" },
        { label: "Consultation", ariaLabel: "Vet Consultation" },
        { label: "Diagnosis", ariaLabel: "Diagnosis" },
        { label: "Vaccination", ariaLabel: "Vaccinations" },
        { label: "Deworming", ariaLabel: "Deworming" },
      ],
      href: "/pet-services/vet",
    },
    {
      title: "Groomer",
      bgColor: "#493014",
      textColor: "#fff",
      services: [
        { label: "Bath & Blow Dry", ariaLabel: "Bath and Blow Dry" },
        { label: "Trim & Style", ariaLabel: "Trimming and Styling" },
        { label: "Nail Clipping & Ear Clean", ariaLabel: "Nail and Ear Care" },
      ],
      href: "/pet-services/groomer",
    },
    {
      title: "Trainer",
      bgColor: "#0c2b37",
      textColor: "#fff",
      services: [
        { label: "Obedience Training", ariaLabel: "Obedience Training" },
        { label: "Puppy Socialization", ariaLabel: "Puppy Socialization" },
        { label: "Behavior Correction", ariaLabel: "Behavior Correction" },
      ],
      href: "/pet-services/trainer",
    },
  ];

  return (
    // No overflow clipping here; prevent horizontal scroll only.
    <section className="relative mx-2 sm:mx-12 mb-[80px] ">
      {/* Banner block (no overflow-hidden!) */}
      <div className="bg-[#c65291] rounded-b-3xl py-10 pb-[110px] px-4 sm:px-8 lg:px-12">
        <div className="grid md:grid-cols-10 items-center gap-y-6 gap-x-8">
          {/* Left: headline + feature chips */}
          <div className="col-span-6">
            <BlurText
              text={
                "Your pet deserves the best care & <br/> You deserve the ease of finding it."
              }
              delay={80}
              animateBy="words"
              direction="top"
              className="text-4xl md:text-6xl font-extrabold leading-tight text-white"
            />

            {/* Feature chips (distinct & booking-positive) */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-white">
              <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2 border border-white/15 backdrop-blur-sm">
                <ShieldCheck className="h-6 w-6" />
                <span className="text-sm font-medium">Verified vets</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2 border border-white/15 backdrop-blur-sm">
                <BadgeIndianRupee className="h-6 w-6" />
                <span className="text-sm font-medium">Transparent pricing</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2 border border-white/15 backdrop-blur-sm">
                <Zap className="h-6 w-6" />
                <span className="text-sm font-medium">Instant confirmation</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2 border border-white/15 backdrop-blur-sm">
                <CalendarClock className="h-6 w-6" />
                <span className="text-sm font-medium">Same-day slots</span>
              </div>
            </div>
          </div>

          {/* Right: image */}
          <div className="w-full flex justify-center md:justify-end col-span-4">
            <div className="w-full max-w-[560px] lg:max-w-[620px] aspect-[5/4]">
              <img
                src={Vet}
                alt="Veterinarian examining a pet"
                loading="lazy"
                className="w-full h-full object-contain"
                sizes="(min-width: 1024px) 620px, (min-width: 768px) 560px, 90vw"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Booking / CardNav container — same pattern as your old working code */}
      <div className="w-full px-2 flex justify-center items-center -mt-[60px]">
        <div className="bg-white rounded-3xl shadow-xl md:w-[90%] w-full h-24 flex items-center px-2 relative z-[20] overflow-visible">
          <CardNav
            items={items}
            baseColor="#fff"
            menuColor="#0f172a"
            ease="power3.out"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}
