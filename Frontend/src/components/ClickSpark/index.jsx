import React, { useEffect, useRef, useCallback } from "react";

/**
 * Full-screen click/tap spark layer.
 * Fixed canvas over the page; listens to pointer events on the window.
 *
 * Props:
 * - sparkColor: stroke color of sparks
 * - sparkCount: number of rays per burst
 * - sparkSize: base length of each ray
 * - sparkRadius: how far rays travel
 * - lineWidth: canvas stroke width
 * - duration: life in ms for each burst
 * - easing: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out'
 * - extraScale: multiplier on radius (1.0 default)
 * - trail: if true, also emit sparks while dragging
 * - throttleMs: min ms between trail emissions
 */
export default function ClickSpark({
  sparkColor = "#0c2b37",           // use your brand if you want
  sparkCount = 9,
  sparkSize = 12,
  sparkRadius = 18,
  lineWidth = 2,
  duration = 420,
  easing = "ease-out",
  extraScale = 1.0,
  trail = true,
  throttleMs = 70,
}) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const rafRef = useRef(null);
  const sparksRef = useRef([]);
  const dprRef = useRef(1);
  const mountedRef = useRef(false);
  const lastTrailRef = useRef(0);
  const reduceMotionRef = useRef(false);

  // Easing
  const ease = useCallback((t) => {
    switch (easing) {
      case "linear": return t;
      case "ease-in": return t * t;
      case "ease-in-out": return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      default: return t * (2 - t); // ease-out
    }
  }, [easing]);

  // Resize canvas to viewport with DPR
  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    dprRef.current = dpr;

    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    // allocate real pixels
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);

    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // so we can draw in CSS pixels
    ctx.lineCap = "round";
    ctxRef.current = ctx;
  }, []);

  // Emit a burst at viewport coords
  const emit = useCallback((x, y) => {
    if (reduceMotionRef.current) return;
    const now = performance.now();
    const rays = Array.from({ length: sparkCount }, (_, i) => {
      // slight random jitter for organic look
      const angle = (2 * Math.PI * i) / sparkCount + (Math.random() - 0.5) * 0.12;
      return { x, y, angle, start: now };
    });
    sparksRef.current.push(...rays);
  }, [sparkCount]);

  // Pointer handlers (window-level so it works “everywhere”)
  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    reduceMotionRef.current = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    const onClick = (e) => emit(e.clientX, e.clientY);
    let isDown = false;

    const onPointerDown = (e) => {
      isDown = true;
      emit(e.clientX, e.clientY);
    };
    const onPointerUp = () => { isDown = false; };
    const onPointerMove = (e) => {
      if (!trail || !isDown) return;
      const now = performance.now();
      if (now - lastTrailRef.current >= throttleMs) {
        lastTrailRef.current = now;
        emit(e.clientX, e.clientY);
      }
    };

    window.addEventListener("click", onClick, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerUp, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    // Setup canvas
    resize();
    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    // Animation loop
    const draw = (ts) => {
      const ctx = ctxRef.current;
      const canvas = canvasRef.current;
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = performance.now();
      ctx.strokeStyle = sparkColor;
      ctx.lineWidth = lineWidth;

      sparksRef.current = sparksRef.current.filter((s) => {
        const t = (now - s.start) / duration;
        if (t >= 1) return false;

        const k = ease(t);
        const dist = k * sparkRadius * extraScale;
        const len = sparkSize * (1 - k);

        const x1 = s.x + dist * Math.cos(s.angle);
        const y1 = s.y + dist * Math.sin(s.angle);
        const x2 = s.x + (dist + len) * Math.cos(s.angle);
        const y2 = s.y + (dist + len) * Math.sin(s.angle);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("click", onClick);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [emit, resize, sparkColor, lineWidth, duration, ease, sparkRadius, extraScale, sparkSize, trail, throttleMs]);

  // Just the canvas; no wrapper so it truly overlays *everything*
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[60]" // above your UI, below any toasts if needed
    />
  );
}
