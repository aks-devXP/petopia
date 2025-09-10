import React, { useMemo, useState } from 'react'
import ngosData from '@/Data/NGOs.json'
import NGOTile from './components/NGOTile'
import NGODetailsModal from './components/NGODetailsModal'
import { motion } from 'framer-motion'

const uniqueStates = (arr) => Array.from(new Set(arr.map((n) => n.state).filter(Boolean))).sort()

const Nearby = () => {
  const [filter, setFilter] = useState({ state: '', q: '' })
  const [selected, setSelected] = useState(null)

  const states = useMemo(() => uniqueStates(ngosData), [])

  const filtered = useMemo(() => {
    const q = filter.q.trim().toLowerCase()
    return ngosData.filter((n) => {
      const stateOk = !filter.state || n.state === filter.state
      const text = `${n.name} ${n.city} ${n.owner}`.toLowerCase()
      const qOk = !q || text.includes(q)
      return stateOk && qOk
    })
  }, [filter])

  return (
    <div className="min-h-screen bg-blue-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-700">
            Find an NGO Nearby
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Explore trusted animal welfare NGOs near you. Filter by state or search by name or city.
          </p>
        </motion.div>

        <div className="mt-8 rounded-xl bg-white/95 backdrop-blur shadow-sm ring-1 ring-gray-200 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <select
                value={filter.state}
                onChange={(e) => setFilter((f) => ({ ...f, state: e.target.value }))}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-200"
              >
                <option value="">All states</option>
                {states.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                value={filter.q}
                onChange={(e) => setFilter((f) => ({ ...f, q: e.target.value }))}
                placeholder="Search by name, city, or owner"
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-200"
              />
            </div>
          </div>
        </div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((ngo) => (
            <motion.div key={ngo.id} variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}>
              <NGOTile ngo={ngo} onClick={setSelected} />
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center text-gray-300 py-12">
              No NGOs match your filters.
            </div>
          )}
        </motion.div>
      </div>

      <NGODetailsModal open={!!selected} ngo={selected} onClose={() => setSelected(null)} />
    </div>
  )
}

export default Nearby
