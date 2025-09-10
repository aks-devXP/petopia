import React from 'react'
import { motion } from 'framer-motion'

const Stat = ({ value, label, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.45 }}
    className="text-center"
  >
    <div className="text-3xl font-extrabold text-gray-900">{value}</div>
    <div className="text-sm text-gray-600">{label}</div>
  </motion.div>
)

const ImpactStrip = () => {
  return (
    <section className="bg-gradient-to-r from-orange-50 via-white to-rose-50 py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <Stat value="2,400+" label="Animals Treated" />
          <Stat value="180k+" label="Meals Served" delay={0.05} />
          <Stat value="1,200+" label="Donors Joined" delay={0.1} />
          <Stat value="40+" label="Partner NGOs" delay={0.15} />
        </div>
      </div>
    </section>
  )
}

export default ImpactStrip

