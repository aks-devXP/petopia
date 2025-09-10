import React from "react";
import { Link } from "react-router-dom";

// Centralized data; swap to props or external data source if needed
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

const CardMedia = ({ image, title }) => (
  <div
    className="relative h-64"
    style={{
      backgroundImage: `url(${image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors duration-300 grid place-items-center">
      <h3 className="text-white text-2xl font-bold text-center px-4">{title}</h3>
    </div>
  </div>
);

const CauseCard = ({ cause }) => {
  return (
    <div className="rounded-lg shadow-lg overflow-hidden bg-white group">
      {hasLink(cause.link) ? (
        isInternal(cause.link) ? (
          <Link to={cause.link} aria-label={cause.title} className="block outline-none">
            <CardMedia image={cause.image} title={cause.title} />
          </Link>
        ) : (
          <a href={cause.link} target="_blank" rel="noopener noreferrer" aria-label={cause.title} className="block">
            <CardMedia image={cause.image} title={cause.title} />
          </a>
        )
      ) : (
        <CardMedia image={cause.image} title={cause.title} />
      )}
      <div className="p-4">
        <p className="text-gray-600 text-sm">{cause.description}</p>
        <div className="mt-4 text-center">
          {hasLink(cause.link) ? (
            isInternal(cause.link) ? (
              <Link to={cause.link} className="text-[#704214] font-bold hover:text-[#FF8C42] duration-300">
                Learn More
              </Link>
            ) : (
              <a href={cause.link} target="_blank" rel="noopener noreferrer" className="text-[#704214] font-bold hover:text-[#FF8C42] duration-300">
                Learn More
              </a>
            )
          ) : (
            <span className="text-gray-400 font-semibold cursor-not-allowed">Coming soon</span>
          )}
        </div>
      </div>
    </div>
  );
};

const SupportACause = ({ items = CAUSES }) => {
  return (
    <section className="bg-[#FFF7D6] py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-black mb-12 tracking-tight">
        SUPPORT A CAUSE
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((cause) => (
          <CauseCard key={cause.id} cause={cause} />
        ))}
      </div>
    </section>
  );
};

export default SupportACause;
