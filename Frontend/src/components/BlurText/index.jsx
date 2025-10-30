import { motion } from "motion/react";
import { useEffect, useRef, useState, useMemo } from "react";

/** Build per-key keyframes across snapshots */
const buildKeyframes = (from, steps) => {
  const keys = new Set([
    ...Object.keys(from),
    ...steps.flatMap((s) => Object.keys(s)),
  ]);
  const kf = {};
  keys.forEach((k) => {
    kf[k] = [from[k], ...steps.map((s) => s[k])];
  });
  return kf;
};

/**
 * BlurText
 * Tailwind-ready, no CSS files.
 *
 * Props:
 * - text: string
 * - delay: number (ms) stagger per segment
 * - animateBy: 'words' | 'letters'
 * - direction: 'top' | 'bottom'
 * - threshold, rootMargin: IntersectionObserver tuning
 * - animationFrom / animationTo: override default snapshots
 * - easing: (t)=>t or array easing accepted by motion
 * - onAnimationComplete: callback when last segment finishes
 * - stepDuration: seconds per step (default 0.35s)
 * - className: Tailwind classes for wrapper <p>
 */
export default function BlurText({
  text = "",
  delay = 200,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = (t) => t,
  onAnimationComplete,
  stepDuration = 0.35,
}) {
  const elements =
    animateBy === "words" ? text.split(" ") : Array.from(text || "");
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  // Viewport trigger (client-only)
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  // Default motion snapshots
  const defaultFrom = useMemo(
    () =>
      direction === "top"
        ? { filter: "blur(10px)", opacity: 0, y: -50 }
        : { filter: "blur(10px)", opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: "blur(5px)",
        opacity: 0.5,
        y: direction === "top" ? 5 : -5,
      },
      { filter: "blur(0px)", opacity: 1, y: 0 },
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1; // from + steps
  const totalDuration = stepDuration * (stepCount - 1);
  const times =
    stepCount === 1
      ? [0]
      : Array.from({ length: stepCount }, (_, i) => i / (stepCount - 1));

  return (
    <p
      ref={ref}
      className={["flex flex-wrap", className].join(" ").trim()}
      aria-label={text}
    >
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        const transition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000, // ms → s
          ease: easing,
        };

        // Non-breaking space handling for words mode
        const content =
          animateBy === "words"
            ? segment
            : segment === " "
            ? "\u00A0"
            : segment;

        return (
          <motion.span
            key={index}
            className="inline-block will-change-[transform,filter,opacity]"
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={transition}
            onAnimationComplete={
              index === elements.length - 1 ? onAnimationComplete : undefined
            }
          >
            {content}
            {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
          </motion.span>
        );
      })}
    </p>
  );
}
