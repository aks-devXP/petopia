import React from "react";
import { Mail, Phone } from "lucide-react";

const ContactCTA = () => {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="grid gap-6 rounded-[32px] bg-gradient-to-br from-[#fff7e8] via-white to-[#e9fbff] p-8 shadow-[0_30px_60px_rgba(15,23,42,0.08)] ring-1 ring-app-surface/30 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-brand">Contact us</p>
          <h3 className="text-3xl font-quicksandBold text-ink-heading">
            Partner with Petopia NGOs or request rapid support for an animal in distress.
          </h3>
          <p className="text-ink-secondary/80">
            Our concierge desk routes requests to the closest verified shelter, coordinates
            ambulances, and updates you in-app.
          </p>
          <div className="space-y-2 text-sm">
            <p className="inline-flex items-center gap-2 text-ink-heading">
              <Mail className="h-4 w-4 text-brand" /> care@petopia.in
            </p>
            <p className="inline-flex items-center gap-2 text-ink-heading">
              <Phone className="h-4 w-4 text-brand" /> +91 99887 76654 (7AM – 10PM IST)
            </p>
          </div>
        </div>
        <form className="rounded-3xl bg-white p-6 shadow-inner ring-1 ring-app-surface/30">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full rounded-2xl border border-app-surface/60 px-4 py-3 text-sm focus:border-brand focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-2xl border border-app-surface/60 px-4 py-3 text-sm focus:border-brand focus:outline-none"
            />
            <textarea
              rows="4"
              placeholder="How can we help?"
              className="w-full rounded-2xl border border-app-surface/60 px-4 py-3 text-sm focus:border-brand focus:outline-none"
            />
            <button
              type="button"
              className="w-full rounded-2xl bg-brand py-3 text-sm font-semibold text-white hover:bg-brand-hover"
            >
              Send message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactCTA;
