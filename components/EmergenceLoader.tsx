"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

/**
 * EmergenceLoader - The "1-1-1" logo emerges from chaos
 * Particles swarm and assemble into the central shape - pure emergence effect
 */

interface Particle {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  size: number;
  delay: number;
  color: string;
}

interface EmergenceLoaderProps {
  onComplete?: () => void;
  duration?: number;
}

export default function EmergenceLoader({ onComplete, duration = 3000 }: EmergenceLoaderProps) {
  const [phase, setPhase] = useState<"chaos" | "assembling" | "complete">("chaos");
  const [isVisible, setIsVisible] = useState(true);

  // Generate particles that will form the "1-1-1" pattern
  const particles = useMemo(() => {
    const generated: Particle[] = [];
    const colors = [
      "rgba(99,102,241,1)",
      "rgba(236,72,153,1)",
      "rgba(34,211,238,1)",
      "rgba(168,85,247,1)",
    ];

    // Create a grid pattern for the final "1" shapes
    // Three "1"s represented as vertical lines with serifs
    const targetPoints: { x: number; y: number }[] = [];
    
    // First "1" - left position
    for (let i = 0; i < 15; i++) {
      targetPoints.push({ x: 30, y: 30 + i * 2.5 }); // Main stem
    }
    targetPoints.push({ x: 25, y: 35 }); // Top serif
    targetPoints.push({ x: 27.5, y: 32.5 });
    
    // Dash
    for (let i = 0; i < 3; i++) {
      targetPoints.push({ x: 40 + i * 2, y: 50 });
    }
    
    // Second "1" - center position
    for (let i = 0; i < 15; i++) {
      targetPoints.push({ x: 50, y: 30 + i * 2.5 }); // Main stem
    }
    targetPoints.push({ x: 45, y: 35 });
    targetPoints.push({ x: 47.5, y: 32.5 });
    
    // Dash
    for (let i = 0; i < 3; i++) {
      targetPoints.push({ x: 60 + i * 2, y: 50 });
    }
    
    // Third "1" - right position
    for (let i = 0; i < 15; i++) {
      targetPoints.push({ x: 70, y: 30 + i * 2.5 }); // Main stem
    }
    targetPoints.push({ x: 65, y: 35 });
    targetPoints.push({ x: 67.5, y: 32.5 });

    // Generate particles for each target point
    targetPoints.forEach((target, i) => {
      // Random starting position (chaos)
      const angle = Math.random() * Math.PI * 2;
      const distance = 50 + Math.random() * 50;
      
      generated.push({
        id: i,
        startX: 50 + Math.cos(angle) * distance,
        startY: 50 + Math.sin(angle) * distance,
        endX: target.x,
        endY: target.y,
        size: 3 + Math.random() * 3,
        delay: Math.random() * 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    });

    // Add extra ambient particles
    for (let i = 0; i < 50; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 30 + Math.random() * 40;
      generated.push({
        id: targetPoints.length + i,
        startX: Math.random() * 100,
        startY: Math.random() * 100,
        endX: 50 + Math.cos(angle) * distance,
        endY: 50 + Math.sin(angle) * distance,
        size: 1 + Math.random() * 2,
        delay: Math.random() * 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    return generated;
  }, []);

  useEffect(() => {
    // Phase transitions
    const timer1 = setTimeout(() => setPhase("assembling"), 500);
    const timer2 = setTimeout(() => setPhase("complete"), duration - 500);
    const timer3 = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, duration);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [duration, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "#030308" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Central pulsing element - always visible */}
          <motion.div
            className="absolute w-32 h-32 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(99,102,241,0.6) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Particle field */}
          <svg className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }}>
            <defs>
              <filter id="particleGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {particles.map((particle) => (
              <motion.circle
                key={particle.id}
                r={particle.size}
                fill={particle.color}
                filter="url(#particleGlow)"
                initial={{
                  cx: `${particle.startX}%`,
                  cy: `${particle.startY}%`,
                  opacity: 0,
                  scale: 0,
                }}
                animate={
                  phase === "chaos"
                    ? {
                        cx: `${particle.startX}%`,
                        cy: `${particle.startY}%`,
                        opacity: 0.6,
                        scale: 1,
                      }
                    : phase === "assembling"
                    ? {
                        cx: `${particle.endX}%`,
                        cy: `${particle.endY}%`,
                        opacity: 1,
                        scale: 1,
                      }
                    : {
                        cx: `${particle.endX}%`,
                        cy: `${particle.endY}%`,
                        opacity: 1,
                        scale: [1, 1.2, 1],
                      }
                }
                transition={{
                  duration: phase === "assembling" ? 1.5 : 0.5,
                  delay: particle.delay,
                  ease: [0.22, 1, 0.36, 1],
                  scale:
                    phase === "complete"
                      ? { duration: 0.6, repeat: Infinity, ease: "easeInOut" }
                      : undefined,
                }}
              />
            ))}

            {/* Connection lines during assembly */}
            {phase === "assembling" && (
              <>
                {particles.slice(0, 30).map((particle, i) => {
                  const nextParticle = particles[(i + 1) % 30];
                  return (
                    <motion.line
                      key={`line-${i}`}
                      x1={`${particle.endX}%`}
                      y1={`${particle.endY}%`}
                      x2={`${nextParticle.endX}%`}
                      y2={`${nextParticle.endY}%`}
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="0.5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.3 }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.02 }}
                    />
                  );
                })}
              </>
            )}
          </svg>

          {/* Central glow when complete */}
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={
              phase === "complete"
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.5 }
            }
            transition={{ duration: 0.8 }}
          />

          {/* Loading text */}
          <motion.div
            className="absolute bottom-20 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.p
              className="text-sm uppercase tracking-[0.4em] text-white/40"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {phase === "chaos" && "Initializing"}
              {phase === "assembling" && "Emerging"}
              {phase === "complete" && "Welcome"}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
