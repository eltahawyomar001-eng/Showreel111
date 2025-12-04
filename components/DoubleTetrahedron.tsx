"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

/**
 * DoubleTetrahedron - The 1-1-1 logo
 * Two tetrahedrons touching at their vertices
 * Top: Yellow/Orange/Pink gradient
 * Bottom: Blue/Navy gradient with pink reflection
 */

interface DoubleTetrahedronProps {
  size?: number;
  animated?: boolean;
  colorMode?: "full" | "bw" | "transitioning";
  transitionProgress?: number; // 0 = full color, 1 = black & white
  className?: string;
  glowIntensity?: number;
}

export default function DoubleTetrahedron({
  size = 300,
  animated = true,
  colorMode = "full",
  transitionProgress = 0,
  className = "",
  glowIntensity = 1,
}: DoubleTetrahedronProps) {
  // Calculate grayscale based on transition progress
  const grayscale = colorMode === "bw" ? 1 : colorMode === "transitioning" ? transitionProgress : 0;
  
  const filterId = useMemo(() => `tetra-glow-${Math.random().toString(36).substr(2, 9)}`, []);

  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: size, height: size * 1.4 }}
      initial={animated ? { opacity: 0, scale: 0.8 } : undefined}
      animate={animated ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <svg
        viewBox="0 0 200 280"
        width={size}
        height={size * 1.4}
        style={{ 
          filter: `grayscale(${grayscale})`,
          transition: "filter 0.8s ease-in-out"
        }}
      >
        <defs>
          {/* Glow filter */}
          <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={4 * glowIntensity} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Top tetrahedron gradient - Yellow/Orange/Pink */}
          <linearGradient id="topGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD93D" />
            <stop offset="40%" stopColor="#FF8C42" />
            <stop offset="100%" stopColor="#E84A8A" />
          </linearGradient>

          {/* Top tetrahedron right face - more orange/pink */}
          <linearGradient id="topRightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF8C42" />
            <stop offset="60%" stopColor="#E84A8A" />
            <stop offset="100%" stopColor="#C74B8C" />
          </linearGradient>

          {/* Bottom tetrahedron gradient - Blue/Navy with pink reflection */}
          <linearGradient id="bottomGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D88AAE" />
            <stop offset="30%" stopColor="#6B7FD7" />
            <stop offset="70%" stopColor="#3D5A99" />
            <stop offset="100%" stopColor="#1A2A4A" />
          </linearGradient>

          {/* Bottom tetrahedron right face - darker blue */}
          <linearGradient id="bottomRightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4A6AB8" />
            <stop offset="50%" stopColor="#2A4A7A" />
            <stop offset="100%" stopColor="#0D1B2A" />
          </linearGradient>

          {/* Bottom tetrahedron bottom face - darkest */}
          <linearGradient id="bottomBottomGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A2A4A" />
            <stop offset="100%" stopColor="#0A1525" />
          </linearGradient>
        </defs>

        <g filter={glowIntensity > 0 ? `url(#${filterId})` : undefined}>
          {/* TOP TETRAHEDRON - Point down */}
          {/* Left face */}
          <motion.polygon
            points="100,10 40,70 100,120"
            fill="url(#topGradient)"
            initial={animated ? { opacity: 0 } : undefined}
            animate={animated ? { opacity: 1 } : undefined}
            transition={{ delay: 0.2, duration: 0.6 }}
          />
          {/* Right face */}
          <motion.polygon
            points="100,10 160,70 100,120"
            fill="url(#topRightGradient)"
            initial={animated ? { opacity: 0 } : undefined}
            animate={animated ? { opacity: 1 } : undefined}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
          {/* Center line (edge between faces) */}
          <motion.line
            x1="100"
            y1="10"
            x2="100"
            y2="120"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="0.5"
            initial={animated ? { pathLength: 0 } : undefined}
            animate={animated ? { pathLength: 1 } : undefined}
            transition={{ delay: 0.5, duration: 0.8 }}
          />

          {/* BOTTOM TETRAHEDRON - Point up */}
          {/* Left face */}
          <motion.polygon
            points="100,120 30,200 100,270"
            fill="url(#bottomGradient)"
            initial={animated ? { opacity: 0 } : undefined}
            animate={animated ? { opacity: 1 } : undefined}
            transition={{ delay: 0.4, duration: 0.6 }}
          />
          {/* Right face */}
          <motion.polygon
            points="100,120 170,200 100,270"
            fill="url(#bottomRightGradient)"
            initial={animated ? { opacity: 0 } : undefined}
            animate={animated ? { opacity: 1 } : undefined}
            transition={{ delay: 0.5, duration: 0.6 }}
          />
          {/* Bottom face (visible part) */}
          <motion.polygon
            points="100,270 30,200 170,200"
            fill="url(#bottomBottomGradient)"
            initial={animated ? { opacity: 0 } : undefined}
            animate={animated ? { opacity: 1 } : undefined}
            transition={{ delay: 0.6, duration: 0.6 }}
          />
          {/* Center line */}
          <motion.line
            x1="100"
            y1="120"
            x2="100"
            y2="270"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="0.5"
            initial={animated ? { pathLength: 0 } : undefined}
            animate={animated ? { pathLength: 1 } : undefined}
            transition={{ delay: 0.7, duration: 0.8 }}
          />
        </g>
      </svg>

      {/* Animated glow effect */}
      {animated && glowIntensity > 0 && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, rgba(255,140,66,${0.2 * glowIntensity}) 0%, transparent 70%)`,
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </motion.div>
  );
}

/**
 * Mini version for the texture/pattern
 */
export function MiniTetrahedron({
  size = 20,
  opacity = 0.3,
  colorMode = "bw",
}: {
  size?: number;
  opacity?: number;
  colorMode?: "full" | "bw";
}) {
  return (
    <svg
      viewBox="0 0 200 280"
      width={size}
      height={size * 1.4}
      style={{ 
        opacity,
        filter: colorMode === "bw" ? "grayscale(1)" : "none",
      }}
    >
      {/* Simplified shape */}
      <polygon
        points="100,10 40,70 100,120"
        fill="#888"
      />
      <polygon
        points="100,10 160,70 100,120"
        fill="#666"
      />
      <polygon
        points="100,120 30,200 100,270"
        fill="#555"
      />
      <polygon
        points="100,120 170,200 100,270"
        fill="#444"
      />
      <polygon
        points="100,270 30,200 170,200"
        fill="#333"
      />
    </svg>
  );
}
