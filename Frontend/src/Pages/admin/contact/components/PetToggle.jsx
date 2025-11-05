import React from "react";
import { motion } from "framer-motion";

export default function PetToggle({ value = "contact", onChange }) {
  const options = [
    { key: "contact", label: "Contact Us" },
    { key: "about", label: "About Us" },
  ];

  return (
    <div className="inline-block rounded-2xl bg-app-bg p-3">
      <div className="relative flex gap-2 rounded-full bg-app-surface p-1 shadow-inner">
        {options.map((opt) => {
          const isActive = value === opt.key;
          return (
            <button
              key={opt.key}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange?.(opt.key)}
              className="relative z-10 min-w-32 cursor-pointer select-none rounded-full px-5 py-2 font-semibold outline-none"
            >
              {isActive && (
                <motion.div
                  layoutId="pet-toggle-pill"
                  className="absolute inset-0 rounded-full bg-app-elevated shadow"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              )}

              <motion.span
                className={`relative block text-center ${
                  isActive ? "text-ink-primary" : "text-ink-secondary"
                }`}
                animate={{ scale: isActive ? 1 : 0.96 }}
                transition={{ type: "spring", stiffness: 500, damping: 26 }}
                whileTap={{ scale: 0.94 }}
              >
                {opt.label}
              </motion.span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
