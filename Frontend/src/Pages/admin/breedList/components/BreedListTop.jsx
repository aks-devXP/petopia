// BreedListTop.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import SpeciesRow from './BreedCard';

/* ----------------- helpers ----------------- */
async function fetchJSON(url, opts) {
  const res = await fetch(url, opts);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// Debounce (unchanged)
const useDebounced = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
};

// Resolve API base for BOTH deployment and localhost
const API_BASE = (() => {
  const raw = import.meta.env?.VITE_BACKEND_BASEURL;
  const base = raw && raw.trim() !== '' ? raw : '/api';
  return base.replace(/\/+$/, ''); // strip trailing slash
})();

/* ----------------- Main ----------------- */
export default function BreedListTop() {
  const navigate = useNavigate();

  // Search UI (kept)
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const debounced = useDebounced(query, 250);
  const dropdownRef = useRef(null);

  // Data + states
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [favSearch, setFavSearch] = useState(false);

  // Fetch breeds (works on deploy & localhost)
  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setErr('');
        const json = await fetchJSON(`${API_BASE}/breeds?limit=100`, { signal: ac.signal });
        setData(Array.isArray(json?.data) ? json.data : []);
      } catch (e) {
        if (e.name !== 'AbortError') setErr('Failed to load breeds');
      } finally {
        setLoading(false);
      }
    })();
    return () => ac.abort();
  }, []);

  // Suggestions (also via API_BASE)
  useEffect(() => {
    const ac = new AbortController();
    const q = debounced.trim();
    if (!q) {
      setSuggestions([]);
      return () => ac.abort();
    }
    (async () => {
      try {
        const json = await fetchJSON(
          `${API_BASE}/breeds?q=${encodeURIComponent(q)}&limit=12`,
          { signal: ac.signal }
        );
        setSuggestions(Array.isArray(json?.data) ? json.data : []);
      } catch {
        /* ignore */
      }
    })();
    return () => ac.abort();
  }, [debounced]);

  // Group by species
  const group = useMemo(() => {
    const by = { dog: [], cat: [], bird: [], fish: [], cattle: [] };
    for (const b of data) {
      const sp = (b.species || '').toLowerCase();
      if (by[sp]) by[sp].push(b);
    }
    return by;
  }, [data]);

  return (
    <section className="w-full bg-[#0b1437] rounded-t-md text-app-bg">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10 md:py-12">
        {/* ---- Heading ---- */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-nunitoBlack sm:text-3xl md:text-5xl text-app-bg">
              Paws & Personalities
              <br /> Learn About Every Breed
            </h1>
            <div className="mt-2 h-1 w-28 rounded bg-yellow-400" />
            <div className="mt-3 inline-block text-xl md:text-2xl font-quicksandBold text-yellow-400">
              Checkout More Facts
            </div>
          </div>
        </div>

        {/* ---- Search + Favourite toggle ---- */}
        <div className="relative mb-8">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search breed name..."
            className="w-full rounded-3xl border-2 border-yellow-400 bg-white px-5 py-3 pr-14
                       text-sm text-gray-900 placeholder-gray-500 outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <button
            type="button"
            onClick={() => setFavSearch((v) => !v)}
            aria-label={favSearch ? 'Remove from favourites' : 'Add to favourites'}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20
                       p-2 rounded-full bg-white ring-1 ring-black/5
                       hover:ring-black/10 hover:shadow transition"
          >
            <Heart className={`w-5 h-5 ${favSearch ? 'fill-pink-500 text-pink-500' : 'text-ink-heading'}`} />
          </button>

          {suggestions.length > 0 && (
            <div
              ref={dropdownRef}
              className="absolute z-10 mt-2 max-h-72 w-full overflow-auto rounded-xl border border-gray-200 bg-white p-1 shadow-xl"
            >
              {suggestions.map((s) => (
                <div
                  key={s.slug}
                  onClick={() => navigate(`/breed-info/${s.slug}`)}
                  className="flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-gray-100"
                >
                  <img
                    src={s.images?.primary || s.images?.secondary || '/petopia/vite.svg'}
                    alt={s.breed}
                    className="h-10 w-14 rounded object-cover"
                    loading="lazy"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900">{s.breed}</div>
                    <div className="text-xs text-gray-600">{s.species}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ---- Rows ---- */}
        {loading && <div className="mt-6 text-sm text-gray-300">Loading featured breeds…</div>}
        {err && <div className="mt-6 text-sm text-red-400">{err}</div>}

        {!loading && !err && (
          <div className="space-y-8 sm:space-y-10">
            <SpeciesRow title="Dog" items={group.dog} />
            <SpeciesRow title="Cat" items={group.cat} />
            <SpeciesRow title="Bird" items={group.bird} />
            <SpeciesRow title="Fish" items={group.fish} />
            <SpeciesRow title="Cattle" items={group.cattle} />
          </div>
        )}
      </div>
    </section>
  );
}
