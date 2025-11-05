const TYPE_DEFAULTS = {
  vet: {
    fallbackImage:
      "https://images.unsplash.com/photo-1583911860205-72f8ac99ae8b?auto=format&fit=crop&w=600&q=80",
    responseTime: "Under 90 mins",
    heroBadges: ["Petopia Certified", "Fear-free practice"],
    tags: ["Digital health records", "In-clinic & tele health"],
    languages: ["English", "Hindi"],
    gallery: [
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1550837240-6cb547c8c7fc?auto=format&fit=crop&w=1200&q=80",
    ],
    services: [
      "Preventive health consultations",
      "Vaccination & follow-up tracking",
      "Chronic care & nutrition planning",
    ],
    approach: [
      "Comprehensive pre-visit questionnaires",
      "Collaborative care pathways with specialists",
      "Continuous monitoring via Petopia app",
    ],
    achievements: [
      "Featured in Petopia Wellness Network",
      "Trusted by 500+ pet families",
    ],
    addons: [
      { id: "followup", label: "48-hour digital follow-up", price: 299 },
      { id: "diet", label: "Personalised diet chart", price: 349 },
    ],
    testimonials: [
      {
        name: "Kritika & Rusty",
        quote:
          "The consult felt like a collaborative workshop. Rusty's treatment plan finally makes sense.",
        date: "October 2024",
      },
      {
        name: "Mehul & Ginger",
        quote:
          "Progress dashboards keep the whole family aligned. Vet visits no longer feel stressful.",
        date: "August 2024",
      },
    ],
    defaultSlots: [
      { start: "09:30 AM", end: "10:15 AM", meta: "Clinic consult" },
      { start: "11:00 AM", end: "11:45 AM", meta: "Clinic consult" },
      { start: "02:30 PM", end: "03:15 PM", meta: "Video follow-up" },
      { start: "04:30 PM", end: "05:15 PM", meta: "Clinic consult" },
    ],
  },
  trainer: {
    fallbackImage:
      "https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=600&q=80",
    responseTime: "Within 2 hours",
    heroBadges: ["Certified Behaviourist", "Progress dashboards"],
    tags: ["Positive reinforcement", "Goal-tracked programs"],
    languages: ["English", "Hindi", "Regional"],
    gallery: [
      "https://images.unsplash.com/photo-1522276498395-f4f68f7f8459?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=80",
    ],
    services: [
      "Foundational obedience reset",
      "Behaviour modification and desensitisation",
      "Handler coaching & lifestyle design",
    ],
    approach: [
      "Baseline assessment with data-led scoring",
      "Weekly progress analytics & video feedback",
      "Community support pods for accountability",
    ],
    achievements: [
      "95% completion rate on 6-week programs",
      "Preferred partner for 30+ gated communities",
    ],
    addons: [
      { id: "home-visit", label: "On-site home visit", price: 799 },
      { id: "video-review", label: "Mid-week video review", price: 249 },
    ],
    testimonials: [
      {
        name: "Natasha & Hugo",
        quote:
          "The structure, data and empathy in every session helped us turn a corner within weeks.",
        date: "September 2024",
      },
      {
        name: "Pranav & Indie",
        quote:
          "I loved the weekly dashboards—kept us aligned and motivated between sessions.",
        date: "July 2024",
      },
    ],
    defaultSlots: [
      { start: "07:00 AM", end: "07:50 AM", meta: "Outdoor session" },
      { start: "08:30 AM", end: "09:20 AM", meta: "Outdoor session" },
      { start: "06:00 PM", end: "06:50 PM", meta: "Community park" },
      { start: "07:30 PM", end: "08:20 PM", meta: "In-home session" },
    ],
  },
  groomer: {
    fallbackImage:
      "https://images.unsplash.com/photo-1516912481808-3406841bd33c?auto=format&fit=crop&w=600&q=80",
    responseTime: "Instant confirmation",
    heroBadges: ["Dermatologist approved", "Spa-grade products"],
    tags: ["Sanitised suites", "Live grooming updates"],
    languages: ["English", "Hindi"],
    gallery: [
      "https://images.unsplash.com/photo-1615751072497-5f5169c80d32?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1615754891838-30d0b3a7c33d?auto=format&fit=crop&w=1200&q=80",
    ],
    services: [
      "Full coat spa & drying rituals",
      "Breed-specific styling and trimming",
      "Medicated baths & skin therapy add-ons",
    ],
    approach: [
      "One pet per stylist for a calm experience",
      "Real-time photo updates to your phone",
      "Vet-reviewed product stack for every coat type",
    ],
    achievements: [
      "98% repeat booking rate",
      "Petopia Luxury Grooming Award 2024",
    ],
    addons: [
      { id: "spa-upgrade", label: "Spa upgrade with aromatherapy", price: 499 },
      { id: "coat-serum", label: "Take-home coat serum kit", price: 249 },
    ],
    testimonials: [
      {
        name: "Aditi & Bailey",
        quote:
          "From pick-up to drop-off, the team radiated warmth. Bailey's coat has never felt softer.",
        date: "January 2025",
      },
      {
        name: "Shreya & Momo",
        quote:
          "They noticed a skin concern early and looped in a vet instantly. That vigilance is rare.",
        date: "October 2024",
      },
    ],
    defaultSlots: [
      { start: "10:00 AM", end: "11:30 AM", meta: "Signature spa ritual" },
      { start: "12:00 PM", end: "01:30 PM", meta: "Styling & trim" },
      { start: "03:00 PM", end: "04:30 PM", meta: "Creative styling" },
      { start: "05:00 PM", end: "06:30 PM", meta: "Express cleanup" },
    ],
  },
};

