"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import FractalBackground from "@/components/FractalBackground";
import EmergenceLoader from "@/components/EmergenceLoader";
import CentralShape111 from "@/components/CentralShape111";
import { GlowingArrowSet } from "@/components/GlowingArrow";
import GlowingHomeIcon from "@/components/GlowingHomeIcon";
import MatrixTransition, { useMatrixTransition } from "@/components/MatrixTransition";
import ParticleText, { GradientText, TypewriterText, SplitRevealText } from "@/components/ParticleText";
import CursorTrail from "@/components/CursorTrail";

/**
 * 1-1-1 Website Prototype
 * Showcasing: Fractal emergence, glowing navigation, matrix transitions
 * Built to reflect technical sophistication and artistic complexity
 */

type Screen = "home" | "services" | "about" | "contact";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [isNavigating, setIsNavigating] = useState(false);
  const { isTransitioning, transitionColor, triggerTransition, handleComplete } = useMatrixTransition();

  // Skip loader for faster testing - auto-load after mount
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const navigateTo = useCallback((screen: Screen, color: "indigo" | "pink" | "cyan" = "indigo") => {
    if (isNavigating) return;
    
    setIsNavigating(true);
    triggerTransition(color);
    
    // Change screen after transition starts
    setTimeout(() => {
      setCurrentScreen(screen);
      setIsNavigating(false);
    }, 1500);
  }, [isNavigating, triggerTransition]);

  const handleArrowNavigation = (direction: "up" | "down" | "left" | "right") => {
    switch (direction) {
      case "down":
        navigateTo("services", "indigo");
        break;
      case "right":
        navigateTo("about", "pink");
        break;
      case "left":
        navigateTo("contact", "cyan");
        break;
      case "up":
        navigateTo("home", "indigo");
        break;
    }
  };

  const handleHomeClick = () => {
    navigateTo("home", "indigo");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030308]">
      {/* Fractal Background - always present */}
      <FractalBackground />
      
      {/* Cursor Trail Effect */}
      <CursorTrail enabled={isLoaded} />
      
      {/* Skip loader for testing - just show content immediately */}
      {/* <EmergenceLoader 
        onComplete={() => setIsLoaded(true)} 
        duration={2500}
      /> */}
      
      {/* Matrix Transition Effect */}
      <MatrixTransition 
        isActive={isTransitioning} 
        onComplete={handleComplete}
        color={transitionColor}
      />

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {isLoaded && (
          <motion.div
            key={currentScreen}
            className="fixed inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* HOME SCREEN */}
            {currentScreen === "home" && (
              <HomeScreen onNavigate={handleArrowNavigation} />
            )}

            {/* SERVICES SCREEN */}
            {currentScreen === "services" && (
              <ServicesScreen onHome={handleHomeClick} />
            )}

            {/* ABOUT SCREEN */}
            {currentScreen === "about" && (
              <AboutScreen onHome={handleHomeClick} />
            )}

            {/* CONTACT SCREEN */}
            {currentScreen === "contact" && (
              <ContactScreen onHome={handleHomeClick} />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation arrows - context aware */}
      {isLoaded && currentScreen === "home" && !isNavigating && (
        <GlowingArrowSet
          onNavigate={handleArrowNavigation}
          showDown={true}
          showLeft={true}
          showRight={true}
          showUp={false}
        />
      )}
    </main>
  );
}

/**
 * HOME SCREEN - The main landing with central shape
 */
function HomeScreen({ onNavigate }: { onNavigate: (dir: "up" | "down" | "left" | "right") => void }) {
  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Tagline above */}
      <motion.div
        className="absolute -top-32 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <TypewriterText
          text="Advisory & Innovation"
          className="text-sm md:text-base uppercase tracking-[0.4em] text-white/50"
          speed={80}
          delay={500}
        />
      </motion.div>

      {/* Central Shape with integrated arrows */}
      <CentralShape111
        size="lg"
        animated={true}
        showArrows={true}
        onArrowClick={onNavigate}
      />

      {/* Tagline below */}
      <motion.div
        className="absolute -bottom-24 text-center max-w-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <p className="text-white/40 text-sm tracking-wider">
          Where <GradientText>complexity</GradientText> meets <GradientText>clarity</GradientText>
        </p>
      </motion.div>

      {/* Corner decorations */}
      <motion.div
        className="absolute top-8 left-8 text-white/20 text-xs tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        EMERGENCE
      </motion.div>
      <motion.div
        className="absolute top-8 right-8 text-white/20 text-xs tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        FRACTALS
      </motion.div>
      <motion.div
        className="absolute bottom-8 left-8 text-white/20 text-xs tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        COMPLEXITY
      </motion.div>
      <motion.div
        className="absolute bottom-8 right-8 text-white/20 text-xs tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        INNOVATION
      </motion.div>
    </div>
  );
}

