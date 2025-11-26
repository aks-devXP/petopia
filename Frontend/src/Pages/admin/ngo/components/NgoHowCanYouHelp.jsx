import React from "react";
import {
  PawPrint,
  HeartHandshake,
  MapPinned,
  ShieldAlert,
} from "lucide-react";

const HELP_ITEMS = [
  {
    id: 1,
    title: "Adopt a rescued pet",
    description:
      "Give a second chance to dogs and cats listed on Petopia through our partner NGOs. Adoption turns a temporary shelter into a permanent, loving home.",
    tag: "Adoption & long-term care",
    icon: PawPrint,
  },
  {
    id: 2,
    title: "Support shelters & feeders",
    description:
      "Your financial support helps NGOs cover food, medical care, sterilization, and vaccinations for street animals and surrendered pets featured on Petopia.",
    tag: "Donations & medical aid",
    icon: HeartHandshake,
  },
  {
    id: 3,
    title: "Collaborate with nearby NGOs",
    description:
      "Use Petopia’s NGO discovery to connect with local organizations, join awareness drives, and participate in on-ground rescue or foster programs.",
    tag: "Community partnerships",
    icon: MapPinned,
  },
  {
    id: 4,
    title: "Report cruelty & emergencies",
    description:
      "When you see an animal in distress, Petopia helps you record details and route cases to the right NGO or authority so that help reaches quickly.",
    tag: "Protection & legal support",
    icon: ShieldAlert,
  },
];

const HelpCard = ({ item }) => {
  const Icon = item.icon;

  return (
    <div className="bg-app-elevated border border-slate-200 rounded-3xl p-6 sm:p-7 lg:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Icon */}
      <div className="mb-5">
        <div className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-600">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <h3 className="text-lg sm:text-xl font-semibold text-ink-primary mb-3">
        {item.title}
      </h3>

      <p className="text-sm sm:text-[15px] leading-relaxed text-slate-600 mb-6">
        {item.description}
      </p>

      <div className="inline-flex items-center rounded-full border border-slate-300 px-4 py-2 text-xs sm:text-sm text-slate-700 bg-white/60 select-none">
        {item.tag}
      </div>
    </div>
  );
};

const NgoHowCanYouHelp = ({ items = HELP_ITEMS }) => {
  return (
    <section className="bg-app-bg py-12 sm:py-16 px-4 mx-2 sm:mx-12">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-ink-primary mb-4">
        How can you help us
      </h2>

      <p className="max-w-3xl text-sm sm:text-base text-slate-600 mb-10">
        Petopia connects animal lovers, rescuers, and NGOs to create safer,
        kinder cities for pets and street animals. Even small actions—adopting,
        donating, partnering with shelters, or reporting cruelty—add up to a
        massive impact on animal welfare.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        {items.map((item) => (
          <HelpCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default NgoHowCanYouHelp;
