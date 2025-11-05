import React from "react";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  ReceiptIndianRupee,
  ShieldCheck,
  User,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const formatCurrency = (value, symbol = "₹") => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return value ? `${symbol} ${value}` : `${symbol} 0`;
  }
  return `${symbol}${numeric.toLocaleString("en-IN")}`;
};

const AppointmentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const fallback = {
    providerName: "Dr. Anaya Kapoor",
    providerType: "Veterinary Specialist",
    date: "Tuesday, 25 March 2025",
    time: "10:00 AM - 10:45 AM",
    slotMeta: "Clinic consultation • Companion care",
    location: {
      city: "Jaipur",
      state: "Rajasthan",
    },
    currencySymbol: "₹",
    total: 2590,
    addons: [
      { id: "follow", label: "48-hour digital follow-up", price: 249 },
      { id: "diet", label: "Nutrition consultation", price: 399 },
    ],
    support: {
      email: "care@petopia.in",
      phone: "+91 99887 76654",
    },
    reference: "APT-482913",
    createdAt: new Date().toISOString(),
  };

  const raw = location.state?.appointmentData || fallback;

  const providerName = raw.providerName || raw.vetName || fallback.providerName;
  const providerType = raw.providerType || "Specialist";
  const date = raw.date || fallback.date;
  const time = raw.time || fallback.time;
  const slotMeta = raw.slotMeta || "The visit agenda will be shared by your specialist.";

  const locationLabel =
    raw.location?.address ||
    [raw.location?.city, raw.location?.state].filter(Boolean).join(", ") ||
    "Shared post-confirmation";

  const currencySymbol = raw.currencySymbol || "₹";
  const total =
    typeof raw.total === "number"
      ? raw.total
      : Number(raw.fees) || fallback.total;

  const addons = Array.isArray(raw.addons) ? raw.addons : [];
  const detailedAddons =
    addons.length > 0
      ? addons.map((addon, index) => ({
          id: addon.id || `addon-${index}`,
          label: addon.label || addon.name || "Service add-on",
          price: addon.price ?? addon.cost ?? 0,
        }))
      : [];

  const reference =
    raw.reference ||
    raw.bookingReference ||
    `APT-${(Date.now() % 1000000).toString().padStart(6, "0")}`;

  const createdAt = raw.createdAt ? new Date(raw.createdAt) : new Date();
  const createdLabel = createdAt.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const supportEmail = raw.support?.email || fallback.support.email;
  const supportPhone = raw.support?.phone || fallback.support.phone;

  const journeySteps = [
    { title: "Booking placed", caption: createdLabel, status: "done" },
    {
      title: "Awaiting specialist confirmation",
      caption: "You'll receive an update shortly",
      status: "active",
    },
    {
      title: "Visit day",
      caption: date,
      status: "upcoming",
    },
    {
      title: "Follow-up care",
      caption: "48-hour digital check-in",
      status: "upcoming",
    },
  ];

  const summaryCards = [
    {
      label: "Date & time",
      icon: Calendar,
      primary: date,
      secondary: time,
    },
    {
      label: "Specialist",
      icon: User,
      primary: providerName,
      secondary: providerType,
    },
    {
      label: "Visit type",
      icon: ShieldCheck,
      primary: slotMeta,
      secondary: "Your care plan will be shared on confirmation",
    },
    {
      label: "Location",
      icon: MapPin,
      primary: locationLabel,
      secondary: "Petopia partner network",
    },
  ];

  const nextSteps = [
    "Upload any recent medical documents in your Petopia profile so the specialist can review them in advance.",
    "Arrive 10 minutes early or join the video room a few minutes ahead to keep the session on schedule.",
    "You'll receive reminders, directions, and follow-up notes straight in your dashboard and email.",
  ];

  const handleViewAppointments = () => {
    navigate("/dashboard/3");
  };

  const handleBookAgain = () => {
    navigate("/pet-services");
  };

  const handleDownloadReceipt = () => {
    const addonsTotal = detailedAddons.reduce(
      (sum, addon) => sum + (addon.price > 0 ? addon.price : 0),
      0
    );
    const consultationFee =
      total > addonsTotal ? total - addonsTotal : total;

    const receiptWindow = window.open("", "_blank", "width=720,height=900");
    if (!receiptWindow) {
      alert("Please allow pop-ups to download your receipt.");
      return;
    }

    const receiptHTML = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Petopia Appointment Receipt</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&display=swap');
            :root {
              color-scheme: light only;
            }
            * {
              box-sizing: border-box;
            }
            body {
              font-family: 'Nunito Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              margin: 0;
              background: #f2eeeb;
              color: #0c2b37;
              padding: 32px;
            }
            .receipt {
              max-width: 600px;
              margin: 0 auto;
              background: #ffffff;
              border-radius: 28px;
              box-shadow: 0 32px 80px rgba(12, 43, 55, 0.18);
              overflow: hidden;
              border: 1px solid rgba(12, 43, 55, 0.08);
            }
            header {
              background: linear-gradient(120deg, #d85400, #0c2b37);
              padding: 32px;
              color: #fff;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            header .brand {
              font-size: 24px;
              font-weight: 700;
              letter-spacing: 0.04em;
            }
            .tagline {
              font-size: 12px;
              opacity: 0.8;
            }
            .ref {
              text-align: right;
              font-size: 13px;
              opacity: 0.9;
            }
            .content {
              padding: 32px;
            }
            h2 {
              margin: 0 0 16px;
              font-size: 18px;
            }
            .meta-grid {
              display: grid;
              grid-template-columns: repeat(2, minmax(0, 1fr));
              gap: 18px;
            }
            .meta-card {
              padding: 16px;
              border-radius: 18px;
              background: #f7f3ef;
              border: 1px solid rgba(12, 43, 55, 0.08);
            }
            .meta-card p {
              margin: 0;
            }
            .meta-label {
              font-size: 11px;
              text-transform: uppercase;
              letter-spacing: 0.08em;
              color: rgba(12, 43, 55, 0.55);
              margin-bottom: 6px;
            }
            .meta-value {
              font-size: 15px;
              font-weight: 600;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 24px;
              border-radius: 18px;
              overflow: hidden;
            }
            thead {
              background: #f2eeeb;
            }
            th, td {
              padding: 14px 18px;
              text-align: left;
              font-size: 14px;
            }
            tbody tr:not(:last-child) {
              border-bottom: 1px solid rgba(12, 43, 55, 0.08);
            }
            .totals {
              margin-top: 24px;
              padding: 18px 20px;
              border-radius: 18px;
              background: #fdf9f5;
              border: 1px solid rgba(216, 84, 0, 0.18);
            }
            .totals-row {
              display: flex;
              justify-content: space-between;
              font-size: 14px;
              margin-bottom: 8px;
            }
            .totals-row:last-child {
              margin-bottom: 0;
            }
            .totals-row.total {
              font-weight: 700;
              font-size: 16px;
              color: #d85400;
            }
            footer {
              padding: 20px 32px 32px;
              font-size: 12px;
              color: rgba(12, 43, 55, 0.6);
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .support {
              text-align: right;
            }
            .support a {
              color: #d85400;
              text-decoration: none;
            }
            @media print {
              body {
                background: #fff;
                padding: 0;
              }
              .receipt {
                box-shadow: none;
                border: none;
                border-radius: 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="receipt">
            <header>
              <div>
                <div class="brand">Petopia</div>
                <div class="tagline">Empowering modern pet care across India</div>
              </div>
              <div class="ref">
                <div>Receipt</div>
                <div>Ref: <strong>${reference}</strong></div>
              </div>
            </header>
            <div class="content">
              <h2>Appointment Receipt</h2>
              <div class="meta-grid">
                <div class="meta-card">
                  <p class="meta-label">Specialist</p>
                  <p class="meta-value">${providerName}</p>
                  <p style="font-size:12px;margin-top:4px;color:rgba(12,43,55,0.65);">${providerType}</p>
                </div>
                <div class="meta-card">
                  <p class="meta-label">Visit schedule</p>
                  <p class="meta-value">${date}</p>
                  <p style="font-size:12px;margin-top:4px;color:rgba(12,43,55,0.65);">${time}</p>
                </div>
                <div class="meta-card">
                  <p class="meta-label">Location</p>
                  <p class="meta-value">${locationLabel}</p>
                  <p style="font-size:12px;margin-top:4px;color:rgba(12,43,55,0.65);">Petopia partner clinic</p>
                </div>
                <div class="meta-card">
                  <p class="meta-label">Issued on</p>
                  <p class="meta-value">${createdLabel}</p>
                  <p style="font-size:12px;margin-top:4px;color:rgba(12,43,55,0.65);">GST inclusive (where applicable)</p>
                </div>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Details</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Consultation</td>
                    <td>${slotMeta}</td>
                    <td>${formatCurrency(consultationFee, currencySymbol)}</td>
                  </tr>
                  ${
                    detailedAddons.length
                      ? detailedAddons
                          .map(
                            (addon) => `
                            <tr>
                              <td>Addon</td>
                              <td>${addon.label}</td>
                              <td>${
                                addon.price > 0
                                  ? formatCurrency(addon.price, currencySymbol)
                                  : "Included"
                              }</td>
                            </tr>`
                          )
                          .join("")
                      : `
                        <tr>
                          <td>Addon</td>
                          <td>48-hour digital follow-up</td>
                          <td>Included</td>
                        </tr>
                      `
                  }
                </tbody>
              </table>

              <div class="totals">
                <div class="totals-row">
                  <span>Consultation fee</span>
                  <span>${formatCurrency(consultationFee, currencySymbol)}</span>
                </div>
                <div class="totals-row">
                  <span>Add-on services</span>
                  <span>${formatCurrency(addonsTotal, currencySymbol)}</span>
                </div>
                <div class="totals-row total">
                  <span>Total (payable upon confirmation)</span>
                  <span>${formatCurrency(total, currencySymbol)}</span>
                </div>
              </div>

              <h2 style="margin-top:32px;">Support</h2>
              <p style="font-size:13px; color:rgba(12, 43, 55, 0.7); line-height:1.6;">
                For any questions regarding this appointment, reach out to us at
                <strong>${supportEmail}</strong> or call <strong>${supportPhone}</strong>.
                Our concierge team is available from 7 AM to 10 PM IST.
              </p>
            </div>
            <footer>
              <div>Petopia Care Pvt. Ltd.</div>
            <div class="support">
              <div>care@petopia.in</div>
              <div>petopia.in</div>
            </div>
          </footer>
        </div>
        </body>
      </html>
    `;

    receiptWindow.document.open();
    receiptWindow.document.write(receiptHTML);
    receiptWindow.document.close();
    receiptWindow.focus();
    setTimeout(() => {
      receiptWindow.print();
      receiptWindow.close();
    }, 200);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-app-bg via-white to-app-surface/60 py-12">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-white shadow-[0_40px_120px_rgba(12,43,55,0.16)] ring-1 ring-app-surface/60">
          <header className="bg-gradient-to-r from-brand to-ink-primary text-white">
            <div className="flex flex-col gap-6 px-8 py-10 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-white/15">
                  <CheckCircle2 className="h-9 w-9 text-white" />
                </span>
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-widest text-white/70">
                    Appointment confirmed
                  </p>
                  <h1 className="text-3xl font-quicksandBold leading-tight md:text-4xl">
                    You're all set for your {providerType.toLowerCase()}
                  </h1>
                  <p className="text-sm text-white/80">
                    Confirmation reference{" "}
                    <span className="font-semibold text-white">{reference}</span>
                  </p>
                </div>
              </div>
              <div className="rounded-2xl bg-white/12 px-5 py-4 text-sm text-white/85">
                <p className="text-xs uppercase tracking-wide text-white/60">
                  Payment summary
                </p>
                <div className="mt-1 flex items-center gap-2 text-lg font-semibold">
                  <ReceiptIndianRupee className="h-5 w-5 text-white/70" />
                  <span>{formatCurrency(total, currencySymbol)}</span>
                </div>
                <p className="text-xs text-white/60">
                  Charged once the specialist confirms the slot
                </p>
              </div>
            </div>
          </header>

          <main className="grid gap-8 px-6 py-8 lg:grid-cols-[1.7fr_1fr] lg:px-10">
            <section className="space-y-8">
              <div className="rounded-3xl bg-app-elevated px-6 py-7 ring-1 ring-app-surface/70">
                <div className="grid gap-6 sm:grid-cols-2">
                  {summaryCards.map(({ label, icon: Icon, primary, secondary }) => (
                    <div key={label} className="flex gap-4">
                      <span className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white shadow-sm">
                        <Icon className="h-5 w-5 text-brand" />
                      </span>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-ink-secondary/70">
                          {label}
                        </p>
                        <p className="text-base font-semibold text-ink-heading">
                          {primary}
                        </p>
                        <p className="text-sm text-ink-secondary/75">{secondary}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-secondary/70">
                    Visit journey
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-4">
                    {journeySteps.map((step, index) => {
                      const isLast = index === journeySteps.length - 1;
                      return (
                        <div key={step.title} className="flex items-center gap-4">
                          <div
                            className={`flex h-12 w-12 items-center justify-center rounded-full border-2 text-sm font-semibold ${
                              step.status === "done"
                                ? "border-brand bg-brand text-white"
                                : step.status === "active"
                                ? "border-brand/60 bg-white text-brand"
                                : "border-app-surface text-ink-secondary/60"
                            }`}
                          >
                            {index + 1}
                          </div>
                          <div className="max-w-[180px]">
                            <p className="text-sm font-semibold text-ink-heading">
                              {step.title}
                            </p>
                            <p className="text-xs text-ink-secondary/70">{step.caption}</p>
                          </div>
                          {!isLast && (
                            <div className="hidden h-px w-10 shrink-0 bg-app-surface/70 sm:block" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-app-surface/60 bg-white px-6 py-7 shadow-[0_14px_40px_rgba(12,43,55,0.08)]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink-secondary/70">
                      Personalised inclusions
                    </p>
                    <h2 className="text-lg font-semibold text-ink-heading">
                      What comes with your session
                    </h2>
                  </div>
                  <Clock className="h-5 w-5 text-brand" />
                </div>

                <div className="mt-5 space-y-3">
                  {detailedAddons.length > 0 ? (
                    detailedAddons.map((addon) => (
                      <div
                        key={addon.id}
                        className="flex items-center justify-between rounded-2xl bg-app-bg px-4 py-3 text-sm text-ink-heading"
                      >
                        <span>{addon.label}</span>
                        <span className="font-semibold text-brand">
                          {addon.price > 0
                            ? formatCurrency(addon.price, currencySymbol)
                            : "Included"}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="rounded-2xl bg-app-bg px-4 py-3 text-sm text-ink-secondary/80">
                      Standard consultation includes a tailored care plan and 48-hour messaging
                      support.
                    </p>
                  )}
                </div>

                <div className="mt-6 rounded-2xl bg-app-bg/80 px-5 py-4 text-sm text-ink-secondary/80">
                  <p className="font-medium text-ink-heading">Visit briefing</p>
                  <p className="mt-1 leading-relaxed">
                    {slotMeta} Our care concierges will reach out if anything changes. You
                    can manage reschedules from your dashboard up to 12 hours before the slot.
                  </p>
                </div>
              </div>
            </section>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-app-surface/70 bg-white px-5 py-6 shadow-[0_20px_50px_rgba(12,43,55,0.08)]">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-secondary/70">
                  Next steps for you
                </p>
                <ol className="mt-3 space-y-3 pl-4 text-sm text-ink-secondary/80">
                  {nextSteps.map((step, index) => (
                    <li key={`next-${index}`} className="leading-relaxed">
                      <span className="font-semibold text-brand">{index + 1}.</span>{" "}
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-3xl bg-app-elevated px-5 py-6 ring-1 ring-app-surface/60">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-secondary/70">
                  Help & support
                </p>
                <div className="mt-3 space-y-3 text-sm text-ink-secondary/85">
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-brand" />
                    <a href={`mailto:${supportEmail}`} className="hover:text-brand">
                      {supportEmail}
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-brand" />
                    <a href={`tel:${supportPhone}`} className="hover:text-brand">
                      {supportPhone}
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-brand" />
                    <span>Live concierge 7 AM – 10 PM IST</span>
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-xs text-ink-secondary/70">
                  <ShieldCheck className="h-4 w-4 text-brand" />
                  <span>
                    Need to reschedule? Do it from “My Appointments” at least 12 hours prior for a
                    full credit.
                  </span>
                </div>
              </div>
            </aside>
          </main>

          <footer className="flex flex-col gap-3 border-t border-app-surface/60 bg-white px-6 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-10">
            <div className="text-sm text-ink-secondary/70">
              Saved to your dashboard on <span className="font-semibold">{createdLabel}</span>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleViewAppointments}
                className="inline-flex items-center justify-center rounded-full bg-ink-heading px-6 py-3 text-sm font-semibold text-white transition hover:bg-ink-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
              >
                View my appointments
              </button>
              <button
                onClick={handleBookAgain}
                className="inline-flex items-center justify-center rounded-full border border-ink-heading/20 px-6 py-3 text-sm font-semibold text-ink-heading transition hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
              >
                Explore more services
              </button>
              <button
                onClick={handleDownloadReceipt}
                className="inline-flex items-center justify-center rounded-full border border-brand/50 px-6 py-3 text-sm font-semibold text-brand transition hover:bg-brand hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
              >
                Download receipt
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSuccess;
