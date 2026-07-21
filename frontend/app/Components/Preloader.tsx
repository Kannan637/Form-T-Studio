"use client";

import { useState, useEffect } from "react";
import { motion, animate } from "framer-motion";

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [count, setCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);

  useEffect(() => {
    // Lock scroll during preloader
    document.body.style.overflow = "hidden";
    
    // 0 to 100 faster
    const controls = animate(0, 100, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1], // Smooth premium ease
      onUpdate: (value) => setCount(Math.round(value)),
      onComplete: () => {
        setIsComplete(true);
        if (onComplete) onComplete();
        
        // Unmount the preloader entirely after animations finish
        setTimeout(() => {
          setIsUnmounted(true);
          document.body.style.overflow = "auto";
        }, 1500);
      },
    });

    return () => {
      controls.stop();
      document.body.style.overflow = "auto";
    };
  }, [onComplete]);

  if (isUnmounted) return null;

  return (
    <>
      {/* 
        Expanding Square Reveal Overlay 
        This div is a transparent box with a massive white shadow that covers the screen.
        When it expands, it looks exactly like a white screen opening from the center.
      */}
      <div className="fixed inset-0 z-[9998] pointer-events-none flex items-center justify-center overflow-hidden">
        <motion.div
          className="bg-transparent"
          initial={{ width: "0vw", height: "0vh", boxShadow: "0 0 0 100vw #FFFFFF" }}
          animate={isComplete ? { width: "150vw", height: "150vh", boxShadow: "0 0 0 100vw #FFFFFF" } : { width: "0vw", height: "0vh", boxShadow: "0 0 0 100vw #FFFFFF" }}
          transition={{ duration: 2.2, ease: [0.76, 0, 0.24, 1] }}
        />
      </div>

      {/* Preloader Text */}
      <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center">
        <motion.div
          className="text-small text-black mix-blend-difference tracking-[0.3em]"
          initial={{ y: 0, opacity: 1 }}
          animate={isComplete ? { y: "-40vh", opacity: 0 } : { y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {count}%
        </motion.div>
      </div>
    </>
  );
}
