'use client';

import React, { useEffect, useRef, useState, createElement, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';

const TextType = ({
  text,
  as: Component = 'div',
  typingSpeed = 150,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = '',
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = '_',
  cursorClassName = '',
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed, // { min: number, max: number }
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  ...props
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);

  const cursorRef = useRef(null);
  const containerRef = useRef(null);
  const observerRef = useRef(null);
  const blinkTweenRef = useRef(null);

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed;
    const { min = typingSpeed, max = typingSpeed } = variableSpeed;
    return Math.random() * (max - min) + min;
  }, [variableSpeed, typingSpeed]);

  const getCurrentTextColor = useCallback(() => {
    if (!textColors?.length) return undefined;
    return textColors[currentTextIndex % textColors.length];
  }, [textColors, currentTextIndex]);

  // Start only when visible (optional)
  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;

    // Guard against SSR / missing APIs
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.1 }
    );

    observerRef.current.observe(containerRef.current);
    return () => {
      try {
        observerRef.current?.disconnect();
      } catch {}
    };
  }, [startOnVisible]);

  // Cursor blink
  useEffect(() => {
    if (!showCursor || !cursorRef.current) return;

    // reset
    gsap.set(cursorRef.current, { opacity: 1 });
    blinkTweenRef.current?.kill();

    blinkTweenRef.current = gsap.to(cursorRef.current, {
      opacity: 0,
      duration: cursorBlinkDuration,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    });

    return () => {
      blinkTweenRef.current?.kill();
      blinkTweenRef.current = null;
    };
  }, [showCursor, cursorBlinkDuration]);

  // Typing / Deleting loop
  useEffect(() => {
    if (!isVisible) return;

    let timeoutId;

    const currentText = textArray[currentTextIndex] ?? '';
    const processedText = reverseMode ? currentText.split('').reverse().join('') : currentText;

    const step = () => {
      // deleting
      if (isDeleting) {
        if (displayedText.length === 0) {
          // line completed deletion
          setIsDeleting(false);

          // callback after sentence finishes its full cycle (type + pause + delete)
          if (onSentenceComplete) {
            onSentenceComplete(textArray[currentTextIndex], currentTextIndex);
          }

          const isLast = currentTextIndex === textArray.length - 1;
          if (isLast && !loop) return; // stop

          setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
          setCurrentCharIndex(0);
          timeoutId = setTimeout(() => {}, pauseDuration);
        } else {
          // delete next char
          timeoutId = setTimeout(() => {
            setDisplayedText((prev) => prev.slice(0, -1));
          }, deletingSpeed);
        }
        return;
      }

      // typing
      if (currentCharIndex < processedText.length) {
        timeoutId = setTimeout(
          () => {
            setDisplayedText((prev) => prev + processedText[currentCharIndex]);
            setCurrentCharIndex((prev) => prev + 1);
          },
          variableSpeed ? getRandomSpeed() : typingSpeed
        );
      } else {
        // finished typing the whole sentence
        if (textArray.length > 1) {
          timeoutId = setTimeout(() => setIsDeleting(true), pauseDuration);
        } else if (loop) {
          // single sentence + loop => pause then delete + retype
          timeoutId = setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      }
    };

    // respect initial delay only at the very first char of the very first sentence
    if (currentTextIndex === 0 && currentCharIndex === 0 && !isDeleting && displayedText === '' && initialDelay > 0) {
      timeoutId = setTimeout(step, initialDelay);
    } else {
      step();
    }

    return () => clearTimeout(timeoutId);
  }, [
    isVisible,
    textArray,
    currentTextIndex,
    currentCharIndex,
    displayedText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    initialDelay,
    loop,
    reverseMode,
    variableSpeed,
    getRandomSpeed,
    onSentenceComplete
  ]);

  const hideCursorNow =
    showCursor &&
    hideCursorWhileTyping &&
    (currentCharIndex < (textArray[currentTextIndex] ?? '').length || isDeleting);

  return createElement(
    Component,
    {
      ref: containerRef,
      className: `inline-block whitespace-pre-wrap tracking-tight ${className}`,
      ...props
    },
    <>
      <span className="inline" style={{ color: getCurrentTextColor() || 'inherit' }}>
        {displayedText}
      </span>
      {showCursor && (
        <span
          ref={cursorRef}
          className={`ml-1 inline-block ${hideCursorNow ? 'invisible' : 'opacity-100'} ${cursorClassName}`}
          style={{
            color:
              // If typing or deleting, use the same as text color — otherwise black
              currentCharIndex < (textArray[currentTextIndex] ?? '').length || isDeleting
                ? getCurrentTextColor() || 'inherit'
                : '#000',
          }}
        >
          {cursorCharacter}
        </span>
      )}
    </>
  );
};

export default function HeroTyping() {
  return (
    <div className="w-full text-center text-2xl sm:text-3xl md:text-4xl font-nunitoBlack">
      <TextType
        text={[
          'Everything your pet needs, all in one place'
        ]}
        typingSpeed={150}
        deletingSpeed={35}
        pauseDuration={100}
        initialDelay={400}
        loop = {false}
        showCursor
        cursorCharacter="_"
        hideCursorWhileTyping={false}
        variableSpeed={{ min: 70, max: 90 }}
        startOnVisible={true}
        className="bg-transparent"
        textColors={['#111', '#111', '#111', '#111']} // or your brand colors per line
        onSentenceComplete={(sentence, idx) => {
          // optional hook for analytics / effects
          // console.log('Finished cycle:', idx, sentence);
        }}
      />
    </div>
  );
}
