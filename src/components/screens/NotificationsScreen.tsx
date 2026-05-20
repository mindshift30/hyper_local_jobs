'use client';

import React from 'react';
import { useI18n } from '@/components/providers/I18nProvider';
import { DEMO_NOTIFICATIONS } from '@/lib/demo-data';
import { Bell, Zap, CheckCircle, Clock, TrendingUp, Gift, ArrowLeft } from 'lucide-react';
import type { Screen } from '@/app/app/page';

interface Props { navigate: (s: Screen) => void; }

const NOTIF_ICONS: Record<string, React.ReactNode> = {
  job_match: <TrendingUp size={18} color="var(--primary)" />,
  status_update: <CheckCircle size={18} color="var(--success)" />,
  urgent_nearby: <Zap size={18} color="var(--danger)" />,
  expiring: <Clock size={18} color="var(--warning)" />,
  payment: <Gift size={18} color="var(--success)" />,
  new_applicant: <Bell size={18} color="var(--secondary)" />,
  daily_digest: <TrendingUp size={18} color="var(--primary)" />,
};

export default function NotificationsScreen({ navigate }: Props) {
  const { t } = useI18n();

  return (
    <div className="page-enter" style={{ paddingBottom: 'calc(var(--bottom-nav-height) + var(--space-4))' }}>
      <div style={{ padding: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)', borderBottom: '1px solid var(--border-light)' }}>
        <button className="btn btn-icon btn-ghost" onClick={() => navigate('seeker-home')} aria-label="Go back">
          <ArrowLeft size={20} />
        </button>
        <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, flex: 1, color: 'var(--text-primary)' }}>{t('notif.title')}</h1>
        <button className="btn btn-ghost btn-sm" style={{ color: 'var(--primary)', fontSize: 'var(--text-xs)' }}>{t('notif.markRead')}</button>
      </div>

      <div style={{ padding: 'var(--space-2) 0' }}>
        {DEMO_NOTIFICATIONS.map(n => (
          <div key={n.id} style={{
            padding: 'var(--space-4)',
            display: 'flex', gap: 'var(--space-3)',
            borderBottom: '1px solid var(--border-light)',
            background: n.read ? 'transparent' : 'var(--primary-50)',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-full)', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {NOTIF_ICONS[n.type] || <Bell size={18} />}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontWeight: n.read ? 500 : 700, fontSize: 'var(--text-sm)', marginBottom: 2, color: 'var(--text-primary)' }}>{n.title}</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{n.body}</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 4 }}>{n.createdAt}</p>
            </div>
            {!n.read && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)', flexShrink: 0, marginTop: 4 }} />}
          </div>
        ))}
      </div>
    </div>
  );
}
