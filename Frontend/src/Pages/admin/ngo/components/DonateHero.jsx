import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaShieldAlt, FaLeaf, FaHeartbeat } from 'react-icons/fa'

const DonateHero = () => {
  const [flash, setFlash] = useState(false)
  const featuredRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

  const onWhy = (e) => {
    e.preventDefault()
    setFlash(true)
    featuredRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setFlash(false), 1600)
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-100 via-amber-50 to-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-orange-200/50 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-rose-200/50 blur-3xl" />
      </div>
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900"
            >
              Your Help Gives Animals A Second Chance
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mt-4 text-gray-700 text-lg"
            >
              Donations fund urgent medical care, daily meals, safe shelter, and rehabilitation for rescued animals.
              Every contribution creates real, trackable impact.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-6 flex flex-wrap gap-3"
            >
              <Link
                to="/ngo/campaigns"
                className="inline-flex items-center rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 px-6 py-3 text-white font-semibold shadow hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
              >
                Explore Campaigns
              </Link>
              <a
                href="#featured"
                onClick={onWhy}
                className="inline-flex items-center rounded-xl border border-gray-300 bg-white px-6 py-3 text-gray-800 hover:bg-gray-50"
              >
                Why Donate
              </a>
            </motion.div>
            <div id="featured" ref={featuredRef} className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <motion.div
                className={`flex items-start gap-3 rounded-xl p-4 ring-1 backdrop-blur transition-colors duration-500 ${flash ? 'ring-rose-300' : 'ring-black/5'}`}
                style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}
                animate={flash ? { backgroundColor: 'rgba(244,63,94,0.08)' } : { backgroundColor: 'rgba(255,255,255,0.7)' }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <motion.span
                  animate={flash ? { scale: [1, 1.25, 1] } : {}}
                  transition={{ duration: 0.9, ease: 'easeInOut' }}
                >
                  <FaHeartbeat className="mt-0.5 text-rose-500" />
                </motion.span>
                <div>
                  <div className="font-semibold text-gray-900">Medical Aid</div>
                  <div className="text-sm text-gray-600 mt-1">Surgeries, vaccinations, post-op care.</div>
                </div>
              </motion.div>
              <motion.div
                className={`flex items-start gap-3 rounded-xl p-4 ring-1 backdrop-blur transition-colors duration-500 ${flash ? 'ring-emerald-300' : 'ring-black/5'}`}
                style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}
                animate={flash ? { backgroundColor: 'rgba(16,185,129,0.08)' } : { backgroundColor: 'rgba(255,255,255,0.7)' }}
                transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.06 }}
              >
                <motion.span
                  animate={flash ? { scale: [1, 1.25, 1] } : {}}
                  transition={{ duration: 0.9, ease: 'easeInOut', delay: 0.06 }}
                >
                  <FaLeaf className="mt-0.5 text-emerald-600" />
                </motion.span>
                <div>
                  <div className="font-semibold text-gray-900">Meals & Shelter</div>
                  <div className="text-sm text-gray-600 mt-1">Daily feeding and safe kennels.</div>
                </div>
              </motion.div>
              <motion.div
                className={`flex items-start gap-3 rounded-xl p-4 ring-1 backdrop-blur transition-colors duration-500 ${flash ? 'ring-blue-300' : 'ring-black/5'}`}
                style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}
                animate={flash ? { backgroundColor: 'rgba(37,99,235,0.08)' } : { backgroundColor: 'rgba(255,255,255,0.7)' }}
                transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.12 }}
              >
                <motion.span
                  animate={flash ? { scale: [1, 1.25, 1] } : {}}
                  transition={{ duration: 0.9, ease: 'easeInOut', delay: 0.12 }}
                >
                  <FaShieldAlt className="mt-0.5 text-blue-600" />
                </motion.span>
                <div>
                  <div className="font-semibold text-gray-900">Transparent Impact</div>
                  <div className="text-sm text-gray-600 mt-1">Track goals and progress in real-time.</div>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative mx-auto h-72 w-full max-w-lg overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/10">
              <img
                src="https://images.pexels.com/photos/7210715/pexels-photo-7210715.jpeg"
                alt="Rescued dog receiving care"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/0 to-black/0" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default DonateHero
