import React, { lazy, Suspense } from 'react'
import './Lister.css'
const AnimalCard = lazy(() => import('./Card'))

export default function Lister({ animals }) {
  return (
    <div className="container">
      <div className="card__container">
        <Suspense fallback={<div className="loading">Loading cards…</div>}>
          {animals.map(animal => (
            <AnimalCard animal={animal} key={animal.id} />
          ))}
        </Suspense>
      </div>
    </div>
  )
}