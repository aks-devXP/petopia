// Slider.jsx
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

// Small helper
async function fetchJSON(url, opts) {
  const res = await fetch(url, opts);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export default function Slider() {
  const [items, setItems] = useState([]);
  const [idx, setIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const intervalRef = useRef(null);

  // Fetch ONLY 6 items (dogs + cats mixed) — keep it light
  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const base = import.meta.env.VITE_BACKEND_BASEURL || "/api";
        const json = await fetchJSON(`${base}/breeds?limit=6`, { signal: ac.signal });
        const list = Array.isArray(json?.data) ? json.data : [];
        setItems(list.slice(0, 6));
      } catch (e) {
        if (e.name !== "AbortError") setErr("Failed to load breeds");
      } finally {
        setLoading(false);
      }
    })();
    return () => ac.abort();
  }, []);

  const length = items.length;
  const next = () => setIdx((i) => (i + 1) % length);
  const prev = () => setIdx((i) => (i - 1 + length) % length);

  // Autoplay (4s), pause/resume on hover
  useEffect(() => {
    if (length <= 1) return;
    intervalRef.current = setInterval(next, 4000);
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length]);

  const handleMouseEnter = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
  const handleMouseLeave = () => {
    if (length > 1) intervalRef.current = setInterval(next, 4000);
  };

  if (loading) {
    return (
      <div className="w-full rounded-3xl p-6 text-center text-sm text-ink-primary shadow">
        Loading featured breeds…
      </div>
    );
  }

  if (err || length === 0) {
    return (
      <div className="w-full rounded-3xl p-6 text-center text-sm text-red-600 shadow">
        {err || "No breeds available right now."}
      </div>
    );
  }

  return (
    <div
      className="relative w-full overflow-hidden rounded-3xl shadow-md"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slides */}
      <div className="relative h-64 bg-white sm:h-80 md:h-[22rem]
      transition-all duration-200 hover:scale-[1.01] hover:cursor-pointer
      shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
        {items.map((b, i) => (
          <Link
            key={b.slug || i}
            to={`/breed-info/${b.slug}`}
            aria-hidden={i !== idx}
            tabIndex={i === idx ? 0 : -1}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === idx ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="flex h-full w-full items-center justify-center rounded-3xl bg-app-surface">
              <img
                src={b.images?.primary || b.images?.secondary || "/petopia/vite.svg"}
                alt={b.breed}
                className="max-h-full max-w-full object-contain"
                loading="lazy"
              />
            </div>
            <div
              className="absolute left-1/2 top-2 -translate-x-1/2 rounded-full
                         bg-black/60 px-3 py-1 text-xs font-semibold text-white shadow"
            >
              {b.breed}
            </div>
          </Link>
        ))}
      </div>

      {/* Controls + Dots (only if more than 1 item) */}
      {length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-800 shadow hover:bg-white"
          >
            <MdChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-800 shadow hover:bg-white"
          >
            <MdChevronRight className="text-2xl" />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {items.map((_, i) => (
              <span
                key={i}
                onClick={() => setIdx(i)}
                className={`h-2.5 w-2.5 cursor-pointer rounded-full ${
                  i === idx ? "bg-ink-primary" : "bg-white"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
