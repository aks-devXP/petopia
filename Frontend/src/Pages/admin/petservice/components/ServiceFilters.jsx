import { useMemo, useState, useCallback } from "react";
import {
  Stethoscope,
  Scissors,
  Dumbbell,
  ChevronDown,
  Search,
} from "lucide-react";

const LABEL = { vet: "Vets", trainer: "Trainers", groomer: "Groomers" };
const TYPE_META = [
  { key: "vet", label: "Veterinary", Icon: Stethoscope },
  { key: "groomer", label: "Groomer", Icon: Scissors },
  { key: "trainer", label: "Trainer", Icon: Dumbbell },
];

const SERVICE_OPTIONS = {
  vet: ["Consultation", "Vaccination", "Surgery", "Dental", "Emergency"],
  groomer: ["Grooming", "Washing", "Trimming", "Deshedding", "Nail Care"],
  trainer: ["Obedience", "Puppy", "Behavior", "Agility", "Home Visits"],
};

export default function ServiceFilters({
  type,                // "vet" | "trainer" | "groomer"
  q = "",
  date = "",           // <- NEW (YYYY-MM-DD)
  time = "",           // <- NEW (HH:MM)
  city = "",
  pin = "",
  maxKm = "",
  selectedServices = [],
  onChange,            // (patch) => void
  onTypeSwitch,        // (nextType) => void
}) {
  const [openServices, setOpenServices] = useState(false);

  const options = useMemo(() => SERVICE_OPTIONS[type] || [], [type]);
  const allSelected =
    selectedServices.length === 0 || selectedServices.length === options.length;

  const toggleService = useCallback(
    (name) => {
      const next = new Set(selectedServices);
      next.has(name) ? next.delete(name) : next.add(name);
      const arr = Array.from(next);
      onChange?.({ services: arr.length === options.length ? [] : arr });
    },
    [selectedServices, options.length, onChange]
  );

  const selectAll  = useCallback(() => onChange?.({ services: [] }), [onChange]);           // [] means “all”
  const selectNone = useCallback(() => onChange?.({ services: ["__none__"] }), [onChange]); // optional marker

  return (
    <div
      className="
        bg-white rounded-3xl p-4 px-6 shadow-sm
        grid grid-cols-1 sm:grid-cols-3 md:block gap-3
      "
    >
      <div className="md:my-3 md:mb-6">
        <div className="flex md:flex-col gap-2">
          {TYPE_META.map(({ key, label, Icon }) => {
            const active = key === type;
            return (
              <button
                key={key}
                onClick={() => onTypeSwitch?.(key)}
                className={`
                  group flex items-center gap-3 sm:pl-3 font-bold rounded-full p-2 ring-1 transition
                  ${active
                    ? "bg-ink-primary text-app-bg ring-ink-primary"
                    : "bg-app-elevated ring-brand/30"}
                `}
                title={label}
              >
                <Icon className={`h-5 w-5 ${active ? "text-app-bg" : "text-ink-primary"}`} />
                {/* hide label on very small widths when filters are on top */}
                <span className={`hidden sm:block ${active ? "text-app-bg" : "text-ink-primary"}`}>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

            <div className="md:mb-4">
        <button
          onClick={() => setOpenServices((s) => !s)}
          className="w-full flex items-center justify-between rounded-full ring-1 ring-brand/30 bg-app-elevated px-3 py-2 text-sm"
        >
          <span>Services</span>
          <ChevronDown className={`h-4 w-4 transition ${openServices ? "rotate-180" : ""}`} />
        </button>

        {openServices && (
          <div className="mt-2 rounded-xl ring-1 ring-brand/30 bg-white p-3">
            <div className="mb-2 flex justify-between gap-2 text-xs">
              <button
                onClick={selectAll}
                className="font-bold hover:text-black text-black/70"
                title="Select all"
              >
                Select all
              </button>
              <button
                onClick={selectNone}
                className="text-red-400 font-semibold hover:text-red-600"
                title="Select none"
              >
                Clear
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {options.map((opt) => {
                const checked =
                  selectedServices.length === 0
                    ? true // empty means "all"
                    : selectedServices.includes(opt);
                return (
                  <label
                    key={opt}
                    className={`
                      flex items-center gap-2 rounded-full px-2 py-2 text-sm cursor-pointer
                      ${checked ? "bg-app-bg border border-black/10" : "hover:bg-app-bg/60"}
                    `}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleService(opt)}
                      className="accent-brand"
                    />
                    <span className="text-ink-primary">{opt}</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="md:mb-4 grid grid-cols-1 gap-2">
        <label className="block">
          <span className="text-xs text-ink-secondary">Keyword</span>
          <div className="mt-1 flex items-center gap-2 rounded-full ring-1 ring-brand/30 bg-app-elevated px-3">
            <Search className="h-4 w-4 text-ink-secondary" />
            <input
              value={q}
              onChange={(e) => onChange?.({ q: e.target.value })}
              placeholder={`Search ${LABEL[type]}…`}
              className="w-full bg-transparent py-2 text-sm outline-none"
            />
          </div>
        </label>
        <label className="block">
            <span className="text-xs text-ink-secondary">City</span>
            <input
              value={city}
              onChange={(e) => onChange?.({ city: e.target.value })}
              placeholder="e.g. Delhi"
              className="mt-1 w-full rounded-full ring-1 ring-brand/30 bg-app-elevated px-3 py-2 text-sm outline-none"
            />
          </label>
      </div>

            <div className="md:mb-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
        <label className="block">
          <span className="text-xs text-ink-secondary">Date</span>
          <input
            type="date"
            value={date}
            onChange={(e) => onChange?.({ date: e.target.value })}
            className="mt-1 w-full rounded-full ring-1 ring-brand/30 bg-app-elevated px-4 py-2 text-sm outline-none"
          />
        </label>
        <label className="block">
          <span className="text-xs text-ink-secondary">Time</span>
          <input
            type="time"
            value={time}
            onChange={(e) => onChange?.({ time: e.target.value })}
            className="mt-1 w-full rounded-full ring-1 ring-brand/30 bg-app-elevated px-4 py-2 text-sm outline-none"
          />
        </label>
      </div>


      {/* Apply button (optional – you already update onChange live; this is a UX nicety) */}
      <button
        onClick={() => onChange?.({})}
        className="mt-1 w-full rounded-full bg-brand text-app-bg px-4 py-2 text-sm font-medium hover:opacity-95 focus:outline-none focus:ring-2 ring-focus-ring/60"
      >
        Apply Filters
      </button>
    </div>
  );
}
