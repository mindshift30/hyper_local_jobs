'use client';

import React from 'react';
import { useI18n } from '@/components/providers/I18nProvider';
import { Home, Search, Briefcase, Heart, User, Settings, MessageCircle } from 'lucide-react';
import type { Screen } from '@/app/app/page';
import SeekerHome from './SeekerHome';
import SearchScreen from './SearchScreen';
import JobDetailScreen from './JobDetailScreen';
import ApplyScreen from './ApplyScreen';
import ApplicationsScreen from './ApplicationsScreen';
import SavedJobsScreen from './SavedJobsScreen';
import EarningsScreen from './EarningsScreen';
import NotificationsScreen from './NotificationsScreen';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';

interface Props {
  screen: Screen;
  navigate: (s: Screen, jobId?: string) => void;
  selectedJobId: string;
}

const NAV_ITEMS: { id: Screen; icon: React.ReactNode; labelKey: string }[] = [
  { id: 'seeker-home', icon: <Home size={20} />, labelKey: 'nav.home' },
  { id: 'seeker-search', icon: <Search size={20} />, labelKey: 'nav.search' },
  { id: 'seeker-applications', icon: <Briefcase size={20} />, labelKey: 'nav.applications' },
  { id: 'seeker-chats', icon: <MessageCircle size={20} />, labelKey: 'nav.chats' },
  { id: 'seeker-profile', icon: <User size={20} />, labelKey: 'nav.profile' },
];

const HIDE_NAV: Screen[] = ['seeker-job-detail', 'seeker-apply', 'seeker-notifications', 'seeker-settings', 'seeker-chat-detail'];

export default function SeekerShell({ screen, navigate, selectedJobId }: Props) {
  const { t } = useI18n();
  const showNav = !HIDE_NAV.includes(screen);

  const renderContent = () => {
    switch (screen) {
      case 'seeker-home': return <SeekerHome navigate={navigate} />;
      case 'seeker-search': return <SearchScreen navigate={navigate} />;
      case 'seeker-job-detail': return <JobDetailScreen jobId={selectedJobId} navigate={navigate} />;
      case 'seeker-apply': return <ApplyScreen jobId={selectedJobId} navigate={navigate} />;
      case 'seeker-applications': return <ApplicationsScreen navigate={navigate} />;
      case 'seeker-saved': return <SavedJobsScreen navigate={navigate} />;
      case 'seeker-earnings': return <EarningsScreen />;
      case 'seeker-notifications': return <NotificationsScreen navigate={navigate} />;
      case 'seeker-profile': return <ProfileScreen />;
      case 'seeker-settings': return <SettingsScreen navigate={navigate} />;
      default: return <SeekerHome navigate={navigate} />;
    }
  };

  return (
    <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', position: 'relative', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {renderContent()}

      {/* Bottom Navigation */}
      {showNav && (
        <nav className="bottom-nav" style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }} aria-label="Main navigation">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={`nav-item ${screen === item.id ? 'active' : ''}`}
              onClick={() => navigate(item.id)}
              aria-label={t(item.labelKey)}
              id={`nav-${item.id}`}
            >
              {item.icon}
              <span>{t(item.labelKey)}</span>
            </button>
          ))}
          {/* Settings gear */}
          <button
            className={`nav-item ${screen === 'seeker-settings' ? 'active' : ''}`}
            onClick={() => navigate('seeker-settings')}
            aria-label="Settings"
          >
            <Settings size={20} />
            <span>More</span>
          </button>
        </nav>
      )}
    </div>
  );
}
