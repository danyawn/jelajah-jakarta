'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Home as HomeIcon, Landmark, UtensilsCrossed, Train, ScrollText, Images as ImagesIcon, ArrowRight, Star, Users } from 'lucide-react';
import { useTabStore } from '@/store/tabStore';
import { WisataPage } from '@/features/jakarta/WisataPage';
import { KulinerPage } from '@/features/jakarta/KulinerPage';
import { TransportasiPage } from '@/features/jakarta/TransportasiPage';
import { SejarahPage } from '@/features/jakarta/SejarahPage';
import { GaleriPage } from '@/features/jakarta/GaleriPage';
import FlowingMenu from '@/components/FlowingMenu';
import { useSound } from '@/hooks/useSound';

export const BerandaPage: React.FC = () => {
  const { addNewTab } = useTabStore();
  const { playCardHover, playClick } = useSound();

  const shortcuts: Array<{
    title: string;
    subtitle: string;
    description: string;
    image: string;
    icon: React.ElementType;
    component: React.ComponentType;
    gradient: string;
  }> = [
    { 
      title: 'Wisata', 
      subtitle: 'Destinasi populer kota', 
      description: 'Jelajahi tempat-tempat menarik di Jakarta',
      image: '/images/jakarta-3.jpg', 
      icon: Landmark, 
      component: WisataPage,
      gradient: 'from-blue-600 to-blue-800'
    },
    { 
      title: 'Kuliner', 
      subtitle: 'Cita rasa Betawi', 
      description: 'Nikmati kelezatan masakan khas Jakarta',
      image: '/images/jakarta-4.jpg', 
      icon: UtensilsCrossed, 
      component: KulinerPage,
      gradient: 'from-orange-600 to-red-700'
    },
    { 
      title: 'Transportasi', 
      subtitle: 'MRT, TransJakarta, LRT', 
      description: 'Sistem transportasi modern Jakarta',
      image: '/images/transport-jakarta-1.jpg', 
      icon: Train, 
      component: TransportasiPage,
      gradient: 'from-green-600 to-emerald-700'
    },
    { 
      title: 'Sejarah', 
      subtitle: 'Perjalanan panjang kota', 
      description: 'Kenali sejarah dan perkembangan Jakarta',
      image: '/images/sejarah-jakarta-1.jpeg', 
      icon: ScrollText, 
      component: SejarahPage,
      gradient: 'from-purple-600 to-violet-700'
    },
    { 
      title: 'Galeri', 
      subtitle: 'Koleksi foto Jakarta', 
      description: 'Kumpulan foto-foto indah Jakarta',
      image: '/images/jakarta-5.jpeg', 
      icon: ImagesIcon, 
      component: GaleriPage,
      gradient: 'from-pink-600 to-rose-700'
    },
  ];

  React.useEffect(() => {
    // no-op placeholder for any Beranda-specific GSAP if needed later
  }, []);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div 
        className="relative h-screen w-full overflow-hidden rounded-3xl shadow-2xl border border-white/20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Image src="/images/jakarta-night-1.jpeg" alt="Jakarta night skyline" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-8">
          <motion.div 
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <HomeIcon className="w-12 h-12 text-cyan-400 drop-shadow-2xl" />
            <motion.h1 
              className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.span
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                Discover
              </motion.span>{' '}
              <motion.span
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                Jakarta
              </motion.span>
            </motion.h1>
          </motion.div>
          <motion.p 
            className="text-2xl md:text-3xl text-cyan-200 mb-8 max-w-4xl font-semibold drop-shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            The Vibrant Heart of Indonesia
          </motion.p>
          <motion.p 
            className="text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed font-medium drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            Explore the capital&apos;s rich culture, modern infrastructure, and dynamic energy through an immersive multi-tab experience.
          </motion.p>
        </div>
      </motion.div>

      {/* FlowingMenu */}
      <motion.div 
        className="rounded-3xl border border-white/20 overflow-hidden shadow-xl bg-white/5 backdrop-blur-sm" 
        style={{ height: '500px' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <FlowingMenu
          items={[
            { link: '#', text: 'Wisata', image: '/images/jakarta-3.jpg' },
            { link: '#', text: 'Kuliner', image: '/images/jakarta-4.jpg' },
            { link: '#', text: 'Transportasi', image: '/images/transport-jakarta-2.jpg' },
            { link: '#', text: 'Sejarah', image: '/images/sejarah-jakarta-2.jpg' },
          ]}
        />
      </motion.div>

      {/* Enhanced Navigation Cards */}
      <motion.div 
        className="space-y-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Section Header */}
        <div className="text-center">
          <motion.h2 
            className="text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Explore Jakarta
          </motion.h2>
          <motion.p 
            className="text-white/80 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Discover the diverse aspects of Indonesia&apos;s vibrant capital through our interactive guides
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {shortcuts.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                className="group relative"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -10 }}
              >
                <Tilt
                  tiltMaxAngleX={15}
                  tiltMaxAngleY={15}
                  perspective={1000}
                  glareEnable={true}
                  glareMaxOpacity={0.4}
                  glareColor="rgb(34 211 238)"
                  glarePosition="all"
                  glareBorderRadius="24px"
                  scale={1.05}
                  transitionSpeed={2000}
                  className="w-full h-full"
                >
                  <div className="group relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-700">
                    {/* Background Image with Enhanced Effects */}
                    <div className="relative h-80 overflow-hidden">
                      <Image 
                        src={item.image} 
                        alt={item.title} 
                        fill 
                        className="object-cover group-hover:scale-125 transition-transform duration-1000" 
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${item.gradient} opacity-90 group-hover:opacity-75 transition-opacity duration-500`} />
                      
                      {/* Floating Icon with Enhanced Design */}
                      <motion.div 
                        className="absolute top-6 right-6"
                        animate={{ 
                          y: [0, -5, 0],
                          rotate: [0, 5, 0]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        }}
                      >
                        <div className="p-4 rounded-2xl bg-white/25 backdrop-blur-lg border border-white/40 shadow-2xl group-hover:bg-white/35 transition-all duration-300">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                      </motion.div>

                      {/* Category Badge */}
                      <div className="absolute top-6 left-6">
                        <div className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-semibold">
                          {item.title}
                        </div>
                      </div>

                      {/* Hover Overlay with Info */}
                      <motion.div 
                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center pointer-events-none"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      >
                        <div className="text-center text-white p-6">
                          <Icon className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
                          <p className="text-lg font-medium">Click to explore</p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Enhanced Content Section */}
                    <div className="relative z-10 p-8 bg-white/15 backdrop-blur-lg border-t border-white/20">
                      <div className="space-y-4">
                        {/* Title with Enhanced Typography */}
                        <div>
                          <h3 className="text-2xl font-black text-white mb-2 tracking-wide">{item.title}</h3>
                          <p className="text-cyan-200 font-semibold text-lg">{item.subtitle}</p>
                        </div>

                        {/* Description with Better Readability */}
                        <p className="text-white/90 text-base leading-relaxed font-medium">{item.description}</p>

                        {/* Interactive Stats */}
                        <div className="flex items-center justify-between py-3 px-4 bg-white/10 rounded-xl border border-white/20">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                            <span className="text-white/80 text-sm font-medium">Interactive Guide</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-1 h-1 rounded-full bg-white/60"></div>
                            <div className="w-1 h-1 rounded-full bg-white/60"></div>
                            <div className="w-1 h-1 rounded-full bg-white/60"></div>
                          </div>
                        </div>

                        {/* Enhanced CTA Button */}
                        <motion.button
                          onClick={() => {
                            playClick();
                            addNewTab(item.component, item.title, item.icon);
                          }}
                          className={`
                            w-full py-4 px-6 rounded-2xl text-white font-bold text-lg
                            bg-gradient-to-r ${item.gradient}
                            hover:shadow-2xl transition-all duration-300 border-2 border-white/30
                            group-hover:border-white/50 group-hover:scale-105
                          `}
                          whileHover={{ 
                            scale: 1.05,
                            boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="flex items-center justify-center gap-3">
                            <span>Explore {item.title}</span>
                            <motion.div
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                              <Icon className="w-5 h-5" />
                            </motion.div>
                          </div>
                        </motion.button>
                      </div>
                    </div>

                    {/* Glow Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `linear-gradient(45deg, transparent, ${item.gradient.includes('blue') ? 'rgba(59, 130, 246, 0.3)' : item.gradient.includes('orange') ? 'rgba(249, 115, 22, 0.3)' : item.gradient.includes('green') ? 'rgba(34, 197, 94, 0.3)' : item.gradient.includes('purple') ? 'rgba(147, 51, 234, 0.3)' : 'rgba(236, 72, 153, 0.3)'}, transparent)`
                      }}
                    />
                  </div>
                </Tilt>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Horizontal Scrolling Featured Destinations */}
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-white">Featured Destinations</h2>
          <motion.div 
            className="flex items-center gap-2 text-cyan-400 cursor-pointer group"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-sm font-medium">View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.div>
        </div>
        
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {[
            {
              title: 'Monas',
              subtitle: 'National Monument',
              image: '/images/jakarta-1.jpg',
              description: 'Iconic landmark of Jakarta',
              rating: 4.8,
              visitors: '2.5M+'
            },
            {
              title: 'Taman Mini',
              subtitle: 'Indonesia in Miniature',
              image: '/images/jakarta-2.png',
              description: 'Cultural theme park',
              rating: 4.6,
              visitors: '1.8M+'
            },
            {
              title: 'Ancol',
              subtitle: 'Dreamland',
              image: '/images/jakarta-3.jpg',
              description: 'Entertainment complex',
              rating: 4.7,
              visitors: '3.2M+'
            },
            {
              title: 'Kota Tua',
              subtitle: 'Old Town',
              image: '/images/jakarta-4.jpg',
              description: 'Historical district',
              rating: 4.5,
              visitors: '1.2M+'
            }
          ].map((destination, index) => (
            <motion.div
              key={destination.title}
              className="flex-shrink-0 w-80 group cursor-pointer"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              onHoverStart={() => playCardHover()}
            >
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
                <Image 
                  src={destination.image} 
                  alt={destination.title} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">{destination.title}</h3>
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-white font-medium">{destination.rating}</span>
                    </div>
                  </div>
                  <p className="text-cyan-200 font-medium mb-1">{destination.subtitle}</p>
                  <p className="text-white/80 text-sm mb-3">{destination.description}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-white/70">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{destination.visitors}</span>
                    </div>
                    <motion.button
                      className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white text-sm font-medium hover:bg-white/30 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        playClick();
                        addNewTab(WisataPage, 'Wisata', Landmark);
                      }}
                    >
                      Explore
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Stats section */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {[
          { label: 'Destinasi Wisata', value: '50+', icon: Landmark },
          { label: 'Kuliner Khas', value: '30+', icon: UtensilsCrossed },
          { label: 'Rute Transportasi', value: '15+', icon: Train },
          { label: 'Foto Galeri', value: '100+', icon: ImagesIcon },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={stat.label} 
              className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/15 transition-all duration-300 shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Icon className="w-10 h-10 text-cyan-400 mx-auto mb-3 drop-shadow-lg" />
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-white/80 font-medium">{stat.label}</div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};