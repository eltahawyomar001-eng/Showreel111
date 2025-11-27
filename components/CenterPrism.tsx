"use client";

import { motion } from "framer-motion";
import { useState } from "react";

/**
 * CenterPrism - Modern glassmorphism 3D prism
 * Elegant floating crystal with smooth hover interactions
 */
export default function CenterPrism() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 cursor-pointer perspective-1000"
      initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        rotateY: 0,
      }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Main floating animation wrapper */}
      <motion.div
        className="relative w-full h-full"
        animate={{
          y: [0, -15, 0],
          rotateY: isHovered ? 15 : 0,
          rotateX: isHovered ? -10 : 0,
        }}
        transition={{
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotateY: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          rotateX: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Outer glow */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: "radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
          animate={{
            scale: isHovered ? 1.3 : 1,
            opacity: isHovered ? 0.8 : 0.5,
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Back face */}
        <motion.div
          className="absolute inset-4 rounded-2xl"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(236,72,153,0.1) 100%)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            transform: "translateZ(-40px)",
          }}
        />

        {/* Main prism body */}
        <motion.div
          className="absolute inset-0 rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.15)",
            boxShadow: isHovered 
              ? "0 25px 80px -20px rgba(99,102,241,0.5), inset 0 1px 0 rgba(255,255,255,0.2)"
              : "0 25px 60px -20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
          animate={{
            boxShadow: isHovered 
              ? "0 30px 100px -20px rgba(99,102,241,0.6), inset 0 1px 0 rgba(255,255,255,0.3)"
              : "0 25px 60px -20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
          transition={{ duration: 0.4 }}
        >
          {/* Inner gradient layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-transparent to-pink-500/20" />
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-purple-500/10" />
          
          {/* Highlight streak */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1/2"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)",
            }}
          />
          
          {/* Center diamond accent */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-16 h-16 md:w-20 md:h-20 rotate-45"
              style={{
                background: "linear-gradient(135deg, rgba(99,102,241,0.4) 0%, rgba(236,72,153,0.4) 100%)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
              animate={{
                rotate: isHovered ? 225 : 45,
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          {/* Animated edge highlights */}
          <motion.div
            className="absolute top-4 left-4 w-12 h-[2px] bg-gradient-to-r from-white/40 to-transparent rounded-full"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-4 left-4 h-12 w-[2px] bg-gradient-to-b from-white/40 to-transparent rounded-full"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        </motion.div>

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/60"
            style={{
              left: `${20 + i * 12}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}