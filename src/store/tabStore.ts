'use client';

import { create } from 'zustand';
import type React from 'react';
import { Home as HomeIcon } from 'lucide-react';
import { BerandaPage } from '@/features/jakarta/BerandaPage';

export type TabData = {
  id: string;
  title: string;
  component: React.ComponentType;
  icon: React.ElementType;
};

export interface TabState {
  tabs: TabData[];
  activeTabId: string | null;
  addNewTab: (
    component: React.ComponentType,
    title: string,
    icon: React.ElementType
  ) => void;
  switchTab: (tabId: string) => void;
  closeTab: (tabIdToClose: string) => void;
  initializeTabs: () => void;
}

export const generateId = (): string => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

export const useTabStore = create<TabState>((set, get) => ({
  tabs: [],
  activeTabId: null,
  initializeTabs: () => {
    const { tabs } = get();
    if (tabs.length > 0) return;
    const id = generateId();
    const initial: TabData = {
      id,
      title: 'Beranda',
      component: BerandaPage,
      icon: HomeIcon,
    };
    set({ tabs: [initial], activeTabId: id });
  },
  addNewTab: (component, title, icon) => {
    const id = generateId();
    const newTab: TabData = { id, title, component, icon };
    set((state) => ({ tabs: [...state.tabs, newTab], activeTabId: id }));
  },
  switchTab: (tabId: string) => set({ activeTabId: tabId }),
  closeTab: (tabIdToClose: string) => {
    set((state) => {
      if (state.tabs.length <= 1) return state;
      const idx = state.tabs.findIndex((t) => t.id === tabIdToClose);
      const remaining = state.tabs.filter((t) => t.id !== tabIdToClose);
      let nextActive = state.activeTabId;
      if (state.activeTabId === tabIdToClose) {
        const newIndex = Math.max(0, idx - 1);
        nextActive = remaining[newIndex]?.id ?? remaining[0].id;
      }
      return { tabs: remaining, activeTabId: nextActive };
    });
  },
}));


