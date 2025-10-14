import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import AnatomySection from './components/AnatomySection';
import BasicInfo from './components/BasicInfo';
import CareTips from './components/CareTips';
import RatingSection from './components/RatingSection';

function BreedInfo() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const res = await fetch(`${import.meta.env.VITE_BACKEND_BASEURL}/breeds/${slug}`, { signal: ac.signal });
        if (!res.ok) throw new Error(`Failed to load breed (${res.status})`);
        const json = await res.json();
        setData(json);
      } catch (e) {
        if (e.name !== 'AbortError') setErr(e.message || 'Failed to load breed');
      } finally {
        setLoading(false);
      }
    })();
    return () => ac.abort();
  }, [slug]);

  if (loading) return <div className="p-6">Loading…</div>;
  if (err) return (
    <div className="p-6">
      <p className="text-red-600 mb-3">{err}</p>
      <Link to="/breed-info" className="text-brand-600 underline">Back to all breeds</Link>
    </div>
  );
  if (!data) return null;

  return (
    <div className="container mx-auto p-6 space-y-8 bg-[#f5f5dc]">

      <BasicInfo data={data} />
      <div className="flex flex-col gap-8 p-6 bg-[#D8DBBD] rounded-2xl">
        <RatingSection data={data} />
        <AnatomySection data={data} />
        <CareTips data={data} />
      </div>
    </div>
  );
}

export default BreedInfo;
