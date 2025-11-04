import { useParams, useSearchParams, Link, useNavigate } from "react-router-dom";
import { PawPrint, Search as SearchIcon, Sparkles } from "lucide-react";
import { listByType } from "@/API/mockProviders";
import ProviderCard from "./components/ProviderCard";
import ServiceFilters from "./components/ServiceFilters";

const VALID = new Set(["vet", "trainer", "groomer"]);
const LABEL = { vet: "Vets", trainer: "Trainers", groomer: "Groomers" };

export default function ServiceListPage() {
  const { type } = useParams();
  const navigate = useNavigate();
  const [sp, setSp] = useSearchParams();

  if (!VALID.has(type)) return <div className="p-6">Invalid service type.</div>;

  // read filters
  const q = sp.get("q") || "";
  const city = sp.get("city") || "";
  const pin = sp.get("pin") || "";
  const maxKm = sp.get("maxKm") || ""; // "" means no limit
  const services = (sp.get("services") || "").split(",").filter(Boolean);

  const providers = listByType(type, { q, city, pin, maxKm, services });

  // convenience updater
  const updateParams = (patch = {}) => {
    const next = new URLSearchParams(sp);
    Object.entries(patch).forEach(([k, v]) => {
      if (v === undefined || v === null || v === "") next.delete(k);
      else next.set(k, v);
    });
    setSp(next);
  };

  const clearCommonFilters = () => {
    const next = new URLSearchParams(sp);
    ["q", "city", "pin", "maxKm", "services"].forEach((k) => next.delete(k));
    setSp(next, { replace: true });
  };

  return (
    <main className="px-5 py-8 text-black">

      <div className="mt-4 flex flex-col gap-6 md:flex-row">
        {/* Filters (left on md+, top on small) */}
        <aside className="md:w-72 lg:w-80 w-full">
          <ServiceFilters
            type={type}
            q={q}
            city={city}
            pin={pin}
            maxKm={maxKm}
            selectedServices={services}
            onChange={(patch) => {
              // services comes as array from child; convert to comma list
              const normalized =
                patch.services ? { ...patch, services: patch.services.join(",") } : patch;
              updateParams(normalized);
            }}
            onTypeSwitch={(nextType) => {
              // keep search params when switching type
              navigate(`/pet-services/${nextType}?${sp.toString()}`);
            }}
          />
        </aside>

        {/* Results */}
        <section className="flex-1">
          {providers.length === 0 ? (
            <div className="mt-6 rounded-3xl bg-app-elevated border border-[var(--app-surface)]/60 p-6 sm:p-8 text-center shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-app-bg">
                <PawPrint className="h-7 w-7 text-ink-primary" />
              </div>

              <h3 className="text-xl sm:text-2xl font-quicksandBold text-ink-heading">
                No perfect match—yet.
              </h3>
              <p className="mt-2 text-ink-secondary/90 max-w-xl mx-auto">
                We’re expanding the Petopia network every week. Try widening your search or explore nearby providers.
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-app-bg px-3 py-1 text-xs text-ink-secondary ring-1 ring-[var(--app-surface)]/70">
                  <SearchIcon className="h-3.5 w-3.5" />
                  Try another city
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-app-bg px-3 py-1 text-xs text-ink-secondary ring-1 ring-[var(--app-surface)]/70">
                  Increase distance
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-app-bg px-3 py-1 text-xs text-ink-secondary ring-1 ring-[var(--app-surface)]/70">
                  Clear keywords
                </span>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={clearCommonFilters}
                  className="rounded-xl bg-brand text-white px-4 py-2 text-sm font-medium hover:opacity-95 focus:outline-none focus:ring-2 ring-focus-ring/60"
                >
                  Clear filters
                </button>

                <Link
                  to={`/pet-services/${type}`}
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm text-ink-primary ring-1 ring-[var(--app-surface)]/70 hover:bg-app-bg focus:outline-none focus:ring-2 ring-focus-ring/60"
                >
                  <Sparkles className="h-4 w-4" />
                  Explore all {LABEL[type]}
                </Link>
              </div>
            </div>
          ) : (
            <div
              className="
                grid gap-4
                md:grid-cols-1
                lg:grid-cols-2
              "
            >
              {providers.map((p) => (
                <ProviderCard key={p.id} provider={p}>
                  <Link
                    to={`/pet-services/${type}/${p.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View details
                  </Link>
                </ProviderCard>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
