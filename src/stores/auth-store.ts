'use client';

import { create } from 'zustand';
import { supabase, isSupabaseEnabled } from '@/services/supabase';

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
  login: (phone: string, role: 'seeker' | 'employer' | 'admin') => Promise<void>;
  logout: () => Promise<void>;
  completeOnboarding: () => void;
  checkSession: () => Promise<void>;
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
  login: async (phone, role) => {
    const client = supabase;
    // 1. MOCK FALLBACK IF SUPABASE IS NOT ACTIVE
    if (!isSupabaseEnabled() || !client) {
      console.log('[AuthStore] Supabase is disabled. Logging in with mock fallback.');
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
      });
      return;
    }

    // 2. REAL SUPABASE AUTH INTEGRATION
    try {
      const sanitizedPhone = phone.replace(/\s/g, '');
      const email = `phone_${sanitizedPhone.replace(/\D/g, '')}@quickgig.app`;
      const password = 'QuickGigPassword123!';

      console.log(`[AuthStore] Authenticating via Supabase: ${email}`);

      // Try logging in
      const loginRes = await client.auth.signInWithPassword({
        email,
        password,
      });

      let sessionUser = loginRes.data?.user;

      // If user doesn't exist, sign them up
      if (loginRes.error && (loginRes.error.message.includes('Invalid login credentials') || loginRes.error.message.includes('Email not confirmed'))) {
        console.log('[AuthStore] Creating new user...');
        const signUpRes = await client.auth.signUp({
          email,
          password,
        });

        if (signUpRes.error) throw signUpRes.error;
        sessionUser = signUpRes.data?.user;
      } else if (loginRes.error) {
        throw loginRes.error;
      }

      if (!sessionUser) throw new Error('Failed to retrieve user session');

      // Check profiles table
      const { data: profile, error: profileError } = await client
        .from('profiles')
        .select('*')
        .eq('id', sessionUser.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') { // PGRST116 is code for no rows returned
        throw profileError;
      }

      if (!profile) {
        // Create new profile linked to the UUID
        const name = role === 'employer' ? 'Kavitha' : role === 'admin' ? 'Admin Chennai' : 'Jagan';
        const area = role === 'employer' ? 'T.Nagar' : 'Purasaiwakkam';
        const trustScore = role === 'employer' ? 4.7 : 4.2;

        const { data: newProfile, error: insertError } = await client
          .from('profiles')
          .insert({
            id: sessionUser.id,
            name,
            phone,
            role,
            area,
            avatar: '',
            trust_score: trustScore,
            is_verified: true,
          })
          .select()
          .single();

        if (insertError) throw insertError;

        set({
          isAuthenticated: true,
          user: {
            id: newProfile.id,
            name: newProfile.name,
            phone: newProfile.phone,
            role: newProfile.role as 'seeker' | 'employer' | 'admin',
            area: newProfile.area,
            avatar: newProfile.avatar || '',
            trustScore: Number(newProfile.trust_score),
            isVerified: newProfile.is_verified,
          },
        });
      } else {
        // Exists, set in state
        set({
          isAuthenticated: true,
          user: {
            id: profile.id,
            name: profile.name,
            phone: profile.phone,
            role: profile.role as 'seeker' | 'employer' | 'admin',
            area: profile.area,
            avatar: profile.avatar || '',
            trustScore: Number(profile.trust_score),
            isVerified: profile.is_verified,
          },
        });
      }
    } catch (err: any) {
      const errMsg = err.message || '';
      if (
        errMsg.includes('rate limit') ||
        errMsg.includes('Rate limit') ||
        errMsg.includes('exceeded') ||
        errMsg.includes('429')
      ) {
        console.warn('[AuthStore] Supabase auth rate limit reached. Auto-falling back to local offline mock session.');
        set({
          isAuthenticated: true,
          user: {
            id: 'u_mock_limit',
            name: role === 'employer' ? 'Kavitha' : role === 'admin' ? 'Admin Chennai' : 'Jagan',
            phone,
            role,
            area: role === 'employer' ? 'T.Nagar' : 'Purasaiwakkam',
            avatar: '',
            trustScore: role === 'employer' ? 4.7 : 4.2,
            isVerified: true,
          },
        });
        return;
      }
      console.error('[AuthStore] Authentication error:', errMsg);
      throw err;
    }
  },
  logout: async () => {
    const client = supabase;
    if (isSupabaseEnabled() && client) {
      await client.auth.signOut();
    }
    set({ isAuthenticated: false, user: null });
  },
  completeOnboarding: () => set({ isOnboarded: true }),
  checkSession: async () => {
    const client = supabase;
    if (!isSupabaseEnabled() || !client) return;

    try {
      const { data: { session } } = await client.auth.getSession();
      if (!session || !session.user) return;

      const { data: profile } = await client
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (profile) {
        set({
          isAuthenticated: true,
          user: {
            id: profile.id,
            name: profile.name,
            phone: profile.phone,
            role: profile.role as 'seeker' | 'employer' | 'admin',
            area: profile.area,
            avatar: profile.avatar || '',
            trustScore: Number(profile.trust_score),
            isVerified: profile.is_verified,
          },
        });
        console.log('[AuthStore] Successfully restored persistent user session!');
      }
    } catch (err) {
      console.warn('[AuthStore] Failed to restore session:', err);
    }
  },
}));

