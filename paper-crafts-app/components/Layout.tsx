'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

const Sparkle: React.FC<{ delay: number; duration: number }> = ({ delay, duration }) => (
  <motion.div
    className="sparkle"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 1, 0],
      scale: [0, 1.2, 0],
    }}
    transition={{
      duration: duration,
      delay: delay,
      repeat: Infinity,
      repeatDelay: Math.random() * 3,
    }}
  />
);

const FloatingHeart: React.FC<{ delay: number; duration: number }> = ({ delay, duration }) => (
  <motion.div
    className="floating-heart text-2xl"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
    initial={{ opacity: 0, y: 0 }}
    animate={{ 
      opacity: [0, 1, 0],
      y: [-20, -40, -60],
    }}
    transition={{
      duration: duration,
      delay: delay,
      repeat: Infinity,
      repeatDelay: Math.random() * 5,
    }}
  >
    💖
  </motion.div>
);

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sparkles, setSparkles] = useState<Array<{ id: string; delay: number; duration: number }>>([]);
  const [hearts, setHearts] = useState<Array<{ id: string; delay: number; duration: number }>>([]);

  useEffect(() => {
    // Create sparkles
    const sparkleArray = Array.from({ length: 15 }, (_, i) => ({
      id: `sparkle-${i}`,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
    }));
    setSparkles(sparkleArray);

    // Create floating hearts
    const heartArray = Array.from({ length: 8 }, (_, i) => ({
      id: `heart-${i}`,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2,
    }));
    setHearts(heartArray);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Magical background with floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {sparkles.map((sparkle) => (
          <Sparkle
            key={`layout-sparkle-${sparkle.id}`}
            delay={sparkle.delay}
            duration={sparkle.duration}
          />
        ))}
        {hearts.map((heart) => (
          <FloatingHeart
            key={`layout-heart-${heart.id}`}
            delay={heart.delay}
            duration={heart.duration}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Magical border decoration */}
      <div className="fixed top-0 left-0 w-full h-2 bg-gradient-to-r from-magical-pink via-magical-purple to-magical-blue"></div>
      <div className="fixed bottom-0 left-0 w-full h-2 bg-gradient-to-r from-magical-blue via-magical-purple to-magical-pink"></div>
    </div>
  );
};

export default Layout;

