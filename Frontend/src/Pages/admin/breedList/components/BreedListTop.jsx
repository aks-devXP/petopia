import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Carousel from './Carousel';

// Simple debounce
const useDebounced = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
};

// Fetch helper (uses Vite dev proxy for /api in dev)
async function fetchJSON(url, opts) {
  const res = await fetch(url, opts);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export default function BreedListTop() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const debounced = useDebounced(query, 250);
  const dropdownRef = useRef(null);

  // Load some featured items for carousels
  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setErr('');
        const json = await fetchJSON(`${import.meta.env.VITE_BACKEND_BASEURL}/breeds?limit=100`, { signal: ac.signal });
        setData(Array.isArray(json.data) ? json.data : []);
      } catch (e) {
        if (e.name !== 'AbortError') setErr('Failed to load breeds');
      } finally {
        setLoading(false);
      }
    })();
    return () => ac.abort();
  }, []);

  // Search suggestions
  useEffect(() => {
    const ac = new AbortController();
    if (!debounced.trim()) { setSuggestions([]); return () => ac.abort(); }
    (async () => {
      try {
        const json = await fetchJSON(`/api/breeds?q=${encodeURIComponent(debounced)}&limit=8`, { signal: ac.signal });
        setSuggestions(Array.isArray(json.data) ? json.data : []);
      } catch (_) { /* ignore */ }
    })();
    return () => ac.abort();
  }, [debounced]);

  // Split by species and pick some items for each carousel
  const dogs = useMemo(() => data.filter(b => (b.species || '').toLowerCase() === 'dog').slice(0, 6), [data]);
  const cats = useMemo(() => data.filter(b => (b.species || '').toLowerCase() === 'cat').slice(0, 6), [data]);

  return (
    <section className="w-full bg-[#0b1437] rounded-t-md text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10 md:py-12">
        {/* Heading */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl leading-tight">
              Paws & Personalities
              <br /> Learn About Every Breed
            </h1>
            <div className="mt-2 h-1 w-28 rounded bg-yellow-400" />
            <Link to="/breed-info" className="mt-3 inline-block text-xl font-extrabold text-yellow-400">
              Checkout More Facts
            </Link>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search breed name..."
            className="w-full rounded-3xl border-2 border-yellow-400 bg-white px-5 py-3 text-sm text-gray-900 placeholder-gray-500 outline-none focus:ring-2 focus:ring-yellow-400"
          />
          {suggestions.length > 0 && (
            <div
              ref={dropdownRef}
              className="absolute z-20 mt-2 max-h-72 w-full overflow-auto rounded-xl border border-gray-200 bg-white p-1 shadow-xl"
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

        {/* Carousels */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Carousel items={dogs} />
          <Carousel items={cats} />
        </div>

        {/* Loading/Error states */}
        {loading && (
          <div className="mt-6 text-sm text-gray-300">Loading featured breeds…</div>
        )}
        {err && (
          <div className="mt-6 text-sm text-red-400">{err}</div>
        )}
      </div>
    </section>
  );
}

