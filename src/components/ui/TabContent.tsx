'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useTabStore } from '@/store/tabStore';
import { BerandaPage } from '@/features/jakarta/BerandaPage';
import { ChevronRight, Folder } from 'lucide-react';

const TabContent: React.FC = () => {
  const { tabs, activeTabId } = useTabStore();
  const active = tabs.find((t) => t.id === activeTabId) ?? tabs[0];
  const ActiveComp = active?.component ?? BerandaPage;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 12, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power2.out' }
    );
  }, [active?.id]);

  return (
    <div className="h-full flex flex-col">
      {/* Breadcrumb navigation */}
      <div className="flex items-center gap-2 px-6 py-3 bg-white/5 border-b border-white/10 backdrop-blur-lg">
        <Folder className="w-4 h-4 text-cyan-400" />
        <span className="text-sm text-white/90 font-medium">Jelajah Jakarta</span>
        <ChevronRight className="w-4 h-4 text-white/60" />
        <span className="text-sm font-semibold text-white">{active?.title || 'Beranda'}</span>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 lg:p-8" key={active?.id} ref={containerRef}>
          <ActiveComp />
        </div>
      </div>
    </div>
  );
};

export default TabContent;


