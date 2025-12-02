"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useMemo } from "react";

/**
 * MatrixTransition - The "WOW" effect
 * Screen explodes into a matrix of shapes, zooms out, then zooms into next page
 */

interface MatrixShape {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  delay: number;
  type: "triangle" | "diamond" | "square";
}

interface MatrixTransitionProps {
  isActive: boolean;
  onComplete?: () => void;
  color?: "indigo" | "pink" | "cyan";
}

export default function MatrixTransition({
  isActive,
  onComplete,
  color = "indigo",
}: MatrixTransitionProps) {
  const [phase, setPhase] = useState<"idle" | "explode" | "matrix" | "zoom" | "complete">("idle");

  const colors = {
    indigo: { primary: "rgba(99,102,241,0.6)", secondary: "rgba(99,102,241,0.3)" },
    pink: { primary: "rgba(236,72,153,0.6)", secondary: "rgba(236,72,153,0.3)" },
    cyan: { primary: "rgba(34,211,238,0.6)", secondary: "rgba(34,211,238,0.3)" },
  };

  // Generate matrix grid of shapes
  const matrixShapes = useMemo(() => {
    const shapes: MatrixShape[] = [];
    const gridSize = 8;
    const types: ("triangle" | "diamond" | "square")[] = ["triangle", "diamond", "square"];

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const centerX = (col + 0.5) * (100 / gridSize);
        const centerY = (row + 0.5) * (100 / gridSize);
        const distFromCenter = Math.sqrt(Math.pow(centerX - 50, 2) + Math.pow(centerY - 50, 2));

        shapes.push({
          id: row * gridSize + col,
          x: centerX,
          y: centerY,
          rotation: Math.random() * 360,
          scale: 0.8 + Math.random() * 0.4,
          delay: distFromCenter * 0.01, // Ripple from center
          type: types[Math.floor(Math.random() * types.length)],
        });
      }
    }
    return shapes;
  }, []);

  const getShapePath = (type: string, size: number) => {
    switch (type) {
      case "triangle":
        return `M${size / 2} 0 L${size} ${size} L0 ${size} Z`;
      case "diamond":
        return `M${size / 2} 0 L${size} ${size / 2} L${size / 2} ${size} L0 ${size / 2} Z`;
      case "square":
        return `M0 0 L${size} 0 L${size} ${size} L0 ${size} Z`;
      default:
        return `M${size / 2} 0 L${size} ${size} L0 ${size} Z`;
    }
  };

  // Trigger animation sequence
  const startTransition = useCallback(() => {
    setPhase("explode");

    // Phase 2: Matrix forms
    setTimeout(() => setPhase("matrix"), 400);

    // Phase 3: Zoom out
    setTimeout(() => setPhase("zoom"), 1200);

    // Phase 4: Complete
    setTimeout(() => {
      setPhase("complete");
      onComplete?.();
    }, 2000);

    // Reset
    setTimeout(() => setPhase("idle"), 2500);
  }, [onComplete]);

  // Start when activated
  if (isActive && phase === "idle") {
    startTransition();
  }

  return (
    <AnimatePresence>
      {phase !== "idle" && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Background that zooms */}
          <motion.div
            className="absolute inset-0 bg-[#030308]"
            initial={{ scale: 1 }}
            animate={
              phase === "zoom" || phase === "complete"
                ? { scale: 0.8, opacity: 0 }
                : { scale: 1, opacity: 1 }
            }
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Central explosion point */}
          {phase === "explode" && (
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
              style={{
                background: colors[color].primary,
                boxShadow: `0 0 60px 30px ${colors[color].primary}`,
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 50, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          )}

          {/* Matrix grid of shapes */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 3, opacity: 0 }}
            animate={
              phase === "matrix"
                ? { scale: 1, opacity: 1 }
                : phase === "zoom" || phase === "complete"
                ? { scale: 0.5, opacity: 0, rotateZ: 45 }
                : { scale: 3, opacity: 0 }
            }
            transition={{
              duration: phase === "matrix" ? 0.6 : 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <svg className="w-full h-full">
              <defs>
                <linearGradient id="matrixGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={colors[color].primary} />
                  <stop offset="100%" stopColor={colors[color].secondary} />
                </linearGradient>
                <filter id="matrixGlow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {matrixShapes.map((shape) => (
                <motion.g
                  key={shape.id}
                  initial={{
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={
                    phase === "matrix" || phase === "zoom"
                      ? {
                          opacity: 1,
                          scale: shape.scale,
                          rotate: shape.rotation,
                        }
                      : { opacity: 0, scale: 0 }
                  }
                  transition={{
                    duration: 0.4,
                    delay: shape.delay,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    transformOrigin: `${shape.x}% ${shape.y}%`,
                  }}
                >
                  <svg
                    x={`${shape.x - 5}%`}
                    y={`${shape.y - 5}%`}
                    width="10%"
                    height="10%"
                    viewBox="0 0 100 100"
                    overflow="visible"
                  >
                    <motion.path
                      d={getShapePath(shape.type, 80)}
                      fill="none"
                      stroke="url(#matrixGradient)"
                      strokeWidth="2"
                      filter="url(#matrixGlow)"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: shape.delay }}
                      transform="translate(10, 10)"
                    />
                  </svg>
                </motion.g>
              ))}
            </svg>
          </motion.div>

          {/* Zoom lines effect */}
          {(phase === "zoom" || phase === "complete") && (
            <motion.div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 h-0.5 origin-left"
                  style={{
                    width: "150%",
                    background: `linear-gradient(90deg, transparent, ${colors[color].primary}, transparent)`,
                    rotate: i * 18,
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, delay: i * 0.02 }}
                />
              ))}
            </motion.div>
          )}

          {/* Final flash */}
          {phase === "complete" && (
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 0.3 }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * useMatrixTransition - Hook to control the matrix transition
 */
export function useMatrixTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionColor, setTransitionColor] = useState<"indigo" | "pink" | "cyan">("indigo");

  const triggerTransition = useCallback((color: "indigo" | "pink" | "cyan" = "indigo") => {
    setTransitionColor(color);
    setIsTransitioning(true);
  }, []);

  const handleComplete = useCallback(() => {
    setIsTransitioning(false);
  }, []);

  return {
    isTransitioning,
    transitionColor,
    triggerTransition,
    handleComplete,
  };
}
