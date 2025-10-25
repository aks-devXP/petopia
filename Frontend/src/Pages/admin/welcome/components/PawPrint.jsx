import React, { useEffect, useRef, useState } from "react";

/**
 * PawPrint (locked images, no hover, text clipped to the main pad)
 * - Color underlay + photo overlay per toe (unchanged geometry & transforms)
 * - Photos use a single pattern tile per toe (no tiling), with padding + unsquish + zoom + offset
 * - Text is rendered via <foreignObject> and clipped to the main pad
 * - Text box auto-centers by measuring the pad's bbox (no magic numbers)
 */
export default function PawPrint({
  className = "w-[700px]",
  fill = "#e9ddd5",
  toeImages = [null, null, null, null],
  padChildren = null,
}) {
  // Canvas/viewBox crop
  const VBX = 0;
  const VBY = 180;
  const VBW = 595.276;
  const VBH = 550;

  // Original shift from your source SVG
  const T = "translate(269.81467,-650.62904)";

  /* ===== LOCKED TUNING (leave as-is) ===== */
  const IMG_PADDING = 0.06;
  const IMG_ZOOM = 0.8;
  const UNSQUISH_X = 1.45;
  const UNSQUISH_Y = 1.0;
  const OFFSETS = [
    { x: 0.15, y: 0.20 }, // left outer
    { x: -0.15, y: 0.25 }, // right outer
    { x: 0.10, y: 0.20 }, // left inner
    { x: 0.00, y: 0.30 }, // right inner
  ];
  /* ====================================== */

  const clampPad = (v) => Math.min(Math.max(v, 0), 0.45);

  // Measure the pad bbox AFTER transforms so we can center text reliably
  const padMeasureRef = useRef(null);
  const [bbox, setBbox] = useState(null);

  useEffect(() => {
    const el = padMeasureRef.current;
    if (el && typeof el.getBBox === "function") {
      try {
        const b = el.getBBox();
        const pad = 6; // small breathing room
        setBbox({
          x: b.x - pad,
          y: b.y - pad,
          width: b.width + pad * 2,
          height: b.height + pad * 2,
        });
      } catch {
        // Fallback: large area; clipping will keep it inside the pad anyway
        setBbox({ x: -2000, y: -2000, width: 4000, height: 4000 });
      }
    }
  }, []);

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox={`${VBX} ${VBY} ${VBW} ${VBH}`}
        className="w-full h-auto block"
        role="img"
        aria-label="Paw"
      >
        <defs>
          {/* Toe & pad geometry */}
          <path id="toe0" d="m -126.267,1038.85 c 22.737,50.44 15.792,102.75 -15.51,116.87 -31.303,14.12 -75.11,-15.31 -97.845,-65.74 -22.737,-50.43 -15.793,-102.745 15.51,-116.863 31.303,-14.114 75.108,15.317 97.845,65.733 z"/>
          <path id="toe1" d="m 183.155,1038.85 c -22.738,50.44 -15.793,102.75 15.512,116.87 31.303,14.12 75.106,-15.31 97.846,-65.74 22.734,-50.43 15.789,-102.745 -15.513,-116.863 -31.301,-14.114 -75.108,15.317 -97.845,65.733 z"/>
          <path id="toe2" d="m 6.7856,937.757 c 11.6548,54.069 -6.1108,103.763 -39.6787,111.003 -33.5654,7.23 -70.2249,-30.74 -81.8779,-84.804 -11.653,-54.068 6.112,-103.764 39.6792,-110.997 33.5669,-7.236 70.2246,30.729 81.8774,84.798 z"/>
          <path id="toe3" d="m 49.2676,937.803 c -11.6446,54.068 6.1084,103.767 39.6738,110.997 33.5676,7.24 70.2256,-30.73 81.8776,-84.797 11.654,-54.069 -6.109,-103.765 -39.678,-110.998 -33.5678,-7.234 -70.225,30.729 -81.8734,84.798 z"/>
          <path id="pad"  d="m -35.2275,1118.5 c -8.1924,14.15 -46.1563,60.99 -72.4145,76.97 -26.256,15.98 -58.792,39.38 -53.332,93.11 5.457,53.74 60.575,76.74 96.8597,74.7 36.2867,-2.03 104.6993,-8.71 153.543,-1.94 48.8413,6.77 110.4863,1.64 124.9223,-49.81 14.436,-51.45 -17.85,-84.23 -43.044,-102.83 -25.193,-18.59 -67.265,-74.2 -80.2269,-99.73 -12.96,-25.52 -78.9268,-72.26 -126.3076,9.53 z"/>

          {/* Clip in user-space so the group transform applies to both */}
          <clipPath id="clip-pad" clipPathUnits="userSpaceOnUse">
            <use href="#pad" />
          </clipPath>

          {/* One pattern per toe (single tile). */}
          {[0,1,2,3].map((i) => (
            toeImages[i] ? (
              <pattern
                key={`p${i}`}
                id={`pat-${i}`}
                patternUnits="objectBoundingBox"
                patternContentUnits="objectBoundingBox"
                x="0" y="0" width="1" height="1"
              >
                <g transform={`translate(${clampPad(IMG_PADDING)},${clampPad(IMG_PADDING)}) scale(${1 - 2 * clampPad(IMG_PADDING)})`}>
                  <g transform={`translate(0.5,0.5) scale(${UNSQUISH_X},${UNSQUISH_Y}) scale(${IMG_ZOOM}) translate(-0.5,-0.5) translate(${OFFSETS[i].x},${OFFSETS[i].y})`}>
                    <image href={toeImages[i]} x="0" y="0" width="1" height="1" preserveAspectRatio="xMidYMid meet" />
                  </g>
                </g>
              </pattern>
            ) : null
          ))}
        </defs>

        {/* Everything (including text) shares the SAME transform */}
        <g transform={T}>
          {/* Invisible pad to measure transformed bbox */}
          <use href="#pad" ref={padMeasureRef} opacity="0" />

          {/* Base fill */}
          {[0,1,2,3].map((i) => <use key={`c${i}`} href={`#toe${i}`} fill={fill} />)}
          <use href="#pad" fill={fill} />

          {/* Image overlays */}
          {[0,1,2,3].map((i) =>
            toeImages[i] ? <use key={`img${i}`} href={`#toe${i}`} fill={`url(#pat-${i})`} /> : null
          )}

          {/* TEXT inside the pad (centered, clipped, black) */}
          {padChildren && bbox && (
            <foreignObject
              x={bbox.x}
              y={bbox.y}
              width={bbox.width}
              height={bbox.height}
              clipPath="url(#clip-pad)"
            >
              <div
                xmlns="http://www.w3.org/1999/xhtml"
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Centered content; color enforced to black in case child brings its own color */}
                <div className="text-center" style={{ color: "#000000" }}>
                  {padChildren}
                </div>
              </div>
            </foreignObject>
          )}
        </g>
      </svg>
    </div>
  );
}
