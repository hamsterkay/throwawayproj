'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CraftTypeSelectorProps {
  onSelectType: (type: string) => void;
  onSkip: () => void;
}

const craftTypes = [
  { id: 'coloring', name: 'Coloring Page', emoji: '🎨', description: 'Beautiful designs to color with crayons' },
  { id: 'cutout', name: 'Cut Out', emoji: '✂️', description: '3D paper crafts to cut and assemble' },
  { id: 'paperdoll', name: 'Paper Doll', emoji: '👗', description: 'Cute dolls with clothes to dress up' },
  { id: 'colorbynumber', name: 'Color by Number', emoji: '🔢', description: 'Follow numbers to create art' },
  { id: 'origami', name: 'Origami', emoji: '🦋', description: 'Fold paper into beautiful shapes' },
  { id: 'maze', name: 'Maze', emoji: '🧩', description: 'Fun puzzles to solve and explore' },
];

export default function CraftTypeSelector({ onSelectType, onSkip }: CraftTypeSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto text-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-6xl mb-6"
      >
        ✨
      </motion.div>
      
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-4xl font-bold text-magical-purple mb-4"
      >
        What kind of craft would you like?
      </motion.h2>
      
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="text-xl text-gray-600 mb-8"
      >
        Choose a type to help the fairy godmother create the perfect craft for you!
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {craftTypes.map((craft, index) => (
          <motion.button
            key={`craft-type-${index}-${craft.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
            onClick={() => onSelectType(craft.id)}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-magical-pink/30 group"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
              {craft.emoji}
            </div>
            <h3 className="text-xl font-bold text-magical-purple mb-2">
              {craft.name}
            </h3>
            <p className="text-gray-600 text-sm">
              {craft.description}
            </p>
          </motion.button>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        onClick={onSkip}
        className="text-magical-pink hover:text-magical-purple font-semibold text-lg underline decoration-2 underline-offset-4 hover:decoration-magical-purple transition-all duration-300"
      >
        Or let the fairy godmother surprise you! ✨
      </motion.button>
    </motion.div>
  );
}
