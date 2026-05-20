'use client';

import React, { useState } from 'react';
import { useI18n } from '@/components/providers/I18nProvider';
import { useAuthStore } from '@/stores/auth-store';
import { useJobsStore } from '@/stores/jobs-store';
import { DEMO_JOBS, JOB_CATEGORIES, getGreeting, getMatchScore } from '@/lib/demo-data';
import JobCard from '@/components/jobs/JobCard';
import { Search, MapPin, Bell, SlidersHorizontal, TrendingUp } from 'lucide-react';
import type { Screen } from '@/app/app/page';

interface Props {
  navigate: (s: Screen, jobId?: string) => void;
}

export default function SeekerHome({ navigate }: Props) {
  const { t } = useI18n();
  const { user } = useAuthStore();
  const { jobs, fetchJobs, loading } = useJobsStore();
  const [searchFocused, setSearchFocused] = useState(false);

  React.useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  if (loading && jobs.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh', gap: 'var(--space-4)' }}>
        <span className="btn-spinner" style={{ width: 40, height: 40, borderWidth: 3, borderColor: 'rgba(37,99,235,0.15)', borderTopColor: 'var(--primary)' }} />
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', fontWeight: 600 }}>Finding gigs near you...</p>
      </div>
    );
  }

  const urgentJobs = jobs.filter(j => j.isUrgent);
  const nearbyJobs = [...jobs].sort((a, b) => a.distance - b.distance).slice(0, 6);
  const bestPayJobs = [...jobs].sort((a, b) => b.pay - a.pay).slice(0, 4);
  const recommended = [...jobs].sort((a, b) => getMatchScore(b) - getMatchScore(a)).slice(0, 4);


  return (
    <div className="page-enter" style={{ paddingBottom: 'calc(var(--bottom-nav-height) + var(--space-4))' }}>
      {/* Sticky Header */}
      <div className="glass" style={{ position: 'sticky', top: 0, zIndex: 'var(--z-sticky)', padding: 'var(--space-3) var(--space-4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
          <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 800 }}>
            <span className="text-gradient">⚡ QuickGig</span>
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <button className="btn btn-ghost btn-sm" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
              <MapPin size={14} /> {user?.area || 'Chennai'}
            </button>
            <button className="btn btn-icon btn-ghost" onClick={() => navigate('seeker-notifications')} aria-label="Notifications" style={{ position: 'relative' }}>
              <Bell size={20} />
              <span className="nav-badge" />
            </button>
          </div>
        </div>

        {/* Greeting */}
        <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', marginBottom: 'var(--space-3)' }}>
          {getGreeting()}, <strong style={{ color: 'var(--text-primary)' }}>{user?.name || 'Jagan'}</strong> 👋
        </p>

        {/* Search */}
        <div className="search-bar" onClick={() => navigate('seeker-search')} style={{ cursor: 'pointer' }}>
          <Search size={18} color="var(--text-tertiary)" />
          <input type="text" placeholder={t('home.search')} readOnly style={{ cursor: 'pointer' }} id="home-search" />
          <button className="btn btn-icon btn-sm btn-secondary" onClick={(e) => { e.stopPropagation(); navigate('seeker-map'); }} aria-label="Map" style={{ borderRadius: 'var(--radius-lg)' }}>
            <MapPin size={16} />
          </button>
        </div>
      </div>

      <div style={{ padding: '0 var(--space-4)' }}>
        {/* Categories */}
        <div style={{ marginTop: 'var(--space-6)' }}>
          <div className="h-scroll" style={{ gap: 'var(--space-2)' }}>
            {JOB_CATEGORIES.slice(0, 8).map(cat => (
              <button key={cat.id} className="category-item" onClick={() => navigate('seeker-search')}
                style={{ minWidth: 76 }} id={`cat-${cat.id}`}>
                <div className="category-icon" style={{ background: `${cat.color}15` }}>
                  {cat.icon}
                </div>
                <span className="category-name">{t(`cat.${cat.id}`) || cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Today's Urgent */}
        <div style={{ marginTop: 'var(--space-6)' }}>
          <div className="section-header">
            <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Zap2 size={18} color="var(--danger)" /> {t('home.urgent')}
            </h2>
            <button className="section-link" onClick={() => navigate('seeker-search')}>{t('home.viewAll')}</button>
          </div>
          <div className="h-scroll">
            {urgentJobs.map(job => (
              <div key={job.id} style={{ minWidth: 300, maxWidth: 340 }}>
                <JobCard job={job}
                  onTap={() => navigate('seeker-job-detail', job.id)}
                  onApply={() => navigate('seeker-apply', job.id)} />
              </div>
            ))}
          </div>
        </div>

        {/* Recommended */}
        <div style={{ marginTop: 'var(--space-6)' }}>
          <div className="section-header">
            <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <TrendingUp size={18} color="var(--primary)" /> {t('home.recommended')}
            </h2>
          </div>
          {recommended.map(job => (
            <div key={job.id} style={{ marginBottom: 'var(--space-3)' }}>
              <div style={{ marginBottom: 'var(--space-1)' }}>
                <span className="badge badge-primary" style={{ fontSize: 10 }}>
                  {job.distance}km away · {job.shift === 'evening' ? 'Evening' : job.shift === 'morning' ? 'Morning' : 'Night'} · {formatPayShort(job.pay, job.payType)}
                </span>
              </div>
              <JobCard job={job}
                onTap={() => navigate('seeker-job-detail', job.id)}
                onApply={() => navigate('seeker-apply', job.id)} />
            </div>
          ))}
        </div>

        {/* Near You */}
        <div style={{ marginTop: 'var(--space-6)' }}>
          <div className="section-header">
            <h2 className="section-title">📍 {t('home.nearYou')}</h2>
            <button className="section-link" onClick={() => navigate('seeker-search')}>{t('home.viewAll')}</button>
          </div>
          {nearbyJobs.map(job => (
            <div key={job.id} style={{ marginBottom: 'var(--space-3)' }}>
              <JobCard job={job}
                onTap={() => navigate('seeker-job-detail', job.id)}
                onApply={() => navigate('seeker-apply', job.id)} />
            </div>
          ))}
        </div>

        {/* Best Pay */}
        <div style={{ marginTop: 'var(--space-6)' }}>
          <div className="section-header">
            <h2 className="section-title">💰 {t('home.bestPay')}</h2>
          </div>
          {bestPayJobs.map(job => (
            <div key={job.id} style={{ marginBottom: 'var(--space-3)' }}>
              <JobCard job={job}
                onTap={() => navigate('seeker-job-detail', job.id)}
                onApply={() => navigate('seeker-apply', job.id)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Zap2({ size, color }: { size: number; color: string }) {
  return <span style={{ color }}>⚡</span>;
}

function formatPayShort(pay: number, payType: string): string {
  return `₹${pay}${payType === 'daily' ? '/day' : payType === 'weekly' ? '/week' : '/mo'}`;
}
