'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight, MapPin, UtensilsCrossed, Train, ScrollText } from 'lucide-react';

interface MenuItemProps {
  link: string;
  text: string;
  image: string;
}

interface FlowingMenuProps {
  items?: MenuItemProps[];
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({ items = [] }) => {
  // Ensure we have at least some default items to prevent empty state
  const menuItems = items.length > 0 ? items : [
    { link: '#', text: 'Wisata', image: '/images/jakarta-1.jpg' },
    { link: '#', text: 'Kuliner', image: '/images/jakarta-2.png' },
    { link: '#', text: 'Transportasi', image: '/images/jakarta-3.jpg' },
    { link: '#', text: 'Sejarah', image: '/images/jakarta-4.jpg' },
  ];

  const getIcon = (text: string) => {
    switch (text.toLowerCase()) {
      case 'wisata':
        return <MapPin className="w-6 h-6" />;
      case 'kuliner':
        return <UtensilsCrossed className="w-6 h-6" />;
      case 'transportasi':
        return <Train className="w-6 h-6" />;
      case 'sejarah':
        return <ScrollText className="w-6 h-6" />;
      default:
        return <ChevronRight className="w-6 h-6" />;
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <nav className="flex flex-col h-full space-y-4 p-6">
        {menuItems.map((item, idx) => (
          <MenuItem key={`${item.text}-${idx}`} {...item} icon={getIcon(item.text)} />
        ))}
      </nav>
    </div>
  );
};

interface MenuItemPropsWithIcon extends MenuItemProps {
  icon: React.ReactNode;
}

const MenuItem: React.FC<MenuItemPropsWithIcon> = ({ text, image, icon, link }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const handleOpen = React.useCallback(() => {
    if (!link) return;
    window.open(link, '_blank', 'noopener,noreferrer');
  }, [link]);

  return (
    <motion.div
      role="button"
      tabIndex={0}
      onClick={handleOpen}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleOpen(); } }}
      className="relative overflow-hidden group h-56 md:h-64 lg:h-72 rounded-2xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
        <Image src={image} alt={text} fill priority className="object-cover" />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20" />
      
      {/* Content */}
      <motion.div 
        className="relative h-full flex items-center justify-center p-6"
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="text-center text-white">
          {/* Icon */}
          <motion.div 
            className="flex justify-center mb-4"
            animate={{ 
              scale: isHovered ? 1.3 : 1,
              rotate: isHovered ? 8 : 0
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="p-4 rounded-2xl bg-white/25 backdrop-blur-lg border border-white/40 shadow-2xl">
              {icon}
            </div>
          </motion.div>
          
          {/* Text */}
          <motion.h3 
            className="text-3xl md:text-4xl font-black mb-2 uppercase tracking-widest drop-shadow-2xl"
            animate={{ 
              scale: isHovered ? 1.08 : 1,
              y: isHovered ? -8 : 0
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {text}
          </motion.h3>
          
          {/* Description */}
          <motion.p 
            className="text-white/90 text-lg max-w-md mx-auto font-medium leading-relaxed mb-4"
            animate={{ 
              opacity: isHovered ? 1 : 0.9,
              y: isHovered ? 0 : 15
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            Explore Jakarta&apos;s {text.toLowerCase()} scene
          </motion.p>
          
          {/* CTA Button */}
          <motion.button
            type="button"
            onClick={(e) => { e.stopPropagation(); handleOpen(); }}
            className="px-8 py-3 bg-white/25 backdrop-blur-lg border-2 border-white/40 rounded-xl text-white font-bold text-base hover:bg-white/35 transition-all duration-300 shadow-2xl"
            animate={{ 
              scale: isHovered ? 1.15 : 1,
              y: isHovered ? 0 : 8
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            Discover More
          </motion.button>
        </div>
      </motion.div>
      
      {/* Animated border */}
      <motion.div
        className="absolute inset-0 border-2 border-cyan-400/60 rounded-2xl"
        animate={{
          scale: isHovered ? 1.03 : 1,
          opacity: isHovered ? 1 : 0
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-2xl"
        animate={{
          opacity: isHovered ? 1 : 0
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
      
      {/* Additional glow rings */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={{
          boxShadow: isHovered 
            ? '0 0 30px rgba(34, 211, 238, 0.4), 0 0 60px rgba(34, 211, 238, 0.2)' 
            : 'none'
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
};

export default FlowingMenu;


