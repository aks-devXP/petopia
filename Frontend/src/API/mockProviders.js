const vets = [
  {
    id: "v1",
    type: "vet",
    name: "Dr. Anaya Kapoor",
    city: "Jaipur",
    state: "Rajasthan",
    rating: 4.8,
    ratingCount: 214,
    profilePic: "https://claremontvet.com/wp-content/uploads/2023/01/CVH-team-mcdonald.png",
    gallery: [
      "https://images.unsplash.com/photo-1582719478325-d83a30a35d95?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1550837240-6cb547c8c7fc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
    ],
    specialization: "Small Animal Medicine",
    about:
      "Dr. Kapoor leads preventive and chronic care programs for companion animals, blending evidence-based medicine with compassionate client communication.",
    experience: 9,
    price: 1499,
    currency: "₹",
    languages: ["English", "Hindi"],
    services: [
      "Comprehensive wellness exams",
      "Vaccination & parasite control",
      "Chronic condition management",
      "Nutrition & lifestyle counselling",
    ],
    approach: [
      "Fear-free handling for anxious pets",
      "Proactive health plans with digital follow-ups",
      "Transparent care roadmaps for every visit",
    ],
    achievements: [
      "AAHA accredited 2022",
      "Petopia Gold Partner Clinic",
      "Certified in Companion Animal Nutrition",
    ],
    timings: [
      { start: "09:00 AM", end: "09:45 AM" },
      { start: "10:30 AM", end: "11:15 AM" },
      { start: "12:00 PM", end: "12:30 PM" },
      { start: "03:30 PM", end: "04:15 PM" },
      { start: "05:00 PM", end: "05:30 PM" },
    ],
    testimonials: [
      {
        name: "Rohit & Simba",
        quote:
          "Dr. Kapoor's tailored care plan has kept Simba's allergies under control for the first time in years.",
        date: "February 2025",
      },
      {
        name: "Aparna & Mochi",
        quote:
          "Every visit feels like a partnership. We leave with clarity and actionable next steps.",
        date: "December 2024",
      },
    ],
    addons: [
      { id: "lab-work", label: "Baseline blood work", price: 699 },
      { id: "nutrition", label: "Nutrition consultation", price: 399 },
      { id: "follow", label: "48-hr follow-up call", price: 249 },
    ],
  },
  {
    id: "v2",
    type: "vet",
    name: "Dr. Rahil Singh",
    city: "Delhi",
    state: "Delhi",
    rating: 4.7,
    ratingCount: 168,
    profilePic: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1582719478291-5ef8d37cf65c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582560475093-7e23b19f1f5b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1576765607924-3f7b71d72d88?auto=format&fit=crop&w=1200&q=80",
    ],
    specialization: "Soft Tissue Surgery",
    about:
      "Board-certified surgeon specialising in minimally invasive procedures and advanced post-operative recovery plans.",
    experience: 11,
    price: 1890,
    currency: "₹",
    languages: ["English", "Hindi", "Punjabi"],
    services: [
      "Pre-operative consultations",
      "Soft tissue and orthopedic surgeries",
      "Post-operative physiotherapy plan",
      "Telemedicine progress reviews",
    ],
    approach: [
      "Outcome-focused treatment protocols",
      "Transparent surgical dashboards for pet parents",
      "Integrated pain management programs",
    ],
    achievements: [
      "Recipient of VetSurgery Excellence Award 2023",
      "500+ successful minimally invasive procedures",
      "Certified Fear Free Professional",
    ],
    timings: [
      { start: "08:30 AM", end: "09:15 AM" },
      { start: "11:30 AM", end: "12:15 PM" },
      { start: "02:00 PM", end: "02:45 PM" },
      { start: "04:30 PM", end: "05:15 PM" },
    ],
    testimonials: [
      {
        name: "Tanya & Bruno",
        quote:
          "From diagnosis to rehab, Dr. Rahil's team kept us informed and confident. Bruno healed faster than expected.",
        date: "January 2025",
      },
      {
        name: "Zara & Pixel",
        quote:
          "The digital after-care plan with regular check-ins made all the difference to Pixel's recovery.",
        date: "November 2024",
      },
    ],
    addons: [
      { id: "pain-plan", label: "Personalised pain management kit", price: 899 },
      { id: "rehab", label: "Physiotherapy starter session", price: 1299 },
      { id: "concierge", label: "Concierge recovery monitoring (7 days)", price: 2199 },
    ],
  },
];

