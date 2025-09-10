import React, { useMemo, useState, useEffect } from 'react'
import campaignsSeed from '@/Data/Campaigns.json'
import CampaignCard from './components/CampaignCard'
import CampaignDetailsModal from './components/CampaignDetailsModal'

const AllCampaigns = () => {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(null)

  useEffect(() => { document.title = 'All Campaigns — Petopia' }, [])

  const campaigns = useMemo(() => campaignsSeed, [])
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return campaigns
    return campaigns.filter((c) => {
      const hay = `${c.title} ${c.organizer?.name || ''} ${c.city || ''} ${c.state || ''}`.toLowerCase()
      return hay.includes(q)
    })
  }, [campaigns, query])

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-amber-50 via-orange-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">All Campaigns</h1>
            <p className="mt-2 text-gray-600 max-w-2xl">Discover ongoing animal welfare campaigns and support the one that resonates most with you.</p>
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
          </div>
        </div>

        <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c) => (
            <CampaignCard key={c.id} campaign={c} onOpen={() => setActive(c)} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center text-gray-600 py-10">No campaigns match your search.</div>
          )}
        </section>
      </div>

      <CampaignDetailsModal open={!!active} campaign={active} onClose={() => setActive(null)} />
    </div>
  )
}

export default AllCampaigns

