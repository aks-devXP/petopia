import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import paw from "./pwr.svg";


const ScrollBox = () => {
  const { scrollYProgress } = useScroll(); // Track scroll progress

  // Track window size for responsiveness
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Define teleportation steps
  const stepSize = 100; // Distance per teleport
  const steps = 5; // Number of teleportation steps

  // Compute step index from scroll
  const stepIndex = useTransform(scrollYProgress, [0, 1], [0, steps]);

  // Compute alternating positions
  const xPos1 = useTransform(stepIndex, (step) => Math.floor(step) * stepSize * 2.5);
  const yPos1 = useTransform(stepIndex, (step) => Math.floor(step) * stepSize);
  const xPos2 = useTransform(stepIndex, (step) => Math.floor(step) * stepSize * 2.5 - stepSize*1.5);
  const yPos2 = useTransform(stepIndex, (step) => Math.floor(step) * stepSize + stepSize*0.5);

  // Opacity control: One fades out while the other fades in
  const opacity1 = useTransform(stepIndex, (step) => 1 - (step % 1));
  const opacity2 = useTransform(stepIndex, (step) => step % 1);

  return (
    <div className="h-[3000px] w-full">
      {/* First teleporting div */}
      <motion.img
        src={paw}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 100,
          height: 100,
          x: xPos1,
          y: yPos1,
          opacity: opacity1,
          rotate: -45,
          borderRadius: 50,
        }}
        transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
      />
      
      {/* Second teleporting div (offset by stepSize) */}
      <motion.img
        src={paw}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 100,
          height: 100,
          x: xPos2,
          y: yPos2,
          opacity: opacity1,
          rotate: -45,
          borderRadius: 50,
        }}
        transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
      />
    </div>
  );
};

export default ScrollBox;
