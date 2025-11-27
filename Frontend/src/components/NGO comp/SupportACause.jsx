import React from "react";
import { Link } from "react-router-dom";

// Centralized data; can still be overridden via props
const CAUSES = [
  {
    id: 1,
    title: "Adopt a Pet",
    description:
      "Give a rescued animal a loving home and gain a loyal companion for life. Adopt today!",
    image:
      "https://i.pinimg.com/236x/e2/42/1e/e2421ea92c654c3e88aa220b69cbd9e3.jpg",
    link: "/ngo/adopt",
  },
  {
    id: 2,
    title: "Donate for Animal Welfare",
    description:
      "Your support provides food, shelter, and care for animals in need. Every contribution saves lives!",
    image:
      "https://www.3sidedmedia.com/Portals/3/EasyDNNNews/1208/600600p1385EDNmainshleter-dog-2.jpg",
    link: "/ngo/donate",
  },
  {
    id: 3,
    title: "Find an NGO Nearby",
    description:
      "Discover nearby animal welfare organizations and join the movement to help animals.",
    image:
      "https://kolkatastreetdogsdotin.wordpress.com/wp-content/uploads/2016/11/ngos.jpg?w=640",
    link: "/ngo/nearby",
  },
  {
    id: 4,
    title: "Report Animal Cruelty",
    description:
      "See an animal in distress? Take prompt action by reporting cruelty to save lives.",
    image:
      "https://uvhs.org/wp-content/uploads/2023/01/dachshund-2683905_1920.jpg",
    link: "/report-cruelty",
  },
];

const isInternal = (href) => typeof href === "string" && href.startsWith("/");
const hasLink = (href) => typeof href === "string" && href.length > 0;

const CauseCircle = ({ cause }) => {
  const CircleContent = (
    <div className="group relative aspect-square w-72 rounded-full overflow-hidden shadow-lg cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8C42] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFF7D6] transition-transform duration-300 ">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${cause.image})` }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/45 group-hover:bg-black/65 transition-colors duration-300" />

      {/* Text swap container */}
      <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
        {/* Title (default) */}
        <p className="text-white text-2xl font-semibold leading-snug transition-opacity duration-300 group-hover:opacity-0">
          {cause.title}
        </p>

        {/* Description (on hover) */}
        <p className="absolute text-white text-md leading-snug opacity-0 transition-opacity duration-300 group-hover:opacity-100 mx-2">
          {cause.description}
        </p>
      </div>
    </div>
  );

  if (!hasLink(cause.link)) {
    return (
      <div aria-label={cause.title} className="flex justify-center">
        {CircleContent}
      </div>
    );
  }

  return isInternal(cause.link) ? (
    <Link
      to={cause.link}
      aria-label={cause.title}
      className="flex justify-center"
    >
      {CircleContent}
    </Link>
  ) : (
    <a
      href={cause.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={cause.title}
      className="flex justify-center"
    >
      {CircleContent}
    </a>
  );
};

const SupportACause = ({ items = CAUSES }) => {
  return (
    <section className="bg-app-surface py-12 rounded-3xl mx-2 sm:mx-12 px-12 mt-12">
      <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
        Support a cause
      </h2>

      {/* ✨ New description text */}
      <p className="text-slate-600 max-w-3xl mb-10 text-sm sm:text-base">
        Every small act of kindness helps build a safer, happier world for
        animals. Whether you choose to adopt, donate, volunteer, or raise your
        voice against cruelty — Petopia makes it easier to support the causes
        that truly matter.
      </p>

      {/* 4 → 2 → 1 responsive layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 justify-items-center">
        {items.map((cause) => (
          <CauseCircle key={cause.id} cause={cause} />
        ))}
      </div>
    </section>
  );
};

export default SupportACause;
