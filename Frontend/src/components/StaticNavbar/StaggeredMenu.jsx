import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

/**
 * StaggeredMenu (sample ratios, no socials/numbering)
 * - Panel: bg-ink-primary
 * - Items: text-app-bg; hover:text-brand
 * - NO Tailwind translate classes; GSAP controls transforms only.
 * - When closed: display:none + pointer-events:none + visibility:hidden
 *   (no layout impact / no mysterious right gap / no overlay on navbar).
 */
const StaggeredMenu = ({
  position = "right",
  colors = ["#B19EEF", "#5227FF"],
  items = [],
  className,
  menuButtonColor = "#0c2b37",
  openMenuButtonColor = "#0c2b37",
  changeMenuColorOnOpen = true,
  accentColor = "#5227FF",
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const busyRef = useRef(false);
  const navigate = useNavigate();

  // elements
  const panelRef = useRef(null);
  const preLayersRef = useRef(null);
  const preLayerElsRef = useRef([]);

  // + icon & “Menu/Close” animated label
  const plusHRef = useRef(null);
  const plusVRef = useRef(null);
  const iconRef = useRef(null);

  const textInnerRef = useRef(null);
  const textWrapRef = useRef(null);
  const [textLines, setTextLines] = useState(["Menu", "Close"]);

  // animations
  const openTlRef = useRef(null);
  const closeTweenRef = useRef(null);
  const spinTweenRef = useRef(null);
  const textCycleAnimRef = useRef(null);
  const toggleBtnRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;

      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;

      if (!panel || !plusH || !plusV || !icon || !textInner) return;

      // capture pre-layers
      preLayerElsRef.current = preContainer
        ? Array.from(preContainer.querySelectorAll(".sm-prelayer"))
        : [];

      const offscreen = position === "left" ? -100 : 100;

      // closed baseline = completely inert and not rendered
      gsap.set([panel, ...preLayerElsRef.current], {
        xPercent: offscreen,
        display: "none",
        visibility: "hidden",
        pointerEvents: "none",
      });

      gsap.set(plusH, { transformOrigin: "50% 50%", rotate: 0 });
      gsap.set(plusV, { transformOrigin: "50% 50%", rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });
      gsap.set(textInner, { yPercent: 0 });

      if (toggleBtnRef.current)
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    closeTweenRef.current?.kill();

    // make visible & interactive (just before play)
    gsap.set([panel, ...layers], {
      display: "block",
      visibility: "visible",
      pointerEvents: "auto",
    });

    const itemEls = Array.from(panel.querySelectorAll(".sm-panel-itemLabel"));
    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });

    const layerStates = layers.map((el) => ({
      el,
      start: Number(gsap.getProperty(el, "xPercent")),
    }));
    const panelStart = Number(gsap.getProperty(panel, "xPercent"));

    const tl = gsap.timeline({ paused: true });

    // pre-layer sweep (sample’s ratios)
    layerStates.forEach((ls, i) => {
      tl.fromTo(
        ls.el,
        { xPercent: ls.start },
        { xPercent: 0, duration: 0.5, ease: "power4.out" },
        i * 0.07
      );
    });

    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;

    // panel slide
    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: "power4.out" },
      panelInsertTime
    );

    // items stagger
    if (itemEls.length) {
      const itemsStart = panelInsertTime + panelDuration * 0.15;
      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: "power4.out",
          stagger: { each: 0.1, from: "start" },
        },
        itemsStart
      );
    }

    return (openTlRef.current = tl);
  }, []);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback("onComplete", () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const offscreen = position === "left" ? -100 : 100;
    const all = [...layers, panel];

    closeTweenRef.current?.kill();
    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: "power3.in",
      overwrite: "auto",
      onComplete: () => {
        // fully inert when closed
        gsap.set(all, { display: "none", visibility: "hidden", pointerEvents: "none" });
        busyRef.current = false;
      },
    });
  }, [position]);

  const animateIcon = useCallback((opening) => {
    const icon = iconRef.current;
    const h = plusHRef.current;
    const v = plusVRef.current;
    if (!icon || !h || !v) return;

    spinTweenRef.current?.kill();

    if (opening) {
      gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .to(h, { rotate: 45, duration: 0.5 }, 0)
        .to(v, { rotate: -45, duration: 0.5 }, 0);
    } else {
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: "power3.inOut" } })
        .to(h, { rotate: 0, duration: 0.35 }, 0)
        .to(v, { rotate: 90, duration: 0.35 }, 0)
        .to(icon, { rotate: 0, duration: 0.001 }, 0);
    }
  }, []);

  const animateButtonColor = useCallback(
    (opening) => {
      const btn = toggleBtnRef.current;
      if (!btn) return;

      if (changeMenuColorOnOpen) {
        gsap.to(btn, {
          color: opening ? openMenuButtonColor : menuButtonColor,
          delay: 0.18,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.set(btn, { color: menuButtonColor });
      }
    },
    [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]
  );

  const animateText = useCallback((opening) => {
    const inner = textInnerRef.current;
    if (!inner) return;

    textCycleAnimRef.current?.kill();

    const currentLabel = opening ? "Menu" : "Close";
    const targetLabel = opening ? "Close" : "Menu";
    const cycles = 3;

    const seq = [currentLabel];
    let last = currentLabel;
    for (let i = 0; i < cycles; i++) {
      last = last === "Menu" ? "Close" : "Menu";
      seq.push(last);
    }
    if (last !== targetLabel) seq.push(targetLabel);
    seq.push(targetLabel);

    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });

    const lineCount = seq.length;
    const finalShift = ((lineCount - 1) / lineCount) * 100;

    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5 + lineCount * 0.07,
      ease: "power4.out",
    });
  }, []);

  const toggleMenu = useCallback(() => {
    if (busyRef.current) return;
    const next = !openRef.current;
    openRef.current = next;
    setOpen(next);

    if (next) playOpen();
    else playClose();

    animateIcon(next);
    animateButtonColor(next);
    animateText(next);
  }, [playOpen, playClose, animateIcon, animateButtonColor, animateText]);

  const handleNavigate = (to) => {
    if (openRef.current) toggleMenu();
    setTimeout(() => navigate(to), 180);
  };

  return (
    <div
      className={`sm-scope ${className || ""}`}
      style={accentColor ? { ["--sm-accent"]: accentColor } : undefined}
    >
      {/* Inline toggle (inside your navbar) */}
      <button
        ref={toggleBtnRef}
        className="sm-toggle relative inline-flex items-center gap-[0.3rem] bg-transparent border-0 cursor-pointer text-[#e9e9ef] font-medium leading-none"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="staggered-menu-panel"
        onClick={toggleMenu}
        type="button"
      >
        <span
          ref={textWrapRef}
          className="sm-toggle-textWrap relative inline-block h-[1em] overflow-hidden whitespace-nowrap"
          aria-hidden="true"
        >
          <span ref={textInnerRef} className="sm-toggle-textInner flex flex-col leading-none text-ink-primary text-xl font-semibold">
            {textLines.map((l, i) => (
              <span className="sm-toggle-line block h-[1em] leading-none text-ink-primary text-xl font-semibold" key={i}>
                {l}
              </span>
            ))}
          </span>
        </span>

        <span
          ref={iconRef}
          className="sm-icon relative w-[16px] h-[16px] inline-flex items-center justify-center text-ink-primary text-xl font-semibold"
          aria-hidden="true"
        >
          <span
            ref={plusHRef}
            className="sm-icon-line absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-[2px] -translate-x-1/2 -translate-y-1/2"
          />
          <span
            ref={plusVRef}
            className="sm-icon-line absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-[2px] -translate-x-1/2 -translate-y-1/2"
          />
        </span>
      </button>

      {/* Pre-layers (fixed; display toggled by GSAP) */}
      <div
        ref={preLayersRef}
        className="sm-prelayers fixed top-0 bottom-0 right-0 pointer-events-none z-[60] w-[clamp(260px,38vw,420px)]"
        aria-hidden="true"
      >
        {(colors && colors.length ? colors.slice(0, 3) : ["#1e1e22", "#35353c"]).map((c, i) => (
          <div key={i} className="sm-prelayer absolute top-0 right-0 h-full w-full" style={{ background: c }} />
        ))}
      </div>

      {/* Panel */}
      <aside
        id="staggered-menu-panel"
        ref={panelRef}
        className="
          fixed top-0 right-0 h-screen w-[clamp(260px,38vw,420px)]
          bg-ink-primary backdrop-blur-[12px]
          p-[6em_2em_2em_2em]
          flex flex-col gap-6 overflow-y-auto z-[70] shadow-xl
        "
        style={{ WebkitBackdropFilter: "blur(12px)" }}
        aria-hidden={!open}
      >
        {/* Close inside panel */}
        <button
          type="button"
          onClick={toggleMenu}
          className="absolute top-6 right-6 text-app-bg/80 hover:text-app-bg transition"
          aria-label="Close"
          title="Close"
        >
          ✕
        </button>

        <ul className="list-none m-0 p-0 flex flex-col gap-3" role="list">
          {items && items.length ? (
            items.map((it, idx) => (
              <li className="relative overflow-hidden leading-none" key={it.label + idx}>
                <button
                  onClick={() => handleNavigate(it.to)}
                  aria-label={it.ariaLabel}
                  className="
                    relative text-app-bg font-semibold
                    text-[clamp(1.75rem,7vw,4rem)]  /* responsive size */
                    leading-[0.95] tracking-[-1px] uppercase
                    cursor-pointer transition-colors duration-150 ease-linear inline-block
                    no-underline pr-[1.4em] hover:text-brand break-words
                  "
                  type="button"
                >
                  <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                    {it.label}
                  </span>
                </button>
              </li>
            ))
          ) : (
            <li className="relative overflow-hidden leading-none" aria-hidden="true">
              <span className="relative text-app-bg font-semibold text-[clamp(1.75rem,7vw,4rem)] leading-[0.95] tracking-[-1px] uppercase">
                No items
              </span>
            </li>
          )}
        </ul>
      </aside>

      {/* Scoped styles */}
      <style>{`
.sm-toggle:focus-visible { outline: 2px solid #ffffffaa; outline-offset: 4px; border-radius: 4px; }
.sm-icon-line { will-change: transform; }

/* No numbering anywhere */

/* Responsive: panel goes full width on small screens, but stays hidden when closed (display:none via GSAP) */
@media (max-width: 1024px) {
  .staggered-menu-panel { width: 100%; left: 0; right: 0; }
  .sm-prelayers { width: 100%; left: 0; right: 0; }
}
@media (max-width: 640px) {
  .staggered-menu-panel { width: 100%; left: 0; right: 0; }
  .sm-prelayers { width: 100%; left: 0; right: 0; }
}
      `}</style>
    </div>
  );
};

export default StaggeredMenu;
