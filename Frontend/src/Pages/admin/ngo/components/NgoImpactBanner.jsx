import React from "react";

const DEFAULT_STATS = [
  {
    id: 1,
    value: "100+",
    caption: "Animals are currently under our care",
  },
  {
    id: 2,
    value: "200k",
    caption: "Meals served through our feeders & shelters",
  },
  {
    id: 3,
    value: "78M",
    caption: "People reached through awareness & education",
  },
];

const StatItem = ({ value, caption }) => (
  <div className="flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1">
    <span className="text-3xl md:text-4xl font-semibold text-sky-300 tracking-tight">
      {value}
    </span>
    <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-[12rem]">
      {caption}
    </p>
  </div>
);

const NgoImpactBanner = ({
  headline = "It is a long established fact that a reader will be distracted by the readable",
  stats = DEFAULT_STATS,
}) => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">

        <div className="bg-[#0B1020] text-white rounded-[36px] md:rounded-[999px] px-6 sm:px-10 md:px-16 py-10 md:py-32 shadow-xl">
          {/* Headline */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center leading-snug mb-8 md:mb-10">
            {headline}
          </h2>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 md:gap-16 justify-items-center">
            {stats.map((stat) => (
              <StatItem key={stat.id} value={stat.value} caption={stat.caption} />
            ))}
          </div>
        </div>

    </section>
  );
};

export default NgoImpactBanner;
