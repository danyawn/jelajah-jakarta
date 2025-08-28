'use client';

import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Images as ImagesIcon, Home } from 'lucide-react';
import { useTabStore } from '@/store/tabStore';
import { GaleriPage } from '@/features/jakarta/GaleriPage';
import { useSound } from '@/hooks/useSound';

const TabBar: React.FC = () => {
  const { tabs, activeTabId, switchTab, closeTab, addNewTab } = useTabStore();
  const { playTabSwitch, playClick, playSwoosh } = useSound();
  const listRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-gradient-to-r from-slate-900/80 via-slate-800/80 to-slate-900/80 border-b border-white/10 shadow-xl backdrop-blur-lg">
      {/* Browser-like header */}
      <div className="flex items-center justify-between px-4 py-2 bg-black/20">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg"></div>
          </div>
          <div className="flex items-center gap-2 text-white">
            <Home className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-semibold">Jelajah Jakarta</span>
          </div>
        </div>
                        <motion.button
                  onClick={() => {
                    playSwoosh();
                    addNewTab(GaleriPage, 'Galeri', ImagesIcon);
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all duration-200 border border-white/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Tambah tab"
                >
          <Plus className="w-4 h-4" />
          <span>New Tab</span>
        </motion.button>
      </div>

      {/* Tabs container */}
      <div className="flex items-end px-2 pt-2 overflow-x-auto scrollbar-hide" ref={listRef}>
        <AnimatePresence mode="wait">
          {tabs.map((tab, index) => {
            const isActive = tab.id === activeTabId;
            const Icon = tab.icon;
            return (
              <motion.div
                key={tab.id}
                className="relative flex-shrink-0"
                style={{ zIndex: isActive ? 10 : 9 - index }}
                initial={{ y: 20, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -20, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                                        <motion.button
                          onClick={() => {
                            playTabSwitch();
                            switchTab(tab.id);
                          }}
                          className={`
                            relative flex items-center gap-2 px-4 py-3 min-w-[140px] max-w-[200px] group
                            transition-all duration-300 ease-out
                            ${isActive
                              ? 'bg-white/95 text-slate-900 shadow-2xl transform translate-y-0'
                              : 'bg-slate-700/50 text-slate-200 hover:bg-slate-600/70 hover:text-white transform translate-y-1'
                            }
                          `}
                  style={{
                    clipPath: isActive 
                      ? 'polygon(8px 0%, calc(100% - 8px) 0%, 100% 100%, 0% 100%)'
                      : 'polygon(8px 0%, calc(100% - 8px) 0%, calc(100% - 4px) 100%, 4px 100%)',
                    marginRight: index < tabs.length - 1 ? '-8px' : '0',
                    boxShadow: isActive ? '0 0 15px rgb(34 211 238)' : 'none'
                  }}
                  whileHover={{ scale: isActive ? 1.02 : 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Tab content */}
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-cyan-600' : ''}`} />
                  <span className="truncate font-medium text-sm">{tab.title}</span>
                  
                  {/* Close button */}
                                            <motion.div
                            onClick={(e) => {
                              e.stopPropagation();
                              playClick();
                              closeTab(tab.id);
                            }}
                    className={`
                      flex-shrink-0 p-1 rounded-full transition-all duration-200
                      ${isActive 
                        ? 'hover:bg-slate-200 text-slate-500 hover:text-slate-700' 
                        : 'hover:bg-slate-400 text-slate-300 hover:text-white'
                      }
                      opacity-0 group-hover:opacity-100
                    `}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-3 h-3" />
                  </motion.div>

                  {/* Active tab indicator */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-cyan-400 rounded-full"
                        layoutId="activeTab"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {/* Add tab button */}
                        <motion.button
                  onClick={() => {
                    playSwoosh();
                    addNewTab(GaleriPage, 'Galeri', ImagesIcon);
                  }}
                  className="flex-shrink-0 flex items-center justify-center w-8 h-8 mx-2 mb-2 rounded-full bg-slate-700/50 hover:bg-slate-600/70 text-slate-300 hover:text-white transition-all duration-200 border border-white/10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Tambah tab"
                >
          <Plus className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
};

export default TabBar;


