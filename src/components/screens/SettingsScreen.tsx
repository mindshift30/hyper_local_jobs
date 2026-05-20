'use client';

import React from 'react';
import { useI18n } from '@/components/providers/I18nProvider';
import { useUIStore } from '@/stores/ui-store';
import { useAuthStore } from '@/stores/auth-store';
import { Moon, Globe, Bell, MapPin, User, Shield, HelpCircle, Gift, LogOut, ChevronRight, Trash2 } from 'lucide-react';
import type { Screen } from '@/app/app/page';

interface Props { navigate: (s: Screen) => void; }

export default function SettingsScreen({ navigate }: Props) {
  const { t } = useI18n();
  const { theme, toggleTheme, language, toggleLanguage } = useUIStore();
  const { logout } = useAuthStore();

  const sections = [
    {
      title: 'Preferences',
      items: [
        { icon: <Globe size={18} />, label: t('settings.language'), right: <button onClick={toggleLanguage} style={{ color: 'var(--primary)', fontWeight: 600, fontSize: 'var(--text-sm)' }}>{language === 'en' ? 'English' : 'தமிழ்'}</button> },
        { icon: <Moon size={18} />, label: t('settings.darkMode'), right: <div className={`toggle ${theme === 'dark' ? 'active' : ''}`} onClick={toggleTheme} /> },
        { icon: <Bell size={18} />, label: t('settings.notifications'), right: <ChevronRight size={16} color="var(--text-tertiary)" /> },
        { icon: <MapPin size={18} />, label: t('settings.area'), right: <ChevronRight size={16} color="var(--text-tertiary)" /> },
      ],
    },
    {
      title: t('settings.account'),
      items: [
        { icon: <User size={18} />, label: t('profile.editProfile'), right: <ChevronRight size={16} color="var(--text-tertiary)" /> },
        { icon: <Gift size={18} />, label: t('settings.refer'), right: <ChevronRight size={16} color="var(--text-tertiary)" /> },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: <HelpCircle size={18} />, label: t('settings.help'), right: <ChevronRight size={16} color="var(--text-tertiary)" /> },
        { icon: <Shield size={18} />, label: t('settings.privacy'), right: <ChevronRight size={16} color="var(--text-tertiary)" /> },
      ],
    },
  ];

  return (
    <div className="page-enter" style={{ paddingBottom: 'calc(var(--bottom-nav-height) + var(--space-4))' }}>
      <div style={{ padding: 'var(--space-4)' }}>
        <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, marginBottom: 'var(--space-6)', color: 'var(--text-primary)' }}>
          {t('settings.title')}
        </h1>

        {sections.map(section => (
          <div key={section.title} style={{ marginBottom: 'var(--space-6)' }}>
            <p style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-2)', paddingLeft: 'var(--space-2)' }}>
              {section.title}
            </p>
            <div className="card card-flat" style={{ padding: 0, overflow: 'hidden' }}>
              {section.items.map((item, i) => (
                <div key={item.label} style={{
                  display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                  padding: 'var(--space-4)',
                  borderBottom: i < section.items.length - 1 ? '1px solid var(--border-light)' : 'none',
                  cursor: 'pointer',
                }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{item.icon}</span>
                  <span style={{ flex: 1, fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>{item.label}</span>
                  {item.right}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Danger zone */}
        <div className="card card-flat" style={{ padding: 0, overflow: 'hidden', marginBottom: 'var(--space-4)' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-4)', width: '100%', cursor: 'pointer', borderBottom: '1px solid var(--border-light)' }}
            onClick={() => { logout(); navigate('onboarding' as Screen); }}>
            <LogOut size={18} color="var(--danger)" />
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--danger)' }}>{t('settings.logout')}</span>
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-4)', width: '100%', cursor: 'pointer' }}>
            <Trash2 size={18} color="var(--text-tertiary)" />
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--text-tertiary)' }}>{t('settings.deleteAccount')}</span>
          </button>
        </div>

        <p style={{ textAlign: 'center', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 'var(--space-4)' }}>
          QuickGig v2.0 · Made with ⚡ in Chennai
        </p>
      </div>
    </div>
  );
}
