import React from 'react'
import { Link } from 'react-router-dom'
import './Lister.css'

export default function Card({ animal }) {
  // const navigate = useNavigate()
  // const handleClick = () => {
  //   navigate(`/guide/${animal.id}`)
  // }
  return (
    <article className="card__article">
      <img
        src={animal.img}
        alt={animal.name}
        className="card__img"
        loading="lazy"
      />
      <div className="card__data">
        <h2 className="card__title">{animal.name}</h2>
        <p className="card__description">{animal.description}</p>
        <Link to={`/guide/${animal.id}`} className="card__button">
          Read More…
        </Link>
      </div>
    </article>
  )
}