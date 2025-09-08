'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypingAreaProps {
  onValidInput: (text: string) => void;
  isLoading?: boolean;
}

const TypingArea: React.FC<TypingAreaProps> = ({ onValidInput, isLoading = false }) => {
  const [inputText, setInputText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [idleTimer, setIdleTimer] = useState<NodeJS.Timeout | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Comprehensive list of filler words and common words to exclude
  const fillerWords = [
    'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
    'hi', 'hello', 'hey', 'bro', 'dude', 'man', 'yeah', 'yes', 'no', 'ok', 'okay', 'sure',
    'like', 'um', 'uh', 'er', 'ah', 'oh', 'well', 'so', 'then', 'now', 'here', 'there',
    'this', 'that', 'these', 'those', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'can',
    'may', 'might', 'must', 'shall', 'very', 'really', 'just', 'only', 'also', 'too',
    'more', 'most', 'some', 'any', 'all', 'every', 'each', 'both', 'either', 'neither',
    'please', 'thanks', 'thank', 'you', 'me', 'my', 'your', 'his', 'her', 'its', 'our', 'their'
  ];
  
  // Check for repeated words
  const hasRepeatedWords = (words: string[]): boolean => {
    const wordCounts: { [key: string]: number } = {};
    for (const word of words) {
      const lowerWord = word.toLowerCase();
      wordCounts[lowerWord] = (wordCounts[lowerWord] || 0) + 1;
      if (wordCounts[lowerWord] > 1) {
        return true;
      }
    }
    return false;
  };
  
  // Check for excessive filler words
  const hasExcessiveFillerWords = (words: string[]): boolean => {
    const fillerCount = words.filter(word => 
      fillerWords.includes(word.toLowerCase())
    ).length;
    return fillerCount > words.length * 0.5; // More than 50% filler words
  };
  
  useEffect(() => {
    const words = inputText.trim().split(/\s+/).filter(word => 
      word.length > 0 && !fillerWords.includes(word.toLowerCase())
    );
    const allWords = inputText.trim().split(/\s+/).filter(word => word.length > 0);
    
    const count = words.length;
    const hasRepeats = hasRepeatedWords(allWords);
    const hasExcessiveFiller = hasExcessiveFillerWords(allWords);
    
    setWordCount(count);
    setIsValid(count >= 3 && !hasRepeats && !hasExcessiveFiller);
  }, [inputText]);

  // Load AI suggestions on component mount
  useEffect(() => {
    const loadSuggestions = async () => {
      try {
        const response = await fetch('/api/suggestions');
        const data = await response.json();
        setSuggestions(data.suggestions);
      } catch (error) {
        console.error('Error loading suggestions:', error);
        // Fallback to static suggestions
        setSuggestions(['magical unicorn castle', 'cute robot friend', 'pink princess garden']);
      }
    };

    loadSuggestions();
  }, []);

  // Idle timer for showing tips
  useEffect(() => {
    // Clear existing timer
    if (idleTimer) {
      clearTimeout(idleTimer);
    }

    // Set new timer for 5 seconds
    const timer = setTimeout(() => {
      setShowTips(true);
    }, 5000);

    setIdleTimer(timer);

    // Cleanup on unmount
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [inputText]); // Reset timer when user types

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid && !isLoading) {
      onValidInput(inputText);
    }
  };

  const getEncouragementMessage = () => {
    const allWords = inputText.trim().split(/\s+/).filter(word => word.length > 0);
    const hasRepeats = hasRepeatedWords(allWords);
    const hasExcessiveFiller = hasExcessiveFillerWords(allWords);
    
    if (wordCount === 0) {
      return "";
    } else if (hasRepeats) {
      return "Oops! Please avoid repeating the same word multiple times! Try different words! 🌟";
    } else if (hasExcessiveFiller) {
      return "Try using more descriptive words instead of filler words like 'hi', 'bro', 'like'! 💫";
    } else if (wordCount < 3) {
      return `Keep going, Princess! You need ${3 - wordCount} more meaningful words! 💖`;
    } else {
      return "Perfect! Your fairy godmother is ready to create magic! 🪄";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl mx-auto p-6"
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-magical-pink/30">
        {/* Title and Word Counter Display */}
        <motion.div
          className="text-center mb-6"
          animate={{ scale: isValid ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-3xl font-bold text-magical-pink mb-4">
            What are we crafting today? ✨
          </div>
          <div className="text-2xl font-bold text-magical-purple mb-2">
            {wordCount}/3 words
          </div>
          <div className="text-lg text-gray-700">
            {getEncouragementMessage()}
          </div>
        </motion.div>

        {/* Text Input Area */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type at least 3 words to make something magical"
              className="magical-input"
              rows={4}
              maxLength={500}
              disabled={isLoading}
            />
            <div className="absolute bottom-2 right-2 text-sm text-gray-500">
              {inputText.length}/500
            </div>
          </div>


          {/* Submit Button - Now acts as progress bar when filling up */}
          <motion.button
            type="submit"
            disabled={!isValid || isLoading}
            className={`w-full py-4 px-8 rounded-2xl font-bold text-xl transition-all duration-300 ${
              isValid && !isLoading 
                ? 'bg-gradient-to-r from-magical-pink to-magical-purple text-white shadow-lg hover:shadow-xl animate-pulse-glow' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            whileHover={isValid && !isLoading ? { scale: 1.02 } : {}}
            whileTap={isValid && !isLoading ? { scale: 0.98 } : {}}
            style={{
              background: !isValid && !isLoading 
                ? `linear-gradient(to right, #e5e7eb ${Math.min((wordCount / 3) * 100, 100)}%, #d1d5db 0%)`
                : undefined
            }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Creating Magic...</span>
              </div>
            ) : (
              <>
                ✨ Choose Craft Type! ✨
              </>
            )}
          </motion.button>
        </form>

        {/* Tips - Only show after 5 seconds of idle time */}
        {showTips && suggestions.length > 0 && (
          <motion.div
            className="mt-6 text-center text-sm text-gray-600"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p>💡 Try: "{suggestions[0]}" or "{suggestions[1]}" or "{suggestions[2]}"</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default TypingArea;

