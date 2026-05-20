'use client';

import { create } from 'zustand';

interface UIState {
  theme: 'light' | 'dark';
  language: 'en' | 'ta';
  isFilterOpen: boolean;
  activeToast: { message: string; type: 'success' | 'error' | 'info' } | null;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleLanguage: () => void;
  setLanguage: (lang: 'en' | 'ta') => void;
  openFilter: () => void;
  closeFilter: () => void;
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
  hideToast: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  theme: 'light',
  language: 'en',
  isFilterOpen: false,
  activeToast: null,
  toggleTheme: () =>
    set((state) => {
      const next = state.theme === 'light' ? 'dark' : 'light';
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', next);
      }
      return { theme: next };
    }),
  setTheme: (theme) => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
    set({ theme });
  },
  toggleLanguage: () =>
    set((state) => ({ language: state.language === 'en' ? 'ta' : 'en' })),
  setLanguage: (language) => set({ language }),
  openFilter: () => set({ isFilterOpen: true }),
  closeFilter: () => set({ isFilterOpen: false }),
  showToast: (message, type) => {
    set({ activeToast: { message, type } });
    setTimeout(() => set({ activeToast: null }), 3000);
  },
  hideToast: () => set({ activeToast: null }),
}));
