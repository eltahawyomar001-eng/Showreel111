"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

/**
 * FractalBackground - Self-similar patterns inspired by fractals and emergence
 * Creates an organic, living background that reflects complexity theory
 */

interface FractalShape {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  delay: number;
  duration: number;
  opacity: number;
  type: "triangle" | "diamond" | "hexagon";
}

export default function FractalBackground() {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Generate fractal-like pattern of shapes at different scales
  const shapes = useMemo(() => {
    const generated: FractalShape[] = [];
    const types: ("triangle" | "diamond" | "hexagon")[] = ["triangle", "diamond", "hexagon"];
    
    // Create self-similar patterns at different scales
    for (let scale = 0; scale < 3; scale++) {
      const count = [8, 16, 32][scale];
      const baseSize = [80, 40, 20][scale];
      
      for (let i = 0; i < count; i++) {
        generated.push({
          id: scale * 100 + i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: baseSize + Math.random() * baseSize * 0.5,
          rotation: Math.random() * 360,
          delay: Math.random() * 5,
          duration: 15 + Math.random() * 20,
          opacity: [0.08, 0.05, 0.03][scale],
          type: types[Math.floor(Math.random() * types.length)],
        });
      }
    }
    return generated;
  }, []);

  const getShapePath = (type: string) => {
    switch (type) {
      case "triangle":
        return "M50 0 L100 100 L0 100 Z";
      case "diamond":
        return "M50 0 L100 50 L50 100 L0 50 Z";
      case "hexagon":
        return "M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z";
      default:
        return "M50 0 L100 100 L0 100 Z";
    }
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#030308]">
      {/* Deep space gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#030308] via-[#0a0a15] to-[#030308]" />

      {/* Animated gradient orbs that follow mouse subtly */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: mousePos.x * 100 - 50,
          y: mousePos.y * 100 - 50,
          left: "10%",
          top: "10%",
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
      />

      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: mousePos.x * -80 + 40,
          y: mousePos.y * -80 + 40,
          right: "5%",
          bottom: "10%",
        }}
        transition={{ type: "spring", stiffness: 40, damping: 25 }}
      />

      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
        animate={{
          x: mousePos.x * 60 - 30,
          y: mousePos.y * -60 + 30,
          left: "40%",
          bottom: "20%",
        }}
        transition={{ type: "spring", stiffness: 45, damping: 28 }}
      />

      {/* Fractal shapes - self-similar at different scales */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="fractalGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(99,102,241,0.3)" />
            <stop offset="100%" stopColor="rgba(236,72,153,0.3)" />
          </linearGradient>
          <linearGradient id="fractalGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(34,211,238,0.3)" />
            <stop offset="100%" stopColor="rgba(99,102,241,0.3)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {shapes.map((shape) => (
          <motion.g
            key={shape.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: shape.opacity,
              scale: 1,
              rotate: [shape.rotation, shape.rotation + 360],
              x: [0, Math.sin(shape.id) * 30, 0],
              y: [0, Math.cos(shape.id) * 30, 0],
            }}
            transition={{
              opacity: { duration: 2, delay: shape.delay * 0.3 },
              scale: { duration: 2, delay: shape.delay * 0.3 },
              rotate: { duration: shape.duration, repeat: Infinity, ease: "linear" },
              x: { duration: shape.duration * 0.5, repeat: Infinity, ease: "easeInOut" },
              y: { duration: shape.duration * 0.7, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{
              transformOrigin: "center",
            }}
          >
            <svg
              x={`${shape.x}%`}
              y={`${shape.y}%`}
              width={shape.size}
              height={shape.size}
              viewBox="0 0 100 100"
              overflow="visible"
            >
              <path
                d={getShapePath(shape.type)}
                fill="none"
                stroke={shape.id % 2 === 0 ? "url(#fractalGradient1)" : "url(#fractalGradient2)"}
                strokeWidth="1"
                filter="url(#glow)"
              />
            </svg>
          </motion.g>
        ))}
      </svg>

      {/* Connecting lines - emergence effect */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.line
            key={i}
            x1={`${10 + (i * 4)}%`}
            y1="0%"
            x2={`${90 - (i * 4)}%`}
            y2="100%"
            stroke="white"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 3, delay: i * 0.1 }}
          />
        ))}
      </svg>

      {/* Grid overlay - subtle structure */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Vignette for depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(3,3,8,0.8) 100%)",
        }}
      />
    </div>
  );
}
