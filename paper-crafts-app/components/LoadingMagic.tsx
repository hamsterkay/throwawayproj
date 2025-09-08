'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingMagicProps {
  onComplete?: () => void;
  duration?: number;
  isComplete?: boolean;
}

const LoadingMagic: React.FC<LoadingMagicProps> = ({ 
  onComplete, 
  duration = 12000, // 12 seconds default
  isComplete = false
}) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [progress, setProgress] = useState(0);

  const messages = [
    "🪄 Gathering magical sparkles...",
    "✨ Adding extra fairy dust...",
    "💖 Making it perfect for you, Princess!",
    "🌟 Almost ready, Stinker Bell!",
    "🎨 Adding beautiful colors...",
    "🦄 Creating something amazing...",
    "💫 Just a few more sparkles...",
    "🎭 Making it extra special...",
  ];

  useEffect(() => {
    // Rotate messages every 1.5 seconds
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 1500);

    // Update progress gradually
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / (duration / 100));
        if (newProgress >= 100) {
          return 100;
        }
        return newProgress;
      });
    }, 100);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [duration]);

  // Handle external completion
  useEffect(() => {
    if (isComplete) {
      setProgress(100);
      // Small delay to show 100% before completing
      setTimeout(() => {
        onComplete?.();
      }, 500);
    }
  }, [isComplete, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, rgba(255, 105, 180, 0.2) 0%, rgba(221, 160, 221, 0.2) 50%, rgba(135, 206, 235, 0.2) 100%)'
      }}
    >
      <div 
        className="bg-white/95 backdrop-blur-md rounded-3xl p-12 shadow-2xl border-2 w-96 h-80 mx-4 text-center flex flex-col justify-center"
        style={{ borderColor: 'rgba(255, 105, 180, 0.3)' }}
      >
        {/* Spinning Wand Animation */}
        <motion.div
          className="mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="text-6xl">🪄</div>
        </motion.div>

        {/* Rotating Messages */}
        <motion.div
          key={`message-${currentMessage}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-8 h-16 flex items-center justify-center px-4"
          style={{ color: 'var(--color-magical-pink)' }}
        >
          <div className="text-center leading-tight">
            {messages[currentMessage]}
          </div>
        </motion.div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-6 mb-6 overflow-hidden">
          <motion.div
            className="h-full rounded-full relative"
            style={{
              background: 'linear-gradient(to right, var(--color-magical-pink), var(--color-magical-purple), var(--color-magical-blue))'
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          >
            {/* Sparkle effect on progress bar */}
            <motion.div
              className="absolute inset-0 bg-white/30"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>

        {/* Progress Percentage */}
        <div className="text-lg font-semibold text-gray-700">
          {Math.round(progress)}% Complete
        </div>

        {/* Floating Sparkles around the loading area */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`loading-sparkle-${i}`}
              className="absolute text-2xl"
              style={{
                left: `${20 + (i * 10)}%`,
                top: `${20 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [-10, -20, -10],
                opacity: [0.5, 1, 0.5],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2 + Math.random(),
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingMagic;

