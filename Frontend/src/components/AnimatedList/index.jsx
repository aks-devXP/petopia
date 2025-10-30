import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";

/**
 * Headless AnimatedList
 * - Keeps your styling as-is (you render each item)
 * - Animates on enter (opacity + scale) only when in view
 * - Arrow ↑/↓ and Tab navigation (Enter to select)
 * - Auto-scrolls selected into view
 * - Optional top/bottom gradients (color can be customized per usage)
 */
export default function AnimatedList({
  items = [],
  renderItem,                 // (item, index, isSelected) => JSX
  itemKey,                    // (item, index) => string|number
  onItemSelect,
  enableArrowNavigation = true,
  className = "",             // wrapper (relative, for gradients)
  scrollAreaClassName = "",   // the scrollable div
  showGradients = true,
  gradientTop = "linear-gradient(to bottom, rgba(0,0,0,0.04), transparent)",
  gradientBottom = "linear-gradient(to top, rgba(0,0,0,0.06), transparent)",
  displayScrollbar = true,
  initialSelectedIndex = -1,
  stagger = 0.045,            // entrance stagger per item
  duration = 0.2,             // entrance duration per item
}) {
  const listRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);
  const [keyboardNav, setKeyboardNav] = useState(false);
  const [topOpacity, setTopOpacity] = useState(0);
  const [bottomOpacity, setBottomOpacity] = useState(1);

  // Scroll gradient logic
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setTopOpacity(Math.min(scrollTop / 50, 1));
    const bottomDistance = scrollHeight - (scrollTop + clientHeight);
    setBottomOpacity(scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1));
  };

  // Arrow/Tab navigation
  useEffect(() => {
    if (!enableArrowNavigation) return;
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex((prev) => Math.min((prev < 0 ? -1 : prev) + 1, items.length - 1));
      } else if (e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex((prev) => Math.max((prev < 0 ? items.length : prev) - 1, 0));
      } else if (e.key === "Enter") {
        if (selectedIndex >= 0 && selectedIndex < items.length) {
          e.preventDefault();
          onItemSelect?.(items[selectedIndex], selectedIndex);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enableArrowNavigation, items, selectedIndex, onItemSelect]);

  // Keep selected item in view after keyboard nav
  useEffect(() => {
    if (!keyboardNav || selectedIndex < 0 || !listRef.current) return;
    const container = listRef.current;
    const selectedEl = container.querySelector(`[data-index="${selectedIndex}"]`);
    if (!selectedEl) return;

    const extra = 50;
    const top = selectedEl.offsetTop;
    const bottom = top + selectedEl.offsetHeight;
    const viewTop = container.scrollTop + extra;
    const viewBottom = container.scrollTop + container.clientHeight - extra;

    if (top < viewTop) {
      container.scrollTo({ top: top - extra, behavior: "smooth" });
    } else if (bottom > viewBottom) {
      container.scrollTo({ top: bottom - container.clientHeight + extra, behavior: "smooth" });
    }
    setKeyboardNav(false);
  }, [selectedIndex, keyboardNav]);

  return (
    <div className={`relative ${className}`}>
      <div
        ref={listRef}
        className={`${scrollAreaClassName} ${displayScrollbar ? "" : "no-scrollbar"}`}
        onScroll={handleScroll}
        role="list"
        aria-label="Animated list"
      >
        {items.map((item, index) => (
          <AnimatedRow
            key={itemKey ? itemKey(item, index) : index}
            index={index}
            duration={duration}
            delay={stagger * index}
            onMouseEnter={() => setSelectedIndex(index)}
            onClick={() => {
              setSelectedIndex(index);
              onItemSelect?.(item, index);
            }}
          >
            {renderItem ? renderItem(item, index, selectedIndex === index) : null}
          </AnimatedRow>
        ))}
      </div>

      {showGradients && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-0 h-8 md:h-10"
            style={{ opacity: topOpacity, background: gradientTop, transition: "opacity 180ms ease" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 bottom-0 h-16 md:h-20"
            style={{ opacity: bottomOpacity, background: gradientBottom, transition: "opacity 180ms ease" }}
          />
        </>
      )}

      {/* Reduced-motion: keep things instant */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .almotion { transition: none !important; animation: none !important; }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

function AnimatedRow({ children, delay, duration, index, onMouseEnter, onClick }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.25, margin: "0px 0px -10% 0px" });

  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      className="almotion"
      initial={{ opacity: 0, scale: 0.97, y: 6 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.97, y: 6 }}
      transition={{ duration, delay, ease: "easeOut" }}
      role="listitem"
    >
      {children}
    </motion.div>
  );
}
