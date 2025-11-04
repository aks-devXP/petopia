import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { FaDirections, FaEnvelope, FaGlobe, FaPhoneAlt, FaTimes, FaUser } from 'react-icons/fa'

const Backdrop = ({ children, onClose }) => (
  <motion.div
    className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
    onClick={onClose}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div onClick={(e) => e.stopPropagation()} className="w-full max-w-3xl">
      {children}
    </div>
  </motion.div>
)

const NGODetailsModal = ({ open, ngo, onClose }) => {
  const mapsUrl = ngo
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent([
        ngo.name,
        ngo.city,
        ngo.state,
      ].filter(Boolean).join(' '))}`
    : '#'
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose?.()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && ngo && (
        <Backdrop onClose={onClose}>
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${ngo.name} details`}
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/10 bg-white"
          >
            {ngo.logo && (
              <div className="h-56 w-full overflow-hidden">
                <img src={ngo.logo} alt={ngo.name} className="h-full w-full object-cover" />
              </div>
            )}
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{ngo.name}</h3>
                  <p className="mt-1 text-sm text-gray-600">{ngo.city}{ngo.state ? `, ${ngo.state}` : ''} • Established {ngo.established}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
                  aria-label="Close details"
                >
                  <FaTimes />
                </button>
              </div>

              {ngo.owner && (
                <div className="mt-4 flex items-center gap-2 text-gray-700">
                  <FaUser className="text-rose-600" />
                  <span className="text-sm">Owner: {ngo.owner}</span>
                </div>
              )}

              {ngo.description && (
                <p className="mt-4 text-gray-800 leading-relaxed">{ngo.description}</p>
              )}

              {Array.isArray(ngo.facilities) && ngo.facilities.length > 0 && (
                <div className="mt-5">
                  <h4 className="text-sm font-semibold text-gray-900">Facilities</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {ngo.facilities.map((f) => (
                      <span key={f} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">{f}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-3">
                <a href={mapsUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 hover:border-emerald-300 hover:bg-emerald-50">
                  <FaDirections className="text-emerald-600" />
                  <span>Get directions</span>
                </a>
                {ngo.contact?.phone && (
                  <a href={`tel:${ngo.contact.phone}`} className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 hover:border-rose-300 hover:bg-rose-50">
                    <FaPhoneAlt className="text-red-600" />
                    <span>{ngo.contact.phone}</span>
                  </a>
                )}
                {ngo.contact?.email && (
                  <div className='overflow-x-hidden'>
                    <a href={`mailto:${ngo.contact.email}`} className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 hover:border-rose-300 hover:bg-rose-50">
                      <FaEnvelope className="text-rose-600" />
                      <span>Send Mail</span>
                    </a>
                  </div>
                )}
                {ngo.website && (
                  <a href={ngo.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 hover:border-rose-300 hover:bg-rose-50">
                    <FaGlobe className="text-blue-600" />
                    <span>Visit website</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  )
}

export default NGODetailsModal
