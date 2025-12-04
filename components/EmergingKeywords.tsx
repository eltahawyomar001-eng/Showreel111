"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * EmergingKeywords - Keywords that appear/shine at different instances and locations
 * Keywords: "Approximate Thinking", "Innovation", "Great Work", 
 *           "Cultural Resource Sets", "Systems", "Creativity"
 */

interface Keyword {
  text: string;
  x: number;
  y: number;
  delay: number;
  duration: number;
  size: "sm" | "md" | "lg";
}

interface EmergingKeywordsProps {
  enabled?: boolean;
  className?: string;
}

const KEYWORDS = [
  "Approximate Thinking",
  "Innovation", 
  "Great Work",
  "Cultural Resource Sets",
  "Systems",
  "Creativity",
  "Emergence",
  "Complexity",
  "Fractals",
  "Advisory",
];

export default function EmergingKeywords({ 
  enabled = true,
  className = "",
}: EmergingKeywordsProps) {
  const [activeKeywords, setActiveKeywords] = useState<Keyword[]>([]);

  // Generate random keyword appearances
  useEffect(() => {
    if (!enabled) {
      setActiveKeywords([]);
      return;
    }

    const generateKeyword = (): Keyword => {
      const text = KEYWORDS[Math.floor(Math.random() * KEYWORDS.length)];
      const sizes: Array<"sm" | "md" | "lg"> = ["sm", "sm", "sm", "md", "md", "lg"];
      
      return {
        text,
        x: 10 + Math.random() * 80, // percentage
        y: 10 + Math.random() * 80,
        delay: 0,
        duration: 3 + Math.random() * 2,
        size: sizes[Math.floor(Math.random() * sizes.length)],
      };
    };

    // Initial keywords
    const initial = Array.from({ length: 3 }, generateKeyword);
    setActiveKeywords(initial);

    // Add new keywords periodically
    const interval = setInterval(() => {
      setActiveKeywords((prev) => {
        // Remove old ones and add new
        const filtered = prev.slice(-4);
        return [...filtered, generateKeyword()];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [enabled]);

  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      <AnimatePresence>
        {activeKeywords.map((keyword, index) => (
          <motion.div
            key={`${keyword.text}-${index}-${keyword.x}-${keyword.y}`}
            className="absolute"
            style={{
              left: `${keyword.x}%`,
              top: `${keyword.y}%`,
            }}
            initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
            animate={{ 
              opacity: [0, 0.6, 0.6, 0],
              scale: [0.8, 1, 1, 0.9],
              filter: ["blur(4px)", "blur(0px)", "blur(0px)", "blur(4px)"],
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ 
              duration: keyword.duration,
              times: [0, 0.2, 0.8, 1],
              ease: "easeInOut",
            }}
          >
            <span 
              className={`
                ${sizeClasses[keyword.size]}
                uppercase tracking-[0.3em] text-white/40
                whitespace-nowrap
              `}
              style={{
                textShadow: "0 0 20px rgba(255,140,66,0.3), 0 0 40px rgba(232,74,138,0.2)",
              }}
            >
              {keyword.text}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/**
 * Single keyword with glow effect - for specific placements
 */
export function GlowingKeyword({
  text,
  className = "",
  delay = 0,
  glowColor = "rgba(255,140,66,0.5)",
}: {
  text: string;
  className?: string;
  delay?: number;
  glowColor?: string;
}) {
  return (
    <motion.span
      className={`inline-block ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.span
        className="relative"
        animate={{
          textShadow: [
            `0 0 10px ${glowColor}, 0 0 20px ${glowColor}`,
            `0 0 20px ${glowColor}, 0 0 40px ${glowColor}`,
            `0 0 10px ${glowColor}, 0 0 20px ${glowColor}`,
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {text}
      </motion.span>
    </motion.span>
  );
}

/**
 * Text that emerges character by character with glow
 */
export function EmergingText({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.03,
}: {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}) {
  const characters = text.split("");

  return (
    <motion.span
      className={`inline-block ${className}`}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={{
            hidden: { 
              opacity: 0, 
              y: 20,
              filter: "blur(8px)",
            },
            visible: { 
              opacity: 1, 
              y: 0,
              filter: "blur(0px)",
              transition: {
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
          style={{
            textShadow: "0 0 10px rgba(255,140,66,0.3)",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
