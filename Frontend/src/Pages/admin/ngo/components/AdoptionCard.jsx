import React, { useState } from 'react'
import { HiCheckCircle } from 'react-icons/hi'

const toTitle = (s) => (s || '').replace(/\b\w/g, (c) => c.toUpperCase())

const AdoptionCard = ({ pet }) => {
  const name = toTitle(pet.name)
  const breed = toTitle(pet.breed)
  const city = toTitle(pet.city)
  const state = toTitle(pet.state)
  const email = pet.contactEmail || pet.contact?.email
  const phone = pet.contactPhone || pet.contact?.phone
  const contactName = pet.contactName || pet.contact?.name

  const [sent, setSent] = useState(false)

  const handleEnquiry = () => {
    if (sent) return
    setSent(true)
  }

  return (
    <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-200 overflow-hidden hover:shadow-lg transition flex flex-col h-[460px]">
      {pet.image && (
        <div className="h-44 w-full bg-gray-100 overflow-hidden shrink-0">
          <img src={pet.image} alt={name} className="h-full w-full object-cover" />
        </div>
      )}
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700 capitalize">{pet.category}</span>
        </div>
        <p className="mt-1 text-sm text-gray-600">Breed: {breed}</p>
        <p className="mt-1 text-sm text-gray-600">Age: {pet.age}</p>
        <p className="mt-1 text-sm text-gray-600">{city}{state ? `, ${state}` : ''}</p>
        {pet.description && <p className="mt-2 text-sm text-gray-700 line-clamp-3">{pet.description}</p>}
        <div className="mt-auto border-t pt-3">
          <p className="text-sm font-medium text-gray-900">Contact: {contactName}</p>
          {email && <p className="text-sm text-gray-700">{email}</p>}
          <div className="mt-3">
            {sent ? (
              <div className="inline-flex items-center gap-2 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-green-700">
                <HiCheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Query Sent successfully</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleEnquiry}
                className="inline-flex rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-400"
              >
                Send query
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdoptionCard
