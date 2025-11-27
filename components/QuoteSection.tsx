"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface QuoteSectionProps {
  quote: string;
  author?: string;
  accentColor?: string;
  index: number;
}

/**
 * QuoteSection - Minimal elegant quote with smooth scroll animations
 * Unified design language with consistent styling
 */
export default function QuoteSection({
  quote,
  author,
  accentColor = "indigo",
  index,
}: QuoteSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Smooth scroll-driven animations
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);
  
  // Accent line animation
  const lineWidth = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], ["0%", "100%", "100%", "0%"]);

  // Color mapping for accent
  const accentColors: Record<string, { gradient: string; glow: string }> = {
    indigo: {
      gradient: "from-indigo-500 to-purple-500",
      glow: "rgba(99, 102, 241, 0.3)",
    },
    pink: {
      gradient: "from-pink-500 to-rose-500",
      glow: "rgba(236, 72, 153, 0.3)",
    },
    cyan: {
      gradient: "from-cyan-500 to-blue-500",
      glow: "rgba(34, 211, 238, 0.3)",
    },
  };

  const colors = accentColors[accentColor] || accentColors.indigo;

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 py-24"
    >
      <motion.div
        className="max-w-4xl w-full text-center"
        style={{ opacity, y, scale }}
      >
        {/* Decorative number */}
        <motion.span
          className={`block text-8xl md:text-9xl font-bold bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent opacity-20 mb-8`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.2, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          0{index + 1}
        </motion.span>

        {/* Accent line */}
        <div className="flex justify-center mb-12">
          <motion.div
            className={`h-[2px] bg-gradient-to-r ${colors.gradient} rounded-full`}
            style={{ width: lineWidth }}
          />
        </div>

        {/* Quote text */}
        <motion.blockquote
          className="text-2xl md:text-4xl lg:text-5xl font-light leading-relaxed text-white/90 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className={`bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>&ldquo;</span>
          {quote}
          <span className={`bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>&rdquo;</span>
        </motion.blockquote>
        
        {/* Author */}
        {author && (
          <motion.p
            className="text-lg md:text-xl text-white/50 tracking-wide"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            — {author}
          </motion.p>
        )}

        {/* Subtle glow behind quote */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${colors.glow} 0%, transparent 50%)`,
            opacity: 0.5,
          }}
        />
      </motion.div>
    </section>
  );
}
