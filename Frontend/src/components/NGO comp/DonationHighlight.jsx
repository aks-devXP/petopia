import React from "react";
import { Heart, Sparkles } from "lucide-react";

const mosaicImages = [
  "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1501706362039-c06b2d715385?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1657317162094-845399768ce5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740"
];

const DonationHighlight = () => {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-12">
      <div className="grid gap-10 rounded-[32px] bg-white p-8 shadow-[0_30px_70px_rgba(12,43,55,0.08)] ring-1 ring-app-surface/30 md:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand">
            <Sparkles className="h-4 w-4" /> Donate with confidence
          </div>
          <h2 className="text-3xl font-quicksandBold text-ink-heading">
            Every contribution funds medical care, nourishment, and community adoption drives.
          </h2>
          <p className="text-ink-secondary/80">
            Choose a cause, view its live requirements, and receive receipts alongside recovery
            stories. Petopia’s treasury rails ensure instant payouts to on-ground partners.
          </p>
          <div className="grid gap-4 rounded-2xl bg-app-bg/50 p-4 text-sm text-ink-secondary/80 sm:grid-cols-2">
            <div>
              <p className="text-ink-heading font-semibold">Medical Wing</p>
              <p>Surgeries, vaccinations, chronic care kits for rescued animals.</p>
            </div>
            <div>
              <p className="text-ink-heading font-semibold">Community Meals</p>
              <p>City-wise feeding routes with geo-tagged updates every evening.</p>
            </div>
          </div>
          <a
            href="/ngo/donate"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/40"
          >
            See active campaigns
            <Heart className="h-4 w-4" />
          </a>
        </div>

        <div className="relative grid grid-cols-3 gap-2">
          {mosaicImages.map((img, idx) => (
            <div
              key={img}
              className={`h-28 overflow-hidden rounded-2xl ${
                idx % 3 === 1 ? "translate-y-4" : ""
              }`}
            >
              <img src={img} alt="impact" className="h-full w-full object-cover" />
            </div>
          ))}
          <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-white/40" />
        </div>
      </div>
    </section>
  );
};

export default DonationHighlight;
