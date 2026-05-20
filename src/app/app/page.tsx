'use client';

import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { I18nProvider } from '@/components/providers/I18nProvider';
import { useI18n } from '@/components/providers/I18nProvider';
import { ToastContainer } from '@/components/ui/Toast';
import { useAuthStore } from '@/stores/auth-store';
import { useUIStore } from '@/stores/ui-store';
import OnboardingScreen from '@/components/screens/OnboardingScreen';
import RoleSelectScreen from '@/components/screens/RoleSelectScreen';
import AuthScreen from '@/components/screens/AuthScreen';
import SeekerShell from '@/components/screens/SeekerShell';
import EmployerShell from '@/components/screens/EmployerShell';
import AdminDashboard from '@/components/screens/AdminDashboard';
import ChatListScreen from '@/components/screens/ChatListScreen';
import ChatDetailScreen from '@/components/screens/ChatDetailScreen';
import dynamic from 'next/dynamic';
import {
  Home,
  Search,
  Briefcase,
  MessageCircle,
  User,
  Settings,
  LogOut,
  LayoutDashboard,
  PlusCircle,
  Users,
  Star,
  Smartphone,
  Monitor,
  Sun,
  Moon,
  Globe
} from 'lucide-react';

const MapViewScreen = dynamic(() => import('@/components/screens/MapViewScreen'), {
  ssr: false,
  loading: () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--bg-primary)' }}>
      <span className="btn-spinner" style={{ width: 40, height: 40, borderTopColor: 'var(--primary)' }} />
    </div>
  )
});

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    useAuthStore.getState().checkSession();
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth <= 768;
      useUIStore.getState().setLayoutMode(isMobile ? 'mobile' : 'desktop');
    }
  }, []);

  const navigate = (s: Screen, jobId?: string) => {
    if (jobId) setSelectedJobId(jobId);
    setScreen(s);
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  };

  if (!mounted) {
    return null; // Prevent SSR hydration mismatches for stateful layouts
  }

  return (
    <ThemeProvider>
      <I18nProvider>
        <AppLayoutWrapper
          screen={screen}
          navigate={navigate}
          selectedJobId={selectedJobId}
          isAuthenticated={isAuthenticated}
          user={user}
        >
          <ScreenRenderer
            screen={screen}
            navigate={navigate}
            selectedJobId={selectedJobId}
          />
        </AppLayoutWrapper>
      </I18nProvider>
    </ThemeProvider>
  );
}

/* === Subcomponent: Main Screen Router === */
interface ScreenRendererProps {
  screen: Screen;
  navigate: (s: Screen, jobId?: string) => void;
  selectedJobId: string;
}

function ScreenRenderer({ screen, navigate, selectedJobId }: ScreenRendererProps) {
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
}

/* === Subcomponent: Dynamic Layout Engine Wrapper === */
interface AppLayoutWrapperProps {
  children: React.ReactNode;
  screen: Screen;
  navigate: (s: Screen, jobId?: string) => void;
  selectedJobId: string;
  isAuthenticated: boolean;
  user: any;
}

