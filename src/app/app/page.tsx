'use client';

import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { I18nProvider } from '@/components/providers/I18nProvider';
import { ToastContainer } from '@/components/ui/Toast';
import { useAuthStore } from '@/stores/auth-store';
import OnboardingScreen from '@/components/screens/OnboardingScreen';
import RoleSelectScreen from '@/components/screens/RoleSelectScreen';
import AuthScreen from '@/components/screens/AuthScreen';
import SeekerShell from '@/components/screens/SeekerShell';
import EmployerShell from '@/components/screens/EmployerShell';
import AdminDashboard from '@/components/screens/AdminDashboard';
import ChatListScreen from '@/components/screens/ChatListScreen';
import ChatDetailScreen from '@/components/screens/ChatDetailScreen';
import MapViewScreen from '@/components/screens/MapViewScreen';

export type Screen =
  | 'onboarding'
  | 'role'
  | 'auth'
  // Seeker
  | 'seeker-home'
  | 'seeker-search'
  | 'seeker-job-detail'
  | 'seeker-apply'
  | 'seeker-applications'
  | 'seeker-saved'
  | 'seeker-earnings'
  | 'seeker-notifications'
  | 'seeker-profile'
  | 'seeker-settings'
  | 'seeker-chats'
  | 'seeker-chat-detail'
  | 'seeker-map'
  // Employer
  | 'employer-dashboard'
  | 'employer-post-job'
  | 'employer-applicants'
  | 'employer-review'
  | 'employer-profile'
  // Admin
  | 'admin';

export default function AppPage() {
  const [screen, setScreen] = useState<Screen>('onboarding');
  const [selectedJobId, setSelectedJobId] = useState<string>('j1');
  const { isAuthenticated, user } = useAuthStore();

  const navigate = (s: Screen, jobId?: string) => {
    if (jobId) setSelectedJobId(jobId);
    setScreen(s);
    window.scrollTo(0, 0);
  };

  const renderScreen = () => {
    // Pre-auth screens
    if (screen === 'onboarding') {
      return <OnboardingScreen onComplete={() => navigate('role')} />;
    }
    if (screen === 'role') {
      return <RoleSelectScreen onSelect={(role) => {
        useAuthStore.getState().setUser({ id: '', name: '', phone: '', role, area: '', avatar: '', trustScore: 0, isVerified: false });
        navigate('auth');
      }} />;
    }
    if (screen === 'auth') {
      return <AuthScreen onSuccess={() => {
        const role = useAuthStore.getState().user?.role || 'seeker';
        if (role === 'admin') navigate('admin');
        else if (role === 'employer') navigate('employer-dashboard');
        else navigate('seeker-home');
      }} />;
    }

    // Seeker screens
    if (screen.startsWith('seeker-')) {
      if (screen === 'seeker-chats') {
        return <ChatListScreen navigate={navigate} />;
      }
      if (screen === 'seeker-chat-detail') {
        const chatId = selectedJobId; // Reusing selectedJobId to store chatId for now
        return <ChatDetailScreen chatId={chatId} navigate={navigate} />;
      }
      if (screen === 'seeker-map') {
        return <MapViewScreen navigate={navigate} />;
      }
      return <SeekerShell screen={screen} navigate={navigate} selectedJobId={selectedJobId} />;
    }

    // Employer screens
    if (screen.startsWith('employer-')) {
      return <EmployerShell screen={screen} navigate={navigate} />;
    }

    // Admin
    if (screen === 'admin') {
      return <AdminDashboard />;
    }

    return null;
  };

  return (
    <ThemeProvider>
      <I18nProvider>
        <div style={{ minHeight: '100vh' }}>
          {renderScreen()}
          <ToastContainer />
        </div>
      </I18nProvider>
    </ThemeProvider>
  );
}
