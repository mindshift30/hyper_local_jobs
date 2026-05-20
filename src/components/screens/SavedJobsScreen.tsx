'use client';

import React from 'react';
import { useI18n } from '@/components/providers/I18nProvider';
import { useJobsStore } from '@/stores/jobs-store';
import { DEMO_JOBS } from '@/lib/demo-data';
import JobCard from '@/components/jobs/JobCard';
import type { Screen } from '@/app/app/page';
import { Heart } from 'lucide-react';

interface Props { navigate: (s: Screen, jobId?: string) => void; }

export default function SavedJobsScreen({ navigate }: Props) {
  const { t } = useI18n();
  const { savedJobs } = useJobsStore();
  const jobs = DEMO_JOBS.filter(j => savedJobs.includes(j.id));

  return (
    <div className="page-enter" style={{ paddingBottom: 'calc(var(--bottom-nav-height) + var(--space-4))' }}>
      <div style={{ padding: 'var(--space-4)' }}>
        <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, marginBottom: 'var(--space-4)', color: 'var(--text-primary)' }}>
          {t('saved.title')}
        </h1>
        {jobs.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {jobs.map(job => (
              <JobCard key={job.id} job={job} onTap={() => navigate('seeker-job-detail', job.id)}
                onApply={() => navigate('seeker-apply', job.id)} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon"><Heart size={36} /></div>
            <p className="empty-state-title">{t('saved.empty')}</p>
            <p className="empty-state-desc">{t('saved.emptyDesc')}</p>
            <button className="btn btn-primary" onClick={() => navigate('seeker-home')}>Browse Jobs</button>
          </div>
        )}
      </div>
    </div>
  );
}
