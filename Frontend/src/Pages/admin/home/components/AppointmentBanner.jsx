import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, PawPrint, ChevronRight, CalendarClock } from "lucide-react";
import AnimatedList from "@components/AnimatedList";

export default function AppointmentBanner({ appointments = [] }) {
  const total = appointments.length;

  return (
    <div className="w-full bg-[#EDE0D4] rounded-3xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-2">
          <CalendarClock className="h-5 w-5 text-brand" aria-hidden />
          <h2 className="text-base md:text-lg font-semibold text-ink-heading">
            Upcoming Appointments
          </h2>
          {total > 0 && (
            <span className="text-xs md:text-sm text-ink-secondary/70">({total})</span>
          )}
        </div>
        <Link
          to="/appointments"
          className="inline-flex items-center gap-1 text-sm font-medium text-amber-700 hover:text-amber-800 transition-colors rounded-full px-2 -mx-2"
        >
          View all <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      {/* If no appointments, show the centered fallback */}
      {appointments.length === 0 ? (
        <div className="h-72 flex items-center justify-center px-4">
          <p className="text-sm text-stone-500">No upcoming appointments.</p>
        </div>
      ) : (
        <AnimatedList
          items={appointments}
          itemKey={(a) => a._id}
          onItemSelect={(a) => console.log("Selected:", a._id)}
          className="h-72"
          scrollAreaClassName="h-full overflow-y-auto px-4 py-3 space-y-3 custom-scroll"
          showGradients
          enableArrowNavigation
          displayScrollbar
          gradientTop="linear-gradient(to bottom, rgba(237,224,212,0.85), rgba(237,224,212,0))"
          gradientBottom="linear-gradient(to top, rgba(237,224,212,0.95), rgba(237,224,212,0))"
          stagger={0.05}
          duration={0.20}
          renderItem={(a) => (
            <div className="flex flex-col gap-2 rounded-2xl bg-white shadow-md p-4">
              {/* Top Row — Provider & Service (date on right) */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center font-semibold text-amber-800">
                    {a.provider.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-stone-800 text-sm leading-tight">
                      {a.provider.name}
                    </p>
                    <p className="text-stone-500 text-xs">{a.serviceName}</p>
                  </div>
                </div>
                <div className="text-right text-xs text-stone-500">
                  <span className="inline-flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(a.date).toLocaleDateString(undefined, {
                      weekday: "short",
                      month: "short",
                      day: "2-digit",
                    })}
                  </span>
                </div>
              </div>

              {/* Bottom Row — Pet and Time */}
              <div className="flex justify-between items-center pt-1">
                <div className="flex items-center gap-2 text-stone-600 text-sm">
                  <PawPrint size={16} className="text-amber-700" />
                  {a.pet.name}
                </div>
                <div className="flex items-center gap-1 text-stone-600 text-sm">
                  <Clock size={16} className="text-amber-700" />
                  {new Date(a.date).toLocaleTimeString(undefined, {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          )}
        />
      )}

      {/* Custom scrollbar styling (unchanged) */}
      <style>{`
        .custom-scroll { scrollbar-width: thin; scrollbar-color: #D6B99D transparent; scrollbar-gutter: stable; }
        .custom-scroll::-webkit-scrollbar { width: 10px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; margin: 6px; }
        .custom-scroll::-webkit-scrollbar-thumb { background-color: #d6b99d; border-radius: 9999px; }
      `}</style>
    </div>
  );
}
