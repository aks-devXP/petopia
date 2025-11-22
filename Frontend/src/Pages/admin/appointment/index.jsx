import { getAppointmentsByUser } from "@/API/AppointmentAPI";
import Loader from "@/Components/Loader/Loader";
import { handleError } from "@/Util/Alerts";
import { useQuery } from "@tanstack/react-query";
import {
  BadgeCheck,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  Hourglass,
  MapPin,
  PawPrint,
  Phone,
  Star,
  Tag,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ScheduleSidebar from "../booking/components/ScheduleSidebar";
import { buildProviderProfile } from "../booking/utils/profileBuilder";

/* ========== DUMMY DATA (inline) ========== */
const DUMMY = [
  {
    _id: "a1",
    serviceName: "General Check-up",
    type: "vet",
    date: "2025-10-24T00:00:00.000Z",
    time: "10:30",
    status: "confirmed",
    serviceCost: 800,
    description: "Annual wellness exam and vaccination review.",
    pet: { name: "Milo" },
    provider: {
      name: "Dr. Kavya Sharma",
      avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=400",
      location: "Paws & Care Clinic, HSR Layout",
      phone: "+91 98765 43210",
    },
  },
  {
    _id: "a2",
    serviceName: "Full Grooming",
    type: "groomer",
    date: "2025-10-26T00:00:00.000Z",
    time: "14:00",
    status: "pending",
    serviceCost: 1200,
    description: "Bath, nail trim, ear cleaning, and coat styling.",
    pet: { name: "Zara" },
    provider: {
      name: "Furry Styles",
      avatar: "https://images.unsplash.com/photo-1601582585289-b6154fe3625b?q=80&w=400",
      location: "Sector 21, City",
      phone: "+91 90000 11111",
    },
  },
  {
    _id: "a3",
    serviceName: "Obedience Session",
    type: "trainer",
    date: "2025-10-28T00:00:00.000Z",
    time: "18:00",
    status: "completed",
    serviceCost: 900,
    description: "Intro to leash walking and recall.",
    pet: { name: "Rocky" },
    provider: {
      name: "Training with Arjun",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400",
      location: "Home Visit",
      phone: "+91 95555 22222",
    },
  },
  {
    _id: "a5",
    serviceName: "Vaccine Booster",
    type: "vet",
    date: "2025-11-05T00:00:00.000Z",
    time: "11:15",
    status: "pending",
    serviceCost: 600,
    description: "DHPP booster dose.",
    pet: { name: "Luna" },
    provider: {
      name: "City Vet Clinic",
      avatar: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=400",
      location: "Indiranagar",
      phone: "+91 97777 44444",
    },
  },
  {
    _id: "a4",
    serviceName: "Behavior Refresher",
    type: "trainer",
    date: "2025-11-08T00:00:00.000Z",
    time: "16:00",
    status: "cancelled",
    serviceCost: 750,
    description: "Follow-up commands and recall practice.",
    pet: { name: "Bruno" },
    provider: {
      name: "Urban Paw Trainers",
      avatar: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=400",
      location: "Koramangala",
      phone: "+91 96666 55555",
    },
  },
  {
    _id: "a6",
    serviceName: "Spa Touch-up",
    type: "groomer",
    date: "2025-11-10T00:00:00.000Z",
    time: "13:30",
    status: "cancelled",
    serviceCost: 650,
    description: "Quick trim and coat conditioning session.",
    pet: { name: "Misty" },
    provider: {
      name: "Silky Coats Studio",
      avatar: "https://images.unsplash.com/photo-1583512603805-3cc6b41f7c81?q=80&w=400",
      location: "Bellandur",
      phone: "+91 94444 66666",
    },
  },
];

/* ========== utils (plain JS) ========== */
function combineLocalDateTime(isoDate, hhmm) {
  const d = new Date(isoDate);
  const [hh, mm] = (hhmm || "00:00").split(":").map(Number);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), hh || 0, mm || 0, 0, 0);
}
function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "2-digit",
  });
}
function formatTime(iso, hhmm) {
  return combineLocalDateTime(iso, hhmm).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}
