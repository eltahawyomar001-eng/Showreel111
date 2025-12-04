"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import DoubleTetrahedron from "@/components/DoubleTetrahedron";
import TetrahedronLoader from "@/components/TetrahedronLoader";
import TetrahedronBackground from "@/components/TetrahedronBackground";
import ZoomTransition, { useZoomTransition } from "@/components/ZoomTransition";
import EmergingKeywords, { EmergingText, GlowingKeyword } from "@/components/EmergingKeywords";
import GlowingHomeIcon from "@/components/GlowingHomeIcon";

/**
 * 1-1-1 Website Prototype v2
 * 
 * Features:
 * - Double Tetrahedron logo as central element
 * - Zoom OUT transition when leaving home (shape loses color → B&W → zoom out)
 * - Zoom IN transition when returning home
 * - Emerging keywords with glow effects
 * - B&W tetrahedron texture background
 */

type Screen = "home" | "services" | "about" | "contact";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [isNavigating, setIsNavigating] = useState(false);
  const [shapeColorMode, setShapeColorMode] = useState<"full" | "bw" | "transitioning">("full");
  const { isTransitioning, direction, triggerZoomOut, triggerZoomIn, handleComplete } = useZoomTransition();

  const navigateTo = useCallback((screen: Screen) => {
    if (isNavigating) return;
    
    setIsNavigating(true);
    
    if (screen === "home") {
      // Returning home - zoom IN
      triggerZoomIn();
      setTimeout(() => {
        setCurrentScreen(screen);
        setShapeColorMode("full");
        setIsNavigating(false);
      }, 1200);
    } else {
      // Leaving home - zoom OUT
      // First desaturate the shape
      setShapeColorMode("transitioning");
      setTimeout(() => setShapeColorMode("bw"), 400);
      
      triggerZoomOut();
      setTimeout(() => {
        setCurrentScreen(screen);
        setIsNavigating(false);
      }, 1200);
    }
  }, [isNavigating, triggerZoomOut, triggerZoomIn]);

  const handleTransitionComplete = useCallback(() => {
    handleComplete();
    if (currentScreen === "home") {
      setShapeColorMode("full");
    }
  }, [handleComplete, currentScreen]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0a0a]">
      {/* B&W Tetrahedron Background Texture */}
      <TetrahedronBackground 
        density="medium" 
        opacity={isLoaded ? 0.12 : 0} 
        animated={true}
      />
      
      {/* Emerging Keywords - floating around */}
      <EmergingKeywords enabled={isLoaded && currentScreen === "home"} />

      {/* Initial Loader - Double Tetrahedron fades in first */}
      <TetrahedronLoader 
        onComplete={() => setIsLoaded(true)} 
        duration={4000}
      />

      {/* Zoom Transition Effect */}
      <ZoomTransition 
        isActive={isTransitioning} 
        direction={direction}
        onComplete={handleTransitionComplete}
      />

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {isLoaded && (
          <motion.div
            key={currentScreen}
            className="fixed inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: currentScreen === "home" ? 0.8 : 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: currentScreen === "home" ? 1.2 : 0.8 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* HOME SCREEN */}
            {currentScreen === "home" && (
              <HomeScreen 
                onNavigate={navigateTo} 
                colorMode={shapeColorMode}
              />
            )}

            {/* SERVICES SCREEN */}
            {currentScreen === "services" && (
              <ServicesScreen onHome={() => navigateTo("home")} />
            )}

            {/* ABOUT SCREEN */}
            {currentScreen === "about" && (
              <AboutScreen onHome={() => navigateTo("home")} />
            )}

            {/* CONTACT SCREEN */}
            {currentScreen === "contact" && (
              <ContactScreen onHome={() => navigateTo("home")} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

/**
 * HOME SCREEN - Central Double Tetrahedron with navigation arrows
 */
function HomeScreen({ 
  onNavigate, 
  colorMode 
}: { 
  onNavigate: (screen: Screen) => void;
  colorMode: "full" | "bw" | "transitioning";
}) {
  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Tagline above */}
      <motion.div
        className="absolute -top-40 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <EmergingText
          text="Advisory & Innovation"
          className="text-sm md:text-base uppercase tracking-[0.4em] text-white/50"
          delay={0.5}
        />
      </motion.div>

      {/* Central Double Tetrahedron with navigation */}
      <div className="relative">
        <DoubleTetrahedron 
          size={280} 
          animated={true}
          colorMode={colorMode}
          glowIntensity={colorMode === "full" ? 1.2 : 0.3}
        />
        
        {/* Navigation Arrows around the shape */}
        <NavigationArrows onNavigate={onNavigate} />
      </div>

      {/* Tagline below */}
      <motion.div
        className="absolute -bottom-32 text-center max-w-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <p className="text-white/40 text-sm tracking-wider">
          Where{" "}
          <GlowingKeyword 
            text="complexity" 
            className="text-white/70"
            glowColor="rgba(255,140,66,0.5)"
          />{" "}
          meets{" "}
          <GlowingKeyword 
            text="clarity" 
            className="text-white/70"
            glowColor="rgba(232,74,138,0.5)"
          />
        </p>
      </motion.div>

      {/* Corner Keywords */}
      <CornerKeywords />
    </div>
  );
}

/**
 * Navigation arrows positioned around the central shape
 */
function NavigationArrows({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  const arrows = [
    { direction: "down", screen: "services" as Screen, label: "Services", x: 0, y: 200 },
    { direction: "left", screen: "contact" as Screen, label: "Contact", x: -180, y: 80 },
    { direction: "right", screen: "about" as Screen, label: "About", x: 180, y: 80 },
  ];

  return (
    <>
      {arrows.map((arrow, i) => (
        <motion.button
          key={arrow.direction}
          className="absolute flex flex-col items-center gap-2 group"
          style={{
            left: "50%",
            top: "50%",
            transform: `translate(calc(-50% + ${arrow.x}px), calc(-50% + ${arrow.y}px))`,
          }}
          onClick={() => onNavigate(arrow.screen)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 + i * 0.1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Arrow with glow */}
          <motion.div
            className="relative"
            animate={{
              y: arrow.direction === "down" ? [0, 5, 0] : 0,
              x: arrow.direction === "left" ? [0, -5, 0] : arrow.direction === "right" ? [0, 5, 0] : 0,
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg 
              width="40" 
              height="40" 
              viewBox="0 0 40 40"
              className="transform"
              style={{
                rotate: arrow.direction === "down" ? "90deg" : arrow.direction === "left" ? "180deg" : "0deg",
                filter: "drop-shadow(0 0 8px rgba(255,140,66,0.5))",
              }}
            >
              <motion.path
                d="M10 20 L25 10 L25 30 Z"
                fill="none"
                stroke="rgba(255,140,66,0.8)"
                strokeWidth="2"
                animate={{
                  stroke: ["rgba(255,140,66,0.6)", "rgba(232,74,138,0.8)", "rgba(255,140,66,0.6)"],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </svg>
          </motion.div>
          
          {/* Label */}
          <span className="text-xs uppercase tracking-widest text-white/40 group-hover:text-white/70 transition-colors">
            {arrow.label}
          </span>
        </motion.button>
      ))}
    </>
  );
}

/**
 * Corner keywords that appear subtly
 */
function CornerKeywords() {
  const keywords = [
    { text: "EMERGENCE", position: "top-8 left-8" },
    { text: "FRACTALS", position: "top-8 right-8" },
    { text: "SYSTEMS", position: "bottom-8 left-8" },
    { text: "INNOVATION", position: "bottom-8 right-8" },
  ];

  return (
    <>
      {keywords.map((kw, i) => (
        <motion.div
          key={kw.text}
          className={`fixed ${kw.position} text-white/15 text-xs tracking-[0.3em]`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 + i * 0.1 }}
        >
          {kw.text}
        </motion.div>
      ))}
    </>
  );
}

/**
 * SERVICES SCREEN - Emerges from zoomed out shapes
 */
function ServicesScreen({ onHome }: { onHome: () => void }) {
  const services = [
    { 
      title: "Strategic Advisory", 
      desc: "Navigate complexity with approximate thinking",
      keywords: ["Systems", "Emergence", "Clarity"]
    },
    { 
      title: "Innovation Labs", 
      desc: "Transform cultural resource sets into breakthroughs",
      keywords: ["Creativity", "Great Work", "Impact"]
    },
    { 
      title: "Fractals & Patterns", 
      desc: "Reveal the hidden structures driving growth",
      keywords: ["Complexity", "Patterns", "Insight"]
    },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center px-8 max-w-5xl w-full">
      {/* Home Icon */}
      <div className="fixed top-8 left-8 z-10">
        <GlowingHomeIcon onClick={onHome} size="md" />
      </div>

      {/* Title */}
      <motion.h1
        className="text-4xl md:text-5xl font-light text-white mb-12 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <EmergingText text="Services" delay={0.3} />
      </motion.h1>

      {/* Service cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {services.map((service, i) => (
          <motion.div
            key={i}
            className="relative p-8 rounded-2xl overflow-hidden group cursor-pointer"
            style={{
              background: "linear-gradient(135deg, rgba(255,140,66,0.05) 0%, rgba(232,74,138,0.05) 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            whileHover={{ 
              scale: 1.02,
              borderColor: "rgba(255,140,66,0.3)",
            }}
          >
            {/* Glow on hover */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(255,140,66,0.15) 0%, transparent 70%)",
              }}
            />
            
            {/* Mini tetrahedron icon */}
            <div className="w-12 h-16 mb-4 opacity-60">
              <svg viewBox="0 0 200 280" className="w-full h-full">
                <polygon points="100,10 40,70 100,120" fill="#FF8C42" opacity="0.8" />
                <polygon points="100,10 160,70 100,120" fill="#E84A8A" opacity="0.8" />
                <polygon points="100,120 30,200 100,270" fill="#4A6AB8" opacity="0.8" />
                <polygon points="100,120 170,200 100,270" fill="#2A4A7A" opacity="0.8" />
              </svg>
            </div>
            
            <h3 className="text-xl font-medium text-white mb-3">{service.title}</h3>
            <p className="text-white/50 text-sm mb-4">{service.desc}</p>
            
            {/* Keywords */}
            <div className="flex flex-wrap gap-2">
              {service.keywords.map((kw, j) => (
                <span 
                  key={j}
                  className="text-xs uppercase tracking-wider text-white/30 px-2 py-1 rounded-full"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  {kw}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

/**
 * ABOUT SCREEN
 */
function AboutScreen({ onHome }: { onHome: () => void }) {
  return (
    <div className="relative flex flex-col items-center justify-center px-8 max-w-3xl text-center">
      {/* Home Icon */}
      <div className="fixed top-8 left-8 z-10">
        <GlowingHomeIcon onClick={onHome} size="md" />
      </div>

      {/* Title */}
      <motion.h1
        className="text-4xl md:text-5xl font-light text-white mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <EmergingText text="About 1-1-1" delay={0.3} />
      </motion.h1>

      {/* Content */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.p
          className="text-xl md:text-2xl font-light text-white/80 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          We believe in the power of{" "}
          <GlowingKeyword text="emergence" className="text-white" glowColor="rgba(255,140,66,0.6)" />
          —where simple rules create extraordinary{" "}
          <GlowingKeyword text="complexity" className="text-white" glowColor="rgba(232,74,138,0.6)" />.
        </motion.p>
        
        <motion.p
          className="text-white/50 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          Like fractals in nature, our approach reveals patterns within patterns,
          unlocking insights that drive transformative growth. We leverage{" "}
          <span className="text-white/70">Cultural Resource Sets</span>,{" "}
          <span className="text-white/70">Approximate Thinking</span>, and{" "}
          <span className="text-white/70">Systems Design</span> to create{" "}
          <span className="text-white/70">Great Work</span>.
        </motion.p>
      </motion.div>

      {/* Decorative tetrahedron */}
      <motion.div
        className="absolute -z-10 opacity-10"
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <DoubleTetrahedron size={400} animated={false} colorMode="bw" glowIntensity={0} />
      </motion.div>
    </div>
  );
}

/**
 * CONTACT SCREEN
 */
function ContactScreen({ onHome }: { onHome: () => void }) {
  return (
    <div className="relative flex flex-col items-center justify-center px-8 max-w-2xl text-center">
      {/* Home Icon */}
      <div className="fixed top-8 left-8 z-10">
        <GlowingHomeIcon onClick={onHome} size="md" />
      </div>

      {/* Title */}
      <motion.h1
        className="text-4xl md:text-5xl font-light text-white mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <EmergingText text="Connect" delay={0.3} />
      </motion.h1>

      {/* Contact info */}
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-white/60 text-lg">
          Ready to explore the possibilities?
        </p>

        {/* Email */}
        <motion.a
          href="mailto:hello@1-1-1.be"
          className="block text-2xl md:text-3xl font-light text-transparent bg-clip-text"
          style={{
            backgroundImage: "linear-gradient(135deg, #FF8C42, #E84A8A, #4A6AB8)",
          }}
          whileHover={{ scale: 1.02 }}
        >
          hello@1-1-1.be
        </motion.a>

        {/* CTA Button */}
        <motion.button
          className="relative px-8 py-4 mt-8 rounded-full overflow-hidden group"
          style={{
            background: "linear-gradient(135deg, rgba(255,140,66,0.15) 0%, rgba(232,74,138,0.15) 100%)",
            border: "1px solid rgba(255,140,66,0.3)",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Button glow */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100"
            style={{
              background: "linear-gradient(135deg, rgba(255,140,66,0.25) 0%, rgba(232,74,138,0.25) 100%)",
            }}
            transition={{ duration: 0.3 }}
          />
          
          <span className="relative z-10 text-white font-medium tracking-wider">
            Start a Conversation →
          </span>
        </motion.button>
      </motion.div>

      {/* Decorative element */}
      <motion.div
        className="absolute bottom-20 opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 0.8 }}
      >
        <DoubleTetrahedron size={80} animated={false} colorMode="full" glowIntensity={0.5} />
      </motion.div>
    </div>
  );
}
