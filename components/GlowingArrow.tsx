"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useState, useEffect } from "react";

/**
 * GlowingArrow - Navigation arrows with pulsing glow, hover effects, and particle trails
 * These are the "wow" navigation elements that draw attention
 */

interface GlowingArrowProps {
  direction: "up" | "down" | "left" | "right";
  onClick?: () => void;
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function GlowingArrow({
  direction,
  onClick,
  label,
  size = "md",
  className = "",
}: GlowingArrowProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  const controls = useAnimationControls();

  const sizes = {
    sm: { arrow: 32, container: 60 },
    md: { arrow: 48, container: 80 },
    lg: { arrow: 64, container: 100 },
  };

  const rotations = {
    up: -90,
    down: 90,
    left: 180,
    right: 0,
  };

  // Generate particles on hover
  useEffect(() => {
    if (isHovered) {
      const interval = setInterval(() => {
        setParticles((prev) => [
          ...prev.slice(-10),
          {
            id: Date.now(),
            x: (Math.random() - 0.5) * 40,
            y: (Math.random() - 0.5) * 40,
          },
        ]);
      }, 100);
      return () => clearInterval(interval);
    } else {
      setParticles([]);
    }
  }, [isHovered]);

  const handleClick = () => {
    controls.start({
      scale: [1, 0.9, 1.1, 1],
      transition: { duration: 0.3 },
    });
    onClick?.();
  };

  return (
    <motion.button
      className={`relative group cursor-pointer ${className}`}
      style={{
        width: sizes[size].container,
        height: sizes[size].container,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      animate={controls}
      whileTap={{ scale: 0.95 }}
    >
      {/* Outer glow ring - always visible, intensifies on hover */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)",
          filter: "blur(15px)",
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
          opacity: isHovered ? 1 : 0.5,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Pulsing glow animation */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 60%)",
          filter: "blur(20px)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Orbiting particles on hover */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,1) 0%, rgba(236,72,153,1) 100%)",
            boxShadow: "0 0 10px rgba(99,102,241,0.8)",
          }}
          initial={{
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
          }}
          animate={{
            x: particle.x * 2,
            y: particle.y * 2,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      ))}

      {/* Main arrow container */}
      <motion.div
        className="absolute inset-2 rounded-full flex items-center justify-center"
        style={{
          background: isHovered
            ? "linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(236,72,153,0.2) 100%)"
            : "linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(236,72,153,0.1) 100%)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
        }}
        animate={{
          borderColor: isHovered ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)",
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Arrow icon */}
        <motion.svg
          width={sizes[size].arrow}
          height={sizes[size].arrow}
          viewBox="0 0 24 24"
          fill="none"
          style={{
            rotate: rotations[direction],
          }}
          animate={{
            x: isHovered ? [0, 5, 0] : 0,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{
            x: { duration: 0.8, repeat: isHovered ? Infinity : 0, ease: "easeInOut" },
            scale: { duration: 0.2 },
          }}
        >
          <defs>
            <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
            <filter id="arrowGlow">
              <feGaussianBlur stdDeviation="1" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <motion.path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="url(#arrowGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#arrowGlow)"
            animate={{
              strokeWidth: isHovered ? 2.5 : 2,
            }}
          />
        </motion.svg>
      </motion.div>

      {/* Label */}
      {label && (
        <motion.span
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.2em] text-white/50 whitespace-nowrap"
          animate={{
            opacity: isHovered ? 1 : 0.5,
            y: isHovered ? 0 : 5,
          }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.span>
      )}

      {/* Click ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-white/30"
        initial={{ scale: 0.8, opacity: 0 }}
        whileTap={{
          scale: 1.5,
          opacity: [0, 0.5, 0],
          transition: { duration: 0.4 },
        }}
      />
    </motion.button>
  );
}

/**
 * GlowingArrowSet - A group of directional arrows
 */
interface GlowingArrowSetProps {
  onNavigate?: (direction: "up" | "down" | "left" | "right") => void;
  showUp?: boolean;
  showDown?: boolean;
  showLeft?: boolean;
  showRight?: boolean;
}

export function GlowingArrowSet({
  onNavigate,
  showUp = false,
  showDown = true,
  showLeft = false,
  showRight = false,
}: GlowingArrowSetProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {showUp && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-auto">
          <GlowingArrow direction="up" onClick={() => onNavigate?.("up")} label="Back" />
        </div>
      )}
      {showDown && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto">
          <GlowingArrow direction="down" onClick={() => onNavigate?.("down")} label="Explore" />
        </div>
      )}
      {showLeft && (
        <div className="absolute left-8 top-1/2 -translate-y-1/2 pointer-events-auto">
          <GlowingArrow direction="left" onClick={() => onNavigate?.("left")} />
        </div>
      )}
      {showRight && (
        <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-auto">
          <GlowingArrow direction="right" onClick={() => onNavigate?.("right")} />
        </div>
      )}
    </div>
  );
}
