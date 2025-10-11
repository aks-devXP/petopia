import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function BreedList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [q, setQ] = useState(""); // search query (case-insensitive)

  // fetch breeds (debounced when q changes)
  useEffect(() => {
    const ac = new AbortController();
    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setErr("");

        const url = q.trim()
          ? `/api/breeds?q=${encodeURIComponent(q.trim())}`
          : `/api/breeds`;

        const res = await fetch(url, { signal: ac.signal });
        if (!res.ok) throw new Error(`Failed to load breeds (${res.status})`);
        const json = await res.json();
        setItems(Array.isArray(json.data) ? json.data : []);
      } catch (e) {
        if (e.name !== "AbortError") setErr(e.message || "Failed to load breeds");
      } finally {
        setLoading(false);
      }
    }, 300); // debounce 300ms

    return () => {
      clearTimeout(timer);
      ac.abort();
    };
  }, [q]);

  const grouped = useMemo(() => {
    // group by species, sort groups and items
    const bySpecies = items.reduce((acc, b) => {
      const key = (b.species || "Other").trim();
      if (!acc[key]) acc[key] = [];
      acc[key].push(b);
      return acc;
    }, /** @type {Record<string, any[]>} */ ({}));

    // sort breeds inside each species
    Object.keys(bySpecies).forEach((sp) => {
      bySpecies[sp].sort((a, b) =>
        (a.breed || "").localeCompare(b.breed || "", undefined, { sensitivity: "base" })
      );
    });

    // sort species groups (Dogs, then Cats, then others alphabetically)
    const orderHint = { Dog: 0, Cat: 1 };
    const speciesOrder = Object.keys(bySpecies).sort((a, b) => {
      const pa = orderHint.hasOwnProperty(a) ? orderHint[a] : 2;
      const pb = orderHint.hasOwnProperty(b) ? orderHint[b] : 2;
      if (pa !== pb) return pa - pb;
      return a.localeCompare(b, undefined, { sensitivity: "base" });
    });

    return { bySpecies, speciesOrder };
  }, [items]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-end justify-between gap-4 mb-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Breeds</h1>
          <p className="text-sm text-gray-500">
            {loading ? "Loading…" : `${items.length} result${items.length !== 1 ? "s" : ""}`}
          </p>
        </div>

        {/* Search box */}
        <div className="w-full sm:w-80">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search by breed name
          </label>
          <input
            type="text"
            value={q}
            placeholder="e.g., German Shepherd"
            onChange={(e) => setQ(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm outline-none focus:border-brand-500"
          />
        </div>
      </div>

      {/* states */}
      {loading && <div className="p-6">Loading breeds…</div>}
      {!loading && err && <div className="p-6 text-red-600">{err}</div>}
      {!loading && !err && items.length === 0 && (
        <div className="p-6">No breeds found{q ? ` for “${q}”` : ""}.</div>
      )}

      {!loading && !err && items.length > 0 && (
        <div className="space-y-10">
          {grouped.speciesOrder.map((species) => (
            <section key={species}>
              <h2 className="text-xl font-semibold mb-3">
                {species}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {grouped.bySpecies[species].map((b) => (
                  <Link
                    key={b.id}
                    to={`/breed-info/${b.slug}`}
                    className="rounded-2xl bg-white p-4 shadow hover:shadow-md transition"
                  >
                    <img
                      className="w-full h-44 object-cover rounded-xl"
                      src={
                        b.images?.primary ||
                        b.images?.secondary ||
                        "https://via.placeholder.com/600x400"
                      }
                      alt={b.breed}
                      loading="lazy"
                    />
                    <div className="mt-3">
                      <div className="font-semibold">{b.breed}</div>
                      <div className="text-sm text-gray-500">{b.species}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
