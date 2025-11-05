import { useParams, useSearchParams, Link, useNavigate } from "react-router-dom";
import { listByType } from "@/API/mockProviders";
import ProviderCard from "./components/ProviderCard";
import ServiceFilters from "./components/ServiceFilters";
import NoResultsCard from "./components/NoResultsCard";
import { useEffect, useMemo, useState } from "react";

const VALID = new Set(["vet", "trainer", "groomer"]);
const LABEL = { vet: "Vets", trainer: "Trainers", groomer: "Groomers" };

const FAV_KEY = "petopia_provider_favs";

function useFavorites() {
  const [favs, setFavs] = useState(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem(FAV_KEY) || "[]"));
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    localStorage.setItem(FAV_KEY, JSON.stringify(Array.from(favs)));
  }, [favs]);

  const toggle = (id) =>
    setFavs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const has = (id) => favs.has(id);

  return { has, toggle };
}

export default function ServiceListPage() {
  const { type } = useParams();
  const navigate = useNavigate();
  const [sp, setSp] = useSearchParams();
  const { has, toggle } = useFavorites();

  if (!VALID.has(type)) return <div className="p-6">Invalid service type.</div>;

  const q = sp.get("q") || "";
  const city = sp.get("city") || "";
  const date = sp.get("date") || "";
  const time = sp.get("time") || "";
  const services = (sp.get("services") || "").split(",").filter(Boolean);

  const providers = useMemo(
    () => listByType(type, { q, city, date, time, services }),
    [type, q, city, date, time, services]
  );

  const updateParams = (patch = {}) => {
    const next = new URLSearchParams(sp);
    Object.entries(patch).forEach(([k, v]) => {
      if (!v) next.delete(k);
      else next.set(k, v);
    });
    setSp(next);
  };

  const clearCommonFilters = () => {
    const next = new URLSearchParams(sp);
    ["q", "city", "date", "time", "services"].forEach((k) => next.delete(k));
    setSp(next, { replace: true });
  };

  return (
    <main className="px-5 py-8 text-black">
      <div className="mt-4 flex lg:flex-row gap-6 flex-col">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-60 xl:w-80 flex-shrink-0">
          <ServiceFilters
            type={type}
            q={q}
            city={city}
            date={date}
            time={time}
            selectedServices={services}
            onChange={(patch) => {
              if (Array.isArray(patch.services)) {
                patch.services = patch.services.join(",");
              }
              updateParams(patch);
            }}
            onTypeSwitch={(nextType) =>
              navigate(`/pet-services/${nextType}?${sp.toString()}`)
            }
          />
        </aside>

        {/* Provider Results */}
        <section className="flex-1 min-w-0">
          {providers.length === 0 ? (
            <NoResultsCard
              type={type}
              labelPlural={LABEL[type]}
              onClear={clearCommonFilters}
            />
          ) : (
            <div
              className="
                grid gap-4
                sm:grid-cols-2
                md:grid-cols-2
                lg:grid-cols-2
                xl:grid-cols-3
              "
            >
              {providers.map((p) => (
                <ProviderCard
                  key={p.id}
                  provider={{
                    ...p,
                    detailPath: `/pet-services/${type}/${p.id}`,
                  }}
                  isFavorite={has(p.id)}
                  onToggleFavorite={toggle}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
