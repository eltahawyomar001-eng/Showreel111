"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useState, useEffect } from "react";

/**
 * CentralShape111 - The signature "1-1-1" shape
 * A fractal-inspired, self-similar design that reflects complexity and emergence
 * This is the hero element that defines the brand
 */

interface CentralShape111Props {
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  onArrowClick?: (direction: "left" | "right" | "up" | "down") => void;
  className?: string;
  showArrows?: boolean;
}

export default function CentralShape111({
  size = "lg",
  animated = true,
  onArrowClick,
  className = "",
  showArrows = true,
}: CentralShape111Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [activeArrow, setActiveArrow] = useState<string | null>(null);
  const controls = useAnimationControls();

  const sizes = {
    sm: { container: 200, shape: 160 },
    md: { container: 300, shape: 240 },
    lg: { container: 400, shape: 320 },
    xl: { container: 500, shape: 400 },
  };

  useEffect(() => {
    if (animated) {
      controls.start({
        rotate: 360,
        transition: { duration: 60, repeat: Infinity, ease: "linear" },
      });
    }
  }, [animated, controls]);

  const handleArrowClick = (direction: "left" | "right" | "up" | "down") => {
    setActiveArrow(direction);
    onArrowClick?.(direction);
    setTimeout(() => setActiveArrow(null), 500);
  };

  return (
    <motion.div
      className={`relative flex items-center justify-center ${className}`}
      style={{
        width: sizes[size].container,
        height: sizes[size].container,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          scale: isHovered ? 1.3 : [1, 1.1, 1],
          opacity: isHovered ? 0.8 : [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: isHovered ? 0.3 : 4,
          repeat: isHovered ? 0 : Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 60%)",
          filter: "blur(50px)",
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Main SVG shape */}
      <motion.svg
        width={sizes[size].shape}
        height={sizes[size].shape}
        viewBox="0 0 400 400"
        className="relative z-10"
        animate={controls}
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(99,102,241,0.8)" />
            <stop offset="50%" stopColor="rgba(236,72,153,0.8)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0.8)" />
          </linearGradient>
          
          <linearGradient id="innerGradient" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(34,211,238,0.6)" />
            <stop offset="50%" stopColor="rgba(168,85,247,0.6)" />
            <stop offset="100%" stopColor="rgba(99,102,241,0.6)" />
          </linearGradient>

          <filter id="shapeGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer hexagon - largest scale */}
        <motion.polygon
          points="200,20 350,110 350,290 200,380 50,290 50,110"
          fill="none"
          stroke="url(#mainGradient)"
          strokeWidth="2"
          filter="url(#shapeGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />

        {/* Middle hexagon - self-similar */}
        <motion.polygon
          points="200,70 310,130 310,270 200,330 90,270 90,130"
          fill="none"
          stroke="url(#innerGradient)"
          strokeWidth="1.5"
          filter="url(#shapeGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
        />

        {/* Inner hexagon - smallest scale */}
        <motion.polygon
          points="200,120 270,160 270,240 200,280 130,240 130,160"
          fill="none"
          stroke="url(#mainGradient)"
          strokeWidth="1"
          filter="url(#shapeGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 2, delay: 0.6, ease: "easeOut" }}
        />

        {/* Central triangle - emergence point */}
        <motion.polygon
          points="200,150 230,200 170,200"
          fill="url(#mainGradient)"
          opacity="0.5"
          filter="url(#strongGlow)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ 
            duration: 3, 
            delay: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "200px 183px" }}
        />

        {/* Connecting lines - fractal branches */}
        <motion.g opacity="0.4">
          {/* Top connections */}
          <motion.line x1="200" y1="20" x2="200" y2="70" stroke="url(#mainGradient)" strokeWidth="1" />
          <motion.line x1="200" y1="70" x2="200" y2="120" stroke="url(#innerGradient)" strokeWidth="1" />
          
          {/* Right top connections */}
          <motion.line x1="350" y1="110" x2="310" y2="130" stroke="url(#mainGradient)" strokeWidth="1" />
          <motion.line x1="310" y1="130" x2="270" y2="160" stroke="url(#innerGradient)" strokeWidth="1" />
          
          {/* Right bottom connections */}
          <motion.line x1="350" y1="290" x2="310" y2="270" stroke="url(#mainGradient)" strokeWidth="1" />
          <motion.line x1="310" y1="270" x2="270" y2="240" stroke="url(#innerGradient)" strokeWidth="1" />
          
          {/* Bottom connections */}
          <motion.line x1="200" y1="380" x2="200" y2="330" stroke="url(#mainGradient)" strokeWidth="1" />
          <motion.line x1="200" y1="330" x2="200" y2="280" stroke="url(#innerGradient)" strokeWidth="1" />
          
          {/* Left bottom connections */}
          <motion.line x1="50" y1="290" x2="90" y2="270" stroke="url(#mainGradient)" strokeWidth="1" />
          <motion.line x1="90" y1="270" x2="130" y2="240" stroke="url(#innerGradient)" strokeWidth="1" />
          
          {/* Left top connections */}
          <motion.line x1="50" y1="110" x2="90" y2="130" stroke="url(#mainGradient)" strokeWidth="1" />
          <motion.line x1="90" y1="130" x2="130" y2="160" stroke="url(#innerGradient)" strokeWidth="1" />
        </motion.g>

        {/* Corner accent dots */}
        {[
          { cx: 200, cy: 20 },
          { cx: 350, cy: 110 },
          { cx: 350, cy: 290 },
          { cx: 200, cy: 380 },
          { cx: 50, cy: 290 },
          { cx: 50, cy: 110 },
        ].map((point, i) => (
          <motion.circle
            key={i}
            cx={point.cx}
            cy={point.cy}
            r="4"
            fill="url(#mainGradient)"
            filter="url(#strongGlow)"
            initial={{ scale: 0 }}
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{ 
              duration: 2, 
              delay: 0.5 + i * 0.1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.svg>

      {/* Directional Arrows */}
      {showArrows && (
        <>
          {/* Top Arrow */}
          <ArrowButton
            direction="up"
            position="top-0 left-1/2 -translate-x-1/2 -translate-y-4"
            isActive={activeArrow === "up"}
            onClick={() => handleArrowClick("up")}
          />
          
          {/* Bottom Arrow */}
          <ArrowButton
            direction="down"
            position="bottom-0 left-1/2 -translate-x-1/2 translate-y-4"
            isActive={activeArrow === "down"}
            onClick={() => handleArrowClick("down")}
          />
          
          {/* Left Arrow */}
          <ArrowButton
            direction="left"
            position="left-0 top-1/2 -translate-y-1/2 -translate-x-4"
            isActive={activeArrow === "left"}
            onClick={() => handleArrowClick("left")}
          />
          
          {/* Right Arrow */}
          <ArrowButton
            direction="right"
            position="right-0 top-1/2 -translate-y-1/2 translate-x-4"
            isActive={activeArrow === "right"}
            onClick={() => handleArrowClick("right")}
          />
        </>
      )}

      {/* "1-1-1" text in center */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.span
          className="text-2xl md:text-3xl font-light tracking-[0.3em] bg-gradient-to-r from-indigo-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          1-1-1
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

/**
 * ArrowButton - Individual directional arrow with glow effect
 */
function ArrowButton({
  direction,
  position,
  isActive,
  onClick,
}: {
  direction: "up" | "down" | "left" | "right";
  position: string;
  isActive: boolean;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  
  const rotations = {
    up: -90,
    down: 90,
    left: 180,
    right: 0,
  };

  return (
    <motion.button
      className={`absolute ${position} w-12 h-12 flex items-center justify-center cursor-pointer z-20`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)",
          filter: "blur(8px)",
        }}
        animate={{
          scale: isHovered || isActive ? 1.5 : [1, 1.2, 1],
          opacity: isHovered || isActive ? 1 : [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: isHovered || isActive ? 0.2 : 2,
          repeat: isHovered || isActive ? 0 : Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Arrow SVG */}
      <motion.svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        style={{ rotate: rotations[direction] }}
        animate={{
          x: direction === "right" && isHovered ? [0, 3, 0] : 
             direction === "left" && isHovered ? [0, -3, 0] : 0,
          y: direction === "down" && isHovered ? [0, 3, 0] : 
             direction === "up" && isHovered ? [0, -3, 0] : 0,
        }}
        transition={{
          duration: 0.6,
          repeat: isHovered ? Infinity : 0,
          ease: "easeInOut",
        }}
      >
        <defs>
          <linearGradient id={`arrowGrad-${direction}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <filter id={`arrowGlow-${direction}`}>
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <motion.path
          d="M5 12h14M13 6l6 6-6 6"
          stroke={`url(#arrowGrad-${direction})`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#arrowGlow-${direction})`}
        />
      </motion.svg>
    </motion.button>
  );
}
