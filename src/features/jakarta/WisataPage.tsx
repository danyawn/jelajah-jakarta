'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Landmark, MapPin, Star, Users, Clock } from 'lucide-react';

export const WisataPage: React.FC = () => {
  const spots: Array<{ 
    name: string; 
    area: string; 
    description: string;
    image: string;
    rating: number;
    visitors: string;
  }> = [
    { 
      name: 'Monas', 
      area: 'Gambir', 
      description: 'Monumen Nasional yang ikonik di pusat Jakarta',
      image: '/images/jakarta-1.jpg',
      rating: 4.5,
      visitors: '2M+'
    },
    { 
      name: 'Kota Tua', 
      area: 'Taman Sari', 
      description: 'Kawasan bersejarah dengan arsitektur kolonial',
      image: '/images/jakarta-3.jpg',
      rating: 4.3,
      visitors: '1.5M+'
    },
    { 
      name: 'Ancol Dreamland', 
      area: 'Pademangan', 
      description: 'Taman rekreasi terpadu dengan pantai buatan',
      image: '/images/jakarta-4.jpg',
      rating: 4.2,
      visitors: '3M+'
    },
    { 
      name: 'Ragunan Zoo', 
      area: 'Pasar Minggu', 
      description: 'Kebun binatang terbesar di Jakarta',
      image: '/images/jakarta-5.jpeg',
      rating: 4.1,
      visitors: '800K+'
    },
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
        <div className="flex items-center justify-center gap-3 mb-4">
          <Landmark className="w-10 h-10 text-cyan-400 drop-shadow-lg" />
          <h2 className="text-4xl font-bold text-white">Popular Tourist Destinations</h2>
        </div>
        <p className="text-white/90 max-w-3xl mx-auto font-medium text-lg">
          Explore the most fascinating places in Jakarta that you must visit
        </p>
      </motion.div>

      {/* Featured destination */}
      <motion.div 
        className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Image src="/images/jakarta-2.png" alt="Jakarta Featured" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-8 left-8 text-white">
          <h3 className="text-3xl font-bold mb-3">Jakarta at Its Best</h3>
          <p className="text-white/90 text-lg">Discover the charm of Indonesia&apos;s never-sleeping capital</p>
        </div>
      </motion.div>

      {/* Destinations grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {spots.map((spot, index) => (
          <motion.div
            key={spot.name}
            className="group relative overflow-hidden rounded-3xl shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.2, duration: 0.6 }}
          >
            {/* Full-bleed image background */}
            <div className="relative h-96 md:h-[400px] overflow-hidden">
              <Image 
                src={spot.image} 
                alt={spot.name} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
              
              {/* Content overlay */}
              <div className="absolute inset-0 flex items-center">
                <div className="p-8 md:p-12 text-white">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30">
                      <Landmark className="w-8 h-8 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-3xl md:text-4xl font-bold mb-2">{spot.name}</h3>
                      <p className="text-white/90 text-lg max-w-2xl">{spot.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 mt-6">
                    <motion.button 
                      className="px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 hover:shadow-lg transition-all duration-200 border border-white/20"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Details
                    </motion.button>
                    <div className="flex items-center gap-4 text-white/80">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm">{spot.rating}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">{spot.visitors}/year</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{spot.area}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Tips section */}
      <motion.div 
        className="p-8 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="text-2xl">💡</span>
          Travel Tips for Jakarta
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/90">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>Use public transportation to avoid traffic</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <span>Visit in morning or evening for better weather</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-green-400" />
            <span>Prepare masks and hand sanitizer</span>
          </div>
          <div className="flex items-center gap-2">
            <Landmark className="w-4 h-4 text-purple-400" />
            <span>Bring camera to capture moments</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};


