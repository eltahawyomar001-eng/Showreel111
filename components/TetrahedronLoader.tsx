"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import DoubleTetrahedron from "./DoubleTetrahedron";

/**
 * TetrahedronLoader - Initial loading animation
 * The Double Tetrahedron fades in first, then everything else emerges around it
 */

interface TetrahedronLoaderProps {
  onComplete?: () => void;
  duration?: number;
}

export default function TetrahedronLoader({ 
  onComplete, 
  duration = 4000 
}: TetrahedronLoaderProps) {
  const [phase, setPhase] = useState<"initial" | "logo" | "expand" | "complete">("initial");
  const [isVisible, setIsVisible] = useState(true);

  // Generate small tetrahedron particles that will appear around the main logo
  const particles = useMemo(() => {
    const items: Array<{
      id: number;
      x: number;
      y: number;
      scale: number;
      delay: number;
      rotation: number;
    }> = [];

    for (let i = 0; i < 40; i++) {
      const angle = (i / 40) * Math.PI * 2;
      const radius = 150 + Math.random() * 100;
      items.push({
        id: i,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        scale: 0.1 + Math.random() * 0.15,
        delay: 0.5 + Math.random() * 0.5,
        rotation: Math.random() * 360,
      });
    }
    return items;
  }, []);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("logo"), 300),
      setTimeout(() => setPhase("expand"), 1500),
      setTimeout(() => setPhase("complete"), duration - 800),
      setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, duration),
    ];

    return () => timers.forEach(clearTimeout);
  }, [duration, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: "#0a0a0a" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {/* Radial gradient background */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at center, rgba(255,140,66,0.1) 0%, transparent 50%)",
            }}
            animate={{
              opacity: phase === "logo" || phase === "expand" ? [0.3, 0.6, 0.3] : 0,
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Small tetrahedron particles emerging outward */}
          {phase !== "initial" && particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute"
              style={{
                width: 40,
                height: 56,
              }}
              initial={{ 
                x: 0, 
                y: 0, 
                scale: 0, 
                opacity: 0,
                rotate: 0,
              }}
              animate={
                phase === "expand" || phase === "complete"
                  ? {
                      x: particle.x,
                      y: particle.y,
                      scale: particle.scale,
                      opacity: [0, 0.6, 0.3],
                      rotate: particle.rotation,
                    }
                  : {
                      x: 0,
                      y: 0,
                      scale: 0,
                      opacity: 0,
                    }
              }
              transition={{
                duration: 1.2,
                delay: particle.delay,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <svg viewBox="0 0 200 280" className="w-full h-full opacity-40">
                <polygon points="100,10 40,70 100,120" fill="#666" />
                <polygon points="100,10 160,70 100,120" fill="#555" />
                <polygon points="100,120 30,200 100,270" fill="#444" />
                <polygon points="100,120 170,200 100,270" fill="#333" />
              </svg>
            </motion.div>
          ))}

          {/* Central Double Tetrahedron - appears first */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={
              phase !== "initial"
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.5 }
            }
            transition={{ 
              duration: 1.2, 
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <DoubleTetrahedron 
              size={200} 
              animated={phase === "logo"} 
              glowIntensity={phase === "complete" ? 1.5 : 1}
            />
          </motion.div>

          {/* Glow burst on complete */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(255,140,66,0.3) 0%, rgba(232,74,138,0.1) 40%, transparent 70%)",
              filter: "blur(40px)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={
              phase === "complete"
                ? { scale: [1, 1.2, 1], opacity: [0, 0.8, 0] }
                : { scale: 0, opacity: 0 }
            }
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          {/* Loading text */}
          <motion.div
            className="absolute bottom-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.p
              className="text-xs uppercase tracking-[0.5em] text-white/30"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {phase === "initial" && ""}
              {phase === "logo" && "Emerging"}
              {phase === "expand" && "Expanding"}
              {phase === "complete" && "Welcome"}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