function AppLayoutWrapper({
  children,
  screen,
  navigate,
  isAuthenticated,
  user
}: AppLayoutWrapperProps) {
  const { t } = useI18n();
  const layoutMode = useUIStore((state) => state.layoutMode);
  const theme = useUIStore((state) => state.theme);
  const language = useUIStore((state) => state.language);
  const toggleTheme = useUIStore((state) => state.toggleTheme);
  const toggleLanguage = useUIStore((state) => state.toggleLanguage);

  // Dynamic state for simulated smartphone clock
  const [phoneTime, setPhoneTime] = useState('17:37');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      setPhoneTime(`${hh}:${mm}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    await useAuthStore.getState().logout();
    navigate('role');
  };

  // Seeker Left Sidebar Navigation items
  const seekerNavItems = [
    { id: 'seeker-home' as Screen, icon: <Home size={18} />, label: t('nav.home') || 'Home' },
    { id: 'seeker-search' as Screen, icon: <Search size={18} />, label: t('nav.search') || 'Search' },
    { id: 'seeker-applications' as Screen, icon: <Briefcase size={18} />, label: t('nav.applications') || 'Applications' },
    { id: 'seeker-chats' as Screen, icon: <MessageCircle size={18} />, label: 'Chats' },
    { id: 'seeker-profile' as Screen, icon: <User size={18} />, label: t('nav.profile') || 'Profile' },
    { id: 'seeker-settings' as Screen, icon: <Settings size={18} />, label: 'Settings' }
  ];

  // Employer Left Sidebar Navigation items
  const employerNavItems = [
    { id: 'employer-dashboard' as Screen, icon: <LayoutDashboard size={18} />, label: t('nav.dashboard') || 'Dashboard' },
    { id: 'employer-post-job' as Screen, icon: <PlusCircle size={18} />, label: t('nav.postJob') || 'Post Job' },
    { id: 'employer-applicants' as Screen, icon: <Users size={18} />, label: t('nav.applicants') || 'Applicants' },
    { id: 'employer-profile' as Screen, icon: <User size={18} />, label: t('nav.profile') || 'Profile' }
  ];

  const sidebarItems = user?.role === 'employer' ? employerNavItems : seekerNavItems;
  const isPreAuth = ['onboarding', 'role', 'auth'].includes(screen);

  // If layout is Mobile Mode, or we are in pre-auth screens, render inside the high-fidelity simulator frame
  const showSimulator = layoutMode === 'mobile' || isPreAuth;

  return (
    <div className={layoutMode === 'desktop' && !isPreAuth ? 'layout-mode-desktop' : 'layout-mode-mobile'}>
      {showSimulator ? (
        <>
          <div className="simulator-bg-pattern" />
          <div className="simulator-wrapper">
            <div className="simulator-frame">
              <div className="simulator-notch" />
              <div className="simulator-status-bar">
                <span>{phoneTime}</span>
                <div className="simulator-status-bar-icons">
                  <span>📶</span>
                  <span>🛜</span>
                  <span>🔋 84%</span>
                </div>
              </div>
              <div className="simulator-screen">
                {children}
              </div>
              <div className="simulator-home-indicator" />
            </div>
          </div>
        </>
      ) : (
        /* Widescreen Desktop View */
        <div className="desktop-layout">
          <aside className="desktop-sidebar">
            <div className="sidebar-logo">
              📱 Quick<span>Gig</span>
            </div>

            {user && (
              <div className="sidebar-profile">
                <div className="sidebar-profile-avatar">
                  {user.avatar || (user.role === 'employer' ? '🍳' : '⚡')}
                </div>
                <div className="sidebar-profile-info">
                  <span className="sidebar-profile-name">{user.name || 'User'}</span>
                  <span className="sidebar-profile-role">{user.role}</span>
                  <span className="sidebar-profile-rating">
                    <Star size={10} fill="var(--warning)" color="var(--warning)" />{' '}
                    {user.trustScore || (user.role === 'employer' ? 4.7 : 4.2)}
                  </span>
                </div>
              </div>
            )}

            <nav className="sidebar-nav">
              {sidebarItems.map((item) => {
                const isActive =
                  screen === item.id ||
                  (item.id === 'seeker-home' && ['seeker-saved', 'seeker-earnings', 'seeker-notifications'].includes(screen)) ||
                  (item.id === 'seeker-chats' && screen === 'seeker-chat-detail');
                return (
                  <button
                    key={item.id}
                    className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                    onClick={() => navigate(item.id)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="sidebar-footer">
              <button className="sidebar-footer-btn logout" onClick={handleLogout}>
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </aside>

          <main className="desktop-content">
            {children}
          </main>
        </div>
      )}

      {/* Floating Glassmorphic Control Dock */}
      <div className="floating-control-dock" aria-label="Layout controls">
        <button
          className={`floating-control-btn ${layoutMode === 'mobile' ? 'active' : ''}`}
          onClick={() => useUIStore.getState().setLayoutMode('mobile')}
          data-tooltip="Mobile Mode"
          aria-label="Switch to mobile simulator mode"
        >
          <Smartphone size={18} />
        </button>
        <button
          className={`floating-control-btn ${layoutMode === 'desktop' ? 'active' : ''}`}
          onClick={() => useUIStore.getState().setLayoutMode('desktop')}
          data-tooltip="Desktop Mode"
          aria-label="Switch to widescreen desktop mode"
        >
          <Monitor size={18} />
        </button>

        <div className="floating-control-divider" />

        <button
          className="floating-control-btn"
          onClick={toggleTheme}
          data-tooltip={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          aria-label="Toggle dark and light theme"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <button
          className="floating-control-btn"
          onClick={toggleLanguage}
          data-tooltip={language === 'en' ? 'தமிழ்' : 'English'}
          aria-label="Toggle language between English and Tamil"
        >
          <Globe size={18} />
        </button>
      </div>

      <ToastContainer />
    </div>
  );
}
