"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo, useCallback } from "react";

/**
 * EmergenceLoader - SPECTACULAR entrance animation
 * 200+ particles EXPLODE from all edges and SWARM into the center
 * forming a mesmerizing hexagonal pattern with the "1-1-1" logo
 */

interface Particle {
  id: number;
  startX: number;
  startY: number;
  midX: number;
  midY: number;
  endX: number;
  endY: number;
  size: number;
  delay: number;
  color: string;
  shape: "circle" | "triangle" | "diamond" | "star";
  rotation: number;
  orbitRadius: number;
  orbitSpeed: number;
}

interface EmergenceLoaderProps {
  onComplete?: () => void;
  duration?: number;
}

export default function EmergenceLoader({ onComplete, duration = 4500 }: EmergenceLoaderProps) {
  const [phase, setPhase] = useState<"burst" | "swarm" | "converge" | "form" | "pulse" | "complete">("burst");
  const [isVisible, setIsVisible] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  // Track mouse for interactive particles
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Generate 200+ particles for maximum impact
  const particles = useMemo(() => {
    const generated: Particle[] = [];
    const colors = [
      "#6366f1", // Indigo
      "#ec4899", // Pink
      "#22d3ee", // Cyan
      "#a855f7", // Purple
      "#f97316", // Orange
      "#10b981", // Emerald
      "#f43f5e", // Rose
      "#8b5cf6", // Violet
    ];
    const shapes: Particle["shape"][] = ["circle", "triangle", "diamond", "star"];

    // Hexagon vertices for the final formation
    const hexPoints: { x: number; y: number }[] = [];
    const hexRadius = 15;
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      hexPoints.push({
        x: 50 + Math.cos(angle) * hexRadius,
        y: 50 + Math.sin(angle) * hexRadius,
      });
    }

    // "1-1-1" text formation points (more detailed)
    const textPoints: { x: number; y: number }[] = [];
    
    // First "1"
    for (let i = 0; i < 20; i++) textPoints.push({ x: 38, y: 42 + i * 0.8 });
    for (let i = 0; i < 5; i++) textPoints.push({ x: 35 + i * 0.6, y: 44 });
    for (let i = 0; i < 8; i++) textPoints.push({ x: 35 + i, y: 58 });
    
    // First dash
    for (let i = 0; i < 6; i++) textPoints.push({ x: 44 + i * 0.5, y: 50 });
    
    // Second "1" (center)
    for (let i = 0; i < 20; i++) textPoints.push({ x: 50, y: 42 + i * 0.8 });
    for (let i = 0; i < 5; i++) textPoints.push({ x: 47 + i * 0.6, y: 44 });
    for (let i = 0; i < 8; i++) textPoints.push({ x: 47 + i, y: 58 });
    
    // Second dash
    for (let i = 0; i < 6; i++) textPoints.push({ x: 56 + i * 0.5, y: 50 });
    
    // Third "1"
    for (let i = 0; i < 20; i++) textPoints.push({ x: 62, y: 42 + i * 0.8 });
    for (let i = 0; i < 5; i++) textPoints.push({ x: 59 + i * 0.6, y: 44 });
    for (let i = 0; i < 8; i++) textPoints.push({ x: 59 + i, y: 58 });

    // Determine starting edge for each particle
    const getEdgeStart = (index: number) => {
      const edge = index % 4;
      const variance = Math.random() * 100;
      switch (edge) {
        case 0: return { x: variance, y: -10 }; // Top
        case 1: return { x: 110, y: variance }; // Right
        case 2: return { x: variance, y: 110 }; // Bottom
        case 3: return { x: -10, y: variance }; // Left
        default: return { x: -10, y: variance };
      }
    };

    // Create particles for text formation
    textPoints.forEach((target, i) => {
      const start = getEdgeStart(i);
      const midAngle = Math.random() * Math.PI * 2;
      const midDist = 20 + Math.random() * 25;
      
      generated.push({
        id: i,
        startX: start.x,
        startY: start.y,
        midX: 50 + Math.cos(midAngle) * midDist,
        midY: 50 + Math.sin(midAngle) * midDist,
        endX: target.x,
        endY: target.y,
        size: 2 + Math.random() * 3,
        delay: Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        rotation: Math.random() * 360,
        orbitRadius: 5 + Math.random() * 10,
        orbitSpeed: 1 + Math.random() * 2,
      });
    });

    // Create hexagon outline particles
    for (let i = 0; i < 60; i++) {
      const t = i / 60;
      const segmentIndex = Math.floor(t * 6);
      const segmentT = (t * 6) % 1;
      const p1 = hexPoints[segmentIndex];
      const p2 = hexPoints[(segmentIndex + 1) % 6];
      
      const start = getEdgeStart(i + textPoints.length);
      const midAngle = Math.random() * Math.PI * 2;
      
      generated.push({
        id: textPoints.length + i,
        startX: start.x,
        startY: start.y,
        midX: 50 + Math.cos(midAngle) * 35,
        midY: 50 + Math.sin(midAngle) * 35,
        endX: p1.x + (p2.x - p1.x) * segmentT,
        endY: p1.y + (p2.y - p1.y) * segmentT,
        size: 3 + Math.random() * 2,
        delay: 0.2 + Math.random() * 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: "diamond",
        rotation: Math.random() * 360,
        orbitRadius: 8,
        orbitSpeed: 2,
      });
    }

    // Create ambient swirling particles (extra magic)
    for (let i = 0; i < 80; i++) {
      const start = getEdgeStart(i);
      const angle = Math.random() * Math.PI * 2;
      const dist = 20 + Math.random() * 30;
      
      generated.push({
        id: textPoints.length + 60 + i,
        startX: start.x,
        startY: start.y,
        midX: 50 + Math.cos(angle) * (dist + 15),
        midY: 50 + Math.sin(angle) * (dist + 15),
        endX: 50 + Math.cos(angle) * dist,
        endY: 50 + Math.sin(angle) * dist,
        size: 1 + Math.random() * 2,
        delay: Math.random() * 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        rotation: Math.random() * 360,
        orbitRadius: 15 + Math.random() * 20,
        orbitSpeed: 0.5 + Math.random(),
      });
    }

    return generated;
  }, []);

  useEffect(() => {
    // Spectacular phase transitions
    const timers = [
      setTimeout(() => setPhase("swarm"), 300),
      setTimeout(() => setPhase("converge"), 1200),
      setTimeout(() => setPhase("form"), 2200),
      setTimeout(() => setPhase("pulse"), 3200),
      setTimeout(() => setPhase("complete"), duration - 800),
      setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, duration),
    ];

    return () => timers.forEach(clearTimeout);
  }, [duration, onComplete]);

  // Render different shapes
  const renderShape = (particle: Particle, x: string, y: string, scale: number, opacity: number) => {
    const baseProps = {
      fill: particle.color,
      filter: "url(#glow)",
      style: { transformOrigin: "center" },
    };

    switch (particle.shape) {
      case "triangle":
        return (
          <motion.polygon
            key={particle.id}
            points={`0,-${particle.size} ${particle.size * 0.866},${particle.size * 0.5} -${particle.size * 0.866},${particle.size * 0.5}`}
            {...baseProps}
            initial={{ x: `${particle.startX}%`, y: `${particle.startY}%`, scale: 0, opacity: 0, rotate: 0 }}
            animate={getParticleAnimation(particle, scale, opacity)}
            transition={getParticleTransition(particle)}
          />
        );
      case "diamond":
        return (
          <motion.polygon
            key={particle.id}
            points={`0,-${particle.size} ${particle.size},0 0,${particle.size} -${particle.size},0`}
            {...baseProps}
            initial={{ x: `${particle.startX}%`, y: `${particle.startY}%`, scale: 0, opacity: 0, rotate: 0 }}
            animate={getParticleAnimation(particle, scale, opacity)}
            transition={getParticleTransition(particle)}
          />
        );
      case "star":
        const starPoints = [];
        for (let i = 0; i < 5; i++) {
          const outerAngle = (Math.PI / 2.5) * i - Math.PI / 2;
          const innerAngle = outerAngle + Math.PI / 5;
          starPoints.push(`${Math.cos(outerAngle) * particle.size},${Math.sin(outerAngle) * particle.size}`);
          starPoints.push(`${Math.cos(innerAngle) * particle.size * 0.4},${Math.sin(innerAngle) * particle.size * 0.4}`);
        }
        return (
          <motion.polygon
            key={particle.id}
            points={starPoints.join(" ")}
            {...baseProps}
            initial={{ x: `${particle.startX}%`, y: `${particle.startY}%`, scale: 0, opacity: 0, rotate: 0 }}
            animate={getParticleAnimation(particle, scale, opacity)}
            transition={getParticleTransition(particle)}
          />
        );
      default:
        return (
          <motion.circle
            key={particle.id}
            r={particle.size}
            {...baseProps}
            initial={{ cx: `${particle.startX}%`, cy: `${particle.startY}%`, scale: 0, opacity: 0 }}
            animate={getCircleAnimation(particle, scale, opacity)}
            transition={getParticleTransition(particle)}
          />
        );
    }
  };

  const getCircleAnimation = (particle: Particle, scale: number, opacity: number) => {
    switch (phase) {
      case "burst":
        return { cx: `${particle.startX}%`, cy: `${particle.startY}%`, scale: 1, opacity: 0.8 };
      case "swarm":
        return { cx: `${particle.midX}%`, cy: `${particle.midY}%`, scale: 1.2, opacity: 1 };
      case "converge":
        return { cx: `${(particle.midX + particle.endX) / 2}%`, cy: `${(particle.midY + particle.endY) / 2}%`, scale: 1, opacity: 1 };
      case "form":
        return { cx: `${particle.endX}%`, cy: `${particle.endY}%`, scale: 1, opacity: 1 };
      case "pulse":
        return { cx: `${particle.endX}%`, cy: `${particle.endY}%`, scale: [1, 1.3, 1], opacity: 1 };
      case "complete":
        return { cx: `${particle.endX}%`, cy: `${particle.endY}%`, scale: 1, opacity: 1 };
      default:
        return { cx: `${particle.startX}%`, cy: `${particle.startY}%`, scale: 0, opacity: 0 };
    }
  };

  const getParticleAnimation = (particle: Particle, scale: number, opacity: number) => {
    switch (phase) {
      case "burst":
        return { x: `${particle.startX}%`, y: `${particle.startY}%`, scale: 1, opacity: 0.8, rotate: particle.rotation };
      case "swarm":
        return { x: `${particle.midX}%`, y: `${particle.midY}%`, scale: 1.2, opacity: 1, rotate: particle.rotation + 180 };
      case "converge":
        return { x: `${(particle.midX + particle.endX) / 2}%`, y: `${(particle.midY + particle.endY) / 2}%`, scale: 1, opacity: 1, rotate: particle.rotation + 270 };
      case "form":
        return { x: `${particle.endX}%`, y: `${particle.endY}%`, scale: 1, opacity: 1, rotate: particle.rotation + 360 };
      case "pulse":
        return { x: `${particle.endX}%`, y: `${particle.endY}%`, scale: [1, 1.3, 1], opacity: 1, rotate: particle.rotation + 360 };
      case "complete":
        return { x: `${particle.endX}%`, y: `${particle.endY}%`, scale: 1, opacity: 1, rotate: particle.rotation + 360 };
      default:
        return { x: `${particle.startX}%`, y: `${particle.startY}%`, scale: 0, opacity: 0, rotate: 0 };
    }
  };

  const getParticleTransition = (particle: Particle) => ({
    duration: phase === "burst" ? 0.5 : phase === "pulse" ? 0.8 : 1,
    delay: particle.delay,
    ease: phase === "pulse" ? "easeInOut" : [0.16, 1, 0.3, 1],
    scale: phase === "pulse" ? { duration: 0.8, repeat: Infinity, ease: "easeInOut" } : undefined,
  });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: "#030308" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {/* Radial gradient background pulse */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at center, rgba(99,102,241,0.15) 0%, transparent 60%)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Multiple layered glowing rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border"
              style={{
                width: 200 + i * 100,
                height: 200 + i * 100,
                borderColor: `rgba(99,102,241,${0.3 - i * 0.1})`,
                boxShadow: `0 0 ${20 + i * 10}px rgba(99,102,241,${0.2 - i * 0.05})`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={
                phase !== "burst"
                  ? { scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5], rotate: 360 }
                  : { scale: 0, opacity: 0 }
              }
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.3,
              }}
            />
          ))}

          {/* Main particle SVG canvas */}
          <svg className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }}>
            <defs>
              <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(99,102,241,0)" />
                <stop offset="50%" stopColor="rgba(99,102,241,0.8)" />
                <stop offset="100%" stopColor="rgba(99,102,241,0)" />
              </linearGradient>
            </defs>

            {/* Energy trails connecting particles */}
            {phase !== "burst" && particles.slice(0, 60).map((particle, i) => {
              const next = particles[(i + 7) % 60];
              return (
                <motion.line
                  key={`trail-${i}`}
                  stroke="url(#lineGradient)"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.4 }}
                  transition={{ duration: 1.5, delay: particle.delay + 0.5 }}
                  x1={`${particle.endX}%`}
                  y1={`${particle.endY}%`}
                  x2={`${next.endX}%`}
                  y2={`${next.endY}%`}
                />
              );
            })}

            {/* Render all particles */}
            {particles.map((particle) => renderShape(particle, "", "", 1, 1))}
          </svg>

          {/* Central hexagonal glow burst */}
          <motion.div
            className="absolute"
            style={{
              width: 300,
              height: 300,
              background: "conic-gradient(from 0deg, #6366f1, #ec4899, #22d3ee, #a855f7, #6366f1)",
              filter: "blur(60px)",
              borderRadius: "50%",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={
              phase === "form" || phase === "pulse" || phase === "complete"
                ? { scale: [0.8, 1, 0.8], opacity: [0.2, 0.4, 0.2], rotate: 360 }
                : { scale: 0, opacity: 0 }
            }
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          {/* Floating text reveal */}
          <motion.div
            className="absolute flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={
              phase === "complete"
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-6xl font-bold bg-gradient-to-r from-indigo-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent"
              animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200%" }}
            >
              1-1-1
            </motion.h1>
          </motion.div>

          {/* Phase indicator dots */}
          <div className="absolute bottom-16 flex gap-2">
            {["burst", "swarm", "converge", "form", "pulse", "complete"].map((p, i) => (
              <motion.div
                key={p}
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: phase === p || ["burst", "swarm", "converge", "form", "pulse", "complete"].indexOf(phase) > i
                    ? "#6366f1"
                    : "rgba(99,102,241,0.2)",
                }}
                animate={phase === p ? { scale: [1, 1.5, 1] } : {}}
                transition={{ duration: 0.5, repeat: phase === p ? Infinity : 0 }}
              />
            ))}
          </div>

          {/* Loading text with phase */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.p
              className="text-xs uppercase tracking-[0.5em] text-white/30 font-light"
              key={phase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {phase === "burst" && "INITIATING"}
              {phase === "swarm" && "GATHERING"}
              {phase === "converge" && "CONVERGING"}
              {phase === "form" && "FORMING"}
              {phase === "pulse" && "AWAKENING"}
              {phase === "complete" && "WELCOME"}
            </motion.p>
          </motion.div>

          {/* Mouse follow subtle glow */}
          <motion.div
            className="absolute w-32 h-32 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)",
              filter: "blur(20px)",
            }}
            animate={{
              x: `${mousePos.x - 50}%`,
              y: `${mousePos.y - 50}%`,
            }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
