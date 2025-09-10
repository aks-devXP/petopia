import { Filter } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import './Category.css'

export default function Category({
  categories = [],              // array of strings e.g. ["Dog","Cat",...]
  selectedCategories = [],      // array of strings (the committed selection)
  onChange = () => {},          // (nextSelected: string[]) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [tempCats, setTempCats] = useState(selectedCategories)

  // When opening the modal, copy the committed selection into temp
  useEffect(() => {
    if (isOpen) setTempCats(selectedCategories)
  }, [isOpen, selectedCategories])

  const isAllSelected = tempCats.length === 0

  function toggleTempCategory(cat) {
    setTempCats(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  function clearAllTemp() {
    setTempCats([])
  }

  // Close modal and APPLY the temp selection to parent
  function closeAndApply() {
    onChange(tempCats)
    setIsOpen(false)
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
          onClick={closeAndApply}                 // backdrop click applies & closes
        >
          <div
            className="modal-content"
            onClick={e => e.stopPropagation()}   // prevent backdrop close
          >
            {/* Header */}
            <div className="modal-header">
              <h3>Filter by Categories</h3>
              <button
                className="modal-close-btn"
                onClick={closeAndApply}          // close button applies & closes
                aria-label="Close and apply"
              >
                ×
              </button>
            </div>

            {/* Buttons */}
            <div className="category-filter-multi">
              <button
                className={`category-btn ${isAllSelected ? 'active' : ''}`}
                onClick={clearAllTemp}
              >
                All
              </button>

              {categories.map(cat => (
                <button
                  key={cat}
                  className={`category-btn ${
                    tempCats.includes(cat) ? 'active' : ''
                  }`}
                  onClick={() => toggleTempCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Optional footer controls */}
            <div className="flex gap-2 justify-center mt-2 mx-2">
              {/* If you want a cancel that discards changes, uncomment:
              <button className="btn-secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </button>
              */}
              <button className="category_apply-btn" onClick={closeAndApply}>
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
