// src/Pages/petservice/components/NoResultsCard.jsx
import { PawPrint, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * NoResultsCard
 * Friendly empty-state for the providers list.
 *
 * Props:
 * - type:            "vet" | "trainer" | "groomer" (used to build the Explore link)
 * - labelPlural:     string shown in "Explore all {labelPlural}" (e.g., "Vets")
 * - onClear:         () => void  (called when "Clear filters" is clicked)
 * - suggestions:     string[] chips under the message (default three helpful hints)
 * - title:           string heading
 * - subtitle:        string paragraph below the heading
 * - exploreTo:       string route for the Explore button (defaults to `/pet-services/${type}`)
 */
export default function NoResultsCard({
  type = "vet",
  labelPlural = "Vets",
  onClear,
  suggestions = ["Try another city", "Increase distance", "Clear keywords"],
  title = "No perfect match—yet.",
  subtitle = "We’re expanding the Petopia network. Try expanding your search or explore nearby providers.",
  exploreTo,
}) {
  const exploreHref = exploreTo ?? `/pet-services/${type}`;

  return (
    <div className="mt-6 rounded-3xl bg-app-elevated border border-[var(--app-surface)]/60 p-6 sm:p-8 text-center shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-app-bg">
        <PawPrint className="h-7 w-7 text-ink-primary" />
      </div>

      <h3 className="text-xl sm:text-2xl font-quicksandBold text-ink-heading">
        {title}
      </h3>
      <p className="mt-2 text-ink-secondary/90 max-w-xl mx-auto">
        {subtitle}
      </p>

      {!!suggestions?.length && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {suggestions.map((text, i) => (
            <span
              key={`${text}-${i}`}
              className="inline-flex items-center gap-2 rounded-full bg-app-elevated px-3 py-1 text-xs text-ink-secondary ring-1 ring-brand/30"
            >
              {text}
            </span>
          ))}
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={onClear}
          className="rounded-full bg-brand text-white px-4 py-2 text-sm font-medium hover:opacity-95 focus:outline-none focus:ring-2 ring-focus-ring/60"
        >
          Clear filters
        </button>

        <Link
          to={exploreHref}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-ink-primary ring-1 ring-[var(--app-surface)]/70 hover:bg-app-bg focus:outline-none focus:ring-2 ring-focus-ring/60"
        >
          <Sparkles className="h-4 w-4" />
          Explore all {labelPlural}
        </Link>
      </div>
    </div>
  );
}
