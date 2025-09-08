'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CraftRecord, CollectionStats } from '../lib/supabase';

interface CollectionProps {
  onBack: () => void;
}

function Collection({ onBack }: CollectionProps) {
  const [crafts, setCrafts] = useState<CraftRecord[]>([]);
  const [stats, setStats] = useState<CollectionStats>({
    total_crafts: 0,
    total_words: 0,
    crafts_by_type: {}
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCollection();
  }, []);

  const fetchCollection = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/collection/fetch');
      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
      } else {
        setCrafts(data.crafts);
        setStats(data.stats);
      }
    } catch (err) {
      setError('Failed to load collection');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-magical-pink/20 via-magical-purple/20 to-magical-blue/20 flex items-center justify-center"
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-magical-pink mx-auto mb-4"></div>
          <p className="text-magical-pink text-lg">Loading your magical collection...</p>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-magical-pink/20 via-magical-purple/20 to-magical-blue/20 flex items-center justify-center"
      >
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button
            onClick={fetchCollection}
            className="magical-button"
          >
            Try Again ✨
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-magical-pink/20 via-magical-purple/20 to-magical-blue/20 p-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-magical-pink mb-2">
            Princess Bella's Collection ✨
          </h1>
          <p className="text-gray-600 mb-4">
            {stats.total_crafts} magical crafts • {stats.total_words} words of creativity
          </p>
          <button
            onClick={onBack}
            className="magical-button"
          >
            ← Back to Creating
          </button>
        </motion.div>

        {/* Stats */}
        {stats.total_crafts > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg"
          >
            <h2 className="text-xl font-bold text-magical-purple mb-4">Your Creative Journey 📊</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-magical-pink">{stats.total_crafts}</div>
                <div className="text-sm text-gray-600">Crafts Created</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-magical-purple">{stats.total_words}</div>
                <div className="text-sm text-gray-600">Words Typed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-magical-blue">
                  {Object.keys(stats.crafts_by_type).length}
                </div>
                <div className="text-sm text-gray-600">Craft Types</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Crafts Grid */}
        {crafts.length === 0 ? (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🎨</div>
            <h2 className="text-2xl font-bold text-magical-pink mb-2">
              Your Collection is Empty
            </h2>
            <p className="text-gray-600 mb-6">
              Start creating magical crafts to build your collection!
            </p>
            <button
              onClick={onBack}
              className="magical-button"
            >
              Create Your First Craft ✨
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {crafts.map((craft, index) => (
              <motion.div
                key={`collection-craft-${index}-${craft.id || 'no-id'}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-square mb-4 rounded-xl overflow-hidden">
                  <img
                    src={craft.image_url}
                    alt={craft.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-magical-pink mb-2">
                  {craft.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  "{craft.user_input}"
                </p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>
                    {craft.craft_type ? craft.craft_type.replace('-', ' ') : 'General'}
                  </span>
                  <span>{formatDate(craft.created_at)}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default Collection;
