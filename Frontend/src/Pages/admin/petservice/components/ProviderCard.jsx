// src/Pages/petservice/components/ProviderCard.jsx
export default function ProviderCard({ provider, children }) {
  return (
    <article className="bg-white rounded-xl p-5 shadow">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
          {provider.profilePic ? (
            <img src={provider.profilePic} alt={provider.name} className="h-full w-full object-cover" />
          ) : null}
        </div>
        <div>
          <h3 className="font-medium">{provider.name}</h3>
          <p className="text-sm text-gray-600">{provider.city}</p>
        </div>
      </div>

      <p className="mt-3 text-sm text-gray-700 line-clamp-2">{provider.about}</p>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm">⭐ {provider.rating}</span>
        <div className="flex gap-3">{children}</div>
      </div>
    </article>
  );
}

