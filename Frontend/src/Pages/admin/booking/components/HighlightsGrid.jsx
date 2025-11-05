import React from "react";
import {
  Activity,
  Clock,
  Languages,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Workflow,
} from "lucide-react";

const ICON_MAP = {
  stethoscope: Stethoscope,
  clock: Clock,
  shield: ShieldCheck,
  sparkles: Sparkles,
  languages: Languages,
  workflow: Workflow,
  activity: Activity,
};

const HighlightsGrid = ({ metrics }) => {
  if (!metrics || metrics.length === 0) return null;

  return (
    <section className="rounded-3xl bg-white/70 backdrop-blur-md ring-1 ring-app-surface/70 shadow-[0_18px_45px_rgba(12,43,55,0.12)]">
      <div className="grid gap-5 px-6 py-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map(({ title, value, helper, icon }, index) => {
          const Icon = ICON_MAP[icon] || Sparkles;
          return (
            <div
              key={`${title}-${index}`}
              className="group rounded-2xl border border-app-surface/60 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_25px_60px_rgba(216,84,0,0.16)]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand group-hover:bg-brand/20">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-ink-secondary/70">
                    {title}
                  </p>
                  <p className="text-base font-semibold text-ink-heading">
                    {value}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm  text-ink-secondary/80">
                {helper}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HighlightsGrid;
