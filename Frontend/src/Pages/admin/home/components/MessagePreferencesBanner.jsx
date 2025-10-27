import React, { useState } from "react";
import Card from "@components/card";
import {
  Bell,
  MessageSquare,
  Mail,
  Phone,
  Wifi,
  Moon,
  Clock,
  Newspaper,
} from "lucide-react";

/* --- Brand switch (controlled) ------------------------------------------ */
function BrandSwitch({ checked, onChange, ariaLabel }) {
  return (
    <label className="relative inline-block h-8 w-14 cursor-pointer select-none">
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        aria-label={ariaLabel}
      />
      <span
        className="absolute inset-0 rounded-full bg-stone-200 transition-colors
                   peer-checked:bg-brand"
      />
      <span
        className="dot absolute left-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-white transition
                   peer-checked:translate-x-6"
      >
      </span>
    </label>
  );
}


/* --- Row & Section shells (match your dashboard style) ------------------ */
function Row({ icon, label, hint, right, top, bottom }) {
  return (
    <div
      className={[
        "flex items-center justify-between gap-4 px-3 py-3",
        top ? "rounded-t-2xl" : "",
        bottom ? "rounded-b-2xl" : "",
        "bg-app-elevated",
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{icon}</div>
        <div>
          <div className="text-sm md:text-[15px] font-semibold text-ink-primary">
            {label}
          </div>
          {hint ? (
            <div className="text-xs text-ink-secondary mt-0.5">{hint}</div>
          ) : null}
        </div>
      </div>
      <div className="shrink-0">{right}</div>
    </div>
  );
}

function Section({ title, subtitle, icon, children }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-app-surface">
          {icon}
        </div>
        <div>
          <div className="text-lg font-bold text-ink-primary">{title}</div>
          {subtitle ? (
            <div className="text-xs text-ink-secondary">{subtitle}</div>
          ) : null}
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl ring-1 ring-ink-primary/10">{children}</div>
    </div>
  );
}

/* --- Message Preferences Banner ---------------------------------------- */
export default function MessagePreferencesBanner() {
  // core preferences
  const [inApp, setInApp] = useState(true);
  const [email, setEmail] = useState(true);
  const [sms, setSms] = useState(false);
  const [push, setPush] = useState(false);

  // quiet hours
  const [quietOn, setQuietOn] = useState(false);
  const [quietFrom, setQuietFrom] = useState("22:00");
  const [quietTo, setQuietTo] = useState("07:00");

  // digest
  const [digestOn, setDigestOn] = useState(true);
  const [digestFreq, setDigestFreq] = useState("weekly"); // daily | weekly | monthly

  return (
    <Card extra="px-4 py-4 md:px-6 md:py-6 bg-app-surface rounded-3xl">
      <div className="mb-5">
        <h2 className="text-xl md:text-2xl font-nunitoBold text-ink-primary">
          Message & Notification Preferences
        </h2>
        <p className="text-sm text-ink-secondary">
          Choose how you’d like to receive updates and reminders.
        </p>
      </div>

      <div className="grid gap-8">
        {/* Delivery channels */}
        <Section
          title="Delivery Channels"
          subtitle="Turn channels on or off any time."
          icon={<Bell size={18} className="text-ink-primary" />}
        >
          <Row
            icon={<MessageSquare size={18} className="text-brand" />}
            label="In-app messages"
            hint="Messages show in your inbox and activity center."
            right={<BrandSwitch checked={inApp} onChange={setInApp} ariaLabel="Toggle in-app messages" />}
            top
          />
          <Row
            icon={<Mail size={18} className="text-brand" />}
            label="Email alerts"
            hint="Reminders, confirmations and account notices."
            right={<BrandSwitch checked={email} onChange={setEmail} ariaLabel="Toggle email alerts" />}
          />
          <Row
            icon={<Phone size={18} className="text-brand" />}
            label="SMS / WhatsApp"
            hint="Time-sensitive reminders and one-tap confirmations."
            right={<BrandSwitch checked={sms} onChange={setSms} ariaLabel="Toggle SMS or WhatsApp" />}
          />
          <Row
            icon={<Wifi size={18} className="text-brand" />}
            label="Browser push"
            hint="Quick heads-up when you’re signed in on web."
            right={<BrandSwitch checked={push} onChange={setPush} ariaLabel="Toggle browser push" />}
            bottom
          />
        </Section>

        {/* Quiet hours */}
        <Section
          title="Quiet Hours"
          subtitle="Pause non-urgent notifications during set times."
          icon={<Moon size={18} className="text-ink-primary" />}
        >
          <Row
            icon={<Clock size={18} className="text-brand" />}
            label="Enable quiet hours"
            hint="We’ll deliver non-urgent items after this window."
            right={<BrandSwitch checked={quietOn} onChange={setQuietOn} ariaLabel="Toggle quiet hours" />}
            top
          />
          <div className="flex items-center gap-3 bg-app-elevated px-3 pb-3">
            <div className="flex-1 grid grid-cols-2 gap-3 md:max-w-md">
              <div>
                <div className="text-xs text-ink-secondary mb-1">From</div>
                <input
                  type="time"
                  value={quietFrom}
                  onChange={(e) => setQuietFrom(e.target.value)}
                  disabled={!quietOn}
                  className="w-full rounded-full bg-app-surface/60 px-3 py-2 text-sm text-ink-primary
                             outline-none focus:ring-2 focus:ring-focus-ring disabled:opacity-60"
                />
              </div>
              <div>
                <div className="text-xs text-ink-secondary mb-1">To</div>
                <input
                  type="time"
                  value={quietTo}
                  onChange={(e) => setQuietTo(e.target.value)}
                  disabled={!quietOn}
                  className="w-full rounded-full bg-app-surface/60 px-3 py-2 text-sm text-ink-primary
                             outline-none focus:ring-2 focus:ring-focus-ring disabled:opacity-60"
                />
              </div>
            </div>
          </div>
        </Section>

        {/* Digest & news */}
        <Section
          title="Digest & News"
          subtitle="Keep up without the noise."
          icon={<Newspaper size={18} className="text-ink-primary" />}
        >
          <Row
            icon={<Newspaper size={18} className="text-brand" />}
            label="Summary digest"
            hint="Get a concise round-up of activity."
            right={<BrandSwitch checked={digestOn} onChange={setDigestOn} ariaLabel="Toggle digest" />}
            top
          />
          <div className="bg-app-elevated px-3 pb-3">
            <div className="text-xs text-ink-secondary mb-1">Frequency</div>
            <select
              value={digestFreq}
              onChange={(e) => setDigestFreq(e.target.value)}
              disabled={!digestOn}
              className="w-full max-w-xs rounded-full bg-app-surface/60 px-3 py-2 text-sm text-ink-primary
                         outline-none focus:ring-2 focus:ring-focus-ring disabled:opacity-60"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly (recommended)</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </Section>
      </div>
    </Card>
  );
}
