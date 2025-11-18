import React from "react";
import { Play, Leaf } from "lucide-react";

const MissionShowcase = () => {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-12 md:py-16">
      <div className="grid gap-8 rounded-[32px] bg-white shadow-[0_25px_80px_rgba(12,43,55,0.08)] ring-1 ring-app-surface/40 md:grid-cols-2">
        <div className="space-y-4 p-8">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-brand">
            <Leaf className="h-4 w-4" /> Our Mission
          </p>
          <h2 className="text-3xl font-quicksandBold leading-snug text-ink-heading">
            Guardians of street animals, powered by transparent data and community.
          </h2>
          <p className="text-base text-ink-secondary/80">
            Petopia NGOs weave together veterinarians, shelter partners, and donors to deliver
            medical aid, rehabilitation, and permanent homes. Every campaign ships with measurable
            outcomes so you always know the impact you created.
          </p>
          <ul className="space-y-3 text-sm text-ink-secondary/90">
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand" /> 24/7 rescue desk with verified
              responders
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand" /> Integrated foster-to-adopt loops
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand" /> ESG-ready reporting for corporate
              allies
            </li>
          </ul>
        </div>
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#dbeafe] to-[#fef9c3]">
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
            alt="Care mission"
            className="h-full w-full object-cover opacity-80"
          />
          <button className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-ink-primary shadow-xl">
            <Play className="h-6 w-6" fill="currentColor" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default MissionShowcase;
