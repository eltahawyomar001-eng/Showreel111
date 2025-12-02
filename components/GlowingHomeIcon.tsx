"use client";

import { motion } from "framer-motion";
import { useState } from "react";

/**
 * GlowingHomeIcon - Breathing glow home button for secondary screens
 * Creates an ambient, pulsing home navigation element
 */

interface GlowingHomeIconProps {
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function GlowingHomeIcon({
  onClick,
  className = "",
  size = "md",
}: GlowingHomeIconProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sizes = {
    sm: { icon: 20, container: 40 },
    md: { icon: 28, container: 56 },
    lg: { icon: 36, container: 72 },
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
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {/* Outer breathing glow - always animating */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)",
          filter: "blur(12px)",
        }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary glow layer - offset timing */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 60%)",
          filter: "blur(15px)",
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* Hover intensify glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(34,211,238,0.5) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
        animate={{
          scale: isHovered ? 1.6 : 1,
          opacity: isHovered ? 0.8 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Light rays effect */}
      {isHovered && (
        <>
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 h-0.5 origin-left"
              style={{
                width: sizes[size].container * 1.5,
                background: "linear-gradient(90deg, rgba(99,102,241,0.6), transparent)",
                rotate: i * 45,
                translateX: "-50%",
                translateY: "-50%",
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.6 }}
              exit={{ scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
            />
          ))}
        </>
      )}

      {/* Main container */}
      <motion.div
        className="absolute inset-1 rounded-full flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(236,72,153,0.15) 100%)",
          border: "1px solid rgba(255,255,255,0.15)",
          backdropFilter: "blur(10px)",
        }}
        animate={{
          borderColor: isHovered ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.15)",
          background: isHovered
            ? "linear-gradient(135deg, rgba(99,102,241,0.25) 0%, rgba(236,72,153,0.25) 100%)"
            : "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(236,72,153,0.15) 100%)",
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
          }}
          animate={{
            x: ["-100%", "200%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Home icon */}
        <motion.svg
          width={sizes[size].icon}
          height={sizes[size].icon}
          viewBox="0 0 24 24"
          fill="none"
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          <defs>
            <linearGradient id="homeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
            <filter id="homeGlow">
              <feGaussianBlur stdDeviation="1" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* House shape */}
          <motion.path
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            stroke="url(#homeGradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#homeGlow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.svg>
      </motion.div>

      {/* Tooltip */}
      <motion.span
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.2em] text-white/60 whitespace-nowrap"
        initial={{ opacity: 0, y: -5 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : -5,
        }}
        transition={{ duration: 0.2 }}
      >
        Home
      </motion.span>

      {/* Click ripple */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-white/40"
        initial={{ scale: 0.8, opacity: 0 }}
        whileTap={{
          scale: 1.5,
          opacity: [0, 0.6, 0],
          transition: { duration: 0.4 },
        }}
      />
    </motion.button>
  );
}
