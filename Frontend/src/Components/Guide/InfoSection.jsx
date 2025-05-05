// src/components/Guide/InfoSection.jsx
import { CircleDot } from 'lucide-react'
import React from 'react'

/**
 * @param {{
 *   title: string,
 *   text?: string,
 *   items?: Array<
 *     | string
 *     | { label: string, icon?: string | ReactNode }
 *   >
 * }} props
 */
export default function InfoSection({ title, text, items }) {
  return (
    <section className="w-full px-3 py-4 sm:px-4 sm:py-5 md:px-6 md:py-6">
      {/* Title */}
      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">
        {title}
      </h3>

      {/* Optional paragraph */}
      {text && (
        <p className="text-xs sm:text-sm md:text-base text-[#979bfb] mb-4 leading-relaxed">
          {text}
        </p>
      )}

      {/* Optional list */}
      {items && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 md:gap-6">
          {items.map((it, idx) => {
            const { label, icon } =
              typeof it === 'string'
                ? { label: it, icon: null }
                : it

            return (
              <li
                key={idx}
                className="flex items-center text-[#bfc1ef] text-xs sm:text-sm md:text-base"
              >
                {icon ? (
                  typeof icon === 'string' ? (
                    <img
                      src={icon}
                      alt={label}
                      className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 object-contain"
                    />
                  ) : (
                    <span className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 flex items-center justify-center">
                      {icon}
                    </span>
                  )
                ) : (
                  <CircleDot className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-2 text-gray-500" />
                )}
                <span>{label}</span>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}