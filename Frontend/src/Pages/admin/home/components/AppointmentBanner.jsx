import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, PawPrint, ChevronRight, CalendarClock } from "lucide-react";

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
            <span className="text-xs md:text-sm text-ink-secondary/70">
              ({total})
            </span>
          )}
        </div>
        <Link
          to="/appointments"
          className="inline-flex items-center gap-1 text-sm font-medium text-amber-700 hover:text-amber-800 transition-colors rounded-full px-2 -mx-2"
        >
          View all <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Scroll area — rounded & clipped, spacing between cards */}
      <div
        className="h-72 overflow-y-auto px-4 py-3 space-y-3 custom-scroll"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#D6B99D transparent",
          // keeps layout stable so content doesn't jump when scrollbar appears
          scrollbarGutter: "stable",
        }}
      >
        <style>{`
          /* WebKit scrollbar styling */
          .custom-scroll::-webkit-scrollbar {
            width: 10px;
          }
          .custom-scroll::-webkit-scrollbar-track {
            background: transparent;
            margin: 6px; /* creates top/bottom insets so arrows/ends don't poke past the rounded edge */
          }
          .custom-scroll::-webkit-scrollbar-thumb {
            background-color: #d6b99d;
            border-radius: 9999px;
          }
        `}</style>

        {appointments.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-sm text-stone-500">No upcoming appointments.</p>
          </div>
        ) : (
          appointments.map((a) => (
            <div
              key={a._id}
              className="flex flex-col gap-2 rounded-2xl bg-white shadow-md p-4"
            >
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
          ))
        )}
      </div>
    </div>
  );
}
