"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

/**
 * ParticleText - Creative text reveals with particle effects
 * Characters assemble from particles, with gradient fills and stagger animations
 */

interface ParticleTextProps {
  text: string;
  className?: string;
  delay?: number;
  variant?: "assemble" | "glitch" | "wave" | "gradient";
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  onComplete?: () => void;
}

export default function ParticleText({
  text,
  className = "",
  delay = 0,
  variant = "assemble",
  size = "lg",
  onComplete,
}: ParticleTextProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const controls = useAnimationControls();

  const sizeClasses = {
    sm: "text-lg md:text-xl",
    md: "text-2xl md:text-3xl",
    lg: "text-4xl md:text-5xl lg:text-6xl",
    xl: "text-5xl md:text-6xl lg:text-7xl",
    "2xl": "text-6xl md:text-7xl lg:text-8xl",
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealed(true);
      controls.start("visible");
      
      const completeTimer = setTimeout(() => {
        onComplete?.();
      }, text.length * 100 + 500);
      
      return () => clearTimeout(completeTimer);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay, controls, text.length, onComplete]);

  const characters = text.split("");

  // Variants for different animation styles
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const getCharacterVariant = () => {
    switch (variant) {
      case "assemble":
        return {
          hidden: {
            opacity: 0,
            y: 50,
            scale: 0,
            rotate: Math.random() * 180 - 90,
          },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            transition: {
              type: "spring",
              stiffness: 200,
              damping: 15,
            },
          },
        };
      case "glitch":
        return {
          hidden: { opacity: 0, x: 0 },
          visible: {
            opacity: 1,
            x: [0, -5, 5, -3, 3, 0],
            transition: {
              duration: 0.5,
              x: { duration: 0.3, ease: "easeOut" },
            },
          },
        };
      case "wave":
        return {
          hidden: { opacity: 0, y: 30 },
          visible: (i: number) => ({
            opacity: 1,
            y: [0, -10, 0],
            transition: {
              duration: 0.6,
              y: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1,
              },
            },
          }),
        };
      case "gradient":
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: {
              duration: 0.4,
            },
          },
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
    }
  };

  const characterVariants = getCharacterVariant();

  return (
    <motion.div
      className={`relative inline-flex flex-wrap justify-center ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {characters.map((char, i) => (
        <motion.span
          key={i}
          className={`inline-block ${sizeClasses[size]} font-bold ${
            char === " " ? "w-4" : ""
          }`}
          style={{
            background: variant === "gradient" 
              ? "linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #22d3ee 100%)"
              : undefined,
            WebkitBackgroundClip: variant === "gradient" ? "text" : undefined,
            WebkitTextFillColor: variant === "gradient" ? "transparent" : undefined,
            textShadow: variant !== "gradient" ? "0 0 20px rgba(99,102,241,0.5)" : undefined,
          }}
          variants={characterVariants}
          custom={i}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}

      {/* Particle trail during assembly */}
      {variant === "assemble" && !isRevealed && (
        <AssemblyParticles count={20} />
      )}
    </motion.div>
  );
}

/**
 * Assembly particles that appear during text reveal
 */
function AssemblyParticles({ count }: { count: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: Math.random() * 200 - 100,
        y: Math.random() * 100 - 50,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 0.5,
        color: [
          "rgba(99,102,241,0.8)",
          "rgba(236,72,153,0.8)",
          "rgba(34,211,238,0.8)",
        ][Math.floor(Math.random() * 3)],
      })),
    [count]
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute top-1/2 left-1/2 rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            background: particle.color,
            boxShadow: `0 0 10px ${particle.color}`,
          }}
          initial={{
            x: particle.x,
            y: particle.y,
            opacity: 1,
          }}
          animate={{
            x: 0,
            y: 0,
            opacity: 0,
            scale: 0,
          }}
          transition={{
            duration: 0.8,
            delay: particle.delay,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  );
}

/**
 * GradientText - Simple gradient text without animation
 */
export function GradientText({
  children,
  className = "",
  gradient = "from-indigo-400 via-pink-400 to-cyan-400",
}: {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
}) {
  return (
    <span
      className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
}

/**
 * TypewriterText - Text that types out character by character
 */
export function TypewriterText({
  text,
  className = "",
  speed = 50,
  delay = 0,
  cursor = true,
  onComplete,
}: {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  onComplete?: () => void;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [text, speed, delay, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {cursor && (
        <motion.span
          className="inline-block w-0.5 h-[1em] bg-current ml-1"
          animate={{ opacity: isComplete ? 0 : [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
    </span>
  );
}

/**
 * SplitRevealText - Text that reveals with a split/wipe effect
 */
export function SplitRevealText({
  text,
  className = "",
  delay = 0,
  direction = "up",
}: {
  text: string;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}) {
  const directions = {
    up: { initial: { y: "100%" }, animate: { y: 0 } },
    down: { initial: { y: "-100%" }, animate: { y: 0 } },
    left: { initial: { x: "100%" }, animate: { x: 0 } },
    right: { initial: { x: "-100%" }, animate: { x: 0 } },
  };

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={directions[direction].initial}
        animate={directions[direction].animate}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {text}
      </motion.div>
    </div>
  );
}
