"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

/**
 * TetrahedronBackground - Background texture made of small B&W tetrahedrons
 * These are abstract/simplified versions of the logo shape
 */

interface TetrahedronBackgroundProps {
  density?: "low" | "medium" | "high";
  opacity?: number;
  animated?: boolean;
  className?: string;
}

export default function TetrahedronBackground({
  density = "medium",
  opacity = 0.15,
  animated = true,
  className = "",
}: TetrahedronBackgroundProps) {
  const shapes = useMemo(() => {
    const densityMap = { low: 20, medium: 40, high: 70 };
    const count = densityMap[density];
    
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: 0.3 + Math.random() * 0.5,
      rotation: Math.random() * 360,
      opacity: 0.1 + Math.random() * 0.3,
      animationDelay: Math.random() * 5,
      animationDuration: 8 + Math.random() * 4,
    }));
  }, [density]);

  return (
    <div 
      className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ opacity }}
    >
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: 40 * shape.scale,
            height: 56 * shape.scale,
            opacity: shape.opacity,
          }}
          initial={{ rotate: shape.rotation }}
          animate={
            animated
              ? {
                  rotate: [shape.rotation, shape.rotation + 10, shape.rotation],
                  scale: [1, 1.05, 1],
                }
              : undefined
          }
          transition={
            animated
              ? {
                  duration: shape.animationDuration,
                  delay: shape.animationDelay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              : undefined
          }
        >
          <svg viewBox="0 0 200 280" className="w-full h-full">
            {/* Simplified B&W tetrahedron */}
            <polygon points="100,10 40,70 100,120" fill="#3a3a3a" />
            <polygon points="100,10 160,70 100,120" fill="#2a2a2a" />
            <polygon points="100,120 30,200 100,270" fill="#222" />
            <polygon points="100,120 170,200 100,270" fill="#1a1a1a" />
            <polygon points="100,270 30,200 170,200" fill="#111" />
          </svg>
        </motion.div>
      ))}

      {/* Gradient overlay for depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 20%, rgba(10,10,10,0.8) 100%)",
        }}
      />
    </div>
  );
}
