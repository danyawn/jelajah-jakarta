'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { UtensilsCrossed, Star, MapPin, Clock, Users, ChefHat } from 'lucide-react';
import { useSound } from '@/hooks/useSound';
import clsx from 'clsx';

export const KulinerPage: React.FC = () => {
  const [selectedDish, setSelectedDish] = useState(0);
  const { playCardHover, playClick } = useSound();
  const dishes = [
    {
      name: 'Kerak Telor',
      description: 'Traditional Betawi egg dish with sticky rice and coconut',
      image: '/images/kuliner-jakarta-1.jpg',
      rating: 4.8,
      price: 'Rp 15K',
      location: 'Kota Tua',
      popularity: 'Very Popular'
    },
    {
      name: 'Soto Betawi',
      description: 'Rich beef soup with coconut milk and spices',
      image: '/images/kuliner-jakarta-2.jpeg',
      rating: 4.6,
      price: 'Rp 25K',
      location: 'Central Jakarta',
      popularity: 'Local Favorite'
    },
    {
      name: 'Nasi Uduk',
      description: 'Coconut rice with various side dishes',
      image: '/images/kuliner-jakarta-3.jpg',
      rating: 4.5,
      price: 'Rp 20K',
      location: 'Throughout Jakarta',
      popularity: 'Daily Staple'
    },
    {
      name: 'Asinan Betawi',
      description: 'Fresh fruit and vegetable salad with peanut sauce',
      image: '/images/kuliner-jakarta-4.webp',
      rating: 4.4,
      price: 'Rp 18K',
      location: 'Traditional Markets',
      popularity: 'Refreshing Choice'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        className="text-center p-8 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <UtensilsCrossed className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-white mb-4">Jakarta Culinary Scene</h1>
        <p className="text-white/90 text-lg">Discover the rich flavors and culinary traditions of Indonesia&apos;s capital</p>
      </motion.div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Dish List */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Popular Dishes</h2>
          {dishes.map((dish, index) => (
            <motion.button
              key={dish.name}
              className={clsx(
                "w-full p-4 rounded-2xl text-left transition-all duration-300 group",
                "bg-white/10 backdrop-blur-lg border border-white/20",
                "hover:bg-white/20 hover:border-white/30",
                selectedDish === index && "bg-white/20 border-cyan-400/50 shadow-lg"
              )}
              onClick={() => {
                setSelectedDish(index);
                playClick();
              }}
              onHoverStart={() => playCardHover()}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                  <ChefHat className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">{dish.name}</h3>
                  <p className="text-white/70 text-sm">{dish.description}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-white/80">{dish.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-white/60" />
                      <span className="text-sm text-white/80">{dish.price}</span>
                    </div>
                  </div>
                </div>
                <motion.div
                  className={clsx(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    selectedDish === index ? "bg-cyan-400 scale-150" : "bg-white/30"
                  )}
                />
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Right Column - Detail View */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDish}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="h-full"
            >
              <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl mb-6">
                <Image 
                  src={dishes[selectedDish].image} 
                  alt={dishes[selectedDish].name} 
                  fill 
                  className="object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="text-3xl font-bold text-white mb-2">{dishes[selectedDish].name}</h2>
                  <p className="text-white/90 text-lg">Traditional Betawi Cuisine</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Description */}
                <div className="p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
                  <h3 className="text-xl font-bold text-white mb-3">About This Dish</h3>
                  <p className="text-white/80 leading-relaxed">{dishes[selectedDish].description}</p>
                </div>

                {/* Quick Facts */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="text-white font-semibold">Rating</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{dishes[selectedDish].rating}</p>
                  </div>
                  <div className="p-4 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-5 h-5 text-cyan-400" />
                      <span className="text-white font-semibold">Location</span>
                    </div>
                    <p className="text-lg font-bold text-white">{dishes[selectedDish].location}</p>
                  </div>
                </div>

                {/* Culinary Tips */}
                <div className="p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
                  <h3 className="text-xl font-bold text-white mb-3">Culinary Tips</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="w-10 h-10 bg-cyan-400/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Clock className="w-5 h-5 text-cyan-400" />
                      </div>
                      <h4 className="text-white font-semibold text-sm mb-1">Best Time</h4>
                      <p className="text-white/70 text-xs">Visit early morning for freshness</p>
                    </div>
                    <div className="text-center">
                      <div className="w-10 h-10 bg-cyan-400/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <MapPin className="w-5 h-5 text-cyan-400" />
                      </div>
                      <h4 className="text-white font-semibold text-sm mb-1">Popular Areas</h4>
                      <p className="text-white/70 text-xs">Glodok, Kota Tua, Menteng</p>
                    </div>
                    <div className="text-center">
                      <div className="w-10 h-10 bg-cyan-400/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Users className="w-5 h-5 text-cyan-400" />
                      </div>
                      <h4 className="text-white font-semibold text-sm mb-1">Local Favorites</h4>
                      <p className="text-white/70 text-xs">Ask locals for hidden gems</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};


