import React from 'react'
import AdoptionCard from './AdoptionCard'

const AdoptionGrid = ({ pets = [], loading = false }) => {
  if (loading) {
    return <div className="rounded-xl bg-white p-10 text-center text-gray-600 ring-1 ring-gray-200">Loading pets…</div>
  }
  if (!pets.length) {
    return <div className="rounded-xl bg-white p-10 text-center text-gray-600 ring-1 ring-gray-200">No pets found for the selected filters.</div>
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {pets.map((pet) => (
        <AdoptionCard key={pet._id || pet.id} pet={pet} />
      ))}
    </div>
  )
}

export default AdoptionGrid

