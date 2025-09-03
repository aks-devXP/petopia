import { Filter } from 'lucide-react'
import React, { useState } from 'react'
import './Category.css'

export default function Category({
  categories = [],
  selectedCategories = [],
  onChange = () => {}
}) {
  const [isOpen, setIsOpen] = useState(false)

  const isAllSelected = selectedCategories.length === 0

  function toggleCategory(catId) {
    let next
    if (selectedCategories.includes(catId)) {
      next = selectedCategories.filter(id => id !== catId)
    } else {
      next = [...selectedCategories, catId]
    }
    onChange(next)
  }

  function clearAll() {
    onChange([])
  }

  return (
    <>
      {/* Filter icon button */}
      <button
        className="filter-icon-btn"
        onClick={() => setIsOpen(true)}
        aria-label="Open category filter"
      >
        <Filter size={24} />
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="modal-backdrop"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="modal-content"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="modal-header">
              <h3>Filter by Categories</h3>
              <button
                className="modal-close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* Buttons */}
            <div className="category-filter-multi">
              <button
                className={`category-btn ${
                  isAllSelected ? 'active' : ''
                }`}
                onClick={clearAll}
              >
                All
              </button>

              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`category-btn ${
                    selectedCategories.includes(cat.id)
                      ? 'active'
                      : ''
                  }`}
                  onClick={() => toggleCategory(cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}