import React, { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Tag,
  PawPrint,
  CheckCircle2,
  XCircle,
  Hourglass,
  BadgeCheck,
} from "lucide-react";

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
    _id: "a4",
    serviceName: "Daycare Slot",
    type: "daycare",
    date: "2025-11-02T00:00:00.000Z",
    time: "09:00",
    status: "cancelled",
    serviceCost: 700,
    description: "Half-day supervised play.",
    pet: { name: "Coco" },
    provider: {
      name: "Happy Tails Daycare",
      avatar: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?q=80&w=400",
      location: "HSR Layout",
      phone: "+91 98888 33333",
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

/* ========== Page ========== */
export default function AppointmentsTablePage() {
  const data = DUMMY; // inline dummy

  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expanded, setExpanded] = useState({});

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
  const onReschedule = (id) => alert(`Reschedule appointment ${id}`);

  /* Shared grid template to align header and rows perfectly */
  const gridCols =
    "grid grid-cols-[1.6fr_1.2fr_1fr_1fr_0.9fr_1.2fr_0.9fr_0.6fr] md:grid-cols-[1.8fr_1.2fr_1fr_1fr_0.9fr_1.2fr_0.9fr_0.6fr]";

  return (
    <div className="flex-1 px-4 lg:mx-8">
      {/* Header */}
      <div className="my-6">
        <h1 className="text-3xl font-quicksandBold text-ink-heading">Appointments</h1>
      </div>

      {/* Filters (themed, with custom chevrons) */}
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-4 gap-3 font-semibold">
        {/* Search */}
        <div className="col-span-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by provider, service, pet…"
            aria-label="Search appointments"
            className="w-full rounded-full border border-stone-300 bg-app-elevated/90 px-4 py-2.5 text-sm text-ink-primary placeholder-stone-400 outline-none shadow-sm transition focus:border-brand focus:ring-2 focus:ring-focus-ring"
          />
        </div>

        {/* Type filter */}
        <div className="relative">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            aria-label="Filter by type"
            className="theme-select appearance-none w-full rounded-full border border-stone-300 bg-app-elevated/90 px-4 pr-10 py-2.5 text-sm text-ink-primary outline-none shadow-sm transition focus:border-brand focus:ring-2 focus:ring-focus-ring"
          >
            <option value="all">All types</option>
            <option value="vet">Vet</option>
            <option value="groomer">Groomer</option>
            <option value="trainer">Trainer</option>
            <option value="daycare">Daycare</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand" />
        </div>

        {/* Status filter */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by status"
            className="theme-select appearance-none w-full rounded-full border border-stone-300 bg-app-elevated/90 px-4 pr-10 py-2.5 text-sm text-ink-primary outline-none shadow-sm transition focus:border-brand focus:ring-2 focus:ring-focus-ring"
          >
            <option value="all">All status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand" />
        </div>

        {/* Improve option rendering in some browsers */}
        <style>{`
          .theme-select option {
            color: var(--ink-primary, #0c2b37);
            background: var(--app-elevated, #ffffff);
          }
        `}</style>
      </div>

      {/* Header row (only border here) */}
      <div
        className={`${gridCols} items-center text-xs md:text-sm font-semibold text-ink-primary px-3 md:px-4 py-2 border-b border-ink-primary/20`}
      >
        <div>Provider</div>
        <div>Service</div>
        <div>Pet</div>
        <div>Date</div>
        <div>Time</div>
        <div>Status</div>
        <div>Cost</div>
        <div className="text-right">More</div>
      </div>

      {/* Rows list — spaced, rounded-3xl, shadowed, hover-elevate */}
      <div className="mt-3 space-y-3">
        {filtered.map((a) => {
          const open = !!expanded[a._id];
          return (
            <div key={a._id} className="space-y-2">
              {/* primary row */}
              <div
                className={`${gridCols} items-center rounded-3xl bg-app-elevated px-3 md:px-4 py-6 shadow-sm hover:shadow-md transition-shadow`}
              >
                {/* Provider */}
                <div className="min-w-0">
                  <div className="font-medium text-ink-primary truncate">{a.provider.name}</div>
                  <div className="text-xs text-ink-secondary/80 truncate">{a.description}</div>
                </div>

                {/* Service */}
                <div className="text-ink-secondary truncate">{a.serviceName}</div>

                {/* Pet */}
                <div className="inline-flex items-center gap-1.5 text-ink-secondary">
                  <PawPrint className="h-4 w-4 text-brand" />
                  <span className="truncate">{a.pet.name}</span>
                </div>

                {/* Date */}
                <div className="inline-flex items-center gap-1.5 text-ink-secondary">
                  <Calendar className="h-4 w-4" />
                  {formatDate(a.date)}
                </div>

                {/* Time */}
                <div className="inline-flex items-center gap-1.5 text-ink-secondary">
                  <Clock className="h-4 w-4" />
                  {formatTime(a.date, a.time)}
                </div>

                {/* Status (icon + color) */}
                <div>
                  <StatusBadge status={a.status} />
                </div>

                {/* Cost */}
                <div className="text-ink-secondary">{currency(a.serviceCost)}</div>

                {/* More */}
                <div className="text-right">
                  <button
                    onClick={() => toggle(a._id)}
                    className="inline-flex items-center justify-center rounded-full bg-app-surface p-2 text-brand hover:ring-brand focus:outline-none focus:ring-2 focus:ring-focus-ring"
                    aria-expanded={open}
                    aria-label="Toggle details"
                  >
                    {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>
              </div>

              {/* details panel */}
              {open && (
                <div className="rounded-3xl border border-ink-secondary/20 px-3 md:px-4 py-4 shadow-sm">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Schedule */}
                    <div className="rounded-xl border border-stone-200 bg-white p-3">
                      <div className="text-xs uppercase tracking-wide text-ink-secondary mb-2">
                        Schedule
                      </div>
                      <div className="flex justify-between items-center gap-3 text-sm text-ink-primary">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" /> {formatDate(a.date)}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-4 w-4" /> {formatTime(a.date, a.time)}
                        </span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="rounded-xl  border border-stone-200 bg-white p-3">
                      <div className="text-xs uppercase tracking-wide text-ink-secondary mb-2">
                        Details
                      </div>
                      <div className="flex justify-between items-center gap-3 text-sm text-ink-primary">
                        <div className="inline-flex items-center gap-2">
                          <PawPrint className="h-4 w-4 text-brand" /> Pet: {a.pet.name}
                        </div>
                        <div className="inline-flex items-center gap-2">
                          <Tag className="h-4 w-4 text-brand" /> Cost: {currency(a.serviceCost)}
                        </div>
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="rounded-xl border border-stone-200 bg-white p-3">
                      <div className="text-xs uppercase tracking-wide text-ink-secondary mb-2">
                        Contact
                      </div>
                      <div className="flex justify-between items-center gap-3 text-sm text-ink-primary">
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
                  </div>

                  {/* Actions */}
                  {a.status !== "cancelled" && (
                    <div className="mt-4 flex justify-end gap-3">
                      
                      <button
                        onClick={() => onReschedule(a._id)}
                        className="inline-flex items-center justify-center rounded-full bg-ink-primary px-4 py-2 text-white hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-focus-ring"
                      >
                        Reschedule
                      </button>
                      <button
                        onClick={() => onCancel(a._id)}
                        className="inline-flex items-center justify-center rounded-full bg-red-600 px-4 py-2 text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-focus-ring"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="py-16 text-center text-ink-secondary">
            No appointments match your filters.
          </div>
        )}
      </div>
    </div>
  );
}
