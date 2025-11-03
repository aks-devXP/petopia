import { motion } from 'framer-motion'
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa'

const Pill = ({ children }) => (
  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-100">
    {children}
  </span>
)

const NGOTile = ({ ngo, onClick }) => {
  const facilities = Array.isArray(ngo.facilities) ? ngo.facilities.slice(0, 3) : []

  return (
    <motion.button
      whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0,0,0,0.12)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={() => onClick?.(ngo)}
      className="text-left w-full rounded-xl bg-white shadow-sm ring-1 ring-gray-200 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
      aria-label={`View details for ${ngo.name}`}
    >
      {ngo.logo && (
        <div className="h-44 w-full bg-gray-100 overflow-hidden">
          <img src={ngo.logo} alt={ngo.name} className="h-full w-full object-cover" />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{ngo.name}</h3>
          {ngo.established && (
            <div className="shrink-0 flex items-center gap-1 text-xs text-gray-600">
              <FaCalendarAlt className="text-rose-600" />
              <span>Since {ngo.established}</span>
            </div>
          )}
        </div>
        <div className="mt-1 flex items-center gap-2 text-sm text-gray-700">
          <FaMapMarkerAlt className="text-rose-600" />
          <span className="truncate">{ngo.city}{ngo.state ? `, ${ngo.state}` : ''}</span>
        </div>
        {facilities.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {facilities.map((f) => (
              <Pill key={f}>{f}</Pill>
            ))}
            {Array.isArray(ngo.facilities) && ngo.facilities.length > facilities.length && (
              <span className="text-xs text-gray-500">+{ngo.facilities.length - facilities.length} more</span>
            )}
          </div>
        )}
      </div>
    </motion.button>
  )
}

export default NGOTile

