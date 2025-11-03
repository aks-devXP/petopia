// CardNav.jsx
import { useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { FiChevronRight } from 'react-icons/fi';
import { PawPrint, Clock, CalendarDays } from 'lucide-react';

const CardNav = ({
  items = [],
  className = '',
  ease = 'power3.out',
  baseColor = '#fff',
  menuColor = '#0f172a',
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);
  const navigate = useNavigate(); // ← use router navigation (respects basename)

  const pets = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Other'];

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content');
      if (contentEl) {
        const prev = {
          visibility: contentEl.style.visibility,
          pointer: contentEl.style.pointerEvents,
          position: contentEl.style.position,
          height: contentEl.style.height,
        };
        contentEl.style.visibility = 'visible';
        contentEl.style.pointerEvents = 'auto';
        contentEl.style.position = 'static';
        contentEl.style.height = 'auto';
        // force reflow
        // eslint-disable-next-line no-unused-expressions
        contentEl.offsetHeight;

        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = prev.visibility;
        contentEl.style.pointerEvents = prev.pointer;
        contentEl.style.position = prev.position;
        contentEl.style.height = prev.height;

        return topBar + contentHeight + padding;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });
    tl.to(navEl, { height: calculateHeight, duration: 0.4, ease });
    tl.to(
      cardsRef.current,
      { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 },
      '-=0.1'
    );
    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;
    return () => {
      tl?.kill();
      tlRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;
      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) tlRef.current = newTl;
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = (i) => (el) => {
    if (el) cardsRef.current[i] = el;
  };

  // Helper: safe navigate
  const go = (href) => {
    if (!href) return;
    // External links (http/https) open normally
    if (/^https?:\/\//i.test(href)) {
      window.location.href = href;
      return;
    }
    // Internal links go through React Router (basename-aware)
    navigate(href);
  };

  return (
    <div className={`w-full z-[999] ${className}`}>
      <nav
        ref={navRef}
        className="card-nav block h-[60px] p-0 rounded-xl relative overflow-hidden will-change-[height]"
        style={{ backgroundColor: baseColor }}
      >
        {/* TOP BAR — Pet / Time / Date / Hamburger */}
        <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] px-3 z-[999]">
          <div className="h-full w-full grid grid-cols-4 sm:grid-cols-10 items-center gap-0 sm:gap-8 text-slate-900">
            {/* Pet */}
            <div className="flex items-center gap-2 min-w-0 sm:col-span-3">
              <span className="inline-flex items-center gap-1 text-xs sm:text-sm text-slate-700 font-semibold">
                <PawPrint className="h-4 w-4 opacity-80" aria-hidden="true" />
                Pet
              </span>
              <select
                className="w-full rounded-lg border border-slate-200 px-3 py-2 bg-white outline-none focus:border-slate-400 text-sm"
                defaultValue=""
                aria-label="Select Pet"
              >
                <option value="" disabled>Choose</option>
                {pets.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Time */}
            <div className="flex items-center gap-2 min-w-0 sm:col-span-3">
              <span className="inline-flex items-center gap-1 text-xs sm:text-sm text-slate-700 font-semibold">
                <Clock className="h-4 w-4 opacity-80" aria-hidden="true" />
                Time
              </span>
              <input
                type="time"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 bg-white outline-none focus:border-slate-400 text-sm"
                aria-label="Select Time"
              />
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 min-w-0 sm:col-span-3">
              <span className="inline-flex items-center gap-1 text-xs sm:text-sm text-slate-700 font-semibold">
                <CalendarDays className="h-4 w-4 opacity-80" aria-hidden="true" />
                Date
              </span>
              <input
                type="date"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 bg-white outline-none focus:border-slate-400 text-sm"
                aria-label="Select Date"
              />
            </div>

            {/* Hamburger (right-most) */}
            <div className="flex items-center justify-end sm:justify-center sm:col-span-1">
              <div
                className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''} group h-[36px] w-[36px] flex flex-col items-center justify-center cursor-pointer gap-[6px] rounded-md hover:bg-slate-100 transition`}
                onClick={toggleMenu}
                role="button"
                aria-label={isExpanded ? 'Close menu' : 'Open menu'}
                tabIndex={0}
                style={{ color: menuColor }}
              >
                <div
                  className={`hamburger-line w-[22px] h-[3px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear ${
                    isHamburgerOpen ? 'translate-y-[4px] rotate-45' : ''
                  }`}
                />
                <div
                  className={`hamburger-line w-[22px] h-[3px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear ${
                    isHamburgerOpen ? '-translate-y-[4px] -rotate-45' : ''
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* EXPANDABLE CONTENT — each CARD is the only clickable target */}
        <div
          className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col items-stretch gap-2 justify-start ${
            isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
          } md:flex-row md:items-end md:gap-[12px]`}
          aria-hidden={!isExpanded}
        >
          {(items || []).slice(0, 3).map((item, idx) => {
            const handleActivate = () => {
              if (typeof item.onClick === 'function') item.onClick(item);
              else if (item.href) go(item.href); // ← navigate via router
            };
            return (
              <div
                key={`${item.title ?? 'card'}-${idx}`}
                ref={setCardRef(idx)}
                role="button"
                tabIndex={0}
                onClick={handleActivate}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleActivate();
                  }
                }}
                className="nav-card relative select-none cursor-pointer flex flex-col gap-3 p-[12px_16px] rounded-[calc(0.75rem-0.2rem)] min-w-0 flex-[1_1_auto] h-auto min-h-[84px] md:h-full md:min-h-0 md:flex-[1_1_0%] text-white
                           transition shadow-sm hover:shadow-md hover:-translate-y-[1px] ring-0 hover:ring-1 hover:ring-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                style={{ backgroundColor: item.bgColor, color: item.textColor }}
              >
                {/* Header */}
                <div className="flex items-center justify-between gap-2">
                  <div className="nav-card-label font-semibold tracking-[-0.2px] text-[18px] md:text-[20px]">
                    {item.title}
                  </div>
                  <FiChevronRight className="opacity-90" aria-hidden="true" />
                </div>

                {/* Services list — purely informational now */}
                <ul className="mt-auto flex flex-wrap gap-2">
                  {(item.services || []).map((svc, i) => (
                    <li
                      key={`${svc.label}-${i}`}
                      className="text-[13px] md:text-[14px] px-2 py-[6px] rounded-md bg-white/10"
                    >
                      {svc.label}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
