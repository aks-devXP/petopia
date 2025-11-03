// src/Pages/petservice/components/ServiceFilters.jsx
import { useState, useEffect } from "react";

export default function ServiceFilters({ q, city, onChange }) {
  const [k, setK] = useState(q);
  const [c, setC] = useState(city);

  useEffect(() => setK(q), [q]);
  useEffect(() => setC(city), [city]);

  return (
    <div className="bg-white rounded-xl p-4 shadow flex sm:flex-col flex-row gap-3">
      <input
        value={k}
        onChange={(e) => setK(e.target.value)}
        placeholder="Search by name or specialization"
        className="border rounded-lg px-3 py-2 flex-1"
      />
      <input
        value={c}
        onChange={(e) => setC(e.target.value)}
        placeholder="City (e.g., Jaipur)"
        className="border rounded-lg px-3 py-2 w-full sm:w-56"
      />
      <button
        className="rounded-lg bg-black text-white px-4 py-2"
        onClick={() => onChange({ q: k, city: c })}
      >
        Apply
      </button>
    </div>
  );
}
