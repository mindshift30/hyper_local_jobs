'use client';

import React from 'react';
import { useI18n } from '@/components/providers/I18nProvider';
import { Briefcase, Users } from 'lucide-react';

interface Props {
  onSelect: (role: 'seeker' | 'employer') => void;
}

export default function RoleSelectScreen({ onSelect }: Props) {
  const { t } = useI18n();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-6)', background: 'var(--bg-primary)' }}>
      {/* Logo */}
      <div style={{ marginBottom: 'var(--space-8)', textAlign: 'center' }} className="animate-fade-in-up">
        <h1 style={{ fontSize: 'var(--text-4xl)', fontWeight: 900 }}>
          <span className="text-gradient">⚡ QuickGig</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-base)' }}>
          {t('role.title')}
        </p>
      </div>

      {/* Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', width: '100%', maxWidth: 380 }}>
        <button className="card" onClick={() => onSelect('seeker')} id="role-seeker"
          style={{ padding: 'var(--space-6)', cursor: 'pointer', textAlign: 'left', border: '2px solid var(--border-light)', transition: 'all 0.3s ease' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--primary)'; (e.currentTarget as HTMLElement).style.background = 'var(--primary-50)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-light)'; (e.currentTarget as HTMLElement).style.background = 'var(--bg-card)'; }}>
          <div style={{ width: 56, height: 56, borderRadius: 'var(--radius-xl)', background: 'linear-gradient(135deg, #2563EB, #3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-4)' }}>
            <Briefcase size={28} color="white" />
          </div>
          <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, marginBottom: 'var(--space-2)', color: 'var(--text-primary)' }}>
            {t('role.seeker')}
          </h2>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            {t('role.seekerDesc')}
          </p>
        </button>

        <button className="card" onClick={() => onSelect('employer')} id="role-employer"
          style={{ padding: 'var(--space-6)', cursor: 'pointer', textAlign: 'left', border: '2px solid var(--border-light)', transition: 'all 0.3s ease' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--secondary)'; (e.currentTarget as HTMLElement).style.background = 'rgba(124,58,237,0.05)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-light)'; (e.currentTarget as HTMLElement).style.background = 'var(--bg-card)'; }}>
          <div style={{ width: 56, height: 56, borderRadius: 'var(--radius-xl)', background: 'linear-gradient(135deg, #7C3AED, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-4)' }}>
            <Users size={28} color="white" />
          </div>
          <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, marginBottom: 'var(--space-2)', color: 'var(--text-primary)' }}>
            {t('role.employer')}
          </h2>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            {t('role.employerDesc')}
          </p>
        </button>

        {/* Admin link (small) */}
        <button onClick={() => onSelect('seeker')} style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 'var(--space-2)', textAlign: 'center' }}>
          Admin? Tap here
        </button>
      </div>
    </div>
  );
}
