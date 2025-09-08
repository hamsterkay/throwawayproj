'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CraftDisplayProps {
  craftImage: string;
  craftTitle: string;
  craftType?: string;
  onMakeAnother: () => void;
  onSaveToCollection: () => void;
}

export default function CraftDisplay({
  craftImage,
  craftTitle,
  craftType,
  onMakeAnother,
  onSaveToCollection,
}: CraftDisplayProps) {
  const getInstructionsForCraftType = (type: string | undefined, title: string) => {
    const craftTitleLower = title.toLowerCase();
    
    switch (type) {
      case 'coloring':
        return `Grab your favorite crayons, markers, or colored pencils! Start by coloring the large areas first, then add details. Don't worry about staying inside the lines perfectly - your creativity makes it magical! Take your time and enjoy bringing this ${craftTitleLower} to life with beautiful colors! ✨`;
      
      case 'cutout':
        return `Carefully cut along the solid lines with grown-up scissors! Look for the dotted lines - those are where you'll fold. Cut out all the pieces first, then follow the numbers to assemble your 3D ${craftTitleLower}. Use glue or tape to secure the tabs. Be gentle and patient - 3D magic takes time! 🪄`;
      
      case 'paperdoll':
        return `Cut out the doll and all the clothing pieces carefully! The small tabs on the clothes help them stay on the doll. You can mix and match different outfits to create new looks. Try cutting out extra clothes from other paper to expand your wardrobe! Your ${craftTitleLower} is ready for endless fashion adventures! 👗`;
      
      case 'colorbynumber':
        return `Look at the numbers in each section and match them to the color guide! Start with the largest numbered areas first, then fill in the smaller details. Take your time - there's no rush! When you're done, you'll have a beautiful ${craftTitleLower} that looks like a professional artist created it! 🔢`;
      
      case 'origami':
        return `Follow the folding lines carefully! Mountain folds (dotted lines) fold away from you, and valley folds (dash-dot lines) fold toward you. Start with the first step and work your way through each fold. Don't worry if it's not perfect the first time - origami is an art that takes practice! Your ${craftTitleLower} will be worth the effort! 🦋`;
      
      case 'maze':
        return `Find the start point and trace your way through the maze to reach the finish! Use a pencil so you can erase if you get stuck. Take your time and look ahead to plan your path. There's always a way through - just like in real life! Your ${craftTitleLower} adventure awaits! 🧩`;
      
      default:
        return `Follow the magical steps above to create your very own ${craftTitleLower}! Remember to be patient and gentle with the paper - magic takes time! ✨`;
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl mx-auto text-center px-6"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-6xl mb-6"
      >
        🎉✨
      </motion.div>

      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-4xl font-bold mb-4"
        style={{ color: 'var(--color-magical-purple)' }}
      >
        Your Magical Craft is Ready!
      </motion.h2>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl mb-8 border-2"
        style={{ borderColor: 'rgba(255, 105, 180, 0.2)' }}
      >
        <div className="mb-6">
          <div className="w-full max-w-sm mx-auto">
            <img
              src={craftImage}
              alt={craftTitle}
              className="w-full rounded-2xl shadow-lg"
              style={{ aspectRatio: '8.5/11' }}
              onError={(e) => {
                // Fallback if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = document.createElement('div');
                fallback.className = 'w-full rounded-2xl flex items-center justify-center text-6xl';
                fallback.style.background = 'linear-gradient(135deg, rgba(255, 105, 180, 0.2) 0%, rgba(221, 160, 221, 0.2) 100%)';
                fallback.style.aspectRatio = '8.5/11';
                fallback.textContent = '🎨';
                target.parentNode?.insertBefore(fallback, target);
              }}
            />
          </div>
        </div>

        <h3 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-magical-purple)' }}>
          {craftTitle}
        </h3>

        {craftType && (
          <p className="text-lg text-gray-600 mb-6">
            Type: <span className="font-semibold capitalize" style={{ color: 'var(--color-magical-pink)' }}>{craftType}</span>
          </p>
        )}

        <div className="rounded-2xl p-6 mb-6" style={{ backgroundColor: 'rgba(255, 105, 180, 0.1)' }}>
          <h4 className="text-xl font-bold mb-3" style={{ color: 'var(--color-magical-purple)' }}>
            🧚‍♀️ Fairy Godmother's Instructions:
          </h4>
          <p className="text-gray-700 leading-relaxed">
            {getInstructionsForCraftType(craftType, craftTitle)}
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <motion.button
          onClick={onMakeAnother}
          className="magical-button text-xl py-4 px-8"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ✨ Make Another Craft! ✨
        </motion.button>

        <motion.button
          onClick={onSaveToCollection}
          className="font-bold text-xl py-4 px-8 rounded-2xl transition-all duration-300 border-2"
          style={{ 
            backgroundColor: 'rgba(221, 160, 221, 0.2)',
            color: 'var(--color-magical-purple)',
            borderColor: 'rgba(221, 160, 221, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(221, 160, 221, 0.3)';
            e.currentTarget.style.borderColor = 'rgba(221, 160, 221, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(221, 160, 221, 0.2)';
            e.currentTarget.style.borderColor = 'rgba(221, 160, 221, 0.3)';
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          💖 Save to Collection
        </motion.button>
      </motion.div>

    </motion.div>
  );
  }
