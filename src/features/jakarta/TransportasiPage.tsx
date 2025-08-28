'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Bus, Train, TramFront, Clock, Users, Zap } from 'lucide-react';

export const TransportasiPage: React.FC = () => {
  const transports: Array<{ 
    name: string; 
    icon: React.ElementType; 
    desc: string;
    image: string;
    routes: string;
    price: string;
    color: string;
  }> = [
    { 
      name: 'MRT Jakarta', 
      icon: Train, 
      desc: 'Mass Rapid Transit modern lintas selatan-utara Jakarta.',
      image: '/images/transport-jakarta-1.jpg',
      routes: '16 stasiun',
      price: 'Rp 3.000 - 14.000',
      color: 'from-red-500 to-red-600'
    },
    { 
      name: 'TransJakarta', 
      icon: Bus, 
      desc: 'Bus Rapid Transit dengan 15 koridor utama.',
      image: '/images/transport-jakarta-2.jpg',
      routes: '260+ halte',
      price: 'Rp 3.500',
      color: 'from-orange-500 to-orange-600'
    },
    { 
      name: 'LRT Jakarta', 
      icon: TramFront, 
      desc: 'Light Rail Transit yang menghubungkan Jakarta-Bekasi.',
      image: '/images/transport-jakarta-3.jpg',
      routes: '6 stasiun',
      price: 'Rp 5.000 - 12.000',
      color: 'from-green-500 to-green-600'
    },
    { 
      name: 'KRL Commuter Line', 
      icon: Train, 
      desc: 'Kereta api listrik untuk area Jabodetabek.',
      image: '/images/transport-jakarta-4.webp',
      routes: '80+ stasiun',
      price: 'Rp 3.000 - 7.000',
      color: 'from-blue-500 to-blue-600'
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
          <Bus className="w-10 h-10 text-cyan-400 drop-shadow-lg" />
          <h2 className="text-4xl font-bold text-white">Sistem Transportasi Jakarta</h2>
        </div>
        <p className="text-white/90 max-w-3xl mx-auto font-medium text-lg">
          Explore Jakarta&apos;s modern and efficient transportation network
        </p>
      </motion.div>

      {/* Hero image */}
      <motion.div 
        className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Image src="/images/transport-jakarta-2.jpg" alt="Transport Jakarta" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-8 left-8 text-white">
          <h3 className="text-3xl font-bold mb-3">Modern Jakarta Transportation</h3>
          <p className="text-white/90 text-lg">Integrated transportation system for efficient mobility</p>
        </div>
      </motion.div>

      {/* Transport modes */}
      <motion.div 
        className="space-y-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {transports.map((transport, index) => {
          const Icon = transport.icon;
          return (
            <motion.div 
              key={transport.name} 
              className="group relative overflow-hidden rounded-3xl shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.2, duration: 0.6 }}
            >
              {/* Full-bleed image background */}
              <div className="relative h-96 md:h-[400px] overflow-hidden">
                <Image 
                  src={transport.image} 
                  alt={transport.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                
                {/* Content overlay */}
                <div className="absolute inset-0 flex items-center">
                  <div className="p-8 md:p-12 text-white">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30">
                        <Icon className="w-8 h-8 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="text-3xl md:text-4xl font-bold mb-2">{transport.name}</h3>
                        <p className="text-white/90 text-lg max-w-2xl">{transport.desc}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mt-6">
                      <motion.button 
                        className={`px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r ${transport.color} hover:shadow-lg transition-all duration-200 border border-white/20`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Routes
                      </motion.button>
                      <div className="flex items-center gap-4 text-white/80">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">24/7 Service</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span className="text-sm">Millions daily</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          <span className="text-sm">{transport.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Quick tips */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {[
          { 
            title: '🎫 Electronic Cards', 
            desc: 'Use Flazz, Brizzi, or e-Money cards for convenient payments' 
          },
          { 
            title: '📱 Mobile Apps', 
            desc: 'Download TJ, MRT, or KRL Access apps for real-time information' 
          },
          { 
            title: '⏰ Operating Hours', 
            desc: 'Most services operate 05:00-23:00, plan your journey accordingly' 
          },
        ].map((tip, index) => (
          <motion.div 
            key={tip.title} 
            className="p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <h4 className="font-bold text-white mb-3 text-lg">{tip.title}</h4>
            <p className="text-white/80 leading-relaxed">{tip.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};


