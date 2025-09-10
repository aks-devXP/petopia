import React, { useEffect, useMemo, useState } from 'react'
import AdoptHeader from './components/AdoptHeader'
import AdoptionFilters from './components/AdoptionFilters'
import AdoptionGrid from './components/AdoptionGrid'
import AdoptionListForm from './components/AdoptionListForm'
import { GetAdoptionPets } from '@/API/PetApi'
import seedPets from '@/Data/AdoptionPets.json'

const Adopt = () => {
  const [filter, setFilter] = useState({ state: '', q: '' })
  const [fetched, setFetched] = useState([])
  const [loading, setLoading] = useState(false)

  const states = useMemo(() => {
    const set = new Set(seedPets.map((p) => p.state).filter(Boolean))
    return Array.from(set).sort()
  }, [])

  const combined = useMemo(() => [...seedPets, ...fetched], [fetched])

  const filtered = useMemo(() => {
    const q = filter.q?.toLowerCase?.() || ''
    return combined.filter((p) => {
      const byState = !filter.state || (p.state || '').toLowerCase() === filter.state.toLowerCase()
      if (!byState) return false
      if (!q) return true
      const hay = `${p.name} ${p.breed} ${p.category}`.toLowerCase()
      return hay.includes(q)
    })
  }, [combined, filter])

  useEffect(() => { document.title = 'Adopt a Pet — Petopia' }, [])

  useEffect(() => {
    const run = async () => {
      setLoading(true)
      try {
        const data = await GetAdoptionPets()
        setFetched(Array.isArray(data) ? data : [])
      } finally { setLoading(false) }
    }
    run()
  }, [])

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-orange-50 via-rose-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <AdoptHeader />
        <section className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <AdoptionFilters filter={filter} setFilter={setFilter} states={states} />
            <AdoptionGrid pets={filtered} loading={loading} />
          </div>
          <div className="lg:col-span-1 space-y-4">
            <AdoptionListForm />
            <div className="rounded-xl bg-rose-50 p-4 ring-1 ring-rose-100">
              <h4 className="font-semibold text-rose-900">Tips for a smooth adoption</h4>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-rose-900/80">
                <li>Complete your profile with city and phone.</li>
                <li>Be honest about pet temperament and needs.</li>
                <li>Share recent photos and vet records if available.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Adopt
