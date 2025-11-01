import { useEffect, useRef, useState, Fragment } from 'react';

const TextPressure = ({
  text = 'Compressa',
  fontFamily = 'inherit',              // inherit your site font by default
  fontUrl = '',                        // no @font-face injection unless provided
  width = true,
  weight = true,
  italic = true,
  alpha = false,
  flex = false,                        // keep natural spacing; no justify-between
  stroke = false,
  scale = false,                       // no Y-scaling; preserve layout
  textColor = 'currentColor',          // inherit color
  strokeColor = '#000000',
  strokeWidth = 2,
  className = '',
  minFontSize = 24,
  autoSize = false,                    // NEW: keep your Tailwind font-size by default
  respectLineBreaks = true             // NEW: support \n line breaks
}) => {
  const containerRef = useRef(null);
  const titleRefs = useRef([]);        // one H1 per line
  const spanRefs = useRef([]);         // 2D array: lines -> chars

  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });

  const [scaleY, setScaleY] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);

  const lines = respectLineBreaks ? String(text).split('\n') : [String(text)];

  // Ensure nested refs arrays exist
  if (spanRefs.current.length !== lines.length) {
    spanRefs.current = lines.map((_, i) => spanRefs.current[i] || []);
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };
    const handleTouchMove = (e) => {
      const t = e.touches[0];
      cursorRef.current.x = t.clientX;
      cursorRef.current.y = t.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    if (containerRef.current) {
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = left + width / 2;
      mouseRef.current.y = top + height / 2;
      cursorRef.current.x = mouseRef.current.x;
      cursorRef.current.y = mouseRef.current.y;
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const setSize = () => {
    if (!containerRef.current) return;

    // Only scale vertically if explicitly asked
    if (scale && titleRefs.current[0]) {
      const containerH = containerRef.current.getBoundingClientRect().height;
      const totalH = titleRefs.current.reduce((acc, h) => {
        if (!h) return acc;
        const r = h.getBoundingClientRect();
        return acc + r.height;
      }, 0);
      if (totalH > 0) {
        const yRatio = containerH / totalH;
        setScaleY(yRatio);
        setLineHeight(yRatio);
      }
    } else {
      setScaleY(1);
      setLineHeight(1);
    }
  };

  useEffect(() => {
    if (autoSize) {
      setSize();
      const ro = new ResizeObserver(setSize);
      ro.observe(containerRef.current);
      return () => ro.disconnect();
    } else {
      // Keep Tailwind font sizes; do not override
      setScaleY(1);
      setLineHeight(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoSize, scale, text]);

  useEffect(() => {
    let rafId;
    const animate = () => {
      const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
      if (!reduce) {
        mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
        mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;
      }

      // For each line, compute maxDist based on its width
      titleRefs.current.forEach((lineEl, li) => {
        if (!lineEl) return;

        const lineRect = lineEl.getBoundingClientRect();
        const maxDist = Math.max(1, lineRect.width / 2);

        spanRefs.current[li].forEach((span) => {
          if (!span) return;
          const rect = span.getBoundingClientRect();
          const charCenter = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };

          const dx = mouseRef.current.x - charCenter.x;
          const dy = mouseRef.current.y - charCenter.y;
          const d = Math.sqrt(dx * dx + dy * dy);

          const getAttr = (distance, minVal, maxVal) => {
            const val = maxVal - Math.abs((maxVal * distance) / maxDist);
            return Math.max(minVal, val + minVal);
          };

          const wdth = width ? Math.floor(getAttr(d, 5, 200)) : 100;
          const wght = weight ? Math.floor(getAttr(d, 100, 900)) : 400;
          const italVal = italic ? getAttr(d, 0, 1).toFixed(2) : 0;
          const alphaVal = alpha ? getAttr(d, 0, 1).toFixed(2) : 1;

          span.style.opacity = alphaVal;
          span.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;
        });
      });

      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, [width, weight, italic, alpha, lines.length]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-visible bg-transparent">
      {/* Only inject @font-face if a URL is provided */}
      {fontUrl ? (
        <style>{`
          @font-face {
            font-family: '${fontFamily}';
            src: url('${fontUrl}') format('woff2');
            font-style: normal;
            font-weight: 100 900;
            font-stretch: 50% 200%;
            font-display: swap;
          }
          .stroke span {
            position: relative;
            color: ${textColor};
          }
          .stroke span::after {
            content: attr(data-char);
            position: absolute;
            left: 0;
            top: 0;
            color: transparent;
            z-index: -1;
            -webkit-text-stroke-width: ${strokeWidth}px;
            -webkit-text-stroke-color: ${strokeColor};
          }
        `}</style>
      ) : null}

      <div className={`${stroke ? 'stroke' : ''} ${className}`} style={{ color: textColor }}>
        {lines.map((line, li) => {
          const chars = line.split('');
          return (
            <Fragment key={li}>
              <h1
                ref={(el) => (titleRefs.current[li] = el)}
                className={`${flex ? 'flex' : 'inline-block'} uppercase text-left`}
                style={{
                  fontFamily,
                  // Do NOT set fontSize here; we inherit your Tailwind classes
                  lineHeight,
                  transform: `scale(1, ${scaleY})`,
                  transformOrigin: 'left top',
                  margin: 0,
                  fontWeight: 100,
                }}
              >
                {chars.map((char, ci) => {
                // Special-case spaces so they keep width between words
                if (char === ' ') {
                    return (
                    <span
                        key={`${li}-${ci}-space`}
                        aria-hidden="true"
                        className="inline-block align-baseline"
                        style={{ width: '0.45ch' }}  // tweak to taste: 0.4–0.55ch
                    >
                        {/* keep empty; width provides the space */}
                    </span>
                    );
                }

                return (
                    <span
                    key={`${li}-${ci}`}
                    ref={(el) => (spanRefs.current[li][ci] = el)}
                    data-char={char}
                    className="inline-block align-baseline"
                    >
                    {char}
                    </span>
                );
                })}

              </h1>
              {li < lines.length - 1 ? <br /> : null}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default TextPressure;
