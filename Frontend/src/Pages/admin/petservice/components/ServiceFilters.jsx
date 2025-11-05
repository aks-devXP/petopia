// src/Pages/petservice/components/ServiceFilters.jsx
import { useMemo, useState, useCallback } from "react";
import { Stethoscope, Scissors, Dumbbell, ChevronDown, Search } from "lucide-react";

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
  type,
  q = "",
  city = "",
  date = "",
  time = "",
  selectedServices = [],
  onChange,
  onTypeSwitch,
}) {
  const [openServices, setOpenServices] = useState(false);
  const options = useMemo(() => SERVICE_OPTIONS[type] || [], [type]);
  const allSelected =
    selectedServices.length === 0 || selectedServices.length === options.length;

  const toggleService = useCallback(
    (name) => {
      const next = new Set(selectedServices);
      next.has(name) ? next.delete(name) : next.add(name);
      onChange?.({ services: Array.from(next) });
    },
    [selectedServices, onChange]
  );

  const selectAll = useCallback(() => onChange?.({ services: [] }), [onChange]);
  const selectNone = useCallback(
    () => onChange?.({ services: ["__none__"] }),
    [onChange]
  );

  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm flex flex-col gap-6">
      {/* Type buttons */}
      <div className="flex lg:flex-col gap-2">
        {TYPE_META.map(({ key, label, Icon }) => {
          const active = key === type;
          return (
            <button
              key={key}
              onClick={() => onTypeSwitch?.(key)}
              type="button"
              aria-pressed={active}
              title={label}
              className={`
                group flex w-full items-center gap-3 sm:pl-3 font-bold rounded-full p-2 ring-1 transition
                ${active ? "bg-ink-primary text-app-bg ring-ink-primary" : "bg-app-elevated ring-brand/30"}
              `}
            >
              <Icon className={`h-5 w-5 ${active ? "text-app-bg" : "text-ink-primary"}`} />
              <span className={`${active ? "text-app-bg" : "text-ink-primary"}`}>{label}</span>
            </button>
          );
        })}
      </div>

      {/* Services dropdown */}
      <div className="md:w-full">
        <button
          onClick={() => setOpenServices((s) => !s)}
          type="button"
          aria-expanded={openServices}
          aria-controls="services-panel"
          className="w-full flex items-center justify-between rounded-full ring-1 ring-brand/30 bg-app-elevated px-3 py-2 text-sm"
        >
          <span>Services</span>
          <ChevronDown className={`h-4 w-4 transition ${openServices ? "rotate-180" : ""}`} />
        </button>

        {openServices && (
          <div id="services-panel" className="mt-2 rounded-xl ring-1 ring-brand/30 bg-white p-3">
            <div className="mb-2 flex justify-between gap-2 text-xs">
              <button
                onClick={selectAll}
                type="button"
                className="font-bold hover:text-black text-black/70"
                title="Select all"
              >
                Select all
              </button>
              <button
                onClick={selectNone}
                type="button"
                className="text-red-400 font-semibold hover:text-red-600"
                title="Clear"
              >
                Clear
              </button>
              <span className="ml-auto text-ink-secondary/70">
                {allSelected ? "All services" : `${selectedServices.length} selected`}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {options.map((opt) => {
                const checked =
                  selectedServices.length === 0 ? true : selectedServices.includes(opt);
                return (
                  <label
                    key={opt}
                    className={`flex items-center gap-2 rounded-full px-2 py-2 text-sm cursor-pointer ${
                      checked ? "bg-app-bg border border-black/10" : "hover:bg-app-bg/60"
                    }`}
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

      {/* Inputs */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 lg:grid-cols-1">
        {/* Keyword */}
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

        {/* City */}
        <label className="block">
          <span className="text-xs text-ink-secondary">City</span>
          <input
            value={city}
            onChange={(e) => onChange?.({ city: e.target.value })}
            placeholder="e.g. Delhi"
            className="mt-1 w-full rounded-full ring-1 ring-brand/30 bg-app-elevated px-3 py-2 text-sm outline-none"
          />
        </label>

        {/* Date */}
        <label className="block">
          <span className="text-xs text-ink-secondary">Date</span>
          <input
            type="date"
            value={date}
            onChange={(e) => onChange?.({ date: e.target.value })}
            className="mt-1 w-full rounded-full ring-1 ring-brand/30 bg-app-elevated px-3 py-2 text-sm outline-none"
          />
        </label>

        {/* Time */}
        <label className="block">
          <span className="text-xs text-ink-secondary">Time</span>
          <input
            type="time"
            value={time}
            onChange={(e) => onChange?.({ time: e.target.value })}
            className="mt-1 w-full rounded-full ring-1 ring-brand/30 bg-app-elevated px-3 py-2 text-sm outline-none"
          />
        </label>
      </div>
    </div>
  );
}
