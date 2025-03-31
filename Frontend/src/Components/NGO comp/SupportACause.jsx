import React from "react";

const causes = [
  {
    id: 1,
    title: "TAYYARI KAL KI",
    description:
      "Our campaign ‘Tayyari Kal Ki’ aims at Training & Up Skilling the youth between the age of 18-32 years for employment and empowering them.",
    image:
      "https://www.smilefoundationindia.org/images/tayyari_kal_ki.jpg", // Replace with actual image path
    link: "https://www.smilefoundationindia.org/#!",
  },
  {
    id: 2,
    title: "HEALTH CANNOT WAIT",
    description:
      "Realising the need for accessible and quality healthcare for all, our campaign ‘Health Cannot Wait’ aims at providing people from the underserved communities timely medical help.",
    image:
      "https://www.smilefoundationindia.org/images/health_cannot_wait.jpg", // Replace with actual image path
    link: "https://www.smilefoundationindia.org/#!",
  },
  {
    id: 3,
    title: "SHIKSHA NA RUKE",
    description:
      "Smile Foundation, through its ‘Shiksha Na Ruke’ initiative, has been helping children from difficult circumstances get back to school.",
    image:
      "https://www.smilefoundationindia.org/images/shiksha_na_ruke.jpg", // Replace with actual image path
    link: "https://www.smilefoundationindia.org/#!",
  },
  {
    id: 4,
    title: "SHE CAN FLY",
    description:
      "Smile Foundation’s initiative ‘She Can Fly’ is an effort to enable, equip and empower girl children with quality education, proper guidance, and nutrition.",
    image:
      "https://www.smilefoundationindia.org/images/she_can_fly.jpg", // Replace with actual image path
    link: "https://www.smilefoundationindia.org/#!",
  },
];

const SupportACause = () => {
  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center text-black mb-12">
        SUPPORT A CAUSE
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {causes.map((cause) => (
          <div
            key={cause.id}
            className="rounded-lg shadow-lg overflow-hidden bg-white"
          >
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
            <div className="p-4">
              <p className="text-gray-600 text-sm">{cause.description}</p>
              <div className="mt-4 text-center">
                <a
                  href={cause.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#85EFC4] font-bold hover:underline"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportACause;
