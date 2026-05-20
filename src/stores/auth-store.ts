'use client';

import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    phone: string;
    role: 'seeker' | 'employer' | 'admin';
    area: string;
    avatar: string;
    trustScore: number;
    isVerified: boolean;
  } | null;
  isOnboarded: boolean;
  setUser: (user: AuthState['user']) => void;
  setRole: (role: 'seeker' | 'employer' | 'admin') => void;
  login: (phone: string, role: 'seeker' | 'employer' | 'admin') => void;
  logout: () => void;
  completeOnboarding: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isOnboarded: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setRole: (role) =>
    set((state) => ({
      user: state.user ? { ...state.user, role } : null,
    })),
  login: (phone, role) =>
    set({
      isAuthenticated: true,
      user: {
        id: 'u1',
        name: role === 'employer' ? 'Kavitha' : 'Jagan',
        phone,
        role,
        area: role === 'employer' ? 'T.Nagar' : 'Purasaiwakkam',
        avatar: '',
        trustScore: role === 'employer' ? 4.7 : 4.2,
        isVerified: true,
      },
    }),
  logout: () => set({ isAuthenticated: false, user: null }),
  completeOnboarding: () => set({ isOnboarded: true }),
}));
