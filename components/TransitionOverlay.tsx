"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * TransitionOverlay - Modern dark theme loader
 * Elegant reveal animation with gradient accents
 */
export default function TransitionOverlay() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "#0a0a0f" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Animated loader */}
          <motion.div
            className="relative flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            {/* Spinning ring */}
            <motion.div
              className="w-16 h-16 rounded-full border-2 border-white/10"
              style={{
                borderTopColor: "rgba(99, 102, 241, 0.8)",
                borderRightColor: "rgba(236, 72, 153, 0.6)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, ease: "linear", repeat: Infinity }}
            />
            
            {/* Center dot */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            
            {/* Loading text */}
            <motion.p
              className="mt-6 text-sm uppercase tracking-[0.3em] text-white/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Loading
            </motion.p>
          </motion.div>

          {/* Ambient glow */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