const DEFAULT_TYPE = {
  fallbackImage:
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80",
  responseTime: "Under 3 hours",
  heroBadges: ["Petopia Verified"],
  tags: ["Trusted specialist"],
  services: [],
  approach: [],
  achievements: [],
  addons: [],
  testimonials: [],
  gallery: [
    "https://images.unsplash.com/photo-1523626797181-8c5ae80d40c2?auto=format&fit=crop&w=1200&q=80",
  ],
  defaultSlots: [
    { start: "10:00 AM", end: "10:45 AM", meta: "Consultation" },
    { start: "01:00 PM", end: "01:45 PM", meta: "Consultation" },
    { start: "04:00 PM", end: "04:45 PM", meta: "Consultation" },
  ],
};

const METRIC_ICONS = ["stethoscope", "clock", "shield", "languages"];

export function buildProviderProfile(type, typeLabel, dataWrapper) {
  const defaults = TYPE_DEFAULTS[type] || DEFAULT_TYPE;
  const payload = dataWrapper.payload || {};
  const source = dataWrapper.source || "static";

  const name = payload.name || "Petopia Specialist";
  const title =
    payload.specialization ||
    payload.specialty ||
    payload.title ||
    typeLabel;

  const rating = Number(payload.rating) || 4.8;
  const ratingCount =
    payload.ratingCount ||
    payload.reviewsCount ||
    payload.totalReviews ||
    (Array.isArray(payload.reviews) ? payload.reviews.length : 0) ||
    120;

  const experience =
    payload.tenure ||
    payload.experience ||
    payload.yearsExperience ||
    payload.yearsOfExperience ||
    5;

  const basePrice =
    payload.price ||
    payload.fees ||
    payload.consultationFee ||
    payload.charge ||
    1399;

  const currencySymbol = payload.currency || "₹";

  const city = payload.city || payload.location?.city || "Your city";
  const state = payload.state || payload.location?.state || "";

  const languages = Array.isArray(payload.languages)
    ? payload.languages
    : defaults.languages || ["English"];

  const heroBadges = payload.heroBadges || defaults.heroBadges;
  const tags = payload.tags || defaults.tags;

  const services = ensureArray(
    payload.services?.length ? payload.services : defaults.services
  );

  const approach = ensureArray(
    payload.approach?.length ? payload.approach : defaults.approach
  );

  const achievements = ensureArray(
    payload.achievements?.length ? payload.achievements : defaults.achievements
  );

  const addons = ensureArray(
    payload.addons?.length ? payload.addons : defaults.addons
  );

  const testimonials = ensureArray(
    payload.testimonials?.length
      ? payload.testimonials
      : defaults.testimonials
  );

  const about =
    payload.about ||
    "This specialist is part of Petopia’s invite-only cohort delivering premium outcomes for modern pet parents.";

  const rawSlots = normalizeSlots(payload.timings, defaults.defaultSlots, basePrice);
  const schedule = buildSchedule(rawSlots);

  const metrics = [
    {
      title: "Experience",
      value: `${experience}+ yrs`,
      helper: title,
      icon: METRIC_ICONS[0],
    },
    {
      title: "Rating",
      value: `${rating.toFixed(1)} / 5`,
      helper: `${ratingCount}+ verified reviews`,
      icon: METRIC_ICONS[2],
    },
    {
      title: "Confirmation",
      value: payload.responseTime || defaults.responseTime,
      helper: "Average turnaround time",
      icon: METRIC_ICONS[1],
    },
    {
      title: "Languages",
      value: languages.join(" / "),
      helper: "Comfortable communication",
      icon: METRIC_ICONS[3],
    },
  ];

  const profileImage = resolveImage(type, source, payload.profilePic, defaults);
  const gallery = buildGallery(payload, defaults, profileImage);

  return {
    id: payload._id || payload.id || `${type}-${name}`.toLowerCase(),
    type,
    typeLabel,
    source,
    name,
    title,
    rating: rating.toFixed(1),
    ratingCount,
    experience,
    basePrice,
    currencySymbol,
    languages,
    tagLine: `${ratingCount}+ success stories`,
    heroBadges,
    tags,
    services,
    approach,
    achievements,
    addons,
    testimonials,
    about,
    metrics,
    profileImage,
    gallery,
    schedule,
    location: {
      city,
      state,
    },
  };
}

