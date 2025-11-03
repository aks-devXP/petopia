import React from "react";
import { useNavigate } from "react-router-dom";
import PawButton from "@components/buttons/PawButton";
import { Stethoscope, Scissors, Dumbbell } from "lucide-react";

export default function ServiceHero({
  headline = (
    <>
      Book trusted pet services<br />with confidence
    </>
  ),
  helper = "From vet visits to grooming and training, Petopia connects you with trusted professionals—making pet care seamless and stress-free.",
  promo = {
    title: "Ready to book?",
    subtitle:
      "Choose a service and pick a time that works. We’ll handle the reminders, you enjoy the calm.",
    cta: "Get Started",
    href: "#book",
  },
  // Override these to customize, but defaults match Petopia’s core services
  steps = [
    {
      id: "vet",
      iconBg: "bg-rose-200",
      icon: <Stethoscope className="h-5 w-5 text-ink-heading" />,
      title: "Vet — Expert medical care",
      desc:
        "Book check-ups, vaccinations, and follow-ups with licensed veterinarians. Keep records tidy and never miss a reminder.",
    },
    {
      id: "groomer",
      iconBg: "bg-blue-200",
      icon: <Scissors className="h-5 w-5 text-ink-heading" />,
      title: "Groomer — Comfort & Hygiene",
      desc:
        "Book grooming sessions that make your pet look and feel their best. From baths to trims, our experts know how to care for every coat and temperament.",
    },
    {
      id: "trainer",
      iconBg: "bg-amber-200",
      icon: <Dumbbell className="h-5 w-5 text-ink-heading" />,
      title: "Trainer — Better habits, happier days",
      desc:
        "From basic obedience to specialized behavior sessions, certified trainers help your pet learn with patience and care.",
    },
  ],
}) {
  // Normalize to ensure consistent shape even if props differ
  const normalizedSteps = (steps ?? []).map((s, i) => ({
    key: s.id ?? s.key ?? `${s.title ?? "service"}-${i}`,
    iconBg: s.iconBg ?? "bg-neutral-200",
    icon: s.icon,
    title: s.title ?? "Service",
    description: s.description ?? s.desc ?? "",
  }));
  const navigate = useNavigate();
  return (
    <div className="bg-app-surface mx-2 sm:mx-12 rounded-3xl px-4 sm:px-8 lg:px-20 py-6 md:py-24 shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-32 items-start">
        {/* LEFT */}
        <div className="flex flex-col justify-center h-full space-y-8">

          <div className="space-y-8">
            {/* Headline */}
            <h2 className="text-3xl font-quicksandBold sm:text-4xl leading-tight text-ink-heading">
              {headline}
            </h2>
            {/* Helper */}
            <p className="text-ink-secondary max-w-md">{helper}</p>
          </div>

          {/* Promo card */}
          <div className="rounded-2xl bg-app-bg p-5 sm:p-6 shadow-sm relative overflow-hidden ring-1 ring-black/5">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-ink-heading">
                {promo.title}
              </h3>
              <p className="text-sm text-ink-secondary">{promo.subtitle}</p>
            </div>

            <div className="mt-5">
              <PawButton 
                text={promo.cta} 
                onClick={() => navigate("/vet")} 
              />
            </div>

            {/* soft decorative blobs */}
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-white/30" />
            <div className="pointer-events-none absolute -top-6 -left-6 h-20 w-20 rounded-full bg-white/25" />
          </div>
        </div>

        {/* RIGHT — Service cards (elevated) */}
        <div className="order-1 md:order-2 flex-1 w-full space-y-6">
          {normalizedSteps.map((step) => (
            <div
              key={step.key}
              className="
                bg-app-bg rounded-[28px] p-6 sm:p-8
                ring-1 ring-neutral-200
                shadow-[0_10px_30px_rgba(0,0,0,0.1)]
                hover:shadow-[0_16px_40px_rgba(0,0,0,0.15)]
                transition-shadow duration-200 ease-in-out
              "
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex-shrink-0 w-12 h-12 ${step.iconBg} rounded-2xl flex items-center justify-center shadow-sm`}
                >
                  {step.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-ink-heading mb-1 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-ink-secondary text-sm">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
