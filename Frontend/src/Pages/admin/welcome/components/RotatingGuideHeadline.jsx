'use client';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ---------------- RotatingText (unchanged behavior) ----------------
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const RotatingText = forwardRef((props, ref) => {
  const {
    texts,
    transition = { type: 'spring', damping: 25, stiffness: 300 },
    initial = { y: '100%', opacity: 0 },
    animate = { y: 0, opacity: 1 },
    exit = { y: '-120%', opacity: 0 },
    animatePresenceMode = 'wait',
    animatePresenceInitial = false,
    rotationInterval = 2000,
    staggerDuration = 0,
    staggerFrom = 'first',
    loop = true,
    auto = true,
    splitBy = 'characters',
    onNext,
    mainClassName,
    splitLevelClassName,
    elementLevelClassName,
    ...rest
  } = props;

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const splitIntoCharacters = text => {
    if (typeof Intl !== 'undefined' && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
      return Array.from(segmenter.segment(text), segment => segment.segment);
    }
    return Array.from(text);
  };

  const elements = useMemo(() => {
    const currentText = texts[currentTextIndex];
    if (splitBy === 'characters') {
      const words = currentText.split(' ');
      return words.map((word, i) => ({
        characters: splitIntoCharacters(word),
        needsSpace: i !== words.length - 1
      }));
    }
    if (splitBy === 'words') {
      return currentText.split(' ').map((word, i, arr) => ({
        characters: [word],
        needsSpace: i !== arr.length - 1
      }));
    }
    if (splitBy === 'lines') {
      return currentText.split('\n').map((line, i, arr) => ({
        characters: [line],
        needsSpace: i !== arr.length - 1
      }));
    }
    return currentText.split(splitBy).map((part, i, arr) => ({
      characters: [part],
      needsSpace: i !== arr.length - 1
    }));
  }, [texts, currentTextIndex, splitBy]);

  const getStaggerDelay = useCallback(
    (index, totalChars) => {
      const total = totalChars;
      if (staggerFrom === 'first') return index * staggerDuration;
      if (staggerFrom === 'last') return (total - 1 - index) * staggerDuration;
      if (staggerFrom === 'center') {
        const center = Math.floor(total / 2);
        return Math.abs(center - index) * staggerDuration;
      }
      if (staggerFrom === 'random') {
        const randomIndex = Math.floor(Math.random() * total);
        return Math.abs(randomIndex - index) * staggerDuration;
      }
      return Math.abs(staggerFrom - index) * staggerDuration;
    },
    [staggerFrom, staggerDuration]
  );

  const handleIndexChange = useCallback(
    newIndex => {
      setCurrentTextIndex(newIndex);
      if (onNext) onNext(newIndex);
    },
    [onNext]
  );

  const next = useCallback(() => {
    const nextIndex = currentTextIndex === texts.length - 1 ? (loop ? 0 : currentTextIndex) : currentTextIndex + 1;
    if (nextIndex !== currentTextIndex) handleIndexChange(nextIndex);
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  const previous = useCallback(() => {
    const prevIndex = currentTextIndex === 0 ? (loop ? texts.length - 1 : currentTextIndex) : currentTextIndex - 1;
    if (prevIndex !== currentTextIndex) handleIndexChange(prevIndex);
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  const jumpTo = useCallback(
    index => {
      const validIndex = Math.max(0, Math.min(index, texts.length - 1));
      if (validIndex !== currentTextIndex) handleIndexChange(validIndex);
    },
    [texts.length, currentTextIndex, handleIndexChange]
  );

  const reset = useCallback(() => {
    if (currentTextIndex !== 0) handleIndexChange(0);
  }, [currentTextIndex, handleIndexChange]);

  useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [next, previous, jumpTo, reset]);

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(next, rotationInterval);
    return () => clearInterval(id);
  }, [next, rotationInterval, auto]);

  return (
    <motion.span
      className={cn('flex flex-wrap whitespace-pre-wrap relative ', mainClassName)}
      {...rest}
      layout
      transition={transition}
    >
      <span className="sr-only">{texts[0]}</span>
      <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
        <motion.span
          key={currentTextIndex}
          className={cn(splitBy === 'lines' ? 'flex flex-col w-full' : 'flex flex-wrap whitespace-pre-wrap relative')}
          layout
          aria-hidden="true"
        >
          {elements.map((wordObj, wordIndex, array) => {
            const previousCharsCount = array.slice(0, wordIndex).reduce((sum, word) => sum + word.characters.length, 0);
            return (
              <span key={wordIndex} className={cn('inline-flex bg-ink-primary text-white px-4 pb-[8px] pt-2 rounded-xl', splitLevelClassName)}>
                {wordObj.characters.map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    initial={initial}
                    animate={animate}
                    exit={exit}
                    transition={{
                      ...transition,
                      delay: getStaggerDelay(
                        previousCharsCount + charIndex,
                        array.reduce((sum, word) => sum + word.characters.length, 0)
                      )
                    }}
                    className={cn('inline-block ', elementLevelClassName)}
                  >
                    {char}
                  </motion.span>
                ))}
                {wordObj.needsSpace && <span className="whitespace-pre"> </span>}
              </span>
            );
          })}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
});

// ---------------- RotatingGuideHeadline with fixed-width slot ----------------
export default function RotatingGuideHeadline({
  className = '',
  rotationInterval = 2000,
  words = ['health', 'needs', 'behavior', 'habits', 'diet'],
}) {
  const measureRef = useRef(null);
  const [slotWidth, setSlotWidth] = useState(0);

  // Measure the widest word in the same typography to prevent layout shift
  useEffect(() => {
    if (!measureRef.current) return;

    const measure = () => {
      const nodes = measureRef.current.querySelectorAll('[data-measure-word]');
      let max = 0;
      nodes.forEach((el) => {
        const w = el.getBoundingClientRect().width;
        if (w > max) max = w;
      });
      setSlotWidth(Math.ceil(max)); // ceil for crisp pixels
    };

    measure();

    // Re-measure on resize to respect responsive font sizes
    const ro = new ResizeObserver(measure);
    ro.observe(measureRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [words.join(' ')]);

  return (
    <div className={`w-full flex items-center justify-center pt-4`}>
      {/* Hidden measurer uses the same font classes to get accurate widths */}
      <div
        ref={measureRef}
        className="absolute -z-50 opacity-0 pointer-events-none select-none"
        aria-hidden="true"
      >
        <span className="text-2xl sm:text-3xl md:text-4xl font-nunitoBlack leading-tight">
          {words.map((w, i) => (
            <span key={i} className="inline-block" data-measure-word>
              {w}
            </span>
          ))}
        </span>
      </div>

      <h2 className="text-center font-nunitoBlack leading-tight text-2xl sm:text-3xl md:text-4xl text-black">
        <span>Understand your pet’s&nbsp;</span>

        {/* Fixed-width slot so the starting position never shifts */}
        <span
          className="inline-block align-baseline relative"
          style={{ width: slotWidth ? `${slotWidth}px` : undefined }}
        >
          <RotatingText
            texts={words}
            mainClassName="inline-flex items-baseline justify-start align-baseline"
            splitLevelClassName="overflow-hidden pb-[0.05em]"
            elementLevelClassName="will-change-transform"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-120%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            staggerFrom="last"
            staggerDuration={0.025}
            rotationInterval={rotationInterval}
          />
        </span>
      </h2>
    </div>
  );
}
