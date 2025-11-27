"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";
import TransitionOverlay from "@/components/TransitionOverlay";

/**
 * Website Refresh Showreel - Demonstrating Transition Skills
 * Showcasing: zoom effects, shape morphing, text reveals, smooth transitions
 */
export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring for scroll progress
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Section 1: Hero transforms
  const heroScale = useTransform(smoothProgress, [0, 0.15], [1, 0.6]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0]);
  const heroRotate = useTransform(smoothProgress, [0, 0.15], [0, -10]);

  // Section 2: Shape morphs in
  const shape1Scale = useTransform(smoothProgress, [0.1, 0.25], [0, 1]);
  const shape1Rotate = useTransform(smoothProgress, [0.1, 0.3], [180, 0]);
  const shape1Opacity = useTransform(smoothProgress, [0.1, 0.2, 0.35, 0.4], [0, 1, 1, 0]);

  // Section 3: Text reveal
  const text2Y = useTransform(smoothProgress, [0.3, 0.45], [100, 0]);
  const text2Opacity = useTransform(smoothProgress, [0.3, 0.4, 0.55, 0.6], [0, 1, 1, 0]);
  const text2Scale = useTransform(smoothProgress, [0.55, 0.65], [1, 1.5]);

  // Section 4: Final zoom
  const finalScale = useTransform(smoothProgress, [0.6, 0.8], [0.5, 1]);
  const finalOpacity = useTransform(smoothProgress, [0.6, 0.75], [0, 1]);
  const finalY = useTransform(smoothProgress, [0.6, 0.8], [50, 0]);

  // Morphing shape path
  const shapeProgress = useTransform(smoothProgress, [0.15, 0.35], [0, 1]);
  
  // Shape morphing values (moved from JSX)
  const shapeBorderRadius = useTransform(shapeProgress, [0, 0.5, 1], ["50%", "30%", "10%"]);
  const shapeRotation = useTransform(shapeProgress, [0, 1], [0, 90]);
  const innerBorderRadius = useTransform(shapeProgress, [0, 0.5, 1], ["10%", "30%", "50%"]);
  
  // Animated underline width
  const underlineWidth = useTransform(smoothProgress, [0.35, 0.5], ["0%", "60%"]);

  return (
    <main ref={containerRef} className="relative h-[500vh]">
      <TransitionOverlay />
      <AnimatedBackground />

      {/* Fixed viewport container */}
      <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
        
        {/* SECTION 1: Hero with zoom-out effect */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ scale: heroScale, opacity: heroOpacity, rotate: heroRotate }}
        >
          {/* Animated title with stagger */}
          <motion.div className="text-center">
            <motion.p
              className="text-sm md:text-base uppercase tracking-[0.4em] text-white/50 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Website Refresh Showreel
            </motion.p>
            
            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <motion.span 
                className="block text-white"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                Smooth
              </motion.span>
              <motion.span 
                className="block bg-gradient-to-r from-indigo-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                Transitions
              </motion.span>
            </motion.h1>

            <motion.p
              className="mt-8 text-lg text-white/40 uppercase tracking-[0.3em]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
            >
              Scroll to explore
            </motion.p>
          </motion.div>

          {/* Decorative floating shapes */}
          <motion.div
            className="absolute w-32 h-32 border border-white/20 rounded-full"
            style={{ top: "20%", left: "15%" }}
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute w-24 h-24 border border-pink-500/30"
            style={{ bottom: "25%", right: "20%", rotate: 45 }}
            animate={{ rotate: [45, 135, 45], scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </motion.div>

        {/* SECTION 2: Morphing Shape */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: shape1Opacity }}
        >
          <motion.div
            className="relative"
            style={{ scale: shape1Scale, rotate: shape1Rotate }}
          >
            {/* Morphing geometric shape */}
            <motion.div
              className="w-64 h-64 md:w-96 md:h-96 relative"
              style={{
                background: "linear-gradient(135deg, rgba(99,102,241,0.3) 0%, rgba(236,72,153,0.3) 50%, rgba(34,211,238,0.3) 100%)",
                borderRadius: shapeBorderRadius,
                rotate: shapeRotation,
              }}
            >
              {/* Inner rotating element */}
              <motion.div
                className="absolute inset-8 border-2 border-white/30"
                style={{
                  borderRadius: innerBorderRadius,
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Center diamond */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div 
                  className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-pink-500"
                  style={{ transform: "rotate(45deg)" }}
                />
              </motion.div>
            </motion.div>

            {/* Caption */}
            <motion.p
              className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-white/60 text-lg tracking-widest uppercase whitespace-nowrap"
              style={{ opacity: shape1Opacity }}
            >
              Shape Transformation
            </motion.p>
          </motion.div>
        </motion.div>

        {/* SECTION 3: Text Reveal with Zoom */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: text2Opacity, y: text2Y, scale: text2Scale }}
        >
          <div className="text-center max-w-4xl px-8">
            <motion.div className="overflow-hidden">
              <motion.h2 
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
                style={{ y: text2Y }}
              >
                Creative effects that
              </motion.h2>
            </motion.div>
            <motion.div className="overflow-hidden mt-2">
              <motion.h2 
                className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent"
                style={{ y: text2Y }}
              >
                captivate & engage
              </motion.h2>
            </motion.div>
            
            {/* Animated underline */}
            <motion.div 
              className="h-1 bg-gradient-to-r from-indigo-500 via-pink-500 to-cyan-500 mt-8 mx-auto"
              style={{ 
                width: underlineWidth,
              }}
            />
          </div>
        </motion.div>

        {/* SECTION 4: Final CTA */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: finalOpacity, scale: finalScale, y: finalY }}
        >
          <div className="text-center max-w-3xl px-8">
            <motion.h2 
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              Let&apos;s Transform
              <span className="block bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
                Your Website
              </span>
            </motion.h2>
            
            <motion.p className="text-xl text-white/60 mb-12 max-w-xl mx-auto">
              Smooth transitions, stunning effects, and creative motion design
            </motion.p>

            {/* Animated CTA button */}
            <motion.button
              className="group relative px-10 py-5 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full text-white text-lg font-semibold overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span 
                className="relative z-10"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Get Started →
              </motion.span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-pink-500 to-cyan-500"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            {/* Tech badges */}
            <motion.div 
              className="flex justify-center gap-4 mt-12 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {["Zoom Effects", "Shape Morphing", "Text Reveals", "Smooth Scroll"].map((item, i) => (
                <span 
                  key={i}
                  className="px-4 py-2 text-sm text-white/50 border border-white/20 rounded-full"
                >
                  {item}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll progress indicator */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          <ProgressDot progress={smoothProgress} threshold={0} />
          <ProgressDot progress={smoothProgress} threshold={0.25} />
          <ProgressDot progress={smoothProgress} threshold={0.5} />
          <ProgressDot progress={smoothProgress} threshold={0.75} />
        </div>
      </div>
    </main>
  );
}

// Separate component to use hooks properly
function ProgressDot({ progress, threshold }: { progress: any; threshold: number }) {
  const backgroundColor = useTransform(
    progress,
    [threshold, threshold + 0.1],
    ["rgba(255,255,255,0.2)", "rgba(236,72,153,1)"]
  );
  
  return (
    <motion.div
      className="w-2 h-2 rounded-full"
      style={{ backgroundColor }}
    />
  );
}
