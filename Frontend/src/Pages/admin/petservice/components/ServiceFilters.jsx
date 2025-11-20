import { ChevronDown, Dumbbell, Scissors, Search, Stethoscope } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

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
  availableServices = [],
  servicesLoading = false,
  servicesError = false,
}) {
  const [openServices, setOpenServices] = useState(false);

  // Decide current options:
  // 1) prefer backend-provided `availableServices` if non-empty
  // 2) otherwise fallback to static defaults for the current type
  const [options, setOptions] = useState(
    availableServices && availableServices.length > 0
      ? availableServices
      : SERVICE_OPTIONS[type] || []
  );

  useEffect(() => {
    if (Array.isArray(availableServices) && availableServices.length > 0) {
      setOptions(availableServices);
    } else {
      setOptions(SERVICE_OPTIONS[type] || []);
    }
  }, [availableServices, type]);

  // Treat "_none_" as explicit "no services selected"
  const cleanedSelected = selectedServices.includes("_none_")
    ? selectedServices.filter((s) => s !== "_none_")
    : selectedServices;

  const allSelected =
    (cleanedSelected.length === 0 || cleanedSelected.length === options.length) &&
    !selectedServices.includes("_none_");

  const toggleService = useCallback(
    (name) => {
      // always strip the special marker when user actively toggles
      const base = new Set(
        selectedServices.filter((s) => s !== "_none_")
      );
      base.has(name) ? base.delete(name) : base.add(name);
      onChange?.({ services: Array.from(base) });
    },
    [selectedServices, onChange]
  );

  const selectAll = useCallback(
    () => onChange?.({ services: [] }), // [] = treat as "all" on UI
    [onChange]
  );

  const selectNone = useCallback(
    () => onChange?.({ services: ["_none_"] }), // special marker, all checkboxes off
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
              <span className={active ? "text-app-bg" : "text-ink-primary"}>{label}</span>
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
            {/* Loading / error states for service options */}
            {servicesLoading && (
              <p className="text-xs text-ink-secondary/70 mb-2">
                Loading services…
              </p>
            )}
            {servicesError && !servicesLoading && (
              <p className="text-xs text-red-500 mb-2">
                Failed to load services. Showing defaults.
              </p>
            )}

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
                {allSelected
                  ? "All services"
                  : selectedServices.includes("_none_")
                  ? "None selected"
                  : `${cleanedSelected.length} selected`}
              </span>
            </div>

            {options.length === 0 ? (
              <p className="text-xs text-ink-secondary/70">
                No services available for this provider type.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {options.map((opt) => {
                  const checked = selectedServices.includes("_none_")
                    ? false
                    : cleanedSelected.length === 0
                    ? true
                    : cleanedSelected.includes(opt);

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
            )}
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
