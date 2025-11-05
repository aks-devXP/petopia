import React, { useState } from 'react';
import ContactUs from "./components/ContactUs";
import FAQ from "./components/FAQ";
import AboutUs from './components/AboutUs';
import PetToggle from './components/PetToggle';

export default function index() {
  const [section, setSection] = useState("contact"); // default: Contact Us

  const faqItems = [
    {
      question: "How do I know the provider is trustworthy?",
      answer: [
        "Every provider on Petopia goes through a verification and approval process before appearing publicly.",
        "Verified providers have a badge on their profile along with any relevant licenses/certifications.",
        "You can also check: average rating, number of reviews, and photos of workspace or past work.",
        "If something looks off, you can report it directly from the profile.",
      ],
    },
    {
      question: "What if the provider has multiple branches? Which one am I booking?",
      answer:
        "Each branch registers separately on Petopia. When you book, you’re booking that specific location, with its own pricing, staff, and availability. No confusion or ‘come to our other centre’ surprises.",
    },
    {
      question: "Do prices vary depending on the service?",
      answer:
        "Yes. Each provider lists their own pricing per service (e.g., Grooming, Vaccination, Training). You can compare providers fairly based on exactly what you need—no vague ‘starting from ₹…’ fluff.",
    },
    {
      question: "Can I book home visits?",
      answer:
        "If the provider supports Home Service, it’s clearly shown on the profile under ‘Modes of Service’ (Home / Clinic / Remote / Solo). Choose the service + date, enter your location. If ‘Home’ isn’t listed, that provider doesn’t offer doorstep service.",
    },
    {
      question: "What happens if I need to cancel my appointment?",
      answer:
        "Cancel directly from your Petopia dashboard. Status moves to Cancelled and the provider is notified instantly. Some providers may have rules (time window or small fee)—we show them before you confirm.",
    },
  ];

  return (
    <div>
      <div className="flex justify-center">
        <PetToggle value={section} onChange={setSection} />
      </div>

      {section === "contact" ? (
        <>
          <ContactUs />
          <FAQ items={faqItems} allowMultiple={false} />
        </>
      ) : (
        <AboutUs />
      )}
    </div>
  );
}