function currency(n) {
  return Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

const SERVICE_ROUTE_MAP = {
  vet: "/pet-services/vet",
  groomer: "/pet-services/groomer",
  trainer: "/pet-services/trainer",
};

const TYPE_META = {
  vet: {
    label: "Vet visit",
    chip: "bg-emerald-50 text-emerald-700",
    dot: "bg-emerald-500",
  },
  groomer: {
    label: "Grooming",
    chip: "bg-sky-50 text-sky-700",
    dot: "bg-sky-500",
  },
  trainer: {
    label: "Training",
    chip: "bg-amber-50 text-amber-700",
    dot: "bg-amber-500",
  },
};

const TYPE_LABELS = {
  vet: "Veterinary Specialist",
  trainer: "Certified Trainer",
  groomer: "Pet Grooming Studio",
};

/* ========== Status Badge ========== */
function StatusBadge({ status }) {
  const s = (status || "").toLowerCase();
  const map = {
    pending: {
      icon: Hourglass,
      cls: "bg-amber-100 text-amber-900",
      label: "Pending",
    },
    confirmed: {
      icon: CheckCircle2,
      cls: "bg-emerald-100 text-emerald-900",
      label: "Confirmed",
    },
    completed: {
      icon: BadgeCheck,
      cls: "bg-sky-100 text-sky-900",
      label: "Completed",
    },
    cancelled: {
      icon: XCircle,
      cls: "bg-rose-100 text-rose-900",
      label: "Cancelled",
    },
  };
  const conf = map[s] || {
    icon: Hourglass,
    cls: "bg-stone-100 text-stone-800",
    label: s ? s[0].toUpperCase() + s.slice(1) : "—",
  };
  const Icon = conf.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs ${conf.cls}`}>
      <Icon className="h-3.5 w-3.5" />
      {conf.label}
    </span>
  );
}

function ActionModal({ modal, onClose }) {
  if (!modal.open || !modal.appointment) return null;
  const { appointment, type } = modal;
  const isReview = type === "review";
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(null);
  
  useEffect(() => {
    if (!modal.open) {
      setRating(5);
      setHoverRating(null);
    } else if (!isReview) {
      setHoverRating(null);
    }
  }, [modal.open, isReview]);
  const rescheduleProfile = useMemo(() => {
    if (!appointment || isReview) return null;
    const typeLabel = TYPE_LABELS[appointment.type] || "Specialist";
    const location = appointment.provider.location || "";
    const [cityPart, ...rest] = location.split(",");
    return buildProviderProfile(appointment.type, typeLabel, {
      payload: {
        id: appointment.provider.id || appointment._id,
        name: appointment.provider.name,
        price: appointment.serviceCost,
        city: cityPart?.trim() || location || "Your city",
        state: rest.join(",").trim(),
      },
      source: "static",
    });
  }, [appointment, isReview]);
  const title = isReview
    ? `Leave a review for ${appointment.provider.name}`
    : `Reschedule ${appointment.serviceName}`;
  const description = isReview
    ? "Share your experience so other pet parents know what to expect."
    : "Pick a convenient slot and we'll notify the provider.";

  const handleSubmit = (event) => {
    event.preventDefault();
    const actionLabel = isReview
      ? `Review with rating ${rating} submitted`
      : "Reschedule request submitted";
    alert(`${actionLabel} for ${appointment._id}`);
    onClose();
  };
  const handleRescheduleConfirm = ({ day, slot }) => {
    const detail = day && slot ? `${day.dateDisplay} · ${slot.label}` : "new slot";
    alert(`Reschedule request submitted for ${appointment._id} (${detail}).`);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-ink-heading">{title}</h2>
            <p className="text-sm text-ink-secondary/80">{description}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-stone-100 px-3 py-1 text-ink-secondary hover:bg-stone-200 focus:outline-none focus:ring-2 focus:ring-focus-ring"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        {isReview ? (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-ink-primary">
              Your review
              <textarea
                required
                className="mt-1 w-full rounded-2xl border border-stone-200 px-3 py-2 text-sm text-white shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-focus-ring"
                rows={4}
                placeholder="Tell us what went well or what could be better..."
              />
            </label>
            <div className="text-sm font-medium text-ink-primary">
              Rating
              <div className="mt-2 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, idx) => {
                  const value = idx + 1;
                  const active = hoverRating ? value <= hoverRating : value <= rating;
                  return (
                    <button
                      key={value}
                      type="button"
                      className="transition-transform hover:-translate-y-0.5"
                      onMouseEnter={() => setHoverRating(value)}
                      onMouseLeave={() => setHoverRating(null)}
                      onClick={() => setRating(value)}
                      aria-label={`Rate ${value} star${value > 1 ? "s" : ""}`}
                    >
                      <Star
                        className={`h-7 w-7 ${active ? "text-amber-400" : "text-stone-300"}`}
                        fill={active ? "currentColor" : "none"}
                        strokeWidth={1.5}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-stone-200 px-5 py-2 text-sm font-semibold text-ink-secondary hover:bg-stone-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-full bg-ink-primary px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-focus-ring"
              >
                Submit
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            {rescheduleProfile ? (
              <ScheduleSidebar
                profile={rescheduleProfile}
                onConfirm={handleRescheduleConfirm}
                variant="modal"
                ctaLabel="Confirm reschedule"
                helperText="We'll notify the specialist to approve your new slot."
              />
            ) : (
              <p className="text-sm text-ink-secondary">
                Availability details are loading. Please try again in a moment.
              </p>
            )}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-stone-200 px-5 py-2 text-sm font-semibold text-ink-secondary hover:bg-stone-100"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ========== Page ========== */
export default function AppointmentsTablePage() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expanded, setExpanded] = useState({});
  const [modal, setModal] = useState({ open: false, type: null, appointment: null });
  const appointmentsData = useQuery({
    queryKey:["Get-Appointments"],
    queryFn: async()=>getAppointmentsByUser(),
    staleTime:10*60*1000,
    
  });


  
  const rawApiAppointments = appointmentsData.data || []; // backend: { success, data: [...] }

  // Map API → UI shape; fallback to DUMMY if nothing yet
  const data = useMemo(() => {
    if (!rawApiAppointments.length) {
      return DUMMY; // fallback when no appointments yet or still loading
    }

    return rawApiAppointments.map((a) => {
      const provider = a.provider || {};
      const pet = a.pet || {};

      const locationString = [provider.city, provider.state]
        .filter(Boolean)
        .join(", ");

      // simple avatar fallback per type
      let avatarFallback = "";
      if (a.type === "vet") avatarFallback = DUMMY[0].provider.avatar;
      else if (a.type === "groomer") avatarFallback = DUMMY[1].provider.avatar;
      else if (a.type === "trainer") avatarFallback = DUMMY[2].provider.avatar;
      else avatarFallback = DUMMY[0].provider.avatar;

      return {
        _id: a.id || a._id,
        serviceName: a.serviceName || "Pet service",
        type: a.type,
        date: a.date,
        time: a.time,
        status: a.status,
        serviceCost: a.serviceCost,
        description: a.description || "",
        pet: {
          name: pet.name || "Your pet",
        },
        provider: {
          name: provider.name || "Your provider",
          avatar: provider.avatar || avatarFallback,
          location: locationString || "Your city",
          phone: provider.phone || "",
        },
      };
    });
  }, [rawApiAppointments]);

  const stats = useMemo(() => {
    const summary = data.reduce(
      (acc, curr) => {
        if (curr.status === "completed") acc.completed += 1;
        else if (curr.status === "cancelled") acc.cancelled += 1;
        else acc.upcoming += 1;
        return acc;
      },
      { upcoming: 0, completed: 0, cancelled: 0 }
    );

    return [
      {
        label: "Upcoming",
        value: summary.upcoming,
        subLabel: "Pending + confirmed",
        icon: Calendar,
        gradient: "from-emerald-50 via-emerald-100 to-lime-50",
      },
      {
        label: "Completed",
        value: summary.completed,
        subLabel: "Leave feedback",
        icon: BadgeCheck,
        gradient: "from-sky-50 via-blue-100 to-indigo-50",
      },
      {
        label: "Cancelled",
        value: summary.cancelled,
        subLabel: "Book again",
        icon: XCircle,
        gradient: "from-rose-50 via-rose-100 to-amber-50",
      },
    ];
  }, [data]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data
      .filter((a) => {
        const byType = typeFilter === "all" ? true : a.type === typeFilter;
        const byStatus = statusFilter === "all" ? true : a.status === statusFilter;
        const byQuery =
          q.length === 0 ||
          a.serviceName.toLowerCase().includes(q) ||
          a.provider.name.toLowerCase().includes(q) ||
          a.pet.name.toLowerCase().includes(q);
        return byType && byStatus && byQuery;
      })
      .sort(
        (a, b) =>
          combineLocalDateTime(a.date, a.time).getTime() -
          combineLocalDateTime(b.date, b.time).getTime()
      );
  }, [data, query, typeFilter, statusFilter]);

  const toggle = (id) => setExpanded((s) => ({ ...s, [id]: !s[id] }));
  const onCancel = (id) => alert(`Cancel appointment ${id}`);
  const openModal = (type, appointment) =>
    setModal({ open: true, type, appointment });
  const closeModal = () => setModal({ open: false, type: null, appointment: null });
  const onBookAgain = (appointment) => {
    const target = SERVICE_ROUTE_MAP[appointment.type] || "/pet-services";
    navigate(target);
  };
  const openLocation = (location) => {
    if (!location || typeof window === "undefined") return;
    const encoded = encodeURIComponent(location);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encoded}`, "_blank", "noopener,noreferrer");
  };
  const renderActions = (appointment) => {
    if (appointment.status === "completed") {
      return (
        <button
          onClick={(e) => {
            e.stopPropagation();
            openModal("review", appointment);
          }}
          className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-focus-ring"
        >
          Leave a review
        </button>
      );
    }

    if (appointment.status === "cancelled") {
      return (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBookAgain(appointment);
          }}
          className="inline-flex items-center justify-center rounded-full bg-ink-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-focus-ring"
        >
          Book again
        </button>
      );
    }

    if (appointment.status === "confirmed") {
      return (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              openLocation(appointment.provider.location);
            }}
            className="inline-flex items-center justify-center rounded-full bg-ink-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-focus-ring"
          >
            Go to location
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCancel(appointment._id);
            }}
            className="inline-flex items-center justify-center rounded-full border border-rose-200 bg-rose-50 px-5 py-2.5 text-sm font-semibold text-rose-700 shadow-sm transition hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-focus-ring"
          >
            Cancel
          </button>
        </>
      );
    }

    return (
      <>
        <button
          onClick={(e) => {
            e.stopPropagation();
            openModal("reschedule", appointment);
          }}
          className="inline-flex items-center justify-center rounded-full bg-ink-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-focus-ring"
        >
          Reschedule
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onCancel(appointment._id);
          }}
          className="inline-flex items-center justify-center rounded-full border border-rose-200 bg-rose-50 px-5 py-2.5 text-sm font-semibold text-rose-700 shadow-sm transition hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-focus-ring"
        >
          Cancel
        </button>
      </>
    );
  };
  if (appointmentsData.isLoading) {
  
    return <Loader/>;
}

  if(appointmentsData.isError){
    handleError(appointmentsData.error?.message || "Failed to load appointments. Please try again.");
  }
  return (
    <div className="flex-1 px-4 pb-12 lg:mx-8">
      <div className="my-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-quicksandBold text-ink-heading">Appointments</h1>
          <p className="text-sm text-ink-secondary/80">
            Track every pet interaction, revisit favourites, and keep upcoming visits on schedule.
          </p>
        </div>
        <div className="text-sm text-ink-secondary/80">
          Showing {filtered.length} of {data.length} appointments
        </div>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const StatIcon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`rounded-2xl border border-white/80 bg-gradient-to-br ${stat.gradient} p-4 shadow-sm`}
            >
              <div className="flex items-center justify-items-start gap-2">
                <p className="text-sm font-semibold text-ink-secondary/80">{stat.label}</p>
                <span className="rounded-full bg-transparent p-2 text-brand shadow-sm">
                  <StatIcon className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-3 text-3xl font-semibold text-ink-heading">{stat.value}</p>
              <p className="text-xs uppercase tracking-[0.25em] text-ink-secondary/60">{stat.subLabel}</p>
            </div>
          );
        })}
      </div>

      <div className="mb-6 grid grid-cols-1 gap-3 font-semibold sm:grid-cols-4">
        <div className="sm:col-span-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by provider, service, pet…"
            aria-label="Search appointments"
            className="w-full rounded-2xl border border-stone-200 bg-white/90 px-4 py-3 text-sm text-ink-primary placeholder-stone-400 outline-none shadow-sm transition focus:border-brand focus:ring-2 focus:ring-focus-ring"
          />
        </div>
        <div className="relative">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            aria-label="Filter by type"
            className="theme-select w-full appearance-none rounded-2xl border border-stone-200 bg-white/90 px-4 py-3 pr-10 text-sm text-ink-primary shadow-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-focus-ring"
          >
            <option value="all">All types</option>
            <option value="vet">Vet</option>
            <option value="groomer">Groomer</option>
            <option value="trainer">Trainer</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand" />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by status"
            className="theme-select w-full appearance-none rounded-2xl border border-stone-200 bg-white/90 px-4 py-3 pr-10 text-sm text-ink-primary shadow-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-focus-ring"
          >
            <option value="all">All status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand" />
        </div>
        <style>{`
          .theme-select option {
            color: var(--ink-primary, #0c2b37);
            background: var(--app-elevated, #ffffff);
          }
        `}</style>
      </div>

      <div className="space-y-4">
        {filtered.map((a) => {
          const open = !!expanded[a._id];
          const typeMeta = TYPE_META[a.type] || {
            label: "Service",
            chip: "bg-stone-50 text-ink-secondary",
            dot: "bg-stone-400",
          };
          return (
            <div
              key={a._id}
              role="button"
              tabIndex={0}
              onClick={() => toggle(a._id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  toggle(a._id);
                }
              }}
              aria-expanded={open}
              className={`rounded-3xl border bg-white/90 px-4 py-4 shadow-sm transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring md:px-6 ${
                open ? "border-brand/40 shadow-lg" : "border-transparent"
              }`}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="flex min-w-0 flex-1 items-center gap-4">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-stone-100">
                    <img
                      src={a.provider.avatar}
                      alt={a.provider.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <span
                      className={`absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-semibold shadow ${typeMeta.chip}`}
                    >
                      <span className={`mr-1 inline-block h-2 w-2 rounded-full ${typeMeta.dot}`} />
                      {typeMeta.label}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-base font-semibold text-ink-primary">{a.provider.name}</p>
                    <p className="text-sm text-ink-secondary/80">
                      {a.serviceName} · Pet {a.pet.name}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-secondary">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" /> {formatDate(a.date)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4" /> {formatTime(a.date, a.time)}
                  </span>
                  {a.provider.location && (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" /> {a.provider.location}
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2 text-right">
                  <StatusBadge status={a.status} />
                  <div className="text-lg font-semibold text-ink-primary">{currency(a.serviceCost)}</div>
                  <span
                    className={`inline-flex rounded-full bg-app-surface p-2 text-brand transition ${
                      open ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </div>
              </div>

              <div
                className={`mt-4 py-1 overflow-hidden border-t border-ink-secondary/10 transition-all duration-500 ease-out ${
                  open ? "max-h-[900px] opacity-100" : "max-h-0 opacity-0"
                }`}
                aria-hidden={!open}
              >
                <div className="pt-4">
                  <div className="flex flex-col gap-4 md:flex-row">
                    <div className="relative overflow-hidden rounded-2xl border border-white/90 bg-stone-100 shadow-inner md:max-w-xs">
                      <img
                        src={a.provider.avatar}
                        alt={`${a.provider.name} primary`}
                        className="h-64 w-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-4 text-white">
                        <p className="text-lg font-semibold">{a.provider.name}</p>
                        <p className="text-sm text-white/80">{a.serviceName}</p>
                      </div>
                    </div>
                    <div className="flex-1 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
                        <p className="mb-2 text-xs uppercase tracking-wide text-ink-secondary">Schedule</p>
                        <div className="space-y-2 text-sm flex flex-col justify-evenly text-ink-primary">
                          <div className="inline-flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-brand" /> {formatDate(a.date)}
                          </div>
                          <div className="inline-flex items-center gap-2">
                            <Clock className="h-4 w-4 text-brand" /> {formatTime(a.date, a.time)}
                          </div>
                        </div>
                      </div>
                      <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
                        <p className="mb-2 text-xs uppercase tracking-wide text-ink-secondary">Details</p>
                        <div className="space-y-2 text-sm flex flex-col justify-evenly text-ink-primary">
                          <div className="inline-flex items-center gap-2">
                            <PawPrint className="h-4 w-4 text-brand" /> Pet {a.pet.name}
                          </div>
                          <div className="inline-flex items-center gap-2">
                            <Tag className="h-4 w-4 text-brand" /> {currency(a.serviceCost)}
                          </div>
                        </div>
                      </div>
                      <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
                        <p className="mb-2 text-xs uppercase tracking-wide text-ink-secondary">Contact</p>
                        <div className="space-y-2 text-sm flex flex-col justify-evenly text-ink-primary">
                          {a.provider.location && (
                            <div className="inline-flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-brand" /> {a.provider.location}
                            </div>
                          )}
                          {a.provider.phone && (
                            <div className="inline-flex items-center gap-2">
                              <Phone className="h-4 w-4 text-brand" /> {a.provider.phone}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
                        <p className="mb-2 text-xs uppercase tracking-wide text-ink-secondary">Notes</p>
                        <p className="text-sm text-ink-primary/90">{a.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">{renderActions(a)}</div>
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="py-16 text-center text-ink-secondary">
            No appointments match your filters.
          </div>
        )}
      </div>
      <ActionModal modal={modal} onClose={closeModal} />
    </div>
  );
}
