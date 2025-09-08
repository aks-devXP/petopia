import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const rupee = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n || 0)

const FeaturedCard = ({ c, onOpen, i }) => {
  const pct = Math.min(100, Math.round(((c.raised || 0) / (c.goal || 1)) * 100))
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * i, duration: 0.45 }}
      className="group relative overflow-hidden rounded-3xl bg-white ring-1 ring-black/5 shadow-md hover:shadow-xl"
    >
      <div className="relative h-56 w-full">
        <img src={c.images?.[0]} alt={c.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
          <div className="text-white">
            <div className="text-sm font-medium opacity-90">{c.city}{c.state ? `, ${c.state}` : ''}</div>
            <h3 className="text-lg font-semibold leading-tight line-clamp-2">{c.title}</h3>
          </div>
          <button
            onClick={() => onOpen(c)}
            className="inline-flex items-center gap-2 rounded-lg bg-white/90 px-3 py-1.5 text-sm font-semibold text-gray-900 shadow hover:bg-white"
          >
            View <FaArrowRight/>
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-orange-500 to-rose-500" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-2 flex items-center justify-between text-sm text-gray-700">
          <span className="font-semibold text-gray-900">{rupee(c.raised)} raised</span>
          <span className="text-gray-500">of {rupee(c.goal)}</span>
        </div>
        {c.tagline && <p className="mt-2 text-sm text-gray-600 line-clamp-2">{c.tagline}</p>}
      </div>
    </motion.div>
  )
}

const FeaturedCampaigns = ({ campaigns, onOpen }) => {
  const top = useMemo(() => {
    const scored = [...campaigns].map((c) => ({ ...c, _score: (c.raised || 0) / (c.goal || 1) }))
    scored.sort((a, b) => b._score - a._score)
    return scored.slice(0, 3)
  }, [campaigns])

  return (
    <section className="py-12">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">Top Campaigns</h2>
          <p className="mt-1 text-gray-600">Highlighted drives making strong progress right now.</p>
        </div>
        <Link to="/ngo/campaigns" className="text-sm font-semibold text-[#704214] hover:text-[#FF8C42]">View all</Link>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {top.map((c, i) => (
          <FeaturedCard key={c.id} c={c} i={i} onOpen={onOpen} />
        ))}
      </div>
    </section>
  )
}

export default FeaturedCampaigns
