// BlurText.jsx (drop-in replacement)
import { motion } from "motion/react";
import { useEffect, useRef, useState, useMemo } from "react";

const buildKeyframes = (from, steps) => {
  const keys = new Set([
    ...Object.keys(from),
    ...steps.flatMap((s) => Object.keys(s)),
  ]);
  const kf = {};
  keys.forEach((k) => { kf[k] = [from[k], ...steps.map((s) => s[k])]; });
  return kf;
};

export default function BlurText({
  text = "",
  delay = 200,
  className = "",
  animateBy = "words",      // 'words' | 'letters'
  direction = "top",        // 'top' | 'bottom'
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = (t) => t,
  onAnimationComplete,
  stepDuration = 0.35,
}) {
  // Convert "<br/>" (in any spacing/case) to real newlines BEFORE splitting
  const normalized = useMemo(
    () => (text || "").replace(/\s*<br\s*\/?>\s*/gi, "\n"),
    [text]
  );

  const blocks = useMemo(() => normalized.split("\n"), [normalized]);
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); io.unobserve(el); } },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () => (direction === "top"
      ? { filter: "blur(10px)", opacity: 0, y: -50 }
      : { filter: "blur(10px)", opacity: 0, y: 50 }),
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      { filter: "blur(5px)", opacity: 0.5, y: direction === "top" ? 5 : -5 },
      { filter: "blur(0px)", opacity: 1, y: 0 },
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1)
  );
  const totalDuration = stepCount > 1 ? stepDuration * (stepCount - 1) : 0;

  return (
    <p ref={ref} className={["flex flex-col", className].join(" ").trim()} aria-label={normalized}>
      {blocks.map((line, lineIdx) => {
        const parts = animateBy === "words" ? line.split(" ") : Array.from(line);
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        return (
          <span key={lineIdx} className="block">
            {parts.map((seg, i, arr) => (
              <motion.span
                key={i}
                className="inline-block will-change-[transform,filter,opacity]"
                initial={fromSnapshot}
                animate={inView ? animateKeyframes : fromSnapshot}
                transition={{
                  duration: totalDuration,
                  times,
                  delay: ((lineIdx * parts.length + i) * delay) / 1000,
                  ease: easing,
                }}
                onAnimationComplete={
                  lineIdx === blocks.length - 1 && i === arr.length - 1
                    ? onAnimationComplete
                    : undefined
                }
              >
                {seg}
                {animateBy === "words" && i < arr.length - 1 && "\u00A0"}
              </motion.span>
            ))}
          </span>
        );
      })}
    </p>
  );
}
