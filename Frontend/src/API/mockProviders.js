// Cloudinary-ready profilePic URLs can be passed directly in each item.
// Temporary defaults added for missing data based on the card design.

const vets = [
  {
    id: "v1",
    type: "vet",
    name: "Dr. Anaya Kapoor",
    profession: "Veterinarian",
    city: "Jaipur",
    locality: "C-Scheme",
    rating: 4.8,
    profilePic:
      "https://res.cloudinary.com/demo/image/upload/c_fill,g_face,h_600,w_600/woman.jpg",
    specialization: "General",
    services: ["Consultation", "Vaccination", "Dental", "Emergency"],
    homeService: true,
    about: "10+ yrs. Companion animal care, preventive health, and dental.",
    images: [],
  },
  {
    id: "v2",
    type: "vet",
    name: "Dr. Rahil Singh",
    profession: "Veterinarian",
    city: "Delhi",
    locality: "Hauz Khas",
    rating: 4.6,
    profilePic:
      "https://res.cloudinary.com/demo/image/upload/c_fill,g_face,h_600,w_600/man.jpg",
    specialization: "Surgery",
    services: ["Surgery", "Consultation", "Emergency"],
    homeService: false,
    about: "8 yrs. Soft-tissue surgery and trauma stabilization.",
    images: [],
  },
];

const trainers = [
  {
    id: "t1",
    type: "trainer",
    name: "Kavya Rao",
    profession: "Trainer",
    city: "Jaipur",
    locality: "Vaishali Nagar",
    rating: 4.7,
    profilePic:
      "https://res.cloudinary.com/demo/image/upload/c_fill,g_face,h_600,w_600/woman.jpg",
    specialization: "Obedience",
    services: ["Obedience", "Puppy", "Behavior", "Home Visits"],
    homeService: true,
    about: "5 yrs. Positive reinforcement & behaviour shaping.",
    images: [],
  },
];

const groomers = [
  {
    id: "g1",
    type: "groomer",
    name: "Paws & Co",
    profession: "Groomer",
    city: "Delhi",
    locality: "Saket",
    rating: 4.4,
    profilePic:
      "https://res.cloudinary.com/demo/image/upload/c_fill,g_auto,h_600,w_600/dog.jpg",
    specialization: "Full Groom",
    services: ["Grooming", "Washing", "Trimming", "Deshedding", "Nail Care"],
    homeService: false,
    about: "Studio grooming with gentle handling and hygiene-first setup.",
    images: [],
  },
];

const STORE = { vet: vets, trainer: trainers, groomer: groomers };

export function listByType(
  type,
  { q = "", city = "", date = "", time = "", services = [] } = {}
) {
  // basic filters; date/time left for future use
  const data = STORE[type] || [];
  const qx = q.trim().toLowerCase();
  const cx = city.trim().toLowerCase();
  const selServices = Array.isArray(services) ? services.map((s) => s.toLowerCase()) : [];

  return data.filter((p) => {
    const okQ =
      !qx ||
      p.name.toLowerCase().includes(qx) ||
      (p.specialization || "").toLowerCase().includes(qx) ||
      (p.profession || "").toLowerCase().includes(qx);

    const okC = !cx || (p.city || "").toLowerCase() === cx;

    const okServices =
      selServices.length === 0 ||
      selServices.every((s) =>
        (p.services || []).some((ps) => ps.toLowerCase() === s)
      );

    return okQ && okC && okServices;
  });
}

export function getOne(type, id) {
  return (STORE[type] || []).find((p) => p.id === id) || null;
}
