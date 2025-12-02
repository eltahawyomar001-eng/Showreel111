"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * CursorTrail - Glowing particles that follow the mouse cursor
 * Adds an extra layer of sophistication and interactivity
 */

interface TrailParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

interface CursorTrailProps {
  enabled?: boolean;
  particleCount?: number;
  colors?: string[];
}

export default function CursorTrail({
  enabled = true,
  particleCount = 12,
  colors = [
    "rgba(99,102,241,0.8)",
    "rgba(236,72,153,0.8)",
    "rgba(34,211,238,0.8)",
    "rgba(168,85,247,0.8)",
  ],
}: CursorTrailProps) {
  const [particles, setParticles] = useState<TrailParticle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;

    let animationFrame: number;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      // Only add particles if mouse moved enough
      const distance = Math.sqrt(Math.pow(x - lastX, 2) + Math.pow(y - lastY, 2));
      
      if (distance > 10) {
        lastX = x;
        lastY = y;
        setMousePos({ x, y });

        // Add new particle
        setParticles((prev) => {
          const newParticle: TrailParticle = {
            id: Date.now() + Math.random(),
            x,
            y,
            size: 4 + Math.random() * 6,
            color: colors[Math.floor(Math.random() * colors.length)],
          };

          // Keep only the last N particles
          return [...prev.slice(-(particleCount - 1)), newParticle];
        });
      }
    };

    // Fade out particles over time
    const fadeParticles = () => {
      setParticles((prev) => 
        prev.filter((p) => Date.now() - p.id < 1000)
      );
      animationFrame = requestAnimationFrame(fadeParticles);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationFrame = requestAnimationFrame(fadeParticles);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, [enabled, particleCount, colors]);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Main cursor glow */}
      <motion.div
        className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)",
          filter: "blur(4px)",
        }}
        animate={{
          x: mousePos.x,
          y: mousePos.y,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      />

      {/* Trail particles */}
      {particles.map((particle, index) => {
        const age = Date.now() - particle.id;
        const opacity = Math.max(0, 1 - age / 1000);
        const scale = Math.max(0.1, 1 - age / 1500);

        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              background: particle.color,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              opacity,
              transform: `translate(-50%, -50%) scale(${scale})`,
            }}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
}

/**
 * InteractiveGlow - A glow effect that follows the cursor within a container
 */
export function InteractiveGlow({ className = "" }: { className?: string }) {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isInside, setIsInside] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsInside(true)}
      onMouseLeave={() => setIsInside(false)}
    >
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          opacity: isInside ? 1 : 0,
          scale: isInside ? 1 : 0.5,
        }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}
