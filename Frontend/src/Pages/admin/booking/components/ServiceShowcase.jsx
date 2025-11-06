import React from "react";
import { CheckCircle2, HeartPulse, Sparkles, Stethoscope, Dumbbell, Scissors } from "lucide-react";

const ServiceShowcase = ({ profile }) => {
  const { services, approach, addons, typeLabel } = profile;

  return (
    <section className="space-y-8 rounded-3xl bg-white/80 p-8 ring-1 ring-app-surface/70 shadow-[0_30px_65px_rgba(12,43,55,0.12)]">
      <header className="space-y-2">
        <h2 className="text-2xl font-quicksandBold text-ink-heading">
          Signature {typeLabel} experience
        </h2>
        <p className="text-sm text-ink-secondary/80">
          Designed for modern pet parents who expect clarity, premium care, and
          measurable progress from every session.
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-4">
          <p className="text-sm font-medium text-ink-secondary/70 uppercase tracking-wide">
            Outcomes you can expect
          </p>
          <div className="space-y-4">
            {services.map((service, index) => (
              <div
                key={service}
                className="relative rounded-2xl border border-app-surface/60 bg-app-elevated px-4 py-4 pl-12 shadow-[0_16px_40px_rgba(12,43,55,0.08)]"
              >
                <span className="absolute left-4 top-4 text-lg font-semibold text-brand">
                  0{index + 1}
                </span>
                <p className="text-base font-semibold text-ink-heading">
                  {service}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5 rounded-2xl bg-ink-primary text-white p-6 shadow-[0_35px_60px_rgba(12,43,55,0.35)]">
          {typeLabel.toLowerCase().includes("vet") ? (
            <>
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-500/15">
                  <Stethoscope className="h-5 w-5 text-emerald-300" />
                </div>
                <span className="text-sm font-semibold uppercase tracking-wide text-emerald-200">
                  Clinical methodology
                </span>
              </div>
              <div className="space-y-3 text-sm">
                {approach.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-brand" />
                    <p className="text-white/90">{item}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl bg-white/10 p-4 text-xs text-white/70">
                Includes lab coordination, pre-visit questionnaires, and 48-hour follow-up care with
                your dedicated veterinary team.
              </div>
            </>
          ) : typeLabel.toLowerCase().includes("trainer") ? (
            <>
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-500/15">
                  <Dumbbell className="h-5 w-5 text-amber-300" />
                </div>
                <span className="text-sm font-semibold uppercase tracking-wide text-amber-200">
                  Behaviour playbook
                </span>
              </div>
              <div className="space-y-3 text-sm">
                {approach.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-brand" />
                    <p className="text-white/90">{item}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl bg-white/10 p-4 text-xs text-white/70">
                Weekly progress snapshots, personalised home-work, and on-demand coaching support
                between sessions.
              </div>
            </>
          ) : typeLabel.toLowerCase().includes("groomer") ? (
            <>
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-rose-500/15">
                  <Scissors className="h-5 w-5 text-rose-300" />
                </div>
                <span className="text-sm font-semibold uppercase tracking-wide text-rose-200">
                  Spa ritual
                </span>
              </div>
              <div className="space-y-3 text-sm">
                {approach.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-brand" />
                    <p className="text-white/90">{item}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl bg-white/10 p-4 text-xs text-white/70">
                Aromatherapy ambience, dermatologically safe products, and live updates during your
                pet’s pampering.
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand/15">
                  <HeartPulse className="h-5 w-5 text-brand" />
                </div>
                <span className="text-sm font-semibold uppercase tracking-wide text-brand/90">
                  Our care methodology
                </span>
              </div>
              <div className="space-y-3 text-sm">
                {approach.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-brand" />
                    <p className="text-white/90">{item}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl bg-white/10 p-4 text-xs text-white/70">
                Always-on chat support, visit summaries, and progress dashboards are included with
                every booking.
              </div>
            </>
          )}
        </div>
      </div>

      {addons.length > 0 && (
        <div className="rounded-2xl border border-app-surface/50 bg-app-bg/80 p-5">
          <div className="flex items-center gap-2 text-sm font-medium text-brand">
            <Sparkles className="h-4 w-4" />
            <span>Recommended add-ons</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-3">
            {addons.map((addon) => (
              <span
                key={addon.id}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium text-ink-heading ring-1 ring-app-surface/60 shadow-sm"
              >
                {addon.label}
                {addon.price > 0 ? (
                  <span className="text-ink-secondary/70">+₹{addon.price}</span>
                ) : (
                  <span className="text-brand/80">Included</span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ServiceShowcase;
