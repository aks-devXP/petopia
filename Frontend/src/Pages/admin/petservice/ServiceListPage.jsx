import { getProviders, getProvidersCategories } from "@/API/ServiceProviders";
import Loader from "@/components/Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import NoResultsCard from "./components/NoResultsCard";
import ProviderCard from "./components/ProviderCard";
import ServiceFilters from "./components/ServiceFilters";

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

  // still validate type, but hooks must stay above any return
  const isValidType = VALID.has(type);

  const q = sp.get("q") || "";
  const city = sp.get("city") || "";
  const date = sp.get("date") || "";
  const time = sp.get("time") || "";
  const services = (sp.get("services") || "").split(",").filter(Boolean);

  // === Fetch provider categories (services/facilities) for filters ===
  const {
    data: categoriesResp,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useQuery({
    queryKey: ["provider-categories", type],
    queryFn: () => getProvidersCategories({ type }),
    enabled: isValidType,
    staleTime: 5 * 60 * 1000,
  });

  // normalize categories into a plain array
  const serviceOptions = useMemo(() => {
    if (!categoriesResp) return [];
    if (Array.isArray(categoriesResp)) return categoriesResp;
    if (Array.isArray(categoriesResp.data)) return categoriesResp.data;
    return [];
  }, [categoriesResp]);

  // === Fetch providers list ===
  const {
    data: providersResp,
    isLoading: providersLoading,
    isError: providersError,
    error: providersErrorObj,
  } = useQuery({
    queryKey: [
      "providers",
      {
        type,
        q,
        city,
        services,
      },
    ],
    queryFn: () =>
      getProviders({
        type,
        name: q || "",
        city: city || "",
        date: date || "",
        time: time || "",
        categories: services, 
      }),
    enabled: isValidType,
    keepPreviousData: true,
  });

  const providers = providersResp || [];

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

  if (!isValidType) {
    return <div className="p-6">Invalid service type.</div>;
  }
  
  if(categoriesLoading){
    return <Loader/>
  }
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
            availableServices={categoriesResp}
            servicesLoading={categoriesLoading}
            servicesError={categoriesError}
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
          {providersLoading ? (
            <div className="text-gray-500 text-sm">Loading {LABEL[type]}…</div>
          ) : providersError ? (
            <div className="text-red-500 text-sm">
              {providersErrorObj?.message || `Failed to load ${LABEL[type]}.`}
              <button
                className="ml-2 underline text-blue-600"
                onClick={clearCommonFilters}
              >
                Clear filters
              </button>
            </div>
          ) : providers.length === 0 ? (
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
                  key={p._id || p.id}
                  provider={{
                    ...p,
                    id: p._id || p.id,
                    detailPath: `/pet-services/${type}/${p._id || p.id}`,
                  }}
                  isFavorite={has(p._id || p.id)}
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
