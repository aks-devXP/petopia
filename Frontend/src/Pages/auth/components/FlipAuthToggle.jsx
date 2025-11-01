import React from 'react';
import { motion } from 'framer-motion';

export default function FlipAuthToggle({ mode, onToggle, setMode, className = '' }) {
  // keep your labels exactly
  const front = mode === 'login' ? 'New User?' : 'Already Registered?';
  const back  = mode === 'login' ? 'Sign Up'   : 'Login';

  const handleClick = () => {
    if (typeof onToggle === 'function') onToggle();
    else if (typeof setMode === 'function') setMode(mode === 'login' ? 'signup' : 'login');
  };

  // Animate BG on hover (transparent -> brand -> transparent)
  const bgVariants = {
    rest:  { backgroundColor: 'rgba(0,0,0,0)' },
    hover: { backgroundColor: 'var(--brand, #d85400)', transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] } }
  };

  // Slide the text up on hover to reveal the second line
  const textVariants = {
    rest:  { y: '0%' },
    hover: { y: '-100%', transition: { duration: 0.45, ease: [0.19, 1, 0.22, 1] } }
  };

  return (
    <div style={{ perspective: '1000px' }}>
      <motion.button
        type="button"
        onClick={handleClick}
        initial="rest"
        animate="rest"
        whileHover="hover"
        variants={bgVariants}
        className={[
          // base size kept close to your original (w-48 h-12)
          'relative w-48 h-10 rounded-full',
          // always-visible ring as requested
          'ring-2 ring-brand/60',
          // typography/colors: keep neutral text by default
          'font-bold text-gray-800 ',
          // smoothness
          'transition-colors duration-400 ease-out',
          'overflow-hidden',
          className
        ].join(' ')}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* vertically sliding text container */}
        <motion.div
          variants={textVariants}
          className="absolute left-0 top-0 h-full w-full"
          style={{ willChange: 'transform' }}
        >
          {/* FRONT (default state) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="rounded-full px-5 py-2 font-bold"
              // keep your subtle frosted vibe on the text itself if you want:
              // style={{ background: 'rgba(255,255,255,0.10)' }}
            >
              {front}
            </div>
          </div>

          {/* BACK (revealed on hover) */}
          <div className="absolute inset-0 flex items-center justify-center translate-y-full">
            <div className="text-white px-5 py-2 rounded-full">
              {back}
            </div>
          </div>
        </motion.div>
      </motion.button>
    </div>
  );
}
