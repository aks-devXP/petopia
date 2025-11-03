// src/Pages/petservice/ServiceDetailPage.jsx
import { useParams, Link, useNavigate } from "react-router-dom";
import { getOne } from "@/API/mockProviders";

export default function ServiceDetailPage() {
  const { type, id } = useParams();
  const nav = useNavigate();
  const provider = getOne(type, id);

  if (!provider) {
    return (
      <main className="px-5 py-8">
        <p className="mb-4">Provider not found.</p>
        <button className="underline" onClick={() => nav(-1)}>Go back</button>
      </main>
    );
  }

  return (
    <main className="px-5 py-8">
      <Link to={`/pet-service/${type}`} className="text-blue-600 hover:underline">← Back to list</Link>

      <section className="mt-4 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow">
          <h1 className="text-2xl font-semibold">{provider.name}</h1>
          <p className="text-sm text-gray-600">{provider.city}</p>
          <p className="mt-3">{provider.about}</p>
          <p className="mt-2 text-sm text-gray-700">
            Specialization: <span className="font-medium">{provider.specialization || "—"}</span>
          </p>
          <p className="mt-1">Rating: {provider.rating}</p>
        </div>

        <aside className="bg-white rounded-xl p-5 shadow">
          <button className="w-full rounded-lg bg-black text-white py-2">Book</button>
        </aside>
      </section>
    </main>
  );
}
