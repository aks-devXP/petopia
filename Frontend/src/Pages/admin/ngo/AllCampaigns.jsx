import { getAllCampaigns } from '@/API/CampaignAPI'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useMemo, useState } from 'react'
import CampaignCard from './components/CampaignCard'
import CampaignDetailsModal from './components/CampaignDetailsModal'

// tiny debounce hook
function useDebouncedValue(value, delay = 350) {
  const [v, setV] = React.useState(value)
  React.useEffect(() => {
    const t = setTimeout(() => setV(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return v
}

const AllCampaigns = () => {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(null)

  useEffect(() => { document.title = 'All Campaigns — Petopia' }, [])

  const debouncedQ = useDebouncedValue(query, 350)
  const page = 1
  const limit = 12

  // Fetch from backend
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ['campaigns', { page, limit, search: debouncedQ }],
    queryFn: () =>
      getAllCampaigns({
        page,
        limit,
        ...(debouncedQ ? { q: debouncedQ } : {})
      }),
    keepPreviousData: true
  })

  const campaigns = data?.data ?? []

  // Optional extra client-side filter (keeps UX snappy if backend q is basic)
  const filtered = useMemo(() => {
    const q = debouncedQ.trim().toLowerCase()
    if (!q) return campaigns
    return campaigns.filter((c) => {
      const hay = `${c.title ?? ''} ${c.organizer?.name ?? ''} ${c.city ?? ''} ${c.state ?? ''}`.toLowerCase()
      return hay.includes(q)
    })
  }, [campaigns, debouncedQ])

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-amber-50 via-orange-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">All Campaigns</h1>
            <p className="mt-2 text-gray-600 max-w-2xl">
              Discover ongoing animal welfare campaigns and support the one that resonates most with you.
            </p>
          </div>
          <div className="w-full sm:w-80">
            <label className="block text-sm font-medium text-gray-700" htmlFor="search">Search campaigns</label>
            <input
              id="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, city, organizer..."
              className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {isFetching && <p className="mt-1 text-xs text-gray-500">Searching…</p>}
          </div>
        </div>

        {/* Loading / Error states */}
        {isLoading && (
          <div className="mt-8 text-center text-gray-600">Loading campaigns…</div>
        )}
        {isError && (
          <div className="mt-8 text-center text-red-500">
            {error?.message || 'Failed to load campaigns.'}{' '}
            <button onClick={() => refetch()} className="text-orange-600 underline underline-offset-2">
              Retry
            </button>
          </div>
        )}

        {!isLoading && !isError && (
          <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c) => (
              <CampaignCard key={c._id || c.id} campaign={c} onOpen={() => setActive(c)} />
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full text-center text-gray-600 py-10">
                No campaigns match your search.
              </div>
            )}
          </section>
        )}
      </div>

      <CampaignDetailsModal open={!!active} campaign={active} onClose={() => setActive(null)} />
    </div>
  )
}

export default AllCampaigns
