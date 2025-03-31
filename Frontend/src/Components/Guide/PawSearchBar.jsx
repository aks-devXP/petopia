import React, { useState } from 'react';
import { PawPrint } from 'lucide-react';

const PawSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    //add kar dena yaha par function backend ka
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form 
        onSubmit={handleSearch}
        className={`
          relative flex items-center
          border border-white rounded-full
          bg-transparent backdrop-blur-sm
          transition-all duration-300
          ${isFocused ? 'shadow-lg shadow-white/10 border-opacity-100' : 'border-opacity-70'}
        `}
      >
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="
            w-full px-5 py-3
            bg-transparent
            text-white placeholder-white/70
            focus:outline-none
            rounded-full
          "
        />
        <button
          type="submit"
          className="
            absolute right-3
            p-2
            text-white
            rounded-full
            hover:bg-white/10
            transition-colors
          "
        >
          <PawPrint 
            size={20} 
            className={`
              transition-all duration-300
              ${isFocused ? 'rotate-12 scale-110' : ''}
            `}
          />
        </button>
      </form>
    </div>
  );
};

export default PawSearchBar;