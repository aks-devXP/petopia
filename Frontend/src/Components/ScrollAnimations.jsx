import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

const ScrollBox = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  // Transition position from (0,0) to center of page
  const y = useTransform(scrollYProgress, [0, 1], [0, 1500]);
  
  // Transition size from 50px to 100px
  const size = useTransform(scrollYProgress, [0, 1], [50, 100]);

  return (
    <div ref={containerRef} className="h-[3000px] w-full bg-gray-900">
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: size,
          height: size,
          y,
          backgroundColor: "red",
        }}
      />
    </div>
  );
};

export default ScrollBox;
