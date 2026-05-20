'use client';

import React from 'react';
import { useI18n } from '@/components/providers/I18nProvider';
import { useJobsStore } from '@/stores/jobs-store';
import { MapPin, Clock, Heart, BadgeCheck, Zap, MessageCircle } from 'lucide-react';
import { Job, formatPay } from '@/lib/demo-data';

interface Props {
  job: Job;
  onTap?: () => void;
  onApply?: () => void;
}

export default function JobCard({ job, onTap, onApply }: Props) {
  const { t } = useI18n();
  const { savedJobs, toggleSaved } = useJobsStore();
  const isSaved = savedJobs.includes(job.id);

  return (
    <div className={`job-card ${job.isUrgent ? 'urgency-high' : ''}`} onClick={onTap} style={{ cursor: 'pointer' }} id={`job-card-${job.id}`}>
      {/* Header */}
      <div className="job-card-header">
        <div className="job-card-logo" style={{ background: `linear-gradient(135deg, ${getCategoryColor(job.category)}22, ${getCategoryColor(job.category)}44)` }}>
          {job.companyLogo}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', flexWrap: 'wrap', marginBottom: 2 }}>
            {job.isUrgent && <span className="badge badge-urgent"><Zap size={10} /> {t('job.urgent')}</span>}
            {job.isSameDay && <span className="badge badge-success">{t('job.sameDayPay')}</span>}
          </div>
          <h3 className="job-card-title">{job.title}</h3>
          <p className="job-card-company">
            {job.company}
            {job.isVerified && <BadgeCheck size={14} color="var(--primary)" />}
          </p>
        </div>
      </div>

      {/* Meta */}
      <div className="job-card-meta">
        <span className="job-card-meta-item"><MapPin size={14} /> {job.area} · {job.distance}km</span>
        <span className="job-card-meta-item"><Clock size={14} /> {job.shiftTime}</span>
      </div>

      {/* Pay */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span className="job-card-pay">{formatPay(job.pay, job.payType)}</span>
        {job.slots <= 3 && (
          <span className="badge badge-warning">{job.slots} {t('job.slotsLeft')}</span>
        )}
      </div>

      {/* Footer */}
      <div className="job-card-footer">
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{job.postedAt}</span>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <button className={`btn btn-icon btn-ghost job-card-save ${isSaved ? 'saved' : ''}`}
            onClick={(e) => { e.stopPropagation(); toggleSaved(job.id); }}
            aria-label={isSaved ? 'Unsave job' : 'Save job'}>
            <Heart size={18} fill={isSaved ? 'var(--danger)' : 'none'} />
          </button>
          <button className="btn btn-sm btn-success" onClick={(e) => { e.stopPropagation(); onApply?.(); }}
            style={{ gap: 'var(--space-1)' }}>
            <MessageCircle size={14} />
            {t('job.apply')}
          </button>
        </div>
      </div>
    </div>
  );
}

function getCategoryColor(cat: string): string {
  const colors: Record<string, string> = {
    delivery: '#3B82F6', retail: '#8B5CF6', events: '#F59E0B', 'data-entry': '#22C55E',
    kitchen: '#EF4444', logistics: '#06B6D4', security: '#64748B', printing: '#EC4899',
    cleaning: '#14B8A6', driving: '#F97316', teaching: '#6366F1', construction: '#A855F7',
  };
  return colors[cat] || '#64748B';
}
