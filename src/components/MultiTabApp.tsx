'use client';

import React from 'react';
import TabBar from './ui/TabBar';
import TabContent from './ui/TabContent';
import Hyperspeed from './Hyperspeed';
import CustomCursor from './ui/CustomCursor';
import { useTabStore } from '../store/tabStore';

const MultiTabApp: React.FC = () => {
  const { initializeTabs } = useTabStore();
  React.useEffect(() => {
    initializeTabs();
  }, [initializeTabs]);

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden relative">
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Animated Hyperspeed background */}
      <div className="absolute inset-0 z-0">
        <Hyperspeed effectOptions={{
          colors: {
            roadColor: 0x1a1a1a,
            islandColor: 0x2a2a2a,
            background: 0x000811,
            shoulderLines: 0xffffff,
            brokenLines: 0xffffff,
            leftCars: [0xff4757, 0xff3742, 0xdc143c], // Red - Indonesian flag
            rightCars: [0x3742fa, 0x2f3542, 0x1e3799], // Blue - Jakarta night
            sticks: 0xffa502, // Orange - Jakarta sunset
          }
        }} />
      </div>
      
      {/* App content with enhanced glassmorphism */}
      <div className="relative z-10 h-full flex flex-col bg-black/10 backdrop-blur-sm">
        {/* Browser-style tab bar */}
        <TabBar />
        
        {/* Main content area with refined glassmorphism */}
        <div className="flex-1 bg-white/5 backdrop-blur-lg border-t border-white/10 shadow-lg overflow-hidden">
          <TabContent />
        </div>
      </div>
    </div>
  );
};

export default MultiTabApp;


