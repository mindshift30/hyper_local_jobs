'use client';

import React, { useState } from 'react';
import { useI18n } from '@/components/providers/I18nProvider';
import { DEMO_APPLICATIONS, DEMO_JOBS, formatPay } from '@/lib/demo-data';
import { Clock, CheckCircle, Eye, Star, XCircle, ArrowRight, TrendingUp } from 'lucide-react';
import type { Screen } from '@/app/app/page';

interface Props {
  navigate: (s: Screen, jobId?: string) => void;
}

const STATUS_CONFIG = {
  applied: { icon: <Clock size={14} />, color: 'var(--primary)', bg: 'var(--primary-50)', label: 'Applied' },
  viewed: { icon: <Eye size={14} />, color: 'var(--warning)', bg: 'var(--warning-50)', label: 'Viewed' },
  shortlisted: { icon: <Star size={14} />, color: 'var(--secondary)', bg: 'rgba(124,58,237,0.1)', label: 'Shortlisted' },
  hired: { icon: <CheckCircle size={14} />, color: 'var(--success)', bg: 'var(--success-50)', label: 'Hired 🎉' },
  rejected: { icon: <XCircle size={14} />, color: 'var(--danger)', bg: 'var(--danger-50)', label: 'Not selected' },
};

export default function ApplicationsScreen({ navigate }: Props) {
  const { t } = useI18n();
  const [filter, setFilter] = useState<'all' | 'active' | 'hired' | 'rejected'>('all');

  const apps = DEMO_APPLICATIONS.filter(a => {
    if (filter === 'all') return true;
    if (filter === 'active') return ['applied', 'viewed', 'shortlisted'].includes(a.status);
    return a.status === filter;
  });

  return (
    <div className="page-enter" style={{ paddingBottom: 'calc(var(--bottom-nav-height) + var(--space-4))' }}>
      <div style={{ padding: 'var(--space-4)' }}>
        <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, marginBottom: 'var(--space-2)', color: 'var(--text-primary)' }}>
          {t('apps.title')}
        </h1>

        {/* Earnings summary */}
        <div className="card" style={{ background: 'linear-gradient(135deg, var(--success) 0%, var(--success-dark) 100%)', color: 'white', marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: 'var(--text-sm)', opacity: 0.9 }}>{t('apps.earnings')}</p>
            <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 800 }}>₹2,400</p>
          </div>
          <TrendingUp size={32} style={{ opacity: 0.5 }} />
        </div>

        {/* Filters */}
        <div className="h-scroll" style={{ marginBottom: 'var(--space-4)' }}>
          {(['all', 'active', 'hired', 'rejected'] as const).map(f => (
            <button key={f} className={`chip ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}>
              {f === 'all' ? 'All' : f === 'active' ? t('apps.active') : f === 'hired' ? t('apps.hired') : t('apps.rejected')}
            </button>
          ))}
        </div>

        {/* Application List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {apps.map(app => {
            const job = DEMO_JOBS.find(j => j.id === app.jobId);
            if (!job) return null;
            const status = STATUS_CONFIG[app.status];

            return (
              <div key={app.id} className="card" style={{ cursor: 'pointer' }}
                onClick={() => navigate('seeker-job-detail', app.jobId)}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-lg)', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                    {job.companyLogo}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                      <p style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {job.title}
                      </p>
                      <ArrowRight size={14} color="var(--text-tertiary)" />
                    </div>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>
                      {job.company} · {formatPay(job.pay, job.payType)}
                    </p>

                    {/* Status */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span className="badge" style={{ background: status.bg, color: status.color, display: 'flex', alignItems: 'center', gap: 4 }}>
                        {status.icon} {status.label}
                      </span>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{app.appliedAt}</span>
                    </div>
                  </div>
                </div>

                {/* Status Timeline (mini) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginTop: 'var(--space-3)', paddingTop: 'var(--space-2)', borderTop: '1px solid var(--border-light)' }}>
                  {['applied', 'viewed', 'shortlisted', 'hired'].map((s, i) => {
                    const stages = ['applied', 'viewed', 'shortlisted', 'hired'];
                    const currentIdx = stages.indexOf(app.status === 'rejected' ? 'applied' : app.status);
                    return (
                      <React.Fragment key={s}>
                        <div style={{
                          width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                          background: i <= currentIdx ? (app.status === 'rejected' && i === 0 ? 'var(--danger)' : 'var(--success)') : 'var(--border-light)',
                        }} />
                        {i < 3 && <div style={{ flex: 1, height: 2, background: i < currentIdx ? 'var(--success)' : 'var(--border-light)' }} />}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {apps.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <p className="empty-state-title">No applications in this category</p>
            <p className="empty-state-desc">Start applying to jobs to see them here</p>
            <button className="btn btn-primary" onClick={() => navigate('seeker-home')}>Browse Jobs</button>
          </div>
        )}
      </div>
    </div>
  );
}
