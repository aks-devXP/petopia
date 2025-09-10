import { PawPrint } from 'lucide-react';
import React from 'react';

export default function PawRating({ rating, max = 5 }) {
  return (
    <div className="flex space-x-1">
      {Array.from({ length: max }).map((_, i) => (
        <PawPrint
        
          key={i}
          className={`w-5 h-5 transition-colors  ${
            i < rating ? 'text-[#f660bc]' : 'text-[#fac0e4] opacity-50'
          }`}
        />
      ))}
    </div>
  )
}