const trainers = [
  {
    id: "t1",
    type: "trainer",
    name: "Kavya Rao",
    city: "Bengaluru",
    state: "Karnataka",
    rating: 4.7,
    ratingCount: 142,
    profilePic: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522276498395-f4f68f7f8459?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1546975490-a79abdd54533?auto=format&fit=crop&w=1200&q=80",
    ],
    specialization: "Behavioral Rehabilitation",
    about:
      "Former canine behaviourist at an international rescue, Kavya builds personalised programs that combine positive reinforcement and lifestyle coaching.",
    experience: 7,
    price: 1190,
    currency: "₹",
    languages: ["English", "Kannada", "Hindi"],
    services: [
      "Foundational obedience bootcamps",
      "Separation anxiety protocols",
      "Reactive dog transformation plans",
      "Handler coaching & progress dashboards",
    ],
    approach: [
      "Science-backed behaviour plans",
      "Weekly progress analytics & video reviews",
      "Support pods for pet parents between sessions",
    ],
    achievements: [
      "IAABC Certified Dog Behaviour Consultant",
      "Partnered with 30+ corporate campuses",
      "Featured in Petopia Behaviour Playbook 2024",
    ],
    timings: [
      { start: "07:00 AM", end: "07:50 AM" },
      { start: "08:30 AM", end: "09:20 AM" },
      { start: "05:30 PM", end: "06:20 PM" },
      { start: "07:00 PM", end: "07:50 PM" },
    ],
    testimonials: [
      {
        name: "Arjun & Bolt",
        quote:
          "Bolt's reactivity melted away within weeks. Kavya's weekly report cards kept us accountable and inspired.",
        date: "March 2025",
      },
      {
        name: "Neha & Coco",
        quote:
          "The coaching extended beyond sessions – the digital toolkit and check-ins were invaluable.",
        date: "January 2025",
      },
    ],
    addons: [
      { id: "home-assessment", label: "In-home environment assessment", price: 599 },
      { id: "video-library", label: "Lifetime video library access", price: 349 },
      { id: "community-pass", label: "Access to reactive dog support group", price: 0 },
    ],
  },
];

const groomers = [
  {
    id: "g1",
    type: "groomer",
    name: "Paws & Co Studio",
    city: "Delhi",
    state: "Delhi",
    rating: 4.6,
    ratingCount: 186,
    profilePic: "https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/2021-08/Pic%204.JPG",
    gallery: [
      "https://images.unsplash.com/photo-1615751072497-5f5169c80d32?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1615754891838-30d0b3a7c33d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1619983081665-3fbc3750084e?auto=format&fit=crop&w=1200&q=80",
    ],
    specialization: "Luxury Spa & Styling",
    about:
      "Award-winning grooming collective delivering spa-grade treatments with dermatologically safe products and curated pet styling experiences.",
    experience: 6,
    price: 1590,
    currency: "₹",
    languages: ["English", "Hindi"],
    services: [
      "Hydro bath & coat conditioning rituals",
      "Breed-specific styling & deshedding",
      "Dermatologist-approved skin therapies",
      "Spa add-ons: pawdicure, aromatherapy, blueberry facial",
    ],
    approach: [
      "One pet at a time for a calm, premium experience",
      "Transparent service dashboard with live updates",
      "All-natural, vet-reviewed product stack",
    ],
    achievements: [
      "Petopia Luxury Grooming Partner 2024",
      "98% customer retention rate",
      "Certified Skin & Coat Care Specialists",
    ],
    timings: [
      { start: "10:00 AM", end: "11:30 AM" },
      { start: "12:00 PM", end: "01:30 PM" },
      { start: "03:00 PM", end: "04:30 PM" },
      { start: "05:00 PM", end: "06:30 PM" },
    ],
    testimonials: [
      {
        name: "Fatima & Snow",
        quote:
          "The spa-day updates were adorable and Snow came home smelling like a dream.",
        date: "February 2025",
      },
      {
        name: "Vivaan & Oreo",
        quote:
          "Attention to detail is unmatched – they flagged a skin concern early and connected us to a vet partner.",
        date: "December 2024",
      },
    ],
    addons: [
      { id: "paw-spa", label: "Paw spa with healing balm", price: 349 },
      { id: "fur-protect", label: "Post-groom coat serum kit", price: 299 },
      { id: "pickup", label: "Two-way chauffeured pick-up", price: 899 },
    ],
  },
];

const STORE = { vet: vets, trainer: trainers, groomer: groomers };

export function listByType(type, { q = "", city = "" } = {}) {
  const data = STORE[type] || [];
  const qx = q.trim().toLowerCase();
  const cx = city.trim().toLowerCase();
  return data.filter((p) => {
    const okQ =
      !qx ||
      p.name.toLowerCase().includes(qx) ||
      (p.specialization || "").toLowerCase().includes(qx);
    const okC = !cx || (p.city || "").toLowerCase() === cx;
    return okQ && okC;
  });
}

export function getOne(type, id) {
  return (STORE[type] || []).find((p) => p.id === id) || null;
}
