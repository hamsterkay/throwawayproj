'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import TypingArea from '../components/TypingArea';
import CraftTypeSelector from '../components/CraftTypeSelector';
import LoadingMagic from '../components/LoadingMagic';
import CraftDisplay from '../components/CraftDisplay';
import Collection from '../components/Collection';
import { useCraftStore } from '../store/useCraftStore';
// Calls now go through API routes to keep keys safe

type AppState = 'welcome' | 'typing' | 'craft-selection' | 'generating' | 'display' | 'collection';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [showConfetti, setShowConfetti] = useState(false);
  const [emojiBursts, setEmojiBursts] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [confettiKey, setConfettiKey] = useState(0);
  
  const {
    currentInput,
    selectedCraftType,
    isGenerating,
    currentCraft,
    crafts,
    totalWordsTyped,
    totalCraftsCreated,
    setCurrentInput,
    setSelectedCraftType,
    setIsGenerating,
    setCurrentCraft,
    addCraft,
    updateWordCount,
    addMilestone,
    reset,
  } = useCraftStore();

  // Check for milestones
  useEffect(() => {
    if (totalWordsTyped >= 50 && !useCraftStore.getState().milestones.includes('50_words')) {
      addMilestone('50_words');
      setConfettiKey(prev => prev + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
    if (totalCraftsCreated >= 5 && !useCraftStore.getState().milestones.includes('5_crafts')) {
      addMilestone('5_crafts');
      setConfettiKey(prev => prev + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [totalWordsTyped, totalCraftsCreated, addMilestone]);

  // Handle emoji burst on click/tap (only on empty areas)
  const handleScreenClick = (e: React.MouseEvent) => {
    // Prevent event bubbling
    e.stopPropagation();
    
    // Don't trigger on interactive elements
    const target = e.target as HTMLElement;
    if (target.tagName === 'BUTTON' || 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('[role="button"]')) {
      return;
    }
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newBurst = {
      id: Math.floor(Date.now() + Math.random() * 1000),
      x: x,
      y: y
    };
    
    setEmojiBursts(prev => [...prev, newBurst]);
    
    // Remove burst after animation
    setTimeout(() => {
      setEmojiBursts(prev => prev.filter(burst => burst.id !== newBurst.id));
    }, 2000);
  };

  const handleValidInput = async (input: string) => {
    setCurrentInput(input);
    
    // Check if input is simple (just a noun/object) - show craft type selector
    const words = input.trim().split(/\s+/);
    if (words.length <= 4 && !input.includes('craft') && !input.includes('make')) {
      setAppState('craft-selection');
    } else {
      // Skip to generation for specific requests
      await handleGenerateCraft(input, null);
    }
  };

  const handleCraftTypeSelection = async (type: string) => {
    setSelectedCraftType(type);
    await handleGenerateCraft(currentInput, type);
  };

  const handleSkipCraftType = async () => {
    await handleGenerateCraft(currentInput, null);
  };

  const handleGenerateCraft = async (input: string, craftType: string | null) => {
    try {
      // Validate content safety via API
      const validateRes = await fetch('/api/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }),
      });
      const { safe } = await validateRes.json();
      if (!safe) {
        alert('The fairy godmother thinks this might not be quite right for crafting. Try something else magical! ✨');
        return;
      }

      setIsGenerating(true);
      setAppState('generating');
      
      // Count words for milestone tracking
      const wordCount = input.trim().split(/\s+/).length;
      updateWordCount(wordCount);

      // Generate craft via API
      const genRes = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input, craftType }),
      });
      if (!genRes.ok) throw new Error('generation_failed');
      const result = await genRes.json();
      
      const newCraft = {
        id: Date.now().toString(),
        title: result.title,
        imageUrl: result.imageUrl,
        craftType: craftType || undefined,
        createdAt: new Date(),
        wordCount: wordCount,
      };

      setCurrentCraft(newCraft);
      addCraft(newCraft);
      
      // Only transition to display after API is complete
      setAppState('display');
      
    } catch (error) {
      console.error('Error generating craft:', error);
      alert('Oops! The fairy godmother needs a moment to gather more sparkles. Please try again! ✨');
      setAppState('typing');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleMakeAnother = () => {
    reset();
    setAppState('typing');
  };

  const handleSaveToCollection = async () => {
    if (!currentCraft) return;
    
    try {
      const response = await fetch('/api/collection/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: currentCraft.title,
          imageUrl: currentCraft.imageUrl,
          craftType: currentCraft.craftType,
          userInput: currentInput,
          wordCount: currentCraft.wordCount,
        }),
      });
      
      const data = await response.json();
      
      if (data.error) {
        alert(`Oops! ${data.error}`);
      } else {
        alert(data.message);
        // Add to local store as well
        addCraft(currentCraft);
      }
    } catch (err) {
      alert('The fairy godmother needs a moment to organize your collection. Please try again! ✨');
    }
  };

  const renderWelcomeScreen = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex items-center justify-center p-6"
    >
      <div className="text-center max-w-2xl">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-8xl mb-8"
        >
          🧚‍♀️✨
        </motion.div>
        
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-5xl font-bold text-magical-pink mb-6"
        >
          Hello, Princess Bella!
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-2xl text-gray-700 mb-8 leading-relaxed"
        >
          Your Fairy Godmother is here to help you create magical paper crafts! 
          Just type what you want to make, and I'll create something amazing for you! ✨
        </motion.p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            onClick={() => setAppState('typing')}
            className="magical-button text-2xl py-6 px-12"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ✨ Start Creating Magic! ✨
          </motion.button>
          
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            onClick={() => setAppState('collection')}
            className="bg-white/80 backdrop-blur-sm text-magical-purple text-xl py-6 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-magical-purple/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            📚 View Collection
          </motion.button>
        </div>

        {/* Stats Display */}
        {(totalWordsTyped > 0 || totalCraftsCreated > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-bold text-magical-purple mb-4">Your Magical Progress! 🌟</h3>
            <div className="grid grid-cols-2 gap-4 text-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-magical-pink">{totalWordsTyped}</div>
                <div className="text-gray-600">Words Typed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-magical-purple">{totalCraftsCreated}</div>
                <div className="text-gray-600">Crafts Created</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );

  return (
    <Layout>
      <div className="relative min-h-screen">
        <AnimatePresence>
          {showConfetti && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 pointer-events-none z-50"
            >
              {Array.from({ length: 50 }).map((_, i) => (
                <motion.div
                  key={`confetti-${confettiKey}-${i}`}
                  className="absolute text-2xl"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [-20, -100],
                    opacity: [1, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.1,
                  }}
                >
                  {['🎉', '✨', '💖', '🌟', '🎊'][Math.floor(Math.random() * 5)]}
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Emoji Bursts on Click */}
          {emojiBursts.map((burst) => (
            <motion.div
              key={`burst-${burst.id}-${burst.x}-${burst.y}`}
              className="absolute pointer-events-none z-40"
              style={{
                left: burst.x,
                top: burst.y,
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ 
                scale: [0, 1.5, 0],
                opacity: [1, 1, 0],
                y: [0, -50, -100],
              }}
              transition={{ duration: 2, ease: "easeOut" }}
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={`burst-${burst.id}-emoji-${i}`}
                  className="absolute text-2xl"
                  style={{
                    left: Math.cos((i * Math.PI * 2) / 8) * 30,
                    top: Math.sin((i * Math.PI * 2) / 8) * 30,
                  }}
                  animate={{
                    x: [0, Math.cos((i * Math.PI * 2) / 8) * 100],
                    y: [0, Math.sin((i * Math.PI * 2) / 8) * 100],
                    opacity: [1, 0],
                    scale: [1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.1,
                    ease: "easeOut"
                  }}
                >
                  {['✨', '💖', '🌟', '🦄', '🎨', '💫', '🪄', '🎭'][i]}
                </motion.div>
              ))}
            </motion.div>
          ))}

          {/* Invisible clickable areas for emoji bursts */}
          <div 
            className="fixed inset-0 pointer-events-auto z-10"
            onClick={handleScreenClick}
            style={{ background: 'transparent' }}
          />

          {appState === 'welcome' && (
            <div className="relative z-20">
              {renderWelcomeScreen()}
            </div>
          )}
          
          {appState === 'typing' && (
            <div className="min-h-screen flex items-center justify-center p-6 relative z-20">
              <TypingArea onValidInput={handleValidInput} isLoading={isGenerating} />
            </div>
          )}
          
          {appState === 'craft-selection' && (
            <div className="min-h-screen flex items-center justify-center p-6 relative z-20">
              <CraftTypeSelector
                onSelectType={handleCraftTypeSelection}
                onSkip={handleSkipCraftType}
              />
            </div>
          )}
          
          {appState === 'generating' && (
            <div className="relative z-20">
              <LoadingMagic
                onComplete={() => setAppState('display')}
                duration={12000}
                isComplete={!isGenerating}
              />
            </div>
          )}
          
          {appState === 'display' && currentCraft && (
            <div className="min-h-screen py-12 relative z-20">
              <CraftDisplay
                craftImage={currentCraft.imageUrl}
                craftTitle={currentCraft.title}
                craftType={currentCraft.craftType}
                onMakeAnother={handleMakeAnother}
                onSaveToCollection={handleSaveToCollection}
              />
            </div>
          )}
          
          {appState === 'collection' && (
            <div className="relative z-20">
              <Collection onBack={() => setAppState('welcome')} />
            </div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}