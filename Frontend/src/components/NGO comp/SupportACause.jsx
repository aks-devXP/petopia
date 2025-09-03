import React from "react";
import { Link } from "react-router-dom";

const causes = [
  {
    id: 1,
    title: "Adopt a Pet",
    description:
      "Give a rescued animal a loving home and gain a loyal companion for life. Adopt today!",
    image:
      "https://i.pinimg.com/236x/e2/42/1e/e2421ea92c654c3e88aa220b69cbd9e3.jpg", // Replace with actual image path
    link: "",
  },
  {
    id: 2,
    title: "Donate for Animal Welfare",
    description:
      "Your support provides food, shelter, and care for animals in need. Every contribution saves lives!",
    image:
      "https://www.eatright.org/-/media/images/eatright-articles/eatright-article-1200x675/animal-welfare_1200x675.jpg?as=0&w=967&rev=ae79d07cf65642069b2b009beed082e6&hash=6383C2EEA914D366445F65EA4E15B098", // Replace with actual image path
    link: "",
  },
  {
    id: 3,
    title: "Find an NGO Nearby",
    description:
      "Discover nearby animal welfare organizations and join the movement to help animals.",
    image:
      "https://kolkatastreetdogsdotin.wordpress.com/wp-content/uploads/2016/11/ngos.jpg?w=640", // Replace with actual image path
    link: "",
  },
  {
    id: 4,
    title: "Report Animal Cruelty",
    description:
      "See an animal in distress? Take prompt action by reporting cruelty to save lives.",
    image:
      "https://uvhs.org/wp-content/uploads/2023/01/dachshund-2683905_1920.jpg", // Replace with actual image path
    link: "/report-cruelty",
  },
];

const SupportACause = () => {
  return (
    <div className="bg-[#FFF7D6] py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center text-black mb-12">
        SUPPORT A CAUSE
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {causes.map((cause) => (
          <div
            key={cause.id}
            className="rounded-lg shadow-lg overflow-hidden bg-white"
          >
            {cause.id === 4 ? (
              <Link to={cause.link}>
                <div
                  className="relative group h-64"
                  style={{
                    backgroundImage: `url(${cause.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition duration-300 flex items-center justify-center">
                    <h3 className="text-white text-2xl font-bold text-center">
                      {cause.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ) : (
              <a href={cause.link} target="_blank" rel="noopener noreferrer">
                <div
                  className="relative group h-64"
                  style={{
                    backgroundImage: `url(${cause.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition duration-300 flex items-center justify-center">
                    <h3 className="text-white text-2xl font-bold text-center">
                      {cause.title}
                    </h3>
                  </div>
                </div>
              </a>
            )}
            <div className="p-4">
              <p className="text-gray-600 text-sm">{cause.description}</p>
              <div className="mt-4 text-center">
                {cause.id === 4 ? (
                  <Link
                    to={cause.link}
                    className="text-[#704214] font-bold hover:text-[#FF8C42] duration-300"
                  >
                    Learn More
                  </Link>
                ) : (
                  <a
                    href={cause.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#704214] font-bold hover:text-[#FF8C42] duration-300"
                  >
                    Learn More
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportACause;
