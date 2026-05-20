'use client';

import React, { useState } from 'react';
import { useI18n } from '@/components/providers/I18nProvider';
import { useJobsStore } from '@/stores/jobs-store';
import { DEMO_JOBS } from '@/lib/demo-data';
import JobCard from '@/components/jobs/JobCard';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import type { Screen } from '@/app/app/page';
import { JOB_CATEGORIES, CHENNAI_AREAS, SHIFTS } from '@/lib/demo-data';

interface Props { navigate: (s: Screen, jobId?: string) => void; }

export default function SearchScreen({ navigate }: Props) {
  const { t } = useI18n();
  const { filters, setSearch, setFilters, resetFilters, recentSearches, addRecentSearch } = useJobsStore();
  const [showFilters, setShowFilters] = useState(false);
  const [localSearch, setLocalSearch] = useState(filters.search);

  const filteredJobs = DEMO_JOBS.filter(job => {
    if (localSearch) {
      const q = localSearch.toLowerCase();
      if (!job.title.toLowerCase().includes(q) && !job.company.toLowerCase().includes(q) && !job.area.toLowerCase().includes(q) && !job.category.toLowerCase().includes(q)) return false;
    }
    if (filters.categories.length > 0 && !filters.categories.includes(job.category)) return false;
    if (filters.areas.length > 0 && !filters.areas.includes(job.area)) return false;
    if (filters.shifts.length > 0 && !filters.shifts.includes(job.shift)) return false;
    if (filters.verifiedOnly && !job.isVerified) return false;
    if (filters.urgentOnly && !job.isUrgent) return false;
    if (job.distance > filters.maxDistance) return false;
    if (filters.payType !== 'all' && job.payType !== filters.payType) return false;
    return true;
  });

  return (
    <div className="page-enter" style={{ paddingBottom: 'calc(var(--bottom-nav-height) + var(--space-4))' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 10, background: 'var(--bg-primary)', padding: 'var(--space-4)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="search-bar">
          <Search size={18} color="var(--text-tertiary)" />
          <input type="text" placeholder={t('home.search')} value={localSearch}
            onChange={e => { setLocalSearch(e.target.value); setSearch(e.target.value); }}
            onKeyDown={e => { if (e.key === 'Enter' && localSearch) addRecentSearch(localSearch); }}
            autoFocus id="search-input" />
          {localSearch && <button className="btn btn-icon btn-sm btn-ghost" onClick={() => { setLocalSearch(''); setSearch(''); }}>
            <X size={16} />
          </button>}
          <button className="btn btn-icon btn-sm btn-secondary" onClick={() => setShowFilters(!showFilters)} aria-label="Toggle filters">
            <SlidersHorizontal size={16} />
          </button>
        </div>

        {!localSearch && recentSearches.length > 0 && (
          <div style={{ marginTop: 'var(--space-3)' }}>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginBottom: 'var(--space-2)' }}>Recent searches</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              {recentSearches.map((q, i) => (
                <button key={i} className="chip" onClick={() => { setLocalSearch(q); setSearch(q); }}>{q}</button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Filter Sheet */}
      {showFilters && (
        <>
          <div className="bottom-sheet-overlay" onClick={() => setShowFilters(false)} />
          <div className="bottom-sheet">
            <div className="bottom-sheet-handle" />
            <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-4)', color: 'var(--text-primary)' }}>{t('common.filter')}</h3>

            <div style={{ marginBottom: 'var(--space-4)' }}>
              <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)', color: 'var(--text-primary)' }}>Category</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                {JOB_CATEGORIES.slice(0, 8).map(c => (
                  <button key={c.id} className={`chip ${filters.categories.includes(c.id) ? 'active' : ''}`}
                    onClick={() => setFilters({ categories: filters.categories.includes(c.id) ? filters.categories.filter(x => x !== c.id) : [...filters.categories, c.id] })}>
                    {c.icon} {c.name}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 'var(--space-4)' }}>
              <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)', color: 'var(--text-primary)' }}>Shift</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                {SHIFTS.map(s => (
                  <button key={s.id} className={`chip ${filters.shifts.includes(s.id) ? 'active' : ''}`}
                    onClick={() => setFilters({ shifts: filters.shifts.includes(s.id) ? filters.shifts.filter(x => x !== s.id) : [...filters.shifts, s.id] })}>
                    {s.icon} {s.name}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 'var(--space-4)' }}>
              <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)', color: 'var(--text-primary)' }}>Distance: {filters.maxDistance}km</p>
              <input type="range" min={1} max={20} value={filters.maxDistance}
                onChange={e => setFilters({ maxDistance: Number(e.target.value) })}
                style={{ width: '100%', accentColor: 'var(--primary)' }} />
            </div>

            <div style={{ marginBottom: 'var(--space-4)', display: 'flex', gap: 'var(--space-4)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', cursor: 'pointer', color: 'var(--text-primary)' }}>
                <div className={`toggle ${filters.verifiedOnly ? 'active' : ''}`} onClick={() => setFilters({ verifiedOnly: !filters.verifiedOnly })} />
                Verified only
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', cursor: 'pointer', color: 'var(--text-primary)' }}>
                <div className={`toggle ${filters.urgentOnly ? 'active' : ''}`} onClick={() => setFilters({ urgentOnly: !filters.urgentOnly })} />
                Urgent only
              </label>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <button className="btn btn-secondary btn-lg" style={{ flex: 1 }} onClick={resetFilters}>{t('common.reset')}</button>
              <button className="btn btn-primary btn-lg" style={{ flex: 2 }} onClick={() => setShowFilters(false)}>
                Show {filteredJobs.length} jobs
              </button>
            </div>
          </div>
        </>
      )}

      {/* Results */}
      <div style={{ padding: 'var(--space-4)' }}>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-3)' }}>
          {filteredJobs.length} jobs found
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job}
              onTap={() => navigate('seeker-job-detail', job.id)}
              onApply={() => navigate('seeker-apply', job.id)} />
          ))}
        </div>
        {filteredJobs.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <p className="empty-state-title">{t('common.noResults')}</p>
            <p className="empty-state-desc">Try different search terms or adjust filters</p>
            <button className="btn btn-primary" onClick={resetFilters}>Reset Filters</button>
          </div>
        )}
      </div>
    </div>
  );
}
