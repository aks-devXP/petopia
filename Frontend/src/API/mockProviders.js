// src/API/mockProviders.js
const vets = [
  { id: "v1", type: "vet", name: "Dr. Anaya Kapoor", city: "Jaipur", rating: 4.8, profilePic: "", specialization: "General", about: "10+ yrs.", images: [] },
  { id: "v2", type: "vet", name: "Dr. Rahil Singh",  city: "Delhi",  rating: 4.6, profilePic: "", specialization: "Surgery", about: "8 yrs.",   images: [] },
];

const trainers = [
  { id: "t1", type: "trainer", name: "Kavya Rao",  city: "Jaipur", rating: 4.7, profilePic: "", specialization: "Obedience", about: "5 yrs.", images: [] },
];

const groomers = [
  { id: "g1", type: "groomer", name: "Paws & Co", city: "Delhi", rating: 4.4, profilePic: "", specialization: "Full Groom", about: "Studio", images: [] },
];

const STORE = { vet: vets, trainer: trainers, groomer: groomers };

export function listByType(type, { q = "", city = "" } = {}) {
  const data = STORE[type] || [];
  const qx = q.trim().toLowerCase();
  const cx = city.trim().toLowerCase();
  return data.filter((p) => {
    const okQ = !qx || p.name.toLowerCase().includes(qx) || (p.specialization||"").toLowerCase().includes(qx);
    const okC = !cx || (p.city||"").toLowerCase() === cx;
    return okQ && okC;
  });
}

export function getOne(type, id) {
  return (STORE[type] || []).find((p) => p.id === id) || null;
}
