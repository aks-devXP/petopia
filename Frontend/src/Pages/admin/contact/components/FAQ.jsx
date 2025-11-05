// src/components/FAQ.jsx
import { useState, useId, useMemo } from "react";
import { Plus } from "lucide-react";

/**
 * FAQ
 * Props:
 * - items: Array<{ id?: string, question: string, answer: string }>
 * - title?: string
 * - allowMultiple?: boolean (default: false) // one open at a time like the mock
 * - className?: string
 */
export default function FAQ({
  items = [],
  title = "FAQ",
  allowMultiple = false,
  className = "",
}) {
  const baseId = useId();

  // Controlled open state
  const [open, setOpen] = useState(() =>
    allowMultiple ? new Set() : new Set()
  );

  const isOpen = (i) => open.has(i);
  const toggle = (i) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (allowMultiple) {
        next.has(i) ? next.delete(i) : next.add(i);
      } else {
        next.clear();
        if (!prev.has(i)) next.add(i);
      }
      return next;
    });
  };

  const data = useMemo(
    () =>
      items.map((it, i) => ({
        ...it,
        _qid: `${baseId}-q-${i}`,
        _aid: `${baseId}-a-${i}`,
      })),
    [items, baseId]
  );

  return (
    <section className={`w-full py-8 sm:py-10 ${className}`}>
      <div className="mx-2 sm:mx-12 ">
        <h2 className="text-3xl sm:text-4xl font-quicksandBold text-ink-primary mb-6">
          {title}
        </h2>

        <div className="rounded-3xl bg-white ring-1 ring-black/5 overflow-hidden">
          {data.map((item, i) => {
            const openNow = isOpen(i);
            return (
              <div key={item.id ?? i} className="border-b last:border-b-0 border-slate-200">
                <button
                  id={item._qid}
                  aria-controls={item._aid}
                  aria-expanded={openNow}
                  onClick={() => toggle(i)}
                  className="
                    w-full flex items-center justify-between gap-4
                    px-4 sm:px-6 py-4 sm:py-5
                    text-left select-none
                    hover:bg-app-surface/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40
                    transition-colors
                  "
                >
                  <span className="text-[15px] sm:text-lg text-ink-primary">
                    {item.question}
                  </span>

                  {/* Plus that rotates to X */}
                  <span
                    className="
                      inline-flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center
                      rounded-full ring-1 ring-slate-200 bg-white
                      transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)]
                      shrink-0
                    "
                    aria-hidden="true"
                  >
                    <Plus
                      className={`h-4 w-4 text-ink-primary transition-transform duration-300 ${
                        openNow ? "rotate-45" : "rotate-0"
                      }`}
                    />
                  </span>
                </button>

                {/* Answer panel with smooth height/opacity */}
                <div
                  id={item._aid}
                  role="region"
                  aria-labelledby={item._qid}
                  className={`
                    grid transition-all duration-300 ease-[cubic-bezier(.2,.8,.2,1)]
                    ${openNow ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
                  `}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 sm:px-6 pb-5 text-sm sm:text-[15px] leading-6 text-ink-secondary/90">
                      {Array.isArray(item.answer) ? (
                        <ul className="list-disc pl-5 space-y-1">
                          {item.answer.map((line, idx) => (
                            <li key={idx}>{line}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="max-w-3xl">{item.answer}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
