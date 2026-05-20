'use client';

import { create } from 'zustand';

interface JobFilters {
  search: string;
  areas: string[];
  categories: string[];
  shifts: string[];
  payMin: number;
  payMax: number;
  payType: 'all' | 'daily' | 'weekly' | 'monthly';
  maxDistance: number;
  verifiedOnly: boolean;
  urgentOnly: boolean;
  postedWithin: 'all' | '1h' | 'today' | 'week';
}

interface JobsState {
  filters: JobFilters;
  savedJobs: string[];
  recentSearches: string[];
  setSearch: (search: string) => void;
  setFilters: (filters: Partial<JobFilters>) => void;
  resetFilters: () => void;
  toggleSaved: (jobId: string) => void;
  isSaved: (jobId: string) => boolean;
  addRecentSearch: (query: string) => void;
}

const defaultFilters: JobFilters = {
  search: '',
  areas: [],
  categories: [],
  shifts: [],
  payMin: 0,
  payMax: 2000,
  payType: 'all',
  maxDistance: 20,
  verifiedOnly: false,
  urgentOnly: false,
  postedWithin: 'all',
};

export const useJobsStore = create<JobsState>((set, get) => ({
  filters: { ...defaultFilters },
  savedJobs: ['j3', 'j8'],
  recentSearches: ['delivery anna nagar', 'evening cashier', 'event helper'],
  setSearch: (search) =>
    set((state) => ({ filters: { ...state.filters, search } })),
  setFilters: (partial) =>
    set((state) => ({ filters: { ...state.filters, ...partial } })),
  resetFilters: () => set({ filters: { ...defaultFilters } }),
  toggleSaved: (jobId) =>
    set((state) => ({
      savedJobs: state.savedJobs.includes(jobId)
        ? state.savedJobs.filter((id) => id !== jobId)
        : [...state.savedJobs, jobId],
    })),
  isSaved: (jobId) => get().savedJobs.includes(jobId),
  addRecentSearch: (query) =>
    set((state) => ({
      recentSearches: [query, ...state.recentSearches.filter((q) => q !== query)].slice(0, 5),
    })),
}));
