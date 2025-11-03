// src/Pages/petservice/ServiceListPage.jsx
import { useParams, useSearchParams, Link } from "react-router-dom";
import { listByType } from "@/API/mockProviders";
import ProviderCard from "./components/ProviderCard";
import ServiceFilters from "./components/ServiceFilters";

const VALID = new Set(["vet", "trainer", "groomer"]);
const LABEL = { vet: "Vets", trainer: "Trainers", groomer: "Groomers" };

export default function ServiceListPage() {
  const { type } = useParams();
  const [sp, setSp] = useSearchParams();
  if (!VALID.has(type)) return <div className="p-6">Invalid service type.</div>;

  const q = sp.get("q") || "";
  const city = sp.get("city") || "";

  const providers = listByType(type, { q, city });

  return (
    <main className="px-5 py-8 text-black">
      <header className="mb-4">
        <h1 className="text-2xl font-semibold">{LABEL[type]}</h1>
      </header>

      {/* 
        Responsive container:
        - base/sm: column (filters on top)
        - md+: row (filters left, list right)
      */}
      <div className="mt-4 flex flex-col gap-6 md:flex-row">
        {/* Filters */}
        <aside
          className="
            md:w-72 lg:w-80 shrink-0
          "
        >
          {/* 
            Filter layout wrapper:
            - base: block (safe default)
            - sm: 3-col grid (compact top bar)
            - md+: back to block (rows on the left)
          */}
          <div className="grid grid-cols-3 sm:flex sm:flex-cols sm:gap-3 md:block">
            {/* If your ServiceFilters supports className, these wrapper classes will augment it.
               If not, no functionality breaks—layout still respects the outer wrapper. */}
            <ServiceFilters
              q={q}
              city={city}
              onChange={(next) => {
                const s = new URLSearchParams(sp);
                if (next.q !== undefined) s.set("q", next.q);
                if (next.city !== undefined) s.set("city", next.city);
                setSp(s);
              }}
            />
          </div>
        </aside>

        {/* Results list */}
        <section className="flex-1">
          {providers.length === 0 ? (
            <div className="text-gray-600">No results. Try another city or keyword.</div>
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
                    to={`/pet-service/${type}/${p.id}`}
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
