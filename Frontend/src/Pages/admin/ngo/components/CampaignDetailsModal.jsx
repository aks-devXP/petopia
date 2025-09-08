import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaChevronLeft, FaChevronRight, FaEnvelope, FaPhoneAlt, FaUser, FaGlobe } from 'react-icons/fa'

const rupee = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n || 0)

const Backdrop = ({ children, onClose }) => (
  <motion.div
    className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
    onClick={onClose}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div onClick={(e) => e.stopPropagation()} className="w-full max-w-4xl">
      {children}
    </div>
  </motion.div>
)

const Progress = ({ value }) => (
  <div>
    <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
      <div className="h-full bg-gradient-to-r from-orange-500 to-rose-500" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  </div>
)

const CampaignDetailsModal = ({ open, campaign, onClose }) => {
  const images = campaign?.images || []
  const [idx, setIdx] = useState(0)
  const pct = (100 * (campaign?.raised || 0)) / (campaign?.goal || 1)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.()
      if (e.key === 'ArrowLeft') setIdx((i) => (i - 1 + images.length) % images.length)
      if (e.key === 'ArrowRight') setIdx((i) => (i + 1) % images.length)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, images.length, onClose])

  useEffect(() => { setIdx(0) }, [campaign])

  return (
    <AnimatePresence>
      {open && campaign && (
        <Backdrop onClose={onClose}>
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${campaign.title} details`}
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/10 bg-white"
          >
            {images.length > 0 && (
              <div className="relative h-72 w-full bg-black">
                <img src={images[idx]} alt={`${campaign.title} ${idx + 1}`} className="h-full w-full object-cover" />
                {images.length > 1 && (
                  <>
                    <button
                      className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow hover:bg-white"
                      onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}
                      aria-label="Previous image"
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow hover:bg-white"
                      onClick={() => setIdx((i) => (i + 1) % images.length)}
                      aria-label="Next image"
                    >
                      <FaChevronRight />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {images.map((_, i) => (
                        <span key={i} className={`h-1.5 w-6 rounded-full ${idx === i ? 'bg-white' : 'bg-white/50'}`} />
                      ))}
                    </div>
                  </>
                )}
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow hover:bg-white"
                  aria-label="Close details"
                >
                  <FaTimes />
                </button>
              </div>
            )}

            <div className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{campaign.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{campaign.city}{campaign.state ? `, ${campaign.state}` : ''}</p>
                </div>
                <div className="rounded-xl bg-orange-50 px-4 py-2 text-right ring-1 ring-orange-100">
                  <div className="text-xs uppercase tracking-wide text-orange-600">Raised</div>
                  <div className="text-lg font-semibold text-gray-900">{rupee(campaign.raised)} <span className="text-gray-500 text-sm font-normal">/ {rupee(campaign.goal)}</span></div>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <Progress value={pct} />
                <p className="text-gray-800 leading-relaxed">{campaign.description}</p>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800">
                  <FaUser className="text-orange-600" />
                  <span>{campaign.organizer?.name}</span>
                </div>
                {campaign.organizer?.phone && (
                  <a href={`tel:${campaign.organizer.phone}`} className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 hover:border-orange-300 hover:bg-orange-50">
                    <FaPhoneAlt className="text-rose-600" />
                    <span>{campaign.organizer.phone}</span>
                  </a>
                )}
                {campaign.organizer?.email && (
                  <a href={`mailto:${campaign.organizer.email}`} className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 hover:border-orange-300 hover:bg-orange-50">
                    <FaEnvelope className="text-rose-600" />
                    <span>Send Mail</span>
                  </a>
                )}
                {campaign.organizer?.website && (
                  <a href={campaign.organizer.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 hover:border-orange-300 hover:bg-orange-50">
                    <FaGlobe className="text-blue-600" />
                    <span>Visit website</span>
                  </a>
                )}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={campaign.donateUrl || '#'}
                  target={campaign.donateUrl ? '_blank' : undefined}
                  rel={campaign.donateUrl ? 'noreferrer' : undefined}
                  className="inline-flex items-center rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 px-5 py-2.5 text-white font-semibold shadow hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
                >
                  Donate now
                </a>
                <button
                  onClick={onClose}
                  className="inline-flex items-center rounded-xl border border-gray-300 px-4 py-2 text-gray-800 bg-white hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  )
}

export default CampaignDetailsModal

