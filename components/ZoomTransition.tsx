"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

/**
 * ZoomTransition - Handles the zoom in/out transition between screens
 * 
 * When leaving home (zoom OUT):
 * 1. Core shape loses color → becomes B&W
 * 2. Zoom out effect
 * 3. New screen emerges from the zoomed-out shapes
 * 
 * When returning home (zoom IN):
 * 1. Current screen fades
 * 2. Zoom in effect
 * 3. Core shape regains color
 */

interface ZoomTransitionProps {
  isActive: boolean;
  direction: "in" | "out"; // "out" = leaving home, "in" = returning home
  onComplete?: () => void;
  children?: React.ReactNode;
}

export default function ZoomTransition({
  isActive,
  direction,
  onComplete,
  children,
}: ZoomTransitionProps) {
  const [phase, setPhase] = useState<"idle" | "desaturate" | "zoom" | "emerge" | "complete">("idle");

  useEffect(() => {
    if (!isActive) {
      setPhase("idle");
      return;
    }

    // Animation sequence
    const timers = [
      setTimeout(() => setPhase("desaturate"), 0),
      setTimeout(() => setPhase("zoom"), 400),
      setTimeout(() => setPhase("emerge"), 1000),
      setTimeout(() => {
        setPhase("complete");
        onComplete?.();
      }, 1600),
    ];

    return () => timers.forEach(clearTimeout);
  }, [isActive, onComplete]);

  if (!isActive && phase === "idle") return null;

  const isZoomOut = direction === "out";

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-40 pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Zoom effect layer */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ 
              scale: isZoomOut ? 1 : 0.3,
              filter: "grayscale(0)",
            }}
            animate={{
              scale: phase === "zoom" || phase === "emerge" || phase === "complete"
                ? (isZoomOut ? 0.3 : 1)
                : (isZoomOut ? 1 : 0.3),
              filter: phase === "desaturate" || phase === "zoom"
                ? "grayscale(1)"
                : "grayscale(0)",
            }}
            transition={{
              scale: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
              filter: { duration: 0.4, ease: "easeInOut" },
            }}
          >
            {/* Grid of small tetrahedrons for the zoom effect */}
            <TetrahedronGrid 
              visible={phase === "zoom" || phase === "emerge"} 
              direction={direction}
            />
          </motion.div>

          {/* Emerging content overlay */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at center, transparent 30%, rgba(10,10,10,0.9) 100%)",
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: phase === "emerge" || phase === "complete" ? 0 : 0.8,
            }}
            transition={{ duration: 0.5 }}
          />

          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Grid of small tetrahedrons that appear during zoom transition
 */
function TetrahedronGrid({ 
  visible, 
  direction 
}: { 
  visible: boolean;
  direction: "in" | "out";
}) {
  // Generate grid positions
  const gridItems = [];
  const cols = 8;
  const rows = 6;
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = (col - cols / 2) * 120 + 60;
      const y = (row - rows / 2) * 140 + 70;
      const delay = (row + col) * 0.02;
      
      gridItems.push({ x, y, delay, id: `${row}-${col}` });
    }
  }

  return (
    <div className="relative w-full h-full">
      {gridItems.map((item) => (
        <motion.div
          key={item.id}
          className="absolute"
          style={{
            left: "50%",
            top: "50%",
            width: 60,
            height: 84,
          }}
          initial={{ 
            x: item.x, 
            y: item.y, 
            opacity: 0,
            scale: direction === "out" ? 2 : 0.5,
          }}
          animate={
            visible
              ? { 
                  x: item.x, 
                  y: item.y, 
                  opacity: 0.4,
                  scale: 1,
                }
              : { 
                  x: item.x, 
                  y: item.y, 
                  opacity: 0,
                  scale: direction === "out" ? 0.5 : 2,
                }
          }
          transition={{
            duration: 0.6,
            delay: item.delay,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <svg viewBox="0 0 200 280" className="w-full h-full">
            <polygon points="100,10 40,70 100,120" fill="#555" />
            <polygon points="100,10 160,70 100,120" fill="#444" />
            <polygon points="100,120 30,200 100,270" fill="#333" />
            <polygon points="100,120 170,200 100,270" fill="#222" />
            <polygon points="100,270 30,200 170,200" fill="#1a1a1a" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

/**
 * Hook to manage zoom transitions
 */
export function useZoomTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<"in" | "out">("out");

  const triggerZoomOut = useCallback(() => {
    setDirection("out");
    setIsTransitioning(true);
  }, []);

  const triggerZoomIn = useCallback(() => {
    setDirection("in");
    setIsTransitioning(true);
  }, []);

  const handleComplete = useCallback(() => {
    setIsTransitioning(false);
  }, []);

  return {
    isTransitioning,
    direction,
    triggerZoomOut,
    triggerZoomIn,
    handleComplete,
  };
}