/**
 * SERVICES SCREEN
 */
function ServicesScreen({ onHome }: { onHome: () => void }) {
  return (
    <div className="relative flex flex-col items-center justify-center px-8 max-w-4xl">
      {/* Home Icon */}
      <div className="fixed top-8 left-8">
        <GlowingHomeIcon onClick={onHome} size="md" />
      </div>

      {/* Title */}
      <ParticleText
        text="Services"
        variant="assemble"
        size="2xl"
        className="mb-8"
      />

      {/* Service cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        {[
          { title: "Strategy", desc: "Navigate complexity with clarity", icon: "◇" },
          { title: "Innovation", desc: "Transform ideas into reality", icon: "△" },
          { title: "Advisory", desc: "Expert guidance for growth", icon: "○" },
        ].map((service, i) => (
          <motion.div
            key={i}
            className="relative p-6 rounded-2xl overflow-hidden group cursor-pointer"
            style={{
              background: "linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(236,72,153,0.1) 100%)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.1 }}
            whileHover={{ 
              scale: 1.02,
              borderColor: "rgba(255,255,255,0.3)",
            }}
          >
            {/* Glow on hover */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(99,102,241,0.2) 0%, transparent 70%)",
              }}
            />
            
            <span className="text-3xl mb-4 block">{service.icon}</span>
            <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
            <p className="text-white/50 text-sm">{service.desc}</p>
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
      <div className="fixed top-8 left-8">
        <GlowingHomeIcon onClick={onHome} size="md" />
      </div>

      {/* Title */}
      <ParticleText
        text="About"
        variant="gradient"
        size="2xl"
        className="mb-6"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="space-y-6"
      >
        <SplitRevealText
          text="We believe in the power of emergence—"
          className="text-2xl md:text-3xl font-light text-white"
          delay={0.3}
        />
        <SplitRevealText
          text="where simple rules create extraordinary complexity."
          className="text-2xl md:text-3xl font-light text-white/80"
          delay={0.5}
        />
        
        <motion.p
          className="text-white/50 mt-8 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          Like fractals in nature, our approach reveals patterns within patterns,
          unlocking insights that drive transformative growth. We see the connections
          others miss and help you harness the power of complexity.
        </motion.p>
      </motion.div>

      {/* Decorative fractal element */}
      <motion.div
        className="absolute -z-10 opacity-20"
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <svg width="400" height="400" viewBox="0 0 400 400">
          <polygon
            points="200,50 300,150 300,250 200,350 100,250 100,150"
            fill="none"
            stroke="url(#aboutGradient)"
            strokeWidth="1"
          />
          <defs>
            <linearGradient id="aboutGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
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
      <div className="fixed top-8 left-8">
        <GlowingHomeIcon onClick={onHome} size="md" />
      </div>

      {/* Title */}
      <ParticleText
        text="Connect"
        variant="wave"
        size="2xl"
        className="mb-8"
      />

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
          className="block text-2xl md:text-3xl font-light"
          whileHover={{ scale: 1.02 }}
        >
          <GradientText gradient="from-indigo-400 via-pink-400 to-cyan-400">
            hello@1-1-1.be
          </GradientText>
        </motion.a>

        {/* CTA Button */}
        <motion.button
          className="relative px-8 py-4 mt-8 rounded-full overflow-hidden group"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(236,72,153,0.2) 100%)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Button glow */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100"
            style={{
              background: "linear-gradient(135deg, rgba(99,102,241,0.3) 0%, rgba(236,72,153,0.3) 100%)",
            }}
            transition={{ duration: 0.3 }}
          />
          
          <span className="relative z-10 text-white font-medium tracking-wider">
            Start a Conversation →
          </span>
        </motion.button>
      </motion.div>

      {/* Social links placeholder */}
      <motion.div
        className="flex gap-6 mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {["LinkedIn", "Twitter", "Instagram"].map((social, i) => (
          <motion.a
            key={i}
            href="#"
            className="text-white/40 text-sm hover:text-white/80 transition-colors tracking-wider"
            whileHover={{ y: -2 }}
          >
            {social}
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