function ensureArray(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return [value];
}

function normalizeSlots(rawTimings, fallback, basePrice) {
  if (Array.isArray(rawTimings) && rawTimings.length > 0) {
    return rawTimings
      .map((entry, index) => {
        if (!entry) return null;
        if (Array.isArray(entry)) {
          return {
            id: `slot-${index}`,
            start: entry[0],
            end: entry[1],
            price: basePrice,
            meta: "Premium consultation",
          };
        }
        if (typeof entry === "object") {
          return {
            id: entry.id || `slot-${index}`,
            start: entry.start || entry.from || entry.begin,
            end: entry.end || entry.to || entry.finish,
            price: entry.price || basePrice,
            meta: entry.meta || entry.label || "Premium consultation",
          };
        }
        if (typeof entry === "string") {
          const [start, end] = entry.split("-");
          return {
            id: `slot-${index}`,
            start: start?.trim(),
            end: end?.trim(),
            price: basePrice,
            meta: "Premium consultation",
          };
        }
        return null;
      })
      .filter(Boolean);
  }

  return fallback.map((slot, index) => ({
    id: `slot-${index}`,
    start: slot.start,
    end: slot.end,
    price: basePrice,
    meta: slot.meta,
  }));
}

function buildSchedule(baseSlots, horizon = 12) {
  const today = new Date();
  return Array.from({ length: horizon }, (_, dayIndex) => {
    const date = new Date(today);
    date.setDate(today.getDate() + dayIndex);
    const label =
      dayIndex === 0
        ? "Today"
        : dayIndex === 1
          ? "Tom"
          : date.toLocaleDateString("en-US", { weekday: "short" });
    return {
      id: `day-${dayIndex}`,
      iso: date.toISOString(),
      label,
      dateShort: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      dateDisplay: date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }),
      slots: baseSlots.map((slot, slotIndex) => ({
        id: `${dayIndex}-${slotIndex}`,
        label: formatSlotLabel(slot.start, slot.end),
        start: slot.start,
        end: slot.end,
        price: slot.price,
        meta: slot.meta,
        isPrime: slotIndex < 2,
      })),
    };
  });
}

function formatSlotLabel(start, end) {
  if (!start) return "TBA";
  if (!end) return start;
  return `${start} - ${end}`;
}

function resolveImage(type, source, profilePic, defaults) {
  if (profilePic) {
    if (source === "api" && type === "vet") {
      return `/petopia/Vet/${profilePic}`;
    }
    return profilePic;
  }
  return defaults.fallbackImage || DEFAULT_TYPE.fallbackImage;
}

function buildGallery(payload, defaults, profileImage) {
  const gallerySources = [
    payload.gallery,
    payload.galleryImages,
    payload.images,
    payload.photos,
    defaults.gallery,
    DEFAULT_TYPE.gallery,
  ];

  const unique = [];

  gallerySources.forEach((src) => {
    if (Array.isArray(src)) {
      src.forEach((item) => {
        const url = typeof item === "string" ? item : item?.url;
        if (url && !unique.includes(url)) {
          unique.push(url);
        }
      });
    }
  });

  if (profileImage && !unique.includes(profileImage)) {
    unique.unshift(profileImage);
  }

  return unique.slice(0, 3);
}
