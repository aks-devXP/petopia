import React from 'react'

const AdoptHeader = ({
  title = 'Adopt a Pet',
  subtitle = 'Find loving companions near you. Filter by state, browse listings, and contact listers directly.'
}) => {
  return (
    <header className="rounded-2xl bg-gradient-to-r from-rose-500 to-orange-400 p-6 ring-1 ring-rose-300 shadow-sm">
      <h1 className="text-3xl font-extrabold tracking-tight text-white">{title}</h1>
      <p className="mt-2 max-w-2xl text-rose-50">{subtitle}</p>
    </header>
  )
}

export default AdoptHeader
