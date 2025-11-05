import React, { useMemo, useState } from "react";
import {
  CalendarDays,
  Clock,
  IndianRupee,
  Info,
  ShieldCheck,
} from "lucide-react";
import { handleError, handleSuccess } from "@/Util/Alerts";

const ScheduleSidebar = ({ profile, onConfirm }) => {
  const { schedule, basePrice, currencySymbol, addons, name } = profile;
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [selectedSlotIdx, setSelectedSlotIdx] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);

  const activeDay = schedule[selectedDayIdx] || null;
  const activeSlot =
    activeDay && selectedSlotIdx !== null
      ? activeDay.slots[selectedSlotIdx]
      : null;

  const total = useMemo(() => {
    const addonTotal = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    return basePrice + addonTotal;
  }, [selectedAddons, basePrice]);

  const toggleAddon = (addon) => {
    setSelectedAddons((prev) => {
      const exists = prev.find((item) => item.id === addon.id);
      if (exists) {
        return prev.filter((item) => item.id !== addon.id);
      }
      return [...prev, addon];
    });
  };

  const handleSubmit = () => {
    if (!activeDay || !activeSlot) {
      handleError("Please select a date and time slot to continue.");
      return;
    }
    handleSuccess("Your slot is reserved while we complete the booking.");
    onConfirm({
      day: activeDay,
      slot: activeSlot,
      addons: selectedAddons,
      total,
    });
  };

  if (schedule.length === 0) {
    return (
      <aside className="sticky top-28 h-fit rounded-3xl bg-white/80 p-6 text-center ring-1 ring-app-surface/60 shadow-[0_22px_60px_rgba(12,43,55,0.12)]">
        <CalendarDays className="mx-auto h-10 w-10 text-brand" />
        <p className="mt-4 text-base font-medium text-ink-heading">
          New slots opening soon
        </p>
        <p className="mt-2 text-sm text-ink-secondary/80">
          This expert is currently fully booked. Tap “Notify me” in the app to
          get priority access when fresh availability is released.
        </p>
      </aside>
    );
  }

  return (
    <aside className="sticky top-24 h-fit rounded-3xl bg-white/90 p-6 ring-1 ring-app-surface/60 shadow-[0_30px_80px_rgba(12,43,55,0.18)] backdrop-blur">
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-ink-heading">
            Reserve your session
          </h3>
          <p className="text-sm text-ink-secondary/80">
            Live availability with instant confirmation. You will not be charged
            until the specialist approves.
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between text-xs text-ink-secondary/70">
            <span>Choose a day</span>
            <CalendarDays className="h-4 w-4" />
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 horizontal-scrollbar">
            {schedule.map((day, index) => (
              <button
                key={day.iso}
                type="button"
                onClick={() => {
                  setSelectedDayIdx(index);
                  setSelectedSlotIdx(null);
                }}
                className={`min-w-[90px] rounded-2xl border px-3 py-2 text-left transition-all ${
                  index === selectedDayIdx
                    ? "border-brand bg-brand/10 text-brand shadow-sm"
                    : "border-app-surface bg-white text-ink-secondary/80 hover:border-brand/30"
                }`}
              >
                <p className="text-xs uppercase tracking-wide">
                  {day.label}
                </p>
                <p className="text-sm font-semibold text-ink-heading">
                  {day.dateShort}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-xs text-ink-secondary/70">
            <span>Select a slot</span>
            <Clock className="h-4 w-4" />
          </div>
          <div className="mt-3 grid gap-2">
            {activeDay.slots.map((slot, slotIdx) => (
              <button
                key={slot.id}
                type="button"
                onClick={() => setSelectedSlotIdx(slotIdx)}
                className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm transition-all ${
                  selectedSlotIdx === slotIdx
                    ? "border-brand bg-brand text-white shadow-[0_12px_30px_rgba(216,84,0,0.35)]"
                    : "border-app-surface bg-app-elevated text-ink-heading hover:border-brand/40"
                }`}
              >
                <span className="font-medium">{slot.label}</span>
                {slot.isPrime ? (
                  <span
                    className={`rounded-full px-2 py-1 text-[10px] uppercase tracking-wide ${
                      selectedSlotIdx === slotIdx
                        ? "bg-white/15 text-white"
                        : "bg-brand/10 text-brand"
                    }`}
                  >
                    Peak demand
                  </span>
                ) : (
                  <span className="text-xs text-ink-secondary/70">
                    {slot.meta}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {addons.length > 0 && (
          <div className="rounded-2xl border border-app-surface/60 bg-app-bg/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-secondary/70">
              Personalise your visit
            </p>
            <div className="mt-3 space-y-2">
              {addons.map((addon) => {
                const checked = selectedAddons.some(
                  (item) => item.id === addon.id
                );
                return (
                  <label
                    key={addon.id}
                    className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-3 py-2 text-sm transition ${
                      checked
                        ? "border-brand bg-white"
                        : "border-transparent bg-white/60 hover:border-brand/30"
                    }`}
                  >
                    <span className="flex-1 text-ink-heading">{addon.label}</span>
                    <span className="text-xs text-ink-secondary/70">
                      {addon.price > 0 ? `+₹${addon.price}` : "Included"}
                    </span>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleAddon(addon)}
                      className="h-4 w-4 accent-brand"
                    />
                  </label>
                );
              })}
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-app-surface/60 bg-white p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-ink-secondary/80">
              Session total
            </span>
            <div className="flex items-center gap-1 text-xl font-semibold text-ink-heading">
              <IndianRupee className="h-5 w-5" />
              <span>{total}</span>
            </div>
          </div>
          <p className="flex items-center gap-2 text-xs text-ink-secondary/70">
            <ShieldCheck className="h-4 w-4 text-brand" />
            You will be charged once {name} confirms the appointment.
          </p>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full rounded-2xl bg-ink-heading px-4 py-3 text-sm font-semibold text-white transition hover:bg-ink-primary"
          >
            Request booking
          </button>
        </div>

        <div className="rounded-2xl bg-app-bg/60 p-4 text-xs text-ink-secondary/70">
          <div className="flex items-center gap-2 font-medium text-ink-secondary">
            <Info className="h-3.5 w-3.5" />
            <span>Peace-of-mind guarantee</span>
          </div>
          <p className="mt-2">
            Need to reschedule? Let us know at least 12 hours before the slot to
            get a full credit that you can use with any partner specialist.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default ScheduleSidebar;
